export declare enum NETWORKS {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    DEVNET = "devnet"
}
export declare function getApiEndpoint(network: NETWORKS): string;
export declare function getRestNodeEndpoint(network: NETWORKS): string;
export declare function getRpcEndpoint(network: NETWORKS, isNodeDirectMode: boolean): string;
export declare const gateEstimationEnpoint = "tx/estimate";
export declare function getNodeFeeEstimationEndpoint(nodeRestHost: string, txBytes: string, denom: string): string;
