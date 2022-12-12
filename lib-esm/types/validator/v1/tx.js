/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Description } from "./validator";
/* eslint-disable */
export const protobufPackage = "decimal.validator.v1";
function createBaseMsgCreateValidator() {
    return {
        operatorAddress: "",
        rewardAddress: "",
        consensusPubkey: undefined,
        description: undefined,
        commission: "",
        stake: undefined,
    };
}
export const MsgCreateValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        if (message.rewardAddress !== "") {
            writer.uint32(18).string(message.rewardAddress);
        }
        if (message.consensusPubkey !== undefined) {
            Any.encode(message.consensusPubkey, writer.uint32(26).fork()).ldelim();
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(34).fork()).ldelim();
        }
        if (message.commission !== "") {
            writer.uint32(42).string(message.commission);
        }
        if (message.stake !== undefined) {
            Coin.encode(message.stake, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.rewardAddress = reader.string();
                    break;
                case 3:
                    message.consensusPubkey = Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.commission = reader.string();
                    break;
                case 6:
                    message.stake = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
            rewardAddress: isSet(object.rewardAddress) ? String(object.rewardAddress) : "",
            consensusPubkey: isSet(object.consensusPubkey) ? Any.fromJSON(object.consensusPubkey) : undefined,
            description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
            commission: isSet(object.commission) ? String(object.commission) : "",
            stake: isSet(object.stake) ? Coin.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.operatorAddress !== undefined && (obj.operatorAddress = message.operatorAddress);
        message.rewardAddress !== undefined && (obj.rewardAddress = message.rewardAddress);
        message.consensusPubkey !== undefined &&
            (obj.consensusPubkey = message.consensusPubkey ? Any.toJSON(message.consensusPubkey) : undefined);
        message.description !== undefined &&
            (obj.description = message.description ? Description.toJSON(message.description) : undefined);
        message.commission !== undefined && (obj.commission = message.commission);
        message.stake !== undefined && (obj.stake = message.stake ? Coin.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgCreateValidator();
        message.operatorAddress = (_a = object.operatorAddress) !== null && _a !== void 0 ? _a : "";
        message.rewardAddress = (_b = object.rewardAddress) !== null && _b !== void 0 ? _b : "";
        message.consensusPubkey = (object.consensusPubkey !== undefined && object.consensusPubkey !== null)
            ? Any.fromPartial(object.consensusPubkey)
            : undefined;
        message.description = (object.description !== undefined && object.description !== null)
            ? Description.fromPartial(object.description)
            : undefined;
        message.commission = (_c = object.commission) !== null && _c !== void 0 ? _c : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Coin.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseMsgCreateValidatorResponse() {
    return {};
}
export const MsgCreateValidatorResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateValidatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateValidatorResponse();
        return message;
    },
};
function createBaseMsgEditValidator() {
    return { operatorAddress: "", rewardAddress: "", description: undefined };
}
export const MsgEditValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        if (message.rewardAddress !== "") {
            writer.uint32(18).string(message.rewardAddress);
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEditValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.rewardAddress = reader.string();
                    break;
                case 3:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
            rewardAddress: isSet(object.rewardAddress) ? String(object.rewardAddress) : "",
            description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.operatorAddress !== undefined && (obj.operatorAddress = message.operatorAddress);
        message.rewardAddress !== undefined && (obj.rewardAddress = message.rewardAddress);
        message.description !== undefined &&
            (obj.description = message.description ? Description.toJSON(message.description) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgEditValidator();
        message.operatorAddress = (_a = object.operatorAddress) !== null && _a !== void 0 ? _a : "";
        message.rewardAddress = (_b = object.rewardAddress) !== null && _b !== void 0 ? _b : "";
        message.description = (object.description !== undefined && object.description !== null)
            ? Description.fromPartial(object.description)
            : undefined;
        return message;
    },
};
function createBaseMsgEditValidatorResponse() {
    return {};
}
export const MsgEditValidatorResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEditValidatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgEditValidatorResponse();
        return message;
    },
};
function createBaseMsgSetOnline() {
    return { validator: "" };
}
export const MsgSetOnline = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetOnline();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { validator: isSet(object.validator) ? String(object.validator) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSetOnline();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseMsgSetOnlineResponse() {
    return {};
}
export const MsgSetOnlineResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetOnlineResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSetOnlineResponse();
        return message;
    },
};
function createBaseMsgSetOffline() {
    return { validator: "" };
}
export const MsgSetOffline = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetOffline();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { validator: isSet(object.validator) ? String(object.validator) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSetOffline();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseMsgSetOfflineResponse() {
    return {};
}
export const MsgSetOfflineResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetOfflineResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSetOfflineResponse();
        return message;
    },
};
function createBaseMsgDelegate() {
    return { delegator: "", validator: "", coin: undefined };
}
export const MsgDelegate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgDelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgDelegateResponse() {
    return {};
}
export const MsgDelegateResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgDelegateResponse();
        return message;
    },
};
function createBaseMsgDelegateNFT() {
    return { delegator: "", validator: "", tokenId: "", subTokenIds: [] };
}
export const MsgDelegateNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.tokenId !== "") {
            writer.uint32(26).string(message.tokenId);
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegateNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.tokenId = reader.string();
                    break;
                case 4:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgDelegateNFT();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.tokenId = (_c = object.tokenId) !== null && _c !== void 0 ? _c : "";
        message.subTokenIds = ((_d = object.subTokenIds) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgDelegateNFTResponse() {
    return {};
}
export const MsgDelegateNFTResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDelegateNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgDelegateNFTResponse();
        return message;
    },
};
function createBaseMsgRedelegate() {
    return { delegator: "", validatorSrc: "", validatorDst: "", coin: undefined };
}
export const MsgRedelegate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validatorSrc !== "") {
            writer.uint32(18).string(message.validatorSrc);
        }
        if (message.validatorDst !== "") {
            writer.uint32(26).string(message.validatorDst);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validatorSrc = reader.string();
                    break;
                case 3:
                    message.validatorDst = reader.string();
                    break;
                case 4:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validatorSrc: isSet(object.validatorSrc) ? String(object.validatorSrc) : "",
            validatorDst: isSet(object.validatorDst) ? String(object.validatorDst) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgRedelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgRedelegateResponse() {
    return { completionTime: undefined };
}
export const MsgRedelegateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgRedelegateResponse();
        message.completionTime = (_a = object.completionTime) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgRedelegateNFT() {
    return { delegator: "", validatorSrc: "", validatorDst: "", tokenId: "", subTokenIds: [] };
}
export const MsgRedelegateNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validatorSrc !== "") {
            writer.uint32(18).string(message.validatorSrc);
        }
        if (message.validatorDst !== "") {
            writer.uint32(26).string(message.validatorDst);
        }
        if (message.tokenId !== "") {
            writer.uint32(34).string(message.tokenId);
        }
        writer.uint32(42).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedelegateNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validatorSrc = reader.string();
                    break;
                case 3:
                    message.validatorDst = reader.string();
                    break;
                case 4:
                    message.tokenId = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validatorSrc: isSet(object.validatorSrc) ? String(object.validatorSrc) : "",
            validatorDst: isSet(object.validatorDst) ? String(object.validatorDst) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseMsgRedelegateNFT();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.tokenId = (_d = object.tokenId) !== null && _d !== void 0 ? _d : "";
        message.subTokenIds = ((_e = object.subTokenIds) === null || _e === void 0 ? void 0 : _e.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgRedelegateNFTResponse() {
    return { completionTime: undefined };
}
export const MsgRedelegateNFTResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedelegateNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgRedelegateNFTResponse();
        message.completionTime = (_a = object.completionTime) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgUndelegate() {
    return { delegator: "", validator: "", coin: undefined };
}
export const MsgUndelegate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUndelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgUndelegateResponse() {
    return { completionTime: undefined };
}
export const MsgUndelegateResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegateResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgUndelegateResponse();
        message.completionTime = (_a = object.completionTime) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgUndelegateNFT() {
    return { delegator: "", validator: "", tokenId: "", subTokenIds: [] };
}
export const MsgUndelegateNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.tokenId !== "") {
            writer.uint32(26).string(message.tokenId);
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegateNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.tokenId = reader.string();
                    break;
                case 4:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgUndelegateNFT();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.tokenId = (_c = object.tokenId) !== null && _c !== void 0 ? _c : "";
        message.subTokenIds = ((_d = object.subTokenIds) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgUndelegateNFTResponse() {
    return { completionTime: undefined };
}
export const MsgUndelegateNFTResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUndelegateNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgUndelegateNFTResponse();
        message.completionTime = (_a = object.completionTime) !== null && _a !== void 0 ? _a : undefined;
        return message;
    },
};
function createBaseMsgCancelRedelegation() {
    return { delegator: "", validatorSrc: "", validatorDst: "", creationHeight: 0, coin: undefined };
}
export const MsgCancelRedelegation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validatorSrc !== "") {
            writer.uint32(18).string(message.validatorSrc);
        }
        if (message.validatorDst !== "") {
            writer.uint32(26).string(message.validatorDst);
        }
        if (message.creationHeight !== 0) {
            writer.uint32(32).int64(message.creationHeight);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelRedelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validatorSrc = reader.string();
                    break;
                case 3:
                    message.validatorDst = reader.string();
                    break;
                case 4:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 5:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validatorSrc: isSet(object.validatorSrc) ? String(object.validatorSrc) : "",
            validatorDst: isSet(object.validatorDst) ? String(object.validatorDst) : "",
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgCancelRedelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.creationHeight = (_d = object.creationHeight) !== null && _d !== void 0 ? _d : 0;
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgCancelRedelegationResponse() {
    return {};
}
export const MsgCancelRedelegationResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelRedelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCancelRedelegationResponse();
        return message;
    },
};
function createBaseMsgCancelRedelegationNFT() {
    return { delegator: "", validatorSrc: "", validatorDst: "", creationHeight: 0, tokenId: "", subTokenIds: [] };
}
export const MsgCancelRedelegationNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validatorSrc !== "") {
            writer.uint32(18).string(message.validatorSrc);
        }
        if (message.validatorDst !== "") {
            writer.uint32(26).string(message.validatorDst);
        }
        if (message.creationHeight !== 0) {
            writer.uint32(32).int64(message.creationHeight);
        }
        if (message.tokenId !== "") {
            writer.uint32(42).string(message.tokenId);
        }
        writer.uint32(50).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelRedelegationNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validatorSrc = reader.string();
                    break;
                case 3:
                    message.validatorDst = reader.string();
                    break;
                case 4:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 5:
                    message.tokenId = reader.string();
                    break;
                case 6:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validatorSrc: isSet(object.validatorSrc) ? String(object.validatorSrc) : "",
            validatorDst: isSet(object.validatorDst) ? String(object.validatorDst) : "",
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseMsgCancelRedelegationNFT();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.creationHeight = (_d = object.creationHeight) !== null && _d !== void 0 ? _d : 0;
        message.tokenId = (_e = object.tokenId) !== null && _e !== void 0 ? _e : "";
        message.subTokenIds = ((_f = object.subTokenIds) === null || _f === void 0 ? void 0 : _f.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgCancelRedelegationNFTResponse() {
    return {};
}
export const MsgCancelRedelegationNFTResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelRedelegationNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCancelRedelegationNFTResponse();
        return message;
    },
};
function createBaseMsgCancelUndelegation() {
    return { delegator: "", validator: "", creationHeight: 0, coin: undefined };
}
export const MsgCancelUndelegation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.creationHeight !== 0) {
            writer.uint32(24).int64(message.creationHeight);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUndelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 4:
                    message.coin = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgCancelUndelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.creationHeight = (_c = object.creationHeight) !== null && _c !== void 0 ? _c : 0;
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgCancelUndelegationResponse() {
    return {};
}
export const MsgCancelUndelegationResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUndelegationResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCancelUndelegationResponse();
        return message;
    },
};
function createBaseMsgCancelUndelegationNFT() {
    return { delegator: "", validator: "", creationHeight: 0, tokenId: "", subTokenIds: [] };
}
export const MsgCancelUndelegationNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.creationHeight !== 0) {
            writer.uint32(24).int64(message.creationHeight);
        }
        if (message.tokenId !== "") {
            writer.uint32(34).string(message.tokenId);
        }
        writer.uint32(42).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUndelegationNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 4:
                    message.tokenId = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseMsgCancelUndelegationNFT();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.creationHeight = (_c = object.creationHeight) !== null && _c !== void 0 ? _c : 0;
        message.tokenId = (_d = object.tokenId) !== null && _d !== void 0 ? _d : "";
        message.subTokenIds = ((_e = object.subTokenIds) === null || _e === void 0 ? void 0 : _e.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgCancelUndelegationNFTResponse() {
    return {};
}
export const MsgCancelUndelegationNFTResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUndelegationNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgCancelUndelegationNFTResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateValidator = this.CreateValidator.bind(this);
        this.EditValidator = this.EditValidator.bind(this);
        this.SetOnline = this.SetOnline.bind(this);
        this.SetOffline = this.SetOffline.bind(this);
        this.Delegate = this.Delegate.bind(this);
        this.DelegateNFT = this.DelegateNFT.bind(this);
        this.Redelegate = this.Redelegate.bind(this);
        this.RedelegateNFT = this.RedelegateNFT.bind(this);
        this.Undelegate = this.Undelegate.bind(this);
        this.UndelegateNFT = this.UndelegateNFT.bind(this);
        this.CancelRedelegation = this.CancelRedelegation.bind(this);
        this.CancelRedelegationNFT = this.CancelRedelegationNFT.bind(this);
        this.CancelUndelegation = this.CancelUndelegation.bind(this);
        this.CancelUndelegationNFT = this.CancelUndelegationNFT.bind(this);
    }
    CreateValidator(request) {
        const data = MsgCreateValidator.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "CreateValidator", data);
        return promise.then((data) => MsgCreateValidatorResponse.decode(new _m0.Reader(data)));
    }
    EditValidator(request) {
        const data = MsgEditValidator.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "EditValidator", data);
        return promise.then((data) => MsgEditValidatorResponse.decode(new _m0.Reader(data)));
    }
    SetOnline(request) {
        const data = MsgSetOnline.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "SetOnline", data);
        return promise.then((data) => MsgSetOnlineResponse.decode(new _m0.Reader(data)));
    }
    SetOffline(request) {
        const data = MsgSetOffline.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "SetOffline", data);
        return promise.then((data) => MsgSetOfflineResponse.decode(new _m0.Reader(data)));
    }
    Delegate(request) {
        const data = MsgDelegate.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "Delegate", data);
        return promise.then((data) => MsgDelegateResponse.decode(new _m0.Reader(data)));
    }
    DelegateNFT(request) {
        const data = MsgDelegateNFT.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "DelegateNFT", data);
        return promise.then((data) => MsgDelegateNFTResponse.decode(new _m0.Reader(data)));
    }
    Redelegate(request) {
        const data = MsgRedelegate.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "Redelegate", data);
        return promise.then((data) => MsgRedelegateResponse.decode(new _m0.Reader(data)));
    }
    RedelegateNFT(request) {
        const data = MsgRedelegateNFT.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "RedelegateNFT", data);
        return promise.then((data) => MsgRedelegateNFTResponse.decode(new _m0.Reader(data)));
    }
    Undelegate(request) {
        const data = MsgUndelegate.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "Undelegate", data);
        return promise.then((data) => MsgUndelegateResponse.decode(new _m0.Reader(data)));
    }
    UndelegateNFT(request) {
        const data = MsgUndelegateNFT.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "UndelegateNFT", data);
        return promise.then((data) => MsgUndelegateNFTResponse.decode(new _m0.Reader(data)));
    }
    CancelRedelegation(request) {
        const data = MsgCancelRedelegation.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "CancelRedelegation", data);
        return promise.then((data) => MsgCancelRedelegationResponse.decode(new _m0.Reader(data)));
    }
    CancelRedelegationNFT(request) {
        const data = MsgCancelRedelegationNFT.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "CancelRedelegationNFT", data);
        return promise.then((data) => MsgCancelRedelegationNFTResponse.decode(new _m0.Reader(data)));
    }
    CancelUndelegation(request) {
        const data = MsgCancelUndelegation.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "CancelUndelegation", data);
        return promise.then((data) => MsgCancelUndelegationResponse.decode(new _m0.Reader(data)));
    }
    CancelUndelegationNFT(request) {
        const data = MsgCancelUndelegationNFT.encode(request).finish();
        const promise = this.rpc.request("decimal.validator.v1.Msg", "CancelUndelegationNFT", data);
        return promise.then((data) => MsgCancelUndelegationNFTResponse.decode(new _m0.Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map