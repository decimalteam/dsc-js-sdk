export interface Token {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    crr: number;
    totalSupply: string;
    maxTotalSupply: string;
    minTotalSupply: string;
    identity: string;
    reserve: string;
    currentPrice: string;
    creator: string;
    tokenType: string;
}
export interface TokenReserveless {
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    totalSupply: string;
    maxTotalSupply: string;
    identity: string;
    creator: string;
}
export interface AddressBalance {
    amount: string;
    token: Token;
}
export interface BridgeToken {
    address: string;
    chainId: string;
    decimals: string;
    name: string;
    symbol: string;
}
export interface BridgeTransfer {
    from: string;
    to: string;
    amount: string;
    toChainId: string;
    fee: string;
    nonce: string;
    payload: string;
    transferType: string;
    token: BridgeToken;
}
