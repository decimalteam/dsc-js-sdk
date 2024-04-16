
import SDK from '../../src/index'
import fs from 'fs'

jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

describe('ifps', () => {

    test('upload from file', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.testnet);
        await decimalEVM.connect();

        const filePath = 'C:/Users/User/Desktop/unnamed.png'
        const buffer = fs.readFileSync(filePath);
        
        const filename = filePath
        const name = 'NameNFT23'
        const description = 'Description NFT2'
        const result = await decimalEVM.uploadBufferToIPFS(buffer, filename, name, description)
        console.log(result)
    })

    test('upload from uri', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.testnet);
        await decimalEVM.connect();

        const uri = `https://e7.pngegg.com/pngimages/787/258/png-clipart-apple-logo-apple-logo-heart-logo-thumbnail.png`
        const imageBlob = await fetch(uri).then((res) => res.blob());
        
        const buffer = Buffer.from(await imageBlob.arrayBuffer());

        const filename = uri
        const name = 'NameNFT23'
        const description = 'Description NFT2'
        const result = await decimalEVM.uploadBufferToIPFS(buffer, filename, name, description)
        console.log(result)

        const cidUrl = decimalEVM.getUrlFromCid(result.file_cid_media)
        console.log(cidUrl)
    })

    /* example upload from browser
    const name = 'NameNFT23'
    const description = 'Description NFT2'
    const metadataBlob = await decimalEVM.getBlobMetadata(name, description)

    var input = document.querySelector('input[type="file"]')

    var data = new FormData()
    data.append('uploading_files', input.files[0])
    data.append('uploading_files', metadataBlob)

    const result = await decimalEVM.uploadToIPFS(data)
    */
    
})


