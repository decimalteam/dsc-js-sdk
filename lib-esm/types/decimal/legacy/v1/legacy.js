/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.legacy.v1";
function createBaseRecord() {
    return { legacyAddress: "", coins: [], wallets: [], nfts: [] };
}
export const Record = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.legacyAddress !== "") {
            writer.uint32(10).string(message.legacyAddress);
        }
        for (const v of message.coins) {
            Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.wallets) {
            writer.uint32(26).string(v);
        }
        for (const v of message.nfts) {
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRecord();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.legacyAddress = reader.string();
                    break;
                case 2:
                    message.coins.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.wallets.push(reader.string());
                    break;
                case 4:
                    message.nfts.push(reader.string());
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
            legacyAddress: isSet(object.legacyAddress) ? String(object.legacyAddress) : "",
            coins: Array.isArray(object === null || object === void 0 ? void 0 : object.coins) ? object.coins.map((e) => Coin.fromJSON(e)) : [],
            wallets: Array.isArray(object === null || object === void 0 ? void 0 : object.wallets) ? object.wallets.map((e) => String(e)) : [],
            nfts: Array.isArray(object === null || object === void 0 ? void 0 : object.nfts) ? object.nfts.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.legacyAddress !== undefined && (obj.legacyAddress = message.legacyAddress);
        if (message.coins) {
            obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.coins = [];
        }
        if (message.wallets) {
            obj.wallets = message.wallets.map((e) => e);
        }
        else {
            obj.wallets = [];
        }
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => e);
        }
        else {
            obj.nfts = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseRecord();
        message.legacyAddress = (_a = object.legacyAddress) !== null && _a !== void 0 ? _a : "";
        message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => Coin.fromPartial(e))) || [];
        message.wallets = ((_c = object.wallets) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.nfts = ((_d = object.nfts) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=legacy.js.map