import SDK from '../../src/index'

jest.setTimeout(2000000)

const Validator = "0xae7f720b602d1253b8766724b80e98271a948740"
const Account = "0x4e8f97244dc1e570742d9e8cf28c4413c4a8aede"

describe('Subgraph', () => {

    test('get Decimal contracts', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetDecimalContracts = await subgraph.getDecimalContracts()
        console.log(resultGetDecimalContracts)
    })

    test('get validators, get validator penalties', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultValidators = await subgraph.getValidators()
        console.log(resultValidators)

        const validator = resultValidators[0].address // first validator
        const resultValidator = await subgraph.getValidator(validator)
        console.log(resultValidator)

        const resultGetValidatorPenalties = await subgraph.getValidatorPenalties(validator, 1000, 0)
        console.log(resultGetValidatorPenalties)

        const resultGetValidatorPenaltiesFromBlock = await subgraph.getValidatorPenaltiesFromBlock(validator, 7364174, 1000, 0)
        console.log(resultGetValidatorPenaltiesFromBlock)

    })

    test('get tokens, get tokens by owner', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetTokens = await subgraph.getTokens(1000, 0)
        console.log(resultGetTokens)
        const resultGetTokensByOwner = await subgraph.getTokensByOwner(Account, 1000, 0)
        console.log(resultGetTokensByOwner)
    })
    test('get token by symbol, get token by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const symbol = 'SBT_TOKEN'
        const resultBySymbol = await subgraph.getTokenBySymbol(symbol)
        console.log(resultBySymbol)
        if (resultBySymbol) {
            const address = resultBySymbol.address
            const resultByAddress = await subgraph.getTokenByAddress(address)
            console.log(resultByAddress)
        }
    })

    test('get stakes, get stakes by address, get stakes by validator', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetStakes = await subgraph.getStakes(1000, 0)
        console.log(resultGetStakes)

        const resultGetStakesByAddress = await subgraph.getStakesByAddress(Account, 1000, 0)
        console.log(resultGetStakesByAddress)

        const resultGetStakesByValidotor = await subgraph.getStakesByValidotor(Validator, 1000, 0)
        console.log(resultGetStakesByValidotor)
    })

    test('get transfer stakes, get transfer stakes by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetTransferStakes = await subgraph.getTransferStakes(1000, 0)
        console.log(resultGetTransferStakes)

        const resultGetTransferStakesByAddress = await subgraph.getTransferStakesByAddress(Account, 1000, 0)
        console.log(resultGetTransferStakesByAddress)
    })

    test('get withdraw stakes, get withdraw stakes by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetTransferStakes = await subgraph.getWithdrawStakes(1000, 0)
        console.log(resultGetTransferStakes)

        const resultGetTransferStakesByAddress = await subgraph.getWithdrawStakesByAddress(Account, 1000, 0)
        console.log(resultGetTransferStakesByAddress)
    })
  
    test('get balances', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const result = await subgraph.getAddressBalances(Account, 1000, 0)
        console.log(result)
    })
    
    test('custom query', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const query = `{
            tokens {
              address
            }
        }`
        const result = await subgraph.subgraphCustomQuery(query)
        console.log(result)
    })
    test('get sum amount penalty', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const result = await subgraph.getSumAmountToPenalty()
        console.log(result)
    })

    test('get nft collections, get nft collections by owner, get nft collection by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetNftCollections = await subgraph.getNftCollections(1000, 0)
        console.log(resultGetNftCollections)
        const resultGetNftCollectionsByOwner = await subgraph.getNftCollectionsByOwner(Account, 1000, 0)
        console.log(resultGetNftCollectionsByOwner)

        if (resultGetNftCollections.length > 0) {
            const nftCollection = resultGetNftCollections[0] // first nft collection
            const resultGetNftCollectionByAddress = await subgraph.getNftCollectionByAddress(nftCollection.address)
            console.log(resultGetNftCollectionByAddress)
        }
    })


    test('get nfts, get nfts by address collection, get nfts by user address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetNfts = await subgraph.getNfts(1000, 0)
        console.log(resultGetNfts)

        const nft = resultGetNfts[0] //first nft
        const resultGetNftsByCollection = await subgraph.getNftsByCollection(nft.collection!.address, 1000, 0)
        console.log(resultGetNftsByCollection)

        const resultGetAddressBalancesNfts = await subgraph.getAddressBalancesNfts(nft.balances[0].owner.address, 1000, 0)
        console.log(resultGetAddressBalancesNfts)
    })


    test('get nft stakes, get nft stakes by address, get nft stakes by validator', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetNFTStakes = await subgraph.getNFTStakes(1000, 0)
        console.log(resultGetNFTStakes)

        const resultGetNFTStakesByAddress = await subgraph.getNFTStakesByAddress(Account, 1000, 0)
        console.log(resultGetNFTStakesByAddress)

        const resultGetNFTStakesByValidotor = await subgraph.getNFTStakesByValidotor(Validator, 1000, 0)
        console.log(resultGetNFTStakesByValidotor)
    })

 
    test('get transfer nft stakes, get transfer nft stakes by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetTransferStakes = await subgraph.getTransferNFTStakes(1000, 0)
        console.log(resultGetTransferStakes)

        const resultGetTransferStakesByAddress = await subgraph.getTransferNFTStakesByAddress(Account, 1000, 0)
        console.log(resultGetTransferStakesByAddress)
    })


    test('get withdraw nft stakes, get withdraw nft stakes by address', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetTransferStakes = await subgraph.getWithdrawNFTStakes(1000, 0)
        console.log(resultGetTransferStakes)

        const resultGetTransferStakesByAddress = await subgraph.getWithdrawNFTStakesByAddress(Account, 1000, 0)
        console.log(resultGetTransferStakesByAddress)
    })

    test('get nft collection type', async() => {
        // Sdk.
        const { Subgraph, DecimalNetworks } = SDK;

        const subgraph = new Subgraph(DecimalNetworks.devnet)

        const resultGetNftCollectionType = await subgraph.getNftCollectionType("0x07c0f327e1e21501607ad67dd64d454ec045aef7")
        console.log(resultGetNftCollectionType)
    })
    
})