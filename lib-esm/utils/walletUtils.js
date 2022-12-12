import axios from "axios";
import { decode } from "bech32";
import * as bech32 from "bech32-buffer";
import bs58 from "bs58";
import * as CryptoJS from "crypto-js";
import { decode as rlpDecode } from "rlp";
import { publicKeyConvert } from "secp256k1";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sortobject = require("deep-sort-object");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha3 = require("js-sha3");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
// constants
const MAX_AUTOMATICALLY_NONCE_VALID_UNTIL = 6 * 1000;
/**
 * @param {string} address Decimal blockchain address
 * @param {'d0' | 'd0valoper' | string} prefix Prefix
 * @returns {boolean} boolean to indicate address validation
 */
export function verifyAddress(address, prefix = "d0") {
    if (!address) {
        throw new Error("address is missing.");
    }
    try {
        const decoded = decode(address);
        return prefix === decoded.prefix && decoded.words !== undefined;
    }
    catch (error) {
        return false;
    }
}
export function verifyCheck(check) {
    try {
        const decodedCheck = bs58.decode(check);
        return rlpDecode(decodedCheck);
    }
    catch (e) {
        return false;
    }
}
export async function getAndUseGeneratedWallets(gateUrl, address) {
    try {
        const { data } = await axios.get(`${gateUrl}address/${address}/generated-wallets`);
        return (data && data.result && data.result.generatedWallets) || [];
    }
    catch (e) {
        if (e.response && e.response.code && e.response.code !== 404) {
            console.error(e);
        }
        return [];
    }
}
export async function sendAndSaveGeneratedWallets(gateUrl, wallets, generatedWallets) {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000.0);
        const msg = {
            timestamp,
        };
        const msgHash = sha3.keccak256(JSON.stringify(msg));
        const signature = JSON.stringify(ec.sign(msgHash, wallets[0].privateKey, "hex", { canonical: true }));
        const payload = {
            generatedWallets,
            timestamp,
            signature,
        };
        const { data: { result = false }, } = await axios.put(`${gateUrl}address/${wallets[0].address}/generated-wallets`, payload);
        return result;
    }
    catch (e) {
        if (e.response && e.response.code && e.response.code !== 404) {
            console.error(e);
        }
        return false;
    }
}
export function getStringHash(value) {
    return CryptoJS.SHA1(value).toString();
}
export function generateNftId(headline, description, slug, coverHash = null, assetHash = null) {
    try {
        const hashes = [
            getStringHash(headline),
            getStringHash(description),
            getStringHash(slug),
            coverHash,
            assetHash,
        ];
        const id = hashes.reduce((acc, value) => acc + value);
        return getStringHash(id);
    }
    catch (e) {
        console.error(e);
        throw new Error("Error when trying to get a hash " + e.message);
    }
}
export function getTimestamp() {
    return new Date().getTime();
}
export function isNonceSetAutomatically(wallet, options) {
    return (options.setNonceAutomatically &&
        Boolean(wallet.currentNonce) &&
        getTimestamp() - wallet.currentNonceValidUntil <
            MAX_AUTOMATICALLY_NONCE_VALID_UNTIL);
}
// export function updateNonce(wallet: any, nonce: any) {
//   wallet.updateNonce(+nonce);
// }
export const decodeCosmosAccountAddress = (cosmosAccountAddress) => {
    try {
        const decodedCosmosAccountAddress = bech32.decode(cosmosAccountAddress);
        const hexedEvmAccountAddress = Buffer.from(decodedCosmosAccountAddress.data).toString("hex");
        const evmAccountAddress = `0x${hexedEvmAccountAddress}`;
        return evmAccountAddress;
    }
    catch (e) {
        return null;
    }
};
export const encodeCosmosAccountAddress = (evmAccountAddress, prefix = "d0") => {
    const formattedEvmAccountAddress = evmAccountAddress.startsWith("0x")
        ? evmAccountAddress.slice(2)
        : evmAccountAddress;
    const bufferedEvmAccountAddress = Buffer.from(formattedEvmAccountAddress, "hex");
    const cosmosAccountAddress = bech32.encode(prefix, bufferedEvmAccountAddress);
    return cosmosAccountAddress;
};
export const encodeEvmAccountAddress = (publicKey) => {
    const decompressedPublicKey = publicKeyConvert(publicKey, false);
    const slicedDecompressedPublicKey = decompressedPublicKey.slice(1);
    const hexedDecompressedPublicKey = sha3.keccak256(slicedDecompressedPublicKey);
    const evmAccountAddress = `0x${hexedDecompressedPublicKey.substring(hexedDecompressedPublicKey.length - 40, hexedDecompressedPublicKey.length)}`;
    return evmAccountAddress;
};
export const encodeAddresses = (publicKey, prefix = "d0") => {
    const evmAccountAddress = encodeEvmAccountAddress(publicKey);
    const cosmosAccountAddress = encodeCosmosAccountAddress(evmAccountAddress, prefix);
    return { cosmosAccountAddress, evmAccountAddress };
};
export const perpareTimestampAndSignature = (wallet) => {
    const timestamp = Math.round(new Date().getTime() / 1000.0);
    const data = {
        timestamp,
    };
    console.log(data);
    const msg = sortobject(data);
    const msgHash = sha3.keccak256(JSON.stringify(msg));
    console.log(msgHash);
    // const key = ec.keyFromPrivate(wallet.wallets[0].privateKey);
    const signature = ec.sign(msgHash, wallet.privateKey, "hex", {
        canonical: true,
    });
    return {
        timestamp,
        signature,
    };
};
export function getWalletAddressFromSignature(data, signature) {
    try {
        // sort msg object by keys
        const msg = sortobject(data);
        // getting message hash
        const msgHash = sha3.keccak256(JSON.stringify(msg));
        // hex to decimal function
        const hexToDecimal = (x) => ec.keyFromPrivate(x, "hex").getPrivate().toString(10);
        // casting signature as string
        const rawSignature = signature;
        // parsing raw signature from string
        const parsedSignature = JSON.parse(rawSignature);
        // getting public key from signature
        const pubKeyRecovered = ec.recoverPubKey(hexToDecimal(msgHash), parsedSignature, parsedSignature.recoveryParam, "hex");
        // getting wallet address from recovered public key
        const pubKey = new Uint8Array(pubKeyRecovered.encodeCompressed("bites"));
        const { cosmosAccountAddress } = encodeAddresses(pubKey);
        console.log("address from utils: ", cosmosAccountAddress);
        return cosmosAccountAddress;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}
//# sourceMappingURL=walletUtils.js.map