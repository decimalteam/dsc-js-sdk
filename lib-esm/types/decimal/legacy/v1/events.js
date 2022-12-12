/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.legacy.v1";
function createBaseEventReturnLegacyCoins() {
    return { legacyOwner: "", owner: "", coins: [] };
}
export const EventReturnLegacyCoins = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.legacyOwner !== "") {
            writer.uint32(10).string(message.legacyOwner);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        for (const v of message.coins) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventReturnLegacyCoins();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.legacyOwner = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
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
            legacyOwner: isSet(object.legacyOwner) ? String(object.legacyOwner) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            coins: Array.isArray(object === null || object === void 0 ? void 0 : object.coins) ? object.coins.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.legacyOwner !== undefined && (obj.legacyOwner = message.legacyOwner);
        message.owner !== undefined && (obj.owner = message.owner);
        if (message.coins) {
            obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventReturnLegacyCoins();
        message.legacyOwner = (_a = object.legacyOwner) !== null && _a !== void 0 ? _a : "";
        message.owner = (_b = object.owner) !== null && _b !== void 0 ? _b : "";
        message.coins = ((_c = object.coins) === null || _c === void 0 ? void 0 : _c.map((e) => Coin.fromPartial(e))) || [];
        return message;
    },
};
function createBaseEventReturnLegacySubToken() {
    return { legacyOwner: "", owner: "", denom: "", id: "", subTokenIds: [] };
}
export const EventReturnLegacySubToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.legacyOwner !== "") {
            writer.uint32(10).string(message.legacyOwner);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.denom !== "") {
            writer.uint32(26).string(message.denom);
        }
        if (message.id !== "") {
            writer.uint32(34).string(message.id);
        }
        writer.uint32(42).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventReturnLegacySubToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.legacyOwner = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.denom = reader.string();
                    break;
                case 4:
                    message.id = reader.string();
                    break;
                case 5:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(reader.uint32());
                        }
                    }
                    else {
                        message.subTokenIds.push(reader.uint32());
                    }
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
            legacyOwner: isSet(object.legacyOwner) ? String(object.legacyOwner) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            id: isSet(object.id) ? String(object.id) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.legacyOwner !== undefined && (obj.legacyOwner = message.legacyOwner);
        message.owner !== undefined && (obj.owner = message.owner);
        message.denom !== undefined && (obj.denom = message.denom);
        message.id !== undefined && (obj.id = message.id);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseEventReturnLegacySubToken();
        message.legacyOwner = (_a = object.legacyOwner) !== null && _a !== void 0 ? _a : "";
        message.owner = (_b = object.owner) !== null && _b !== void 0 ? _b : "";
        message.denom = (_c = object.denom) !== null && _c !== void 0 ? _c : "";
        message.id = (_d = object.id) !== null && _d !== void 0 ? _d : "";
        message.subTokenIds = ((_e = object.subTokenIds) === null || _e === void 0 ? void 0 : _e.map((e) => e)) || [];
        return message;
    },
};
function createBaseEventReturnMultisigWallet() {
    return { legacyOwner: "", owner: "", wallet: "" };
}
export const EventReturnMultisigWallet = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.legacyOwner !== "") {
            writer.uint32(10).string(message.legacyOwner);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.wallet !== "") {
            writer.uint32(26).string(message.wallet);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventReturnMultisigWallet();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.legacyOwner = reader.string();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.wallet = reader.string();
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
            legacyOwner: isSet(object.legacyOwner) ? String(object.legacyOwner) : "",
            owner: isSet(object.owner) ? String(object.owner) : "",
            wallet: isSet(object.wallet) ? String(object.wallet) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.legacyOwner !== undefined && (obj.legacyOwner = message.legacyOwner);
        message.owner !== undefined && (obj.owner = message.owner);
        message.wallet !== undefined && (obj.wallet = message.wallet);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventReturnMultisigWallet();
        message.legacyOwner = (_a = object.legacyOwner) !== null && _a !== void 0 ? _a : "";
        message.owner = (_b = object.owner) !== null && _b !== void 0 ? _b : "";
        message.wallet = (_c = object.wallet) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=events.js.map