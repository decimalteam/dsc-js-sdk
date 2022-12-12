/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Swap } from "./swap";
export const protobufPackage = "decimal.swap.v1";
function createBaseQueryActiveSwapsRequest() {
    return {};
}
export const QueryActiveSwapsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActiveSwapsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryActiveSwapsRequest();
        return message;
    },
};
function createBaseQueryActiveSwapsResponse() {
    return { swaps: [] };
}
export const QueryActiveSwapsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.swaps) {
            Swap.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryActiveSwapsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.swaps.push(Swap.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { swaps: Array.isArray(object === null || object === void 0 ? void 0 : object.swaps) ? object.swaps.map((e) => Swap.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.swaps) {
            obj.swaps = message.swaps.map((e) => e ? Swap.toJSON(e) : undefined);
        }
        else {
            obj.swaps = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryActiveSwapsResponse();
        message.swaps = ((_a = object.swaps) === null || _a === void 0 ? void 0 : _a.map((e) => Swap.fromPartial(e))) || [];
        return message;
    },
};
function createBaseQuerySwapRequest() {
    return { hashedSecret: "" };
}
export const QuerySwapRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hashedSecret !== "") {
            writer.uint32(10).string(message.hashedSecret);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySwapRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hashedSecret = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { hashedSecret: isSet(object.hashedSecret) ? String(object.hashedSecret) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.hashedSecret !== undefined && (obj.hashedSecret = message.hashedSecret);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQuerySwapRequest();
        message.hashedSecret = (_a = object.hashedSecret) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQuerySwapResponse() {
    return { swap: undefined };
}
export const QuerySwapResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.swap !== undefined) {
            Swap.encode(message.swap, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySwapResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.swap = Swap.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { swap: isSet(object.swap) ? Swap.fromJSON(object.swap) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.swap !== undefined && (obj.swap = message.swap ? Swap.toJSON(message.swap) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQuerySwapResponse();
        message.swap = (object.swap !== undefined && object.swap !== null) ? Swap.fromPartial(object.swap) : undefined;
        return message;
    },
};
function createBaseQueryPoolRequest() {
    return {};
}
export const QueryPoolRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPoolRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseQueryPoolRequest();
        return message;
    },
};
function createBaseQueryPoolResponse() {
    return { amount: [] };
}
export const QueryPoolResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryPoolResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { amount: Array.isArray(object === null || object === void 0 ? void 0 : object.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryPoolResponse();
        message.amount = ((_a = object.amount) === null || _a === void 0 ? void 0 : _a.map((e) => Coin.fromPartial(e))) || [];
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ActiveSwaps = this.ActiveSwaps.bind(this);
        this.Swap = this.Swap.bind(this);
        this.Pool = this.Pool.bind(this);
    }
    ActiveSwaps(request) {
        const data = QueryActiveSwapsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Query", "ActiveSwaps", data);
        return promise.then((data) => QueryActiveSwapsResponse.decode(new _m0.Reader(data)));
    }
    Swap(request) {
        const data = QuerySwapRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Query", "Swap", data);
        return promise.then((data) => QuerySwapResponse.decode(new _m0.Reader(data)));
    }
    Pool(request) {
        const data = QueryPoolRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Query", "Pool", data);
        return promise.then((data) => QueryPoolResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map