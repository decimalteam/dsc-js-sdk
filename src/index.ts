import Wallet from "./wallet";
import Decimal from "./decimal";
import TX_TYPE from "./txTypesNew";
import { DecimalNetworks } from "./networks";
import { PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";

const Sdk = { Wallet, Decimal, TX_TYPE, DecimalNetworks, PubKey };
export default Sdk;
export { Wallet, Decimal, TX_TYPE, DecimalNetworks };
export * from "./utils/walletUtils";
