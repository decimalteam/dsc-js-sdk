import { ethers, Wallet as HDNodeWallet } from "ethers";
import DecimalContractEVM from "./contract";
import { Stake } from "./interfaces/delegation";
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
    allowMint: boolean;
    burnable: boolean;
    refundable: boolean;
};
export type NFTCollectionReserveless = Omit<NFTCollection, 'refundable'>;
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
    delegationNft?: DecimalContractEVM;
    masterValidator?: DecimalContractEVM;
    multiCall?: DecimalContractEVM;
    safe?: DecimalContractEVM;
    safeFactory?: DecimalContractEVM;
    multiSend?: DecimalContractEVM;
    checks?: DecimalContractEVM;
    bridgeV2?: DecimalContractEVM;
    private bridgeV2Nonce;
    private debug;
    constructor(network: NETWORKS, provider: ethers.providers.JsonRpcProvider, account: HDNodeWallet);
    setDecimalContractEVM(decimalContractEVM: DecimalContractEVM, name: string): void;
    private txOptions;
    private parseLog;
    multicall(value: string | number | bigint, calls: {
        target: string;
        value: string;
        callData: string;
    }[], estimateGas?: boolean): Promise<any>;
    createToken(token: Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createTokenReserveless(name: string, symbol: string, mintable: boolean, burnable: boolean, initialMint: string | number | bigint, cap: string | number | bigint | undefined | null, identity: string, estimateGas?: boolean): Promise<any>;
    convertToken(tokenIn: string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    mintTokenReserveless(contract: ethers.Contract, amount: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    updateTokenIdentity(contract: ethers.Contract, newIdentity: string, estimateGas?: boolean): Promise<any>;
    updateTokenMaxTotalSupply(contract: ethers.Contract, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    updateTokenMinTotalSupply(contract: ethers.Contract, newMinTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDEL(validator: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    delegateDELHold(validator: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    delegateToken(validator: string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<any>;
    transferStakeTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<any>;
    withdrawStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    withdrawStakeTokenHold(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeTokenToHold(validator: string, tokenAddress: string, amount: string | number | bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeTokenResetHold(validator: string, delegator: string, tokenAddress: string, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeTokenResetHoldDEL(validator: string, delegator: string, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    withdrawTokenWithReset(validator: string, tokenAddress: string, amount: string | number | bigint, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    transferTokenWithReset(oldValidator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    holdTokenWithReset(validator: string, tokenAddress: string, amount: string | number | bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    applyPenaltyToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<any>;
    applyPenaltiesToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<any>;
    completeStakeToken(indexes: string[] | number[], estimateGas?: boolean): Promise<any>;
    createCollection(nft: NFTCollection | NFTCollectionReserveless, typeNFT: TypeNFT, withReserve: boolean, estimateGas?: boolean): Promise<any>;
    setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean): Promise<any>;
    transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    disableMintNFT(contract: ethers.Contract, estimateGas?: boolean): Promise<any>;
    burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    setTokenURINFT(contract: ethers.Contract, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean): Promise<any>;
    mintNFT(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintReserveless(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean): Promise<any>;
    delegateDRC721(validator: string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC721Hold(validator: string, nftAddress: string, tokenId: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC1155(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC1155Hold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<any>;
    transferStakeNFTHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFTHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeNFTToHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeNFTResetHold(validator: string, delegator: string, tokenAddress: string, tokenId: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    withdrawNFTWithReset(validator: string, tokenAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    transferNFTWithReset(oldValidator: string, tokenAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, newValidator: string, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    holdNFTWithReset(validator: string, tokenAddress: string, tokenId: string | number | bigint, amountToHold: string | number | bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    completeStakeNFT(indexes: string[] | number[], estimateGas?: boolean): Promise<any>;
    addValidatorWithToken(validator: string, meta: string, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    addValidatorWithETH(validator: string, meta: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    removeValidator(validator: string, estimateGas?: boolean): Promise<any>;
    pauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    unpauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    updateValidatorMeta(validator: string, meta: string, estimateGas?: boolean): Promise<any>;
    wrapAndTransferETH(contract: ethers.Contract, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean): Promise<any>;
    transferTokens(contract: ethers.Contract, tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean): Promise<any>;
    completeTransfer(contract: ethers.Contract, encodedVM: string, unwrapWETH: boolean, estimateGas?: boolean): Promise<any>;
    createChecksDEL(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createChecksToken(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    redeemChecks(passwords: string[], checks: string[], callStatic?: boolean, estimateGas?: boolean): Promise<any>;
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
    getTokenStakesByMember(account: string): Promise<Stake[]>;
    getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<any>;
    getFrozenStakesQueueToken(): Promise<any>;
    getFreezeTimeToken(): Promise<{
        Withdraw: any;
        Transfer: any;
    }>;
    getStakeToken(validator: string, delegator: string, tokenAddress: string): Promise<Stake>;
    getStakeIdToken(validator: string, delegator: string, tokenAddress: string): Promise<any>;
    getNFTStakesByMember(account: string): Promise<Stake[]>;
    getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<Stake[]>;
    getFrozenStakesQueueNFT(): Promise<any>;
    getFreezeTimeNFT(): Promise<{
        Withdraw: any;
        Transfer: any;
    }>;
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
    }[], weightThreshold: number, estimateGas?: boolean): Promise<any>;
    buildMultiSigTx(txs: MetaTransaction[], safe: ethers.Contract): Promise<SafeTransaction>;
    signMultiSigTx(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature>;
    executeMultiSigTx(safeTx: SafeTransaction, signatures: SafeSignature[], safe: ethers.Contract, estimateGas?: boolean): Promise<any>;
    getNonceMultiSig(safe: ethers.Contract): Promise<any>;
}
