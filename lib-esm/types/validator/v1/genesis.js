/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Delegation, Redelegation, Undelegation, Validator } from "./validator";
export const protobufPackage = "decimal.validator.v1";
function createBaseGenesisState() {
    return {
        validators: [],
        delegations: [],
        undelegations: [],
        redelegations: [],
        lastValidatorPowers: [],
        lastTotalPower: 0,
        params: undefined,
        exported: false,
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validators) {
            Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.delegations) {
            Delegation.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.undelegations) {
            Undelegation.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.redelegations) {
            Redelegation.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.lastValidatorPowers) {
            LastValidatorPower.encode(v, writer.uint32(42).fork()).ldelim();
        }
        if (message.lastTotalPower !== 0) {
            writer.uint32(48).int64(message.lastTotalPower);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(58).fork()).ldelim();
        }
        if (message.exported === true) {
            writer.uint32(64).bool(message.exported);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(Validator.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.delegations.push(Delegation.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.undelegations.push(Undelegation.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.redelegations.push(Redelegation.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.lastValidatorPowers.push(LastValidatorPower.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.lastTotalPower = longToNumber(reader.int64());
                    break;
                case 7:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.exported = reader.bool();
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
            validators: Array.isArray(object === null || object === void 0 ? void 0 : object.validators) ? object.validators.map((e) => Validator.fromJSON(e)) : [],
            delegations: Array.isArray(object === null || object === void 0 ? void 0 : object.delegations) ? object.delegations.map((e) => Delegation.fromJSON(e)) : [],
            undelegations: Array.isArray(object === null || object === void 0 ? void 0 : object.undelegations)
                ? object.undelegations.map((e) => Undelegation.fromJSON(e))
                : [],
            redelegations: Array.isArray(object === null || object === void 0 ? void 0 : object.redelegations)
                ? object.redelegations.map((e) => Redelegation.fromJSON(e))
                : [],
            lastValidatorPowers: Array.isArray(object === null || object === void 0 ? void 0 : object.lastValidatorPowers)
                ? object.lastValidatorPowers.map((e) => LastValidatorPower.fromJSON(e))
                : [],
            lastTotalPower: isSet(object.lastTotalPower) ? Number(object.lastTotalPower) : 0,
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
            exported: isSet(object.exported) ? Boolean(object.exported) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => e ? Validator.toJSON(e) : undefined);
        }
        else {
            obj.validators = [];
        }
        if (message.delegations) {
            obj.delegations = message.delegations.map((e) => e ? Delegation.toJSON(e) : undefined);
        }
        else {
            obj.delegations = [];
        }
        if (message.undelegations) {
            obj.undelegations = message.undelegations.map((e) => e ? Undelegation.toJSON(e) : undefined);
        }
        else {
            obj.undelegations = [];
        }
        if (message.redelegations) {
            obj.redelegations = message.redelegations.map((e) => e ? Redelegation.toJSON(e) : undefined);
        }
        else {
            obj.redelegations = [];
        }
        if (message.lastValidatorPowers) {
            obj.lastValidatorPowers = message.lastValidatorPowers.map((e) => e ? LastValidatorPower.toJSON(e) : undefined);
        }
        else {
            obj.lastValidatorPowers = [];
        }
        message.lastTotalPower !== undefined && (obj.lastTotalPower = Math.round(message.lastTotalPower));
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        message.exported !== undefined && (obj.exported = message.exported);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseGenesisState();
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => Validator.fromPartial(e))) || [];
        message.delegations = ((_b = object.delegations) === null || _b === void 0 ? void 0 : _b.map((e) => Delegation.fromPartial(e))) || [];
        message.undelegations = ((_c = object.undelegations) === null || _c === void 0 ? void 0 : _c.map((e) => Undelegation.fromPartial(e))) || [];
        message.redelegations = ((_d = object.redelegations) === null || _d === void 0 ? void 0 : _d.map((e) => Redelegation.fromPartial(e))) || [];
        message.lastValidatorPowers = ((_e = object.lastValidatorPowers) === null || _e === void 0 ? void 0 : _e.map((e) => LastValidatorPower.fromPartial(e))) || [];
        message.lastTotalPower = (_f = object.lastTotalPower) !== null && _f !== void 0 ? _f : 0;
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        message.exported = (_g = object.exported) !== null && _g !== void 0 ? _g : false;
        return message;
    },
};
function createBaseLastValidatorPower() {
    return { address: "", power: 0 };
}
export const LastValidatorPower = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.power !== 0) {
            writer.uint32(16).int64(message.power);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLastValidatorPower();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.power = longToNumber(reader.int64());
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
            power: isSet(object.power) ? Number(object.power) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.power !== undefined && (obj.power = Math.round(message.power));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseLastValidatorPower();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.power = (_b = object.power) !== null && _b !== void 0 ? _b : 0;
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
//# sourceMappingURL=genesis.js.map