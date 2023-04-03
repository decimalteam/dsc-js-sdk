// import SDK from '../../src/index'
import SDK from "../../lib-esm/"
// @ts-ignore
import info from "../_commonInfo"
import {NETWORKS} from "../../src/endpoints";

jest.setTimeout(15000)

const mnemonic = 'toe drum dance gun cricket hard second deliver awesome wagon industry indicate leader gloom fat culture cost odor frozen throw detail salt blush grant'

describe('evm', () => {
  test('get contract by address', async() => {
    try {
      const { Wallet, Decimal } = SDK;
      const decimalWallet = new Wallet(mnemonic);
      const decimal = await Decimal.connect(NETWORKS.DEVNET);
      decimal.setWallet(decimalWallet)
      const constract = await decimal.getContract('0x7d398c1076d8666679e2e5ef794f91519bf15133');
      // constract.setAddressFrom()
      const action = await constract.call('decimals')
      expect(await action == 18).toBeTruthy();
    } catch (e) {
      console.log(e)
    }
  });

});

