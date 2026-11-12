export declare function generateDerivationPath(depth: number): string;
export declare function generateMnemonic(): string;
export declare function validateMnemonic(mnemonic: string): boolean;
export declare function mnemonicToSeedSync(mnemonic: string): Uint8Array;
export declare function createDecimalWalletFromMnemonic(mnemonic: string, addressPrefix?: string, derivationPath?: string, id?: number): generatedWallet;
export interface generatedWallet {
    privateKey: Uint8Array;
    address: string;
    publicKey: Uint8Array;
    id: number;
    evmAddress?: string;
}
/**
 * HD wallet of the Decimal chain. Holds the master mnemonic and the derived accounts
 * (`m/44'/60'/0'/0/<id>`); `address` is the bech32 (d0...) form, `evmAddress` the 0x form.
 */
export default class Wallet {
    mnemonic: string;
    validatorAddress: string | undefined;
    wallet: generatedWallet;
    depth: number;
    id: number;
    privateKey: Uint8Array;
    publicKey: Uint8Array;
    evmAddress: string | undefined;
    address: string;
    private gateUrl;
    wallets: generatedWallet[];
    /**
     * @param mnemonic master mnemonic; an empty string generates a new one
     * @param address with `publicKey` creates a read-only wallet (no private key)
     * @param publicKey public key of the read-only wallet
     */
    constructor(mnemonic: string, address?: string | null, publicKey?: Uint8Array | null);
    setGateUrl(gateUrl: string): void;
    getGateUrl(): string;
    /** Private key of the current account as 0x-prefixed hex. */
    getPrivateKeyHex(): string;
    /** Compressed public key of the current account as 0x-prefixed hex. */
    getPublicKeyHex(): string;
    switchAccount(id: number): void;
    generateAccount(): void;
    generateAndSwitchAccount(depth: number, id: number): void;
    /** Restores accounts previously saved with `sendAndSaveGeneratedWallets` (needs `setGateUrl`). */
    getAndUseGeneratedWallets(): Promise<void>;
    /** Saves ids of the generated accounts in the gate API (needs `setGateUrl`). */
    sendAndSaveGeneratedWallets(): Promise<void>;
    static encodeCosmosAccountAddress(address: string, prefix?: string): string;
    static decodeCosmosAccountAddress(address: string): string | null;
}
