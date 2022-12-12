/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "decimal.multisig.v1";
function createBaseEventCreateWallet() {
    return { sender: "", wallet: "", owners: [], weights: [], threshold: 0 };
}
export const EventCreateWallet = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wallet !== "") {
            writer.uint32(18).string(message.wallet);
        }
        for (const v of message.owners) {
            writer.uint32(26).string(v);
        }
        writer.uint32(34).fork();
        for (const v of message.weights) {
            writer.uint32(v);
        }
        writer.ldelim();
        if (message.threshold !== 0) {
            writer.uint32(40).uint32(message.threshold);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateWallet();
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
                    message.owners.push(reader.string());
                    break;
                case 4:
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
                case 5:
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
            wallet: isSet(object.wallet) ? String(object.wallet) : "",
            owners: Array.isArray(object === null || object === void 0 ? void 0 : object.owners) ? object.owners.map((e) => String(e)) : [],
            weights: Array.isArray(object === null || object === void 0 ? void 0 : object.weights) ? object.weights.map((e) => Number(e)) : [],
            threshold: isSet(object.threshold) ? Number(object.threshold) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.wallet !== undefined && (obj.wallet = message.wallet);
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
        var _a, _b, _c, _d, _e;
        const message = createBaseEventCreateWallet();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.wallet = (_b = object.wallet) !== null && _b !== void 0 ? _b : "";
        message.owners = ((_c = object.owners) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        message.weights = ((_d = object.weights) === null || _d === void 0 ? void 0 : _d.map((e) => e)) || [];
        message.threshold = (_e = object.threshold) !== null && _e !== void 0 ? _e : 0;
        return message;
    },
};
function createBaseEventCreateTransaction() {
    return { sender: "", wallet: "", transaction: "" };
}
export const EventCreateTransaction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wallet !== "") {
            writer.uint32(18).string(message.wallet);
        }
        if (message.transaction !== "") {
            writer.uint32(34).string(message.transaction);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateTransaction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.wallet = reader.string();
                    break;
                case 4:
                    message.transaction = reader.string();
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
            transaction: isSet(object.transaction) ? String(object.transaction) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.wallet !== undefined && (obj.wallet = message.wallet);
        message.transaction !== undefined && (obj.transaction = message.transaction);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventCreateTransaction();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.wallet = (_b = object.wallet) !== null && _b !== void 0 ? _b : "";
        message.transaction = (_c = object.transaction) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventSignTransaction() {
    return { sender: "", wallet: "", transaction: "", signerWeight: 0, confirmations: 0, confirmed: false };
}
export const EventSignTransaction = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wallet !== "") {
            writer.uint32(18).string(message.wallet);
        }
        if (message.transaction !== "") {
            writer.uint32(26).string(message.transaction);
        }
        if (message.signerWeight !== 0) {
            writer.uint32(32).uint32(message.signerWeight);
        }
        if (message.confirmations !== 0) {
            writer.uint32(40).uint32(message.confirmations);
        }
        if (message.confirmed === true) {
            writer.uint32(48).bool(message.confirmed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSignTransaction();
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
                    message.transaction = reader.string();
                    break;
                case 4:
                    message.signerWeight = reader.uint32();
                    break;
                case 5:
                    message.confirmations = reader.uint32();
                    break;
                case 6:
                    message.confirmed = reader.bool();
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
            transaction: isSet(object.transaction) ? String(object.transaction) : "",
            signerWeight: isSet(object.signerWeight) ? Number(object.signerWeight) : 0,
            confirmations: isSet(object.confirmations) ? Number(object.confirmations) : 0,
            confirmed: isSet(object.confirmed) ? Boolean(object.confirmed) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.wallet !== undefined && (obj.wallet = message.wallet);
        message.transaction !== undefined && (obj.transaction = message.transaction);
        message.signerWeight !== undefined && (obj.signerWeight = Math.round(message.signerWeight));
        message.confirmations !== undefined && (obj.confirmations = Math.round(message.confirmations));
        message.confirmed !== undefined && (obj.confirmed = message.confirmed);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseEventSignTransaction();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.wallet = (_b = object.wallet) !== null && _b !== void 0 ? _b : "";
        message.transaction = (_c = object.transaction) !== null && _c !== void 0 ? _c : "";
        message.signerWeight = (_d = object.signerWeight) !== null && _d !== void 0 ? _d : 0;
        message.confirmations = (_e = object.confirmations) !== null && _e !== void 0 ? _e : 0;
        message.confirmed = (_f = object.confirmed) !== null && _f !== void 0 ? _f : false;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=events.js.map