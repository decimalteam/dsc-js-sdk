import axios from "axios";
import { perpareTimestampAndSignature } from "../utils/walletUtils";
/*
export default function DecimalApi(options) {
  if (!options.baseURL) {
    throw new Error('Invalid baseURL');
  }

  const instance = axios.create(options);

  return instance;
}
*/
// const GATEWAY = 'gateUrl';
// const RPC = 'rpcURL';
// const REST = 'restURL';
export default class DecimalApi {
    constructor(apiEndpoint) {
        this.gateUrl = apiEndpoint;
        this.requester = axios.create();
    }
    request(_path, params = null, method = "get", destination, data = null) {
        return axios.request({
            method,
            url: _path,
            baseURL: destination,
            params,
            data,
        });
    }
    async getNodeInfo() {
        const { data } = await this.request("rpc/node_info", null, "get", this.gateUrl);
        return data;
    }
    async getTransactionByHash(hash) {
        try {
            const { data } = await this.request(`rpc/tx/${hash}`, null, "get", this.gateUrl);
            return data.result;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
    //
    async getAddress(address, params) {
        const { data } = await this.request(`/address/${address}`, params, "get", this.gateUrl);
        return data.result;
    }
    async returnLegacy(payload) {
        const { data } = await this.request(`/rpc/check-legacy`, null, "post", this.gateUrl, payload);
        return data;
    }
    async getAddressbook(params) {
        const { data } = await this.request(`/addressbook`, params, "get", this.gateUrl);
        return data;
    }
    async createAddressbookItem(payload, params) {
        const { data } = await this.request(`/addressbook/create`, params, "post", this.gateUrl, payload);
        return data;
    }
    async updateAddressbookItem(itemId, payload, params) {
        const { data } = await this.request(`/addressbook/${itemId}`, params, "put", this.gateUrl, payload);
        return data;
    }
    async deleteAddressbookItem(itemId, params) {
        const { data } = await this.request(`/addressbook/${itemId}`, params, "delete", this.gateUrl);
        return data;
    }
    async getMultisigsByAddress(address) {
        const { data } = await this.request(`/address/${address}/multisigs`, null, "get", this.gateUrl);
        return data.result;
    }
    async getStakes(address) {
        const { data } = await this.request(`/address/${address}/stakes`, null, "get", this.gateUrl);
        return data.result;
    }
    async getNftStakes(address, params) {
        const { data } = await this.request(`/address/${address}/nfts/stakes`, params, "get", this.gateUrl);
        return data.result;
    }
    async getSpecificStakes(address, status) {
        const { data } = await this.request(`/address/${address}/stakes/${status}`, null, "get", this.gateUrl);
        return data.result;
    }
    async getNftSpecificStakes(address, status, params) {
        const { data } = await this.request(`/address/${address}/nfts/stakes/${status}`, params, "get", this.gateUrl);
        return data.result;
    }
    async getCoin(symbol) {
        const { data } = await this.request(`/coin/${symbol.toLowerCase()}`, null, "get", this.gateUrl);
        return data.result;
    }
    async getCoinsList(params) {
        const { data } = await this.request("/coin", params, "get", this.gateUrl);
        return data.result;
    }
    async getCoinsByAddress(address, params) {
        const { data } = await this.request(`/address/${address}/coins`, params, "get", this.gateUrl);
        return data.result;
    }
    async getTransactionsByAddress(address, params) {
        const { data } = await this.request(`/address/${address}/txs`, params, "get", this.gateUrl);
        return data.result;
    }
    async getTransaction(hash) {
        const { data } = await this.request("/rpc/tx", { hash: `0x${hash}` }, "get", this.gateUrl);
        return data.result;
    }
    async getMultisig(address) {
        const { data } = await this.request(`/multisig/${address}`, null, "get", this.gateUrl);
        return data.result;
    }
    async getMultisigTxs(address, params) {
        const { data } = await this.request(`/multisig/${address}/txs`, params, "get", this.gateUrl);
        return data.result;
    }
    async getNftById(id, params) {
        const { data } = await this.request(`/nfts/${id}`, params, "get", this.gateUrl);
        return data.result;
    }
    //
    async getNfts(address, params) {
        const { data } = await this.request(`/address/${address}/nfts`, params, "get", this.gateUrl);
        return data.result;
    }
    async getNftTxes(id, params, order) {
        const { data } = await this.request(`/nfts/${id}/txs?${order}`, params, "get", this.gateUrl);
        return data.result;
    }
    async getNftsTxes(address, params, order) {
        const { data } = await this.request(`/address/${address}/nfts/txs?${order}`, params, "get", this.gateUrl);
        return data.result;
    }
    async updateAddressBlockingData(address, payload) {
        const { data } = await this.request(`/address/${address}/blocking-data`, null, "put", this.gateUrl, payload);
        return data.result;
    }
    async getBlockedAddresses(params) {
        const { data } = await this.request("/blocked-addresses", params, "get", this.gateUrl);
        return data.result;
    }
    async getProposals() {
        const { data } = await this.request("/proposals", null, "get", this.gateUrl);
        return data.result;
    }
    async getValidator(address) {
        const { data } = await this.request(`/validator/${address}`, null, "get", this.gateUrl);
        return data.result;
    }
    //
    // async requestAccountSequence(address, increaseTheSequence = false) { // old version
    //   console.log('requestAccountSequence');
    //   const path = increaseTheSequence ? `/accounts/${address}` : `/auth/accounts/${address}`;
    //
    //   const { data } = await this.request(path, null, 'get', REST);
    //
    //   return data.result;
    // }
    //
    // // method with modified rpc account request to get nonce with unconfirmed txes
    // // new version, autoincrement do not need, becouse of mempool txes in new request
    // async requestAccountSequenceWithUnconfirmedTxes(address) {
    //   const path = `/auth/accounts-with-unconfirmed-nonce/${address}`;
    //
    //   const { data } = await this.request(path, null, 'get', REST);
    //
    //   return data.result;
    // }
    //
    // async broadcastTx(txData) {
    //   const resp = await this.request('/txs', null, 'post', REST, txData);
    //
    //   return resp.data;
    // }
    //
    // async encodeTx(tx) {
    //   console.log('encodeTx request');
    //   const resp = await this.request('/txs/encode', null, 'post', REST, tx);
    //   console.log(tx);
    //   console.log(tx.msg);
    //   console.log(resp.data);
    //   return resp.data;
    // }
    //
    async getAddressBalances(address) {
        const { data } = await this.request(`/address/${address}/balances`, null, "get", this.gateUrl);
        return data.result;
    }
    async getAddressTransactions(address, options) {
        const { data } = await this.request(`/address/${address}/txs`, {
            limit: options === null || options === void 0 ? void 0 : options.limit,
            offset: options === null || options === void 0 ? void 0 : options.offset,
        }, "get", this.gateUrl);
        return data.result;
    }
    async getAddressNftsBalances(address, wallet) {
        const { data } = await this.request(`/address/${address}/nfts/balances`, address === (wallet === null || wallet === void 0 ? void 0 : wallet.address)
            ? { ...perpareTimestampAndSignature(wallet) }
            : {}, "get", this.gateUrl);
        return data.result;
    }
}
//# sourceMappingURL=index.js.map