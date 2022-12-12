import { Uint64 } from "@cosmjs/math";
import { assert } from "@cosmjs/utils";
import { BaseAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";
import { EthAccount } from "./types/ethermint/types/v1/account";
function uint64FromProto(input) {
    return Uint64.fromString(input.toString());
}
export function decodePubkey(pubkey) {
    if (!pubkey || !pubkey.value) {
        return null;
    }
    if (pubkey.typeUrl === "/ethermint.crypto.v1.ethsecp256k1.PubKey") {
        {
            return PubKey.decode(pubkey.value);
        }
    }
    else {
        throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
    }
}
function accountFromBaseAccount(input) {
    const { address, pubKey, accountNumber, sequence } = input;
    const pubkey = decodePubkey(pubKey);
    return {
        address: address,
        pubkey: pubkey,
        accountNumber: uint64FromProto(accountNumber).toNumber(),
        sequence: uint64FromProto(sequence).toNumber(),
    };
}
/**
 * Basic implementation of AccountParser. This is supposed to support the most relevant
 * common Cosmos SDK account types. If you need support for exotic account types,
 * you'll need to write your own account decoder.
 */
export function accountFromAny(input) {
    const { typeUrl, value } = input;
    switch (typeUrl) {
        // auth
        case "/cosmos.auth.v1beta1.BaseAccount":
            return accountFromBaseAccount(BaseAccount.decode(value));
        case "/ethermint.types.v1.EthAccount": {
            const baseAccount = EthAccount.decode(value).baseAccount;
            assert(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        default:
            throw new Error(`Unsupported type: '${typeUrl}'`);
    }
}
//# sourceMappingURL=accounts.js.map