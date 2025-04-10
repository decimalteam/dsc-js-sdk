/// <reference types="node" />
/// <reference types="node" />
import { BigNumberish, ethers, Wallet as HDNodeWallet } from "ethers";
import { NETWORKS } from "../endpoints";
import Wallet from "../wallet";
import DecimalContractEVM from "./contract";
import { NFTCollectionReserveless } from "./call";
import { TypeNFT, Token, NFTCollection, ValidotorStake } from "./call";
import { TokenType } from "./interfaces/delegation";
import { ValidatorMeta, ValidatorStatus } from "./interfaces/validator";
import { SafeSignature, SafeTransaction } from "./multisig/execution";
import { Blob } from "buffer";
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
    providerETH?: ethers.providers.JsonRpcProvider;
    accountETH?: HDNodeWallet;
    providerBSC?: ethers.providers.JsonRpcProvider;
    accountBSC?: HDNodeWallet;
    private contracts;
    private abis;
    multisig: {
        create: (ownersData: {
            owner: string;
            weight: number;
        }[], weightThreshold?: number, estimateGas?: boolean) => Promise<{
            tx: any;
            multisigAddress: any;
            estimateGas: any;
        }>;
        buildTxSendDEL: (safeAddress: string, to: string, amount: string | number | bigint) => Promise<SafeTransaction>;
        buildTxSendToken: (safeAddress: string, tokenAddress: string, to: string, amount: string | number | bigint) => Promise<SafeTransaction>;
        buildTxSendNFT: (safeAddress: string, tokenAddress: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint) => Promise<SafeTransaction>;
        signTx: (safeAddress: string, safeTx: SafeTransaction) => Promise<SafeSignature>;
        approveHash: (safeAddress: string, safeTx: SafeTransaction) => Promise<{
            safeTransaction: SafeSignature;
            tx: any;
        }>;
        approveHashEstimateGas: (safeAddress: string, safeTx: SafeTransaction) => Promise<BigNumberish>;
        executeTx: (safeAddress: string, safeTx: SafeTransaction, signatures: SafeSignature[], estimateGas?: boolean) => Promise<any>;
        getNonce: (safeAddress: string) => Promise<any>;
        getCurrentApproveTransactions: (safeAddress: string) => Promise<{
            transactions: SafeTransaction[];
            approvers: string[];
        }>;
        getExpiredApproveTransactions: (safeAddress: string) => Promise<{
            transactions: SafeTransaction[];
            approvers: string[];
        }>;
        getSignatureForParticipant: (participantAddress: string) => Promise<SafeSignature>;
        decodeTransaction: (safeTx: SafeTransaction) => {
            action: string;
            tokenType: string;
            token: string;
            to: string;
            tokenId?: string;
            amount?: string;
        };
    };
    constructor(wallet: Wallet, network: NETWORKS);
    private getContract;
    connect(contractName?: string): Promise<void>;
    private checkConnect;
    private initFromImplementation;
    parseMemo(txHash: string): Promise<string | undefined>;
    multiCall(callData: {
        target: string;
        value: string | number | bigint | BigNumberish;
        iface: string;
        params: any;
    }[], memo?: string, estimateGas?: boolean): Promise<any>;
    multiSendToken(multiData: {
        token: string;
        to: string;
        amount: any;
    }[], memo?: string, estimateGas?: boolean): Promise<any>;
    sendDEL(address: string, amount: string | number | bigint | BigNumberish, estimateGas?: boolean): Promise<ethers.BigNumber | ethers.ContractReceipt>;
    burnDEL(amount: string | number | bigint | BigNumberish, estimateGas?: boolean): Promise<ethers.BigNumber | ethers.ContractReceipt>;
    createToken(payload: Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createTokenReserveless(name: string, symbol: string, mintable: boolean, burnable: boolean, initialMint: string | number | bigint, cap: string | number | bigint | undefined | null, identity: string, estimateGas?: boolean): Promise<any>;
    convertToken(tokenIn: string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    approveToken(tokenAddress: string, spender: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferToken(tokenAddress: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferFromToken(tokenAddress: string, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    burnToken(tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintTokenReserveless(tokenAddress: string, amount: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    convertToDEL(owner: string, token: string, amount: string | number | bigint, estimateGas: string | number | bigint, sign: ethers.Signature, estimateGasUsage?: boolean): Promise<any>;
    buyTokenForExactDEL(tokenAddress: string, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    buyExactTokenForDEL(tokenAddress: string, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellTokensForExactDEL(tokenAddress: string, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    sellExactTokensForDEL(tokenAddress: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean): Promise<any>;
    updateTokenIdentity(tokenAddress: string, newIdentity: string, estimateGas?: boolean): Promise<any>;
    updateTokenMaxTotalSupply(tokenAddress: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    updateTokenMinTotalSupply(tokenAddress: string, newMinTotalSupply: string | number | bigint, estimateGas?: boolean): Promise<any>;
    permitToken(tokenAddress: string, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean): Promise<any>;
    createCollectionDRC721(payload: NFTCollection, estimateGas?: boolean): Promise<any>;
    createCollectionDRC1155(payload: NFTCollection, estimateGas?: boolean): Promise<any>;
    createCollectionDRC721Reserveless(payload: NFTCollectionReserveless, estimateGas?: boolean): Promise<any>;
    createCollectionDRC1155Reserveless(payload: NFTCollectionReserveless, estimateGas?: boolean): Promise<any>;
    approveNFT721(nftCollectionAddress: string, to: string, tokenId: string | number | bigint, estimateGas?: boolean): Promise<any>;
    approveForAllNFT(nftCollectionAddress: string, to: string, approved: boolean, estimateGas?: boolean): Promise<any>;
    mintReserveless(nftCollectionAddress: string, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintNFTWithDELReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    mintNFTWithTokenReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addDELReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean): Promise<any>;
    addTokenReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferNFT(nftCollectionAddress: string, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    transferBatchNFT1155(nftCollectionAddress: string, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean): Promise<any>;
    disableMintNFT(nftCollectionAddress: string, estimateGas?: boolean): Promise<any>;
    burnNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any>;
    setTokenURINFT(nftCollectionAddress: string, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean): Promise<any>;
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
    delegateDRC721(validator: string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC721Hold(validator: string, nftAddress: string, tokenId: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC1155(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    delegateDRC1155Hold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    transferStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, newValidator: string, estimateGas?: boolean): Promise<any>;
    transferStakeNFTHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFT(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    withdrawStakeNFTHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeNFTToHold(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean): Promise<any>;
    stakeNFTResetHold(validator: string, delegator: string, nftAddress: string, tokenId: string | number | bigint, holdTimestamp: number, estimateGas?: boolean): Promise<any>;
    withdrawNFTWithReset(validator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    transferNFTWithReset(oldValidator: string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, newValidator: string, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    holdNFTWithReset(validator: string, nftAddress: string, tokenId: string | number | bigint, amountToHold: string | number | bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean): Promise<any>;
    completeStakeNFT(indexes: string[] | number[], estimateGas?: boolean): Promise<any>;
    addValidatorWithToken(meta: ValidatorMeta, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    addValidatorWithETH(meta: ValidatorMeta, amount: string | number | bigint, estimateGas?: boolean): Promise<any>;
    removeValidator(validator: string, estimateGas?: boolean): Promise<any>;
    pauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    unpauseValidator(validator: string, estimateGas?: boolean): Promise<any>;
    updateValidatorMeta(meta: ValidatorMeta, estimateGas?: boolean): Promise<any>;
    private buildMultiSigTxSendDEL;
    private buildMultiSigTxSendToken;
    private buildMultiSigTxSendNFT;
    private signMultiSigTx;
    private approveHashMultiSig;
    private approveHashMultiSigEstimateGas;
    private getSignatureForParticipant;
    private executeMultiSigTx;
    private createMultiSig;
    private getNonceMultiSig;
    private getCurrentApproveTransactions;
    private getExpiredApproveTransactions;
    private getApproveTransactions;
    private decodeMultiSigSafeTransaction;
    private decodeData;
    bridgeTransferNative(to: string, amount: string | number | bigint, serviceFee: string | number | bigint, fromChainId: number, toChainId: number, estimateGas?: boolean): Promise<any>;
    bridgeTransferTokens(tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, fromChainId: number, toChainId: number, estimateGas?: boolean): Promise<any>;
    bridgeCompleteTransfer(toChainId: number, encodedVM: string, unwrapWETH: boolean, estimateGas?: boolean): Promise<any>;
    private getAccountAndBridge;
    createChecksDEL(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean): Promise<any>;
    createChecksToken(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any>;
    redeemChecks(passwords: string[], checks: string[], estimateGas?: boolean): Promise<any>;
    redeemChecksTest(passwords: string[], checks: string[]): Promise<any>;
    getBalance(address: string): Promise<ethers.BigNumber>;
    getBalanceETH(address: string): Promise<ethers.BigNumber>;
    getBalanceBNB(address: string): Promise<ethers.BigNumber>;
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
    getSignPermitDRC721(address: string, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature>;
    getSignPermitDRC1155(address: string, spender: string): Promise<ethers.Signature>;
    getValidatorStatus(validator: string): Promise<ValidatorStatus>;
    validatorIsActive(validator: string): Promise<any>;
    validatorIsMember(validator: string): Promise<any>;
    getBridgeServiceFees(toChainId: number): Promise<any>;
    parseEther(amount: string | number | bigint | BigNumberish): string;
    formatEther(amount: string | number | bigint | BigNumberish): string;
    getAddress(address: string): string;
    getRandomPassword(count: number, length: number): string[];
    private getNFTContract;
    getDecimalContractAddress(contract: string): Promise<string>;
    getDecimalContract(contract: string): Promise<ethers.Contract>;
    getLatestBlock(): Promise<ethers.providers.Block>;
    getTokenTypes(): typeof TokenType;
    connectToContract(address: string, abi?: ethers.ContractInterface): Promise<DecimalContractEVM>;
    verifyСontract(address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean>;
    private validationValidatorMeta;
    getFeeData(): Promise<ethers.providers.FeeData>;
    uploadNFTBase64ToIPFS(base64: string, fileName: string, name: string, description: string): Promise<any>;
    uploadNFTBufferToIPFS(buffer: Buffer, fileName: string, name: string, description: string): Promise<any>;
    uploadTokenBufferToIPFS(buffer: Buffer, fileName: string): Promise<{
        image: string;
    }>;
    getBlobMetadata(name: string, description: string): Promise<Blob>;
    uploadNFTFormToIPFS(form: any): Promise<any>;
    uploadTokenFormToIPFS(form: any): Promise<any>;
    getUrlFromCid(cid: string): string;
}
