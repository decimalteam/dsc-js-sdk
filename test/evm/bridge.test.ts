
import { tokenize } from 'protobufjs';
import SDK from '../../src/index'
import {ethers} from "ethers";
jest.setTimeout(2000000)

const mnemonic1 = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';
const mnemonic3 = 'arm twice crater feature rifle verb junk habit child cattle exclude tomato rather metal later asset wolf grief oppose turkey easy nature boy begin';

const ETH_TEST = 5;
const BSC_TEST = 97;
const DSC_TEST = 202020;
const DSC_DEV = 20202020;

describe('bridge', () => {

    test('transfer DEL', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);

        await decimalEVM.connect('bridge')

        const to = "0x0000000000000000000000000000000000000099"
        const amount = decimalEVM.parseEther(13);
        const toChainId = DSC_TEST
        const serviceFee = await decimalEVM.getBridgeServiceFees(toChainId);
        const tx = await decimalEVM.bridgeTransferDEL(to, amount, serviceFee, toChainId)
        console.log(tx)
    })

    test('transfer tokens', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);

        await decimalEVM.connect('bridge')

        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        const amount = decimalEVM.parseEther(14);
        const bridgeAddress = await decimalEVM.getDecimalContractAddress('bridge')
        await decimalEVM.approveToken(tokenAddress, bridgeAddress, amount)

        const to = "0x0000000000000000000000000000000000000099"
        const toChainId = DSC_TEST
        const serviceFee = await decimalEVM.getBridgeServiceFees(toChainId);
        const tx = await decimalEVM.bridgeTransferTokens(tokenAddress, to, amount, serviceFee, toChainId)
        console.log(tx)
    })

})


