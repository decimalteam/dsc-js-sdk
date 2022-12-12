import { toHex } from "@cosmjs/encoding";
import { Tendermint34Client, } from "@cosmjs/tendermint-rpc";
import { sleep } from "@cosmjs/utils";
import { accountFromAny } from "./accounts";
import { setupAuthExtension } from "./modules";
import { QueryClient } from "./queryclient";
import { checkSequenceBroadcast } from "./utils/sequence";
export class TimeoutError extends Error {
    constructor(message, txId) {
        super(message);
        this.txId = txId;
    }
}
export default class Client {
    constructor(tmClient, options) {
        if (tmClient) {
            this.tmClient = tmClient;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.queryClient = QueryClient.withExtensions(tmClient, setupAuthExtension);
        }
        const { accountParser = accountFromAny } = options;
        this.accountParser = accountParser;
    }
    static async connect(endpoint, options = {}) {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new Client(tmClient, options);
    }
    getTmClient() {
        return this.tmClient;
    }
    forceGetTmClient() {
        if (!this.tmClient) {
            throw new Error("Tendermint client not available. You cannot use online functionality in offline mode.");
        }
        return this.tmClient;
    }
    getQueryClient() {
        return this.queryClient;
    }
    forceGetQueryClient() {
        if (!this.queryClient) {
            throw new Error("Query client not available. You cannot use online functionality in offline mode.");
        }
        return this.queryClient;
    }
    async getChainId() {
        if (!this.chainId) {
            const response = await this.forceGetTmClient().status();
            const chainId = response.nodeInfo.network;
            if (!chainId)
                throw new Error("Chain ID must not be empty");
            this.chainId = chainId;
        }
        return this.chainId;
    }
    async getHeight() {
        const status = await this.forceGetTmClient().status();
        return status.syncInfo.latestBlockHeight;
    }
    async getAccount(searchAddress) {
        try {
            const client = this.forceGetQueryClient();
            const account = await client.auth.account(searchAddress);
            return account ? this.accountParser(account) : null;
        }
        catch (error) {
            if (/rpc error: code = NotFound/i.test(error.toString())) {
                return null;
            }
            throw error;
        }
    }
    async getSequence(address) {
        const account = await this.getAccount(address);
        if (!account) {
            throw new Error("Account does not exist on chain. Send some tokens there before trying to query sequence.");
        }
        return {
            accountNumber: account.accountNumber,
            sequence: account.sequence,
        };
    }
    async getTx(id) {
        var _a;
        const results = await this.txsQuery(`tx.hash='${id}'`);
        return (_a = results[0]) !== null && _a !== void 0 ? _a : null;
    }
    async txsQuery(query) {
        const results = await this.forceGetTmClient().txSearchAll({ query: query });
        return results.txs.map((tx) => {
            return {
                height: tx.height,
                hash: toHex(tx.hash).toUpperCase(),
                code: tx.result.code,
                rawLog: tx.result.log || "",
                tx: tx.tx,
                gasUsed: tx.result.gasUsed,
                gasWanted: tx.result.gasWanted,
            };
        });
    }
    disconnect() {
        if (this.tmClient)
            this.tmClient.disconnect();
    }
    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    async broadcastTx(tx, waitForTx = true, timeoutMs = 60000, pollIntervalMs = 3000) {
        let timedOut = false;
        const txPollTimeout = setTimeout(() => {
            timedOut = true;
        }, timeoutMs);
        const pollForTx = async (txId) => {
            if (timedOut) {
                throw new TimeoutError(`Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later. There was a wait of ${timeoutMs / 1000} seconds.`, txId);
            }
            await sleep(pollIntervalMs);
            const result = await this.getTx(txId);
            return result
                ? {
                    code: result.code,
                    height: result.height,
                    rawLog: result.rawLog,
                    transactionHash: txId,
                    gasUsed: result.gasUsed,
                    gasWanted: result.gasWanted,
                }
                : pollForTx(txId);
        };
        const broadcasted = await this.forceGetTmClient().broadcastTxSync({ tx });
        // parsing expected sequence from log
        if (broadcasted.code) {
            const expectedSequence = checkSequenceBroadcast(broadcasted);
            if (expectedSequence) {
                return Promise.resolve({
                    expectedSequence,
                });
            }
            return Promise.reject(new Error(`Broadcasting transaction failed with code ${broadcasted.code} (codespace: ${broadcasted.codeSpace}). Log: ${broadcasted.log}`));
        }
        const transactionId = toHex(broadcasted.hash).toUpperCase();
        if (!waitForTx) {
            return {
                ...broadcasted,
                transactionHash: transactionId,
            };
        }
        return new Promise((resolve, reject) => pollForTx(transactionId).then((value) => {
            clearTimeout(txPollTimeout);
            resolve(value);
        }, (error) => {
            clearTimeout(txPollTimeout);
            reject(error);
        }));
    }
}
//# sourceMappingURL=client.js.map