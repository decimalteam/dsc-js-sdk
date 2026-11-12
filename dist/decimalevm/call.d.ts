import { ethers, HDNodeWallet } from "ethers";
import DecimalContractEVM from "./contract";
import { Stake, NFTStake } from "./interfaces/delegation";
import { ValidatorStatus } from "./interfaces/validator";
import { NETWORKS } from "../endpoints";
import { MetaTransaction, SafeSignature, SafeTransaction } from "./multisig/execution";
export declare enum TypeNFT {
    DRC721 = 0,
    DRC1155 = 1
}
export declare enum FreezeType {
    Unknown = 0,
    Withdraw = 1,
    Transfer = 2,
    Completed = 3
}
export type Token = {
    creator: string;
    symbol: string;
    name: string;
    crr: string | number | bigint;
    initialMint: ethers.BigNumberish;
    minTotalSupply: ethers.BigNumberish;
    maxTotalSupply: ethers.BigNumberish;
    identity: string;
};
export type NFTCollection = {
    creator: string;
    symbol: string;
    name: string;
    contractURI: string;
    burnable: boolean;
    refundable: boolean;
};
/** `refundable` is ignored by reserveless collections (there is no reserve) and defaults to `false`. */
export type NFTCollectionReserveless = Omit<NFTCollection, 'refundable'> & {
    refundable?: boolean;
};
export type ValidotorStake = {
    token: string;
    amount: ethers.BigNumberish;
};
export default class Call {
    private readonly network;
    private readonly provider;
    private readonly account;
    contractCenter?: DecimalContractEVM;
    tokenCenter?: DecimalContractEVM;
    delegation?: DecimalContractEVM;
    nftCenter?: DecimalContractEVM;
    masterValidator?: DecimalContractEVM;
    multiCall?: DecimalContractEVM;
    safe?: DecimalContractEVM;
    safeFactory?: DecimalContractEVM;
    multiSend?: DecimalContractEVM;
    checks?: DecimalContractEVM;
    bridgeV2?: DecimalContractEVM;
    gasCenter?: DecimalContractEVM;
    private bridgeV2Nonce;
    private debug;
    constructor(network: NETWORKS, provider: ethers.JsonRpcProvider, account: HDNodeWallet);
    setDecimalContractEVM(decimalContractEVM: DecimalContractEVM, name: string): void;
    private txOptions;
    private parseLog;
    multicall(value: string | number | bigint, calls: {
        target: string;
        value: string;
        callData: string;
    }[], estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    createToken(token: Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createTokenReserveless(name: string, symbol: string, mintable: boolean, burnable: boolean, initialMint: string | number | bigint, cap: string | number | bigint | undefined | null, identity: string, estimateGas?: boolean): Promise<any>;
    convertToken(tokenIn: string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    mintTokenReserveless(contract: ethers.Contract, amount: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    convertToDEL(owner: string, token: string, amount: string | number | bigint, estimateGas: string | number | bigint, sign: ethers.Signature, estimateGasUsage?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    updateTokenIdentity(contract: ethers.Contract, newIdentity: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    updateTokenMaxTotalSupply(contract: ethers.Contract, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    updateTokenMinTotalSupply(contract: ethers.Contract, newMinTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateDEL(validator: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateDELHold(validator: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateToken(validator: string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferStakeTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawStakeTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    stakeTokenToHold(validator: string, tokenAddress: string, amount: string | number | bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    stakeTokenResetHold(validator: string, delegator: string, tokenAddress: string, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawTokenWithReset(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferTokenWithReset(oldValidator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    holdTokenWithReset(validator: string, tokenAddress: string, amount: string | number | bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    completeStakeToken(indexes: string[] | number[], estimateGas?: boolean): Promise<any>;
    delegateNFT(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateNFTHold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateNFTByPermit(validator: string, nftContract: string, tokenId: bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawNFT(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawNFTHold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferNFTStake(oldValidator: string, nftContract: string, tokenId: bigint, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferNFTStakeHold(oldValidator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateNFT1155(validator: string, nftContract: string, tokenId: bigint, amount: bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    delegateNFT1155Hold(validator: string, nftContract: string, tokenId: bigint, amount: bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawNFT1155(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    withdrawNFT1155Hold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferNFT1155Stake(oldValidator: string, nftContract: string, tokenId: bigint, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferNFT1155StakeHold(oldValidator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    createCollection(nft: NFTCollection | NFTCollectionReserveless, typeNFT: TypeNFT, withReserve: boolean, estimateGas?: boolean): Promise<any>;
    setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    disableMintNFT(contract: ethers.Contract, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintReserveless(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    addValidatorWithToken(validator: string, meta: string, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    addValidatorWithETH(validator: string, meta: string, amount: string | number | bigint, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    removeValidator(validator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    pauseValidator(validator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    unpauseValidator(validator: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    updateValidatorMeta(validator: string, meta: string, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    wrapAndTransferETH(contract: ethers.Contract, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    transferTokens(contract: ethers.Contract, tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    completeTransfer(contract: ethers.Contract, encodedVM: string, unwrapWETH: boolean, estimateGas?: boolean): Promise<bigint | ethers.ContractTransactionReceipt | null>;
    createChecksDEL(signers: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createChecksToken(signers: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    redeemChecks(signatures: string[], checks: string[], callStatic?: boolean, estimateGas?: boolean): Promise<any>;
    checkTokenExists(address: string): Promise<any>;
    getAddressTokenBySymbol(symbol: string): Promise<any>;
    getCommissionSymbol(symbol: string): Promise<any>;
    calculateBuyOutput(contract: ethers.Contract, amount: string | number | bigint): Promise<any>;
    calculateBuyInput(contract: ethers.Contract, amount: string | number | bigint): Promise<any>;
    calculateSellInput(contract: ethers.Contract, amount: string | number | bigint): Promise<any>;
    calculateSellOutput(contract: ethers.Contract, amount: string | number | bigint): Promise<any>;
    getSignPermitToken(contract: ethers.Contract, spender: string, amount: string | number | bigint): Promise<ethers.Signature>;
    allowanceToken(contract: ethers.Contract, owner: string, spender: string): Promise<any>;
    balanceOfToken(contract: ethers.Contract, account: string): Promise<any>;
    supportsInterfaceToken(contract: ethers.Contract, interfaceId: string): Promise<any>;
    getNftType(address: string): Promise<TypeNFT>;
    getAllowMintNFT(contract: ethers.Contract): Promise<any>;
    isApprovedForAllNFT(contract: ethers.Contract, owner: string, operator: string): Promise<any>;
    balanceOfNFT(contract: ethers.Contract, account: string, tokenId?: string | number | bigint): Promise<any>;
    supportsInterfaceNFT(contract: ethers.Contract, interfaceId: string): Promise<any>;
    getReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint): Promise<{
        token: any;
        amount: any;
        reserveType: TypeNFT;
    }>;
    getRefundableNFT(contract: ethers.Contract): Promise<any>;
    getApprovedNFT721(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    ownerOfNFT721(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    getTokenURINFT721(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    getTokenURINFT1155(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    getRateNFT1155(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    getSupplyNFT1155(contract: ethers.Contract, tokenId: string | number | bigint): Promise<any>;
    getFreezeTimeToken(): Promise<{
        Withdraw: any;
        Transfer: any;
    }>;
    getStakeToken(validator: string, delegator: string, tokenAddress: string): Promise<Stake>;
    getStakeIdToken(validator: string, delegator: string, tokenAddress: string): Promise<any>;
    getNFTStakeFromDelegation(nftContract: string, tokenId: bigint, delegator: string, validator: string, holdTimestamp: number): Promise<NFTStake>;
    getNFTStakeIdFromDelegation(nftContract: string, tokenId: bigint, delegator: string, validator: string, holdTimestamp: number): Promise<string>;
    getAvailableCoinAmount(validator: string, delegator: string, token: string, holdTimestamp: number): Promise<bigint>;
    getNFTBackedAmount(validator: string, delegator: string, token: string, holdTimestamp: number): Promise<bigint>;
    getValidatorStatus(validator: string): Promise<ValidatorStatus>;
    validatorIsActive(validator: string): Promise<any>;
    validatorIsMember(validator: string): Promise<any>;
    getDecimalContract(contractName: string, address?: boolean): string | ethers.Contract;
    getSignPermitDRC721(contract: ethers.Contract, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature>;
    getSignPermitDRC1155(contract: ethers.Contract, spender: string): Promise<ethers.Signature>;
    getBridgeV2ServiceFees(toChainId: number): Promise<any>;
    getChecksNonces(): Promise<any>;
    createMultiSig(ownersData: {
        owner: string;
        weight: number;
    }[], weightThreshold: number, estimateGas?: boolean, fallbackHandler?: string): Promise<any>;
    buildMultiSigTx(txs: MetaTransaction[], safe: ethers.Contract): Promise<SafeTransaction>;
    signMultiSigTx(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature>;
    executeMultiSigTx(safeTx: SafeTransaction, signatures: SafeSignature[], safe: ethers.Contract, estimateGas?: boolean): Promise<any>;
    getNonceMultiSig(safe: ethers.Contract): Promise<any>;
}
