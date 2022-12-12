/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Transaction, Wallet } from "./multisig";
export const protobufPackage = "decimal.multisig.v1";
function createBaseQueryWalletsRequest() {
    return { owner: "", pagination: undefined };
}
export const QueryWalletsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWalletsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
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
            owner: isSet(object.owner) ? String(object.owner) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWalletsRequest();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryWalletsResponse() {
    return { wallets: [], pagination: undefined };
}
export const QueryWalletsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.wallets) {
            Wallet.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWalletsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.wallets.push(Wallet.decode(reader, reader.uint32()));
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
            wallets: Array.isArray(object === null || object === void 0 ? void 0 : object.wallets) ? object.wallets.map((e) => Wallet.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.wallets) {
            obj.wallets = message.wallets.map((e) => e ? Wallet.toJSON(e) : undefined);
        }
        else {
            obj.wallets = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryWalletsResponse();
        message.wallets = ((_a = object.wallets) === null || _a === void 0 ? void 0 : _a.map((e) => Wallet.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryWalletRequest() {
    return { wallet: "" };
}
export const QueryWalletRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.wallet !== "") {
            writer.uint32(10).string(message.wallet);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWalletRequest();
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
        const message = createBaseQueryWalletRequest();
        message.wallet = (_a = object.wallet) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryWalletResponse() {
    return { wallet: undefined };
}
export const QueryWalletResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.wallet !== undefined) {
            Wallet.encode(message.wallet, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryWalletResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.wallet = Wallet.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { wallet: isSet(object.wallet) ? Wallet.fromJSON(object.wallet) : undefined };
    },
    toJSON(message) {
        const obj = {};
        message.wallet !== undefined && (obj.wallet = message.wallet ? Wallet.toJSON(message.wallet) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryWalletResponse();
        message.wallet = (object.wallet !== undefined && object.wallet !== null)
            ? Wallet.fromPartial(object.wallet)
            : undefined;
        return message;
    },
};
function createBaseQueryTransactionsRequest() {
    return { wallet: "", pagination: undefined };
}
export const QueryTransactionsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.wallet !== "") {
            writer.uint32(10).string(message.wallet);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTransactionsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.wallet = reader.string();
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
            wallet: isSet(object.wallet) ? String(object.wallet) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.wallet !== undefined && (obj.wallet = message.wallet);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTransactionsRequest();
        message.wallet = (_a = object.wallet) !== null && _a !== void 0 ? _a : "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryTransactionsResponse() {
    return { transactions: [], pagination: undefined };
}
export const QueryTransactionsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.transactions) {
            Transaction.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTransactionsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.transactions.push(Transaction.decode(reader, reader.uint32()));
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
            transactions: Array.isArray(object === null || object === void 0 ? void 0 : object.transactions)
                ? object.transactions.map((e) => Transaction.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.transactions) {
            obj.transactions = message.transactions.map((e) => e ? Transaction.toJSON(e) : undefined);
        }
        else {
            obj.transactions = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryTransactionsResponse();
        message.transactions = ((_a = object.transactions) === null || _a === void 0 ? void 0 : _a.map((e) => Transaction.fromPartial(e))) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryTransactionRequest() {
    return { id: "" };
}
export const QueryTransactionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTransactionRequest();
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
        const message = createBaseQueryTransactionRequest();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryTransactionResponse() {
    return { transaction: undefined, signers: [], completed: false };
}
export const QueryTransactionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.transaction !== undefined) {
            Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.signers) {
            writer.uint32(18).string(v);
        }
        if (message.completed === true) {
            writer.uint32(24).bool(message.completed);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryTransactionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.transaction = Transaction.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.signers.push(reader.string());
                    break;
                case 3:
                    message.completed = reader.bool();
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
            transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined,
            signers: Array.isArray(object === null || object === void 0 ? void 0 : object.signers) ? object.signers.map((e) => String(e)) : [],
            completed: isSet(object.completed) ? Boolean(object.completed) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.transaction !== undefined &&
            (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
        if (message.signers) {
            obj.signers = message.signers.map((e) => e);
        }
        else {
            obj.signers = [];
        }
        message.completed !== undefined && (obj.completed = message.completed);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryTransactionResponse();
        message.transaction = (object.transaction !== undefined && object.transaction !== null)
            ? Transaction.fromPartial(object.transaction)
            : undefined;
        message.signers = ((_a = object.signers) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        message.completed = (_b = object.completed) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Wallets = this.Wallets.bind(this);
        this.Wallet = this.Wallet.bind(this);
        this.Transactions = this.Transactions.bind(this);
        this.Transaction = this.Transaction.bind(this);
    }
    Wallets(request) {
        const data = QueryWalletsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Query", "Wallets", data);
        return promise.then((data) => QueryWalletsResponse.decode(new _m0.Reader(data)));
    }
    Wallet(request) {
        const data = QueryWalletRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Query", "Wallet", data);
        return promise.then((data) => QueryWalletResponse.decode(new _m0.Reader(data)));
    }
    Transactions(request) {
        const data = QueryTransactionsRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Query", "Transactions", data);
        return promise.then((data) => QueryTransactionsResponse.decode(new _m0.Reader(data)));
    }
    Transaction(request) {
        const data = QueryTransactionRequest.encode(request).finish();
        const promise = this.rpc.request("decimal.multisig.v1.Query", "Transaction", data);
        return promise.then((data) => QueryTransactionResponse.decode(new _m0.Reader(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map