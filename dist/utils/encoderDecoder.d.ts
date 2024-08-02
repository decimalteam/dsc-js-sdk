import { TxBody } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Any } from "cosmjs-types/google/protobuf/any";
import Long from "long";
import type protobuf from "protobufjs";
import { ExtOptionsWeb3Tx } from "../types/decimal/coin/v1/tx";
import { PubKey } from "../types/ethermint/crypto/v1/ethsecp256k1/keys";
export interface TsProtoGeneratedType {
    readonly encode: (message: any | {
        [k: string]: any;
    }, writer?: protobuf.Writer) => protobuf.Writer;
    readonly decode: (input: Uint8Array | protobuf.Reader, length?: number) => any;
    readonly fromJSON: (object: any) => any;
    readonly fromPartial: (object: any) => any;
    readonly toJSON: (message: any | {
        [k: string]: any;
    }) => unknown;
}
export interface PbjsGeneratedType {
    readonly create: (properties?: {
        [k: string]: any;
    }) => any;
    readonly encode: (message: any | {
        [k: string]: any;
    }, writer?: protobuf.Writer) => protobuf.Writer;
    readonly decode: (reader: protobuf.Reader | Uint8Array, length?: number) => any;
}
export type GeneratedType = TsProtoGeneratedType | PbjsGeneratedType;
export declare function isTsProtoGeneratedType(type: GeneratedType): type is TsProtoGeneratedType;
export declare function isPbjsGeneratedType(type: GeneratedType): type is PbjsGeneratedType;
export interface DecodeObject {
    readonly typeUrl: string;
    readonly value: Uint8Array;
}
export interface EncodeObject {
    readonly typeUrl: string;
    readonly value: any;
}
interface TxBodyValue {
    readonly messages: readonly EncodeObject[];
    readonly memo?: string;
    readonly timeoutHeight?: Long;
    readonly extensionOptions?: Any[];
    readonly nonCriticalExtensionOptions?: Any[];
}
export interface TxBodyEncodeObject extends EncodeObject {
    readonly typeUrl: "/cosmos.tx.v1beta1.TxBody";
    readonly value: TxBodyValue;
}
export declare function isTxBodyEncodeObject(encodeObject: EncodeObject): encodeObject is TxBodyEncodeObject;
export declare const web3TxUrl = "/ethermint.types.v1.ExtensionOptionsWeb3Tx";
export declare const pubKeyTypeUrl = "/ethermint.crypto.v1.ethsecp256k1.PubKey";
export declare const pubKeyValidatorTypeUrl = "/cosmos.crypto.ed25519.PubKey";
export declare class EncoderDecoder {
    private readonly types;
    constructor(customTypes?: Iterable<[string, GeneratedType]>);
    register(typeUrl: string, type: GeneratedType): void;
    lookupType(typeUrl: string): GeneratedType | undefined;
    private lookupTypeWithError;
    encode(encodeObject: EncodeObject): Uint8Array;
    encodeAsAny(encodeObject: EncodeObject): Any;
    encodePubKey(pubKeyCompressed: PubKey): {
        typeUrl: string;
        value: Uint8Array;
    };
    encodeWeb3Tx(web3Tx: ExtOptionsWeb3Tx): {
        typeUrl: string;
        value: Uint8Array;
    };
    encodeTxBody(txBodyFields: TxBodyValue): Uint8Array;
    decode({ typeUrl, value }: DecodeObject): any;
    decodeTxBody(txBody: Uint8Array): TxBody;
}
export {};
