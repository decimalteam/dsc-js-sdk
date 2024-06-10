import { ethers, BigNumberish } from "ethers";
import { buildContractCall, MetaTransaction, SafeTransaction } from "./execution";

const encodeMetaTransaction = (tx: MetaTransaction): string => {
    const data = ethers.utils.arrayify(tx.data);
    const encoded = ethers.utils.solidityPack(
        ["uint8", "address", "uint256", "uint256", "bytes"],
        [tx.operation, tx.to, tx.value, data.length, data],
    );
    return encoded.slice(2);
};

export const encodeMultiSend = (txs: MetaTransaction[]): string => {
    return "0x" + txs.map((tx) => encodeMetaTransaction(tx)).join("");
};

export const buildMultiSendSafeTx = async (
    multiSend: ethers.Contract,
    txs: MetaTransaction[],
    nonce: BigNumberish,
    overrides?: Partial<SafeTransaction>,
): Promise<SafeTransaction> => {
    return buildContractCall(multiSend, "multiSend", [encodeMultiSend(txs)], nonce, true, overrides);
};
