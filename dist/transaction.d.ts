import { Account } from "./accounts";
import Client, { TxBroadcatResponse } from "./client";
import { clientBurnCoin, clientBuyCoin, clientCancelRedelegationData, clientCreateValidator, clientEditMetadata, clientEditValidator, clientIssueCheck, clientMsgBurnNft, clientMsgCancelRedelegationNft, clientMsgCancelUndelegate, clientMsgCancelUndelegationNft, clientMsgCreateCoin, clientMsgCreateWallet, clientMsgDelegate, clientMsgDelegateNft, clientMsgMultiSendCoin, clientMsgNftMint, clientMsgRedelegateNft, clientMsgSendCoin, clientMsgSwapInit, clientMsgSwapRedeem, clientMsgTransferNft, clientMsgUndelegate, clientMsgUndelegateNft, clientMsgUpdateCoin, clientMultisigCreateTx, clientMultisigSignTx, clientNftUpdateReserve, clientRedeemCheck, clientRedelegationData, clientReturnLegacy, clientSellAllCoin, clientSellCoin, clientSetOnlineData, txOptions } from "./interfaces/clientInterfaces";
import Wallet from "./wallet";
interface ClientFee {
    coin: string;
    amount: string;
}
interface FeeOptions {
    denom: string;
    amount: string;
}
declare type SendTransactionResponse = Promise<TxBroadcatResponse | ClientFee>;
export declare class Transaction {
    private static _instance;
    private wallet;
    private readonly rpcClient;
    private readonly encoderDecoder;
    private readonly chainId;
    private account;
    private readonly baseCoin;
    private constructor();
    static getInstance(rpcClient: Client | undefined, wallet: Wallet, chainId: string, account: Account, baseCoin: string): Transaction;
    sendTransaction(msgAny: any, options: txOptions, simulation?: boolean, tryTimes?: number): Promise<SendTransactionResponse>;
    sendCoin(data: clientMsgSendCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    burnCoins(data: clientBurnCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    updateCoin(data: clientMsgUpdateCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    createCoin(data: clientMsgCreateCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    multiSendCoin(data: clientMsgMultiSendCoin[], options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    createWallet(data: clientMsgCreateWallet, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    mintNft(data: clientMsgNftMint, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    transferNft(data: clientMsgTransferNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    burnNft(data: clientMsgBurnNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    multisigCreateTx(data: clientMultisigCreateTx, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    buyCoins(data: clientBuyCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    sellCoins(data: clientSellCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    sellAllCoins(data: clientSellAllCoin, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    multisigSignTx(data: clientMultisigSignTx, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    nftUpdateReserve(data: clientNftUpdateReserve, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    issueCheck(data: clientIssueCheck): Promise<string>;
    redeemCheck(data: clientRedeemCheck, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    nftEditMetadata(data: clientEditMetadata, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    msgSwapInit(data: clientMsgSwapInit, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    msgSwapRedeem(data: clientMsgSwapRedeem, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    delegate(data: clientMsgDelegate, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    unbond(data: clientMsgUndelegate, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    cancelUnbonding(data: clientMsgCancelUndelegate, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    redelegate(data: clientRedelegationData, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    cancelRedelegation(data: clientCancelRedelegationData, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    delegateNft(data: clientMsgDelegateNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    unbondNft(data: clientMsgUndelegateNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    cancelUnbondingNft(data: clientMsgCancelUndelegationNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    redelegateNft(data: clientMsgRedelegateNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    cancelRedelegationNft(data: clientMsgCancelRedelegationNft, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    createValidator(data: clientCreateValidator, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    editValidator(data: clientEditValidator, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    setOnline(data: clientSetOnlineData, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    setOffline(data: clientSetOnlineData, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    returnLegacy(data: clientReturnLegacy, options: txOptions, simulation?: boolean): Promise<SendTransactionResponse>;
    getFee(options: FeeOptions): {
        amount: {
            denom: string;
            amount: string;
        }[];
        gas: string;
    };
    private prepareFee;
    getDefaultFee(): {
        amount: never[];
        gas: string;
    };
}
export {};
