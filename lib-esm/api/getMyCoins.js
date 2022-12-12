export default function getMyCoins(api, wallet) {
    return (limit = 10, offset = 0) => {
        const params = { limit, offset };
        if (!wallet) {
            throw new Error("Wallet undefined");
        }
        return api.getCoinsByAddress(wallet.address, params);
    };
}
//# sourceMappingURL=getMyCoins.js.map