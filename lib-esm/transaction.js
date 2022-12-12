/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64 } from "@cosmjs/encoding";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import BigNumber from "bignumber.js";
import txTypesNew from "./txTypesNew";
import { MsgCreateCoin, MsgSendCoin, MsgMultiSendCoin, MsgUpdateCoin, MsgBuyCoin, MsgSellCoin, MsgSellAllCoin, MsgRedeemCheck, MsgBurnCoin, } from "./types/decimal/coin/v1/tx";
import { createCoinData, sendCoinData, multiSendCoinData, createWalletData, mintNftData, transferNftData, updateCoinData, burnNftData, buyCoinData, sellCoinData, sellAllCoinData, multisigSignTxData, nftUpdateReserveData, nftEditMetadata, burnCoinData, swapInitData, swapRedeemData, delegateData, unbondData, cancelUnbondingData, redelegateData, cancelRedelegationData, nftDelegateData, nftUnbondData, cancelNftUnbondingData, nftRedelegateData, nftCancelRedelegationData, createValidatorData, editValidatorData, setOnlineData, setOfflineData, dataToProto, returnLegacyData, } from "./utils/clientDataToProto";
import { EncoderDecoder } from "./utils/encoderDecoder";
import { signTransaction } from "./utils/signer";
import { MsgCreateTransaction, MsgCreateWallet, MsgSignTransaction, } from "./types/decimal/multisig/v1/tx";
import { MsgBurnToken, MsgMintToken, MsgSendToken, MsgUpdateReserve, MsgUpdateToken, } from "./types/decimal/nft/v1/tx";
import { issueCheck, redeemCheckData } from "./check";
import axios from "axios";
import { checkSequenceSimulate } from "./utils/sequence";
import { MsgInitializeSwap, MsgRedeemSwap } from "./types/decimal/swap/v1/tx";
import { MsgCancelRedelegation, MsgCancelRedelegationNFT, MsgCancelUndelegation, MsgCancelUndelegationNFT, MsgCreateValidator, MsgDelegate, MsgDelegateNFT, MsgEditValidator, MsgRedelegate, MsgRedelegateNFT, MsgSetOffline, MsgSetOnline, MsgUndelegate, MsgUndelegateNFT, } from "./types/validator/v1/tx";
import { BROADCAST_MODE_BLOCK } from "@tendermint/sig";
import { MsgReturnLegacy } from "./types/decimal/legacy/v1/tx";
import { PubKey } from "./types/cosmos/crypto/ed25519/keys";
import { gateEstimationEnpoint, getNodeFeeEstimationEndpoint, } from "./endpoints";
const FEE_MULTIPLIER = 1.1;
const DEFAULT_GAS = "180000";
export class Transaction {
    constructor(rpcClient, wallet, chainId, account, baseCoin) {
        this.rpcClient = rpcClient;
        this.wallet = wallet;
        this.encoderDecoder = new EncoderDecoder();
        this.chainId = chainId;
        this.account = account;
        this.baseCoin = baseCoin;
    }
    static getInstance(rpcClient, wallet, chainId, account, baseCoin) {
        if (this._instance) {
            this._instance.wallet = wallet;
            this._instance.account = account;
            return this._instance;
        }
        this._instance = new this(rpcClient, wallet, chainId, account, baseCoin);
        return this._instance;
    }
    async sendTransaction(msgAny, options, simulation = false, tryTimes = 2) {
        const readyFeeCoin = options.feeCoin
            ? options.feeCoin.toLowerCase()
            : this.baseCoin;
        const txBodyBytes = this.encoderDecoder.encodeTxBody({
            messages: [msgAny],
            memo: options.message ? options.message : "",
        });
        let result, fee, signObject, txRaw, txBytes;
        const noSimulation = (!simulation && readyFeeCoin === this.baseCoin) || options.feeAmount;
        if (noSimulation) {
            if (options.feeAmount) {
                fee = {
                    amount: [
                        {
                            denom: readyFeeCoin,
                            amount: options.feeAmount,
                        },
                    ],
                    gas: DEFAULT_GAS,
                };
            }
            else {
                fee = this.getDefaultFee();
            }
        }
        else {
            const isDefaultFee = readyFeeCoin === this.baseCoin && !options.baseCoinFeeEstimation;
            if (isDefaultFee) {
                fee = this.getDefaultFee();
            }
            else {
                fee = {
                    amount: [
                        {
                            denom: readyFeeCoin,
                            amount: "0",
                        },
                    ],
                    gas: DEFAULT_GAS,
                };
            }
            signObject = await signTransaction(txBodyBytes, this.wallet, this.account, this.chainId, fee);
            txRaw = TxRaw.fromPartial({
                bodyBytes: signObject.signDoc.bodyBytes,
                authInfoBytes: signObject.signDoc.authInfoBytes,
                signatures: [fromBase64(signObject.stdSignature.signature)],
            });
            txBytes = TxRaw.encode(txRaw).finish();
            let predictedFee;
            try {
                const hexedTx = Buffer.from(txBytes).toString("hex");
                const gateUrl = this.wallet.getGateUrl();
                if (gateUrl) {
                    const res = await axios.post(`${gateUrl}${gateEstimationEnpoint}`, {
                        tx_bytes: hexedTx,
                        denom: readyFeeCoin,
                    });
                    predictedFee = res.data.result.commission;
                }
                else {
                    const nodeEstimationEndpoint = getNodeFeeEstimationEndpoint(this.wallet.getNodeRestUrl(), hexedTx, readyFeeCoin);
                    const res = await axios.get(nodeEstimationEndpoint);
                    predictedFee = res.data.commission;
                }
            }
            catch (e) {
                const errorData = e.response.data.data.error;
                if (tryTimes) {
                    const expectedSequence = checkSequenceSimulate(errorData);
                    if (expectedSequence) {
                        this.account.sequence = Number(expectedSequence);
                        result = (await this.sendTransaction(msgAny, options, simulation, tryTimes - 1));
                        return result;
                    }
                }
                throw new Error(errorData.message);
            }
            if (simulation) {
                const multiplier = isDefaultFee ? 1 : FEE_MULTIPLIER;
                const preparedFee = this.prepareFee(predictedFee, multiplier);
                const coin = readyFeeCoin;
                return {
                    amount: BigNumber(preparedFee).toFixed(0),
                    coin,
                };
            }
            fee = this.getFee({ denom: readyFeeCoin, amount: predictedFee });
        }
        signObject = await signTransaction(txBodyBytes, this.wallet, this.account, this.chainId, fee);
        txRaw = TxRaw.fromPartial({
            bodyBytes: signObject.signDoc.bodyBytes,
            authInfoBytes: signObject.signDoc.authInfoBytes,
            signatures: [fromBase64(signObject.stdSignature.signature)],
        });
        txBytes = TxRaw.encode(txRaw).finish();
        if (!this.rpcClient) {
            throw new Error("Rpc Client error");
        }
        const waitForTx = options.txBroadcastMode === BROADCAST_MODE_BLOCK;
        result = await this.rpcClient.broadcastTx(txBytes, waitForTx);
        if (noSimulation && "expectedSequence" in result && tryTimes) {
            this.account.sequence = Number(result.expectedSequence);
            result = (await this.sendTransaction(msgAny, options, simulation, tryTimes - 1));
        }
        this.account.sequence++;
        return result;
    }
    async sendCoin(data, options, simulation = false) {
        const msg = MsgSendCoin.fromPartial(sendCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_SEND,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async burnCoins(data, options, simulation = false) {
        const msg = MsgBurnCoin.fromPartial(burnCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_BURN,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async updateCoin(data, options, simulation = false) {
        const msg = MsgUpdateCoin.fromPartial(updateCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_UPDATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async createCoin(data, options, simulation = false) {
        const msg = MsgCreateCoin.fromPartial(createCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_CREATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async multiSendCoin(data, options, simulation = false) {
        const msg = MsgMultiSendCoin.fromPartial(multiSendCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_MULTISEND,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async createWallet(data, options, simulation = false) {
        const msg = MsgCreateWallet.fromPartial(createWalletData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.MULTISIG_CREATE_WALLET,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async mintNft(data, options, simulation = false) {
        const msg = MsgMintToken.fromPartial(mintNftData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_MINT,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async transferNft(data, options, simulation = false) {
        const msg = MsgSendToken.fromPartial(transferNftData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_TRANSFER,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async burnNft(data, options, simulation = false) {
        const msg = MsgBurnToken.fromPartial(burnNftData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_BURN,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async multisigCreateTx(data, options, simulation = false) {
        const changedWallet = { ...this.wallet, address: data.from };
        const preparedData = dataToProto[data.type](data.value, changedWallet);
        const msg = MsgCreateTransaction.fromPartial({
            sender: this.wallet.address,
            wallet: data.from,
            content: this.encoderDecoder.encodeAsAny({
                typeUrl: data.type,
                value: preparedData,
            }),
        });
        const msgAny = {
            typeUrl: txTypesNew.MULTISIG_CREATE_TX,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async buyCoins(data, options, simulation = false) {
        const msg = MsgBuyCoin.fromPartial(buyCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_BUY,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async sellCoins(data, options, simulation = false) {
        const msg = MsgSellCoin.fromPartial(sellCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_SELL,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async sellAllCoins(data, options, simulation = false) {
        const msg = MsgSellAllCoin.fromPartial(sellAllCoinData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_SELL_ALL,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async multisigSignTx(data, options, simulation = false) {
        const msg = MsgSignTransaction.fromPartial(multisigSignTxData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.MULTISIG_SIGN_TX,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async nftUpdateReserve(data, options, simulation = false) {
        const msg = MsgUpdateReserve.fromPartial(nftUpdateReserveData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_UPDATE_RESERVE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async issueCheck(data) {
        return issueCheck.apply(this, [this.wallet, this.chainId])(data);
    }
    async redeemCheck(data, options, simulation = false) {
        const msg = MsgRedeemCheck.fromPartial(redeemCheckData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_REDEEM_CHECK,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async nftEditMetadata(data, options, simulation = false) {
        const msg = MsgUpdateToken.fromPartial(nftEditMetadata(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.COIN_REDEEM_CHECK,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async msgSwapInit(data, options, simulation = false) {
        const msg = MsgInitializeSwap.fromPartial(swapInitData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.SWAP_INIT,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async msgSwapRedeem(data, options, simulation = false) {
        const msg = MsgRedeemSwap.fromPartial(swapRedeemData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.SWAP_REDEEM,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async delegate(data, options, simulation = false) {
        const msg = MsgDelegate.fromPartial(delegateData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_DELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async unbond(data, options, simulation = false) {
        const msg = MsgUndelegate.fromPartial(unbondData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_UNBOND,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async cancelUnbonding(data, options, simulation = false) {
        const msg = MsgCancelUndelegation.fromPartial(cancelUnbondingData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_CANCEL_UNDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async redelegate(data, options, simulation = false) {
        const msg = MsgRedelegate.fromPartial(redelegateData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_REDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async cancelRedelegation(data, options, simulation = false) {
        const msg = MsgCancelRedelegation.fromPartial(cancelRedelegationData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_CANCEL_REDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async delegateNft(data, options, simulation = false) {
        const msg = MsgDelegateNFT.fromPartial(nftDelegateData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_DELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async unbondNft(data, options, simulation = false) {
        const msg = MsgUndelegateNFT.fromPartial(nftUnbondData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_UNBOND,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async cancelUnbondingNft(data, options, simulation = false) {
        const msg = MsgCancelUndelegationNFT.fromPartial(cancelNftUnbondingData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_CANCEL_UNDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async redelegateNft(data, options, simulation = false) {
        const msg = MsgRedelegateNFT.fromPartial(nftRedelegateData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_REDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async cancelRedelegationNft(data, options, simulation = false) {
        const msg = MsgCancelRedelegationNFT.fromPartial(nftCancelRedelegationData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.NFT_CANCEL_REDELEGATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async createValidator(data, options, simulation = false) {
        var _a;
        const validatorData = createValidatorData(data, this.wallet);
        const key = PubKey.encode({
            key: (_a = validatorData.consensusPubkey) === null || _a === void 0 ? void 0 : _a.value,
        }).finish();
        const msg = MsgCreateValidator.fromPartial({
            ...validatorData,
            consensusPubkey: {
                typeUrl: "/cosmos.crypto.ed25519.PubKey",
                value: key,
            },
        });
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_CANDIDATE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async editValidator(data, options, simulation = false) {
        const msg = MsgEditValidator.fromPartial(editValidatorData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_CANDIDATE_EDIT,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async setOnline(data, options, simulation = false) {
        const msg = MsgSetOnline.fromPartial(setOnlineData(data));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_SET_ONLINE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async setOffline(data, options, simulation = false) {
        const msg = MsgSetOffline.fromPartial(setOfflineData(data));
        const msgAny = {
            typeUrl: txTypesNew.VALIDATOR_SET_OFFLINE,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    async returnLegacy(data, options, simulation = false) {
        const msg = MsgReturnLegacy.fromPartial(returnLegacyData(data, this.wallet));
        const msgAny = {
            typeUrl: txTypesNew.REOWN_LEGACY,
            value: msg,
        };
        const result = await this.sendTransaction(msgAny, options, simulation);
        return result;
    }
    getFee(options) {
        const amount = [];
        if (options.denom) {
            amount.push({
                denom: options.denom.toLowerCase(),
                amount: this.prepareFee(options.amount, FEE_MULTIPLIER),
            });
        }
        return {
            amount,
            gas: DEFAULT_GAS,
        };
    }
    prepareFee(amount, multiplier = 1) {
        const amountBN = new BigNumber(amount).multipliedBy(multiplier);
        const amountString = amountBN.toFixed(0);
        return amountString;
    }
    getDefaultFee() {
        return {
            amount: [],
            gas: DEFAULT_GAS,
        };
    }
}
//# sourceMappingURL=transaction.js.map