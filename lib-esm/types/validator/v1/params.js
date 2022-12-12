/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";
export const protobufPackage = "decimal.validator.v1";
function createBaseParams() {
    return {
        maxValidators: 0,
        maxDelegations: 0,
        maxEntries: 0,
        historicalEntries: 0,
        redelegationTime: undefined,
        undelegationTime: undefined,
    };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxValidators !== 0) {
            writer.uint32(8).uint32(message.maxValidators);
        }
        if (message.maxDelegations !== 0) {
            writer.uint32(16).uint32(message.maxDelegations);
        }
        if (message.maxEntries !== 0) {
            writer.uint32(24).uint32(message.maxEntries);
        }
        if (message.historicalEntries !== 0) {
            writer.uint32(32).uint32(message.historicalEntries);
        }
        if (message.redelegationTime !== undefined) {
            Duration.encode(message.redelegationTime, writer.uint32(42).fork()).ldelim();
        }
        if (message.undelegationTime !== undefined) {
            Duration.encode(message.undelegationTime, writer.uint32(50).fork()).ldelim();
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
                    message.maxValidators = reader.uint32();
                    break;
                case 2:
                    message.maxDelegations = reader.uint32();
                    break;
                case 3:
                    message.maxEntries = reader.uint32();
                    break;
                case 4:
                    message.historicalEntries = reader.uint32();
                    break;
                case 5:
                    message.redelegationTime = Duration.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.undelegationTime = Duration.decode(reader, reader.uint32());
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
            maxValidators: isSet(object.maxValidators) ? Number(object.maxValidators) : 0,
            maxDelegations: isSet(object.maxDelegations) ? Number(object.maxDelegations) : 0,
            maxEntries: isSet(object.maxEntries) ? Number(object.maxEntries) : 0,
            historicalEntries: isSet(object.historicalEntries) ? Number(object.historicalEntries) : 0,
            redelegationTime: isSet(object.redelegationTime) ? Duration.fromJSON(object.redelegationTime) : undefined,
            undelegationTime: isSet(object.undelegationTime) ? Duration.fromJSON(object.undelegationTime) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.maxValidators !== undefined && (obj.maxValidators = Math.round(message.maxValidators));
        message.maxDelegations !== undefined && (obj.maxDelegations = Math.round(message.maxDelegations));
        message.maxEntries !== undefined && (obj.maxEntries = Math.round(message.maxEntries));
        message.historicalEntries !== undefined && (obj.historicalEntries = Math.round(message.historicalEntries));
        message.redelegationTime !== undefined &&
            (obj.redelegationTime = message.redelegationTime ? Duration.toJSON(message.redelegationTime) : undefined);
        message.undelegationTime !== undefined &&
            (obj.undelegationTime = message.undelegationTime ? Duration.toJSON(message.undelegationTime) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseParams();
        message.maxValidators = (_a = object.maxValidators) !== null && _a !== void 0 ? _a : 0;
        message.maxDelegations = (_b = object.maxDelegations) !== null && _b !== void 0 ? _b : 0;
        message.maxEntries = (_c = object.maxEntries) !== null && _c !== void 0 ? _c : 0;
        message.historicalEntries = (_d = object.historicalEntries) !== null && _d !== void 0 ? _d : 0;
        message.redelegationTime = (object.redelegationTime !== undefined && object.redelegationTime !== null)
            ? Duration.fromPartial(object.redelegationTime)
            : undefined;
        message.undelegationTime = (object.undelegationTime !== undefined && object.undelegationTime !== null)
            ? Duration.fromPartial(object.undelegationTime)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=params.js.map