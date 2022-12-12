import SDK from '../../src/index'
// import SDK from "../../lib-esm/"
// @ts-ignore
import info from "../_commonInfo"
import {sendCoin, updateCoin} from "../../src/interfaces/transactionsMockData"
import { getWalletAddressFromSignature } from "../../src/utils/walletUtils"
import getNft from "../../src/api/getNft"
import DecimalApi from '../../src/api'
jest.setTimeout(20000)
let i = 0;
describe('coin', () => {

    test.skip('send', async() => {
      try {
        // Sdk.
        const { Wallet, Decimal } = SDK;
        const decimalWallet = new Wallet(info.menmonics.dec2[0], info.endpoints.backendDec2ApiEndpoint);
        const decimal = await Decimal.connect(info.endpoints.backendDec2RpcEndpoint, info.endpoints.backendDec2ApiEndpoint);
        decimal.setWallet(decimalWallet);
        const res = await getNft(decimal.getApiInstance() as DecimalApi, decimalWallet)(1)
        console.log(res);
        console.log(decimalWallet.getPublicKey(0, true))

        if (res) {
          const { timestamp, signature } = res;
          const data = {
            timestamp
          }
          getWalletAddressFromSignature(data, JSON.stringify(signature));
        }
        // expect(res.transactionHash.length > 0).toBeTruthy();

      } catch (e) {
        console.log(e)
      }

    });
});

