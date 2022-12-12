export default function getValidator(api) {
    return async (address) => {
        if (!address) {
            throw new Error("The address is required");
        }
        try {
            return api.getValidator(address);
        }
        catch (e) {
            throw new Error("[decimal-js-sdk] Such a validator does not exist");
        }
    };
}
//# sourceMappingURL=getValidator.js.map