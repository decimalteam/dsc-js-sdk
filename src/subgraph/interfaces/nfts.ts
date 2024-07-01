export interface NFTCollection {
    address: string;
    symbol: string;
    name: string;
    creator: string;
    tokenType: string;
    collectionSupply: string;
    contractURI: string;
    allowMint: boolean;
    burnable: boolean;
    refundable: boolean;
    withReserve: boolean;

    txHash: string
    blockNumber: string
    timestamp: string

    nfts: NFTToken[];
}

export interface NFTToken {
    tokenURI: string;
    tokenId: string;
    supply: string;
    collection?: NFTCollection;
    transfers: NFTTransfer[];
    balances: NFTBalance[];
}
  
export interface NFTBalance {
    user: {
        address: string; 
    }
    nft?: NFTToken;
    collection?: NFTCollection;
    amount: string;
}
  
export interface NFTTransfer  {
    from: string;
    to: string;
    nft?: NFTToken;
    collection?: NFTCollection;
    txHash: string;
    blockNumber: string;
    timestamp: string;
    amount: string;
}