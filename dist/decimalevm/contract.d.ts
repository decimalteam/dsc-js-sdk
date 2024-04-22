import { ethers, HDNodeWallet, InterfaceAbi } from "ethers";
import { NETWORKS } from "../endpoints";
export default class DecimalContractEVM {
    private readonly network;
    private readonly account;
    readonly contract: ethers.Contract;
    readonly abi: InterfaceAbi;
    readonly tx_hash: string | null;
    private constructor();
    static getContract(network: NETWORKS, apiEndpoint: string, account: HDNodeWallet, address: string, jsonInterface?: InterfaceAbi): Promise<DecimalContractEVM>;
    static verifyСontract(apiEndpoint: string, address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean>;
    call(action: string, ...params: any[]): Promise<any>;
    estimateGas(action: string, ...params: any[]): Promise<bigint>;
    parseLog(logs: any): any;
    getDefaultOptions(): Promise<{
        chainId: bigint | undefined;
        gasLimit: bigint;
        gasPrice: bigint;
        nonce: number | undefined;
    }>;
    populateTransaction(action: string, ...params: any[]): Promise<ethers.ContractTransaction>;
    signTransaction(tx: ethers.ContractTransaction): Promise<string>;
    sendTransaction(signedTx: ethers.TransactionRequest): Promise<ethers.TransactionReceipt | null>;
    sendSignedTransaction(signedTx: string): Promise<ethers.TransactionReceipt | null | undefined>;
}
