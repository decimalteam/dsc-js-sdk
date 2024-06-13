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
                tokenOwner: owner,
                symbol: 'NFTtest',
                name: 'NFTName',
                contractURI: 'ipfs://ipfs/qwerty12345',
                baseURI: 'ipfs:/',
                refundable: false,
                allowMint: true
            }
            const resultCollection721 = await decimalEVM.createCollectionERC721(newNFT)
            const resultCollection1155 = await decimalEVM.createCollectionERC1155(newNFT)

            const tokenURI = "/ipfs/zxcvb12345";
            const reserveFor721 = decimalEVM.parseEther(1); // 1 del
            const resultERC721 = await decimalEVM.mintNFTWithDELReserve(resultCollection721.nftCollectionAddress, owner, tokenURI, reserveFor721) //ERC721
            const tokenId1155 = 0
            const amount = 20
            const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
            const resultERC1155 = await decimalEVM.mintNFTWithDELReserve(resultCollection1155.nftCollectionAddress, owner, tokenURI, reserveFor1155, tokenId1155, amount) //ERC1155
            

            const delegationNftAddress = await decimalEVM.getDecimalContractAddress('delegation-nft')
            //delegate erc721
            await decimalEVM.approveNFT721(resultCollection721.nftCollectionAddress, delegationNftAddress, resultERC721.tokenId) //ERC721
            await decimalEVM.delegateERC721(Validator, resultCollection721.nftCollectionAddress, resultERC721.tokenId) //ERC721

            //delegate erc1155
            await decimalEVM.approveForAllNFT(resultCollection1155.nftCollectionAddress, delegationNftAddress, true) //ERC1155
            await decimalEVM.delegateERC1155(Validator, resultCollection1155.nftCollectionAddress, resultERC1155.tokenId, amount) //ERC1155
            console.log(`successfully delegateERC721 and delegateERC1155 with approve`)
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
                tokenOwner: owner,
                symbol: 'NFTtest',
                name: 'NFTName',
                contractURI: 'ipfs://ipfs/qwerty12345',
                baseURI: 'ipfs:/',
                refundable: false,
                allowMint: true
            }
            const resultCollection721 = await decimalEVM.createCollectionERC721(newNFT)
            const resultCollection1155 = await decimalEVM.createCollectionERC1155(newNFT)

            const tokenURI = "/ipfs/zxcvb12345";
            const reserveFor721 = decimalEVM.parseEther(1); // 1 del
            const resultERC721 = await decimalEVM.mintNFTWithDELReserve(resultCollection721.nftCollectionAddress, owner, tokenURI, reserveFor721) //ERC721
            const tokenId1155 = 0
            const amount = 20
            const reserveFor1155 = decimalEVM.parseEther(1*amount); // =20 del
            const resultERC1155 = await decimalEVM.mintNFTWithDELReserve(resultCollection1155.nftCollectionAddress, owner, tokenURI, reserveFor1155, tokenId1155, amount) //ERC1155
            
            const delegationNftAddress  = await decimalEVM.getDecimalContractAddress('delegation-nft')
            //delegate erc721
            const signERC721 = await decimalEVM.getSignPermitERC721(resultCollection721.nftCollectionAddress, delegationNftAddress, resultERC721.tokenId)
            await decimalEVM.delegateERC721(Validator, resultCollection721.nftCollectionAddress, resultERC721.tokenId, signERC721) //ERC721

            //delegate erc1155
            const signERC1155 = await decimalEVM.getSignPermitERC1155(resultCollection1155.nftCollectionAddress, delegationNftAddress)
            await decimalEVM.delegateERC1155(Validator, resultCollection1155.nftCollectionAddress, resultERC1155.tokenId, amount, signERC1155) //ERC1155
            console.log(`successfully delegateERC721 and delegateERC1155 with permit`)
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
            const stakeFilteredERC721 = stakes.filter(({tokenType}) => tokenType == TokenTypes.ERC721)
            const stakeFilteredERC1155 = stakes.filter(({tokenType}) => tokenType == TokenTypes.ERC1155)
            const stakeERC721 = stakeFilteredERC721[0]//  first stake erc721
            const stakeERC1155 = stakeFilteredERC1155[0]//  first stake erc1155

            const newValidator = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
            await decimalEVM.transferStakeNFT(stakeERC721.validator, stakeERC721.token, stakeERC721.tokenId, newValidator)
            await decimalEVM.transferStakeNFT(stakeERC1155.validator, stakeERC1155.token, stakeERC1155.tokenId, newValidator, stakeERC1155.amount)

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
            const stakeFilteredERC721 = stakes.filter(({tokenType}) => tokenType == TokenTypes.ERC721)
            const stakeFilteredERC1155 = stakes.filter(({tokenType}) => tokenType == TokenTypes.ERC1155)
            const stakeERC721 = stakeFilteredERC721[0]//  first stake erc721
            const stakeERC1155 = stakeFilteredERC1155[0]//  first stake erc1155

            await decimalEVM.withdrawStakeNFT(stakeERC721.validator, stakeERC721.token, stakeERC721.tokenId)
            await decimalEVM.withdrawStakeNFT(stakeERC1155.validator, stakeERC1155.token, stakeERC721.tokenId, stakeERC1155.amount)

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