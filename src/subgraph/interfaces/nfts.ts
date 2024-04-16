export interface NFTCollection {
    id: string;
    address: string;
    symbol: string;
    name: string;
    owner: string;
    tokenType: string;
}

export interface NFT {
    id: string;
    user: string;
    tokenId: string;
    balance: string;
    collection: NFTCollection
}