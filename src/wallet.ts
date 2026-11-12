import { HDNodeWallet, Mnemonic, getBytes, hexlify, randomBytes } from "ethers";

import {
  ADDRESS_PREFIX,
  encodeAddresses,
  encodeCosmosAccountAddress,
  decodeCosmosAccountAddress,
  getAndUseGeneratedWallets,
  sendAndSaveGeneratedWallets,
} from "./utils/walletUtils";

// constants
const VALIDATOR_ADDRESS_PREFIX = "d0valoper";
const MASTER_DERIVATION_PATH = "m/44'/60'/0'/0/0";
const MNEMONIC_ENTROPY_BYTES = 32; // 256 bits -> 24 words
const MAX_ACCOUNTS_NUMBER = 20;

// generate derivation path for depth method
export function generateDerivationPath(depth: number) {
  if (!Number.isInteger(depth) || depth < 1) {
    throw new Error(
      `Invalid depth number ${depth}, must be integer number between 1 and ${MAX_ACCOUNTS_NUMBER}`
    );
  }
  const correctDepth = depth - 1;
  return `m/44'/60'/0'/0/${correctDepth}`;
}

// generate random 24-word mnemonic
export function generateMnemonic(): string {
  return Mnemonic.fromEntropy(randomBytes(MNEMONIC_ENTROPY_BYTES)).phrase;
}

// validate mnemonic method
export function validateMnemonic(mnemonic: string): boolean {
  return Mnemonic.isValidMnemonic(mnemonic);
}

// mnemonic to BIP-39 seed
export function mnemonicToSeedSync(mnemonic: string): Uint8Array {
  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic phrase");
  }
  return getBytes(Mnemonic.fromPhrase(mnemonic).computeSeed());
}

export function createDecimalWalletFromMnemonic(
  mnemonic: string,
  addressPrefix = ADDRESS_PREFIX,
  derivationPath = MASTER_DERIVATION_PATH,
  id = 0
): generatedWallet {
  const node = HDNodeWallet.fromPhrase(mnemonic, undefined, derivationPath);
  const privateKey = getBytes(node.privateKey);
  const publicKey = getBytes(node.publicKey); // compressed, 33 bytes

  const { evmAccountAddress, cosmosAccountAddress } = encodeAddresses(publicKey, addressPrefix);

  return {
    privateKey,
    publicKey,
    address: cosmosAccountAddress,
    evmAddress: evmAccountAddress,
    id,
  };
}

export interface generatedWallet {
  privateKey: Uint8Array;
  address: string;
  publicKey: Uint8Array;
  id: number;
  evmAddress?: string;
}

/**
 * HD wallet of the Decimal chain. Holds the master mnemonic and the derived accounts
 * (`m/44'/60'/0'/0/<id>`); `address` is the bech32 (d0...) form, `evmAddress` the 0x form.
 */
export default class Wallet {
  public mnemonic: string;
  public validatorAddress: string | undefined;
  public wallet: generatedWallet;
  public depth: number;
  public id: number;
  public privateKey: Uint8Array;
  public publicKey: Uint8Array;
  public evmAddress: string | undefined;
  public address: string;
  private gateUrl: string;
  public wallets: generatedWallet[];

  /**
   * @param mnemonic master mnemonic; an empty string generates a new one
   * @param address with `publicKey` creates a read-only wallet (no private key)
   * @param publicKey public key of the read-only wallet
   */
  public constructor(
    mnemonic: string,
    address?: string | null,
    publicKey?: Uint8Array | null
  ) {
    this.depth = 1; // current wallet depth
    this.id = 0; // current wallet account id

    if (address && publicKey) {
      this.mnemonic = "";
      // readonly wallet
      this.wallet = {
        privateKey: new Uint8Array(),
        publicKey,
        address,
        evmAddress: decodeCosmosAccountAddress(address) ?? address,
        id: this.id,
      };
    } else {
      const _mnemonic = mnemonic || generateMnemonic();

      if (!validateMnemonic(_mnemonic)) {
        throw new Error("Invalid mnemonic");
      }

      this.mnemonic = _mnemonic;
      // does not change with the derivation path
      this.validatorAddress = createDecimalWalletFromMnemonic(
        _mnemonic,
        VALIDATOR_ADDRESS_PREFIX,
        MASTER_DERIVATION_PATH
      ).address;
      this.wallet = createDecimalWalletFromMnemonic(_mnemonic);
    }

    this.privateKey = this.wallet.privateKey;
    this.publicKey = this.wallet.publicKey;
    this.evmAddress = this.wallet.evmAddress;
    this.address = this.wallet.address;

    this.gateUrl = "";

    // generated wallets including master wallet
    this.wallets = [this.wallet];
  }

  public setGateUrl(gateUrl: string): void {
    this.gateUrl = gateUrl;
  }

  public getGateUrl(): string {
    return this.gateUrl;
  }

