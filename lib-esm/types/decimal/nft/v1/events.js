/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.nft.v1";
function createBaseEventCreateCollection() {
    return { creator: "", denom: "", supply: 0 };
}
export const EventCreateCollection = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateCollection();
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
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.supply !== undefined && (obj.supply = Math.round(message.supply));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventCreateCollection();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.supply = (_c = object.supply) !== null && _c !== void 0 ? _c : 0;
        return message;
    },
};
function createBaseEventUpdateCollection() {
    return { creator: "", denom: "", supply: 0 };
}
export const EventUpdateCollection = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateCollection();
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
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.supply !== undefined && (obj.supply = Math.round(message.supply));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventUpdateCollection();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.supply = (_c = object.supply) !== null && _c !== void 0 ? _c : 0;
        return message;
    },
};
function createBaseEventCreateToken() {
    return { creator: "", denom: "", id: "", uri: "", allowMint: false, reserve: "", recipient: "", subTokenIds: [] };
}
export const EventCreateToken = {
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
        if (message.allowMint === true) {
            writer.uint32(40).bool(message.allowMint);
        }
        if (message.reserve !== "") {
            writer.uint32(50).string(message.reserve);
        }
        if (message.recipient !== "") {
            writer.uint32(58).string(message.recipient);
        }
        writer.uint32(66).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateToken();
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
                    message.allowMint = reader.bool();
                    break;
                case 6:
                    message.reserve = reader.string();
                    break;
                case 7:
                    message.recipient = reader.string();
                    break;
                case 8:
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            id: isSet(object.id) ? String(object.id) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
            allowMint: isSet(object.allowMint) ? Boolean(object.allowMint) : false,
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.id !== undefined && (obj.id = message.id);
        message.uri !== undefined && (obj.uri = message.uri);
        message.allowMint !== undefined && (obj.allowMint = message.allowMint);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseEventCreateToken();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.id = (_c = object.id) !== null && _c !== void 0 ? _c : "";
        message.uri = (_d = object.uri) !== null && _d !== void 0 ? _d : "";
        message.allowMint = (_e = object.allowMint) !== null && _e !== void 0 ? _e : false;
        message.reserve = (_f = object.reserve) !== null && _f !== void 0 ? _f : "";
        message.recipient = (_g = object.recipient) !== null && _g !== void 0 ? _g : "";
        message.subTokenIds = ((_h = object.subTokenIds) === null || _h === void 0 ? void 0 : _h.map((e) => e)) || [];
        return message;
    },
};
function createBaseEventMintToken() {
    return { creator: "", denom: "", id: "", reserve: "", recipient: "", subTokenIds: [] };
}
export const EventMintToken = {
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
        if (message.reserve !== "") {
            writer.uint32(34).string(message.reserve);
        }
        if (message.recipient !== "") {
            writer.uint32(42).string(message.recipient);
        }
        writer.uint32(50).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMintToken();
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
                    message.reserve = reader.string();
                    break;
                case 5:
                    message.recipient = reader.string();
                    break;
                case 6:
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            denom: isSet(object.denom) ? String(object.denom) : "",
            id: isSet(object.id) ? String(object.id) : "",
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        message.id !== undefined && (obj.id = message.id);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseEventMintToken();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        message.id = (_c = object.id) !== null && _c !== void 0 ? _c : "";
        message.reserve = (_d = object.reserve) !== null && _d !== void 0 ? _d : "";
        message.recipient = (_e = object.recipient) !== null && _e !== void 0 ? _e : "";
        message.subTokenIds = ((_f = object.subTokenIds) === null || _f === void 0 ? void 0 : _f.map((e) => e)) || [];
        return message;
    },
};
function createBaseEventUpdateToken() {
    return { sender: "", id: "", uri: "" };
}
export const EventUpdateToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.uri !== "") {
            writer.uint32(26).string(message.uri);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.uri = reader.string();
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
            id: isSet(object.id) ? String(object.id) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        message.uri !== undefined && (obj.uri = message.uri);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventUpdateToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.uri = (_c = object.uri) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventUpdateReserve() {
    return { sender: "", id: "", reserve: "", refill: "", subTokenIds: [] };
}
export const EventUpdateReserve = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.reserve !== "") {
            writer.uint32(26).string(message.reserve);
        }
        if (message.refill !== "") {
            writer.uint32(34).string(message.refill);
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
        const message = createBaseEventUpdateReserve();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.reserve = reader.string();
                    break;
                case 4:
                    message.refill = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            id: isSet(object.id) ? String(object.id) : "",
            reserve: isSet(object.reserve) ? String(object.reserve) : "",
            refill: isSet(object.refill) ? String(object.refill) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        message.reserve !== undefined && (obj.reserve = message.reserve);
        message.refill !== undefined && (obj.refill = message.refill);
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
        const message = createBaseEventUpdateReserve();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.reserve = (_c = object.reserve) !== null && _c !== void 0 ? _c : "";
        message.refill = (_d = object.refill) !== null && _d !== void 0 ? _d : "";
        message.subTokenIds = ((_e = object.subTokenIds) === null || _e === void 0 ? void 0 : _e.map((e) => e)) || [];
        return message;
    },
};
function createBaseEventSendToken() {
    return { sender: "", id: "", recipient: "", subTokenIds: [] };
}
export const EventSendToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.recipient !== "") {
            writer.uint32(26).string(message.recipient);
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSendToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.recipient = reader.string();
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
            id: isSet(object.id) ? String(object.id) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        message.recipient !== undefined && (obj.recipient = message.recipient);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEventSendToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.recipient = (_c = object.recipient) !== null && _c !== void 0 ? _c : "";
        message.subTokenIds = ((_d = object.subTokenIds) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function createBaseEventBurnToken() {
    return { sender: "", id: "", return: "", subTokenIds: [] };
}
export const EventBurnToken = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.return !== "") {
            writer.uint32(26).string(message.return);
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.uint32(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventBurnToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.return = reader.string();
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
            id: isSet(object.id) ? String(object.id) : "",
            return: isSet(object.return) ? String(object.return) : "",
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        message.return !== undefined && (obj.return = message.return);
        if (message.subTokenIds) {
            obj.subTokenIds = message.subTokenIds.map((e) => Math.round(e));
        }
        else {
            obj.subTokenIds = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseEventBurnToken();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.return = (_c = object.return) !== null && _c !== void 0 ? _c : "";
        message.subTokenIds = ((_d = object.subTokenIds) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=events.js.map