import axios, { AxiosInstance, Method } from "axios";

import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import { TransactionReceipt } from "web3-core";

export default class DecimalContract {
  private readonly rpcUrl: string;
  private readonly gateUrl: string;
  private addressFrom: string;
  private privateKey: Uint8Array;

  private readonly web3: Web3;
  private contract?: Contract;
  private jsonInterface?: AbiItem[];
  private readonly requester: AxiosInstance;
  public constructor(rpcEndpoint: string, apiEndpoint: string) {
    this.rpcUrl = rpcEndpoint;
    this.gateUrl = apiEndpoint;
    this.requester = axios.create();
    this.privateKey = new Uint8Array();
    this.addressFrom = "";
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
  }

  public setAddressFrom(address: string) {
    this.addressFrom = address;
    this.web3.defaultAccount = address;
  }

  public setPrivateKey(privateKey: Uint8Array) {
    this.privateKey = privateKey;
  }

  request(
    _path: string,
    params: any = null,
    method: Method = "get",
    destination: string,
    data = null
  ) {
    return axios.request({
      method,
      url: _path,
      baseURL: destination,
      params,
      data,
    });
  }

  public async getContract(address: string): Promise<DecimalContract> {
    const { data } = await this.request(
      `/evm-contracts/${address}`,
      {},
      "get",
      this.gateUrl
    );

    this.jsonInterface = data.result.abi;
    this.contract = new this.web3.eth.Contract(data.result.abi, address);
    return this;
  }

  public async call(action: string, ...params: any[]): Promise<any> {
    return this.contract?.methods[action](...params).call();
  }

  public async estimateGas(action: string, ...params: any[]): Promise<any> {
    return this.contract?.methods[action](...params).estimateGas({
      from: this.addressFrom,
    });
  }

  private async createRawTransaction(
    to: string,
    data: string,
    gasEstimate: number
  ): Promise<any> {
    const privateKey = Buffer.from(this.privateKey);

    const signedTx = await this.web3.eth.accounts.signTransaction(
      {
        nonce: await this.web3.eth.getTransactionCount(this.addressFrom),
        gasPrice: this.web3.utils.numberToHex(
          await this.web3.eth.getGasPrice()
        ),
        gas: this.web3.utils.numberToHex(gasEstimate),
        from: this.addressFrom,
        to: to,
        value: "0x00",
        data: data,
        chainId: await this.web3.eth.getChainId(),
      },
      privateKey.toString("hex")
    );

    if (signedTx.rawTransaction == undefined) {
      throw new Error("Contract is undefined");
    }

    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }

  public async send(
    action: string,
    ...params: any[]
  ): Promise<TransactionReceipt> {
    const functionData = this.contract?.methods[action](...params);
    const encode = functionData.encodeABI();
    const gasEstimate = await functionData.estimateGas({
      from: this.addressFrom,
    });

    if (this.contract == undefined) {
      throw new Error("Contract is undefined");
    }

    return await this.createRawTransaction(
      this.contract.options.address,
      encode,
      gasEstimate
    );
  }
}
