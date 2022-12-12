/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { CoinPrice } from "./fee";
export const protobufPackage = "decimal.fee.v1";
function createBaseEventUpdateCoinPrices() {
    return { oracle: "", prices: [] };
}
export const EventUpdateCoinPrices = {
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
        const message = createBaseEventUpdateCoinPrices();
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
        const message = createBaseEventUpdateCoinPrices();
        message.oracle = (_a = object.oracle) !== null && _a !== void 0 ? _a : "";
        message.prices = ((_b = object.prices) === null || _b === void 0 ? void 0 : _b.map((e) => CoinPrice.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEventPayCommission() {
    return { payer: "", coins: [] };
}
export const EventPayCommission = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.payer !== "") {
            writer.uint32(10).string(message.payer);
        }
        for (const v of message.coins) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventPayCommission();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.payer = reader.string();
                    break;
                case 2:
                    message.coins.push(Coin.decode(reader, reader.uint32()));
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
            payer: isSet(object.payer) ? String(object.payer) : "",
            coins: Array.isArray(object === null || object === void 0 ? void 0 : object.coins) ? object.coins.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.payer !== undefined && (obj.payer = message.payer);
        if (message.coins) {
            obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventPayCommission();
        message.payer = (_a = object.payer) !== null && _a !== void 0 ? _a : "";
        message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => Coin.fromPartial(e))) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=events.js.map