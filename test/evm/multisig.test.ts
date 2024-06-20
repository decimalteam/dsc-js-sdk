
import { tokenize } from 'protobufjs';
import SDK from '../../src/index'
import {ethers} from "ethers";
jest.setTimeout(2000000)

const mnemonic1 = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';
const mnemonic3 = 'arm twice crater feature rifle verb junk habit child cattle exclude tomato rather metal later asset wolf grief oppose turkey easy nature boy begin';

describe('multisig', () => {

    
    test('send tokens (special function)', async() => {
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
        const result = await decimalEVM.createMultiSig(ownerData, weightThreshold)
        console.log(result)
    })
  
})


