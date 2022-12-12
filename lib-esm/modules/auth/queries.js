// @ts-nocheck
import { QueryClientImpl } from "cosmjs-types/cosmos/auth/v1beta1/query";
import { createProtobufRpcClient } from "../../queryclient";
export function setupAuthExtension(base) {
    const rpc = createProtobufRpcClient(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new QueryClientImpl(rpc);
    return {
        auth: {
            account: async (address) => {
                const { account } = await queryService.Account({ address: address });
                return account !== null && account !== void 0 ? account : null;
            },
        },
    };
}
//# sourceMappingURL=queries.js.map