import SDK from '../../src/index'
import * as fs from 'fs';

jest.setTimeout(60000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

import {
	abi as tokenCenterAbi
} from "../../src/decimalevm/abi/DecimalTokenCenter.json";

describe('Contract', () => {
 
    test('verifyСontract', async() => {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
      
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const contractCodeUTF8 = fs.readFileSync('C:/Users/User/Desktop/contract.sol', 'utf8');
        const contractCodeUTF16 = fs.readFileSync('C:/Users/User/Desktop/contract.sol', 'utf16le');
        let contractCode
        if (contractCodeUTF8.includes('Sources flattened')) {
            contractCode = contractCodeUTF8
        } else if (contractCodeUTF16.includes('Sources flattened')) {
            contractCode = contractCodeUTF16
        }

        const contractAddress = '0x21786df4741ab50cdfec064ad9aeef84898a86a4'

        const compiler = 'solc-linux-amd64-v0.8.20+commit.a1b79de6'
        const optimizer = "true"
        const runs = "100"
        const evm_version = "paris"
        const contract = await decimalEVM.verifyСontract(contractAddress, contractCode, compiler, optimizer, runs, evm_version)
        console.log(contract)
        
    })

       
    test('load verified contract', async() => {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();
        
            const contractAddress = '0x3c546e3eb206c0be7d3c9b85c81cd98700fd3db6'
            const contract = await decimalEVM.connectToContract(contractAddress)
            const owner = await contract.call("owner()")
            console.log(owner)
    })

    test('call to contract', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const newToken: any = {
                creator: decimalWallet.evmAddress,
                symbol: 'COStest'+Math.floor(Math.random() * 10000),
                name: 'CosmosName',
                crr: 50,
                initialMint: decimalEVM.parseEther(1000),
                minTotalSupply: decimalEVM.parseEther(1),
                maxTotalSupply: decimalEVM.parseEther(5000000),
                identity: 'asd',
            }
            const reserve = decimalEVM.parseEther(1250);

            const contractAddress = await decimalEVM.getDecimalContractAddress('token-center')

            const contract = await decimalEVM.connectToContract(contractAddress, tokenCenterAbi)

            const tokenAddressBySymbol = await contract.call("tokens(string)", newToken.symbol)
            if (tokenAddressBySymbol == "0x0000000000000000000000000000000000000000") {

                const options = {
                    value: reserve
                }
                const gas = await contract.estimateGas("createToken", newToken, options)
                console.log(gas)
                const options2 = {
                    value: reserve,
                    gasLimit: 10000000,
                    maxPriorityFeePerGas: 10000000
                }
                const result = await contract.call("createToken", newToken, options2)
                console.log(result)
                const events = await contract.parseLog(result.logs)
                console.log(events)
                console.log(`successfully`)
            } else {
                console.log(`token ${newToken.symbol} already exist`, tokenAddressBySymbol)
            }
        } catch (e) {
            console.log(e)
        }
    });

    test('send transaction', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const newToken: any = {
                creator: decimalWallet.evmAddress,
                symbol: 'COStest'+Math.floor(Math.random() * 10000),
                name: 'CosmosName',
                crr: 50,
                initialMint: decimalEVM.parseEther(1000),
                minTotalSupply: decimalEVM.parseEther(1),
                maxTotalSupply: decimalEVM.parseEther(5000000),
                identity: 'asd',
            }
            const reserve = decimalEVM.parseEther(1250);

            const contractAddress = await decimalEVM.getDecimalContractAddress('token-center')

            const contract = await decimalEVM.connectToContract(contractAddress, tokenCenterAbi)

            const options = {
                ...await contract.getDefaultOptions(),
                value: reserve,
            }
            console.log(options)
            const populateTransaction = await contract.populateTransaction("createToken", newToken, options)
            console.log(populateTransaction)
            populateTransaction.chainId = 20202020 //for ethres 5.5.1
            const signTransaction = await contract.signTransaction(populateTransaction)
            console.log(signTransaction)

            //send signed populateTransaction
            const sendTransaction = await contract.sendSignedTransaction(signTransaction)
            console.log(sendTransaction)
            
            // or send just populateTransaction
            //const sendTransaction = await contract.sendTransaction(populateTransaction)
            //console.log(sendTransaction)

            const events = await contract.parseLog(sendTransaction?.logs)
            console.log(events)
            
        } catch (e) {
            console.log(e)
        }
    });

    test('multicall', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        console.log(decimalWallet.evmAddress)

        const callDatas = [{
            target: "0xBEc675cA5ACdB12eAE9F31909C96C6c8961F8C69",
            iface: "function transfer(address to, uint amount)",
            params: ["0x0000000000000000000000000000000000000001", decimalEVM.parseEther("1.0")]
        },
        {
            target: "0xBEc675cA5ACdB12eAE9F31909C96C6c8961F8C69",
            iface: "function transfer(address to, uint amount)",
            params: ["0x0000000000000000000000000000000000000002", decimalEVM.parseEther("1.0")]
        }]

        const tx = await decimalEVM.multiCall(callDatas)
        console.log(tx)
    })
    
})