export declare enum TokenType {
    Unknown = 0,
    DRC20 = 1,
    DRC721 = 2,
    DRC1155 = 3,
    DEL = 4
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
    amount: bigint;
    nftType: TokenType;
    delegator: string;
    validator: string;
    reserveToken: string;
    reserveAmount: bigint;
    holdTimestamp: bigint;
    isActive: boolean;
}
