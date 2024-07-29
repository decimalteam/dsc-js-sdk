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
        address: string;
        symbol: string;
    } | null
    tokenId?: string;
    amount: string;
    tokenType: string;
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
        address: string;
        symbol: string;
    } | null
    tokenId?: string;
    amount: string;
    stakeIndex: string;
    unfreezeTimestamp: string;
    tokenType: string;
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
    }
    tokenId?: string;
    amount: string;
    stakeIndex: string;
    unfreezeTimestamp: string;
    tokenType: string;
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
