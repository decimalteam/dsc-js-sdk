// import SDK from '../../src/index'
import SDK from "../../lib-esm/"

// @ts-ignore
import info from "../_commonInfo"
jest.setTimeout(15000)

describe('addresses', () => {
  test.skip('equal', async() => {
    try {
      // Sdk.
      const { Wallet } = SDK;
      const decimalWallet = new Wallet(info.menmonics.dec2[0], info.endpoints.backendDec2ApiEndpoint);
      const cosmosAccountAddress = decimalWallet.address;
      const evmAccountAddress = decimalWallet.evmAddress as string;
      console.log("cosmosAccountAddress ", cosmosAccountAddress)
      console.log("evmAccountAddress ", evmAccountAddress)
      const cosmosAccountAddress2 = decimalWallet.encodeCosmosAccountAddress(evmAccountAddress);
      const evmAccountAddress2 = decimalWallet.decodeCosmosAccountAddress(cosmosAccountAddress);
      expect(cosmosAccountAddress).toEqual(cosmosAccountAddress2);
      expect(evmAccountAddress).toEqual(evmAccountAddress2);
    } catch (e) {
      console.log(e)
    }
  });
});

