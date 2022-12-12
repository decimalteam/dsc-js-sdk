/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../cosmos/base/v1beta1/coin";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Header } from "../../tendermint/types/types";
export const protobufPackage = "decimal.validator.v1";
/** BondStatus is the status of a validator. */
export var BondStatus;
(function (BondStatus) {
    /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
    BondStatus[BondStatus["BOND_STATUS_UNSPECIFIED"] = 0] = "BOND_STATUS_UNSPECIFIED";
    /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDED"] = 1] = "BOND_STATUS_UNBONDED";
    /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDING"] = 2] = "BOND_STATUS_UNBONDING";
    /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
    BondStatus[BondStatus["BOND_STATUS_BONDED"] = 3] = "BOND_STATUS_BONDED";
    BondStatus[BondStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BondStatus || (BondStatus = {}));
export function bondStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "BOND_STATUS_UNSPECIFIED":
            return BondStatus.BOND_STATUS_UNSPECIFIED;
        case 1:
        case "BOND_STATUS_UNBONDED":
            return BondStatus.BOND_STATUS_UNBONDED;
        case 2:
        case "BOND_STATUS_UNBONDING":
            return BondStatus.BOND_STATUS_UNBONDING;
        case 3:
        case "BOND_STATUS_BONDED":
            return BondStatus.BOND_STATUS_BONDED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BondStatus.UNRECOGNIZED;
    }
}
export function bondStatusToJSON(object) {
    switch (object) {
        case BondStatus.BOND_STATUS_UNSPECIFIED:
            return "BOND_STATUS_UNSPECIFIED";
        case BondStatus.BOND_STATUS_UNBONDED:
            return "BOND_STATUS_UNBONDED";
        case BondStatus.BOND_STATUS_UNBONDING:
            return "BOND_STATUS_UNBONDING";
        case BondStatus.BOND_STATUS_BONDED:
            return "BOND_STATUS_BONDED";
        case BondStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
/** StakeType is the type of a delegation stake. */
export var StakeType;
(function (StakeType) {
    /** STAKE_TYPE_UNSPECIFIED - UNSPECIFIED defines an invalid stake type. */
    StakeType[StakeType["STAKE_TYPE_UNSPECIFIED"] = 0] = "STAKE_TYPE_UNSPECIFIED";
    /** STAKE_TYPE_COIN - COIN defines the type for stakes in coin. */
    StakeType[StakeType["STAKE_TYPE_COIN"] = 1] = "STAKE_TYPE_COIN";
    /** STAKE_TYPE_NFT - NFT defines the type for stakes in NFT. */
    StakeType[StakeType["STAKE_TYPE_NFT"] = 2] = "STAKE_TYPE_NFT";
    StakeType[StakeType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(StakeType || (StakeType = {}));
export function stakeTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "STAKE_TYPE_UNSPECIFIED":
            return StakeType.STAKE_TYPE_UNSPECIFIED;
        case 1:
        case "STAKE_TYPE_COIN":
            return StakeType.STAKE_TYPE_COIN;
        case 2:
        case "STAKE_TYPE_NFT":
            return StakeType.STAKE_TYPE_NFT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return StakeType.UNRECOGNIZED;
    }
}
export function stakeTypeToJSON(object) {
    switch (object) {
        case StakeType.STAKE_TYPE_UNSPECIFIED:
            return "STAKE_TYPE_UNSPECIFIED";
        case StakeType.STAKE_TYPE_COIN:
            return "STAKE_TYPE_COIN";
        case StakeType.STAKE_TYPE_NFT:
            return "STAKE_TYPE_NFT";
        case StakeType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseValidator() {
    return {
        operatorAddress: "",
        rewardAddress: "",
        consensusPubkey: undefined,
        description: undefined,
        commission: "",
        status: 0,
        online: false,
        jailed: false,
        unbondingHeight: 0,
        unbondingTime: undefined,
        rewards: "",
        totalRewards: "",
    };
}
export const Validator = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        if (message.rewardAddress !== "") {
            writer.uint32(18).string(message.rewardAddress);
        }
        if (message.consensusPubkey !== undefined) {
            Any.encode(message.consensusPubkey, writer.uint32(26).fork()).ldelim();
        }
        if (message.description !== undefined) {
            Description.encode(message.description, writer.uint32(34).fork()).ldelim();
        }
        if (message.commission !== "") {
            writer.uint32(42).string(message.commission);
        }
        if (message.status !== 0) {
            writer.uint32(48).int32(message.status);
        }
        if (message.online === true) {
            writer.uint32(56).bool(message.online);
        }
        if (message.jailed === true) {
            writer.uint32(64).bool(message.jailed);
        }
        if (message.unbondingHeight !== 0) {
            writer.uint32(72).int64(message.unbondingHeight);
        }
        if (message.unbondingTime !== undefined) {
            Timestamp.encode(toTimestamp(message.unbondingTime), writer.uint32(82).fork()).ldelim();
        }
        if (message.rewards !== "") {
            writer.uint32(90).string(message.rewards);
        }
        if (message.totalRewards !== "") {
            writer.uint32(98).string(message.totalRewards);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.rewardAddress = reader.string();
                    break;
                case 3:
                    message.consensusPubkey = Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.description = Description.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.commission = reader.string();
                    break;
                case 6:
                    message.status = reader.int32();
                    break;
                case 7:
                    message.online = reader.bool();
                    break;
                case 8:
                    message.jailed = reader.bool();
                    break;
                case 9:
                    message.unbondingHeight = longToNumber(reader.int64());
                    break;
                case 10:
                    message.unbondingTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 11:
                    message.rewards = reader.string();
                    break;
                case 12:
                    message.totalRewards = reader.string();
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
            operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
            rewardAddress: isSet(object.rewardAddress) ? String(object.rewardAddress) : "",
            consensusPubkey: isSet(object.consensusPubkey) ? Any.fromJSON(object.consensusPubkey) : undefined,
            description: isSet(object.description) ? Description.fromJSON(object.description) : undefined,
            commission: isSet(object.commission) ? String(object.commission) : "",
            status: isSet(object.status) ? bondStatusFromJSON(object.status) : 0,
            online: isSet(object.online) ? Boolean(object.online) : false,
            jailed: isSet(object.jailed) ? Boolean(object.jailed) : false,
            unbondingHeight: isSet(object.unbondingHeight) ? Number(object.unbondingHeight) : 0,
            unbondingTime: isSet(object.unbondingTime) ? fromJsonTimestamp(object.unbondingTime) : undefined,
            rewards: isSet(object.rewards) ? String(object.rewards) : "",
            totalRewards: isSet(object.totalRewards) ? String(object.totalRewards) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.operatorAddress !== undefined && (obj.operatorAddress = message.operatorAddress);
        message.rewardAddress !== undefined && (obj.rewardAddress = message.rewardAddress);
        message.consensusPubkey !== undefined &&
            (obj.consensusPubkey = message.consensusPubkey ? Any.toJSON(message.consensusPubkey) : undefined);
        message.description !== undefined &&
            (obj.description = message.description ? Description.toJSON(message.description) : undefined);
        message.commission !== undefined && (obj.commission = message.commission);
        message.status !== undefined && (obj.status = bondStatusToJSON(message.status));
        message.online !== undefined && (obj.online = message.online);
        message.jailed !== undefined && (obj.jailed = message.jailed);
        message.unbondingHeight !== undefined && (obj.unbondingHeight = Math.round(message.unbondingHeight));
        message.unbondingTime !== undefined && (obj.unbondingTime = message.unbondingTime.toISOString());
        message.rewards !== undefined && (obj.rewards = message.rewards);
        message.totalRewards !== undefined && (obj.totalRewards = message.totalRewards);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const message = createBaseValidator();
        message.operatorAddress = (_a = object.operatorAddress) !== null && _a !== void 0 ? _a : "";
        message.rewardAddress = (_b = object.rewardAddress) !== null && _b !== void 0 ? _b : "";
        message.consensusPubkey = (object.consensusPubkey !== undefined && object.consensusPubkey !== null)
            ? Any.fromPartial(object.consensusPubkey)
            : undefined;
        message.description = (object.description !== undefined && object.description !== null)
            ? Description.fromPartial(object.description)
            : undefined;
        message.commission = (_c = object.commission) !== null && _c !== void 0 ? _c : "";
        message.status = (_d = object.status) !== null && _d !== void 0 ? _d : 0;
        message.online = (_e = object.online) !== null && _e !== void 0 ? _e : false;
        message.jailed = (_f = object.jailed) !== null && _f !== void 0 ? _f : false;
        message.unbondingHeight = (_g = object.unbondingHeight) !== null && _g !== void 0 ? _g : 0;
        message.unbondingTime = (_h = object.unbondingTime) !== null && _h !== void 0 ? _h : undefined;
        message.rewards = (_j = object.rewards) !== null && _j !== void 0 ? _j : "";
        message.totalRewards = (_k = object.totalRewards) !== null && _k !== void 0 ? _k : "";
        return message;
    },
};
function createBaseValAddresses() {
    return { addresses: [] };
}
export const ValAddresses = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.addresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValAddresses();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addresses.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return { addresses: Array.isArray(object === null || object === void 0 ? void 0 : object.addresses) ? object.addresses.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.addresses) {
            obj.addresses = message.addresses.map((e) => e);
        }
        else {
            obj.addresses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseValAddresses();
        message.addresses = ((_a = object.addresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseDescription() {
    return { moniker: "", identity: "", website: "", securityContact: "", details: "" };
}
export const Description = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.moniker !== "") {
            writer.uint32(10).string(message.moniker);
        }
        if (message.identity !== "") {
            writer.uint32(18).string(message.identity);
        }
        if (message.website !== "") {
            writer.uint32(26).string(message.website);
        }
        if (message.securityContact !== "") {
            writer.uint32(34).string(message.securityContact);
        }
        if (message.details !== "") {
            writer.uint32(42).string(message.details);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDescription();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.moniker = reader.string();
                    break;
                case 2:
                    message.identity = reader.string();
                    break;
                case 3:
                    message.website = reader.string();
                    break;
                case 4:
                    message.securityContact = reader.string();
                    break;
                case 5:
                    message.details = reader.string();
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
            moniker: isSet(object.moniker) ? String(object.moniker) : "",
            identity: isSet(object.identity) ? String(object.identity) : "",
            website: isSet(object.website) ? String(object.website) : "",
            securityContact: isSet(object.securityContact) ? String(object.securityContact) : "",
            details: isSet(object.details) ? String(object.details) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.moniker !== undefined && (obj.moniker = message.moniker);
        message.identity !== undefined && (obj.identity = message.identity);
        message.website !== undefined && (obj.website = message.website);
        message.securityContact !== undefined && (obj.securityContact = message.securityContact);
        message.details !== undefined && (obj.details = message.details);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseDescription();
        message.moniker = (_a = object.moniker) !== null && _a !== void 0 ? _a : "";
        message.identity = (_b = object.identity) !== null && _b !== void 0 ? _b : "";
        message.website = (_c = object.website) !== null && _c !== void 0 ? _c : "";
        message.securityContact = (_d = object.securityContact) !== null && _d !== void 0 ? _d : "";
        message.details = (_e = object.details) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
function createBaseStake() {
    return { type: 0, id: "", stake: undefined, subTokenIds: [] };
}
export const Stake = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.stake !== undefined) {
            Coin.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        writer.uint32(34).fork();
        for (const v of message.subTokenIds) {
            writer.int64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStake();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.stake = Coin.decode(reader, reader.uint32());
                    break;
                case 4:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.subTokenIds.push(longToNumber(reader.int64()));
                        }
                    }
                    else {
                        message.subTokenIds.push(longToNumber(reader.int64()));
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
            type: isSet(object.type) ? stakeTypeFromJSON(object.type) : 0,
            id: isSet(object.id) ? String(object.id) : "",
            stake: isSet(object.stake) ? Coin.fromJSON(object.stake) : undefined,
            subTokenIds: Array.isArray(object === null || object === void 0 ? void 0 : object.subTokenIds) ? object.subTokenIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.type !== undefined && (obj.type = stakeTypeToJSON(message.type));
        message.id !== undefined && (obj.id = message.id);
        message.stake !== undefined && (obj.stake = message.stake ? Coin.toJSON(message.stake) : undefined);
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
        const message = createBaseStake();
        message.type = (_a = object.type) !== null && _a !== void 0 ? _a : 0;
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Coin.fromPartial(object.stake) : undefined;
        message.subTokenIds = ((_c = object.subTokenIds) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
function createBaseDelegation() {
    return { delegator: "", validator: "", stake: undefined };
}
export const Delegation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseDelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.stake = Stake.decode(reader, reader.uint32());
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
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseDelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseRedelegation() {
    return { delegator: "", validatorSrc: "", validatorDst: "", entries: [] };
}
export const Redelegation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validatorSrc !== "") {
            writer.uint32(18).string(message.validatorSrc);
        }
        if (message.validatorDst !== "") {
            writer.uint32(26).string(message.validatorDst);
        }
        for (const v of message.entries) {
            RedelegationEntry.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validatorSrc = reader.string();
                    break;
                case 3:
                    message.validatorDst = reader.string();
                    break;
                case 4:
                    message.entries.push(RedelegationEntry.decode(reader, reader.uint32()));
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
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validatorSrc: isSet(object.validatorSrc) ? String(object.validatorSrc) : "",
            validatorDst: isSet(object.validatorDst) ? String(object.validatorDst) : "",
            entries: Array.isArray(object === null || object === void 0 ? void 0 : object.entries) ? object.entries.map((e) => RedelegationEntry.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validatorSrc !== undefined && (obj.validatorSrc = message.validatorSrc);
        message.validatorDst !== undefined && (obj.validatorDst = message.validatorDst);
        if (message.entries) {
            obj.entries = message.entries.map((e) => e ? RedelegationEntry.toJSON(e) : undefined);
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = createBaseRedelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validatorSrc = (_b = object.validatorSrc) !== null && _b !== void 0 ? _b : "";
        message.validatorDst = (_c = object.validatorDst) !== null && _c !== void 0 ? _c : "";
        message.entries = ((_d = object.entries) === null || _d === void 0 ? void 0 : _d.map((e) => RedelegationEntry.fromPartial(e))) || [];
        return message;
    },
};
function createBaseRedelegationEntry() {
    return { creationHeight: 0, completionTime: undefined, stake: undefined };
}
export const RedelegationEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creationHeight !== 0) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseRedelegationEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 2:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.stake = Stake.decode(reader, reader.uint32());
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
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined,
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseRedelegationEntry();
        message.creationHeight = (_a = object.creationHeight) !== null && _a !== void 0 ? _a : 0;
        message.completionTime = (_b = object.completionTime) !== null && _b !== void 0 ? _b : undefined;
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseUndelegation() {
    return { delegator: "", validator: "", entries: [] };
}
export const Undelegation = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegator !== "") {
            writer.uint32(10).string(message.delegator);
        }
        if (message.validator !== "") {
            writer.uint32(18).string(message.validator);
        }
        for (const v of message.entries) {
            UndelegationEntry.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUndelegation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegator = reader.string();
                    break;
                case 2:
                    message.validator = reader.string();
                    break;
                case 3:
                    message.entries.push(UndelegationEntry.decode(reader, reader.uint32()));
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
            delegator: isSet(object.delegator) ? String(object.delegator) : "",
            validator: isSet(object.validator) ? String(object.validator) : "",
            entries: Array.isArray(object === null || object === void 0 ? void 0 : object.entries) ? object.entries.map((e) => UndelegationEntry.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.delegator !== undefined && (obj.delegator = message.delegator);
        message.validator !== undefined && (obj.validator = message.validator);
        if (message.entries) {
            obj.entries = message.entries.map((e) => e ? UndelegationEntry.toJSON(e) : undefined);
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseUndelegation();
        message.delegator = (_a = object.delegator) !== null && _a !== void 0 ? _a : "";
        message.validator = (_b = object.validator) !== null && _b !== void 0 ? _b : "";
        message.entries = ((_c = object.entries) === null || _c === void 0 ? void 0 : _c.map((e) => UndelegationEntry.fromPartial(e))) || [];
        return message;
    },
};
function createBaseUndelegationEntry() {
    return { creationHeight: 0, completionTime: undefined, stake: undefined };
}
export const UndelegationEntry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creationHeight !== 0) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            Timestamp.encode(toTimestamp(message.completionTime), writer.uint32(18).fork()).ldelim();
        }
        if (message.stake !== undefined) {
            Stake.encode(message.stake, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUndelegationEntry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = longToNumber(reader.int64());
                    break;
                case 2:
                    message.completionTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.stake = Stake.decode(reader, reader.uint32());
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
            creationHeight: isSet(object.creationHeight) ? Number(object.creationHeight) : 0,
            completionTime: isSet(object.completionTime) ? fromJsonTimestamp(object.completionTime) : undefined,
            stake: isSet(object.stake) ? Stake.fromJSON(object.stake) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creationHeight !== undefined && (obj.creationHeight = Math.round(message.creationHeight));
        message.completionTime !== undefined && (obj.completionTime = message.completionTime.toISOString());
        message.stake !== undefined && (obj.stake = message.stake ? Stake.toJSON(message.stake) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseUndelegationEntry();
        message.creationHeight = (_a = object.creationHeight) !== null && _a !== void 0 ? _a : 0;
        message.completionTime = (_b = object.completionTime) !== null && _b !== void 0 ? _b : undefined;
        message.stake = (object.stake !== undefined && object.stake !== null) ? Stake.fromPartial(object.stake) : undefined;
        return message;
    },
};
function createBaseHistoricalInfo() {
    return { header: undefined, valset: [] };
}
export const HistoricalInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.header !== undefined) {
            Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.valset) {
            Validator.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHistoricalInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.header = Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.valset.push(Validator.decode(reader, reader.uint32()));
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
            header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
            valset: Array.isArray(object === null || object === void 0 ? void 0 : object.valset) ? object.valset.map((e) => Validator.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.header !== undefined && (obj.header = message.header ? Header.toJSON(message.header) : undefined);
        if (message.valset) {
            obj.valset = message.valset.map((e) => e ? Validator.toJSON(e) : undefined);
        }
        else {
            obj.valset = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseHistoricalInfo();
        message.header = (object.header !== undefined && object.header !== null)
            ? Header.fromPartial(object.header)
            : undefined;
        message.valset = ((_a = object.valset) === null || _a === void 0 ? void 0 : _a.map((e) => Validator.fromPartial(e))) || [];
        return message;
    },
};
function createBasePool() {
    return { notBondedTokens: "", bondedTokens: "" };
}
export const Pool = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.notBondedTokens !== "") {
            writer.uint32(10).string(message.notBondedTokens);
        }
        if (message.bondedTokens !== "") {
            writer.uint32(18).string(message.bondedTokens);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.notBondedTokens = reader.string();
                    break;
                case 2:
                    message.bondedTokens = reader.string();
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
            notBondedTokens: isSet(object.notBondedTokens) ? String(object.notBondedTokens) : "",
            bondedTokens: isSet(object.bondedTokens) ? String(object.bondedTokens) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.notBondedTokens !== undefined && (obj.notBondedTokens = message.notBondedTokens);
        message.bondedTokens !== undefined && (obj.bondedTokens = message.bondedTokens);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBasePool();
        message.notBondedTokens = (_a = object.notBondedTokens) !== null && _a !== void 0 ? _a : "";
        message.bondedTokens = (_b = object.bondedTokens) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
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
//# sourceMappingURL=validator.js.map