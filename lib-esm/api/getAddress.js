import { perpareTimestampAndSignature } from "../utils/walletUtils";
export default function getAddress(api, wallet) {
    return async (address, txLimit = 10) => {
        try {
            let params = { txLimit };
            if (!address) {
                throw new Error("The address is required");
            }
            // if requested address is yours
            if (address === (wallet === null || wallet === void 0 ? void 0 : wallet.address)) {
                const { timestamp, signature } = perpareTimestampAndSignature(wallet);
                params = { ...params, timestamp, signature };
            }
            return api.getAddress(address, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getAddress.js.map