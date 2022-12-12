/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Record } from "./legacy";
export const protobufPackage = "decimal.legacy.v1";
function createBaseQueryRecordsRequest() {
    return { pagination: undefined };
}
export const QueryRecordsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRecordsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryRecordsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryRecordsResponse() {
    return { records: [], pagination: undefined };
}
export const QueryRecordsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.records) {
            Record.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRecordsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.records.push(Record.decode(reader, reader.uint32()));
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
            records: Array.isArray(object === null || object === void 0 ? void 0 : object.records) ? object.records.map((e) => Record.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.records) {
            obj.records = message.records.map((e) => e ? Record.toJSON(e) : undefined);
        }
        else {
            obj.records = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryRecordsResponse();
        message.records = ((_a = object.records) === null || _a === void 0 ? void 0 : _a.map((e) => Record.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryRecordRequest() {
    return { legacyAddress: "" };
}
export const QueryRecordRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.legacyAddress !== "") {
            writer.uint32(10).string(message.legacyAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRecordRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.legacyAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { legacyAddress: isSet(object.legacyAddress) ? String(object.legacyAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.legacyAddress !== undefined && (obj.legacyAddress = message.legacyAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryRecordRequest();
        message.legacyAddress = (_a = object.legacyAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryRecordResponse() {
    return { record: undefined };
}
export const QueryRecordResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.record !== undefined) {
            Record.encode(message.record, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryRecordResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.record = Record.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { record: isSet(object.record) ? Record.fromJSON(object.record) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryRecordResponse();
        message.record = (object.record !== undefined && object.record !== null)
            ? Record.fromPartial(object.record)
            : undefined;
        return message;
    },
};
function createBaseQueryCheckRequest() {
    return { pubkey: new Uint8Array() };
}
export const QueryCheckRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pubkey.length !== 0) {
            writer.uint32(10).bytes(message.pubkey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCheckRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubkey = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { pubkey: isSet(object.pubkey) ? bytesFromBase64(object.pubkey) : new Uint8Array() };
    },
    toJSON(message) {
        const obj = {};
        message.pubkey !== undefined &&
            (obj.pubkey = base64FromBytes(message.pubkey !== undefined ? message.pubkey : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCheckRequest();
        message.pubkey = (_a = object.pubkey) !== null && _a !== void 0 ? _a : new Uint8Array();
        return message;
    },
};
function createBaseQueryCheckResponse() {
    return { record: undefined };
}
export const QueryCheckResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.record !== undefined) {
            Record.encode(message.record, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCheckResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.record = Record.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { record: isSet(object.record) ? Record.fromJSON(object.record) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.record !== undefined && (obj.record = message.record ? Record.toJSON(message.record) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCheckResponse();
        message.record = (object.record !== undefined && object.record !== null)
            ? Record.fromPartial(object.record)
            : undefined;
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Records = this.Records.bind(this);
        this.Record = this.Record.bind(this);
        this.Check = this.Check.bind(this);
    }
    Records(request) {
        const data = QueryRecordsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.legacy.v1.Query", "Records", data);
        return promise.then((data) => QueryRecordsResponse.decode(new _m0.Reader(data)));
    }
    Record(request) {
        const data = QueryRecordRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.legacy.v1.Query", "Record", data);
        return promise.then((data) => QueryRecordResponse.decode(new _m0.Reader(data)));
    }
    Check(request) {
        const data = QueryCheckRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.legacy.v1.Query", "Check", data);
        return promise.then((data) => QueryCheckResponse.decode(new _m0.Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
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
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map