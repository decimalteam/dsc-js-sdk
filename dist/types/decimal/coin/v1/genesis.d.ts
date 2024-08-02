import * as _m0 from "protobufjs/minimal";
import { Check, Coin } from "./coin";
import { Params } from "./params";
export declare const protobufPackage = "decimal.coin.v1";
/** GenesisState defines the module's genesis state. */
export interface GenesisState {
    /** coins defines all existing coins. */
    coins: Coin[];
    /** checks defines all redeemed checks. */
    checks: Check[];
    /** params defines all the module's parameters. */
    params: Params | undefined;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        coins?: {
            denom?: string | undefined;
            title?: string | undefined;
            creator?: string | undefined;
            crr?: number | undefined;
            limitVolume?: string | undefined;
            identity?: string | undefined;
            volume?: string | undefined;
            reserve?: string | undefined;
            minVolume?: string | undefined;
        }[] | undefined;
        checks?: {
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
        }[] | undefined;
        params?: {
            baseDenom?: string | undefined;
            baseTitle?: string | undefined;
            baseVolume?: string | undefined;
        } | undefined;
    } & {
        coins?: ({
            denom?: string | undefined;
            title?: string | undefined;
            creator?: string | undefined;
            crr?: number | undefined;
            limitVolume?: string | undefined;
            identity?: string | undefined;
            volume?: string | undefined;
            reserve?: string | undefined;
            minVolume?: string | undefined;
        }[] & ({
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
        } & { [K in Exclude<keyof I["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["coins"], keyof {
            denom?: string | undefined;
            title?: string | undefined;
            creator?: string | undefined;
            crr?: number | undefined;
            limitVolume?: string | undefined;
            identity?: string | undefined;
            volume?: string | undefined;
            reserve?: string | undefined;
            minVolume?: string | undefined;
        }[]>]: never; }) | undefined;
        checks?: ({
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
        }[] & ({
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
            } & { [K_2 in Exclude<keyof I["checks"][number]["coin"], keyof import("../../../cosmos/base/v1beta1/coin").Coin>]: never; }) | undefined;
            nonce?: Uint8Array | undefined;
            dueBlock?: number | undefined;
            lock?: Uint8Array | undefined;
            v?: string | undefined;
            r?: string | undefined;
            s?: string | undefined;
        } & { [K_3 in Exclude<keyof I["checks"][number], keyof Check>]: never; })[] & { [K_4 in Exclude<keyof I["checks"], keyof {
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
        }[]>]: never; }) | undefined;
        params?: ({
            baseDenom?: string | undefined;
            baseTitle?: string | undefined;
            baseVolume?: string | undefined;
        } & {
            baseDenom?: string | undefined;
            baseTitle?: string | undefined;
            baseVolume?: string | undefined;
        } & { [K_5 in Exclude<keyof I["params"], keyof Params>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof GenesisState>]: never; }>(object: I): GenesisState;
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
