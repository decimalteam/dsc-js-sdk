// constants
import { perpareTimestampAndSignature } from "../utils/walletUtils";
const DEFAULT_ORDER_FIELD = "timestamp";
const DEFAULT_ORDER_DIRECTION = "DESC";
const DEFAULT_ORDER = `order[${DEFAULT_ORDER_FIELD}]=${DEFAULT_ORDER_DIRECTION}`;
export default function getNftTxes(api, wallet) {
    return (id, limit = 10, offset = 0, order = DEFAULT_ORDER) => {
        if (!id) {
            throw new Error("Nft id is required");
        }
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
            };
            return api.getNftTxes(id, params, order);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getNftTxes.js.map