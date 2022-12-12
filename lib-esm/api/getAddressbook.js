import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function getAddressbook(api, wallet) {
    return async () => {
        try {
            if (!wallet) {
                return null;
            }
            const { timestamp, signature } = perpareTimestampAndSignature(wallet);
            const params = { timestamp, signature };
            return api.getAddressbook(params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getAddressbook.js.map