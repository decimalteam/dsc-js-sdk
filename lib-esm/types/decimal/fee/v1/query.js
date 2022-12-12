/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { CoinPrice } from "./fee";
import { Params } from "./params";
export const protobufPackage = "decimal.fee.v1";
function createBaseQueryCoinPricesRequest() {
    return {};
}
export const QueryCoinPricesRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCoinPricesRequest();
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
        const message = createBaseQueryCoinPricesRequest();
        return message;
    },
};
function createBaseQueryCoinPricesResponse() {
    return { prices: [] };
}
export const QueryCoinPricesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.prices) {
            CoinPrice.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCoinPricesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.prices.push(CoinPrice.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { prices: Array.isArray(object === null || object === void 0 ? void 0 : object.prices) ? object.prices.map((e) => CoinPrice.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.prices) {
            obj.prices = message.prices.map((e) => e ? CoinPrice.toJSON(e) : undefined);
        }
        else {
            obj.prices = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCoinPricesResponse();
        message.prices = ((_a = object.prices) === null || _a === void 0 ? void 0 : _a.map((e) => CoinPrice.fromPartial(e))) || [];
        return message;
    },
};
function createBaseQueryCoinPriceRequest() {
    return { denom: "", quote: "" };
}
export const QueryCoinPriceRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.quote !== "") {
            writer.uint32(18).string(message.quote);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCoinPriceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.quote = reader.string();
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
            denom: isSet(object.denom) ? String(object.denom) : "",
            quote: isSet(object.quote) ? String(object.quote) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.quote !== undefined && (obj.quote = message.quote);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryCoinPriceRequest();
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.quote = (_b = object.quote) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseQueryCoinPriceResponse() {
    return { price: undefined };
}
export const QueryCoinPriceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.price !== undefined) {
            CoinPrice.encode(message.price, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCoinPriceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.price = CoinPrice.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { price: isSet(object.price) ? CoinPrice.fromJSON(object.price) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.price !== undefined && (obj.price = message.price ? CoinPrice.toJSON(message.price) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCoinPriceResponse();
        message.price = (object.price !== undefined && object.price !== null)
            ? CoinPrice.fromPartial(object.price)
            : undefined;
        return message;
    },
};
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
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
        return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CoinPrices = this.CoinPrices.bind(this);
        this.CoinPrice = this.CoinPrice.bind(this);
        this.ModuleParams = this.ModuleParams.bind(this);
    }
    CoinPrices(request) {
        const data = QueryCoinPricesRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.fee.v1.Query", "CoinPrices", data);
        return promise.then((data) => QueryCoinPricesResponse.decode(new _m0.Reader(data)));
    }
    CoinPrice(request) {
        const data = QueryCoinPriceRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.fee.v1.Query", "CoinPrice", data);
        return promise.then((data) => QueryCoinPriceResponse.decode(new _m0.Reader(data)));
    }
    ModuleParams(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.fee.v1.Query", "ModuleParams", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map