import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function getNfts(api, wallet) {
    return (address, limit = 10, offset = 0, query = null) => {
        try {
            let params = query ? { query, limit, offset } : { limit, offset };
            if (!address) {
                throw new Error("The address is required");
            }
            // if requested address is yours
            if (address === (wallet === null || wallet === void 0 ? void 0 : wallet.address)) {
                const { timestamp, signature } = perpareTimestampAndSignature(wallet);
                params = { ...params, timestamp, signature };
            }
            return api.getNfts(address, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getNfts.js.map