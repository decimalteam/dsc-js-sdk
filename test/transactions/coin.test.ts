// import SDK from '../../dist/index';
// import SDK from "../../lib-esm/"
 import SDK from "../../src/index"

// import { Wallet, Decimal, DecimalNetworks } from "../../dist/index"
// @ts-ignore
import {multiSendCoin, createCoin, updateCoin} from "../../src/interfaces/transactionsMockData"
import { voteOptionToJSON } from 'cosmjs-types/cosmos/gov/v1beta1/gov';
import { clientMsgMultiSendCoin, clientMsgSendCoin } from '../../src/interfaces/clientInterfaces';
import BigNumber from 'bignumber.js';
// import { coinsTestnet } from "../coins"
jest.setTimeout(60000)
let i = 0;
describe('coin', () => {

    test.skip('send', async() => {
      try {
        // Sdk.
        const { Wallet, Decimal, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet('');
        const decimal = await Decimal.connect(DecimalNetworks.devnet);
        decimal.setWallet(decimalWallet);
        // await decimalWallet.getAndUseGeneratedWallets();
        // decimalWallet.generateAndSwitchAccount(2, 1);
        console.log(decimalWallet);
        // const memo = 'some send';
        const options = {
          // feeCoin: "AWSMCNN",
          feeCoin: "",
          message: "",
          txBroadcastMode: "sync",
        }
        const sendCoin: clientMsgSendCoin = {
          to: "d01ykrttqa27eruxt3ve5ym27qq66r4qssgqthpcd",
          coin: "del",
          amount: "100",
        };
        
        let sender = await decimal.transactionSender();
        const res1 = await sender.sendCoin(sendCoin, options);
        console.log(res1)
        // decimalWallet.switchAccount(0);
        // sender = await decimal.transactionSender();
        // const res2 = await sender.sendCoin(sendCoin, options);
        // console.log(res2);
        // const res2 = await sender.sendCoin(sendCoin, options, true);
        // console.log(res1 === res2);
        // expect(res.transactionHash.length > 0).toBeTruthy();

      } catch (e) {
        console.log(e)
      }

    });

    test('multisend', async() => {
      try {
        // Sdk.
        const { Wallet, Decimal, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet('');
        const decimal = await Decimal.connect(DecimalNetworks.devnet);
        decimal.setWallet(decimalWallet);
        // await decimalWallet.getAndUseGeneratedWallets();
        // decimalWallet.generateAndSwitchAccount(2, 1);
        console.log(decimalWallet);
        // const memo = 'some send';
        const options = {
          // feeCoin: "AWSMCNN",
          feeCoin: "",
          message: "",
          txBroadcastMode: "sync",
        }
        const sendCoin: clientMsgMultiSendCoin[] = [
          {
            to: "d01ykrttqa27eruxt3ve5ym27qq66r4qssgqthpcd",
            coin: "del",
            amount: "100",
          },
          {
            to: "d01ykrttqa27eruxt3ve5ym27qq66r4qssgqthpcd",
            coin: "del",
            amount: "100",
          }
        ];
        
        let sender = await decimal.transactionSender();
        const res1 = await sender.multiSendCoin(sendCoin, options);
        console.log(res1)
        // decimalWallet.switchAccount(0);
        // sender = await decimal.transactionSender();
        // const res2 = await sender.sendCoin(sendCoin, options);
        // console.log(res2);
        // const res2 = await sender.sendCoin(sendCoin, options, true);
        // console.log(res1 === res2);
        // expect(res.transactionHash.length > 0).toBeTruthy();

      } catch (e) {
        console.log(e)
      }

    });

    test.skip('send all', async() => {
      try {
        // Sdk.
        const { Wallet, Decimal, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(info.menmonics.validator[0]);
        const decimal = await Decimal.connect(DecimalNetworks.devnet, true);
        decimal.setWallet(decimalWallet);
        console.log(decimalWallet);
        let balance = "2502841875957408182657600000000000";
        const options = {
          feeCoin: "del",
          baseCoinFeeEstimation: true,
          message: "",
          txBroadcastMode: "sync",
        }
        const sendCoinSimulate: clientMsgSendCoin = {
          to: "dx10dtaveph2q03x3244duvmd92gkwgyll5rlulmn",
          coin: "del",
          amount: BigNumber(balance).shiftedBy(-18).toString(),
        };
        
        let sender = await decimal.transactionSender();
        const res1: any = await sender.sendCoin(sendCoinSimulate, options, true);
        console.log(res1)

        const sendCoin: clientMsgSendCoin = {
          to: "dx10dtaveph2q03x3244duvmd92gkwgyll5rlulmn",
          coin: "del",
          amount: BigNumber(balance).minus(res1.amount).shiftedBy(-18).toString(),
        };

        const options2 = {
          feeCoin: "del",
          feeAmount: res1.amount,
          baseCoinFeeEstimation: true,
          message: "",
          txBroadcastMode: "sync",
        }
        const res2 = await sender.sendCoin(sendCoin, options2);
        console.log(res2)
        // decimalWallet.switchAccount(0);
        // sender = await decimal.transactionSender();
        // const res2 = await sender.sendCoin(sendCoin, options);
        // console.log(res2);
        // const res2 = await sender.sendCoin(sendCoin, options, true);
        // console.log(res1 === res2);
        // expect(res.transactionHash.length > 0).toBeTruthy();

      } catch (e) {
        console.log(e)
      }

    });
  test.skip('send 3 transactions with inc nonce', async() => {
    try {
      // Sdk.
      const { Wallet, Decimal, DecimalNetworks } = SDK;
      const decimalWallet = new Wallet(info.menmonics.validator[0]);
      const decimal = await Decimal.connect(DecimalNetworks.devnet, true);
      // const memo = 'some send';
      const options = {
        feeCoin: "initiald",
        // feeCoin: "",
        message: "",
        txBroadcastMode: "sync",
        accountInfoMode: "blockchain-with-mempool",
        sendTxDirectly: true,
      }
      const sendCoin: clientMsgSendCoin = {
        to: "dx1fatzsagt96pfglxlq245th252mv3neckvkmf68",
        coin: "del",
        amount: "100000",
      };
      const sender = await decimal.transactionSender();
      // const res2 = await sender.sendCoin(sendCoin, options);
      // const res3 = await sender.sendCoin(sendCoin, options);
      for (let i = 0; i < 100; i++) {
        sendCoin.amount = ((i + 1) * 0.01).toString();
        // console.log(sendCoin)
        await sender.sendCoin(sendCoin, options);
      }
      // const res = await Promise.all([
      //   sender.sendCoin(sendCoin, options),
      //   sender.createCoin(createCoin, options),
      //   // sender.sendCoin(sendCoin, options),
      // ])
      // console.log(res)
      // console.log(res1);
      // console.log(res2);
      // console.log(res3);

      // expect(res.transactionHash.length > 0).toBeTruthy();

    } catch (e) {
      console.log(e)
    }

  });

//   //
  // test.skip('create', async() => {
  //   try {
  //     const { Wallet, Decimal, DecimalNetworks } = SDK;
  //     const decimalWallet = new Wallet(info.menmonics.validator[0]);
  //     const decimal = await Decimal.connect(DecimalNetworks.devnet, true);
  //     decimal.setWallet(decimalWallet);
  //     const options = {
  //       feeCoin: "",
  //       message: "sdas",
  //       txBroadcastMode: "sync",
  //     }
  //     const sender = await decimal.transactionSender();
      
  //     for (let i = 0; i < coinsTestnet.length; i++) {
  //       const data = {
  //         ...coinsTestnet[i],
  //         identity: '',
  //       }
  //       // console.log(sendCoin)
  //       const res = await sender.createCoin(data, options);
  //       console.log(res);
  //       console.log(i);
  //     }
  //   } catch (e) {
  //     console.log(e)
  //   }
  // });
//   //
//   // test('update', async() => {
//   //   try {
//   //     const { Wallet, Decimal } = SDK;
//   //     const decimalWallet = new Wallet(info.menmonics.dec2[0], info.endpoints.backendDec2ApiEndpoint);
//   //     const decimal = await Decimal.connect(info.endpoints.backendDec2RpcEndpoint, info.endpoints.backendDec2ApiEndpoint);
//   //     decimal.setWallet(decimalWallet);
//   //     const memo = 'some send';
//   //     const sender = await decimal.transactionSender();
//   //     const options = {
//   //       feeCoin: "",
//   //       message: "sdas",
//   //       txBroadcastMode: "sync",
//   //       accountInfoMode: "blockchain-with-mempool",
//   //       sendTxDirectly: true,
//   //     }
//   //     const res = await sender.updateCoin(updateCoin, options);
//   //     console.log(res);
//   //   } catch (e) {
//   //     console.log(e.response.data)
//   //   }
//   // });
//   //
//   test.skip('multi send', async() => {
//     try {
//       // Sdk.
//       const { Wallet, Decimal } = SDK;
//       const decimalWallet = new Wallet(info.menmonics.dec2[0], info.endpoints.backendDec2ApiEndpoint);
//       const decimal = await Decimal.connect(info.endpoints.backendDec2RpcEndpoint, info.endpoints.backendDec2ApiEndpoint);
//       decimal.setWallet(decimalWallet);
//       const sender = await decimal.transactionSender();
//       const options = {
//         feeCoin: "",
//         message: "sdas",
//         txBroadcastMode: "sync",
//         accountInfoMode: "blockchain-with-mempool",
//         sendTxDirectly: true,
//       }
//       const res = await sender.multiSendCoin(multiSendCoin, options);
//       console.log(res);
//       // expect(res.transactionHash.length > 0).toBeTruthy();
  
//     } catch (e) {
//       console.log(e.response.data)
//     }
//   });
});
