import SDK from '../../src/index'

jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

//var addressERC721Standart: string, addressERC1155Standart: string;
var addressERC721: string, addressERC1155: string;

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
          refundable: false
        }

        //const resultERC721Standart = await decimalEVM.createCollectionERC721Standart(newNFT)
        //const resultERC1155Standart = await decimalEVM.createCollectionERC1155Standart(newNFT)
        const resultERC721 = await decimalEVM.createCollectionERC721(newNFT)
        const resultERC1155 = await decimalEVM.createCollectionERC1155(newNFT)
        //console.log(`
        //    successfully create standart collections
        //    ERC721Standart ${resultERC721Standart.nftCollectionAddress}
        //    ERC1155Standart ${resultERC1155Standart.nftCollectionAddress}
        //`)
        console.log(`
          successfully create collections
          ERC721 ${resultERC721.nftCollectionAddress}
          ERC1155 ${resultERC1155.nftCollectionAddress}
        `)
        //addressERC721Standart = resultERC721Standart.nftCollectionAddress
        //addressERC1155Standart = resultERC1155Standart.nftCollectionAddress
        addressERC721 = resultERC721.nftCollectionAddress
        addressERC1155 = resultERC1155.nftCollectionAddress
      } catch (e) {
        console.log(e)
      }
    });
