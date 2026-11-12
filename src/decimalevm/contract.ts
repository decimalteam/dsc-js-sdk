
import { ethers, HDNodeWallet } from "ethers";
import {
  NETWORKS,
} from "../endpoints";

export default class DecimalContractEVM {

  private readonly network: NETWORKS;
  private readonly account: HDNodeWallet;
  public readonly contract: ethers.Contract;
  public readonly abi: ethers.InterfaceAbi;
  private constructor(network: NETWORKS, account: HDNodeWallet, contract: ethers.Contract, abi: ethers.InterfaceAbi) {
    this.network = network
    this.account = account;
    this.contract = contract;
    this.abi = abi;
  }

  /** Address of the contract. */
  public get address(): string {
    return this.contract.target as string;
  }

  public static async getContract(
    network: NETWORKS,
    apiEndpoint: string,
    account: HDNodeWallet,
    address: string,
    jsonInterface?: ethers.InterfaceAbi
  ): Promise<DecimalContractEVM> {
    let abi;
    if (jsonInterface) {
        abi = jsonInterface;
    } else {
      try {
        const res = await fetch(`${apiEndpoint}v1/contracts/compact/${address.toLowerCase()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: any = await res.json();
        abi = data.Result?.abi
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
        abi
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
    {
      const data = new URLSearchParams();
      data.append('compiler', compiler);
      data.append('optimizer', optimizer);
      data.append('runs', runs);
      data.append('evm_version', evm_version);
      data.append('contract_code', contract_code);

      const dataNew = data.toString().replace('%EF%BB%BF', '')
      const res = await fetch(`${apiEndpoint}v1/contracts/${address.toLowerCase()}/verification`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
          "Accept": 'application/json'
        },
        body: dataNew
      });
      if (!res.ok) {
        const error: any = await res.json().catch(() => ({}));
        throw new Error(`Error verification. Error: ${error.Error}. Message: ${error.Message}`);
      }
      return true
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
    return logs
    .filter((log:any) => (ethers.getAddress(log.address) == ethers.getAddress(this.address)))
    .map((log:any) => {
      try {
        return this.contract.interface.parseLog(log);
      } catch {
        return undefined;
      }
    })
  }

  public async getDefaultOptions() {
    let gasPrice = (await this.account.provider!.getFeeData()).gasPrice!
    if (this.network == NETWORKS.TESTNET) {
      gasPrice = gasPrice + BigInt(1)
    }
    return {
      gasLimit: BigInt(500000),
      gasPrice: gasPrice,
      nonce: await this.account.provider?.getTransactionCount(this.account.address, 'latest'),
    }
  }
  
  public async populateTransaction(action: string, ...params: any[]) {
    return await this.contract[action].populateTransaction(...params);
  }

  public async signTransaction(tx: ethers.TransactionRequest) {
    return await this.account.signTransaction(tx);
  }

  public async sendTransaction(tx: ethers.TransactionRequest) {
    return await this.account.sendTransaction(tx).then(tx => tx.wait())
  }
  public async sendSignedTransaction(signedTx: string) {
    return await this.account.provider?.broadcastTransaction(signedTx).then(tx => tx.wait())
  }


}
