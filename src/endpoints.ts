export enum NETWORKS {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet",
}

export function getApiEndpoint(network: NETWORKS): string {
  return apiEndpoints[network];
}

export function getRestNodeEndpoint(network: NETWORKS): string {
  return restNodeEndpoints[network];
}

export function getRpcEndpoint(
  network: NETWORKS,
  isNodeDirectMode: boolean
): string {
  const networkEndpoints = rpcEndpoints[network];
  return isNodeDirectMode
    ? networkEndpoints.nodeHost
    : networkEndpoints.gateHost;
}

export const gateEstimationEnpoint = "tx/estimate";

export function getNodeFeeEstimationEndpoint(
  nodeRestHost: string,
  txBytes: string,
  denom: string
): string {
  return `${nodeRestHost}decimal/fee/v1/calculate_commission?tx_bytes=${txBytes}&denom=${denom}`;
}

const devnetEndpoints = {
  gateHost: "https://devnet-gate.decimalchain.com/api/rpc/broadcast",
  nodeHost: "https://devnet-val.decimalchain.com/rpc/",
};

const testnetEndpoints = {
  gateHost: "https://testnet-gate.decimalchain.com/api/rpc/",
  nodeHost: "https://testnet-val.decimalchain.com/rpc/",
};

// for now does not know
const mainnetEndpoints = {
  gateHost: "https://mainnet-gate.decimalchain.com/api/rpc/",
  nodeHost: "https://mainnet-val.decimalchain.com/rpc/",
};

const rpcEndpoints = {
  [NETWORKS.DEVNET]: devnetEndpoints,
  [NETWORKS.TESTNET]: testnetEndpoints,
  [NETWORKS.MAINNET]: mainnetEndpoints,
};

const restNodeEndpoints = {
  [NETWORKS.DEVNET]: "http://devnet-val.decimalchain.com/rest/",
  [NETWORKS.TESTNET]: "http://testnet-val.decimalchain.com/rest/",
  [NETWORKS.MAINNET]: "http://mainnet-val.decimalchain.com/rest/",
};

const apiEndpoints = {
  [NETWORKS.DEVNET]: "https://devnet-gate.decimalchain.com/api/",
  [NETWORKS.TESTNET]: "https://testnet-gate.decimalchain.com/api/",
  [NETWORKS.MAINNET]: "https://mainnet-gate.decimalchain.com/api/",
};
