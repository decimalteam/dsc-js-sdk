export enum NETWORKS {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  DEVNET = "devnet",
}

export function getApiEndpoint(network: NETWORKS): string {
  return apiEndpoints[network];
}

export function getNewApiEndpoint(network: NETWORKS): string {
  return newApiEndpoints[network];
}

export function getWeb3Endpoint(network: NETWORKS): string {
  return web3Endpoints[network];
}

export function getRestNodeEndpoint(network: NETWORKS): string {
  return restNodeEndpoints[network];
}

export function getSubgraphEndpoint(network: NETWORKS): string {
  return subgraphEndpoints[network];
}

export function getIpfsEndpoints(network: NETWORKS): string {
  return ipfsEndpoints[network];
}

export function getMultiCallAddresses(network: NETWORKS): string {
  return multicallAddresses[network];
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

export const gateEstimationEndpoint = "tx/estimate";
export const gateBroadcastStatusEndpoint = "rpc/broadcast/status";

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
  gateHost: "https://testnet-gate.decimalchain.com/api/rpc/broadcast",
  nodeHost: "https://testnet-val.decimalchain.com/rpc/",
};

// for now does not know
const mainnetEndpoints = {
  gateHost: "https://mainnet-gate.decimalchain.com/api/rpc/broadcast",
  nodeHost: "https://node.decimalchain.com/rpc/",
};

const rpcEndpoints = {
  [NETWORKS.DEVNET]: devnetEndpoints,
  [NETWORKS.TESTNET]: testnetEndpoints,
  [NETWORKS.MAINNET]: mainnetEndpoints,
};

const restNodeEndpoints = {
  [NETWORKS.DEVNET]: "http://devnet-val.decimalchain.com/rest/",
  [NETWORKS.TESTNET]: "http://testnet-val.decimalchain.com/rest/",
  [NETWORKS.MAINNET]: "http://node.decimalchain.com/rest/",
};

const apiEndpoints = {
  [NETWORKS.DEVNET]: "https://devnet-gate.decimalchain.com/api/",
  [NETWORKS.TESTNET]: "https://testnet-gate.decimalchain.com/api/",
  [NETWORKS.MAINNET]: "https://mainnet-gate.decimalchain.com/api/",
};

const newApiEndpoints = {
  [NETWORKS.DEVNET]: "https://devnet-api.decimalchain.com/api/",
  [NETWORKS.TESTNET]: "https://testnet-api.decimalchain.com/api/",
  [NETWORKS.MAINNET]: "https://mainnet-api.decimalchain.com/api/",
};

const web3Endpoints = {
  [NETWORKS.DEVNET]: "https://devnet-val.decimalchain.com/web3/",
  [NETWORKS.TESTNET]: "https://testnet-val.decimalchain.com/web3/",
  [NETWORKS.MAINNET]: "https://node.decimalchain.com/web3/",
};

const subgraphEndpoints = {
  [NETWORKS.DEVNET]: "https://devnet-thegraph.decimalchain.com/subgraphs/name/contract-center",
  [NETWORKS.TESTNET]: "https://testnet-thegraph.decimalchain.com/subgraphs/name/contract-center",
  [NETWORKS.MAINNET]: "https://mainnet-thegraph.decimalchain.com/subgraphs/name/contract-center",
};

const ipfsEndpoints = { //TODO?
  [NETWORKS.DEVNET]: "https://testnet-nft-ipfs.decimalchain.com/", 
  [NETWORKS.TESTNET]: "https://testnet-nft-ipfs.decimalchain.com/",
  [NETWORKS.MAINNET]: "https://testnet-nft-ipfs.decimalchain.com/",
};

const multicallAddresses = {
  [NETWORKS.DEVNET]: "0x6DA1B119532b971fa58c30A7568FA74d44f3aE72", 
  [NETWORKS.TESTNET]: "0x6DA1B119532b971fa58c30A7568FA74d44f3aE72", //TODO
  [NETWORKS.MAINNET]: "0x949d1A0757803C51F2EfFFEb5472C861A898B8E8",
};