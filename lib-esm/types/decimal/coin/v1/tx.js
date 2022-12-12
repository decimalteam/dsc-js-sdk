/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.coin.v1";
function createBaseMsgCreateCoin() {
    return {
        sender: "",
        denom: "",
        title: "",
        crr: 0,
        initialVolume: "",
        initialReserve: "",
        limitVolume: "",
        identity: "",
    };
}
export const MsgCreateCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        if (message.title !== "") {
            writer.uint32(26).string(message.title);
        }
        if (message.crr !== 0) {
            writer.uint32(32).uint32(message.crr);
        }
        if (message.initialVolume !== "") {
            writer.uint32(42).string(message.initialVolume);
        }
        if (message.initialReserve !== "") {
            writer.uint32(50).string(message.initialReserve);
        }
        if (message.limitVolume !== "") {
            writer.uint32(58).string(message.limitVolume);
        }
        if (message.identity !== "") {
            writer.uint32(66).string(message.identity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.title = reader.string();
                    break;
                case 4:
                    message.crr = reader.uint32();
                    break;
                case 5:
                    message.initialVolume = reader.string();
                    break;
                case 6:
                    message.initialReserve = reader.string();
                    break;
                case 7:
                    message.limitVolume = reader.string();
                    break;
                case 8:
                    message.identity = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            title: isSet(object.title) ? String(object.title) : "",
            crr: isSet(object.crr) ? Number(object.crr) : 0,
            initialVolume: isSet(object.initialVolume) ? String(object.initialVolume) : "",
            initialReserve: isSet(object.initialReserve) ? String(object.initialReserve) : "",
            limitVolume: isSet(object.limitVolume) ? String(object.limitVolume) : "",
            identity: isSet(object.identity) ? String(object.identity) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.denom !== undefined && (obj.denom = message.denom);
        message.title !== undefined && (obj.title = message.title);
        message.crr !== undefined && (obj.crr = Math.round(message.crr));
        message.initialVolume !== undefined && (obj.initialVolume = message.initialVolume);
        message.initialReserve !== undefined && (obj.initialReserve = message.initialReserve);
        message.limitVolume !== undefined && (obj.limitVolume = message.limitVolume);
        message.identity !== undefined && (obj.identity = message.identity);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseMsgCreateCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.title = (_c = object.title) !== null && _c !== void 0 ? _c : "";
        message.crr = (_d = object.crr) !== null && _d !== void 0 ? _d : 0;
        message.initialVolume = (_e = object.initialVolume) !== null && _e !== void 0 ? _e : "";
        message.initialReserve = (_f = object.initialReserve) !== null && _f !== void 0 ? _f : "";
        message.limitVolume = (_g = object.limitVolume) !== null && _g !== void 0 ? _g : "";
        message.identity = (_h = object.identity) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseMsgCreateCoinResponse() {
    return {};
}
export const MsgCreateCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCoinResponse();
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
        const message = createBaseMsgCreateCoinResponse();
        return message;
    },
};
function createBaseMsgUpdateCoin() {
    return { sender: "", denom: "", limitVolume: "", identity: "" };
}
export const MsgUpdateCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        if (message.limitVolume !== "") {
            writer.uint32(26).string(message.limitVolume);
        }
        if (message.identity !== "") {
            writer.uint32(34).string(message.identity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.limitVolume = reader.string();
                    break;
                case 4:
                    message.identity = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            limitVolume: isSet(object.limitVolume) ? String(object.limitVolume) : "",
            identity: isSet(object.identity) ? String(object.identity) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.denom !== undefined && (obj.denom = message.denom);
        message.limitVolume !== undefined && (obj.limitVolume = message.limitVolume);
        message.identity !== undefined && (obj.identity = message.identity);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgUpdateCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.limitVolume = (_c = object.limitVolume) !== null && _c !== void 0 ? _c : "";
        message.identity = (_d = object.identity) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseMsgUpdateCoinResponse() {
    return {};
}
export const MsgUpdateCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCoinResponse();
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
        const message = createBaseMsgUpdateCoinResponse();
        return message;
    },
};
function createBaseMsgSendCoin() {
    return { sender: "", recipient: "", coin: undefined };
}
export const MsgSendCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.recipient !== "") {
            writer.uint32(18).string(message.recipient);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.recipient = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgSendCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.recipient = (_b = object.recipient) !== null && _b !== void 0 ? _b : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgSendCoinResponse() {
    return {};
}
export const MsgSendCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendCoinResponse();
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
        const message = createBaseMsgSendCoinResponse();
        return message;
    },
};
function createBaseMultiSendEntry() {
    return { recipient: "", coin: undefined };
}
export const MultiSendEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.recipient !== "") {
            writer.uint32(10).string(message.recipient);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMultiSendEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.recipient = reader.string();
                    break;
                case 2:
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
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMultiSendEntry();
        message.recipient = (_a = object.recipient) !== null && _a !== void 0 ? _a : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgMultiSendCoin() {
    return { sender: "", sends: [] };
}
export const MsgMultiSendCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        for (const v of message.sends) {
            MultiSendEntry.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSendCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.sends.push(MultiSendEntry.decode(reader, reader.uint32()));
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
            sends: Array.isArray(object === null || object === void 0 ? void 0 : object.sends) ? object.sends.map((e) => MultiSendEntry.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        if (message.sends) {
            obj.sends = message.sends.map((e) => e ? MultiSendEntry.toJSON(e) : undefined);
        }
        else {
            obj.sends = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgMultiSendCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.sends = ((_b = object.sends) === null || _b === void 0 ? void 0 : _b.map((e) => MultiSendEntry.fromPartial(e))) || [];
        return message;
    },
};
function createBaseMsgMultiSendCoinResponse() {
    return {};
}
export const MsgMultiSendCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMultiSendCoinResponse();
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
        const message = createBaseMsgMultiSendCoinResponse();
        return message;
    },
};
function createBaseMsgBuyCoin() {
    return { sender: "", coinToBuy: undefined, maxCoinToSell: undefined };
}
export const MsgBuyCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coinToBuy !== undefined) {
            Coin.encode(message.coinToBuy, writer.uint32(18).fork()).ldelim();
        }
        if (message.maxCoinToSell !== undefined) {
            Coin.encode(message.maxCoinToSell, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBuyCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.coinToBuy = Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.maxCoinToSell = Coin.decode(reader, reader.uint32());
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
            coinToBuy: isSet(object.coinToBuy) ? Coin.fromJSON(object.coinToBuy) : undefined,
            maxCoinToSell: isSet(object.maxCoinToSell) ? Coin.fromJSON(object.maxCoinToSell) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coinToBuy !== undefined && (obj.coinToBuy = message.coinToBuy ? Coin.toJSON(message.coinToBuy) : undefined);
        message.maxCoinToSell !== undefined &&
            (obj.maxCoinToSell = message.maxCoinToSell ? Coin.toJSON(message.maxCoinToSell) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgBuyCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coinToBuy = (object.coinToBuy !== undefined && object.coinToBuy !== null)
            ? Coin.fromPartial(object.coinToBuy)
            : undefined;
        message.maxCoinToSell = (object.maxCoinToSell !== undefined && object.maxCoinToSell !== null)
            ? Coin.fromPartial(object.maxCoinToSell)
            : undefined;
        return message;
    },
};
function createBaseMsgBuyCoinResponse() {
    return {};
}
export const MsgBuyCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBuyCoinResponse();
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
        const message = createBaseMsgBuyCoinResponse();
        return message;
    },
};
function createBaseMsgSellCoin() {
    return { sender: "", coinToSell: undefined, minCoinToBuy: undefined };
}
export const MsgSellCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coinToSell !== undefined) {
            Coin.encode(message.coinToSell, writer.uint32(18).fork()).ldelim();
        }
        if (message.minCoinToBuy !== undefined) {
            Coin.encode(message.minCoinToBuy, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSellCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.coinToSell = Coin.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.minCoinToBuy = Coin.decode(reader, reader.uint32());
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
            coinToSell: isSet(object.coinToSell) ? Coin.fromJSON(object.coinToSell) : undefined,
            minCoinToBuy: isSet(object.minCoinToBuy) ? Coin.fromJSON(object.minCoinToBuy) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coinToSell !== undefined &&
            (obj.coinToSell = message.coinToSell ? Coin.toJSON(message.coinToSell) : undefined);
        message.minCoinToBuy !== undefined &&
            (obj.minCoinToBuy = message.minCoinToBuy ? Coin.toJSON(message.minCoinToBuy) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSellCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coinToSell = (object.coinToSell !== undefined && object.coinToSell !== null)
            ? Coin.fromPartial(object.coinToSell)
            : undefined;
        message.minCoinToBuy = (object.minCoinToBuy !== undefined && object.minCoinToBuy !== null)
            ? Coin.fromPartial(object.minCoinToBuy)
            : undefined;
        return message;
    },
};
function createBaseMsgSellCoinResponse() {
    return {};
}
export const MsgSellCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSellCoinResponse();
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
        const message = createBaseMsgSellCoinResponse();
        return message;
    },
};
function createBaseMsgSellAllCoin() {
    return { sender: "", coinDenomToSell: "", minCoinToBuy: undefined };
}
export const MsgSellAllCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coinDenomToSell !== "") {
            writer.uint32(18).string(message.coinDenomToSell);
        }
        if (message.minCoinToBuy !== undefined) {
            Coin.encode(message.minCoinToBuy, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSellAllCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.coinDenomToSell = reader.string();
                    break;
                case 3:
                    message.minCoinToBuy = Coin.decode(reader, reader.uint32());
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
            coinDenomToSell: isSet(object.coinDenomToSell) ? String(object.coinDenomToSell) : "",
            minCoinToBuy: isSet(object.minCoinToBuy) ? Coin.fromJSON(object.minCoinToBuy) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coinDenomToSell !== undefined && (obj.coinDenomToSell = message.coinDenomToSell);
        message.minCoinToBuy !== undefined &&
            (obj.minCoinToBuy = message.minCoinToBuy ? Coin.toJSON(message.minCoinToBuy) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgSellAllCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coinDenomToSell = (_b = object.coinDenomToSell) !== null && _b !== void 0 ? _b : "";
        message.minCoinToBuy = (object.minCoinToBuy !== undefined && object.minCoinToBuy !== null)
            ? Coin.fromPartial(object.minCoinToBuy)
            : undefined;
        return message;
    },
};
function createBaseMsgSellAllCoinResponse() {
    return {};
}
export const MsgSellAllCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSellAllCoinResponse();
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
        const message = createBaseMsgSellAllCoinResponse();
        return message;
    },
};
function createBaseMsgBurnCoin() {
    return { sender: "", coin: undefined };
}
export const MsgBurnCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coin !== undefined) {
            Coin.encode(message.coin, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBurnCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            coin: isSet(object.coin) ? Coin.fromJSON(object.coin) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgBurnCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin.fromPartial(object.coin) : undefined;
        return message;
    },
};
function createBaseMsgBurnCoinResponse() {
    return {};
}
export const MsgBurnCoinResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBurnCoinResponse();
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
        const message = createBaseMsgBurnCoinResponse();
        return message;
    },
};
function createBaseMsgRedeemCheck() {
    return { sender: "", check: "", proof: "" };
}
export const MsgRedeemCheck = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.check !== "") {
            writer.uint32(18).string(message.check);
        }
        if (message.proof !== "") {
            writer.uint32(26).string(message.proof);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedeemCheck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.check = reader.string();
                    break;
                case 3:
                    message.proof = reader.string();
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
            check: isSet(object.check) ? String(object.check) : "",
            proof: isSet(object.proof) ? String(object.proof) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.check !== undefined && (obj.check = message.check);
        message.proof !== undefined && (obj.proof = message.proof);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgRedeemCheck();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.check = (_b = object.check) !== null && _b !== void 0 ? _b : "";
        message.proof = (_c = object.proof) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgRedeemCheckResponse() {
    return {};
}
export const MsgRedeemCheckResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedeemCheckResponse();
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
        const message = createBaseMsgRedeemCheckResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateCoin = this.CreateCoin.bind(this);
        this.UpdateCoin = this.UpdateCoin.bind(this);
        this.SendCoin = this.SendCoin.bind(this);
        this.MultiSendCoin = this.MultiSendCoin.bind(this);
        this.BuyCoin = this.BuyCoin.bind(this);
        this.SellCoin = this.SellCoin.bind(this);
        this.SellAllCoin = this.SellAllCoin.bind(this);
        this.BurnCoin = this.BurnCoin.bind(this);
        this.RedeemCheck = this.RedeemCheck.bind(this);
    }
    CreateCoin(request) {
        const data = MsgCreateCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "CreateCoin", data);
        return promise.then((data) => MsgCreateCoinResponse.decode(new _m0.Reader(data)));
    }
    UpdateCoin(request) {
        const data = MsgUpdateCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "UpdateCoin", data);
        return promise.then((data) => MsgUpdateCoinResponse.decode(new _m0.Reader(data)));
    }
    SendCoin(request) {
        const data = MsgSendCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "SendCoin", data);
        return promise.then((data) => MsgSendCoinResponse.decode(new _m0.Reader(data)));
    }
    MultiSendCoin(request) {
        const data = MsgMultiSendCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "MultiSendCoin", data);
        return promise.then((data) => MsgMultiSendCoinResponse.decode(new _m0.Reader(data)));
    }
    BuyCoin(request) {
        const data = MsgBuyCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "BuyCoin", data);
        return promise.then((data) => MsgBuyCoinResponse.decode(new _m0.Reader(data)));
    }
    SellCoin(request) {
        const data = MsgSellCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "SellCoin", data);
        return promise.then((data) => MsgSellCoinResponse.decode(new _m0.Reader(data)));
    }
    SellAllCoin(request) {
        const data = MsgSellAllCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "SellAllCoin", data);
        return promise.then((data) => MsgSellAllCoinResponse.decode(new _m0.Reader(data)));
    }
    BurnCoin(request) {
        const data = MsgBurnCoin.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "BurnCoin", data);
        return promise.then((data) => MsgBurnCoinResponse.decode(new _m0.Reader(data)));
    }
    RedeemCheck(request) {
        const data = MsgRedeemCheck.encode(request).finish();
        const promise = this.rpc.request("decimal.coin.v1.Msg", "RedeemCheck", data);
        return promise.then((data) => MsgRedeemCheckResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map