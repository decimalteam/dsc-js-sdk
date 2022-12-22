import getAddress from "./api/getAddress";
import getBlockedAddresses from "./api/getBlockedAddresses";
import getCoin from "./api/getCoin";
import getCoinsList from "./api/getCoinsList";
import getMultisig from "./api/getMultisig";
import getMultisigsByAddress from "./api/getMultisigs";
import getMyCoins from "./api/getMyCoins";
import getMyTransactions from "./api/getMyTransactions";
import getNft from "./api/getNft";
import getNftStakesByAddress, { DelegationStatus } from "./api/getNftStakes";
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
import Wallet from "./wallet";
import { AddressBalance } from "./interfaces/addressBalance";
import { AddressTransaction } from "./interfaces/addressTransaction";
import requestLegacy from "./api/requestLegacy";
import { AddressNftBalance } from "./interfaces/addressNftBalance";
import { PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";
import getAddressbook from "./api/getAddressbook";
import createAddressbookItem, {
  AddressBookItem,
} from "./api/createAddressbookItem";
import updateAddressbookItem from "./api/updateAddressbookItem";
import deleteAddressbookItem from "./api/deleteAddressbookItem";
import {
  getApiEndpoint,
  getRestNodeEndpoint,
  getRpcEndpoint,
  NETWORKS,
} from "./endpoints";
const DEFAULT_ORDER_FIELD = "timestamp";
const DEFAULT_ORDER_DIRECTION = "DESC";
const DEFAULT_ORDER = `order[${DEFAULT_ORDER_FIELD}]=${DEFAULT_ORDER_DIRECTION}`;

const BASE_COINS = {
  [NETWORKS.DEVNET]: "del",
  [NETWORKS.TESTNET]: "tdel",
  [NETWORKS.MAINNET]: "del",
};

export interface CustomNodeEndpoints {
  rpc: string;
  rest: string;
}
export default class Decimal {
  private readonly rpcInstance: Client | undefined;
  private readonly apiInstance: DecimalApi;
  private readonly gateUrl: string;
  private readonly isNodeDirectMode: boolean;
  private readonly nodeRestUrl: string;
  private readonly network: NETWORKS;
  private wallet: Wallet | null = null;
  public static async connect(
    network: NETWORKS,
    isNodeDirectMode = false,
    customNodeEndpoint?: CustomNodeEndpoints
  ): Promise<Decimal> {
    try {
      const gateUrl = getApiEndpoint(network);
      let nodeRestUrl;
      let rpcEndpoint;
      if (customNodeEndpoint && isNodeDirectMode) {
        nodeRestUrl = customNodeEndpoint.rest;
        rpcEndpoint = customNodeEndpoint.rpc;
      } else {
        nodeRestUrl = getRestNodeEndpoint(network);
        rpcEndpoint = getRpcEndpoint(network, isNodeDirectMode);
      }
      console.log("rpcEndpoint", rpcEndpoint);
      const rpcInstance = await Client.connect(rpcEndpoint);
      const apiInstance = new DecimalApi(gateUrl);
      return new Decimal(
        network,
        isNodeDirectMode,
        rpcInstance,
        apiInstance,
        gateUrl,
        nodeRestUrl
      );
    } catch (e: any) {
      console.error(e);
      throw new Error("Creation decimal instance failed");
    }
  }
  private constructor(
    network: NETWORKS,
    isNodeDirectMode: boolean,
    rpcInstance: Client | undefined,
    apiInstance: DecimalApi,
    gateUrl: string,
    nodeRestUrl: string
  ) {
    this.network = network;
    this.isNodeDirectMode = isNodeDirectMode;
    this.rpcInstance = rpcInstance;
    this.apiInstance = apiInstance;
    this.gateUrl = gateUrl;
    this.nodeRestUrl = nodeRestUrl;
  }

  // api
  public getRpcInstance() {
    return this.rpcInstance;
  }
  public getApiInstance() {
    return this.apiInstance;
  }
  public getTxTypes() {
    return txTypesNew;
  }
  public getNetworkBaseCoin(): string {
    return BASE_COINS[this.network];
  }

  public setWallet(wallet: Wallet) {
    wallet.setNodeDirectMode(this.isNodeDirectMode);
    wallet.setGateUrl(this.gateUrl);
    wallet.setNodeRestUrl(this.nodeRestUrl);
    this.wallet = wallet;
  }
  public async transactionSender(
    baseCoin = this.getNetworkBaseCoin()
  ): Promise<Transaction> {
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
    return Transaction.getInstance(
      this.rpcInstance,
      this.wallet,
      chainId,
      account,
      baseCoin.toLowerCase()
    );
  }

  public verifyAddress(address: string, prefix = "d0") {
    return verifyAddress(address, prefix);
  }

  // API
  // addressbook
  public getAddressbook() {
    return getAddressbook.apply(this, [this.apiInstance, this.wallet])();
  }

  public createAddressbookItem(payload: AddressBookItem) {
    return createAddressbookItem.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(payload);
  }

  public updateAddressbookItem(itemId: number, payload: AddressBookItem) {
    return updateAddressbookItem.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(itemId, payload);
  }

  public deleteAddressbookItem(itemId: number) {
    return deleteAddressbookItem.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(itemId);
  }

  // return legacy
  public requestLegacy() {
    return requestLegacy.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])();
  }

  // multisigs
  public getMultisigsByAddress(address: string) {
    return getMultisigsByAddress.apply(this, [this.apiInstance as DecimalApi])(
      address
    );
  }
  public getMultisig(address: string) {
    return getMultisig.apply(this, [this.apiInstance as DecimalApi])(address);
  }
  public getMultisigTxs(address: string, limit = 1, offset = 0) {
    return getMultisigTxs.apply(this, [this.apiInstance as DecimalApi])(
      address,
      limit,
      offset
    );
  }
  // stakes
  public getStakesByAddress(address: string, status: string) {
    return getStakesByAddress.apply(this, [this.apiInstance as DecimalApi])(
      address,
      status
    );
  }
  public getValidator(address: string) {
    return getValidator.apply(this, [this.apiInstance as DecimalApi])(address);
  }
  // nft
  public getNft(id: number) {
    return getNft.apply(this, [this.apiInstance as DecimalApi, this.wallet])(
      id
    );
  }
  public getNftStakesByAddress(address: string, status: DelegationStatus) {
    return getNftStakesByAddress.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(address, status);
  }
  public getNfts(address: string, limit = 10, offset = 0, query: any = null) {
    return getNfts.apply(this, [this.apiInstance as DecimalApi, this.wallet])(
      address,
      limit,
      offset,
      query
    );
  }
  public getNftTxes(id: number, limit = 10, offset = 0, order = DEFAULT_ORDER) {
    return getNftTxes.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(id, limit, offset, order);
  }
  public getNftsTxes(
    address: string,
    limit = 10,
    offset = 0,
    order = DEFAULT_ORDER
  ) {
    return getNftsTxes.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(address, limit, offset, order);
  }
  // coins
  public getCoin(symbol: any) {
    return getCoin.apply(this, [this.apiInstance as DecimalApi])(symbol);
  }
  public async checkCoinExists(symbol: any): Promise<boolean> {
    try {
      const resp = await this.getCoin(symbol);
      console.log(resp);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  public getMyCoins(limit: number, offset: number) {
    return getMyCoins.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(limit, offset);
  }
  public getMyTransactions(limit = 10, offset = 0, types: any, coins: any) {
    return getMyTransactions.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(limit, offset, types, coins);
  }
  public getCoinsList(limit = 10, offset = 0, query: any) {
    return getCoinsList.apply(this, [this.apiInstance as DecimalApi])(
      limit,
      offset,
      query
    );
  }
  // addresses
  public getAddress(address: string, txLimit = 10) {
    return getAddress.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(address, txLimit);
  }
  public getBlockedAddresses(
    limit = 10,
    offset = 0,
    type?: object,
    q?: object
  ) {
    return getBlockedAddresses.apply(this, [
      this.apiInstance as DecimalApi,
      this.wallet,
    ])(limit, offset, type, q);
  }

  public async getAddressBalances(
    address: string
  ): Promise<AddressBalance | undefined> {
    return this.apiInstance?.getAddressBalances(address);
  }

  public async getAddressTransactions(
    address: string,
    options?: { limit?: number; offset?: number }
  ): Promise<{ count: number; items: AddressTransaction[] } | undefined> {
    return this.apiInstance?.getAddressTransactions(address, options);
  }

  public async getAddressNftsBalances(
    address: string
  ): Promise<AddressNftBalance[] | undefined> {
    return this.apiInstance?.getAddressNftsBalances(address, this.wallet);
  }
}
