/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.nft.v1";
function createBaseParams() {
    return { maxCollectionSize: 0, maxTokenQuantity: 0, minReserveAmount: "" };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxCollectionSize !== 0) {
            writer.uint32(8).uint32(message.maxCollectionSize);
        }
        if (message.maxTokenQuantity !== 0) {
            writer.uint32(16).uint32(message.maxTokenQuantity);
        }
        if (message.minReserveAmount !== "") {
            writer.uint32(26).string(message.minReserveAmount);
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
                    message.maxCollectionSize = reader.uint32();
                    break;
                case 2:
                    message.maxTokenQuantity = reader.uint32();
                    break;
                case 3:
                    message.minReserveAmount = reader.string();
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
            maxCollectionSize: isSet(object.maxCollectionSize) ? Number(object.maxCollectionSize) : 0,
            maxTokenQuantity: isSet(object.maxTokenQuantity) ? Number(object.maxTokenQuantity) : 0,
            minReserveAmount: isSet(object.minReserveAmount) ? String(object.minReserveAmount) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.maxCollectionSize !== undefined && (obj.maxCollectionSize = Math.round(message.maxCollectionSize));
        message.maxTokenQuantity !== undefined && (obj.maxTokenQuantity = Math.round(message.maxTokenQuantity));
        message.minReserveAmount !== undefined && (obj.minReserveAmount = message.minReserveAmount);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseParams();
        message.maxCollectionSize = (_a = object.maxCollectionSize) !== null && _a !== void 0 ? _a : 0;
        message.maxTokenQuantity = (_b = object.maxTokenQuantity) !== null && _b !== void 0 ? _b : 0;
        message.minReserveAmount = (_c = object.minReserveAmount) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=params.js.map