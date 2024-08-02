import { ethers, BigNumberish } from "ethers";
import { MetaTransaction, SafeTransaction } from "./execution";
export declare const encodeMultiSend: (txs: MetaTransaction[]) => string;
export declare const buildMultiSendSafeTx: (multiSend: ethers.Contract, txs: MetaTransaction[], nonce: BigNumberish, overrides?: Partial<SafeTransaction>) => Promise<SafeTransaction>;
