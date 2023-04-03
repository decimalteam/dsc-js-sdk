import axios, { AxiosInstance, Method } from "axios";

import Contract from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import Web3 from "web3";

export default class DecimalContract {
  private readonly rpcUrl: string;
  private readonly gateUrl: string;
  private addressFrom?: string;

  private contract?: Contract;
  private jsonInterface?: AbiItem[];
  private readonly requester: AxiosInstance;
  public constructor(rpcEndpoint: string, apiEndpoint: string) {
    this.rpcUrl = rpcEndpoint;
    this.gateUrl = apiEndpoint;
    this.requester = axios.create();
    console.log(this.gateUrl);
  }

  public setAddressFrom(address: string | undefined) {
    this.addressFrom = address;
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
    const web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
    this.contract = new web3.eth.Contract(data.result.abi, address);
    return this;
  }

  public async call(
    action: string,
    params?: any[] | undefined,
    options?: Object | undefined
  ): Promise<any> {
    return this.contract?.methods[action]().call(options);
  }

  public async send(): Promise<any> {
    return this.contract?.methods.decimals();
  }

  // public async getDRC20(address: string): Promise<any> {
  //   const;
  //   return this;
  // }
}
