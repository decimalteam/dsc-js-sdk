import * as _m0 from "protobufjs/minimal";
import { Coin as Coin1 } from "../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "decimal.coin.v1";
/** Coin defines the coin. */
export interface Coin {
    /** denom defines the coin denomination. */
    denom: string;
    /** title defines the coin title. */
    title: string;
    /** creator defines the address of the account created the coin. */
    creator: string;
    /** crr defines the coin constant reserve ratio determining coin tokenomics. */
    crr: number;
    /** limit_volume defines maximum allowed supply for the coin. */
    limitVolume: string;
    /** identity is a string containing any other information related to the coin. */
    identity: string;
    /**
     * volume defines the coin supply.
     * NOTE: actual values are stored as CoinVR records in KVStore.
     */
    volume: string;
    /**
     * reserve defines the coin reserve in base coin.
     * NOTE: actual values are stored as CoinVR records in KVStore.
     */
    reserve: string;
    /**
     * min_volume defines optional minimal allowed supply for the coin.
     * NOTE: when value is zero it means that the coin does not support minimal supply limitations.
     */
    minVolume: string;
}
/** Check defines the redeemed check. */
export interface Check {
    /** chain_id defines the chain ID for which the check was issued. */
    chainId: string;
    /** coin defines the coin attached to the check. */
    coin: Coin1 | undefined;
    /** nonce defines nonce used for the check. */
    nonce: Uint8Array;
    /** due_block defines block number after which the check becomes expired. */
    dueBlock: number;
    /** lock defines specific data needed to ensure the check correctness. */
    lock: Uint8Array;
    /** v defines `v` value of the check signature. */
    v: string;
    /** r defines `r` value of the check signature. */
    r: string;
    /** s defines `s` value of the check signature. */
    s: string;
}
/** CoinVR defines object containing just volume and reserve of the coin. */
export interface CoinVR {
    /** volume defines the coin supply. */
    volume: string;
    /** reserve defines the coin reserve in base coin. */
    reserve: string;
}
export declare const Coin: {
    encode(message: Coin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Coin;
    fromJSON(object: any): Coin;
    toJSON(message: Coin): unknown;
    fromPartial<I extends {
        denom?: string | undefined;
        title?: string | undefined;
        creator?: string | undefined;
        crr?: number | undefined;
        limitVolume?: string | undefined;
        identity?: string | undefined;
        volume?: string | undefined;
        reserve?: string | undefined;
        minVolume?: string | undefined;
    } & {
        denom?: string | undefined;
        title?: string | undefined;
        creator?: string | undefined;
        crr?: number | undefined;
        limitVolume?: string | undefined;
        identity?: string | undefined;
        volume?: string | undefined;
        reserve?: string | undefined;
        minVolume?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Coin>]: never; }>(object: I): Coin;
};
export declare const Check: {
    encode(message: Check, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Check;
    fromJSON(object: any): Check;
    toJSON(message: Check): unknown;
    fromPartial<I extends {
        chainId?: string | undefined;
        coin?: {
            denom?: string | undefined;
            amount?: string | undefined;
        } | undefined;
        nonce?: Uint8Array | undefined;
        dueBlock?: number | undefined;
        lock?: Uint8Array | undefined;
        v?: string | undefined;
        r?: string | undefined;
        s?: string | undefined;
    } & {
        chainId?: string | undefined;
        coin?: ({
            denom?: string | undefined;
            amount?: string | undefined;
        } & {
            denom?: string | undefined;
            amount?: string | undefined;
        } & { [K in Exclude<keyof I["coin"], keyof Coin1>]: never; }) | undefined;
        nonce?: Uint8Array | undefined;
        dueBlock?: number | undefined;
        lock?: Uint8Array | undefined;
        v?: string | undefined;
        r?: string | undefined;
        s?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Check>]: never; }>(object: I): Check;
};
export declare const CoinVR: {
    encode(message: CoinVR, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CoinVR;
    fromJSON(object: any): CoinVR;
    toJSON(message: CoinVR): unknown;
    fromPartial<I extends {
        volume?: string | undefined;
        reserve?: string | undefined;
    } & {
        volume?: string | undefined;
        reserve?: string | undefined;
    } & { [K in Exclude<keyof I, keyof CoinVR>]: never; }>(object: I): CoinVR;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
