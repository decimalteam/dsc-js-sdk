import SDK from '../../src/index'

jest.setTimeout(300000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

const Validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

describe('Delegation NFT', () => {

    test('delegate nft with approve', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!;

            //prepare
            const newNFT: any = {
                creator: owner,
                symbol: 'NFTtest',
                name: 'NFTName',
                contractURI: 'ipfs://ipfs/qwerty12345',
                refundable: false,
                burnable: true
            }
            const resultCollection721 = await decimalEVM.createCollectionDRC721(newNFT)
            const resultCollection1155 = await decimalEVM.createCollectionDRC1155(newNFT)

            const tokenURI = "/ipfs/zxcvb12345";
            const reserveFor721 = decimalEVM.parseEther(1); // 1 del
            const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(resultCollection721.nftCollectionAddress, owner, tokenURI, reserveFor721) //DRC721
            const tokenId1155 = 0
            const amount = 20
            const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
            const resultDRC1155 = await decimalEVM.mintNFTWithDELReserve(resultCollection1155.nftCollectionAddress, owner, tokenURI, reserveFor1155, tokenId1155, amount) //DRC1155
            

            const delegationNftAddress = await decimalEVM.getDecimalContractAddress('delegation-nft')
            //delegate drc721
            await decimalEVM.approveNFT721(resultCollection721.nftCollectionAddress, delegationNftAddress, resultDRC721.tokenId) //DRC721
            await decimalEVM.delegateDRC721(Validator, resultCollection721.nftCollectionAddress, resultDRC721.tokenId) //DRC721

            //delegate drc1155
            await decimalEVM.approveForAllNFT(resultCollection1155.nftCollectionAddress, delegationNftAddress, true) //DRC1155
            await decimalEVM.delegateDRC1155(Validator, resultCollection1155.nftCollectionAddress, resultDRC1155.tokenId, amount) //DRC1155
            console.log(`successfully delegateDRC721 and delegateDRC1155 with approve`)
        } catch (e) {
            console.log(e)
        }
    });
    
    test('delegate nft with permit', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            //prepare
            const newNFT: any = {
                creator: owner,
                symbol: 'NFTtest',
                name: 'NFTName',
                contractURI: 'ipfs://ipfs/qwerty12345',
                refundable: false,
                burnable: true
            }
            const resultCollection721 = await decimalEVM.createCollectionDRC721(newNFT)
            const resultCollection1155 = await decimalEVM.createCollectionDRC1155(newNFT)

            const tokenURI = "/ipfs/zxcvb12345";
            const reserveFor721 = decimalEVM.parseEther(1); // 1 del
            const resultDRC721 = await decimalEVM.mintNFTWithDELReserve(resultCollection721.nftCollectionAddress, owner, tokenURI, reserveFor721) //DRC721
            const tokenId1155 = 0
            const amount = 20
            const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
            const resultDRC1155 = await decimalEVM.mintNFTWithDELReserve(resultCollection1155.nftCollectionAddress, owner, tokenURI, reserveFor1155, tokenId1155, amount) //DRC1155
            
            const delegationNftAddress  = await decimalEVM.getDecimalContractAddress('delegation-nft')
            //delegate drc721
            const signDRC721 = await decimalEVM.getSignPermitDRC721(resultCollection721.nftCollectionAddress, delegationNftAddress, resultDRC721.tokenId)
            await decimalEVM.delegateDRC721(Validator, resultCollection721.nftCollectionAddress, resultDRC721.tokenId, signDRC721) //DRC721

            //delegate drc1155
            const signDRC1155 = await decimalEVM.getSignPermitDRC1155(resultCollection1155.nftCollectionAddress, delegationNftAddress)
            await decimalEVM.delegateDRC1155(Validator, resultCollection1155.nftCollectionAddress, resultDRC1155.tokenId, amount, signDRC1155) //DRC1155
            console.log(`successfully delegateDRC721 and delegateDRC1155 with permit`)
        } catch (e) {
            console.log(e)
        }
    });

    test('transfer stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!
            const TokenTypes = decimalEVM.getTokenTypes()

            let stakes = await decimalEVM.getNFTStakesByMember(owner)
            const stakeFilteredDRC721 = stakes.filter(({tokenType}) => tokenType == TokenTypes.DRC721)
            const stakeFilteredDRC1155 = stakes.filter(({tokenType}) => tokenType == TokenTypes.DRC1155)
            const stakeDRC721 = stakeFilteredDRC721[0]//  first stake drc721
            const stakeDRC1155 = stakeFilteredDRC1155[0]//  first stake drc1155

            const newValidator = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
            await decimalEVM.transferStakeNFT(stakeDRC721.validator, stakeDRC721.token, stakeDRC721.tokenId, newValidator)
            await decimalEVM.transferStakeNFT(stakeDRC1155.validator, stakeDRC1155.token, stakeDRC1155.tokenId, newValidator, stakeDRC1155.amount)

            console.log(`successfully transferStakeNFT`)
        } catch (e) {
            console.log(e)
        }
    });

    test('withdraw stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!
            const TokenTypes = decimalEVM.getTokenTypes()

            let stakes = await decimalEVM.getNFTStakesByMember(owner)
            const stakeFilteredDRC721 = stakes.filter(({tokenType}) => tokenType == TokenTypes.DRC721)
            const stakeFilteredDRC1155 = stakes.filter(({tokenType}) => tokenType == TokenTypes.DRC1155)
            const stakeDRC721 = stakeFilteredDRC721[0]//  first stake drc721
            const stakeDRC1155 = stakeFilteredDRC1155[0]//  first stake drc1155

            await decimalEVM.withdrawStakeNFT(stakeDRC721.validator, stakeDRC721.token, stakeDRC721.tokenId)
            await decimalEVM.withdrawStakeNFT(stakeDRC1155.validator, stakeDRC1155.token, stakeDRC721.tokenId, stakeDRC1155.amount)

            console.log(`successfully withdrawStakeNFT`)
        } catch (e) {
            console.log(e)
        }
    });

    test('complete stake after frozen', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            const result = await decimalEVM.getFrozenStakesQueueNFT()
            const resultFrozen = result.map((frozen:any, index:number) => {
                return {
                    index: index,
                    stake: {
                        validator: frozen[0][0],
                        delegator: frozen[0][1],
                        token: frozen[0][2],
                        amount: frozen[0][3],
                        tokenId: frozen[0][4],
                        tokenType: frozen[0][5]
                    },
                    freezeType: frozen[1],
                    unfreezeTimestamp: frozen[2]
                }
            })

            const block = await decimalEVM.getLatestBlock();
            const frozenFiltered = resultFrozen.filter(({stake, unfreezeTimestamp}) => stake.delegator == decimalEVM.getAddress(owner) && unfreezeTimestamp <= block.timestamp)
            if (frozenFiltered.length > 0) {
                const index = frozenFiltered[0].index // first frozen (ready to be complete) by delegator

                const result = await decimalEVM.completeStakeNFT([index])
                if (result.error == null) {
                    //successfully completeStakeNFT
                } else {
                    console.log(result.error)
                }
            } else {
                console.log(`There is no need for completeStakeNFT`)
            }

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

            const resultFreezeTimeNFT = await decimalEVM.getFreezeTimeNFT()

            console.log(`
                resultFreezeTimeNFT Transfer: ${resultFreezeTimeNFT.Transfer} Withdraw: ${resultFreezeTimeNFT.Withdraw} 
            `)

        } catch (e) {
            console.log(e)
        }
    })
    
})