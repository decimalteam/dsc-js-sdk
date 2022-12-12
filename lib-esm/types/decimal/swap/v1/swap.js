/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.swap.v1";
function createBaseChain() {
    return { id: 0, name: "", active: false };
}
export const Chain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.active === true) {
            writer.uint32(24).bool(message.active);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.active = reader.bool();
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
            name: isSet(object.name) ? String(object.name) : "",
            active: isSet(object.active) ? Boolean(object.active) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.name !== undefined && (obj.name = message.name);
        message.active !== undefined && (obj.active = message.active);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseChain();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : 0;
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.active = (_c = object.active) !== null && _c !== void 0 ? _c : false;
        return message;
    },
};
function createBaseSwap() {
    return { hashedSecret: "", from: "", recipient: "", amount: "", timestamp: 0, redeemed: false, refunded: false };
}
export const Swap = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hashedSecret !== "") {
            writer.uint32(10).string(message.hashedSecret);
        }
        if (message.from !== "") {
            writer.uint32(18).string(message.from);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        if (message.amount !== "") {
            writer.uint32(34).string(message.amount);
        }
        if (message.timestamp !== 0) {
            writer.uint32(40).uint64(message.timestamp);
        }
        if (message.redeemed === true) {
            writer.uint32(48).bool(message.redeemed);
        }
        if (message.refunded === true) {
            writer.uint32(56).bool(message.refunded);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSwap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hashedSecret = reader.string();
                    break;
                case 2:
                    message.from = reader.string();
                    break;
                case 3:
                    message.recipient = reader.string();
                    break;
                case 4:
                    message.amount = reader.string();
                    break;
                case 5:
                    message.timestamp = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.redeemed = reader.bool();
                    break;
                case 7:
                    message.refunded = reader.bool();
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
            hashedSecret: isSet(object.hashedSecret) ? String(object.hashedSecret) : "",
            from: isSet(object.from) ? String(object.from) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
            timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
            redeemed: isSet(object.redeemed) ? Boolean(object.redeemed) : false,
            refunded: isSet(object.refunded) ? Boolean(object.refunded) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hashedSecret !== undefined && (obj.hashedSecret = message.hashedSecret);
        message.from !== undefined && (obj.from = message.from);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.amount !== undefined && (obj.amount = message.amount);
        message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
        message.redeemed !== undefined && (obj.redeemed = message.redeemed);
        message.refunded !== undefined && (obj.refunded = message.refunded);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseSwap();
        message.hashedSecret = (_a = object.hashedSecret) !== null && _a !== void 0 ? _a : "";
        message.from = (_b = object.from) !== null && _b !== void 0 ? _b : "";
        message.recipient = (_c = object.recipient) !== null && _c !== void 0 ? _c : "";
        message.amount = (_d = object.amount) !== null && _d !== void 0 ? _d : "";
        message.timestamp = (_e = object.timestamp) !== null && _e !== void 0 ? _e : 0;
        message.redeemed = (_f = object.redeemed) !== null && _f !== void 0 ? _f : false;
        message.refunded = (_g = object.refunded) !== null && _g !== void 0 ? _g : false;
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
//# sourceMappingURL=swap.js.map