/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Collection } from "./nft";
import { Params } from "./params";
export const protobufPackage = "decimal.nft.v1";
function createBaseGenesisState() {
    return { collections: [], params: undefined };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.collections) {
            Collection.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
                case 2:
                    message.collections.push(Collection.decode(reader, reader.uint32()));
                    break;
                case 1:
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
            collections: Array.isArray(object === null || object === void 0 ? void 0 : object.collections) ? object.collections.map((e) => Collection.fromJSON(e)) : [],
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.collections) {
            obj.collections = message.collections.map((e) => e ? Collection.toJSON(e) : undefined);
        }
        else {
            obj.collections = [];
        }
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGenesisState();
        message.collections = ((_a = object.collections) === null || _a === void 0 ? void 0 : _a.map((e) => Collection.fromPartial(e))) || [];
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