import { ethers, Wallet as HDNodeWallet } from "ethers";
import DecimalContractEVM from "./contract";
import { Stake } from "./interfaces/delegation";
import { ValidatorStatus } from "./interfaces/validator";
import { NETWORKS } from "../endpoints";
export declare enum TypeNFT {
    ERC721 = 0,
    ERC1155 = 1
}
export declare enum FreezeType {
    Unknown = 0,
    Withdraw = 1,
    Transfer = 2,
    Completed = 3
}
export type Token = {
    tokenOwner: string;
    symbol: string;
    name: string;
    crr: string | number | bigint;
    initialMint: ethers.BigNumberish;
    minTotalSupply: ethers.BigNumberish;
    maxTotalSupply: ethers.BigNumberish;
    identity: string;
};
export type NFTCollection = {
    tokenOwner: string;
    symbol: string;
    name: string;
    contractURI: string;
    baseURI: string;
    refundable: boolean;
    allowMint: boolean;
};
export type ValidotorStake = {
    token: string;
    amount: ethers.BigNumberish;
};
export default class Call {
    private readonly network;
    private readonly provider;
    private readonly account;
    private readonly contractCenter;
    private readonly tokenCenter;
    private readonly delegation;
    private readonly nftCenter;
    private readonly delegationNft;
    private readonly masterValidator;
    constructor(network: NETWORKS, provider: ethers.providers.JsonRpcProvider, account: HDNodeWallet, contractCenter: DecimalContractEVM, tokenCenter: DecimalContractEVM, delegation: DecimalContractEVM, nftCenter: DecimalContractEVM, delegationNft: DecimalContractEVM, masterValidator: DecimalContractEVM);
    private txOptions;
    private parseLog;
    createToken(token: Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: null;
        tokenAddress: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        tokenAddress: any;
        estimateGas: null;
    }>;
    convertToken(tokenIn: string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    updateDetailsToken(contract: ethers.Contract, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDEL(validator: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    delegateToken(validator: string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<any>;
    withdrawStakeToken(validator: string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    applyPenaltyToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<{
        tx: null;
        error: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        error: null;
        estimateGas: null;
    } | {
        tx: null;
        error: any;
        estimateGas: null;
    }>;
    applyPenaltiesToStakeToken(validator: string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<{
        tx: null;
        error: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        error: null;
        estimateGas: null;
    } | {
        tx: null;
        error: any;
        estimateGas: null;
    }>;
    completeStakeToken(index: string | number, estimateGas?: boolean): Promise<{
        tx: null;
        error: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        error: null;
        estimateGas: null;
    } | {
        tx: null;
        error: any;
        estimateGas: null;
    }>;
    createCollection(nft: NFTCollection, typeNFT: TypeNFT, estimateGas?: boolean): Promise<{
        tx: null;
        nftCollectionAddress: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        nftCollectionAddress: any;
        estimateGas: null;
    }>;
    setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean): Promise<any>;
    transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    disableMintNFT(contract: ethers.Contract, estimateGas?: boolean): Promise<any>;
    burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    setBaseURINFT(contract: ethers.Contract, baseURI: string, estimateGas?: boolean): Promise<any>;
    setTokenURINFT(contract: ethers.Contract, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean): Promise<any>;
    mintNFT(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: null;
        tokenId: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        tokenId: any;
        estimateGas: null;
    }>;
    mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: null;
        tokenId: string | number | bigint | undefined;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        tokenId: any;
        estimateGas: null;
    }>;
    mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<{
        tx: null;
        tokenId: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        tokenId: any;
        estimateGas: null;
    }>;
    addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean): Promise<any>;
    delegateERC721(validator: string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateERC1155(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    completeStakeNFT(index: string | number, estimateGas?: boolean): Promise<{
        tx: null;
        error: null;
        estimateGas: import("@ethersproject/bignumber").BigNumber;
    } | {
        tx: any;
        error: null;
        estimateGas: null;
    } | {
        tx: null;
        error: any;
        estimateGas: null;
    }>;
    addValidatorWithToken(validator: string, meta: string, stake: ValidotorStake, estimateGas?: boolean): Promise<any>;
    addValidatorWithETH(validator: string, meta: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    removeValidator(validator: string, estimateGas?: boolean): Promise<any>;
    pauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    unpauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
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
    getDecimalContractAddress(contract: string): string;
    getDecimalContract(contract: string): ethers.Contract;
    getSignPermitERC721(contract: ethers.Contract, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature>;
    getSignPermitERC1155(contract: ethers.Contract, spender: string): Promise<ethers.Signature>;
}