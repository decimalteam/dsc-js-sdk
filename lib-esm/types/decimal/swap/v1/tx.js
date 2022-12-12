/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.swap.v1";
function createBaseMsgActivateChain() {
    return { sender: "", id: 0, name: "" };
}
export const MsgActivateChain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgActivateChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.uint32();
                    break;
                case 3:
                    message.name = reader.string();
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
            id: isSet(object.id) ? Number(object.id) : 0,
            name: isSet(object.name) ? String(object.name) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = Math.round(message.id));
        message.name !== undefined && (obj.name = message.name);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgActivateChain();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : 0;
        message.name = (_c = object.name) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgActivateChainResponse() {
    return {};
}
export const MsgActivateChainResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgActivateChainResponse();
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
        const message = createBaseMsgActivateChainResponse();
        return message;
    },
};
function createBaseMsgDeactivateChain() {
    return { sender: "", id: 0 };
}
export const MsgDeactivateChain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== 0) {
            writer.uint32(16).uint32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeactivateChain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { sender: isSet(object.sender) ? String(object.sender) : "", id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = Math.round(message.id));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgDeactivateChain();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseMsgDeactivateChainResponse() {
    return {};
}
export const MsgDeactivateChainResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDeactivateChainResponse();
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
        const message = createBaseMsgDeactivateChainResponse();
        return message;
    },
};
function createBaseMsgInitializeSwap() {
    return { sender: "", recipient: "", amount: "", tokenSymbol: "", transactionNumber: "", fromChain: 0, destChain: 0 };
}
export const MsgInitializeSwap = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.recipient !== "") {
            writer.uint32(18).string(message.recipient);
        }
        if (message.amount !== "") {
            writer.uint32(26).string(message.amount);
        }
        if (message.tokenSymbol !== "") {
            writer.uint32(34).string(message.tokenSymbol);
        }
        if (message.transactionNumber !== "") {
            writer.uint32(42).string(message.transactionNumber);
        }
        if (message.fromChain !== 0) {
            writer.uint32(48).uint32(message.fromChain);
        }
        if (message.destChain !== 0) {
            writer.uint32(56).uint32(message.destChain);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInitializeSwap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.recipient = reader.string();
                    break;
                case 3:
                    message.amount = reader.string();
                    break;
                case 4:
                    message.tokenSymbol = reader.string();
                    break;
                case 5:
                    message.transactionNumber = reader.string();
                    break;
                case 6:
                    message.fromChain = reader.uint32();
                    break;
                case 7:
                    message.destChain = reader.uint32();
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
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
            tokenSymbol: isSet(object.tokenSymbol) ? String(object.tokenSymbol) : "",
            transactionNumber: isSet(object.transactionNumber) ? String(object.transactionNumber) : "",
            fromChain: isSet(object.fromChain) ? Number(object.fromChain) : 0,
            destChain: isSet(object.destChain) ? Number(object.destChain) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.amount !== undefined && (obj.amount = message.amount);
        message.tokenSymbol !== undefined && (obj.tokenSymbol = message.tokenSymbol);
        message.transactionNumber !== undefined && (obj.transactionNumber = message.transactionNumber);
        message.fromChain !== undefined && (obj.fromChain = Math.round(message.fromChain));
        message.destChain !== undefined && (obj.destChain = Math.round(message.destChain));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = createBaseMsgInitializeSwap();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.recipient = (_b = object.recipient) !== null && _b !== void 0 ? _b : "";
        message.amount = (_c = object.amount) !== null && _c !== void 0 ? _c : "";
        message.tokenSymbol = (_d = object.tokenSymbol) !== null && _d !== void 0 ? _d : "";
        message.transactionNumber = (_e = object.transactionNumber) !== null && _e !== void 0 ? _e : "";
        message.fromChain = (_f = object.fromChain) !== null && _f !== void 0 ? _f : 0;
        message.destChain = (_g = object.destChain) !== null && _g !== void 0 ? _g : 0;
        return message;
    },
};
function createBaseMsgInitializeSwapResponse() {
    return {};
}
export const MsgInitializeSwapResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInitializeSwapResponse();
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
        const message = createBaseMsgInitializeSwapResponse();
        return message;
    },
};
function createBaseMsgRedeemSwap() {
    return {
        sender: "",
        from: "",
        recipient: "",
        amount: "",
        tokenSymbol: "",
        transactionNumber: "",
        fromChain: 0,
        destChain: 0,
        v: 0,
        r: "",
        s: "",
    };
}
export const MsgRedeemSwap = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.from !== "") {
            writer.uint32(18).string(message.from);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        if (message.amount !== "") {
            writer.uint32(34).string(message.amount);
        }
        if (message.tokenSymbol !== "") {
            writer.uint32(42).string(message.tokenSymbol);
        }
        if (message.transactionNumber !== "") {
            writer.uint32(50).string(message.transactionNumber);
        }
        if (message.fromChain !== 0) {
            writer.uint32(56).uint32(message.fromChain);
        }
        if (message.destChain !== 0) {
            writer.uint32(64).uint32(message.destChain);
        }
        if (message.v !== 0) {
            writer.uint32(72).uint32(message.v);
        }
        if (message.r !== "") {
            writer.uint32(82).string(message.r);
        }
        if (message.s !== "") {
            writer.uint32(90).string(message.s);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedeemSwap();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.from = reader.string();
                    break;
                case 3:
                    message.recipient = reader.string();
                    break;
                case 4:
                    message.amount = reader.string();
                    break;
                case 5:
                    message.tokenSymbol = reader.string();
                    break;
                case 6:
                    message.transactionNumber = reader.string();
                    break;
                case 7:
                    message.fromChain = reader.uint32();
                    break;
                case 8:
                    message.destChain = reader.uint32();
                    break;
                case 9:
                    message.v = reader.uint32();
                    break;
                case 10:
                    message.r = reader.string();
                    break;
                case 11:
                    message.s = reader.string();
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
            from: isSet(object.from) ? String(object.from) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            amount: isSet(object.amount) ? String(object.amount) : "",
            tokenSymbol: isSet(object.tokenSymbol) ? String(object.tokenSymbol) : "",
            transactionNumber: isSet(object.transactionNumber) ? String(object.transactionNumber) : "",
            fromChain: isSet(object.fromChain) ? Number(object.fromChain) : 0,
            destChain: isSet(object.destChain) ? Number(object.destChain) : 0,
            v: isSet(object.v) ? Number(object.v) : 0,
            r: isSet(object.r) ? String(object.r) : "",
            s: isSet(object.s) ? String(object.s) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.from !== undefined && (obj.from = message.from);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        message.amount !== undefined && (obj.amount = message.amount);
        message.tokenSymbol !== undefined && (obj.tokenSymbol = message.tokenSymbol);
        message.transactionNumber !== undefined && (obj.transactionNumber = message.transactionNumber);
        message.fromChain !== undefined && (obj.fromChain = Math.round(message.fromChain));
        message.destChain !== undefined && (obj.destChain = Math.round(message.destChain));
        message.v !== undefined && (obj.v = Math.round(message.v));
        message.r !== undefined && (obj.r = message.r);
        message.s !== undefined && (obj.s = message.s);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const message = createBaseMsgRedeemSwap();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.from = (_b = object.from) !== null && _b !== void 0 ? _b : "";
        message.recipient = (_c = object.recipient) !== null && _c !== void 0 ? _c : "";
        message.amount = (_d = object.amount) !== null && _d !== void 0 ? _d : "";
        message.tokenSymbol = (_e = object.tokenSymbol) !== null && _e !== void 0 ? _e : "";
        message.transactionNumber = (_f = object.transactionNumber) !== null && _f !== void 0 ? _f : "";
        message.fromChain = (_g = object.fromChain) !== null && _g !== void 0 ? _g : 0;
        message.destChain = (_h = object.destChain) !== null && _h !== void 0 ? _h : 0;
        message.v = (_j = object.v) !== null && _j !== void 0 ? _j : 0;
        message.r = (_k = object.r) !== null && _k !== void 0 ? _k : "";
        message.s = (_l = object.s) !== null && _l !== void 0 ? _l : "";
        return message;
    },
};
function createBaseMsgRedeemSwapResponse() {
    return {};
}
export const MsgRedeemSwapResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRedeemSwapResponse();
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
        const message = createBaseMsgRedeemSwapResponse();
        return message;
    },
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ActivateChain = this.ActivateChain.bind(this);
        this.DeactivateChain = this.DeactivateChain.bind(this);
        this.InitializeSwap = this.InitializeSwap.bind(this);
        this.RedeemSwap = this.RedeemSwap.bind(this);
    }
    ActivateChain(request) {
        const data = MsgActivateChain.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Msg", "ActivateChain", data);
        return promise.then((data) => MsgActivateChainResponse.decode(new _m0.Reader(data)));
    }
    DeactivateChain(request) {
        const data = MsgDeactivateChain.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Msg", "DeactivateChain", data);
        return promise.then((data) => MsgDeactivateChainResponse.decode(new _m0.Reader(data)));
    }
    InitializeSwap(request) {
        const data = MsgInitializeSwap.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Msg", "InitializeSwap", data);
        return promise.then((data) => MsgInitializeSwapResponse.decode(new _m0.Reader(data)));
    }
    RedeemSwap(request) {
        const data = MsgRedeemSwap.encode(request).finish();
        const promise = this.rpc.request("decimal.swap.v1.Msg", "RedeemSwap", data);
        return promise.then((data) => MsgRedeemSwapResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map