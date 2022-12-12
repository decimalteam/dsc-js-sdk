/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.nft.v1";
function createBaseCollection() {
    return { creator: "", denom: "", supply: 0, tokens: [] };
}
export const Collection = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        if (message.supply !== 0) {
            writer.uint32(24).uint32(message.supply);
        }
        for (const v of message.tokens) {
            Token.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCollection();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.supply = reader.uint32();
                    break;
                case 4:
                    message.tokens.push(Token.decode(reader, reader.uint32()));
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            supply: isSet(object.supply) ? Number(object.supply) : 0,
            tokens: Array.isArray(object === null || object === void 0 ? void 0 : object.tokens) ? object.tokens.map((e) => Token.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.supply !== undefined && (obj.supply = Math.round(message.supply));
        if (message.tokens) {
            obj.tokens = message.tokens.map((e) => e ? Token.toJSON(e) : undefined);
        }
        else {
            obj.tokens = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseCollection();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.supply = (_c = object.supply) !== null && _c !== void 0 ? _c : 0;
        message.tokens = ((_d = object.tokens) === null || _d === void 0 ? void 0 : _d.map((e) => Token.fromPartial(e))) || [];
        return message;
    },
};
function createBaseCollectionCounter() {
    return { supply: 0 };
}
export const CollectionCounter = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.supply !== 0) {
            writer.uint32(8).uint32(message.supply);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCollectionCounter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.supply = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { supply: isSet(object.supply) ? Number(object.supply) : 0 };
    },
    toJSON(message) {
        const obj = {};
        message.supply !== undefined && (obj.supply = Math.round(message.supply));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCollectionCounter();
        message.supply = (_a = object.supply) !== null && _a !== void 0 ? _a : 0;
        return message;
    },
};
function createBaseToken() {
    return {
        creator: "",
        denom: "",
        id: "",
        uri: "",
        reserve: undefined,
        allowMint: false,
        minted: 0,
        burnt: 0,
        subTokens: [],
    };
}
export const Token = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        if (message.id !== "") {
            writer.uint32(26).string(message.id);
        }
        if (message.uri !== "") {
            writer.uint32(34).string(message.uri);
        }
        if (message.reserve !== undefined) {
            Coin.encode(message.reserve, writer.uint32(42).fork()).ldelim();
        }
        if (message.allowMint === true) {
            writer.uint32(48).bool(message.allowMint);
        }
        if (message.minted !== 0) {
            writer.uint32(56).uint32(message.minted);
        }
        if (message.burnt !== 0) {
            writer.uint32(64).uint32(message.burnt);
        }
        for (const v of message.subTokens) {
            SubToken.encode(v, writer.uint32(74).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.id = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.reserve = Coin.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.allowMint = reader.bool();
                    break;
                case 7:
                    message.minted = reader.uint32();
                    break;
                case 8:
                    message.burnt = reader.uint32();
                    break;
                case 9:
                    message.subTokens.push(SubToken.decode(reader, reader.uint32()));
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            id: isSet(object.id) ? String(object.id) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
            reserve: isSet(object.reserve) ? Coin.fromJSON(object.reserve) : undefined,
            allowMint: isSet(object.allowMint) ? Boolean(object.allowMint) : false,
            minted: isSet(object.minted) ? Number(object.minted) : 0,
            burnt: isSet(object.burnt) ? Number(object.burnt) : 0,
            subTokens: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokens) ? object.subTokens.map((e) => SubToken.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.id !== undefined && (obj.id = message.id);
        message.uri !== undefined && (obj.uri = message.uri);
        message.reserve !== undefined && (obj.reserve = message.reserve ? Coin.toJSON(message.reserve) : undefined);
        message.allowMint !== undefined && (obj.allowMint = message.allowMint);
        message.minted !== undefined && (obj.minted = Math.round(message.minted));
        message.burnt !== undefined && (obj.burnt = Math.round(message.burnt));
        if (message.subTokens) {
            obj.subTokens = message.subTokens.map((e) => e ? SubToken.toJSON(e) : undefined);
        }
        else {
            obj.subTokens = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseToken();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.id = (_c = object.id) !== null && _c !== void 0 ? _c : "";
        message.uri = (_d = object.uri) !== null && _d !== void 0 ? _d : "";
        message.reserve = (object.reserve !== undefined && object.reserve !== null)
            ? Coin.fromPartial(object.reserve)
            : undefined;
        message.allowMint = (_e = object.allowMint) !== null && _e !== void 0 ? _e : false;
        message.minted = (_f = object.minted) !== null && _f !== void 0 ? _f : 0;
        message.burnt = (_g = object.burnt) !== null && _g !== void 0 ? _g : 0;
        message.subTokens = ((_h = object.subTokens) === null || _h === void 0 ? void 0 : _h.map((e) => SubToken.fromPartial(e))) || [];
        return message;
    },
};
function createBaseTokenCounter() {
    return { minted: 0, burnt: 0 };
}
export const TokenCounter = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.minted !== 0) {
            writer.uint32(8).uint32(message.minted);
        }
        if (message.burnt !== 0) {
            writer.uint32(16).uint32(message.burnt);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseTokenCounter();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.minted = reader.uint32();
                    break;
                case 2:
                    message.burnt = reader.uint32();
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
            minted: isSet(object.minted) ? Number(object.minted) : 0,
            burnt: isSet(object.burnt) ? Number(object.burnt) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.minted !== undefined && (obj.minted = Math.round(message.minted));
        message.burnt !== undefined && (obj.burnt = Math.round(message.burnt));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseTokenCounter();
        message.minted = (_a = object.minted) !== null && _a !== void 0 ? _a : 0;
        message.burnt = (_b = object.burnt) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseSubToken() {
    return { id: 0, owner: "", reserve: undefined };
}
export const SubToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint32(message.id);
        }
        if (message.owner !== "") {
            writer.uint32(18).string(message.owner);
        }
        if (message.reserve !== undefined) {
            Coin.encode(message.reserve, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSubToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.owner = reader.string();
                    break;
                case 3:
                    message.reserve = Coin.decode(reader, reader.uint32());
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
            id: isSet(object.id) ? Number(object.id) : 0,
            owner: isSet(object.owner) ? String(object.owner) : "",
            reserve: isSet(object.reserve) ? Coin.fromJSON(object.reserve) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.owner !== undefined && (obj.owner = message.owner);
        message.reserve !== undefined && (obj.reserve = message.reserve ? Coin.toJSON(message.reserve) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseSubToken();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : 0;
        message.owner = (_b = object.owner) !== null && _b !== void 0 ? _b : "";
        message.reserve = (object.reserve !== undefined && object.reserve !== null)
            ? Coin.fromPartial(object.reserve)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=nft.js.map