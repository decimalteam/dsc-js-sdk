export default function getMyTransactions(api, wallet) {
    return (limit = 10, offset = 0, types, coins) => {
        if (!wallet) {
            throw new Error("Wallet id is required");
        }
        const params = { limit, offset };
        if (types) {
            params.types = types;
        }
        if (coins) {
            params.coins = coins;
        }
        return api.getTransactionsByAddress(wallet.address, params);
    };
}
//# sourceMappingURL=getMyTransactions.js.map