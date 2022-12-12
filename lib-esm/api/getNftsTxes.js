import { perpareTimestampAndSignature } from "../utils/walletUtils";
// constants
const DEFAULT_ORDER_FIELD = "timestamp";
const DEFAULT_ORDER_DIRECTION = "DESC";
const DEFAULT_ORDER = `order[${DEFAULT_ORDER_FIELD}]=${DEFAULT_ORDER_DIRECTION}`;
export default function getNftsTxes(api, wallet) {
    return (address, limit = 10, offset = 0, order = DEFAULT_ORDER) => {
        try {
            let params = { limit, offset };
            if (!address) {
                throw new Error("The address is required");
            }
            // if requested address is yours
            if (address === (wallet === null || wallet === void 0 ? void 0 : wallet.address)) {
                const { timestamp, signature } = perpareTimestampAndSignature(wallet);
                params = { ...params, timestamp, signature };
            }
            return api.getNftsTxes(address, params, order);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getNftsTxes.js.map