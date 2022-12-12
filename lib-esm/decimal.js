import getAddress from "./api/getAddress";
import getBlockedAddresses from "./api/getBlockedAddresses";
import getCoin from "./api/getCoin";
import getCoinsList from "./api/getCoinsList";
import getMultisig from "./api/getMultisig";
import getMultisigsByAddress from "./api/getMultisigs";
import getMyCoins from "./api/getMyCoins";
import getMyTransactions from "./api/getMyTransactions";
import getNft from "./api/getNft";
import getNftStakesByAddress from "./api/getNftStakes";
import getNftTxes from "./api/getNftTxes";
import getNfts from "./api/getNfts";
import getNftsTxes from "./api/getNftsTxes";
import getStakesByAddress from "./api/getStakes";
import getMultisigTxs from "./api/getMultisigTxs";
import getValidator from "./api/getValidator";
import { verifyAddress } from "./utils/walletUtils";
import DecimalApi from "./api/index";
import Client from "./client";
import { Transaction } from "./transaction";
import txTypesNew from "./txTypesNew";
import requestLegacy from "./api/requestLegacy";
import { PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";
import getAddressbook from "./api/getAddressbook";
import createAddressbookItem from "./api/createAddressbookItem";
import updateAddressbookItem from "./api/updateAddressbookItem";
import deleteAddressbookItem from "./api/deleteAddressbookItem";
import { getApiEndpoint, getRestNodeEndpoint, getRpcEndpoint, NETWORKS, } from "./endpoints";
const DEFAULT_ORDER_FIELD = "timestamp";
const DEFAULT_ORDER_DIRECTION = "DESC";
const DEFAULT_ORDER = `order[${DEFAULT_ORDER_FIELD}]=${DEFAULT_ORDER_DIRECTION}`;
const BASE_COINS = {
    [NETWORKS.DEVNET]: "del",
    [NETWORKS.TESTNET]: "tdel",
    [NETWORKS.MAINNET]: "del",
};
export default class Decimal {
    constructor(network, rpcInstance, apiInstance, gateUrl, nodeRestUrl) {
        this.wallet = null;
        this.network = network;
        this.rpcInstance = rpcInstance;
        this.apiInstance = apiInstance;
        this.gateUrl = gateUrl;
        this.nodeRestUrl = nodeRestUrl;
    }
    static async connect(network, isNodeDirectMode = false, customNodeEndpoint) {
        try {
            const gateUrl = getApiEndpoint(network);
            let nodeRestUrl;
            let rpcEndpoint;
            if (customNodeEndpoint && isNodeDirectMode) {
                nodeRestUrl = customNodeEndpoint.rest;
                rpcEndpoint = customNodeEndpoint.rpc;
            }
            else {
                nodeRestUrl = getRestNodeEndpoint(network);
                rpcEndpoint = getRpcEndpoint(network, isNodeDirectMode);
            }
            console.log("rpcEndpoint", rpcEndpoint);
            const rpcInstance = await Client.connect(rpcEndpoint);
            const apiInstance = new DecimalApi(gateUrl);
            return new Decimal(network, rpcInstance, apiInstance, gateUrl, nodeRestUrl);
        }
        catch (e) {
            console.error(e);
            throw new Error("Creation decimal instance failed");
        }
    }
    // api
    getRpcInstance() {
        return this.rpcInstance;
    }
    getApiInstance() {
        return this.apiInstance;
    }
    getTxTypes() {
        return txTypesNew;
    }
    getNetworkBaseCoin() {
        return BASE_COINS[this.network];
    }
    setWallet(wallet) {
        wallet.setGateUrl(this.gateUrl);
        wallet.setNodeRestUrl(this.nodeRestUrl);
        this.wallet = wallet;
    }
    async transactionSender(baseCoin = this.getNetworkBaseCoin()) {
        if (!this.wallet) {
            throw new Error("You should set Wallet before sending transactions");
        }
        if (!this.rpcInstance) {
            throw new Error("Decimal client is disconnected");
        }
        const chainId = await this.rpcInstance.getChainId();
        let account = await this.rpcInstance.getAccount(this.wallet.address);
        if (!account) {
            console.error("Account not found");
            account = {
                address: this.wallet.address,
                pubkey: PubKey.fromPartial({ key: this.wallet.publicKey }),
                accountNumber: 0,
                sequence: 0,
            };
        }
        return Transaction.getInstance(this.rpcInstance, this.wallet, chainId, account, baseCoin.toLowerCase());
    }
    verifyAddress(address, prefix = "d0") {
        return verifyAddress(address, prefix);
    }
    // API
    // addressbook
    getAddressbook() {
        return getAddressbook.apply(this, [this.apiInstance, this.wallet])();
    }
    createAddressbookItem(payload) {
        return createAddressbookItem.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(payload);
    }
    updateAddressbookItem(itemId, payload) {
        return updateAddressbookItem.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(itemId, payload);
    }
    deleteAddressbookItem(itemId) {
        return deleteAddressbookItem.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(itemId);
    }
    // return legacy
    requestLegacy() {
        return requestLegacy.apply(this, [
            this.apiInstance,
            this.wallet,
        ])();
    }
    // multisigs
    getMultisigsByAddress(address) {
        return getMultisigsByAddress.apply(this, [this.apiInstance])(address);
    }
    getMultisig(address) {
        return getMultisig.apply(this, [this.apiInstance])(address);
    }
    getMultisigTxs(address, limit = 1, offset = 0) {
        return getMultisigTxs.apply(this, [this.apiInstance])(address, limit, offset);
    }
    // stakes
    getStakesByAddress(address, status) {
        return getStakesByAddress.apply(this, [this.apiInstance])(address, status);
    }
    getValidator(address) {
        return getValidator.apply(this, [this.apiInstance])(address);
    }
    // nft
    getNft(id) {
        return getNft.apply(this, [this.apiInstance, this.wallet])(id);
    }
    getNftStakesByAddress(address, status) {
        return getNftStakesByAddress.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(address, status);
    }
    getNfts(address, limit = 10, offset = 0, query = null) {
        return getNfts.apply(this, [this.apiInstance, this.wallet])(address, limit, offset, query);
    }
    getNftTxes(id, limit = 10, offset = 0, order = DEFAULT_ORDER) {
        return getNftTxes.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(id, limit, offset, order);
    }
    getNftsTxes(address, limit = 10, offset = 0, order = DEFAULT_ORDER) {
        return getNftsTxes.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(address, limit, offset, order);
    }
    // coins
    getCoin(symbol) {
        return getCoin.apply(this, [this.apiInstance])(symbol);
    }
    async checkCoinExists(symbol) {
        try {
            const resp = await this.getCoin(symbol);
            console.log(resp);
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    getMyCoins(limit, offset) {
        return getMyCoins.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(limit, offset);
    }
    getMyTransactions(limit = 10, offset = 0, types, coins) {
        return getMyTransactions.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(limit, offset, types, coins);
    }
    getCoinsList(limit = 10, offset = 0, query) {
        return getCoinsList.apply(this, [this.apiInstance])(limit, offset, query);
    }
    // addresses
    getAddress(address, txLimit = 10) {
        return getAddress.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(address, txLimit);
    }
    getBlockedAddresses(limit = 10, offset = 0, type, q) {
        return getBlockedAddresses.apply(this, [
            this.apiInstance,
            this.wallet,
        ])(limit, offset, type, q);
    }
    async getAddressBalances(address) {
        var _a;
        return (_a = this.apiInstance) === null || _a === void 0 ? void 0 : _a.getAddressBalances(address);
    }
    async getAddressTransactions(address, options) {
        var _a;
        return (_a = this.apiInstance) === null || _a === void 0 ? void 0 : _a.getAddressTransactions(address, options);
    }
    async getAddressNftsBalances(address) {
        var _a;
        return (_a = this.apiInstance) === null || _a === void 0 ? void 0 : _a.getAddressNftsBalances(address, this.wallet);
    }
}
//# sourceMappingURL=decimal.js.map