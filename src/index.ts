import Wallet from "./wallet";
import Decimal from "./decimal";
import TX_TYPE from "./txTypesNew";
import { DecimalNetworks } from "./networks";
import { PubKey } from "./types/ethermint/crypto/v1/ethsecp256k1/keys";
import {
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
} from "@cosmjs/proto-signing";
import { EncoderDecoder } from "./utils/encoderDecoder";

const Sdk = {
  Wallet,
  Decimal,
  TX_TYPE,
  DecimalNetworks,
  PubKey,
  EncoderDecoder,
};
export default Sdk;
export {
  Wallet,
  Decimal,
  TX_TYPE,
  DecimalNetworks,
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
};
export * from "./utils/walletUtils";
