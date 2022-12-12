/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "ethermint.feemarket.v1";
function createBaseParams() {
    return {
        noBaseFee: false,
        baseFeeChangeDenominator: 0,
        elasticityMultiplier: 0,
        enableHeight: Long.ZERO,
        baseFee: "",
    };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.noBaseFee === true) {
            writer.uint32(8).bool(message.noBaseFee);
        }
        if (message.baseFeeChangeDenominator !== 0) {
            writer.uint32(16).uint32(message.baseFeeChangeDenominator);
        }
        if (message.elasticityMultiplier !== 0) {
            writer.uint32(24).uint32(message.elasticityMultiplier);
        }
        if (!message.enableHeight.isZero()) {
            writer.uint32(40).int64(message.enableHeight);
        }
        if (message.baseFee !== "") {
            writer.uint32(50).string(message.baseFee);
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
                    message.noBaseFee = reader.bool();
                    break;
                case 2:
                    message.baseFeeChangeDenominator = reader.uint32();
                    break;
                case 3:
                    message.elasticityMultiplier = reader.uint32();
                    break;
                case 5:
                    message.enableHeight = reader.int64();
                    break;
                case 6:
                    message.baseFee = reader.string();
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
            noBaseFee: isSet(object.noBaseFee) ? Boolean(object.noBaseFee) : false,
            baseFeeChangeDenominator: isSet(object.baseFeeChangeDenominator)
                ? Number(object.baseFeeChangeDenominator)
                : 0,
            elasticityMultiplier: isSet(object.elasticityMultiplier)
                ? Number(object.elasticityMultiplier)
                : 0,
            enableHeight: isSet(object.enableHeight)
                ? Long.fromValue(object.enableHeight)
                : Long.ZERO,
            baseFee: isSet(object.baseFee) ? String(object.baseFee) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.noBaseFee !== undefined && (obj.noBaseFee = message.noBaseFee);
        message.baseFeeChangeDenominator !== undefined &&
            (obj.baseFeeChangeDenominator = Math.round(message.baseFeeChangeDenominator));
        message.elasticityMultiplier !== undefined &&
            (obj.elasticityMultiplier = Math.round(message.elasticityMultiplier));
        message.enableHeight !== undefined &&
            (obj.enableHeight = (message.enableHeight || Long.ZERO).toString());
        message.baseFee !== undefined && (obj.baseFee = message.baseFee);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseParams();
        message.noBaseFee = (_a = object.noBaseFee) !== null && _a !== void 0 ? _a : false;
        message.baseFeeChangeDenominator = (_b = object.baseFeeChangeDenominator) !== null && _b !== void 0 ? _b : 0;
        message.elasticityMultiplier = (_c = object.elasticityMultiplier) !== null && _c !== void 0 ? _c : 0;
        message.enableHeight =
            object.enableHeight !== undefined && object.enableHeight !== null
                ? Long.fromValue(object.enableHeight)
                : Long.ZERO;
        message.baseFee = (_d = object.baseFee) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=feemarket.js.map