export interface ValidatorMeta {
    operator_address: string;
    reward_address: string;
    consensus_pubkey: string;
    description: {
        moniker: string;
        identity: string;
        website: string;
        security_contact: string;
        details: string;
    };
    commission: string;
}
export declare enum ValidatorStatus {
    Deleted = 0,
    Candidate = 1,
    Approved = 2
}
