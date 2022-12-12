/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin as Coin1 } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.coin.v1";
function createBaseCoin() {
    return { denom: "", title: "", creator: "", crr: 0, limitVolume: "", identity: "", volume: "", reserve: "" };
}
export const Coin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.title !== "") {
            writer.uint32(18).string(message.title);
        }
        if (message.creator !== "") {
            writer.uint32(26).string(message.creator);
        }
        if (message.crr !== 0) {
            writer.uint32(32).uint32(message.crr);
        }
        if (message.limitVolume !== "") {
            writer.uint32(42).string(message.limitVolume);
        }
        if (message.identity !== "") {
            writer.uint32(50).string(message.identity);
        }
        if (message.volume !== "") {
            writer.uint32(58).string(message.volume);
        }
        if (message.reserve !== "") {
            writer.uint32(66).string(message.reserve);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCoin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.creator = reader.string();
                    break;
                case 4:
                    message.crr = reader.uint32();
                    break;
                case 5:
                    message.limitVolume = reader.string();
                    break;
                case 6:
                    message.identity = reader.string();
                    break;
                case 7:
                    message.volume = reader.string();
                    break;
                case 8:
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
            title: isSet(object.title) ? String(object.title) : "",
            creator: isSet(object.creator) ? String(object.creator) : "",
            crr: isSet(object.crr) ? Number(object.crr) : 0,
            limitVolume: isSet(object.limitVolume) ? String(object.limitVolume) : "",
            identity: isSet(object.identity) ? String(object.identity) : "",
            volume: isSet(object.volume) ? String(object.volume) : "",
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.title !== undefined && (obj.title = message.title);
        message.creator !== undefined && (obj.creator = message.creator);
        message.crr !== undefined && (obj.crr = Math.round(message.crr));
        message.limitVolume !== undefined && (obj.limitVolume = message.limitVolume);
        message.identity !== undefined && (obj.identity = message.identity);
        message.volume !== undefined && (obj.volume = message.volume);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseCoin();
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.title = (_b = object.title) !== null && _b !== void 0 ? _b : "";
        message.creator = (_c = object.creator) !== null && _c !== void 0 ? _c : "";
        message.crr = (_d = object.crr) !== null && _d !== void 0 ? _d : 0;
        message.limitVolume = (_e = object.limitVolume) !== null && _e !== void 0 ? _e : "";
        message.identity = (_f = object.identity) !== null && _f !== void 0 ? _f : "";
        message.volume = (_g = object.volume) !== null && _g !== void 0 ? _g : "";
        message.reserve = (_h = object.reserve) !== null && _h !== void 0 ? _h : "";
        return message;
    },
};
function createBaseCheck() {
    return {
        chainId: "",
        coin: undefined,
        nonce: new Uint8Array(),
        dueBlock: 0,
        lock: new Uint8Array(),
        v: "",
        r: "",
        s: "",
    };
}
export const Check = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.chainId !== "") {
            writer.uint32(10).string(message.chainId);
        }
        if (message.coin !== undefined) {
            Coin1.encode(message.coin, writer.uint32(18).fork()).ldelim();
        }
        if (message.nonce.length !== 0) {
            writer.uint32(26).bytes(message.nonce);
        }
        if (message.dueBlock !== 0) {
            writer.uint32(32).uint64(message.dueBlock);
        }
        if (message.lock.length !== 0) {
            writer.uint32(42).bytes(message.lock);
        }
        if (message.v !== "") {
            writer.uint32(50).string(message.v);
        }
        if (message.r !== "") {
            writer.uint32(58).string(message.r);
        }
        if (message.s !== "") {
            writer.uint32(66).string(message.s);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCheck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.string();
                    break;
                case 2:
                    message.coin = Coin1.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.nonce = reader.bytes();
                    break;
                case 4:
                    message.dueBlock = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.lock = reader.bytes();
                    break;
                case 6:
                    message.v = reader.string();
                    break;
                case 7:
                    message.r = reader.string();
                    break;
                case 8:
                    message.s = reader.string();
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
            chainId: isSet(object.chainId) ? String(object.chainId) : "",
            coin: isSet(object.coin) ? Coin1.fromJSON(object.coin) : undefined,
            nonce: isSet(object.nonce) ? bytesFromBase64(object.nonce) : new Uint8Array(),
            dueBlock: isSet(object.dueBlock) ? Number(object.dueBlock) : 0,
            lock: isSet(object.lock) ? bytesFromBase64(object.lock) : new Uint8Array(),
            v: isSet(object.v) ? String(object.v) : "",
            r: isSet(object.r) ? String(object.r) : "",
            s: isSet(object.s) ? String(object.s) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.coin !== undefined && (obj.coin = message.coin ? Coin1.toJSON(message.coin) : undefined);
        message.nonce !== undefined &&
            (obj.nonce = base64FromBytes(message.nonce !== undefined ? message.nonce : new Uint8Array()));
        message.dueBlock !== undefined && (obj.dueBlock = Math.round(message.dueBlock));
        message.lock !== undefined &&
            (obj.lock = base64FromBytes(message.lock !== undefined ? message.lock : new Uint8Array()));
        message.v !== undefined && (obj.v = message.v);
        message.r !== undefined && (obj.r = message.r);
        message.s !== undefined && (obj.s = message.s);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseCheck();
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        message.coin = (object.coin !== undefined && object.coin !== null) ? Coin1.fromPartial(object.coin) : undefined;
        message.nonce = (_b = object.nonce) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.dueBlock = (_c = object.dueBlock) !== null && _c !== void 0 ? _c : 0;
        message.lock = (_d = object.lock) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.v = (_e = object.v) !== null && _e !== void 0 ? _e : "";
        message.r = (_f = object.r) !== null && _f !== void 0 ? _f : "";
        message.s = (_g = object.s) !== null && _g !== void 0 ? _g : "";
        return message;
    },
};
function createBaseCoinVR() {
    return { volume: "", reserve: "" };
}
export const CoinVR = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.volume !== "") {
            writer.uint32(10).string(message.volume);
        }
        if (message.reserve !== "") {
            writer.uint32(18).string(message.reserve);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCoinVR();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.volume = reader.string();
                    break;
                case 2:
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
            volume: isSet(object.volume) ? String(object.volume) : "",
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.volume !== undefined && (obj.volume = message.volume);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseCoinVR();
        message.volume = (_a = object.volume) !== null && _a !== void 0 ? _a : "";
        message.reserve = (_b = object.reserve) !== null && _b !== void 0 ? _b : "";
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
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
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
//# sourceMappingURL=coin.js.map