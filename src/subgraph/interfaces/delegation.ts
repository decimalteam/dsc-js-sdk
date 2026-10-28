export interface Stake {
    id: string;
    validator: {
        address: string;
    }
    delegator: string;
    token: {
        address: string;
        symbol: string;
    } | null
    nft: {
        tokenURI: string;
        collection: {
            address: string;
            symbol: string;
            name: string;
        }
    } | null
    tokenId?: string;
    amount: string;
    tokenType: string;
    holdTimestamp: string;
    // coin stakes only: part of the stake backed by delegated NFT reserves (delegateNFT).
    // The full stake in the contract is amount + nftBackedAmount. Undefined on subgraph
    // deployments that predate NFT delegation via the main delegation contract.
    nftBackedAmount?: string | null;
    // NFT stakes delegated via the main delegation contract (delegateNFT) only
    reserveToken?: {
        address: string;
        symbol: string;
    } | null
    reserveAmount?: string;
    coinStakeId?: string;
}

// NFT delegated via the main delegation contract (delegateNFT). Its reserve is added to the
// delegator's coin stake (coinStake.nftBackedAmount) at the same validator.
export interface NFTStake {
    id: string;
    validator: {
        address: string;
    }
    delegator: string;
    nftContract: {
        address: string;
        symbol: string;
        name: string;
        tokenType: string;
    }
    nft: {
        tokenURI: string;
        collection: {
            address: string;
            symbol: string;
            name: string;
        }
    } | null
    tokenId: string;
    amount: string;
    reserveToken: {
        address: string;
        symbol: string;
    } | null
    reserveAmount: string;
    isActive: boolean;
    coinStake: {
        id: string;
        amount: string;
        nftBackedAmount: string | null;
        holdTimestamp: string;
    } | null
}

export interface TransferStake {
    id: string;
    oldValidator: {
        address: string;
    }
    newValidator: {
        address: string;
    }
    delegator: string;
    token: {
        address: string;
        symbol: string;
    } | null
    nft: {
        tokenURI: string;
        collection: {
            address: string;
            symbol: string;
            name: string;
        }
    } | null
    tokenId?: string;
    amount: string;
    stakeIndex: string;
    unfreezeTimestamp: string;
    tokenType: string;
    holdTimestamp: string;
}

export interface WithdrawStake {
    id: string;
    validator: {
        address: string;
    }
    delegator: string;
    token: {
        address: string;
        symbol: string;
    } | null
    nft: {
        tokenURI: string;
        collection: {
            address: string;
            symbol: string;
            name: string;
        }
    } | null
    tokenId?: string;
    amount: string;
    stakeIndex: string;
    unfreezeTimestamp: string;
    tokenType: string;
    holdTimestamp: string;
}

export interface Validator {
    id: string;
    address: string;
    status: string;
    meta: string;
    paused: string;
}

export interface Penalty {
    id: string;
    percentage: string;
    validator: {
        id: string;
        address: string;
    }
}

export interface SumAmountToPenalty {
    sumAmountToPenalty: {
        block: number;
        validator: string;
        amount: bigint;
    }[]
    sumAmountToPenaltyAll: {
        validator: string;
        amount: bigint;
    }[]
}
