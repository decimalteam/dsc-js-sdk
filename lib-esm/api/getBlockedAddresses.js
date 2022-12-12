import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function getBlockedAddresses(api, wallet) {
    return (limit = 10, offset = 0, type, q) => {
        if (!wallet) {
            throw new Error("Wallet id is required");
        }
        try {
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = {
                limit,
                offset,
                timestamp,
                signature,
                ...(type && { type }),
                ...(q && { q }),
            };
            return api.getBlockedAddresses(params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getBlockedAddresses.js.map