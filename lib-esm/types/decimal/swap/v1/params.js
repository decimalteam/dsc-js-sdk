/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.swap.v1";
function createBaseParams() {
    return { lockedTimeOut: 0, lockedTimeIn: 0, serviceAddress: "", checkingAddress: "" };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.lockedTimeOut !== 0) {
            writer.uint32(8).int64(message.lockedTimeOut);
        }
        if (message.lockedTimeIn !== 0) {
            writer.uint32(16).int64(message.lockedTimeIn);
        }
        if (message.serviceAddress !== "") {
            writer.uint32(26).string(message.serviceAddress);
        }
        if (message.checkingAddress !== "") {
            writer.uint32(34).string(message.checkingAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.lockedTimeOut = longToNumber(reader.int64());
                    break;
                case 2:
                    message.lockedTimeIn = longToNumber(reader.int64());
                    break;
                case 3:
                    message.serviceAddress = reader.string();
                    break;
                case 4:
                    message.checkingAddress = reader.string();
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
            lockedTimeOut: isSet(object.lockedTimeOut) ? Number(object.lockedTimeOut) : 0,
            lockedTimeIn: isSet(object.lockedTimeIn) ? Number(object.lockedTimeIn) : 0,
            serviceAddress: isSet(object.serviceAddress) ? String(object.serviceAddress) : "",
            checkingAddress: isSet(object.checkingAddress) ? String(object.checkingAddress) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.lockedTimeOut !== undefined && (obj.lockedTimeOut = Math.round(message.lockedTimeOut));
        message.lockedTimeIn !== undefined && (obj.lockedTimeIn = Math.round(message.lockedTimeIn));
        message.serviceAddress !== undefined && (obj.serviceAddress = message.serviceAddress);
        message.checkingAddress !== undefined && (obj.checkingAddress = message.checkingAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseParams();
        message.lockedTimeOut = (_a = object.lockedTimeOut) !== null && _a !== void 0 ? _a : 0;
        message.lockedTimeIn = (_b = object.lockedTimeIn) !== null && _b !== void 0 ? _b : 0;
        message.serviceAddress = (_c = object.serviceAddress) !== null && _c !== void 0 ? _c : "";
        message.checkingAddress = (_d = object.checkingAddress) !== null && _d !== void 0 ? _d : "";
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
//# sourceMappingURL=params.js.map