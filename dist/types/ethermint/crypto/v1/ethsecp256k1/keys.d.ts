import Long from "long";
import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ethermint.crypto.v1.ethsecp256k1";
/**
 * PubKey defines a type alias for an ecdsa.PublicKey that implements
 * Tendermint's PubKey interface. It represents the 33-byte compressed public
 * key format.
 */
export interface ExtensionOptionsWeb3Tx {
    typedDataChainID: number;
    feePayer: string;
    feePayerSig: Uint8Array;
}
/**
 * PubKey defines a type alias for an ecdsa.PublicKey that implements
 * Tendermint's PubKey interface. It represents the 33-byte compressed public
 * key format.
 */
export interface PubKey {
    key: Uint8Array;
}
/**
 * PrivKey defines a type alias for an ecdsa.PrivateKey that implements
 * Tendermint's PrivateKey interface.
 */
export interface PrivKey {
    key: Uint8Array;
}
export declare const ExtensionOptionsWeb3Tx: {
    encode(message: ExtensionOptionsWeb3Tx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionOptionsWeb3Tx;
    fromJSON(object: any): ExtensionOptionsWeb3Tx;
    toJSON(message: ExtensionOptionsWeb3Tx): unknown;
    fromPartial<I extends {
        typedDataChainID?: number | undefined;
        feePayer?: string | undefined;
        feePayerSig?: Uint8Array | undefined;
    } & {
        typedDataChainID?: number | undefined;
        feePayer?: string | undefined;
        feePayerSig?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, keyof ExtensionOptionsWeb3Tx>, never>>(object: I): ExtensionOptionsWeb3Tx;
};
export declare const PubKey: {
    encode(message: PubKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PubKey;
    fromJSON(object: any): PubKey;
    toJSON(message: PubKey): unknown;
    fromPartial<I extends {
        key?: Uint8Array | undefined;
    } & {
        key?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "key">, never>>(object: I): PubKey;
};
export declare const PrivKey: {
    encode(message: PrivKey, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PrivKey;
    fromJSON(object: any): PrivKey;
    toJSON(message: PrivKey): unknown;
    fromPartial<I extends {
        key?: Uint8Array | undefined;
    } & {
        key?: Uint8Array | undefined;
    } & Record<Exclude<keyof I, "key">, never>>(object: I): PrivKey;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
