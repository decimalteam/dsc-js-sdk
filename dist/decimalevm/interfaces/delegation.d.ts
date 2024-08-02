export declare enum TokenType {
    Unknown = 0,
    DRC20 = 1,
    DRC721 = 2,
    DRC1155 = 3
}
export interface Stake {
    validator: string;
    delegator: string;
    token: string;
    amount: bigint;
    tokenId: bigint;
    tokenType: TokenType;
}
