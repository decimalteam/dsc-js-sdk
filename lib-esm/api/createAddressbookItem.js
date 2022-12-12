import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function createAddressbookItem(api, wallet) {
    return async (payload) => {
        try {
            if (!wallet) {
                return null;
            }
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = { timestamp, signature };
            return api.createAddressbookItem(payload, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=createAddressbookItem.js.map