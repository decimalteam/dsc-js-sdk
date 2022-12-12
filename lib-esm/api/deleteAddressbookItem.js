import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function deleteAddressbookItem(api, wallet) {
    return async (itemId) => {
        try {
            if (!wallet) {
                return null;
            }
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = { timestamp, signature };
            return api.deleteAddressbookItem(itemId, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=deleteAddressbookItem.js.map