import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function getNft(api, wallet) {
    return (id) => {
        if (!id) {
            throw new Error("Nft id is required");
        }
        if (!wallet) {
            throw new Error("Wallet id is required");
        }
        try {
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = {
                timestamp,
                signature,
            };
            return api.getNftById(id, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getNft.js.map