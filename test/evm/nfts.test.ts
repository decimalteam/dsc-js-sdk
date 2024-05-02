import SDK from '../../src/index'

jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

var addressERC721Standart: string, addressERC1155Standart: string, addressERC721: string, addressERC1155: string, reserveTokenAddress: string;

addressERC721 = `0xa720699CAA221A9E3Cb08E407970A43A497Ff30F`
addressERC1155 = `0xBf1F76d9BCf82C2072711CD3D64de696A9575324`
describe('NFTs', () => {

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

  })