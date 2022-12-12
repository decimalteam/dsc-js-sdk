export default function getStakesByAddress(api) {
    return (address, status) => {
        if (!address) {
            throw new Error("The address is required");
        }
        return api.getSpecificStakes(address, status);
    };
}
//# sourceMappingURL=getStakes.js.map