
import { tokenize } from 'protobufjs';
import SDK from '../../src/index'
import {ethers} from "ethers";
jest.setTimeout(2000000)

const mnemonic1 = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';
const mnemonic3 = 'arm twice crater feature rifle verb junk habit child cattle exclude tomato rather metal later asset wolf grief oppose turkey easy nature boy begin';
let multisigAddress = '0xB9d348f311Bde4aDEDC7ad265E5D5527A90df115'
describe('multisig', () => {


    test('create multisig wallet', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);
        const decimalWallet2 = new Wallet(mnemonic2);
        const decimalWallet3 = new Wallet(mnemonic3);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.testnet);

        await decimalEVM.connect('multi-sig')

        const ownerData = [{
            owner: decimalWallet1.evmAddress!,
            weight: 100
        },
        {
            owner: decimalWallet2.evmAddress!,
            weight: 100
        },
        {
            owner: decimalWallet3.evmAddress!,
            weight: 100
        }]
        const weightThreshold = 200
        const result = await decimalEVM.multisig.create(ownerData, weightThreshold)
        console.log(result)
        multisigAddress = result.multisigAddress
    })
    
    test('send DEL', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);
        const decimalWallet2 = new Wallet(mnemonic2);
        const decimalWallet3 = new Wallet(mnemonic3);

        const decimalEVM1 = new DecimalEVM(decimalWallet1, DecimalNetworks.testnet);
        const decimalEVM2 = new DecimalEVM(decimalWallet2, DecimalNetworks.testnet);
        const decimalEVM3 = new DecimalEVM(decimalWallet3, DecimalNetworks.testnet);

        await decimalEVM1.connect('multi-sig')
        await decimalEVM2.connect('multi-sig')
        await decimalEVM3.connect('multi-sig')
        //const amount = decimalEVM1.parseEther('100')
        //await decimalEVM1.sendDEL(multisigAddress, amount)

        const amount = decimalEVM1.parseEther('10')
        const safeTx = await decimalEVM1.multisig.buildTxSendDEL(multisigAddress, "0x0000000000000000000000000000000000000099", amount)
        const signTx1 = await decimalEVM1.multisig.signTx(multisigAddress, safeTx)
        const signTx2 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const signTx3 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const result = await decimalEVM1.multisig.executeTx(safeTx, [signTx1, signTx2, signTx3], multisigAddress)

        console.log(result)
    })
  
})


