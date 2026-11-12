import { bech32 } from "bech32";
import {
  SigningKey,
  computeAddress,
  getBytes,
  hexlify,
  keccak256,
  toUtf8Bytes,
} from "ethers";

export const ADDRESS_PREFIX = "d0";

/**
 * Checks that `address` is a valid bech32 Decimal address with the given prefix.
 * @param address Decimal address (d0...)
 * @param prefix expected prefix, `d0` by default (`d0valoper` for validators)
 */
export function verifyAddress(address: string, prefix = ADDRESS_PREFIX): boolean {
  if (!address) {
    throw new Error("address is missing.");
  }

  try {
    const decoded = bech32.decode(address);
    return prefix === decoded.prefix && decoded.words !== undefined;
  } catch (error) {
    return false;
  }
}

/**
 * Converts a bech32 Decimal address (d0...) to a lowercase EVM address (0x...).
 * Returns null when the address can not be decoded.
 */
export const decodeCosmosAccountAddress = (cosmosAccountAddress: string): string | null => {
  try {
    const { words } = bech32.decode(cosmosAccountAddress);
    return hexlify(Uint8Array.from(bech32.fromWords(words)));
  } catch (e) {
    return null;
  }
};

/** Converts an EVM address (0x...) to a bech32 Decimal address with the given prefix. */
export const encodeCosmosAccountAddress = (
  evmAccountAddress: string,
  prefix = ADDRESS_PREFIX
): string => {
  const hex = evmAccountAddress.startsWith("0x") ? evmAccountAddress : `0x${evmAccountAddress}`;
  return bech32.encode(prefix, bech32.toWords(getBytes(hex)));
};

/** Computes a lowercase EVM address from a (compressed or uncompressed) secp256k1 public key. */
export const encodeEvmAccountAddress = (publicKey: Uint8Array | string): string => {
  return computeAddress(hexlify(publicKey)).toLowerCase();
};

export const encodeAddresses = (publicKey: Uint8Array | string, prefix = ADDRESS_PREFIX) => {
  const evmAccountAddress = encodeEvmAccountAddress(publicKey);
  const cosmosAccountAddress = encodeCosmosAccountAddress(evmAccountAddress, prefix);
  return { cosmosAccountAddress, evmAccountAddress };
};

/**
 * Signs `{ timestamp }` the way the Decimal gate API expects:
 * keccak256 of the JSON message, signature serialized as `{"r","s","recoveryParam"}` with
 * unpadded hex `r`/`s` (compatible with signatures previously produced by `elliptic`).
 */
export function signTimestamp(privateKey: Uint8Array | string, timestamp: number): string {
  const msgHash = keccak256(toUtf8Bytes(JSON.stringify({ timestamp })));
  const sig = new SigningKey(hexlify(privateKey)).sign(msgHash);
  return JSON.stringify({
    r: BigInt(sig.r).toString(16),
    s: BigInt(sig.s).toString(16),
    recoveryParam: sig.yParity,
  });
}

/** Loads ids of the additionally generated accounts saved for `address` in the gate API. */
export async function getAndUseGeneratedWallets(gateUrl: string, address: string): Promise<number[]> {
  try {
    const res = await fetch(`${gateUrl}address/${address}/generated-wallets`);
    if (!res.ok) {
      if (res.status !== 404) console.error(`Failed to load generated wallets: HTTP ${res.status}`);
      return [];
    }
    const data: any = await res.json();
    return (data && data.result && data.result.generatedWallets) || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Saves ids of the generated accounts for the master wallet (`wallets[0]`) in the gate API. */
export async function sendAndSaveGeneratedWallets(
  gateUrl: string,
  wallets: Array<{ privateKey: Uint8Array; address: string }>,
  generatedWallets: number[]
): Promise<boolean> {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000.0);
    const payload = {
      generatedWallets,
      timestamp,
      signature: signTimestamp(wallets[0].privateKey, timestamp),
    };

    const res = await fetch(`${gateUrl}address/${wallets[0].address}/generated-wallets`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok && res.status !== 404) {
      console.error(`Failed to save generated wallets: HTTP ${res.status}`);
    }
    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}
