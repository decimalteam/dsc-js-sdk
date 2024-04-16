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
    owner: string;
    tokenType: string;
}

export interface AddressBalance {
    balance: string;
    token: {
        address: string,
        symbol: string
    };
}
  