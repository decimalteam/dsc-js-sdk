import { createWalletFromMnemonic } from "@tendermint/sig";
import * as bip39 from "bip39";
import { publicKeyCreate } from "secp256k1";
import proposalAdresses from "./proposalAddresses.json";
import { PrivKey, PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";
import { encodeAddresses, encodeCosmosAccountAddress, decodeCosmosAccountAddress, getAndUseGeneratedWallets, getTimestamp, sendAndSaveGeneratedWallets, } from "./utils/walletUtils";
// constants
const ADDRESS_PREFIX = "d0";
const VALIDATOR_ADDRESS_PREFIX = "d0valoper";
const MASTER_DERIVATION_PATH = "m/44'/60'/0'/0/0";
const MNEMONIC_STRENGTH = 256;
const MAX_ACCOUNTS_NUMBER = 20;
// generate derivation path for depth method
export function generateDerivationPath(depth) {
    if (!Number.isInteger(depth) || depth < 1) {
        throw new Error(`Invalid depth number ${depth}, must be integer number between 1 and ${MAX_ACCOUNTS_NUMBER}`);
    }
    const correctDepth = depth - 1;
    return `m/44'/60'/0'/0/${correctDepth}`;
}
// generate random mnemonic method
export function generateMnemonic() {
    return bip39.generateMnemonic(MNEMONIC_STRENGTH);
}
// validate mnemonic method
export function validateMnemonic(mnemonic) {
    return bip39.validateMnemonic(mnemonic);
}
// mnemonic to seed method
export function mnemonicToSeedSync(mnemonic) {
    if (!validateMnemonic(mnemonic)) {
        throw new Error("Invalid mnemonic phrase");
    }
    return bip39.mnemonicToSeedSync(mnemonic);
}
export function createDecimalWalletFromMnemonic(mnemonic, addressPrefix = ADDRESS_PREFIX, derivation_path = MASTER_DERIVATION_PATH, id = 0) {
    const { privateKey, publicKey } = createWalletFromMnemonic(mnemonic, addressPrefix, derivation_path);
    const { evmAccountAddress, cosmosAccountAddress } = encodeAddresses(publicKey, addressPrefix);
    const wallet = {
        privateKey,
        publicKey,
        address: cosmosAccountAddress,
        evmAddress: evmAccountAddress,
        id,
    };
    return wallet;
}
// create wallet from mnemonic phrase
export default class Wallet {
    constructor(mnemonic) {
        // current mnemonic
        const _mnemonic = mnemonic || generateMnemonic();
        if (!validateMnemonic(_mnemonic)) {
            throw new Error("Invalid mnemonic");
        }
        // generate master wallet
        const wallet = createDecimalWalletFromMnemonic(_mnemonic);
        // master fields
        this.mnemonic = _mnemonic; // master mnemonic to generate
        this.validatorAddress = createDecimalWalletFromMnemonic(_mnemonic, VALIDATOR_ADDRESS_PREFIX, MASTER_DERIVATION_PATH).address; // do not need to change with derivation path update
        // current wallet
        this.wallet = wallet; // current wallet
        this.depth = 1; // current wallet depth
        this.id = 0; // current wallet account id
        // current private, public keys, address
        this.privateKey = wallet.privateKey; // current private key
        this.publicKey = wallet.publicKey; // current public key
        this.evmAddress = wallet.evmAddress; // current evm address
        this.address = wallet.address; // current address
        // is available proposal submit
        this.availableProposalSubmit = !!proposalAdresses.addresses.find((address) => address === wallet.address);
        // gate url
        this.gateUrl = "";
        this.nodeRestUrl = "";
        // get generated wallets including master wallet
        this.wallets = [wallet];
        // current nonce for sending transactions and lifetime of the current nonce, valid for 6 secs
        this.currentNonce = null;
        this.currentNonceValidUntil = null;
    }
    setNodeRestUrl(nodeRestUrl) {
        this.nodeRestUrl = nodeRestUrl;
    }
    getNodeRestUrl() {
        return this.nodeRestUrl;
    }
    setGateUrl(gateUrl) {
        this.gateUrl = gateUrl;
    }
    getGateUrl() {
        return this.gateUrl;
    }
    // get private key in hex
    getPrivateKeyString() {
        return this.privateKey.toString();
    }
    // get public key in hex
    getPublicKeyString() {
        return this.publicKey.toString();
    }
    getPrivateKey() {
        return PrivKey.fromPartial({
            key: this.wallet.privateKey,
        });
    }
    getPublicKey(compressed = false) {
        return PubKey.fromPartial({
            key: publicKeyCreate(this.wallet.privateKey, compressed),
        });
    }
    // switch to account by id private method
    switchAccount(id) {
        try {
            // if id does not exist
            if (typeof id === "undefined" || !Number.isInteger(id)) {
                throw new Error("Id must be of type number");
            }
            // if id more then generated accounts
            if (id > this.depth) {
                throw new Error(`You have not generated an account with ${id} id`);
            }
            // current wallet
            const wallet = this.wallets[id];
            // update current wallet
            this.wallet = wallet;
            this.id = id;
            // update current private, public keys, address
            this.privateKey = wallet.privateKey; // current private key
            this.publicKey = wallet.publicKey; // current public key
            this.evmAddress = wallet.evmAddress; // current evm address
            this.address = wallet.address; // current address
            // update current nonce for sending transactions and lifetime of the current nonce
            this.updateNonce(null);
        }
        catch (e) {
            console.error(e);
        }
    }
    // generate next account and switch to last
    generateAccount() {
        try {
            // current depth
            const depth = this.depth + 1;
            // if depth more then max available amount
            if (depth >= MAX_ACCOUNTS_NUMBER) {
                throw new Error(`You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`);
            }
            // current derivation path
            const derivationPath = generateDerivationPath(depth);
            // current wallet
            const wallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath, depth - 1);
            // update current wallet
            this.depth = depth;
            // update wallets
            this.wallets = [...this.wallets, wallet];
            // update wallet
            this.switchAccount(depth - 1);
        }
        catch (e) {
            console.error(e);
        }
    }
    // generate accounts and switch if necessary
    generateAndSwitchAccount(depth, id) {
        try {
            // if depth does not exist
            if (typeof depth === "undefined" || !Number.isInteger(depth)) {
                throw new Error("Depth must be of type number");
            }
            // id depth more then max available amount
            if (depth >= MAX_ACCOUNTS_NUMBER) {
                throw new Error(`You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`);
            }
            let _id = id;
            // if id does not exist
            if (typeof id === "undefined" || !Number.isInteger(id)) {
                _id = Math.max(depth, this.depth) - 1;
            }
            // if id more then max depth
            if (_id >= Math.max(depth, this.depth)) {
                throw new Error(`You can not switch to account, more then ${depth - 1} id`);
            }
            // if depth less or equal to current depth
            if (depth <= this.depth) {
                // swith account
                this.switchAccount(_id);
            }
            // generate accounts to depth amount
            for (let _depth = this.depth + 1; _depth <= depth; _depth += 1) {
                let hasWalletInArrayWallets = true;
                // if wallet is already in this.wallets array
                this.wallets.forEach((wallet) => {
                    if (wallet.id === _depth - 1) {
                        hasWalletInArrayWallets = false;
                    }
                });
                if (hasWalletInArrayWallets) {
                    // current derivation path
                    const derivationPath = generateDerivationPath(_depth);
                    // current wallet
                    const wallet = createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath, _depth - 1);
                    // update current wallet
                    this.depth = _depth;
                    // update wallets
                    this.wallets = [...this.wallets, wallet];
                }
            }
            // swith account
            this.switchAccount(_id);
        }
        catch (e) {
            console.error(e);
        }
    }
    async getAndUseGeneratedWallets() {
        try {
            const masterWallet = this.wallet;
            const ids = await getAndUseGeneratedWallets(this.gateUrl, masterWallet.address);
            if (ids && ids.length) {
                this.wallets = [masterWallet];
                this.switchAccount(masterWallet.id);
                ids.forEach((id) => {
                    if (id !== masterWallet.id) {
                        const derivationPath = generateDerivationPath(id + 1);
                        const wallet = {
                            ...createDecimalWalletFromMnemonic(this.mnemonic, ADDRESS_PREFIX, derivationPath),
                            id,
                        };
                        this.wallets.push(wallet);
                    }
                });
                this.depth = this.wallets.length;
                console.info("[GET-GENERATED-WALLETS-STATUS]: TRUE");
            }
            else {
                console.info("[GET-GENERATED-WALLETS-STATUS]: FALSE");
            }
        }
        catch (e) {
            console.error("An error occurred during wallet synchronization", e.message);
            console.warn("[GET-GENERATED-WALLETS-STATUS]: FALSE");
        }
    }
    async sendAndSaveGeneratedWallets() {
        try {
            const ids = this.wallets.map((wallet) => wallet.id);
            const updated = await sendAndSaveGeneratedWallets(this.gateUrl, this.wallets, ids);
            console.info(`[SAVE-GENERATED-WALLETS-STATUS]: ${updated.toString().toUpperCase()}`);
        }
        catch (e) {
            console.error("An error occurred during wallets's id adding", e.message);
            console.warn("[SAVE-GENERATED-WALLETS-STATUS]: FALSE");
        }
    }
    updateNonce(nonce) {
        this.currentNonce = nonce;
        this.currentNonceValidUntil = nonce ? getTimestamp() : null;
    }
    encodeCosmosAccountAddress(address, prefix = "d0") {
        return encodeCosmosAccountAddress(address, prefix);
    }
    decodeCosmosAccountAddress(address) {
        return decodeCosmosAccountAddress(address);
    }
}
//# sourceMappingURL=wallet.js.map