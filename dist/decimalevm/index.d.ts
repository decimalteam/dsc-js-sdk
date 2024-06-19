/// <reference types="node" />
import { BigNumberish, ethers, Wallet as HDNodeWallet } from "ethers";
import { NETWORKS } from "../endpoints";
import Wallet from "../wallet";
import DecimalContractEVM from "./contract";
import { TypeNFT, Token, NFTCollection, ValidotorStake } from "./call";
import { TokenType } from "./interfaces/delegation";
import { ValidatorMeta, ValidatorStatus } from "./interfaces/validator";
import { SafeSignature, SafeTransaction } from "./multisig/execution";
export default class DecimalEVM {
    private readonly network;
    private readonly wallet;
    private readonly apiUrl;
    private readonly subgraph;
    private readonly ipfs;
    private call?;
    private contractAddesses?;
    provider: ethers.providers.JsonRpcProvider;
    account: HDNodeWallet;
    private contarcts;
    private abis;
    multisig: {
        buildTxSendDEL: (address: string, amount: string | number | bigint) => Promise<SafeTransaction>;
        signTx: (safeAddress: string, safeTx: SafeTransaction) => Promise<SafeSignature>;
        executeTx: (safeTx: SafeTransaction, signatures: SafeSignature[], safeAddress: string) => Promise<any>;
    };
    constructor(wallet: Wallet, network: NETWORKS);
    private getContract;
    connect(contractName?: string): Promise<void>;
    private checkConnect;
    private initFromImplementation;
    multiCall(callData: {
        target: string;
        value: string | number | bigint | BigNumberish;
        iface: string;
        params: any;
    }[], estimateGas?: boolean): Promise<any>;
    multiSendToken(multiData: {
        token: string;
        to: string;
        amount: any;
    }[], estimateGas?: boolean): Promise<any>;
    sendDEL(address: string, amount: string | number | bigint | BigNumberish, estimateGas?: boolean): Promise<import("@ethersproject/bignumber").BigNumber | ethers.ContractReceipt>;
    burnDEL(amount: string | number | bigint | BigNumberish, estimateGas?: boolean): Promise<import("@ethersproject/bignumber").BigNumber | ethers.ContractReceipt>;
    createToken(payload: Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: any;
        tokenAddress: any;
        estimateGas: any;
    }>;
    convertToken(tokenIn: string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    approveToken(tokenAddress: string, spender: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferToken(tokenAddress: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferFromToken(tokenAddress: string, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    burnToken(tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    buyTokenForExactDEL(tokenAddress: string, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    buyExactTokenForDEL(tokenAddress: string, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellTokensForExactDEL(tokenAddress: string, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellExactTokensForDEL(tokenAddress: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    updateDetailsToken(tokenAddress: string, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    permitToken(tokenAddress: string, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<any>;
    createCollectionERC721(payload: NFTCollection, estimateGas?: boolean): Promise<{
        tx: any;
        nftCollectionAddress: any;
        estimateGas: any;
    }>;
    createCollectionERC1155(payload: NFTCollection, estimateGas?: boolean): Promise<{
        tx: any;
        nftCollectionAddress: any;
        estimateGas: any;
    }>;
    approveNFT721(nftCollectionAddress: string, to: string, tokenId: string | number | bigint, estimateGas?: boolean): Promise<any>;
    approveForAllNFT(nftCollectionAddress: string, to: string, approved: boolean, estimateGas?: boolean): Promise<any>;
    mintNFTWithDELReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: any;
        tokenId: any;
        estimateGas: any;
    }>;
    mintNFTWithTokenReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: any;
        tokenId: any;
        estimateGas: any;
    }>;
    addDELReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addTokenReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferNFT(nftCollectionAddress: string, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferBatchNFT1155(nftCollectionAddress: string, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean): Promise<any>;
    disableMintNFT(nftCollectionAddress: string, estimateGas?: boolean): Promise<any>;
    burnNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    setBaseURINFT(nftCollectionAddress: string, baseURI: string, estimateGas?: boolean): Promise<any>;
    setTokenURINFT(nftCollectionAddress: string, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean): Promise<any>;
    delegateDEL(validator: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    delegateToken(validator: string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<any>;
    withdrawStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    applyPenaltyToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<{
        tx: any;
        error: any;
        estimateGas: any;
    }>;
    applyPenaltiesToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<{
        tx: any;
        error: any;
        estimateGas: any;
    }>;
    completeStakeToken(indexes: string[] | number[], estimateGas?: boolean): Promise<{
        tx: any;
        error: any;
        estimateGas: any;
    }>;
    delegateERC721(validator: string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateERC1155(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    completeStakeNFT(indexes: string[] | number[], estimateGas?: boolean): Promise<{
        tx: any;
        error: any;
        estimateGas: any;
    }>;
    addValidatorWithToken(meta: ValidatorMeta, stake: ValidotorStake, estimateGas?: boolean): Promise<any>;
    addValidatorWithETH(meta: ValidatorMeta, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    removeValidator(validator: string, estimateGas?: boolean): Promise<any>;
    pauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    unpauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    private buildMultiSigTxSendDEL;
    private signMultiSigTx;
    private executeMultiSigTx;
    createMultiSig(ownersData: {
        owner: string;
        weight: number;
    }[], weightThreshold?: number): Promise<{
        tx: any;
        multisigAddress: any;
        estimateGas: any;
    }>;
    getBalance(address: string): Promise<import("@ethersproject/bignumber").BigNumber>;
    getNftType(address: string): Promise<TypeNFT>;
    getNftTypeFromContract(address: string): Promise<TypeNFT>;
    getAddressTokenBySymbol(symbol: string): Promise<any>;
    checkTokenExists(address: string): Promise<any>;
    getCommissionSymbol(symbol: string): Promise<any>;
    calculateBuyOutput(address: string, amount: string | number | bigint): Promise<any>;
    calculateBuyInput(address: string, amount: string | number | bigint): Promise<any>;
    calculateSellInput(address: string, amount: string | number | bigint): Promise<any>;
    calculateSellOutput(address: string, amount: string | number | bigint): Promise<any>;
    getSignPermitToken(address: string, spender: string, amount: string | number | bigint): Promise<ethers.Signature>;
    allowanceToken(address: string, owner: string, spender: string): Promise<any>;
    balanceOfToken(address: string, account: string): Promise<any>;
    supportsInterfaceToken(address: string, interfaceId: string): Promise<any>;
    getApprovedNFT721(address: string, tokenId: string | number | bigint): Promise<any>;
    getAllowMintNFT(address: string): Promise<any>;
    isApprovedForAllNFT(address: string, owner: string, operator: string): Promise<any>;
    ownerOfNFT721(address: string, tokenId: string | number | bigint): Promise<any>;
    getTokenURINFT(address: string, tokenId: string | number | bigint): Promise<any>;
    balanceOfNFT(address: string, account: string, tokenId?: string | number | bigint): Promise<any>;
    supportsInterfaceNFT(address: string, interfaceId: string): Promise<any>;
    getRateNFT1155(address: string, tokenId: string | number | bigint): Promise<any>;
    calcReserveNFT1155(address: string, tokenId: string | number | bigint, quantity: string | number | bigint): Promise<string>;
    getReserveNFT(address: string, tokenId: string | number | bigint): Promise<{
        token: any;
        amount: any;
        reserveType: TypeNFT;
    }>;
    getRefundableNFT(address: string): Promise<any>;
    getSupplyNFT1155(address: string, tokenId: string | number | bigint): Promise<any>;
    getTokenStakesByMember(account: string): Promise<import("./interfaces/delegation").Stake[]>;
    getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<any>;
    getFrozenStakesQueueToken(): Promise<any>;
    getFreezeTimeToken(): Promise<{
        Withdraw: any;
        Transfer: any;
    }>;
    getStakeToken(validator: string, delegator: string, tokenAddress: string): Promise<import("./interfaces/delegation").Stake>;
    getStakeIdToken(validator: string, delegator: string, tokenAddress: string): Promise<any>;
    getNFTStakesByMember(account: string): Promise<import("./interfaces/delegation").Stake[]>;
    getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<import("./interfaces/delegation").Stake[]>;
    getFrozenStakesQueueNFT(): Promise<any>;
    getFreezeTimeNFT(): Promise<{
        Withdraw: any;
        Transfer: any;
    }>;
    getSignPermitERC721(address: string, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature>;
    getSignPermitERC1155(address: string, spender: string): Promise<ethers.Signature>;
    getValidatorStatus(validator: string): Promise<ValidatorStatus>;
    validatorIsActive(validator: string): Promise<any>;
    validatorIsMember(validator: string): Promise<any>;
    parseEther(amount: string | number | bigint | BigNumberish): string;
    formatEther(amount: string | number | bigint | BigNumberish): string;
    getAddress(address: string): string;
    private getNFTContract;
    getDecimalContractAddress(contract: string): Promise<string>;
    getDecimalContract(contract: string): Promise<ethers.Contract>;
    getLatestBlock(): Promise<ethers.providers.Block>;
    getTokenTypes(): typeof TokenType;
    connectToContract(address: string, abi?: ethers.ContractInterface): Promise<DecimalContractEVM>;
    verifyСontract(address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean>;
    private validationValidatorMeta;
    getFeeData(): Promise<ethers.providers.FeeData>;
    uploadNFTBufferToIPFS(buffer: Buffer, fileName: string, name: string, description: string): Promise<any>;
    uploadTokenBufferToIPFS(buffer: Buffer, fileName: string): Promise<{
        image: string;
    }>;
    getBlobMetadata(name: string, description: string): Promise<import("buffer").Blob>;
    uploadNFTFormToIPFS(form: any): Promise<any>;
    uploadTokenFormToIPFS(form: any): Promise<any>;
    getUrlFromCid(cid: string): string;
}
