import SDK from '../../src/index'
// import SDK from "../../lib-esm/"

// @ts-ignore
import info from "../_commonInfo"
import {clientMsgDelegate, clientRedelegationData} from "../../src/interfaces/clientInterfaces";

jest.setTimeout(15000)
const options = {
    feeCoin: "",
    message: "sdas",
    txBroadcastMode: "sync",
    accountInfoMode: "blockchain-with-mempool",
    sendTxDirectly: true,
}
describe('legacy', () => {
  test('reown', async() => {
    try {
      // Sdk.
      const { Wallet, Decimal, DecimalNetworks } = SDK;
      const publicKey = Buffer.from('023dba9bf34be051e02b9f3a1b1e888fde45746d8ae2ffbf7c3eeef83210e806b9')
      const decimalWallet = new Wallet('',
          Wallet.encodeCosmosAccountAddress('0x211c2122721360BD32B80692229A2592D9Ea5C15', 'd0'),
          publicKey
      );
      const decimal = await Decimal.connect(DecimalNetworks.devnet);
      decimal.setWallet(decimalWallet);
      // console.log(decimalWallet)
      const sender = await decimal.transactionSender();
      // console.log(sender);
        const msg: clientRedelegationData = {
            validatorFrom: "dxvaloper14elhyzmq95f98wrkvujtsr5cyudffp6qk9wmzm",
            validatorTo: "dxvaloper1yvgq6uh35a395hexhxcde2zfpwwafzpaxvupmc",
            coin: "del",
            stake: "10",
        }
    const options = {
        feeCoin: "",
        message: "",
        txBroadcastMode: "sync",
    }
      const comision = await sender.redelegateEip712(msg, options);
      console.log(comision)

    } catch (e) {
      console.log(e)
    }
  });

});