  /** Private key of the current account as 0x-prefixed hex. */
  public getPrivateKeyHex(): string {
    return hexlify(this.privateKey);
  }

  /** Compressed public key of the current account as 0x-prefixed hex. */
  public getPublicKeyHex(): string {
    return hexlify(this.publicKey);
  }

  // switch to account by id
  public switchAccount(id: number) {
    try {
      if (typeof id === "undefined" || !Number.isInteger(id)) {
        throw new Error("Id must be of type number");
      }

      if (id > this.depth) {
        throw new Error(`You have not generated an account with ${id} id`);
      }

      const wallet = this.wallets[id];

      this.wallet = wallet;
      this.id = id;
      this.privateKey = wallet.privateKey;
      this.publicKey = wallet.publicKey;
      this.evmAddress = wallet.evmAddress;
      this.address = wallet.address;
    } catch (e) {
      console.error(e);
    }
  }

  // generate next account and switch to it
  public generateAccount() {
    try {
      const depth = this.depth + 1;

      if (depth >= MAX_ACCOUNTS_NUMBER) {
        throw new Error(
          `You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`
        );
      }

      const wallet = createDecimalWalletFromMnemonic(
        this.mnemonic,
        ADDRESS_PREFIX,
        generateDerivationPath(depth),
        depth - 1
      );

      this.depth = depth;
      this.wallets = [...this.wallets, wallet];
      this.switchAccount(depth - 1);
    } catch (e) {
      console.error(e);
    }
  }

  // generate accounts up to `depth` and switch to `id`
  public generateAndSwitchAccount(depth: number, id: number) {
    try {
      if (typeof depth === "undefined" || !Number.isInteger(depth)) {
        throw new Error("Depth must be of type number");
      }

      if (depth >= MAX_ACCOUNTS_NUMBER) {
        throw new Error(
          `You can not generate more then ${MAX_ACCOUNTS_NUMBER} accounts`
        );
      }

      let _id = id;

      if (typeof id === "undefined" || !Number.isInteger(id)) {
        _id = Math.max(depth, this.depth) - 1;
      }

      if (_id >= Math.max(depth, this.depth)) {
        throw new Error(
          `You can not switch to account, more then ${depth - 1} id`
        );
      }

      if (depth <= this.depth) {
        this.switchAccount(_id);
      }

      for (let _depth = this.depth + 1; _depth <= depth; _depth += 1) {
        const alreadyGenerated = this.wallets.some((wallet) => wallet.id === _depth - 1);
        if (!alreadyGenerated) {
          const wallet = createDecimalWalletFromMnemonic(
            this.mnemonic,
            ADDRESS_PREFIX,
            generateDerivationPath(_depth),
            _depth - 1
          );
          this.depth = _depth;
          this.wallets = [...this.wallets, wallet];
        }
      }

      this.switchAccount(_id);
    } catch (e) {
      console.error(e);
    }
  }

  /** Restores accounts previously saved with `sendAndSaveGeneratedWallets` (needs `setGateUrl`). */
  public async getAndUseGeneratedWallets() {
    try {
      const masterWallet = this.wallet;

      const ids = await getAndUseGeneratedWallets(this.gateUrl, masterWallet.address);

      if (ids && ids.length) {
        this.wallets = [masterWallet];
        this.switchAccount(masterWallet.id);
        ids.forEach((id: number) => {
          if (id !== masterWallet.id) {
            this.wallets.push({
              ...createDecimalWalletFromMnemonic(
                this.mnemonic,
                ADDRESS_PREFIX,
                generateDerivationPath(id + 1)
              ),
              id,
            });
          }
        });

        this.depth = this.wallets.length;

        console.info("[GET-GENERATED-WALLETS-STATUS]: TRUE");
      } else {
        console.info("[GET-GENERATED-WALLETS-STATUS]: FALSE");
      }
    } catch (e: any) {
      console.error("An error occurred during wallet synchronization", e.message);
      console.warn("[GET-GENERATED-WALLETS-STATUS]: FALSE");
    }
  }

  /** Saves ids of the generated accounts in the gate API (needs `setGateUrl`). */
  public async sendAndSaveGeneratedWallets() {
    try {
      const ids = this.wallets.map((wallet) => wallet.id);
      const updated = await sendAndSaveGeneratedWallets(this.gateUrl, this.wallets, ids);
      console.info(`[SAVE-GENERATED-WALLETS-STATUS]: ${updated.toString().toUpperCase()}`);
    } catch (e: any) {
      console.error("An error occurred during wallets's id adding", e.message);
      console.warn("[SAVE-GENERATED-WALLETS-STATUS]: FALSE");
    }
  }

  public static encodeCosmosAccountAddress(address: string, prefix = ADDRESS_PREFIX): string {
    return encodeCosmosAccountAddress(address, prefix);
  }

  public static decodeCosmosAccountAddress(address: string): string | null {
    return decodeCosmosAccountAddress(address);
  }
}
