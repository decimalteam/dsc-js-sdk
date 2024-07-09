export enum TokenType {
    Unknown,
    ERC20,
    DRC721,
    DRC1155
}

export interface Stake {
    validator: string;
    delegator: string;
    token: string;
    amount: bigint;
    tokenId: bigint;
    tokenType: TokenType;
};