
import { tokenize } from 'protobufjs';
import SDK from '../../src/index'
import {ethers} from "ethers";
jest.setTimeout(2000000)

const mnemonic1 = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';
const mnemonic3 = 'arm twice crater feature rifle verb junk habit child cattle exclude tomato rather metal later asset wolf grief oppose turkey easy nature boy begin';
let multisigAddress = '0x5502b6e571d3a8a175b7c0f49b0ed1704538b410'
// safe (0xB9d348f311Bde4aDEDC7ad265E5D5527A90df115 - testnet)
// safe (0x5502b6e571d3a8a175b7c0f49b0ed1704538b410 - devnet)
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

    test('send DEL (with send signatures)', async() => {
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
        //prepare
        //const amount = decimalEVM1.parseEther('100')
        //await decimalEVM1.sendDEL(multisigAddress, amount)

        const amount = decimalEVM1.parseEther('10')
        const safeTx = await decimalEVM1.multisig.buildTxSendDEL(multisigAddress, "0x0000000000000000000000000000000000000099", amount)
        const signTx1 = await decimalEVM1.multisig.signTx(multisigAddress, safeTx)
        const signTx2 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const signTx3 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const result = await decimalEVM1.multisig.executeTx(multisigAddress, safeTx, [signTx1, signTx2, signTx3])

        console.log(result)
    })

    test('send DEL (with approve hash signatures)', async() => {
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
        //prepare
        //const amount = decimalEVM1.parseEther('100')
        //await decimalEVM1.sendDEL(multisigAddress, amount)

        const amount = decimalEVM1.parseEther('10')
        const safeTx = await decimalEVM1.multisig.buildTxSendDEL(multisigAddress, "0x0000000000000000000000000000000000000099", amount)
        const {safeTransaction: signTx1, tx: tx1 } = await decimalEVM1.multisig.approveHash(multisigAddress, safeTx)
        const {safeTransaction: signTx2, tx: tx2} = await decimalEVM2.multisig.approveHash(multisigAddress, safeTx)
        const {safeTransaction: signTx3, tx: tx3 } = await decimalEVM3.multisig.approveHash(multisigAddress, safeTx)
        const result = await decimalEVM1.multisig.executeTx(multisigAddress, safeTx, [signTx1, signTx2, signTx3])

        console.log(result)
    })

     
    test('send tokens', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);
        const decimalWallet2 = new Wallet(mnemonic2);
        const decimalWallet3 = new Wallet(mnemonic3);

        const decimalEVM1 = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);
        const decimalEVM2 = new DecimalEVM(decimalWallet2, DecimalNetworks.devnet);
        const decimalEVM3 = new DecimalEVM(decimalWallet3, DecimalNetworks.devnet);

        await decimalEVM1.connect('multi-sig')
        await decimalEVM1.connect('token-center')
        await decimalEVM2.connect('multi-sig')
        await decimalEVM3.connect('multi-sig')

        //prepare
        const amount = decimalEVM1.parseEther('100')
        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        await decimalEVM1.transferToken(tokenAddress, multisigAddress, amount)

        const safeTx = await decimalEVM1.multisig.buildTxSendToken(multisigAddress, tokenAddress, "0x0000000000000000000000000000000000000099", amount)
        const signTx1 = await decimalEVM1.multisig.signTx(multisigAddress, safeTx)
        const signTx2 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const signTx3 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const result = await decimalEVM1.multisig.executeTx(multisigAddress, safeTx, [signTx1, signTx2, signTx3])

        console.log(result)
    })

    test('send nft', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);
        const decimalWallet2 = new Wallet(mnemonic2);
        const decimalWallet3 = new Wallet(mnemonic3);

        const decimalEVM1 = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);
        const decimalEVM2 = new DecimalEVM(decimalWallet2, DecimalNetworks.devnet);
        const decimalEVM3 = new DecimalEVM(decimalWallet3, DecimalNetworks.devnet);

        console.log(decimalWallet1.evmAddress!)
        await decimalEVM1.connect('multi-sig')
        await decimalEVM2.connect('multi-sig')
        await decimalEVM3.connect('multi-sig')

        const tokenAddress = "0x65Dad3283BCE73E5EfBbaB8B0183dF5FdF4506e5"
        const tokenId = 0;
        const safeTx = await decimalEVM1.multisig.buildTxSendNFT(multisigAddress, tokenAddress, "0x0000000000000000000000000000000000000099", tokenId, ) // send drc721
        //const safeTx = await decimalEVM1.multisig.buildTxSendNFT(multisigAddress, tokenAddress, "0x0000000000000000000000000000000000000099", tokenId, amount) // send drc1155
        const signTx1 = await decimalEVM1.multisig.signTx(multisigAddress, safeTx)
        const signTx2 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx)
        const signTx3 = await decimalEVM3.multisig.signTx(multisigAddress, safeTx)
        const result = await decimalEVM1.multisig.executeTx(multisigAddress, safeTx, [signTx1, signTx2, signTx3])
        console.log(result)

    });

    test('send tokens (get and build and sign the transaction of the first participant)', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);
        const decimalWallet2 = new Wallet(mnemonic2);
        const decimalWallet3 = new Wallet(mnemonic3);

        const decimalEVM1 = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);
        const decimalEVM2 = new DecimalEVM(decimalWallet2, DecimalNetworks.devnet);
        const decimalEVM3 = new DecimalEVM(decimalWallet3, DecimalNetworks.devnet);

        await decimalEVM1.connect('multi-sig')
        await decimalEVM1.connect('token-center')
        await decimalEVM2.connect('multi-sig')
        await decimalEVM3.connect('multi-sig')

        //prepare
        const amount = decimalEVM1.parseEther('100')
        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        await decimalEVM1.transferToken(tokenAddress, multisigAddress, amount)

        //first participant build and approve transaction
        const safeTx = await decimalEVM1.multisig.buildTxSendToken(multisigAddress, tokenAddress, "0x0000000000000000000000000000000000000099", amount)
        await decimalEVM1.multisig.approveHash(multisigAddress, safeTx)

        //get approved transaction
        const {transactions: safeTxs, approvers} = await decimalEVM1.multisig.getCurrentApproveTransactions(multisigAddress);
        const decodeSafeTx = decimalEVM1.multisig.decodeTransaction(safeTxs[0]) // decode first transaction
        const approver = approvers[0] // approver participant first transaction
        console.log(decodeSafeTx)
        if (decodeSafeTx.tokenType == 'DRC20') {
            //build and sign the transaction of the first participant
            const safeTx_ = await decimalEVM1.multisig.buildTxSendToken(multisigAddress, decodeSafeTx.token, decodeSafeTx.to, decodeSafeTx.amount!.toString())
            const signTx1 = await decimalEVM2.multisig.getSignatureForParticipant(approver)
            const signTx2 = await decimalEVM2.multisig.signTx(multisigAddress, safeTx_)
            //const {safeTransaction: signTx2 } = await decimalEVM2.multisig.approveHash(multisigAddress, safeTx_) // or approveHash

            //execute transaction
            const result = await decimalEVM1.multisig.executeTx(multisigAddress, safeTx_, [signTx1, signTx2])
            console.log(result)
        }
    })
})


