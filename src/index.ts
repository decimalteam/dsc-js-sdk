import Wallet from "./wallet";
import Decimal from "./decimal";
import TX_TYPE from "./txTypesNew";
import { DecimalNetworks } from "./networks";
import {
  encodeAddresses,
  encodeCosmosAccountAddress,
  decodeCosmosAccountAddress,
  verifyAddress,
  createPublicKey,
  txEncoderDecoder,
} from "./utils/walletUtils";

const Sdk = { Wallet, Decimal, TX_TYPE, DecimalNetworks };
export default Sdk;
export {
  Wallet,
  Decimal,
  TX_TYPE,
  DecimalNetworks,
  encodeAddresses,
  encodeCosmosAccountAddress,
  decodeCosmosAccountAddress,
  verifyAddress,
  createPublicKey,
  txEncoderDecoder,
};
