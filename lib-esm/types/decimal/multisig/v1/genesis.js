/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Transaction, Wallet } from "./multisig";
import { Params } from "./params";
export const protobufPackage = "decimal.multisig.v1";
function createBaseGenesisState() {
    return { wallets: [], transactions: [], params: undefined };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.wallets) {
            Wallet.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.transactions) {
            Transaction.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.wallets.push(Wallet.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.transactions.push(Transaction.decode(reader, reader.uint32()));
                    break;
                case 3:
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
            wallets: Array.isArray(object === null || object === void 0 ? void 0 : object.wallets) ? object.wallets.map((e) => Wallet.fromJSON(e)) : [],
            transactions: Array.isArray(object === null || object === void 0 ? void 0 : object.transactions)
                ? object.transactions.map((e) => Transaction.fromJSON(e))
                : [],
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
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
        if (message.transactions) {
            obj.transactions = message.transactions.map((e) => e ? Transaction.toJSON(e) : undefined);
        }
        else {
            obj.transactions = [];
        }
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseGenesisState();
        message.wallets = ((_a = object.wallets) === null || _a === void 0 ? void 0 : _a.map((e) => Wallet.fromPartial(e))) || [];
        message.transactions = ((_b = object.transactions) === null || _b === void 0 ? void 0 : _b.map((e) => Transaction.fromPartial(e))) || [];
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=genesis.js.map