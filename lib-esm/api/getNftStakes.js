import { perpareTimestampAndSignature } from "../utils/walletUtils";
export var DelegationStatus;
(function (DelegationStatus) {
    DelegationStatus["delegated"] = "delegated";
    DelegationStatus["undelegating"] = "undelegating";
    DelegationStatus["redelegating"] = "redelegating";
})(DelegationStatus || (DelegationStatus = {}));
export default function getNftStakesByAddress(api, wallet) {
    return async (address, status) => {
        if (!address) {
            throw new Error("The address is required");
        }
        try {
            let params = {};
            // if requested address is yours
            if (address === (wallet === null || wallet === void 0 ? void 0 : wallet.address)) {
                const { timestamp, signature } = perpareTimestampAndSignature(wallet);
                params = { ...params, timestamp, signature };
            }
            return api.getNftSpecificStakes(address, status, params);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
}
//# sourceMappingURL=getNftStakes.js.map