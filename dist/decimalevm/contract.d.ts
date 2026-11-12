import { ethers, HDNodeWallet } from "ethers";
import { NETWORKS } from "../endpoints";
export default class DecimalContractEVM {
    private readonly network;
    private readonly account;
    readonly contract: ethers.Contract;
    readonly abi: ethers.InterfaceAbi;
    private constructor();
    /** Address of the contract. */
    get address(): string;
    static getContract(network: NETWORKS, apiEndpoint: string, account: HDNodeWallet, address: string, jsonInterface?: ethers.InterfaceAbi): Promise<DecimalContractEVM>;
    static verifyСontract(apiEndpoint: string, address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean>;
    call(action: string, ...params: any[]): Promise<any>;
    estimateGas(action: string, ...params: any[]): Promise<bigint>;
    parseLog(logs: any): any;
    getDefaultOptions(): Promise<{
        gasLimit: bigint;
        gasPrice: bigint;
        nonce: number | undefined;
    }>;
    populateTransaction(action: string, ...params: any[]): Promise<ethers.ContractTransaction>;
    signTransaction(tx: ethers.TransactionRequest): Promise<string>;
    sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionReceipt | null>;
    sendSignedTransaction(signedTx: string): Promise<ethers.TransactionReceipt | null | undefined>;
}
