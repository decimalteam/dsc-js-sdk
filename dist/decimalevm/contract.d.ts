import { ethers, Wallet as HDNodeWallet } from "ethers";
import { NETWORKS } from "../endpoints";
export default class DecimalContractEVM {
    private readonly network;
    private readonly account;
    readonly contract: ethers.Contract;
    readonly abi: ethers.ContractInterface;
    readonly tx_hash: string | null;
    private constructor();
    static getContract(network: NETWORKS, apiEndpoint: string, account: HDNodeWallet, address: string, jsonInterface?: ethers.ContractInterface): Promise<DecimalContractEVM>;
    static verifyСontract(apiEndpoint: string, address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean>;
    call(action: string, ...params: any[]): Promise<any>;
    estimateGas(action: string, ...params: any[]): Promise<import("@ethersproject/bignumber").BigNumber>;
    parseLog(logs: any): any;
    getDefaultOptions(): Promise<{
        gasLimit: bigint;
        gasPrice: import("@ethersproject/bignumber").BigNumber;
        nonce: number;
    }>;
    populateTransaction(action: string, ...params: any[]): Promise<ethers.PopulatedTransaction>;
    signTransaction(tx: ethers.providers.TransactionRequest): Promise<string>;
    sendTransaction(tx: ethers.providers.TransactionRequest): Promise<ethers.providers.TransactionReceipt>;
    sendSignedTransaction(signedTx: string): Promise<ethers.providers.TransactionReceipt>;
}
