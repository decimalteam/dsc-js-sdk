
import { tokenize } from 'protobufjs';
import SDK from '../../src/index'
import {ethers} from "ethers";
jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

describe('multicall', () => {

    test('send tokens (special function)', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);

        await decimalEVM.connect('multi-call')
        await decimalEVM.connect('token-center')

        const tokenAddress1 = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        const tokenAddress2 = "0x1f68CaD1e55049793F6c9229EAD50f1c651fEb10"
        let data: any = []
        data.push({
            token: tokenAddress1,
            to: "0x0000000000000000000000000000000000000001",
            amount: decimalEVM.parseEther(1)
        })
        data.push({
            token: tokenAddress1,
            to: "0x0000000000000000000000000000000000000002",
            amount: decimalEVM.parseEther(1)
        })
        data.push({
            token: tokenAddress2,
            to: "0x0000000000000000000000000000000000000003",
            amount: decimalEVM.parseEther(1)
        })
        data.push({
            token: tokenAddress2,
            to: "0x0000000000000000000000000000000000000004",
            amount: decimalEVM.parseEther(1)
        })

        const tx = await decimalEVM.multiSendToken(data)
        console.log(tx)
    })
    
    test('send tokens (custom)', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);

        await decimalEVM.connect('multi-call')
        await decimalEVM.connect('token-center')

        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        const spender = await decimalEVM.getDecimalContractAddress('multi-call')
        const amountSum = decimalEVM.parseEther(4);

        const sign = await decimalEVM.getSignPermitToken(tokenAddress, spender, amountSum)
        console.log(`
          v: ${sign?.v}
          r: ${sign?.r}
          s: ${sign?.s}
        `)

        const owner = decimalWallet.evmAddress!;
        const deadline = ethers.constants.MaxUint256
        const callDatas = [{
            target: tokenAddress,
            iface: "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
            params: [owner, spender, amountSum, deadline, sign?.v, sign?.r, sign?.s ]
        },
        {
            target: tokenAddress,
            iface: "function transferFrom(address from, address to, uint256 value)",
            params: [owner, "0x0000000000000000000000000000000000000001", decimalEVM.parseEther(1)]
        },
        {
            target: tokenAddress,
            iface: "function transferFrom(address from, address to, uint256 value)",
            params: [owner, "0x0000000000000000000000000000000000000002", decimalEVM.parseEther(1)]
        },
        {
            target: tokenAddress,
            iface: "function transferFrom(address from, address to, uint256 value)",
            params: [owner, "0x0000000000000000000000000000000000000003", decimalEVM.parseEther(1)]
        },
        {
            target: tokenAddress,
            iface: "function transferFrom(address from, address to, uint256 value)",
            params: [owner, "0x0000000000000000000000000000000000000004", decimalEVM.parseEther(1)]
        },]
        
        const tx = await decimalEVM.multiCall(callDatas)
        console.log(tx)
    })
    
})


