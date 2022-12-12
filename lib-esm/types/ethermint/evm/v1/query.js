/* eslint-disable */
import { PageRequest, PageResponse, } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, TraceConfig, Log } from "./evm";
import { MsgEthereumTx, MsgEthereumTxResponse } from "./tx";
import { Timestamp } from "../../../google/protobuf/timestamp";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
export const protobufPackage = "ethermint.evm.v1";
function createBaseQueryAccountRequest() {
    return { address: "" };
}
export const QueryAccountRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
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
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryAccountRequest();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryAccountResponse() {
    return { balance: "", codeHash: "", nonce: Long.UZERO };
}
export const QueryAccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.balance !== "") {
            writer.uint32(10).string(message.balance);
        }
        if (message.codeHash !== "") {
            writer.uint32(18).string(message.codeHash);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(24).uint64(message.nonce);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balance = reader.string();
                    break;
                case 2:
                    message.codeHash = reader.string();
                    break;
                case 3:
                    message.nonce = reader.uint64();
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
            balance: isSet(object.balance) ? String(object.balance) : "",
            codeHash: isSet(object.codeHash) ? String(object.codeHash) : "",
            nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.balance !== undefined && (obj.balance = message.balance);
        message.codeHash !== undefined && (obj.codeHash = message.codeHash);
        message.nonce !== undefined &&
            (obj.nonce = (message.nonce || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryAccountResponse();
        message.balance = (_a = object.balance) !== null && _a !== void 0 ? _a : "";
        message.codeHash = (_b = object.codeHash) !== null && _b !== void 0 ? _b : "";
        message.nonce =
            object.nonce !== undefined && object.nonce !== null
                ? Long.fromValue(object.nonce)
                : Long.UZERO;
        return message;
    },
};
function createBaseQueryCosmosAccountRequest() {
    return { address: "" };
}
export const QueryCosmosAccountRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCosmosAccountRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
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
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCosmosAccountRequest();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryCosmosAccountResponse() {
    return { cosmosAddress: "", sequence: Long.UZERO, accountNumber: Long.UZERO };
}
export const QueryCosmosAccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.cosmosAddress !== "") {
            writer.uint32(10).string(message.cosmosAddress);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(16).uint64(message.sequence);
        }
        if (!message.accountNumber.isZero()) {
            writer.uint32(24).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCosmosAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cosmosAddress = reader.string();
                    break;
                case 2:
                    message.sequence = reader.uint64();
                    break;
                case 3:
                    message.accountNumber = reader.uint64();
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
            cosmosAddress: isSet(object.cosmosAddress)
                ? String(object.cosmosAddress)
                : "",
            sequence: isSet(object.sequence)
                ? Long.fromValue(object.sequence)
                : Long.UZERO,
            accountNumber: isSet(object.accountNumber)
                ? Long.fromValue(object.accountNumber)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.cosmosAddress !== undefined &&
            (obj.cosmosAddress = message.cosmosAddress);
        message.sequence !== undefined &&
            (obj.sequence = (message.sequence || Long.UZERO).toString());
        message.accountNumber !== undefined &&
            (obj.accountNumber = (message.accountNumber || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCosmosAccountResponse();
        message.cosmosAddress = (_a = object.cosmosAddress) !== null && _a !== void 0 ? _a : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? Long.fromValue(object.sequence)
                : Long.UZERO;
        message.accountNumber =
            object.accountNumber !== undefined && object.accountNumber !== null
                ? Long.fromValue(object.accountNumber)
                : Long.UZERO;
        return message;
    },
};
function createBaseQueryValidatorAccountRequest() {
    return { consAddress: "" };
}
export const QueryValidatorAccountRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.consAddress !== "") {
            writer.uint32(10).string(message.consAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorAccountRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consAddress = reader.string();
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
            consAddress: isSet(object.consAddress) ? String(object.consAddress) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.consAddress !== undefined &&
            (obj.consAddress = message.consAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryValidatorAccountRequest();
        message.consAddress = (_a = object.consAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryValidatorAccountResponse() {
    return {
        accountAddress: "",
        sequence: Long.UZERO,
        accountNumber: Long.UZERO,
    };
}
export const QueryValidatorAccountResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.accountAddress !== "") {
            writer.uint32(10).string(message.accountAddress);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(16).uint64(message.sequence);
        }
        if (!message.accountNumber.isZero()) {
            writer.uint32(24).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorAccountResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.accountAddress = reader.string();
                    break;
                case 2:
                    message.sequence = reader.uint64();
                    break;
                case 3:
                    message.accountNumber = reader.uint64();
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
            accountAddress: isSet(object.accountAddress)
                ? String(object.accountAddress)
                : "",
            sequence: isSet(object.sequence)
                ? Long.fromValue(object.sequence)
                : Long.UZERO,
            accountNumber: isSet(object.accountNumber)
                ? Long.fromValue(object.accountNumber)
                : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.accountAddress !== undefined &&
            (obj.accountAddress = message.accountAddress);
        message.sequence !== undefined &&
            (obj.sequence = (message.sequence || Long.UZERO).toString());
        message.accountNumber !== undefined &&
            (obj.accountNumber = (message.accountNumber || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryValidatorAccountResponse();
        message.accountAddress = (_a = object.accountAddress) !== null && _a !== void 0 ? _a : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? Long.fromValue(object.sequence)
                : Long.UZERO;
        message.accountNumber =
            object.accountNumber !== undefined && object.accountNumber !== null
                ? Long.fromValue(object.accountNumber)
                : Long.UZERO;
        return message;
    },
};
function createBaseQueryBalanceRequest() {
    return { address: "" };
}
export const QueryBalanceRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBalanceRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
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
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryBalanceRequest();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryBalanceResponse() {
    return { balance: "" };
}
export const QueryBalanceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.balance !== "") {
            writer.uint32(10).string(message.balance);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBalanceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.balance = reader.string();
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
            balance: isSet(object.balance) ? String(object.balance) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.balance !== undefined && (obj.balance = message.balance);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryBalanceResponse();
        message.balance = (_a = object.balance) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryStorageRequest() {
    return { address: "", key: "" };
}
export const QueryStorageRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.key !== "") {
            writer.uint32(18).string(message.key);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryStorageRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.key = reader.string();
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
            address: isSet(object.address) ? String(object.address) : "",
            key: isSet(object.key) ? String(object.key) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.key !== undefined && (obj.key = message.key);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryStorageRequest();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.key = (_b = object.key) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseQueryStorageResponse() {
    return { value: "" };
}
export const QueryStorageResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.value !== "") {
            writer.uint32(10).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryStorageResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.string();
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
            value: isSet(object.value) ? String(object.value) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.value !== undefined && (obj.value = message.value);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryStorageResponse();
        message.value = (_a = object.value) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryCodeRequest() {
    return { address: "" };
}
export const QueryCodeRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCodeRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
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
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCodeRequest();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryCodeResponse() {
    return { code: new Uint8Array() };
}
export const QueryCodeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.code.length !== 0) {
            writer.uint32(10).bytes(message.code);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.code = reader.bytes();
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
            code: isSet(object.code)
                ? bytesFromBase64(object.code)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.code !== undefined &&
            (obj.code = base64FromBytes(message.code !== undefined ? message.code : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCodeResponse();
        message.code = (_a = object.code) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseQueryTxLogsRequest() {
    return { hash: "", pagination: undefined };
}
export const QueryTxLogsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.hash !== "") {
            writer.uint32(10).string(message.hash);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTxLogsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hash = reader.string();
                    break;
                case 2:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
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
            hash: isSet(object.hash) ? String(object.hash) : "",
            pagination: isSet(object.pagination)
                ? PageRequest.fromJSON(object.pagination)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hash !== undefined && (obj.hash = message.hash);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTxLogsRequest();
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
function createBaseQueryTxLogsResponse() {
    return { logs: [], pagination: undefined };
}
export const QueryTxLogsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.logs) {
            Log.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTxLogsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.logs.push(Log.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
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
            logs: Array.isArray(object === null || object === void 0 ? void 0 : object.logs)
                ? object.logs.map((e) => Log.fromJSON(e))
                : [],
            pagination: isSet(object.pagination)
                ? PageResponse.fromJSON(object.pagination)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.logs) {
            obj.logs = message.logs.map((e) => (e ? Log.toJSON(e) : undefined));
        }
        else {
            obj.logs = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? PageResponse.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTxLogsResponse();
        message.logs = ((_a = object.logs) === null || _a === void 0 ? void 0 : _a.map((e) => Log.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
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
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
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
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params =
            object.params !== undefined && object.params !== null
                ? Params.fromPartial(object.params)
                : undefined;
        return message;
    },
};
function createBaseEthCallRequest() {
    return { args: new Uint8Array(), gasCap: Long.UZERO };
}
export const EthCallRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.args.length !== 0) {
            writer.uint32(10).bytes(message.args);
        }
        if (!message.gasCap.isZero()) {
            writer.uint32(16).uint64(message.gasCap);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEthCallRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.args = reader.bytes();
                    break;
                case 2:
                    message.gasCap = reader.uint64();
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
            args: isSet(object.args)
                ? bytesFromBase64(object.args)
                : new Uint8Array(),
            gasCap: isSet(object.gasCap) ? Long.fromValue(object.gasCap) : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.args !== undefined &&
            (obj.args = base64FromBytes(message.args !== undefined ? message.args : new Uint8Array()));
        message.gasCap !== undefined &&
            (obj.gasCap = (message.gasCap || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEthCallRequest();
        message.args = (_a = object.args) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.gasCap =
            object.gasCap !== undefined && object.gasCap !== null
                ? Long.fromValue(object.gasCap)
                : Long.UZERO;
        return message;
    },
};
function createBaseEstimateGasResponse() {
    return { gas: Long.UZERO };
}
export const EstimateGasResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (!message.gas.isZero()) {
            writer.uint32(8).uint64(message.gas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEstimateGasResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gas = reader.uint64();
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
            gas: isSet(object.gas) ? Long.fromValue(object.gas) : Long.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.gas !== undefined &&
            (obj.gas = (message.gas || Long.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseEstimateGasResponse();
        message.gas =
            object.gas !== undefined && object.gas !== null
                ? Long.fromValue(object.gas)
                : Long.UZERO;
        return message;
    },
};
function createBaseQueryTraceTxRequest() {
    return {
        msg: undefined,
        traceConfig: undefined,
        predecessors: [],
        blockNumber: Long.ZERO,
        blockHash: "",
        blockTime: undefined,
    };
}
export const QueryTraceTxRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.msg !== undefined) {
            MsgEthereumTx.encode(message.msg, writer.uint32(10).fork()).ldelim();
        }
        if (message.traceConfig !== undefined) {
            TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.predecessors) {
            MsgEthereumTx.encode(v, writer.uint32(34).fork()).ldelim();
        }
        if (!message.blockNumber.isZero()) {
            writer.uint32(40).int64(message.blockNumber);
        }
        if (message.blockHash !== "") {
            writer.uint32(50).string(message.blockHash);
        }
        if (message.blockTime !== undefined) {
            Timestamp.encode(message.blockTime, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTraceTxRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = MsgEthereumTx.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.traceConfig = TraceConfig.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.predecessors.push(MsgEthereumTx.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.blockNumber = reader.int64();
                    break;
                case 6:
                    message.blockHash = reader.string();
                    break;
                case 7:
                    message.blockTime = Timestamp.decode(reader, reader.uint32());
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
            msg: isSet(object.msg) ? MsgEthereumTx.fromJSON(object.msg) : undefined,
            traceConfig: isSet(object.traceConfig)
                ? TraceConfig.fromJSON(object.traceConfig)
                : undefined,
            predecessors: Array.isArray(object === null || object === void 0 ? void 0 : object.predecessors)
                ? object.predecessors.map((e) => MsgEthereumTx.fromJSON(e))
                : [],
            blockNumber: isSet(object.blockNumber)
                ? Long.fromValue(object.blockNumber)
                : Long.ZERO,
            blockHash: isSet(object.blockHash) ? String(object.blockHash) : "",
            blockTime: isSet(object.blockTime)
                ? Timestamp.fromJSON(object.blockTime)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined &&
            (obj.msg = message.msg ? MsgEthereumTx.toJSON(message.msg) : undefined);
        message.traceConfig !== undefined &&
            (obj.traceConfig = message.traceConfig
                ? TraceConfig.toJSON(message.traceConfig)
                : undefined);
        if (message.predecessors) {
            obj.predecessors = message.predecessors.map((e) => e ? MsgEthereumTx.toJSON(e) : undefined);
        }
        else {
            obj.predecessors = [];
        }
        message.blockNumber !== undefined &&
            (obj.blockNumber = (message.blockNumber || Long.ZERO).toString());
        message.blockHash !== undefined && (obj.blockHash = message.blockHash);
        message.blockTime !== undefined &&
            (obj.blockTime = message.blockTime
                ? Timestamp.toJSON(message.blockTime)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryTraceTxRequest();
        message.msg =
            object.msg !== undefined && object.msg !== null
                ? MsgEthereumTx.fromPartial(object.msg)
                : undefined;
        message.traceConfig =
            object.traceConfig !== undefined && object.traceConfig !== null
                ? TraceConfig.fromPartial(object.traceConfig)
                : undefined;
        message.predecessors =
            ((_a = object.predecessors) === null || _a === void 0 ? void 0 : _a.map((e) => MsgEthereumTx.fromPartial(e))) || [];
        message.blockNumber =
            object.blockNumber !== undefined && object.blockNumber !== null
                ? Long.fromValue(object.blockNumber)
                : Long.ZERO;
        message.blockHash = (_b = object.blockHash) !== null && _b !== void 0 ? _b : "";
        message.blockTime =
            object.blockTime !== undefined && object.blockTime !== null
                ? Timestamp.fromPartial(object.blockTime)
                : undefined;
        return message;
    },
};
function createBaseQueryTraceTxResponse() {
    return { data: new Uint8Array() };
}
export const QueryTraceTxResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTraceTxResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTraceTxResponse();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseQueryTraceBlockRequest() {
    return {
        txs: [],
        traceConfig: undefined,
        blockNumber: Long.ZERO,
        blockHash: "",
        blockTime: undefined,
    };
}
export const QueryTraceBlockRequest = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.txs) {
            MsgEthereumTx.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.traceConfig !== undefined) {
            TraceConfig.encode(message.traceConfig, writer.uint32(26).fork()).ldelim();
        }
        if (!message.blockNumber.isZero()) {
            writer.uint32(40).int64(message.blockNumber);
        }
        if (message.blockHash !== "") {
            writer.uint32(50).string(message.blockHash);
        }
        if (message.blockTime !== undefined) {
            Timestamp.encode(message.blockTime, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTraceBlockRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txs.push(MsgEthereumTx.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.traceConfig = TraceConfig.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.blockNumber = reader.int64();
                    break;
                case 6:
                    message.blockHash = reader.string();
                    break;
                case 7:
                    message.blockTime = Timestamp.decode(reader, reader.uint32());
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
            txs: Array.isArray(object === null || object === void 0 ? void 0 : object.txs)
                ? object.txs.map((e) => MsgEthereumTx.fromJSON(e))
                : [],
            traceConfig: isSet(object.traceConfig)
                ? TraceConfig.fromJSON(object.traceConfig)
                : undefined,
            blockNumber: isSet(object.blockNumber)
                ? Long.fromValue(object.blockNumber)
                : Long.ZERO,
            blockHash: isSet(object.blockHash) ? String(object.blockHash) : "",
            blockTime: isSet(object.blockTime)
                ? Timestamp.fromJSON(object.blockTime)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.txs) {
            obj.txs = message.txs.map((e) => e ? MsgEthereumTx.toJSON(e) : undefined);
        }
        else {
            obj.txs = [];
        }
        message.traceConfig !== undefined &&
            (obj.traceConfig = message.traceConfig
                ? TraceConfig.toJSON(message.traceConfig)
                : undefined);
        message.blockNumber !== undefined &&
            (obj.blockNumber = (message.blockNumber || Long.ZERO).toString());
        message.blockHash !== undefined && (obj.blockHash = message.blockHash);
        message.blockTime !== undefined &&
            (obj.blockTime = message.blockTime
                ? Timestamp.toJSON(message.blockTime)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryTraceBlockRequest();
        message.txs = ((_a = object.txs) === null || _a === void 0 ? void 0 : _a.map((e) => MsgEthereumTx.fromPartial(e))) || [];
        message.traceConfig =
            object.traceConfig !== undefined && object.traceConfig !== null
                ? TraceConfig.fromPartial(object.traceConfig)
                : undefined;
        message.blockNumber =
            object.blockNumber !== undefined && object.blockNumber !== null
                ? Long.fromValue(object.blockNumber)
                : Long.ZERO;
        message.blockHash = (_b = object.blockHash) !== null && _b !== void 0 ? _b : "";
        message.blockTime =
            object.blockTime !== undefined && object.blockTime !== null
                ? Timestamp.fromPartial(object.blockTime)
                : undefined;
        return message;
    },
};
function createBaseQueryTraceBlockResponse() {
    return { data: new Uint8Array() };
}
export const QueryTraceBlockResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTraceBlockResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.data = reader.bytes();
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
            data: isSet(object.data)
                ? bytesFromBase64(object.data)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTraceBlockResponse();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseQueryBaseFeeRequest() {
    return {};
}
export const QueryBaseFeeRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBaseFeeRequest();
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
        const message = createBaseQueryBaseFeeRequest();
        return message;
    },
};
function createBaseQueryBaseFeeResponse() {
    return { baseFee: "" };
}
export const QueryBaseFeeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.baseFee !== "") {
            writer.uint32(10).string(message.baseFee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryBaseFeeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.baseFee = reader.string();
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
            baseFee: isSet(object.baseFee) ? String(object.baseFee) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.baseFee !== undefined && (obj.baseFee = message.baseFee);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryBaseFeeResponse();
        message.baseFee = (_a = object.baseFee) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Account = this.Account.bind(this);
        this.CosmosAccount = this.CosmosAccount.bind(this);
        this.ValidatorAccount = this.ValidatorAccount.bind(this);
        this.Balance = this.Balance.bind(this);
        this.Storage = this.Storage.bind(this);
        this.Code = this.Code.bind(this);
        this.Params = this.Params.bind(this);
        this.EthCall = this.EthCall.bind(this);
        this.EstimateGas = this.EstimateGas.bind(this);
        this.TraceTx = this.TraceTx.bind(this);
        this.TraceBlock = this.TraceBlock.bind(this);
        this.BaseFee = this.BaseFee.bind(this);
    }
    Account(request) {
        const data = QueryAccountRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "Account", data);
        return promise.then((data) => QueryAccountResponse.decode(new _m0.Reader(data)));
    }
    CosmosAccount(request) {
        const data = QueryCosmosAccountRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "CosmosAccount", data);
        return promise.then((data) => QueryCosmosAccountResponse.decode(new _m0.Reader(data)));
    }
    ValidatorAccount(request) {
        const data = QueryValidatorAccountRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "ValidatorAccount", data);
        return promise.then((data) => QueryValidatorAccountResponse.decode(new _m0.Reader(data)));
    }
    Balance(request) {
        const data = QueryBalanceRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "Balance", data);
        return promise.then((data) => QueryBalanceResponse.decode(new _m0.Reader(data)));
    }
    Storage(request) {
        const data = QueryStorageRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "Storage", data);
        return promise.then((data) => QueryStorageResponse.decode(new _m0.Reader(data)));
    }
    Code(request) {
        const data = QueryCodeRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "Code", data);
        return promise.then((data) => QueryCodeResponse.decode(new _m0.Reader(data)));
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }
    EthCall(request) {
        const data = EthCallRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "EthCall", data);
        return promise.then((data) => MsgEthereumTxResponse.decode(new _m0.Reader(data)));
    }
    EstimateGas(request) {
        const data = EthCallRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "EstimateGas", data);
        return promise.then((data) => EstimateGasResponse.decode(new _m0.Reader(data)));
    }
    TraceTx(request) {
        const data = QueryTraceTxRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceTx", data);
        return promise.then((data) => QueryTraceTxResponse.decode(new _m0.Reader(data)));
    }
    TraceBlock(request) {
        const data = QueryTraceBlockRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceBlock", data);
        return promise.then((data) => QueryTraceBlockResponse.decode(new _m0.Reader(data)));
    }
    BaseFee(request) {
        const data = QueryBaseFeeRequest.encode(request).finish();
        const promise = this.rpc.request("ethermint.evm.v1.Query", "BaseFee", data);
        return promise.then((data) => QueryBaseFeeResponse.decode(new _m0.Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (globalThis.Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (globalThis.Buffer) {
        return globalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(""));
    }
}
// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map