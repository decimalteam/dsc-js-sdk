export enum TokenType {
    Unknown,
    DRC20,
    DRC721,
    DRC1155,
    DEL
}

export interface Stake {
    validator: string;
    delegator: string;
    token: string;
    amount: bigint;
    tokenId: bigint;
    tokenType: TokenType;
    holdTimestamp: bigint;
}

export interface NFTStake {
    nftContract: string;
    tokenId: bigint;
    amount: bigint;        // 1 for DRC721, variable for DRC1155
    nftType: TokenType;    // DRC721 or DRC1155
    delegator: string;
    validator: string;
    reserveToken: string;
    reserveAmount: bigint;
    holdTimestamp: bigint;
    isActive: boolean;
}