/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
export const protobufPackage = "decimal.nft.v1";
function createBaseMsgMintToken() {
    return {
        sender: "",
        denom: "",
        tokenId: "",
        tokenUri: "",
        allowMint: false,
        recipient: "",
        quantity: 0,
        reserve: undefined,
    };
}
export const MsgMintToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        if (message.tokenId !== "") {
            writer.uint32(26).string(message.tokenId);
        }
        if (message.tokenUri !== "") {
            writer.uint32(34).string(message.tokenUri);
        }
        if (message.allowMint === true) {
            writer.uint32(40).bool(message.allowMint);
        }
        if (message.recipient !== "") {
            writer.uint32(50).string(message.recipient);
        }
        if (message.quantity !== 0) {
            writer.uint32(56).uint32(message.quantity);
        }
        if (message.reserve !== undefined) {
            Coin.encode(message.reserve, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMintToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
                    break;
                case 3:
                    message.tokenId = reader.string();
                    break;
                case 4:
                    message.tokenUri = reader.string();
                    break;
                case 5:
                    message.allowMint = reader.bool();
                    break;
                case 6:
                    message.recipient = reader.string();
                    break;
                case 7:
                    message.quantity = reader.uint32();
                    break;
                case 8:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            tokenUri: isSet(object.tokenUri) ? String(object.tokenUri) : "",
            allowMint: isSet(object.allowMint) ? Boolean(object.allowMint) : false,
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
            reserve: isSet(object.reserve) ? Coin.fromJSON(object.reserve) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.denom !== undefined && (obj.denom = message.denom);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        message.tokenUri !== undefined && (obj.tokenUri = message.tokenUri);
        message.allowMint !== undefined && (obj.allowMint = message.allowMint);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
        message.reserve !== undefined && (obj.reserve = message.reserve ? Coin.toJSON(message.reserve) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseMsgMintToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.tokenId = (_c = object.tokenId) !== null && _c !== void 0 ? _c : "";
        message.tokenUri = (_d = object.tokenUri) !== null && _d !== void 0 ? _d : "";
        message.allowMint = (_e = object.allowMint) !== null && _e !== void 0 ? _e : false;
        message.recipient = (_f = object.recipient) !== null && _f !== void 0 ? _f : "";
        message.quantity = (_g = object.quantity) !== null && _g !== void 0 ? _g : 0;
        message.reserve = (object.reserve !== undefined && object.reserve !== null)
            ? Coin.fromPartial(object.reserve)
            : undefined;
        return message;
    },
};
function createBaseMsgMintTokenResponse() {
    return {};
}
export const MsgMintTokenResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMintTokenResponse();
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
        const message = createBaseMsgMintTokenResponse();
        return message;
    },
};
function createBaseMsgUpdateToken() {
    return { sender: "", tokenId: "", tokenUri: "" };
}
export const MsgUpdateToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.tokenId !== "") {
            writer.uint32(18).string(message.tokenId);
        }
        if (message.tokenUri !== "") {
            writer.uint32(26).string(message.tokenUri);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.tokenId = reader.string();
                    break;
                case 3:
                    message.tokenUri = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            tokenUri: isSet(object.tokenUri) ? String(object.tokenUri) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        message.tokenUri !== undefined && (obj.tokenUri = message.tokenUri);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgUpdateToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.tokenId = (_b = object.tokenId) !== null && _b !== void 0 ? _b : "";
        message.tokenUri = (_c = object.tokenUri) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgUpdateTokenResponse() {
    return {};
}
export const MsgUpdateTokenResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateTokenResponse();
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
        const message = createBaseMsgUpdateTokenResponse();
        return message;
    },
};
function createBaseMsgUpdateReserve() {
    return { sender: "", tokenId: "", subTokenIds: [], reserve: undefined };
}
export const MsgUpdateReserve = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.tokenId !== "") {
            writer.uint32(18).string(message.tokenId);
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        if (message.reserve !== undefined) {
            Coin.encode(message.reserve, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateReserve();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.tokenId = reader.string();
                    break;
                case 4:
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
                case 5:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
            reserve: isSet(object.reserve) ? Coin.fromJSON(object.reserve) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        message.reserve !== undefined && (obj.reserve = message.reserve ? Coin.toJSON(message.reserve) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgUpdateReserve();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.tokenId = (_b = object.tokenId) !== null && _b !== void 0 ? _b : "";
        message.subTokenIds = ((_c = object.subTokenIds) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.reserve = (object.reserve !== undefined && object.reserve !== null)
            ? Coin.fromPartial(object.reserve)
            : undefined;
        return message;
    },
};
function createBaseMsgUpdateReserveResponse() {
    return {};
}
export const MsgUpdateReserveResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateReserveResponse();
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
        const message = createBaseMsgUpdateReserveResponse();
        return message;
    },
};
function createBaseMsgSendToken() {
    return { sender: "", tokenId: "", subTokenIds: [], recipient: "" };
}
export const MsgSendToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.tokenId !== "") {
            writer.uint32(18).string(message.tokenId);
        }
        writer.uint32(26).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        if (message.recipient !== "") {
            writer.uint32(34).string(message.recipient);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.tokenId = reader.string();
                    break;
                case 3:
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
                case 4:
                    message.recipient = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        message.recipient !== undefined && (obj.recipient = message.recipient);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgSendToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.tokenId = (_b = object.tokenId) !== null && _b !== void 0 ? _b : "";
        message.subTokenIds = ((_c = object.subTokenIds) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.recipient = (_d = object.recipient) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
function createBaseMsgSendTokenResponse() {
    return {};
}
export const MsgSendTokenResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSendTokenResponse();
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
        const message = createBaseMsgSendTokenResponse();
        return message;
    },
};
function createBaseMsgBurnToken() {
    return { sender: "", tokenId: "", subTokenIds: [] };
}
export const MsgBurnToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.tokenId !== "") {
            writer.uint32(18).string(message.tokenId);
        }
        writer.uint32(26).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBurnToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.tokenId = reader.string();
                    break;
                case 3:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgBurnToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.tokenId = (_b = object.tokenId) !== null && _b !== void 0 ? _b : "";
        message.subTokenIds = ((_c = object.subTokenIds) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
function createBaseMsgBurnTokenResponse() {
    return {};
}
export const MsgBurnTokenResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgBurnTokenResponse();
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
        const message = createBaseMsgBurnTokenResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.MintToken = this.MintToken.bind(this);
        this.UpdateToken = this.UpdateToken.bind(this);
        this.UpdateReserve = this.UpdateReserve.bind(this);
        this.SendToken = this.SendToken.bind(this);
        this.BurnToken = this.BurnToken.bind(this);
    }
    MintToken(request) {
        const data = MsgMintToken.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Msg", "MintToken", data);
        return promise.then((data) => MsgMintTokenResponse.decode(new _m0.Reader(data)));
    }
    UpdateToken(request) {
        const data = MsgUpdateToken.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Msg", "UpdateToken", data);
        return promise.then((data) => MsgUpdateTokenResponse.decode(new _m0.Reader(data)));
    }
    UpdateReserve(request) {
        const data = MsgUpdateReserve.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Msg", "UpdateReserve", data);
        return promise.then((data) => MsgUpdateReserveResponse.decode(new _m0.Reader(data)));
    }
    SendToken(request) {
        const data = MsgSendToken.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Msg", "SendToken", data);
        return promise.then((data) => MsgSendTokenResponse.decode(new _m0.Reader(data)));
    }
    BurnToken(request) {
        const data = MsgBurnToken.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Msg", "BurnToken", data);
        return promise.then((data) => MsgBurnTokenResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map