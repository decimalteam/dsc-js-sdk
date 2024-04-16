export enum TokenType {
    Unknown,
    ERC20,
    ERC721,
    ERC1155
}

export interface Stake {
    validator: string;
    delegator: string;
    token: string;
    amount: bigint;
    tokenId: bigint;
    tokenType: TokenType;
};