/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Chain, Swap } from "./swap";
export const protobufPackage = "decimal.swap.v1";
function createBaseGenesisState() {
    return { chains: [], swaps: [], params: undefined };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.chains) {
            Chain.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.swaps) {
            Swap.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(26).fork()).ldelim();
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
                    message.chains.push(Chain.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.swaps.push(Swap.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.params = Params.decode(reader, reader.uint32());
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
            chains: Array.isArray(object === null || object === void 0 ? void 0 : object.chains) ? object.chains.map((e) => Chain.fromJSON(e)) : [],
            swaps: Array.isArray(object === null || object === void 0 ? void 0 : object.swaps) ? object.swaps.map((e) => Swap.fromJSON(e)) : [],
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.chains) {
            obj.chains = message.chains.map((e) => e ? Chain.toJSON(e) : undefined);
        }
        else {
            obj.chains = [];
        }
        if (message.swaps) {
            obj.swaps = message.swaps.map((e) => e ? Swap.toJSON(e) : undefined);
        }
        else {
            obj.swaps = [];
        }
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGenesisState();
        message.chains = ((_a = object.chains) === null || _a === void 0 ? void 0 : _a.map((e) => Chain.fromPartial(e))) || [];
        message.swaps = ((_b = object.swaps) === null || _b === void 0 ? void 0 : _b.map((e) => Swap.fromPartial(e))) || [];
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=genesis.js.map