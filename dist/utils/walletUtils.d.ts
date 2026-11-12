export declare const ADDRESS_PREFIX = "d0";
/**
 * Checks that `address` is a valid bech32 Decimal address with the given prefix.
 * @param address Decimal address (d0...)
 * @param prefix expected prefix, `d0` by default (`d0valoper` for validators)
 */
export declare function verifyAddress(address: string, prefix?: string): boolean;
/**
 * Converts a bech32 Decimal address (d0...) to a lowercase EVM address (0x...).
 * Returns null when the address can not be decoded.
 */
export declare const decodeCosmosAccountAddress: (cosmosAccountAddress: string) => string | null;
/** Converts an EVM address (0x...) to a bech32 Decimal address with the given prefix. */
export declare const encodeCosmosAccountAddress: (evmAccountAddress: string, prefix?: string) => string;
/** Computes a lowercase EVM address from a (compressed or uncompressed) secp256k1 public key. */
export declare const encodeEvmAccountAddress: (publicKey: Uint8Array | string) => string;
export declare const encodeAddresses: (publicKey: Uint8Array | string, prefix?: string) => {
    cosmosAccountAddress: string;
    evmAccountAddress: string;
};
/**
 * Signs `{ timestamp }` the way the Decimal gate API expects:
 * keccak256 of the JSON message, signature serialized as `{"r","s","recoveryParam"}` with
 * unpadded hex `r`/`s` (compatible with signatures previously produced by `elliptic`).
 */
export declare function signTimestamp(privateKey: Uint8Array | string, timestamp: number): string;
/** Loads ids of the additionally generated accounts saved for `address` in the gate API. */
export declare function getAndUseGeneratedWallets(gateUrl: string, address: string): Promise<number[]>;
/** Saves ids of the generated accounts for the master wallet (`wallets[0]`) in the gate API. */
export declare function sendAndSaveGeneratedWallets(gateUrl: string, wallets: Array<{
    privateKey: Uint8Array;
    address: string;
}>, generatedWallets: number[]): Promise<boolean>;
