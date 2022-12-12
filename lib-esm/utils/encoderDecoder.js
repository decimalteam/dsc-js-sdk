/* eslint-disable @typescript-eslint/naming-convention */
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import txTypesNew from "../txTypesNew";
import { MsgBurnCoin, MsgBuyCoin, MsgCreateCoin, MsgMultiSendCoin, MsgRedeemCheck, MsgSellAllCoin, MsgSellCoin, MsgSendCoin, MsgUpdateCoin, } from "../types/decimal/coin/v1/tx";
import { PubKey as PubKeyED } from "../types/cosmos/crypto/ed25519/keys";
import { PubKey } from "../types/ethermint/crypto/v1/ethsecp256k1/keys";
import { MsgCreateTransaction, MsgCreateWallet, MsgSignTransaction, } from "../types/decimal/multisig/v1/tx";
import { MsgBurnToken, MsgMintToken, MsgSendToken, MsgUpdateReserve, MsgUpdateToken, } from "../types/decimal/nft/v1/tx";
import { MsgInitializeSwap, MsgRedeemSwap } from "../types/decimal/swap/v1/tx";
import { MsgCancelRedelegation, MsgCancelRedelegationNFT, MsgCancelUndelegation, MsgCancelUndelegationNFT, MsgCreateValidator, MsgDelegate, MsgDelegateNFT, MsgEditValidator, MsgRedelegate, MsgRedelegateNFT, MsgSetOffline, MsgSetOnline, MsgUndelegate, MsgUndelegateNFT, } from "../types/validator/v1/tx";
import { MsgReturnLegacy } from "../types/decimal/legacy/v1/tx";
export function isTsProtoGeneratedType(type) {
    return typeof type.fromPartial === "function";
}
export function isPbjsGeneratedType(type) {
    return !isTsProtoGeneratedType(type);
}
const defaultTypeUrls = {
    cosmosCoin: "/cosmos.base.v1beta1.Coin",
    cosmosMsgSend: "/cosmos.bank.v1beta1.MsgSend",
    cosmosTxBody: "/cosmos.tx.v1beta1.TxBody",
    googleAny: "/google.protobuf.Any",
};
export function isTxBodyEncodeObject(encodeObject) {
    return (encodeObject.typeUrl === "/cosmos.tx.v1beta1.TxBody");
}
export const pubKeyTypeUrl = "/ethermint.crypto.v1.ethsecp256k1.PubKey";
export const pubKeyValidatorTypeUrl = "/cosmos.crypto.ed25519.PubKey";
export class EncoderDecoder {
    constructor(customTypes) {
        const { cosmosCoin, cosmosMsgSend } = defaultTypeUrls;
        this.types = customTypes
            ? new Map([...customTypes])
            : new Map([
                [cosmosCoin, Coin],
                [cosmosMsgSend, MsgSend],
            ]);
        // COIN
        this.types.set(txTypesNew.COIN_SEND, MsgSendCoin);
        this.types.set(txTypesNew.COIN_BURN, MsgBurnCoin);
        this.types.set(txTypesNew.COIN_CREATE, MsgCreateCoin);
        this.types.set(txTypesNew.COIN_UPDATE, MsgUpdateCoin);
        this.types.set(txTypesNew.COIN_BUY, MsgBuyCoin);
        this.types.set(txTypesNew.COIN_SELL, MsgSellCoin);
        this.types.set(txTypesNew.COIN_SELL_ALL, MsgSellAllCoin);
        this.types.set(txTypesNew.COIN_MULTISEND, MsgMultiSendCoin);
        this.types.set(txTypesNew.COIN_REDEEM_CHECK, MsgRedeemCheck);
        // MULTISIG
        this.types.set(txTypesNew.MULTISIG_CREATE_WALLET, MsgCreateWallet);
        this.types.set(txTypesNew.MULTISIG_CREATE_TX, MsgCreateTransaction);
        this.types.set(txTypesNew.MULTISIG_SIGN_TX, MsgSignTransaction);
        // NFT
        this.types.set(txTypesNew.NFT_MINT, MsgMintToken);
        this.types.set(txTypesNew.NFT_TRANSFER, MsgSendToken);
        this.types.set(txTypesNew.NFT_BURN, MsgBurnToken);
        this.types.set(txTypesNew.NFT_UPDATE_RESERVE, MsgUpdateReserve);
        this.types.set(txTypesNew.NFT_EDIT_METADATA, MsgUpdateToken);
        // SWAP
        this.types.set(txTypesNew.SWAP_INIT, MsgInitializeSwap);
        this.types.set(txTypesNew.SWAP_REDEEM, MsgRedeemSwap);
        // VALIDATOR
        this.types.set(txTypesNew.VALIDATOR_CANDIDATE, MsgCreateValidator);
        this.types.set(txTypesNew.VALIDATOR_CANDIDATE_EDIT, MsgEditValidator);
        this.types.set(txTypesNew.VALIDATOR_SET_ONLINE, MsgSetOnline);
        this.types.set(txTypesNew.VALIDATOR_SET_OFFLINE, MsgSetOffline);
        this.types.set(txTypesNew.VALIDATOR_DELEGATE, MsgDelegate);
        this.types.set(txTypesNew.VALIDATOR_UNBOND, MsgUndelegate);
        this.types.set(txTypesNew.VALIDATOR_REDELEGATE, MsgRedelegate);
        this.types.set(txTypesNew.VALIDATOR_CANCEL_REDELEGATE, MsgCancelRedelegation);
        this.types.set(txTypesNew.VALIDATOR_CANCEL_UNDELEGATE, MsgCancelUndelegation);
        this.types.set(txTypesNew.NFT_DELEGATE, MsgDelegateNFT);
        this.types.set(txTypesNew.NFT_UNBOND, MsgUndelegateNFT);
        this.types.set(txTypesNew.NFT_REDELEGATE, MsgRedelegateNFT);
        this.types.set(txTypesNew.NFT_CANCEL_REDELEGATE, MsgCancelRedelegationNFT);
        this.types.set(txTypesNew.NFT_CANCEL_UNDELEGATE, MsgCancelUndelegationNFT);
        // LEGACY
        this.types.set(txTypesNew.REOWN_LEGACY, MsgReturnLegacy);
        // KEYS
        this.types.set(pubKeyValidatorTypeUrl, PubKeyED);
    }
    register(typeUrl, type) {
        this.types.set(typeUrl, type);
    }
    lookupType(typeUrl) {
        return this.types.get(typeUrl);
    }
    lookupTypeWithError(typeUrl) {
        const type = this.lookupType(typeUrl);
        if (!type) {
            throw new Error(`Unregistered type url: ${typeUrl}`);
        }
        return type;
    }
    encode(encodeObject) {
        const { value, typeUrl } = encodeObject;
        if (isTxBodyEncodeObject(encodeObject)) {
            return this.encodeTxBody(value);
        }
        const type = this.lookupTypeWithError(typeUrl);
        const instance = isTsProtoGeneratedType(type)
            ? type.fromPartial(value)
            : type.create(value);
        return type.encode(instance).finish();
    }
    encodeAsAny(encodeObject) {
        const binaryValue = this.encode(encodeObject);
        return Any.fromPartial({
            typeUrl: encodeObject.typeUrl,
            value: binaryValue,
        });
    }
    encodePubKey(pubKeyCompressed) {
        return {
            typeUrl: pubKeyTypeUrl,
            value: PubKey.encode(pubKeyCompressed).finish(),
        };
    }
    // public encodeValidatorPubKey(pubKeyCompressed: PubKey) {
    //   return {
    //     typeUrl: pubKeyTypeUrl,
    //     value: PublicKey.encode(pubKeyCompressed).finish(),
    //   };
    // }
    encodeTxBody(txBodyFields) {
        const wrappedMessages = txBodyFields.messages.map((message) => this.encodeAsAny(message));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const txBody = TxBody.fromPartial({
            ...txBodyFields,
            messages: wrappedMessages,
        });
        return TxBody.encode(txBody).finish();
    }
    decode({ typeUrl, value }) {
        if (typeUrl === defaultTypeUrls.cosmosTxBody) {
            return this.decodeTxBody(value);
        }
        const type = this.lookupTypeWithError(typeUrl);
        const decoded = type.decode(value);
        Object.entries(decoded).forEach(([key, val]) => {
            if (typeof Buffer !== "undefined" &&
                typeof Buffer.isBuffer !== "undefined" &&
                Buffer.isBuffer(val)) {
                decoded[key] = Uint8Array.from(val);
            }
        });
        return decoded;
    }
    decodeTxBody(txBody) {
        const decodedTxBody = TxBody.decode(txBody);
        return {
            ...decodedTxBody,
            messages: decodedTxBody.messages.map(({ typeUrl: typeUrl, value }) => {
                if (!typeUrl) {
                    throw new Error("Missing type_url in Any");
                }
                if (!value) {
                    throw new Error("Missing value in Any");
                }
                return this.decode({ typeUrl, value });
            }),
        };
    }
}
//# sourceMappingURL=encoderDecoder.js.map