/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.coin.v1";
function createBaseEventCreateCoin() {
    return {
        sender: "",
        denom: "",
        title: "",
        crr: 0,
        initialVolume: "",
        initialReserve: "",
        limitVolume: "",
        identity: "",
        commissionCreateCoin: "",
    };
}
export const EventCreateCoin = {
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
        if (message.commissionCreateCoin !== "") {
            writer.uint32(74).string(message.commissionCreateCoin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateCoin();
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
                case 9:
                    message.commissionCreateCoin = reader.string();
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
            commissionCreateCoin: isSet(object.commissionCreateCoin) ? String(object.commissionCreateCoin) : "",
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
        message.commissionCreateCoin !== undefined && (obj.commissionCreateCoin = message.commissionCreateCoin);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const message = createBaseEventCreateCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.title = (_c = object.title) !== null && _c !== void 0 ? _c : "";
        message.crr = (_d = object.crr) !== null && _d !== void 0 ? _d : 0;
        message.initialVolume = (_e = object.initialVolume) !== null && _e !== void 0 ? _e : "";
        message.initialReserve = (_f = object.initialReserve) !== null && _f !== void 0 ? _f : "";
        message.limitVolume = (_g = object.limitVolume) !== null && _g !== void 0 ? _g : "";
        message.identity = (_h = object.identity) !== null && _h !== void 0 ? _h : "";
        message.commissionCreateCoin = (_j = object.commissionCreateCoin) !== null && _j !== void 0 ? _j : "";
        return message;
    },
};
function createBaseEventUpdateCoin() {
    return { sender: "", denom: "", limitVolume: "", identity: "" };
}
export const EventUpdateCoin = {
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
        const message = createBaseEventUpdateCoin();
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
        const message = createBaseEventUpdateCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.limitVolume = (_c = object.limitVolume) !== null && _c !== void 0 ? _c : "";
        message.identity = (_d = object.identity) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseEventUpdateCoinVR() {
    return { denom: "", volume: "", reserve: "" };
}
export const EventUpdateCoinVR = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.volume !== "") {
            writer.uint32(18).string(message.volume);
        }
        if (message.reserve !== "") {
            writer.uint32(26).string(message.reserve);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateCoinVR();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.volume = reader.string();
                    break;
                case 3:
                    message.reserve = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            volume: isSet(object.volume) ? String(object.volume) : "",
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.volume !== undefined && (obj.volume = message.volume);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventUpdateCoinVR();
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.volume = (_b = object.volume) !== null && _b !== void 0 ? _b : "";
        message.reserve = (_c = object.reserve) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventSendCoin() {
    return { sender: "", recipient: "", coin: "" };
}
export const EventSendCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.recipient !== "") {
            writer.uint32(18).string(message.recipient);
        }
        if (message.coin !== "") {
            writer.uint32(26).string(message.coin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSendCoin();
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
                    message.coin = reader.string();
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
            coin: isSet(object.coin) ? String(object.coin) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.coin !== undefined && (obj.coin = message.coin);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventSendCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.recipient = (_b = object.recipient) !== null && _b !== void 0 ? _b : "";
        message.coin = (_c = object.coin) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventBuySellCoin() {
    return { sender: "", coinToBuy: "", coinToSell: "", amountInBaseCoin: "" };
}
export const EventBuySellCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coinToBuy !== "") {
            writer.uint32(18).string(message.coinToBuy);
        }
        if (message.coinToSell !== "") {
            writer.uint32(26).string(message.coinToSell);
        }
        if (message.amountInBaseCoin !== "") {
            writer.uint32(34).string(message.amountInBaseCoin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventBuySellCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.coinToBuy = reader.string();
                    break;
                case 3:
                    message.coinToSell = reader.string();
                    break;
                case 4:
                    message.amountInBaseCoin = reader.string();
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
            coinToBuy: isSet(object.coinToBuy) ? String(object.coinToBuy) : "",
            coinToSell: isSet(object.coinToSell) ? String(object.coinToSell) : "",
            amountInBaseCoin: isSet(object.amountInBaseCoin) ? String(object.amountInBaseCoin) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coinToBuy !== undefined && (obj.coinToBuy = message.coinToBuy);
        message.coinToSell !== undefined && (obj.coinToSell = message.coinToSell);
        message.amountInBaseCoin !== undefined && (obj.amountInBaseCoin = message.amountInBaseCoin);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEventBuySellCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coinToBuy = (_b = object.coinToBuy) !== null && _b !== void 0 ? _b : "";
        message.coinToSell = (_c = object.coinToSell) !== null && _c !== void 0 ? _c : "";
        message.amountInBaseCoin = (_d = object.amountInBaseCoin) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseEventBurnCoin() {
    return { sender: "", coin: "" };
}
export const EventBurnCoin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.coin !== "") {
            writer.uint32(18).string(message.coin);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventBurnCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.coin = reader.string();
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
            coin: isSet(object.coin) ? String(object.coin) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.coin !== undefined && (obj.coin = message.coin);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventBurnCoin();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.coin = (_b = object.coin) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventRedeemCheck() {
    return { sender: "", issuer: "", coin: "", nonce: "", dueBlock: "", commissionRedeemCheck: "" };
}
export const EventRedeemCheck = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.issuer !== "") {
            writer.uint32(18).string(message.issuer);
        }
        if (message.coin !== "") {
            writer.uint32(26).string(message.coin);
        }
        if (message.nonce !== "") {
            writer.uint32(34).string(message.nonce);
        }
        if (message.dueBlock !== "") {
            writer.uint32(42).string(message.dueBlock);
        }
        if (message.commissionRedeemCheck !== "") {
            writer.uint32(50).string(message.commissionRedeemCheck);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventRedeemCheck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.issuer = reader.string();
                    break;
                case 3:
                    message.coin = reader.string();
                    break;
                case 4:
                    message.nonce = reader.string();
                    break;
                case 5:
                    message.dueBlock = reader.string();
                    break;
                case 6:
                    message.commissionRedeemCheck = reader.string();
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
            issuer: isSet(object.issuer) ? String(object.issuer) : "",
            coin: isSet(object.coin) ? String(object.coin) : "",
            nonce: isSet(object.nonce) ? String(object.nonce) : "",
            dueBlock: isSet(object.dueBlock) ? String(object.dueBlock) : "",
            commissionRedeemCheck: isSet(object.commissionRedeemCheck) ? String(object.commissionRedeemCheck) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.issuer !== undefined && (obj.issuer = message.issuer);
        message.coin !== undefined && (obj.coin = message.coin);
        message.nonce !== undefined && (obj.nonce = message.nonce);
        message.dueBlock !== undefined && (obj.dueBlock = message.dueBlock);
        message.commissionRedeemCheck !== undefined && (obj.commissionRedeemCheck = message.commissionRedeemCheck);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseEventRedeemCheck();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.issuer = (_b = object.issuer) !== null && _b !== void 0 ? _b : "";
        message.coin = (_c = object.coin) !== null && _c !== void 0 ? _c : "";
        message.nonce = (_d = object.nonce) !== null && _d !== void 0 ? _d : "";
        message.dueBlock = (_e = object.dueBlock) !== null && _e !== void 0 ? _e : "";
        message.commissionRedeemCheck = (_f = object.commissionRedeemCheck) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=events.js.map