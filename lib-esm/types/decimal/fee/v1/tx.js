/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { CoinPrice } from "./fee";
export const protobufPackage = "decimal.fee.v1";
function createBaseMsgUpdateCoinPrices() {
    return { oracle: "", prices: [] };
}
export const MsgUpdateCoinPrices = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.oracle !== "") {
            writer.uint32(10).string(message.oracle);
        }
        for (const v of message.prices) {
            CoinPrice.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCoinPrices();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.oracle = reader.string();
                    break;
                case 2:
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
        return {
            oracle: isSet(object.oracle) ? String(object.oracle) : "",
            prices: Array.isArray(object === null || object === void 0 ? void 0 : object.prices) ? object.prices.map((e) => CoinPrice.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.oracle !== undefined && (obj.oracle = message.oracle);
        if (message.prices) {
            obj.prices = message.prices.map((e) => e ? CoinPrice.toJSON(e) : undefined);
        }
        else {
            obj.prices = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUpdateCoinPrices();
        message.oracle = (_a = object.oracle) !== null && _a !== void 0 ? _a : "";
        message.prices = ((_b = object.prices) === null || _b === void 0 ? void 0 : _b.map((e) => CoinPrice.fromPartial(e))) || [];
        return message;
    },
};
function createBaseMsgUpdateCoinPricesResponse() {
    return {};
}
export const MsgUpdateCoinPricesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCoinPricesResponse();
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
        const message = createBaseMsgUpdateCoinPricesResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.UpdateCoinPrices = this.UpdateCoinPrices.bind(this);
    }
    UpdateCoinPrices(request) {
        const data = MsgUpdateCoinPrices.encode(request).finish();
        const promise = this.rpc.request("decimal.fee.v1.Msg", "UpdateCoinPrices", data);
        return promise.then((data) => MsgUpdateCoinPricesResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map