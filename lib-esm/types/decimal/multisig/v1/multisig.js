/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export const protobufPackage = "decimal.multisig.v1";
function createBaseWallet() {
    return { address: "", owners: [], weights: [], threshold: 0 };
}
export const Wallet = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.owners) {
            writer.uint32(18).string(v);
        }
        writer.uint32(26).fork();
        for (const v of message.weights) {
            writer.uint32(v);
        }
        writer.ldelim();
        if (message.threshold !== 0) {
            writer.uint32(32).uint32(message.threshold);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseWallet();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.owners.push(reader.string());
                    break;
                case 3:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.weights.push(reader.uint32());
                        }
                    }
                    else {
                        message.weights.push(reader.uint32());
                    }
                    break;
                case 4:
                    message.threshold = reader.uint32();
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
            address: isSet(object.address) ? String(object.address) : "",
            owners: Array.isArray(object === null || object === void 0 ? void 0 : object.owners) ? object.owners.map((e) => String(e)) : [],
            weights: Array.isArray(object === null || object === void 0 ? void 0 : object.weights) ? object.weights.map((e) => Number(e)) : [],
            threshold: isSet(object.threshold) ? Number(object.threshold) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.owners) {
            obj.owners = message.owners.map((e) => e);
        }
        else {
            obj.owners = [];
        }
        if (message.weights) {
            obj.weights = message.weights.map((e) => Math.round(e));
        }
        else {
            obj.weights = [];
        }
        message.threshold !== undefined && (obj.threshold = Math.round(message.threshold));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseWallet();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.owners = ((_b = object.owners) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        message.weights = ((_c = object.weights) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.threshold = (_d = object.threshold) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
function createBaseTransaction() {
    return { id: "", wallet: "", message: undefined, createdAt: 0 };
}
export const Transaction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.wallet !== "") {
            writer.uint32(18).string(message.wallet);
        }
        if (message.message !== undefined) {
            Any.encode(message.message, writer.uint32(26).fork()).ldelim();
        }
        if (message.createdAt !== 0) {
            writer.uint32(32).int64(message.createdAt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTransaction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.wallet = reader.string();
                    break;
                case 3:
                    message.message = Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.createdAt = longToNumber(reader.int64());
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
            id: isSet(object.id) ? String(object.id) : "",
            wallet: isSet(object.wallet) ? String(object.wallet) : "",
            message: isSet(object.message) ? Any.fromJSON(object.message) : undefined,
            createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.wallet !== undefined && (obj.wallet = message.wallet);
        message.message !== undefined && (obj.message = message.message ? Any.toJSON(message.message) : undefined);
        message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseTransaction();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.wallet = (_b = object.wallet) !== null && _b !== void 0 ? _b : "";
        message.message = (object.message !== undefined && object.message !== null)
            ? Any.fromPartial(object.message)
            : undefined;
        message.createdAt = (_c = object.createdAt) !== null && _c !== void 0 ? _c : 0;
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
//# sourceMappingURL=multisig.js.map