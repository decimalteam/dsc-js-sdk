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
          Wallet.encodeCosmosAccountAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 'd0'),
          publicKey
      );
      const decimal = await Decimal.connect(DecimalNetworks.devnet);
      decimal.setWallet(decimalWallet);
      // console.log(decimalWallet)
      const sender = await decimal.transactionSender();
      // console.log(sender);
        const params = {
            validatorAddress: "d0valoper1t4qx5x570wglgesc5g5gvf3a0n3jf9ngsn76pl",
            stake: '1',
            coin: 'del'
        }
    const options = {
        feeCoin: "",
        message: "",
        txBroadcastMode: "sync",
    }
        const msgAny = await sender.delegate(params, {
            feeCoin: 'del',
            feeAmount: '3000000000000',
            message: '',
            txBroadcastMode: 'sync'
        }, true, true)

    const signature = 'cf3815fa9054cd4e5ef1dc03557777747d6d3458b54fae6ee77326c48224f0b077a076dccaa32f0bbe2e97c6c082a471743d174afe6afd4430dab56fbd533c011c'
      const comision = await sender.sendEip712(msgAny, {
          feeCoin: 'del',
          feeAmount: '3000000000000000000',
          feeGas: 21000,
          message: '',
          txBroadcastMode: 'sync'
      }, signature.replace('0x', ''), true);
      console.log(comision)

    } catch (e) {
      console.log(e)
    }
  });

});

