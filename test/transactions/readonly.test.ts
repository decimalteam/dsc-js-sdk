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
      const publicKey = Buffer.from('037c71d1855237853d90eb194790d9aee3c0ff25b0c5c4d74ea994f02a27f2b39a', 'hex')
      const decimalWallet = new Wallet('',
          'd012vrppfv9rfnw43nmg4lrzzf4m5m7nek53urnnt',
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
            feeAmount: '2494000000000000000',
            feeGas: 180000,
            message: '',
            txBroadcastMode: 'sync'
        }, true, true)

    const signature = '54c7f45d2c755e2663674ff759ace086ae67af36bee18006b92b0d7fe99f7c1531074b234a00edbe07932d3e82db763d1426227d89c4534502294af5b1e5c77e1c'
      const comision = await sender.sendEip712(msgAny, {
          feeCoin: 'del',
          feeAmount: '28940000000000000000',
          feeGas: 180000,
          message: '',
          txBroadcastMode: 'sync'
      }, signature.replace('0x', ''), true);
      console.log(comision)

    } catch (e) {
      console.log(e)
    }
  });

});

