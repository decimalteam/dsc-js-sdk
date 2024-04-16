
import {ethers, HDNodeWallet, InterfaceAbi} from "ethers";
import {
  NETWORKS,
} from "../endpoints";
import axios from "axios";

export default class DecimalContractEVM {

  private readonly network: NETWORKS;
  private readonly account: HDNodeWallet;
  public readonly contract: ethers.Contract;
  public readonly abi: InterfaceAbi;
  public readonly tx_hash: string | null;
  private constructor(network: NETWORKS, account: HDNodeWallet, contract: ethers.Contract, abi: InterfaceAbi, tx_hash: string | null) {
    this.network = network
    this.account = account;
    this.contract = contract;
    this.abi = abi;
    this.tx_hash = tx_hash;
  }

  public static async getContract(
    network: NETWORKS,
    apiEndpoint: string,
    account: HDNodeWallet,
    address: string,
    jsonInterface?: InterfaceAbi
  ): Promise<DecimalContractEVM> {
    let abi;
    let tx_hash = null;
    if (jsonInterface) {
        abi = jsonInterface;
    } else {
      try {
        const { data } = await axios.request({
          method: "get",
          url: `v1/contracts/${address.toLowerCase()}`,
          baseURL: apiEndpoint,
          params: {},
          data: null
        });
        abi = data.Result?.abi
        tx_hash = data.Result?.tx_hash
      } catch {
        throw new Error(`Error loading abi. Contract ${address} not found`);
      }
    }

    if (!abi) {
      throw new Error(`Contract abi is not set ${address}`);
    }

    const contract = new ethers.Contract(address, abi, account);
    return new DecimalContractEVM(
        network,
        account,
        contract,
        abi,
        tx_hash
    );
  }

  public static async verifyСontract(
    apiEndpoint: string,
    address: string,
    contract_code: string,
    compiler: string,
    optimizer: string,
    runs: string,
    evm_version: string
  ): Promise<boolean>
  {
    try {
      const data = new URLSearchParams();
      data.append('compiler', compiler);
      data.append('optimizer', optimizer);
      data.append('runs', runs);
      data.append('evm_version', evm_version);
      data.append('contract_code', contract_code);

      let dataNew = data.toString().replace('%EF%BB%BF', '')
      await axios.request({
        method: "post",
        url: `v1/contracts/${address.toLowerCase()}/verification`,
        baseURL: apiEndpoint,
        params: {},
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Accept": 'application/json'
        },
        data: dataNew
      }).catch(function (error) {
        throw new Error(`Error verification. Error: ${error.response.data.Error}. Message: ${error.response.data.Message}`);
      });
      return true
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  public async call(action: string, ...params: any[]): Promise<any> {
    const result = await this.contract[action](...params);
    if (typeof result.wait == "function") return await result.wait()
    return result
  }

  public async estimateGas(action: string, ...params: any[]) {
    return await this.contract[action].estimateGas(...params);
  }

  public parseLog(logs:any) {
    console.log(logs)
    return logs
    .filter((log:any) => (ethers.getAddress(log.address) == ethers.getAddress(this.contract.target.toString())))
    .map((log:any) => {
      try {
        return this.contract.interface.parseLog(log);
      } catch {
        return undefined;
      }
    })
  }

  public async getDefaultOptions() {
    let gasPrice = (await this.account.provider?.getFeeData())?.gasPrice!
    if (this.network == NETWORKS.TESTNET) {
      gasPrice = gasPrice + BigInt(1)
    }
    return {
      chainId: (await this.account.provider?.getNetwork())?.chainId,
      gasLimit: BigInt(500000),
      gasPrice: gasPrice,
      nonce: await this.account.provider?.getTransactionCount(this.account.address, 'latest'),
    }
  }
  
  public async populateTransaction(action: string, ...params: any[]) {
    return await this.contract[action].populateTransaction(...params);
  }

  public async signTransaction(tx: ethers.ContractTransaction) {
    return await this.account.signTransaction(tx);
  }

  public async sendTransaction(signedTx: ethers.TransactionRequest) {
    return await this.account.sendTransaction(signedTx).then(tx => tx.wait())
  }
  public async sendSignedTransaction(signedTx: string) {
    return await this.account.provider?.broadcastTransaction(signedTx).then(tx => tx.wait())
  }


}
