/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.coin.v1";
function createBaseParams() {
    return { baseDenom: "", baseTitle: "", baseVolume: "" };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseDenom !== "") {
            writer.uint32(10).string(message.baseDenom);
        }
        if (message.baseTitle !== "") {
            writer.uint32(18).string(message.baseTitle);
        }
        if (message.baseVolume !== "") {
            writer.uint32(26).string(message.baseVolume);
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
                    message.baseDenom = reader.string();
                    break;
                case 2:
                    message.baseTitle = reader.string();
                    break;
                case 3:
                    message.baseVolume = reader.string();
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
            baseDenom: isSet(object.baseDenom) ? String(object.baseDenom) : "",
            baseTitle: isSet(object.baseTitle) ? String(object.baseTitle) : "",
            baseVolume: isSet(object.baseVolume) ? String(object.baseVolume) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.baseDenom !== undefined && (obj.baseDenom = message.baseDenom);
        message.baseTitle !== undefined && (obj.baseTitle = message.baseTitle);
        message.baseVolume !== undefined && (obj.baseVolume = message.baseVolume);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseParams();
        message.baseDenom = (_a = object.baseDenom) !== null && _a !== void 0 ? _a : "";
        message.baseTitle = (_b = object.baseTitle) !== null && _b !== void 0 ? _b : "";
        message.baseVolume = (_c = object.baseVolume) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=params.js.map