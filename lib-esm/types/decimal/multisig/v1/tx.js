/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export const protobufPackage = "decimal.multisig.v1";
function createBaseMsgCreateWallet() {
    return { sender: "", owners: [], weights: [], threshold: 0 };
}
export const MsgCreateWallet = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        for (const v of message.owners) {
            writer.uint32(18).string(v);
        }
        writer.uint32(26).fork();
        for (const v of message.weights) {
            writer.uint32(v);
        }
        writer.ldelim();
        if (message.threshold !== 0) {
            writer.uint32(32).uint32(message.threshold);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateWallet();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.owners.push(reader.string());
                    break;
                case 3:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.weights.push(reader.uint32());
                        }
                    }
                    else {
                        message.weights.push(reader.uint32());
                    }
                    break;
                case 4:
                    message.threshold = reader.uint32();
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
            owners: Array.isArray(object === null || object === void 0 ? void 0 : object.owners) ? object.owners.map((e) => String(e)) : [],
            weights: Array.isArray(object === null || object === void 0 ? void 0 : object.weights) ? object.weights.map((e) => Number(e)) : [],
            threshold: isSet(object.threshold) ? Number(object.threshold) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        if (message.owners) {
            obj.owners = message.owners.map((e) => e);
        }
        else {
            obj.owners = [];
        }
        if (message.weights) {
            obj.weights = message.weights.map((e) => Math.round(e));
        }
        else {
            obj.weights = [];
        }
        message.threshold !== undefined && (obj.threshold = Math.round(message.threshold));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseMsgCreateWallet();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.owners = ((_b = object.owners) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        message.weights = ((_c = object.weights) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.threshold = (_d = object.threshold) !== null && _d !== void 0 ? _d : 0;
        return message;
    },
};
function createBaseMsgCreateWalletResponse() {
    return { wallet: "" };
}
export const MsgCreateWalletResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.wallet !== "") {
            writer.uint32(10).string(message.wallet);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateWalletResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        return { wallet: isSet(object.wallet) ? String(object.wallet) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.wallet !== undefined && (obj.wallet = message.wallet);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgCreateWalletResponse();
        message.wallet = (_a = object.wallet) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseMsgCreateTransaction() {
    return { sender: "", wallet: "", content: undefined };
}
export const MsgCreateTransaction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wallet !== "") {
            writer.uint32(18).string(message.wallet);
        }
        if (message.content !== undefined) {
            Any.encode(message.content, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateTransaction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.wallet = reader.string();
                    break;
                case 3:
                    message.content = Any.decode(reader, reader.uint32());
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
            wallet: isSet(object.wallet) ? String(object.wallet) : "",
            content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.wallet !== undefined && (obj.wallet = message.wallet);
        message.content !== undefined && (obj.content = message.content ? Any.toJSON(message.content) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgCreateTransaction();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.wallet = (_b = object.wallet) !== null && _b !== void 0 ? _b : "";
        message.content = (object.content !== undefined && object.content !== null)
            ? Any.fromPartial(object.content)
            : undefined;
        return message;
    },
};
function createBaseMsgCreateTransactionResponse() {
    return { id: "" };
}
export const MsgCreateTransactionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateTransactionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { id: isSet(object.id) ? String(object.id) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgCreateTransactionResponse();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseMsgSignTransaction() {
    return { sender: "", id: "" };
}
export const MsgSignTransaction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignTransaction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { sender: isSet(object.sender) ? String(object.sender) : "", id: isSet(object.id) ? String(object.id) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgSignTransaction();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgSignTransactionResponse() {
    return {};
}
export const MsgSignTransactionResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignTransactionResponse();
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
        const message = createBaseMsgSignTransactionResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateWallet = this.CreateWallet.bind(this);
        this.CreateTransaction = this.CreateTransaction.bind(this);
        this.SignTransaction = this.SignTransaction.bind(this);
    }
    CreateWallet(request) {
        const data = MsgCreateWallet.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Msg", "CreateWallet", data);
        return promise.then((data) => MsgCreateWalletResponse.decode(new _m0.Reader(data)));
    }
    CreateTransaction(request) {
        const data = MsgCreateTransaction.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Msg", "CreateTransaction", data);
        return promise.then((data) => MsgCreateTransactionResponse.decode(new _m0.Reader(data)));
    }
    SignTransaction(request) {
        const data = MsgSignTransaction.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Msg", "SignTransaction", data);
        return promise.then((data) => MsgSignTransactionResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map