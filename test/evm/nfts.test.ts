import SDK from '../../src/index'

jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

//var addressDRC721Standart: string, addressDRC1155Standart: string;
var addressDRC721: string, addressDRC1155: string;

describe('NFTs', () => {

    test('create nfts collection', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const newNFT: any = {
          creator: decimalWallet.evmAddress,
          symbol: 'NFTtest',
          name: 'NFTName',
          contractURI: 'ipfs://ipfs/qwerty12345',
          refundable: false,
          burnable: true
        }

        //const resultDRC721Standart = await decimalEVM.createCollectionDRC721Standart(newNFT)
        //const resultDRC1155Standart = await decimalEVM.createCollectionDRC1155Standart(newNFT)
        const resultDRC721 = await decimalEVM.createCollectionDRC721(newNFT)
        const resultDRC1155 = await decimalEVM.createCollectionDRC1155(newNFT)
        //console.log(`
        //    successfully create standart collections
        //    DRC721Standart ${resultDRC721Standart.nftCollectionAddress}
        //    DRC1155Standart ${resultDRC1155Standart.nftCollectionAddress}
        //`)
        console.log(`
          successfully create collections
          DRC721 ${resultDRC721.nftCollectionAddress}
          DRC1155 ${resultDRC1155.nftCollectionAddress}
        `)
        //addressDRC721Standart = resultDRC721Standart.nftCollectionAddress
        //addressDRC1155Standart = resultDRC1155Standart.nftCollectionAddress
        addressDRC721 = resultDRC721.nftCollectionAddress
        addressDRC1155 = resultDRC1155.nftCollectionAddress
      } catch (e) {
        console.log(e)
      }
    });
