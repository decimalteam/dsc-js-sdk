
import SDK from '../../src/index'
import fs from 'fs'
import fetch from "node-fetch";
jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

describe('ifps', () => {


    test('upload token icon from file', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.testnet);
        await decimalEVM.connect();

        const filePath = 'C:/Users/User/Desktop/unnamed.png'
        const buffer = fs.readFileSync(filePath);
        
        const filename = filePath
        const result = await decimalEVM.uploadTokenBufferToIPFS(buffer, filename)
        console.log(result)
    })

    test('upload token icon from url', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const uri = `https://cdn-icons-png.flaticon.com/512/7977/7977062.png`
        const buffer = await fetch(uri).then((res) => res.buffer());

        const filename = uri
        const result = await decimalEVM.uploadTokenBufferToIPFS(buffer, filename)
        console.log(result)

        const cidUrl = decimalEVM.getUrlFromCid(result.image)
        console.log(cidUrl)
    })

 
    test('upload nft from uri', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const uri = `https://e7.pngegg.com/pngimages/787/258/png-clipart-apple-logo-apple-logo-heart-logo-thumbnail.png`
        const buffer = await fetch(uri).then((res) => res.buffer());

        const filename = uri
        const name = 'NameNFT23'
        const description = 'Description NFT2'
        const result = await decimalEVM.uploadNFTBufferToIPFS(buffer, filename, name, description)
        console.log(result)

        const cidMetadataUrl = decimalEVM.getUrlFromCid(result.file_cid_meta)
        const cidUrl = decimalEVM.getUrlFromCid(result.image)
        console.log(cidMetadataUrl)
        console.log(cidUrl)
    })

    test('upload nft from file', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.testnet);
        await decimalEVM.connect();

        const filePath = 'C:/Users/User/Desktop/unnamed.png'
        const buffer = fs.readFileSync(filePath);
        
        const filename = filePath
        const name = 'NameNFT23'
        const description = 'Description NFT2'
        const result = await decimalEVM.uploadNFTBufferToIPFS(buffer, filename, name, description)
        console.log(result)
    })


    /* example upload NFT from browser
    const name = 'NameNFT23'
    const description = 'Description NFT2'
    const metadataBlob = await decimalEVM.getBlobMetadata(name, description)

    var input = document.querySelector('input[type="file"]')

    var data = new FormData()
    data.append('uploading_files', input.files[0])
    data.append('uploading_files', metadataBlob)

    const result = await decimalEVM.uploadNFTFormToIPFS(data)
    */

    /* example upload Token from browser
    var input = document.querySelector('input[type="file"]')

    var data = new FormData()
    data.append('uploading_files', input.files[0])

    const result = await decimalEVM.uploadTokenFormToIPFS(data)
    */
    
})


