/* eslint-disable */
import { Any } from "../../../google/protobuf/any";
import Long from "long";
import { AccessTuple, Log } from "./evm";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "ethermint.evm.v1";
function createBaseMsgEthereumTx() {
    return { data: undefined, size: 0, hash: "", from: "" };
}
export const MsgEthereumTx = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data !== undefined) {
            Any.encode(message.data, writer.uint32(10).fork()).ldelim();
        }
        if (message.size !== 0) {
            writer.uint32(17).double(message.size);
        }
        if (message.hash !== "") {
            writer.uint32(26).string(message.hash);
        }
        if (message.from !== "") {
            writer.uint32(34).string(message.from);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEthereumTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.size = reader.double();
                    break;
                case 3:
                    message.hash = reader.string();
                    break;
                case 4:
                    message.from = reader.string();
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
            data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
            size: isSet(object.size) ? Number(object.size) : 0,
            hash: isSet(object.hash) ? String(object.hash) : "",
            from: isSet(object.from) ? String(object.from) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = message.data ? Any.toJSON(message.data) : undefined);
        message.size !== undefined && (obj.size = message.size);
        message.hash !== undefined && (obj.hash = message.hash);
        message.from !== undefined && (obj.from = message.from);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgEthereumTx();
        message.data =
            object.data !== undefined && object.data !== null
                ? Any.fromPartial(object.data)
                : undefined;
        message.size = (_a = object.size) !== null && _a !== void 0 ? _a : 0;
        message.hash = (_b = object.hash) !== null && _b !== void 0 ? _b : "";
        message.from = (_c = object.from) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseLegacyTx() {
    return {
        nonce: Long.UZERO,
        gasPrice: "",
        gas: Long.UZERO,
        to: "",
        value: "",
        data: new Uint8Array(),
        v: new Uint8Array(),
        r: new Uint8Array(),
        s: new Uint8Array(),
    };
}
export const LegacyTx = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.nonce.isZero()) {
            writer.uint32(8).uint64(message.nonce);
        }
        if (message.gasPrice !== "") {
            writer.uint32(18).string(message.gasPrice);
        }
        if (!message.gas.isZero()) {
            writer.uint32(24).uint64(message.gas);
        }
        if (message.to !== "") {
            writer.uint32(34).string(message.to);
        }
        if (message.value !== "") {
            writer.uint32(42).string(message.value);
        }
        if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
        }
        if (message.v.length !== 0) {
            writer.uint32(58).bytes(message.v);
        }
        if (message.r.length !== 0) {
            writer.uint32(66).bytes(message.r);
        }
        if (message.s.length !== 0) {
            writer.uint32(74).bytes(message.s);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLegacyTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nonce = reader.uint64();
                    break;
                case 2:
                    message.gasPrice = reader.string();
                    break;
                case 3:
                    message.gas = reader.uint64();
                    break;
                case 4:
                    message.to = reader.string();
                    break;
                case 5:
                    message.value = reader.string();
                    break;
                case 6:
                    message.data = reader.bytes();
                    break;
                case 7:
                    message.v = reader.bytes();
                    break;
                case 8:
                    message.r = reader.bytes();
                    break;
                case 9:
                    message.s = reader.bytes();
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
            nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
            gasPrice: isSet(object.gasPrice) ? String(object.gasPrice) : "",
            gas: isSet(object.gas) ? Long.fromValue(object.gas) : Long.UZERO,
            to: isSet(object.to) ? String(object.to) : "",
            value: isSet(object.value) ? String(object.value) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            v: isSet(object.v) ? bytesFromBase64(object.v) : new Uint8Array(),
            r: isSet(object.r) ? bytesFromBase64(object.r) : new Uint8Array(),
            s: isSet(object.s) ? bytesFromBase64(object.s) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || Long.UZERO).toString());
        message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
        message.gas !== undefined &&
            (obj.gas = (message.gas || Long.UZERO).toString());
        message.to !== undefined && (obj.to = message.to);
        message.value !== undefined && (obj.value = message.value);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.v !== undefined &&
            (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
        message.r !== undefined &&
            (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
        message.s !== undefined &&
            (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseLegacyTx();
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? Long.fromValue(object.nonce)
                : Long.UZERO;
        message.gasPrice = (_a = object.gasPrice) !== null && _a !== void 0 ? _a : "";
        message.gas =
            object.gas !== undefined && object.gas !== null
                ? Long.fromValue(object.gas)
                : Long.UZERO;
        message.to = (_b = object.to) !== null && _b !== void 0 ? _b : "";
        message.value = (_c = object.value) !== null && _c !== void 0 ? _c : "";
        message.data = (_d = object.data) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.v = (_e = object.v) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.r = (_f = object.r) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.s = (_g = object.s) !== null && _g !== void 0 ? _g : new Uint8Array();
        return message;
    },
};
function createBaseAccessListTx() {
    return {
        chainId: "",
        nonce: Long.UZERO,
        gasPrice: "",
        gas: Long.UZERO,
        to: "",
        value: "",
        data: new Uint8Array(),
        accesses: [],
        v: new Uint8Array(),
        r: new Uint8Array(),
        s: new Uint8Array(),
    };
}
export const AccessListTx = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.chainId !== "") {
            writer.uint32(10).string(message.chainId);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(16).uint64(message.nonce);
        }
        if (message.gasPrice !== "") {
            writer.uint32(26).string(message.gasPrice);
        }
        if (!message.gas.isZero()) {
            writer.uint32(32).uint64(message.gas);
        }
        if (message.to !== "") {
            writer.uint32(42).string(message.to);
        }
        if (message.value !== "") {
            writer.uint32(50).string(message.value);
        }
        if (message.data.length !== 0) {
            writer.uint32(58).bytes(message.data);
        }
        for (const v of message.accesses) {
            AccessTuple.encode(v, writer.uint32(66).fork()).ldelim();
        }
        if (message.v.length !== 0) {
            writer.uint32(74).bytes(message.v);
        }
        if (message.r.length !== 0) {
            writer.uint32(82).bytes(message.r);
        }
        if (message.s.length !== 0) {
            writer.uint32(90).bytes(message.s);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAccessListTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.string();
                    break;
                case 2:
                    message.nonce = reader.uint64();
                    break;
                case 3:
                    message.gasPrice = reader.string();
                    break;
                case 4:
                    message.gas = reader.uint64();
                    break;
                case 5:
                    message.to = reader.string();
                    break;
                case 6:
                    message.value = reader.string();
                    break;
                case 7:
                    message.data = reader.bytes();
                    break;
                case 8:
                    message.accesses.push(AccessTuple.decode(reader, reader.uint32()));
                    break;
                case 9:
                    message.v = reader.bytes();
                    break;
                case 10:
                    message.r = reader.bytes();
                    break;
                case 11:
                    message.s = reader.bytes();
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
            nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
            gasPrice: isSet(object.gasPrice) ? String(object.gasPrice) : "",
            gas: isSet(object.gas) ? Long.fromValue(object.gas) : Long.UZERO,
            to: isSet(object.to) ? String(object.to) : "",
            value: isSet(object.value) ? String(object.value) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            accesses: Array.isArray(object === null || object === void 0 ? void 0 : object.accesses)
                ? object.accesses.map((e) => AccessTuple.fromJSON(e))
                : [],
            v: isSet(object.v) ? bytesFromBase64(object.v) : new Uint8Array(),
            r: isSet(object.r) ? bytesFromBase64(object.r) : new Uint8Array(),
            s: isSet(object.s) ? bytesFromBase64(object.s) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || Long.UZERO).toString());
        message.gasPrice !== undefined && (obj.gasPrice = message.gasPrice);
        message.gas !== undefined &&
            (obj.gas = (message.gas || Long.UZERO).toString());
        message.to !== undefined && (obj.to = message.to);
        message.value !== undefined && (obj.value = message.value);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        if (message.accesses) {
            obj.accesses = message.accesses.map((e) => e ? AccessTuple.toJSON(e) : undefined);
        }
        else {
            obj.accesses = [];
        }
        message.v !== undefined &&
            (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
        message.r !== undefined &&
            (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
        message.s !== undefined &&
            (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const message = createBaseAccessListTx();
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? Long.fromValue(object.nonce)
                : Long.UZERO;
        message.gasPrice = (_b = object.gasPrice) !== null && _b !== void 0 ? _b : "";
        message.gas =
            object.gas !== undefined && object.gas !== null
                ? Long.fromValue(object.gas)
                : Long.UZERO;
        message.to = (_c = object.to) !== null && _c !== void 0 ? _c : "";
        message.value = (_d = object.value) !== null && _d !== void 0 ? _d : "";
        message.data = (_e = object.data) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.accesses =
            ((_f = object.accesses) === null || _f === void 0 ? void 0 : _f.map((e) => AccessTuple.fromPartial(e))) || [];
        message.v = (_g = object.v) !== null && _g !== void 0 ? _g : new Uint8Array();
        message.r = (_h = object.r) !== null && _h !== void 0 ? _h : new Uint8Array();
        message.s = (_j = object.s) !== null && _j !== void 0 ? _j : new Uint8Array();
        return message;
    },
};
function createBaseDynamicFeeTx() {
    return {
        chainId: "",
        nonce: Long.UZERO,
        gasTipCap: "",
        gasFeeCap: "",
        gas: Long.UZERO,
        to: "",
        value: "",
        data: new Uint8Array(),
        accesses: [],
        v: new Uint8Array(),
        r: new Uint8Array(),
        s: new Uint8Array(),
    };
}
export const DynamicFeeTx = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.chainId !== "") {
            writer.uint32(10).string(message.chainId);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(16).uint64(message.nonce);
        }
        if (message.gasTipCap !== "") {
            writer.uint32(26).string(message.gasTipCap);
        }
        if (message.gasFeeCap !== "") {
            writer.uint32(34).string(message.gasFeeCap);
        }
        if (!message.gas.isZero()) {
            writer.uint32(40).uint64(message.gas);
        }
        if (message.to !== "") {
            writer.uint32(50).string(message.to);
        }
        if (message.value !== "") {
            writer.uint32(58).string(message.value);
        }
        if (message.data.length !== 0) {
            writer.uint32(66).bytes(message.data);
        }
        for (const v of message.accesses) {
            AccessTuple.encode(v, writer.uint32(74).fork()).ldelim();
        }
        if (message.v.length !== 0) {
            writer.uint32(82).bytes(message.v);
        }
        if (message.r.length !== 0) {
            writer.uint32(90).bytes(message.r);
        }
        if (message.s.length !== 0) {
            writer.uint32(98).bytes(message.s);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDynamicFeeTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.chainId = reader.string();
                    break;
                case 2:
                    message.nonce = reader.uint64();
                    break;
                case 3:
                    message.gasTipCap = reader.string();
                    break;
                case 4:
                    message.gasFeeCap = reader.string();
                    break;
                case 5:
                    message.gas = reader.uint64();
                    break;
                case 6:
                    message.to = reader.string();
                    break;
                case 7:
                    message.value = reader.string();
                    break;
                case 8:
                    message.data = reader.bytes();
                    break;
                case 9:
                    message.accesses.push(AccessTuple.decode(reader, reader.uint32()));
                    break;
                case 10:
                    message.v = reader.bytes();
                    break;
                case 11:
                    message.r = reader.bytes();
                    break;
                case 12:
                    message.s = reader.bytes();
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
            nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
            gasTipCap: isSet(object.gasTipCap) ? String(object.gasTipCap) : "",
            gasFeeCap: isSet(object.gasFeeCap) ? String(object.gasFeeCap) : "",
            gas: isSet(object.gas) ? Long.fromValue(object.gas) : Long.UZERO,
            to: isSet(object.to) ? String(object.to) : "",
            value: isSet(object.value) ? String(object.value) : "",
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
            accesses: Array.isArray(object === null || object === void 0 ? void 0 : object.accesses)
                ? object.accesses.map((e) => AccessTuple.fromJSON(e))
                : [],
            v: isSet(object.v) ? bytesFromBase64(object.v) : new Uint8Array(),
            r: isSet(object.r) ? bytesFromBase64(object.r) : new Uint8Array(),
            s: isSet(object.s) ? bytesFromBase64(object.s) : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || Long.UZERO).toString());
        message.gasTipCap !== undefined && (obj.gasTipCap = message.gasTipCap);
        message.gasFeeCap !== undefined && (obj.gasFeeCap = message.gasFeeCap);
        message.gas !== undefined &&
            (obj.gas = (message.gas || Long.UZERO).toString());
        message.to !== undefined && (obj.to = message.to);
        message.value !== undefined && (obj.value = message.value);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        if (message.accesses) {
            obj.accesses = message.accesses.map((e) => e ? AccessTuple.toJSON(e) : undefined);
        }
        else {
            obj.accesses = [];
        }
        message.v !== undefined &&
            (obj.v = base64FromBytes(message.v !== undefined ? message.v : new Uint8Array()));
        message.r !== undefined &&
            (obj.r = base64FromBytes(message.r !== undefined ? message.r : new Uint8Array()));
        message.s !== undefined &&
            (obj.s = base64FromBytes(message.s !== undefined ? message.s : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const message = createBaseDynamicFeeTx();
        message.chainId = (_a = object.chainId) !== null && _a !== void 0 ? _a : "";
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? Long.fromValue(object.nonce)
                : Long.UZERO;
        message.gasTipCap = (_b = object.gasTipCap) !== null && _b !== void 0 ? _b : "";
        message.gasFeeCap = (_c = object.gasFeeCap) !== null && _c !== void 0 ? _c : "";
        message.gas =
            object.gas !== undefined && object.gas !== null
                ? Long.fromValue(object.gas)
                : Long.UZERO;
        message.to = (_d = object.to) !== null && _d !== void 0 ? _d : "";
        message.value = (_e = object.value) !== null && _e !== void 0 ? _e : "";
        message.data = (_f = object.data) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.accesses =
            ((_g = object.accesses) === null || _g === void 0 ? void 0 : _g.map((e) => AccessTuple.fromPartial(e))) || [];
        message.v = (_h = object.v) !== null && _h !== void 0 ? _h : new Uint8Array();
        message.r = (_j = object.r) !== null && _j !== void 0 ? _j : new Uint8Array();
        message.s = (_k = object.s) !== null && _k !== void 0 ? _k : new Uint8Array();
        return message;
    },
};
function createBaseExtensionOptionsEthereumTx() {
    return {};
}
export const ExtensionOptionsEthereumTx = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtensionOptionsEthereumTx();
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
        const message = createBaseExtensionOptionsEthereumTx();
        return message;
    },
};
function createBaseMsgEthereumTxResponse() {
    return {
        hash: "",
        logs: [],
        ret: new Uint8Array(),
        vmError: "",
        gasUsed: Long.UZERO,
    };
}
export const MsgEthereumTxResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        for (const v of message.logs) {
            Log.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.ret.length !== 0) {
            writer.uint32(26).bytes(message.ret);
        }
        if (message.vmError !== "") {
            writer.uint32(34).string(message.vmError);
        }
        if (!message.gasUsed.isZero()) {
            writer.uint32(40).uint64(message.gasUsed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgEthereumTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                case 2:
                    message.logs.push(Log.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.ret = reader.bytes();
                    break;
                case 4:
                    message.vmError = reader.string();
                    break;
                case 5:
                    message.gasUsed = reader.uint64();
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
            hash: isSet(object.hash) ? String(object.hash) : "",
            logs: Array.isArray(object === null || object === void 0 ? void 0 : object.logs)
                ? object.logs.map((e) => Log.fromJSON(e))
                : [],
            ret: isSet(object.ret) ? bytesFromBase64(object.ret) : new Uint8Array(),
            vmError: isSet(object.vmError) ? String(object.vmError) : "",
            gasUsed: isSet(object.gasUsed)
                ? Long.fromValue(object.gasUsed)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        if (message.logs) {
            obj.logs = message.logs.map((e) => (e ? Log.toJSON(e) : undefined));
        }
        else {
            obj.logs = [];
        }
        message.ret !== undefined &&
            (obj.ret = base64FromBytes(message.ret !== undefined ? message.ret : new Uint8Array()));
        message.vmError !== undefined && (obj.vmError = message.vmError);
        message.gasUsed !== undefined &&
            (obj.gasUsed = (message.gasUsed || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgEthereumTxResponse();
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : "";
        message.logs = ((_b = object.logs) === null || _b === void 0 ? void 0 : _b.map((e) => Log.fromPartial(e))) || [];
        message.ret = (_c = object.ret) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.vmError = (_d = object.vmError) !== null && _d !== void 0 ? _d : "";
        message.gasUsed =
            object.gasUsed !== undefined && object.gasUsed !== null
                ? Long.fromValue(object.gasUsed)
                : Long.UZERO;
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.EthereumTx = this.EthereumTx.bind(this);
    }
    EthereumTx(request) {
        const data = MsgEthereumTx.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Msg", "EthereumTx", data);
        return promise.then((data) => MsgEthereumTxResponse.decode(new _m0.Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
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