/*
    test('mint DRC721Standart and DRC1155Standart', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const to = decimalWallet.evmAddress!

        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId = 0
        const amount = 20
        const resultDRC721Standart = await decimalEVM.mintNFT(addressDRC721Standart, to, tokenURI) //DRC721Standart
        const resultDRC1155Standart = await decimalEVM.mintNFT(addressDRC1155Standart, to, tokenURI, tokenId, amount) //DRC1155Standart
        console.log(`
          successfully mintNFT
          DRC721Standart tokenId ${resultDRC721Standart.tokenId}
          DRC1155Standart tokenId ${resultDRC1155Standart.tokenId}
        `)
      } catch (e) {
        console.log(e)
      }
    });
    */
    test('mint DRC721 and DRC1155 with DEL reserve and after add DEL reserve', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //mint
        const to = decimalWallet.evmAddress!
        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId = 11
        const amount = 20
        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(addressDRC721, to, tokenURI, reserveFor721) //DRC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultDRC1155 = await decimalEVM.mintNFTWithDELReserve(addressDRC1155, to, tokenURI, reserveFor1155, tokenId, amount) //DRC1155

        //repeated mint 1155
        const quantity = 5
        const reserveFor1155_2 = await decimalEVM.calcReserveNFT1155(addressDRC1155, tokenId, quantity); // calculation of the required reserve for 5 quantity
        await decimalEVM.mintNFTWithDELReserve(addressDRC1155, to, tokenURI, reserveFor1155_2, tokenId, quantity) //DRC1155

        //add reserve
        const reserveAmount = decimalEVM.parseEther(1); // 1 del
        await decimalEVM.addDELReserveNFT(addressDRC721, resultDRC721.tokenId, reserveAmount) //DRC721
        await decimalEVM.addDELReserveNFT(addressDRC1155, resultDRC1155.tokenId, reserveAmount) //DRC1155

        console.log(`
          successfully mintNFTWithDELReserve and addDELReserveNFT
          DRC721 tokenId ${resultDRC721.tokenId}
          DRC1155 tokenId ${resultDRC1155.tokenId}
        `)
      } catch (e) {
        console.log(e)
      }
    });

    test('mint DRC721 and DRC1155 with Token reserve and after add Token reserve', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
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
        const {tokenAddress} = await decimalEVM.createToken(newToken, reserve)

        //mint with approve
        const to = decimalWallet.evmAddress!
        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId = 22
        const amount = 20
        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        await decimalEVM.approveToken(tokenAddress, addressDRC721, reserveFor721)
        const resultDRC721 = await decimalEVM.mintNFTWithTokenReserve(addressDRC721, to, tokenURI, reserveFor721, tokenAddress) //DRC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        await decimalEVM.approveToken(tokenAddress, addressDRC1155, reserveFor1155)
        const resultDRC1155 = await decimalEVM.mintNFTWithTokenReserve(addressDRC1155, to, tokenURI, reserveFor1155, tokenAddress, undefined, tokenId, amount) //DRC1155

        //mint with approve
        const signForDRC721_permit = await decimalEVM.getSignPermitToken(tokenAddress, addressDRC721, reserveFor721)
        const resultDRC721_permit = await decimalEVM.mintNFTWithTokenReserve(addressDRC721, to, tokenURI, reserveFor721, tokenAddress, signForDRC721_permit) //DRC721
        const signForDRC1155_permit = await decimalEVM.getSignPermitToken(tokenAddress, addressDRC1155, reserveFor1155)
        const resultDRC1155_permit = await decimalEVM.mintNFTWithTokenReserve(addressDRC1155, to, tokenURI, reserveFor1155, tokenAddress, signForDRC1155_permit, tokenId, amount) //DRC1155

        //add reserve with approve
        const reserveAmount = decimalEVM.parseEther(1); // 1 del
        await decimalEVM.approveToken(tokenAddress, addressDRC721, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressDRC721, resultDRC721.tokenId, reserveAmount) //DRC721
        await decimalEVM.approveToken(tokenAddress, addressDRC1155, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressDRC1155, resultDRC1155.tokenId, reserveAmount) //DRC1155

        //add reserve with permit
        const signForDRC721 = await decimalEVM.getSignPermitToken(tokenAddress, addressDRC721, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressDRC721, resultDRC721.tokenId, reserveAmount, signForDRC721) //DRC721
        const signForDRC1155 = await decimalEVM.getSignPermitToken(tokenAddress, addressDRC1155, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressDRC1155, resultDRC1155.tokenId, reserveAmount, signForDRC1155) //DRC1155

        console.log(`
          successfully mintNFTWithTokenReserve and addTokenReserveNFT
          DRC721 tokenId ${resultDRC721.tokenId}
          DRC1155 tokenId ${resultDRC1155.tokenId}
        `)
      } catch (e) {
        console.log(e)
      }
    });

    test('transfer nft', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
        const owner = decimalWallet.evmAddress!
        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId = 0
        const amount = 20
        //const resultDRC721Standart = await decimalEVM.mintNFT(addressDRC721Standart, owner, tokenURI) //DRC721Standart
        //const resultDRC1155Standart = await decimalEVM.mintNFT(addressDRC1155Standart, owner, tokenURI, tokenId, amount) //DRC1155Standart

        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(addressDRC721, owner, tokenURI, reserveFor721) //DRC721
        const resultDRC1155 = await decimalEVM.mintNFTWithDELReserve(addressDRC1155, owner, tokenURI, reserveFor1155, tokenId, amount) //DRC1155

        //transfer
        const from = owner
        const to = decimalWallet2.evmAddress!

        //await decimalEVM.transferNFT(addressDRC721Standart, from, to, resultDRC721Standart.tokenId) //DRC721Standart
        await decimalEVM.transferNFT(addressDRC721, from, to, resultDRC721.tokenId) //DRC721
        //await decimalEVM.transferNFT(addressDRC1155Standart, from, to, resultDRC1155Standart.tokenId, amount) //DRC1155Standart
        await decimalEVM.transferNFT(addressDRC1155, from, to, resultDRC1155.tokenId, amount) //DRC1155
        console.log(`successfully transfer`)
      } catch (e) {
        console.log(e)
      }
    });
    test('disable mint NFT', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        //await decimalEVM.disableMintNFT(addressDRC721Standart) //DRC721Standart
        await decimalEVM.disableMintNFT(addressDRC721) //DRC721
        //await decimalEVM.disableMintNFT(addressDRC1155Standart) //DRC1155Standart
        await decimalEVM.disableMintNFT(addressDRC1155) //DRC1155
        console.log(`successfully disableMintNFT`)
      } catch (e) {
        console.log(e)
      }
    });
    test('burn nft', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenId = 0
        const amount = 10
        //await decimalEVM.burnNFT(addressDRC721Standart, tokenId) //DRC721Standart
        await decimalEVM.burnNFT(addressDRC721, tokenId) //DRC721
        //await decimalEVM.burnNFT(addressDRC1155Standart, tokenId, amount) //DRC1155Standart
        await decimalEVM.burnNFT(addressDRC1155, tokenId, amount) //DRC1155
        console.log(`successfully burn`)
      } catch (e) {
        console.log(e)
      }
    });

    // test('set base uri nft', async() => {
    //   try {
    //     // Sdk.
    //     const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
    //     const decimalWallet = new Wallet(mnemonic);
        
    //     const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
    //     await decimalEVM.connect();

    //     const baseURI = 'https://example.com/'
    //     //await decimalEVM.setBaseURINFT(addressDRC721Standart, baseURI) //DRC721Standart
    //     await decimalEVM.setBaseURINFT(addressDRC721, baseURI) //DRC721
    //     //await decimalEVM.setBaseURINFT(addressDRC1155Standart, baseURI) //DRC1155Standart
    //     await decimalEVM.setBaseURINFT(addressDRC1155, baseURI) //DRC1155
    //     console.log(`successfully setBaseURINFT`)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // });

    test('set token uri nft', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenId = 0
        const tokenURI = 'image.png'
        //await decimalEVM.setTokenURINFT(addressDRC721Standart, tokenId, tokenURI) //DRC721Standart
        await decimalEVM.setTokenURINFT(addressDRC721, tokenId, tokenURI) //DRC721
        //await decimalEVM.setTokenURINFT(addressDRC1155Standart, tokenId, tokenURI) //DRC1155Standart
        await decimalEVM.setTokenURINFT(addressDRC1155, tokenId, tokenURI) //DRC1155
        console.log(`successfully setTokenURINFT`)
      } catch (e) {
        console.log(e)
      }
    });
    test('approve nft DRC721Standart and DRC721', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
        const owner = decimalWallet.evmAddress;
        if (owner === undefined) throw new Error("owner cannot be undefined")
        const tokenURI = "/ipfs/zxcvb12345";

        //const resultDRC721Standart = await decimalEVM.mintNFT(addressDRC721Standart, owner, tokenURI) //DRC721Standart

        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(addressDRC721, owner, tokenURI, reserveFor721) //DRC721

        //transfer
        const to = decimalWallet2.evmAddress;
        if (to === undefined) throw new Error("to cannot be undefined")

        //await decimalEVM.approveNFT721(addressDRC721Standart, to, resultDRC721Standart.tokenId) //DRC721Standart
        await decimalEVM.approveNFT721(addressDRC721, to, resultDRC721.tokenId) //DRC721

        //const approveAddressDRC721Standart = await decimalEVM.getApprovedNFT721(addressDRC721Standart, resultDRC721Standart.tokenId) //DRC721Standart
        const approveAddressDRC721 = await decimalEVM.getApprovedNFT721(addressDRC721, resultDRC721.tokenId) //DRC721
        //if (approveAddressDRC721Standart != decimalEVM.getAddress(to)) throw new Error("fail approveNFT721")
        if (approveAddressDRC721 != decimalEVM.getAddress(to)) throw new Error("fail approveNFT721")
        console.log(`successfully approveNFT721`)
      } catch (e) {
        console.log(e)
      }
    });    
    test('set approval for all nft', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
        const owner = decimalWallet.evmAddress!

        //transfer
        const to = decimalWallet2.evmAddress!

        //await decimalEVM.approveForAllNFT(addressDRC721Standart, to, true) //DRC721Standart
        await decimalEVM.approveForAllNFT(addressDRC721, to, true) //DRC721
        //await decimalEVM.approveForAllNFT(addressDRC1155Standart, to, true) //DRC1155Standart
        await decimalEVM.approveForAllNFT(addressDRC1155, to, true) //DRC1155

        //if (await decimalEVM.isApprovedForAllNFT(addressDRC721Standart, owner, to) != true) throw new Error("fail approveForAllNFT") //DRC721Standart
        if (await decimalEVM.isApprovedForAllNFT(addressDRC721, owner, to) !== true) throw new Error("fail approveForAllNFT") //DRC721
        //if (await decimalEVM.isApprovedForAllNFT(addressDRC1155Standart, owner, to) !== true) throw new Error("fail approveForAllNFT") //DRC1155Standart
        if (await decimalEVM.isApprovedForAllNFT(addressDRC1155, owner, to) !== true) throw new Error("fail approveForAllNFT") //DRC1155
        console.log(`successfully approveForAllNFT`)
      } catch (e) {
        console.log(e)
      }
    });

    test('transfer batch nft 1155 and 1155Standart', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
        const owner = decimalWallet.evmAddress!
        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId_1 = 1
        const tokenId_2 = 2
        const amount = 20
        //const resultDRC1155Standart_1 = await decimalEVM.mintNFT(addressDRC1155Standart, owner, tokenURI, tokenId_1, amount) //DRC1155Standart
        //const resultDRC1155Standart_2 = await decimalEVM.mintNFT(addressDRC1155Standart, owner, tokenURI, tokenId_2, amount) //DRC1155Standart

        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultDRC1155_1 = await decimalEVM.mintNFTWithDELReserve(addressDRC1155, owner, tokenURI, reserveFor1155, tokenId_1, amount) //DRC1155
        const resultDRC1155_2 = await decimalEVM.mintNFTWithDELReserve(addressDRC1155, owner, tokenURI, reserveFor1155, tokenId_2, amount) //DRC1155

        //transfer batch
        const from = owner
        const to = decimalWallet2.evmAddress!

        //await decimalEVM.transferBatchNFT1155(addressDRC1155Standart, from, to, [resultDRC1155Standart_1.tokenId, resultDRC1155Standart_2.tokenId], [amount, amount]) //DRC1155Standart
        await decimalEVM.transferBatchNFT1155(addressDRC1155, from, to, [resultDRC1155_1.tokenId, resultDRC1155_2.tokenId], [amount, amount]) //DRC1155Standart
        console.log(`successfully transferBatchNFT1155`)
      } catch (e) {
        console.log(e)
      }
    });

    test('others view functions', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const owner = decimalWallet.evmAddress!

        //prepare
        const tokenURI = "/ipfs/zxcvb12345";
        const tokenId = 11
        const amount = 20
        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(addressDRC721, owner, tokenURI, reserveFor721) //DRC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultDRC1155 = await decimalEVM.mintNFTWithDELReserve(addressDRC1155, owner, tokenURI, reserveFor1155, tokenId, amount) //DRC1155

        const [
          resultTokenURINFT,
          resultbalanceOfDRC721,
          resultbalanceOfTokenIdDRC1155,
          resultOwnerOfNFT721,
          resultSupportsInterfaceNFT,
          resultRateNFT1155,
          resultReserveNFT,
          resultSupplyNFT1155
        ] = await Promise.all([
          decimalEVM.getTokenURINFT(addressDRC721, resultDRC721.tokenId),// drc721, drc721Standart, drc1155, drc1155Standart
          decimalEVM.balanceOfNFT(addressDRC721, owner), // drc721Standart, drc721
          decimalEVM.balanceOfNFT(addressDRC1155, owner, resultDRC1155.tokenId), // drc1155Standart, drc1155
          decimalEVM.ownerOfNFT721(addressDRC721, resultDRC721.tokenId), // drc721, drc721Standart
          decimalEVM.supportsInterfaceNFT(addressDRC721, "0x01ffc9a7"), // drc721, drc721Standart, drc1155, drc1155Standart
          decimalEVM.getRateNFT1155(addressDRC1155, resultDRC1155.tokenId), // drc1155
          decimalEVM.getReserveNFT(addressDRC721, resultDRC721.tokenId), // drc721, drc1155
          decimalEVM.getSupplyNFT1155(addressDRC1155, resultDRC1155.tokenId), // drc1155Standart, drc1155
        ])

        console.log(`
          resultTokenURINFT ${resultTokenURINFT}
          resultbalanceOfDRC721 ${resultbalanceOfDRC721}
          resultbalanceOfTokenIdDRC1155 ${resultbalanceOfTokenIdDRC1155}
          resultOwnerOfNFT721 ${resultOwnerOfNFT721}
          resultSupportsInterfaceNFT ${resultSupportsInterfaceNFT}
          resultRateNFT1155 ${resultRateNFT1155}
          resultReserveNFT ${resultReserveNFT}
          resultSupplyNFT1155 ${resultSupplyNFT1155}
        `)
      } catch (e) {
        console.log(e)
      }
    });

  })