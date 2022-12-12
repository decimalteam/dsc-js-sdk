/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "ethermint.types.v1";
function createBaseExtensionOptionsWeb3Tx() {
    return {
        typedDataChainId: Long.UZERO,
        feePayer: "",
        feePayerSig: new Uint8Array(),
    };
}
export const ExtensionOptionsWeb3Tx = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.typedDataChainId.isZero()) {
            writer.uint32(8).uint64(message.typedDataChainId);
        }
        if (message.feePayer !== "") {
            writer.uint32(18).string(message.feePayer);
        }
        if (message.feePayerSig.length !== 0) {
            writer.uint32(26).bytes(message.feePayerSig);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseExtensionOptionsWeb3Tx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.typedDataChainId = reader.uint64();
                    break;
                case 2:
                    message.feePayer = reader.string();
                    break;
                case 3:
                    message.feePayerSig = reader.bytes();
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
            typedDataChainId: isSet(object.typedDataChainId)
                ? Long.fromValue(object.typedDataChainId)
                : Long.UZERO,
            feePayer: isSet(object.feePayer) ? String(object.feePayer) : "",
            feePayerSig: isSet(object.feePayerSig)
                ? bytesFromBase64(object.feePayerSig)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.typedDataChainId !== undefined &&
            (obj.typedDataChainId = (message.typedDataChainId || Long.UZERO).toString());
        message.feePayer !== undefined && (obj.feePayer = message.feePayer);
        message.feePayerSig !== undefined &&
            (obj.feePayerSig = base64FromBytes(message.feePayerSig !== undefined
                ? message.feePayerSig
                : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseExtensionOptionsWeb3Tx();
        message.typedDataChainId =
            object.typedDataChainId !== undefined && object.typedDataChainId !== null
                ? Long.fromValue(object.typedDataChainId)
                : Long.UZERO;
        message.feePayer = (_a = object.feePayer) !== null && _a !== void 0 ? _a : "";
        message.feePayerSig = (_b = object.feePayerSig) !== null && _b !== void 0 ? _b : new Uint8Array();
        return message;
    },
};
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
//# sourceMappingURL=web3.js.map