export interface MultisigWallets {
    address: string;
    threshold: string;
    participants: Participant[];
}
export interface Participant {
    address: string;
    status: string;
    weight: string;
}
export interface TransactionData {
    baseGas: string;
    data: string;
    gasPrice: string;
    gasToken: string;
    nonce: string;
    operation: string;
    refundReceiver: string;
    safeTxGas: string;
    to: string;
    value: string;
}
