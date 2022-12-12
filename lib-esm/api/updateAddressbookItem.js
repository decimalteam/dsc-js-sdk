import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function updateAddressbookItem(api, wallet) {
    return async (itemId, payload) => {
        try {
            if (!wallet) {
                return null;
            }
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = { timestamp, signature };
            return api.updateAddressbookItem(itemId, payload, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=updateAddressbookItem.js.map