export declare enum TokenType {
    Unknown = 0,
    ERC20 = 1,
    ERC721 = 2,
    ERC1155 = 3
}
export interface Stake {
    validator: string;
    delegator: string;
    token: string;
    amount: bigint;
    tokenId: bigint;
    tokenType: TokenType;
}
