/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Description, Stake } from "./validator";
export const protobufPackage = "decimal.validator.v1";
function createBaseEventCreateValidator() {
    return {
        sender: "",
        validator: "",
        rewardAddress: "",
        consensusPubkey: "",
        description: undefined,
        commission: "",
        stake: undefined,
    };
}
export const EventCreateValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.rewardAddress !== "") {
            writer.uint32(26).string(message.rewardAddress);
        }
        if (message.consensusPubkey !== "") {
            writer.uint32(34).string(message.consensusPubkey);
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(42).fork()).ldelim();
        }
        if (message.commission !== "") {
            writer.uint32(50).string(message.commission);
        }
        if (message.stake !== undefined) {
            Coin.encode(message.stake, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.rewardAddress = reader.string();
                    break;
                case 4:
                    message.consensusPubkey = reader.string();
                    break;
                case 5:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.commission = reader.string();
                    break;
                case 7:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            rewardAddress: isSet(object.rewardAddress) ? String(object.rewardAddress) : "",
            consensusPubkey: isSet(object.consensusPubkey) ? String(object.consensusPubkey) : "",
            description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
            commission: isSet(object.commission) ? String(object.commission) : "",
            stake: isSet(object.stake) ? Coin.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.validator !== undefined && (obj.validator = message.validator);
        message.rewardAddress !== undefined && (obj.rewardAddress = message.rewardAddress);
        message.consensusPubkey !== undefined && (obj.consensusPubkey = message.consensusPubkey);
        message.description !== undefined &&
            (obj.description = message.description ? Description.toJSON(message.description) : undefined);
        message.commission !== undefined && (obj.commission = message.commission);
        message.stake !== undefined && (obj.stake = message.stake ? Coin.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseEventCreateValidator();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.rewardAddress = (_c = object.rewardAddress) !== null && _c !== void 0 ? _c : "";
        message.consensusPubkey = (_d = object.consensusPubkey) !== null && _d !== void 0 ? _d : "";
        message.description = (object.description !== undefined && object.description !== null)
            ? Description.fromPartial(object.description)
            : undefined;
        message.commission = (_e = object.commission) !== null && _e !== void 0 ? _e : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Coin.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseEventEditValidator() {
    return { sender: "", validator: "", rewardAddress: "", description: undefined };
}
export const EventEditValidator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.rewardAddress !== "") {
            writer.uint32(26).string(message.rewardAddress);
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventEditValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.rewardAddress = reader.string();
                    break;
                case 4:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            rewardAddress: isSet(object.rewardAddress) ? String(object.rewardAddress) : "",
            description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.validator !== undefined && (obj.validator = message.validator);
        message.rewardAddress !== undefined && (obj.rewardAddress = message.rewardAddress);
        message.description !== undefined &&
            (obj.description = message.description ? Description.toJSON(message.description) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventEditValidator();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.rewardAddress = (_c = object.rewardAddress) !== null && _c !== void 0 ? _c : "";
        message.description = (object.description !== undefined && object.description !== null)
            ? Description.fromPartial(object.description)
            : undefined;
        return message;
    },
};
function createBaseEventSetOnline() {
    return { sender: "", validator: "" };
}
export const EventSetOnline = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSetOnline();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
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
        return {
            sender: isSet(object.sender) ? String(object.sender) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.validator !== undefined && (obj.validator = message.validator);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventSetOnline();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventSetOffline() {
    return { sender: "", validator: "" };
}
export const EventSetOffline = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSetOffline();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
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
        return {
            sender: isSet(object.sender) ? String(object.sender) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.validator !== undefined && (obj.validator = message.validator);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventSetOffline();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventDelegate() {
    return { delegator: "", validator: "", stake: undefined, amountBase: "" };
}
export const EventDelegate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        if (message.amountBase !== "") {
            writer.uint32(34).string(message.amountBase);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventDelegate();
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
                    message.stake = Stake.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.amountBase = reader.string();
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
            amountBase: isSet(object.amountBase) ? String(object.amountBase) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        message.amountBase !== undefined && (obj.amountBase = message.amountBase);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventDelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        message.amountBase = (_c = object.amountBase) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventRedelegate() {
    return { delegator: "", validatorSrc: "", validatorDst: "", stake: undefined, amountBase: "", completeAt: undefined };
}
export const EventRedelegate = {
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
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(34).fork()).ldelim();
        }
        if (message.amountBase !== "") {
            writer.uint32(42).string(message.amountBase);
        }
        if (message.completeAt !== undefined) {
            Timestamp.encode(toTimestamp(message.completeAt), writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventRedelegate();
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
                    message.stake = Stake.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.amountBase = reader.string();
                    break;
                case 6:
                    message.completeAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
            amountBase: isSet(object.amountBase) ? String(object.amountBase) : "",
            completeAt: isSet(object.completeAt) ? fromJsonTimestamp(object.completeAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        message.amountBase !== undefined && (obj.amountBase = message.amountBase);
        message.completeAt !== undefined && (obj.completeAt = message.completeAt.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseEventRedelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        message.amountBase = (_d = object.amountBase) !== null && _d !== void 0 ? _d : "";
        message.completeAt = (_e = object.completeAt) !== null && _e !== void 0 ? _e : undefined;
        return message;
    },
};
function createBaseEventRedelegateComplete() {
    return { delegator: "", validatorSrc: "", validatorDst: "", stake: undefined };
}
export const EventRedelegateComplete = {
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
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventRedelegateComplete();
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
                    message.stake = Stake.decode(reader, reader.uint32());
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventRedelegateComplete();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseEventUndelegate() {
    return { delegator: "", validator: "", stake: undefined, amountBase: "", completeAt: undefined };
}
export const EventUndelegate = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        if (message.amountBase !== "") {
            writer.uint32(34).string(message.amountBase);
        }
        if (message.completeAt !== undefined) {
            Timestamp.encode(toTimestamp(message.completeAt), writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUndelegate();
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
                    message.stake = Stake.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.amountBase = reader.string();
                    break;
                case 5:
                    message.completeAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
            amountBase: isSet(object.amountBase) ? String(object.amountBase) : "",
            completeAt: isSet(object.completeAt) ? fromJsonTimestamp(object.completeAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        message.amountBase !== undefined && (obj.amountBase = message.amountBase);
        message.completeAt !== undefined && (obj.completeAt = message.completeAt.toISOString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEventUndelegate();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        message.amountBase = (_c = object.amountBase) !== null && _c !== void 0 ? _c : "";
        message.completeAt = (_d = object.completeAt) !== null && _d !== void 0 ? _d : undefined;
        return message;
    },
};
function createBaseEventUndelegateComplete() {
    return { delegator: "", validator: "", stake: undefined };
}
export const EventUndelegateComplete = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUndelegateComplete();
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
                    message.stake = Stake.decode(reader, reader.uint32());
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventUndelegateComplete();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseEventCancelRedelegation() {
    return { delegator: "", validatorSrc: "", validatorDst: "", creationHeight: 0, stake: undefined };
}
export const EventCancelRedelegation = {
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
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCancelRedelegation();
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
                    message.stake = Stake.decode(reader, reader.uint32());
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEventCancelRedelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.creationHeight = (_d = object.creationHeight) !== null && _d !== void 0 ? _d : 0;
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseEventCancelUndelegation() {
    return { delegator: "", validator: "", creationHeight: 0, stake: undefined };
}
export const EventCancelUndelegation = {
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
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCancelUndelegation();
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
                    message.stake = Stake.decode(reader, reader.uint32());
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
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventCancelUndelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.creationHeight = (_c = object.creationHeight) !== null && _c !== void 0 ? _c : 0;
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseEventEmission() {
    return { amount: "" };
}
export const EventEmission = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.amount !== "") {
            writer.uint32(10).string(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventEmission();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { amount: isSet(object.amount) ? String(object.amount) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.amount !== undefined && (obj.amount = message.amount);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventEmission();
        message.amount = (_a = object.amount) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseEventPayRewards() {
    return { validators: [] };
}
export const EventPayRewards = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validators) {
            ValidatorReward.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventPayRewards();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(ValidatorReward.decode(reader, reader.uint32()));
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
            validators: Array.isArray(object === null || object === void 0 ? void 0 : object.validators)
                ? object.validators.map((e) => ValidatorReward.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => e ? ValidatorReward.toJSON(e) : undefined);
        }
        else {
            obj.validators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventPayRewards();
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => ValidatorReward.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEventSlash() {
    return { validator: "", delegators: [] };
}
export const EventSlash = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        for (const v of message.delegators) {
            DelegatorSlash.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSlash();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.delegators.push(DelegatorSlash.decode(reader, reader.uint32()));
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
            validator: isSet(object.validator) ? String(object.validator) : "",
            delegators: Array.isArray(object === null || object === void 0 ? void 0 : object.delegators)
                ? object.delegators.map((e) => DelegatorSlash.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        if (message.delegators) {
            obj.delegators = message.delegators.map((e) => e ? DelegatorSlash.toJSON(e) : undefined);
        }
        else {
            obj.delegators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventSlash();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        message.delegators = ((_b = object.delegators) === null || _b === void 0 ? void 0 : _b.map((e) => DelegatorSlash.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEventLiveness() {
    return { validator: "", consensusPubkey: "", missedBlocks: 0 };
}
export const EventLiveness = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        if (message.consensusPubkey !== "") {
            writer.uint32(18).string(message.consensusPubkey);
        }
        if (message.missedBlocks !== 0) {
            writer.uint32(24).uint32(message.missedBlocks);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventLiveness();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.consensusPubkey = reader.string();
                    break;
                case 3:
                    message.missedBlocks = reader.uint32();
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
            validator: isSet(object.validator) ? String(object.validator) : "",
            consensusPubkey: isSet(object.consensusPubkey) ? String(object.consensusPubkey) : "",
            missedBlocks: isSet(object.missedBlocks) ? Number(object.missedBlocks) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        message.consensusPubkey !== undefined && (obj.consensusPubkey = message.consensusPubkey);
        message.missedBlocks !== undefined && (obj.missedBlocks = Math.round(message.missedBlocks));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventLiveness();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        message.consensusPubkey = (_b = object.consensusPubkey) !== null && _b !== void 0 ? _b : "";
        message.missedBlocks = (_c = object.missedBlocks) !== null && _c !== void 0 ? _c : 0;
        return message;
    },
};
function createBaseValidatorReward() {
    return { validator: "", dao: "", develop: "", commission: "", accumulated: "", delegators: [] };
}
export const ValidatorReward = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        if (message.dao !== "") {
            writer.uint32(18).string(message.dao);
        }
        if (message.develop !== "") {
            writer.uint32(26).string(message.develop);
        }
        if (message.commission !== "") {
            writer.uint32(34).string(message.commission);
        }
        if (message.accumulated !== "") {
            writer.uint32(42).string(message.accumulated);
        }
        for (const v of message.delegators) {
            DelegatorReward.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorReward();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 2:
                    message.dao = reader.string();
                    break;
                case 3:
                    message.develop = reader.string();
                    break;
                case 4:
                    message.commission = reader.string();
                    break;
                case 5:
                    message.accumulated = reader.string();
                    break;
                case 6:
                    message.delegators.push(DelegatorReward.decode(reader, reader.uint32()));
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
            validator: isSet(object.validator) ? String(object.validator) : "",
            dao: isSet(object.dao) ? String(object.dao) : "",
            develop: isSet(object.develop) ? String(object.develop) : "",
            commission: isSet(object.commission) ? String(object.commission) : "",
            accumulated: isSet(object.accumulated) ? String(object.accumulated) : "",
            delegators: Array.isArray(object === null || object === void 0 ? void 0 : object.delegators)
                ? object.delegators.map((e) => DelegatorReward.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        message.dao !== undefined && (obj.dao = message.dao);
        message.develop !== undefined && (obj.develop = message.develop);
        message.commission !== undefined && (obj.commission = message.commission);
        message.accumulated !== undefined && (obj.accumulated = message.accumulated);
        if (message.delegators) {
            obj.delegators = message.delegators.map((e) => e ? DelegatorReward.toJSON(e) : undefined);
        }
        else {
            obj.delegators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseValidatorReward();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        message.dao = (_b = object.dao) !== null && _b !== void 0 ? _b : "";
        message.develop = (_c = object.develop) !== null && _c !== void 0 ? _c : "";
        message.commission = (_d = object.commission) !== null && _d !== void 0 ? _d : "";
        message.accumulated = (_e = object.accumulated) !== null && _e !== void 0 ? _e : "";
        message.delegators = ((_f = object.delegators) === null || _f === void 0 ? void 0 : _f.map((e) => DelegatorReward.fromPartial(e))) || [];
        return message;
    },
};
function createBaseDelegatorReward() {
    return { delegator: "", amount: "" };
}
export const DelegatorReward = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.amount !== "") {
            writer.uint32(18).string(message.amount);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegatorReward();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.amount = reader.string();
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
            amount: isSet(object.amount) ? String(object.amount) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.amount !== undefined && (obj.amount = message.amount);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseDelegatorReward();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.amount = (_b = object.amount) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseValidatorSlash() {
    return { validator: "", delegators: [] };
}
export const ValidatorSlash = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validator !== "") {
            writer.uint32(10).string(message.validator);
        }
        for (const v of message.delegators) {
            DelegatorSlash.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSlash();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = reader.string();
                    break;
                case 6:
                    message.delegators.push(DelegatorSlash.decode(reader, reader.uint32()));
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
            validator: isSet(object.validator) ? String(object.validator) : "",
            delegators: Array.isArray(object === null || object === void 0 ? void 0 : object.delegators)
                ? object.delegators.map((e) => DelegatorSlash.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined && (obj.validator = message.validator);
        if (message.delegators) {
            obj.delegators = message.delegators.map((e) => e ? DelegatorSlash.toJSON(e) : undefined);
        }
        else {
            obj.delegators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseValidatorSlash();
        message.validator = (_a = object.validator) !== null && _a !== void 0 ? _a : "";
        message.delegators = ((_b = object.delegators) === null || _b === void 0 ? void 0 : _b.map((e) => DelegatorSlash.fromPartial(e))) || [];
        return message;
    },
};
function createBaseDelegatorSlash() {
    return { delegator: "", coins: [], nfts: [] };
}
export const DelegatorSlash = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        for (const v of message.coins) {
            SlashCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.nfts) {
            SlashNFT.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegatorSlash();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.coins.push(SlashCoin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.nfts.push(SlashNFT.decode(reader, reader.uint32()));
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
            coins: Array.isArray(object === null || object === void 0 ? void 0 : object.coins) ? object.coins.map((e) => SlashCoin.fromJSON(e)) : [],
            nfts: Array.isArray(object === null || object === void 0 ? void 0 : object.nfts) ? object.nfts.map((e) => SlashNFT.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        if (message.coins) {
            obj.coins = message.coins.map((e) => e ? SlashCoin.toJSON(e) : undefined);
        }
        else {
            obj.coins = [];
        }
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => e ? SlashNFT.toJSON(e) : undefined);
        }
        else {
            obj.nfts = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseDelegatorSlash();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => SlashCoin.fromPartial(e))) || [];
        message.nfts = ((_c = object.nfts) === null || _c === void 0 ? void 0 : _c.map((e) => SlashNFT.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSlashCoin() {
    return { slash: undefined };
}
export const SlashCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.slash !== undefined) {
            Coin.encode(message.slash, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSlashCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.slash = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { slash: isSet(object.slash) ? Coin.fromJSON(object.slash) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.slash !== undefined && (obj.slash = message.slash ? Coin.toJSON(message.slash) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseSlashCoin();
        message.slash = (object.slash !== undefined && object.slash !== null) ? Coin.fromPartial(object.slash) : undefined;
        return message;
    },
};
function createBaseSlashNFT() {
    return { tokenId: "", subTokens: [] };
}
export const SlashNFT = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tokenId !== "") {
            writer.uint32(10).string(message.tokenId);
        }
        for (const v of message.subTokens) {
            SlashNFTSubtoken.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSlashNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tokenId = reader.string();
                    break;
                case 2:
                    message.subTokens.push(SlashNFTSubtoken.decode(reader, reader.uint32()));
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
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokens: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokens) ? object.subTokens.map((e) => SlashNFTSubtoken.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokens) {
            obj.subTokens = message.subTokens.map((e) => e ? SlashNFTSubtoken.toJSON(e) : undefined);
        }
        else {
            obj.subTokens = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseSlashNFT();
        message.tokenId = (_a = object.tokenId) !== null && _a !== void 0 ? _a : "";
        message.subTokens = ((_b = object.subTokens) === null || _b === void 0 ? void 0 : _b.map((e) => SlashNFTSubtoken.fromPartial(e))) || [];
        return message;
    },
};
function createBaseSlashNFTSubtoken() {
    return { id: 0, slash: undefined, reserve: undefined };
}
export const SlashNFTSubtoken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.slash !== undefined) {
            Coin.encode(message.slash, writer.uint32(18).fork()).ldelim();
        }
        if (message.reserve !== undefined) {
            Coin.encode(message.reserve, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSlashNFTSubtoken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.slash = Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.reserve = Coin.decode(reader, reader.uint32());
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
            id: isSet(object.id) ? Number(object.id) : 0,
            slash: isSet(object.slash) ? Coin.fromJSON(object.slash) : undefined,
            reserve: isSet(object.reserve) ? Coin.fromJSON(object.reserve) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.slash !== undefined && (obj.slash = message.slash ? Coin.toJSON(message.slash) : undefined);
        message.reserve !== undefined && (obj.reserve = message.reserve ? Coin.toJSON(message.reserve) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseSlashNFTSubtoken();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : 0;
        message.slash = (object.slash !== undefined && object.slash !== null) ? Coin.fromPartial(object.slash) : undefined;
        message.reserve = (object.reserve !== undefined && object.reserve !== null)
            ? Coin.fromPartial(object.reserve)
            : undefined;
        return message;
    },
};
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
//# sourceMappingURL=events.js.map