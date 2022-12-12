/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Collection, SubToken, Token } from "./nft";
export const protobufPackage = "decimal.nft.v1";
function createBaseQueryCollectionsRequest() {
    return { pagination: undefined };
}
export const QueryCollectionsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionsRequest();
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
        const message = createBaseQueryCollectionsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCollectionsResponse() {
    return { collections: [], pagination: undefined };
}
export const QueryCollectionsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.collections) {
            Collection.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collections.push(Collection.decode(reader, reader.uint32()));
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
            collections: Array.isArray(object === null || object === void 0 ? void 0 : object.collections) ? object.collections.map((e) => Collection.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.collections) {
            obj.collections = message.collections.map((e) => e ? Collection.toJSON(e) : undefined);
        }
        else {
            obj.collections = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCollectionsResponse();
        message.collections = ((_a = object.collections) === null || _a === void 0 ? void 0 : _a.map((e) => Collection.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCollectionsByCreatorRequest() {
    return { creator: "", pagination: undefined };
}
export const QueryCollectionsByCreatorRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionsByCreatorRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCollectionsByCreatorRequest();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCollectionsByCreatorResponse() {
    return { collections: [], pagination: undefined };
}
export const QueryCollectionsByCreatorResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.collections) {
            Collection.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionsByCreatorResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collections.push(Collection.decode(reader, reader.uint32()));
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
            collections: Array.isArray(object === null || object === void 0 ? void 0 : object.collections) ? object.collections.map((e) => Collection.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.collections) {
            obj.collections = message.collections.map((e) => e ? Collection.toJSON(e) : undefined);
        }
        else {
            obj.collections = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCollectionsByCreatorResponse();
        message.collections = ((_a = object.collections) === null || _a === void 0 ? void 0 : _a.map((e) => Collection.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryCollectionRequest() {
    return { creator: "", denom: "" };
}
export const QueryCollectionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.denom !== "") {
            writer.uint32(18).string(message.denom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.denom = reader.string();
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
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.denom !== undefined && (obj.denom = message.denom);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryCollectionRequest();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.denom = (_b = object.denom) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseQueryCollectionResponse() {
    return { collection: undefined };
}
export const QueryCollectionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.collection !== undefined) {
            Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collection = Collection.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { collection: isSet(object.collection) ? Collection.fromJSON(object.collection) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.collection !== undefined &&
            (obj.collection = message.collection ? Collection.toJSON(message.collection) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCollectionResponse();
        message.collection = (object.collection !== undefined && object.collection !== null)
            ? Collection.fromPartial(object.collection)
            : undefined;
        return message;
    },
};
function createBaseQueryTokenRequest() {
    return { tokenId: "" };
}
export const QueryTokenRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tokenId !== "") {
            writer.uint32(10).string(message.tokenId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTokenRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tokenId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { tokenId: isSet(object.tokenId) ? String(object.tokenId) : "" };
    },
    toJSON(message) {
        const obj = {};
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTokenRequest();
        message.tokenId = (_a = object.tokenId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryTokenResponse() {
    return { token: undefined };
}
export const QueryTokenResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.token !== undefined) {
            Token.encode(message.token, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTokenResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.token = Token.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { token: isSet(object.token) ? Token.fromJSON(object.token) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.token !== undefined && (obj.token = message.token ? Token.toJSON(message.token) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryTokenResponse();
        message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
        return message;
    },
};
function createBaseQuerySubTokenRequest() {
    return { tokenId: "", subTokenId: "" };
}
export const QuerySubTokenRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tokenId !== "") {
            writer.uint32(10).string(message.tokenId);
        }
        if (message.subTokenId !== "") {
            writer.uint32(18).string(message.subTokenId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySubTokenRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tokenId = reader.string();
                    break;
                case 2:
                    message.subTokenId = reader.string();
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
            tokenId: isSet(object.tokenId) ? String(object.tokenId) : "",
            subTokenId: isSet(object.subTokenId) ? String(object.subTokenId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.tokenId !== undefined && (obj.tokenId = message.tokenId);
        message.subTokenId !== undefined && (obj.subTokenId = message.subTokenId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQuerySubTokenRequest();
        message.tokenId = (_a = object.tokenId) !== null && _a !== void 0 ? _a : "";
        message.subTokenId = (_b = object.subTokenId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseQuerySubTokenResponse() {
    return { subToken: undefined };
}
export const QuerySubTokenResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.subToken !== undefined) {
            SubToken.encode(message.subToken, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQuerySubTokenResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.subToken = SubToken.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { subToken: isSet(object.subToken) ? SubToken.fromJSON(object.subToken) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.subToken !== undefined && (obj.subToken = message.subToken ? SubToken.toJSON(message.subToken) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQuerySubTokenResponse();
        message.subToken = (object.subToken !== undefined && object.subToken !== null)
            ? SubToken.fromPartial(object.subToken)
            : undefined;
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Collections = this.Collections.bind(this);
        this.CollectionsByCreator = this.CollectionsByCreator.bind(this);
        this.Collection = this.Collection.bind(this);
        this.Token = this.Token.bind(this);
        this.SubToken = this.SubToken.bind(this);
    }
    Collections(request) {
        const data = QueryCollectionsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Query", "Collections", data);
        return promise.then((data) => QueryCollectionsResponse.decode(new _m0.Reader(data)));
    }
    CollectionsByCreator(request) {
        const data = QueryCollectionsByCreatorRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Query", "CollectionsByCreator", data);
        return promise.then((data) => QueryCollectionsByCreatorResponse.decode(new _m0.Reader(data)));
    }
    Collection(request) {
        const data = QueryCollectionRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Query", "Collection", data);
        return promise.then((data) => QueryCollectionResponse.decode(new _m0.Reader(data)));
    }
    Token(request) {
        const data = QueryTokenRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Query", "Token", data);
        return promise.then((data) => QueryTokenResponse.decode(new _m0.Reader(data)));
    }
    SubToken(request) {
        const data = QuerySubTokenRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.nft.v1.Query", "SubToken", data);
        return promise.then((data) => QuerySubTokenResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map