/*
    test('mint ERC721Standart and ERC1155Standart', async() => {
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
        const resultERC721Standart = await decimalEVM.mintNFT(addressERC721Standart, to, tokenURI) //ERC721Standart
        const resultERC1155Standart = await decimalEVM.mintNFT(addressERC1155Standart, to, tokenURI, tokenId, amount) //ERC1155Standart
        console.log(`
          successfully mintNFT
          ERC721Standart tokenId ${resultERC721Standart.tokenId}
          ERC1155Standart tokenId ${resultERC1155Standart.tokenId}
        `)
      } catch (e) {
        console.log(e)
      }
    });
    */
    test('mint ERC721 and ERC1155 with DEL reserve and after add DEL reserve', async() => {
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
        const resultERC721 = await decimalEVM.mintNFTWithDELReserve(addressERC721, to, tokenURI, reserveFor721) //ERC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultERC1155 = await decimalEVM.mintNFTWithDELReserve(addressERC1155, to, tokenURI, reserveFor1155, tokenId, amount) //ERC1155

        //repeated mint 1155
        const quantity = 5
        const reserveFor1155_2 = await decimalEVM.calcReserveNFT1155(addressERC1155, tokenId, quantity); // calculation of the required reserve for 5 quantity
        await decimalEVM.mintNFTWithDELReserve(addressERC1155, to, tokenURI, reserveFor1155_2, tokenId, quantity) //ERC1155

        //add reserve
        const reserveAmount = decimalEVM.parseEther(1); // 1 del
        await decimalEVM.addDELReserveNFT(addressERC721, resultERC721.tokenId, reserveAmount) //ERC721
        await decimalEVM.addDELReserveNFT(addressERC1155, resultERC1155.tokenId, reserveAmount) //ERC1155

        console.log(`
          successfully mintNFTWithDELReserve and addDELReserveNFT
          ERC721 tokenId ${resultERC721.tokenId}
          ERC1155 tokenId ${resultERC1155.tokenId}
        `)
      } catch (e) {
        console.log(e)
      }
    });

    test('mint ERC721 and ERC1155 with Token reserve and after add Token reserve', async() => {
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
        await decimalEVM.approveToken(tokenAddress, addressERC721, reserveFor721)
        const resultERC721 = await decimalEVM.mintNFTWithTokenReserve(addressERC721, to, tokenURI, reserveFor721, tokenAddress) //ERC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        await decimalEVM.approveToken(tokenAddress, addressERC1155, reserveFor1155)
        const resultERC1155 = await decimalEVM.mintNFTWithTokenReserve(addressERC1155, to, tokenURI, reserveFor1155, tokenAddress, undefined, tokenId, amount) //ERC1155

        //mint with approve
        const signForERC721_permit = await decimalEVM.getSignPermitToken(tokenAddress, addressERC721, reserveFor721)
        const resultERC721_permit = await decimalEVM.mintNFTWithTokenReserve(addressERC721, to, tokenURI, reserveFor721, tokenAddress, signForERC721_permit) //ERC721
        const signForERC1155_permit = await decimalEVM.getSignPermitToken(tokenAddress, addressERC1155, reserveFor1155)
        const resultERC1155_permit = await decimalEVM.mintNFTWithTokenReserve(addressERC1155, to, tokenURI, reserveFor1155, tokenAddress, signForERC1155_permit, tokenId, amount) //ERC1155

        //add reserve with approve
        const reserveAmount = decimalEVM.parseEther(1); // 1 del
        await decimalEVM.approveToken(tokenAddress, addressERC721, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressERC721, resultERC721.tokenId, reserveAmount) //ERC721
        await decimalEVM.approveToken(tokenAddress, addressERC1155, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressERC1155, resultERC1155.tokenId, reserveAmount) //ERC1155

        //add reserve with permit
        const signForERC721 = await decimalEVM.getSignPermitToken(tokenAddress, addressERC721, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressERC721, resultERC721.tokenId, reserveAmount, signForERC721) //ERC721
        const signForERC1155 = await decimalEVM.getSignPermitToken(tokenAddress, addressERC1155, reserveAmount)
        await decimalEVM.addTokenReserveNFT(addressERC1155, resultERC1155.tokenId, reserveAmount, signForERC1155) //ERC1155

        console.log(`
          successfully mintNFTWithTokenReserve and addTokenReserveNFT
          ERC721 tokenId ${resultERC721.tokenId}
          ERC1155 tokenId ${resultERC1155.tokenId}
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
        //const resultERC721Standart = await decimalEVM.mintNFT(addressERC721Standart, owner, tokenURI) //ERC721Standart
        //const resultERC1155Standart = await decimalEVM.mintNFT(addressERC1155Standart, owner, tokenURI, tokenId, amount) //ERC1155Standart

        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultERC721 = await decimalEVM.mintNFTWithDELReserve(addressERC721, owner, tokenURI, reserveFor721) //ERC721
        const resultERC1155 = await decimalEVM.mintNFTWithDELReserve(addressERC1155, owner, tokenURI, reserveFor1155, tokenId, amount) //ERC1155

        //transfer
        const from = owner
        const to = decimalWallet2.evmAddress!

        //await decimalEVM.transferNFT(addressERC721Standart, from, to, resultERC721Standart.tokenId) //ERC721Standart
        await decimalEVM.transferNFT(addressERC721, from, to, resultERC721.tokenId) //ERC721
        //await decimalEVM.transferNFT(addressERC1155Standart, from, to, resultERC1155Standart.tokenId, amount) //ERC1155Standart
        await decimalEVM.transferNFT(addressERC1155, from, to, resultERC1155.tokenId, amount) //ERC1155
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
        //await decimalEVM.disableMintNFT(addressERC721Standart) //ERC721Standart
        await decimalEVM.disableMintNFT(addressERC721) //ERC721
        //await decimalEVM.disableMintNFT(addressERC1155Standart) //ERC1155Standart
        await decimalEVM.disableMintNFT(addressERC1155) //ERC1155
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
        //await decimalEVM.burnNFT(addressERC721Standart, tokenId) //ERC721Standart
        await decimalEVM.burnNFT(addressERC721, tokenId) //ERC721
        //await decimalEVM.burnNFT(addressERC1155Standart, tokenId, amount) //ERC1155Standart
        await decimalEVM.burnNFT(addressERC1155, tokenId, amount) //ERC1155
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
    //     //await decimalEVM.setBaseURINFT(addressERC721Standart, baseURI) //ERC721Standart
    //     await decimalEVM.setBaseURINFT(addressERC721, baseURI) //ERC721
    //     //await decimalEVM.setBaseURINFT(addressERC1155Standart, baseURI) //ERC1155Standart
    //     await decimalEVM.setBaseURINFT(addressERC1155, baseURI) //ERC1155
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
        //await decimalEVM.setTokenURINFT(addressERC721Standart, tokenId, tokenURI) //ERC721Standart
        await decimalEVM.setTokenURINFT(addressERC721, tokenId, tokenURI) //ERC721
        //await decimalEVM.setTokenURINFT(addressERC1155Standart, tokenId, tokenURI) //ERC1155Standart
        await decimalEVM.setTokenURINFT(addressERC1155, tokenId, tokenURI) //ERC1155
        console.log(`successfully setTokenURINFT`)
      } catch (e) {
        console.log(e)
      }
    });
    test('approve nft ERC721Standart and ERC721', async() => {
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

        //const resultERC721Standart = await decimalEVM.mintNFT(addressERC721Standart, owner, tokenURI) //ERC721Standart

        const reserveFor721 = decimalEVM.parseEther(1); // 1 del
        const resultERC721 = await decimalEVM.mintNFTWithDELReserve(addressERC721, owner, tokenURI, reserveFor721) //ERC721

        //transfer
        const to = decimalWallet2.evmAddress;
        if (to === undefined) throw new Error("to cannot be undefined")

        //await decimalEVM.approveNFT721(addressERC721Standart, to, resultERC721Standart.tokenId) //ERC721Standart
        await decimalEVM.approveNFT721(addressERC721, to, resultERC721.tokenId) //ERC721

        //const approveAddressERC721Standart = await decimalEVM.getApprovedNFT721(addressERC721Standart, resultERC721Standart.tokenId) //ERC721Standart
        const approveAddressERC721 = await decimalEVM.getApprovedNFT721(addressERC721, resultERC721.tokenId) //ERC721
        //if (approveAddressERC721Standart != decimalEVM.getAddress(to)) throw new Error("fail approveNFT721")
        if (approveAddressERC721 != decimalEVM.getAddress(to)) throw new Error("fail approveNFT721")
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

        //await decimalEVM.approveForAllNFT(addressERC721Standart, to, true) //ERC721Standart
        await decimalEVM.approveForAllNFT(addressERC721, to, true) //ERC721
        //await decimalEVM.approveForAllNFT(addressERC1155Standart, to, true) //ERC1155Standart
        await decimalEVM.approveForAllNFT(addressERC1155, to, true) //ERC1155

        //if (await decimalEVM.isApprovedForAllNFT(addressERC721Standart, owner, to) != true) throw new Error("fail approveForAllNFT") //ERC721Standart
        if (await decimalEVM.isApprovedForAllNFT(addressERC721, owner, to) !== true) throw new Error("fail approveForAllNFT") //ERC721
        //if (await decimalEVM.isApprovedForAllNFT(addressERC1155Standart, owner, to) !== true) throw new Error("fail approveForAllNFT") //ERC1155Standart
        if (await decimalEVM.isApprovedForAllNFT(addressERC1155, owner, to) !== true) throw new Error("fail approveForAllNFT") //ERC1155
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
        //const resultERC1155Standart_1 = await decimalEVM.mintNFT(addressERC1155Standart, owner, tokenURI, tokenId_1, amount) //ERC1155Standart
        //const resultERC1155Standart_2 = await decimalEVM.mintNFT(addressERC1155Standart, owner, tokenURI, tokenId_2, amount) //ERC1155Standart

        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultERC1155_1 = await decimalEVM.mintNFTWithDELReserve(addressERC1155, owner, tokenURI, reserveFor1155, tokenId_1, amount) //ERC1155
        const resultERC1155_2 = await decimalEVM.mintNFTWithDELReserve(addressERC1155, owner, tokenURI, reserveFor1155, tokenId_2, amount) //ERC1155

        //transfer batch
        const from = owner
        const to = decimalWallet2.evmAddress!

        //await decimalEVM.transferBatchNFT1155(addressERC1155Standart, from, to, [resultERC1155Standart_1.tokenId, resultERC1155Standart_2.tokenId], [amount, amount]) //ERC1155Standart
        await decimalEVM.transferBatchNFT1155(addressERC1155, from, to, [resultERC1155_1.tokenId, resultERC1155_2.tokenId], [amount, amount]) //ERC1155Standart
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
        const resultERC721 = await decimalEVM.mintNFTWithDELReserve(addressERC721, owner, tokenURI, reserveFor721) //ERC721
        const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
        const resultERC1155 = await decimalEVM.mintNFTWithDELReserve(addressERC1155, owner, tokenURI, reserveFor1155, tokenId, amount) //ERC1155

        const [
          resultTokenURINFT,
          resultbalanceOfERC721,
          resultbalanceOfTokenIdERC1155,
          resultOwnerOfNFT721,
          resultSupportsInterfaceNFT,
          resultRateNFT1155,
          resultReserveNFT,
          resultSupplyNFT1155
        ] = await Promise.all([
          decimalEVM.getTokenURINFT(addressERC721, resultERC721.tokenId),// erc721, erc721Standart, erc1155, erc1155Standart
          decimalEVM.balanceOfNFT(addressERC721, owner), // erc721Standart, erc721
          decimalEVM.balanceOfNFT(addressERC1155, owner, resultERC1155.tokenId), // erc1155Standart, erc1155
          decimalEVM.ownerOfNFT721(addressERC721, resultERC721.tokenId), // erc721, erc721Standart
          decimalEVM.supportsInterfaceNFT(addressERC721, "0x01ffc9a7"), // erc721, erc721Standart, erc1155, erc1155Standart
          decimalEVM.getRateNFT1155(addressERC1155, resultERC1155.tokenId), // erc1155
          decimalEVM.getReserveNFT(addressERC721, resultERC721.tokenId), // erc721, erc1155
          decimalEVM.getSupplyNFT1155(addressERC1155, resultERC1155.tokenId), // erc1155Standart, erc1155
        ])

        console.log(`
          resultTokenURINFT ${resultTokenURINFT}
          resultbalanceOfERC721 ${resultbalanceOfERC721}
          resultbalanceOfTokenIdERC1155 ${resultbalanceOfTokenIdERC1155}
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