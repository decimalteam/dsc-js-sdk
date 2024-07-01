import Queries from "./queries"
import {ethers} from "ethers";
import {
    NETWORKS
} from "../endpoints";
import { DecimalContract } from "./interfaces/contracts";
import { Token, AddressBalance, BridgeToken, BridgeTransfer } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken } from "./interfaces/nfts";

export default class Subgraph {

    private readonly network: NETWORKS;
    private readonly query: Queries;

    public constructor(
        network: NETWORKS
    ) {
        this.network = network
        this.query = new Queries(this.network) 
    }
    private checkFirstAndSkip(first: number, skip: number) {
        if (first > 1000 || first < 1) new Error('The `first` argument must be between 0 and 1000');
        if (skip > 999999999 || skip < 0) new Error('The `skip` argument must be between 1 and 999999999');
    }

    public async getDecimalContracts(): Promise<DecimalContract[]> {
        return await this.query.getDecimalContracts()
    }
    
    public async getTokens(first: number, skip: number): Promise<Token[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getTokens(options)
    }

    public async getTokensByCreator(address: string, first: number, skip: number): Promise<Token[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { creator: "${verifyAddress}"}, first: ${first}, skip: ${skip})`
        return await this.query.getTokens(options)
    }

    public async getTokenBySymbol(symbol: string): Promise<Token> {
        const options = `(where: { symbol: "${symbol}"} )`
        return await this.query.getToken(options)
    }

    public async getTokenByAddress(address: string): Promise<Token> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { address: "${verifyAddress}"} )`
        return await this.query.getToken(options)
    }
    
    public async getAddressBalances(address: string, first: number, skip: number): Promise<AddressBalance[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { user_: { address: "${verifyAddress}" } }, first: ${first}, skip: ${skip})`
        return await this.query.getAddressBalances(options)
    }

    // stakes token
    public async getStakes(first: number, skip: number): Promise<Stake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: {tokenType: ERC20}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }
    
    public async getStakesByAddress(address: string, first: number, skip: number): Promise<Stake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { tokenType: ERC20, delegator: "${verifyAddress}" }, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getStakesByValidotor(address: string, first: number, skip: number): Promise<Stake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { tokenType: ERC20, validator: "${verifyAddress.toLowerCase()}" }, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getTransferStakes(first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType: ERC20 }, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    
    public async getTransferStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType: ERC20}, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }

    public async getWithdrawStakes(first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType: ERC20 }, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }

    public async getWithdrawStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType: ERC20}, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }

    // stakes nft
    public async getNFTStakes(first: number, skip: number): Promise<Stake[]>  {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [ERC721, ERC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }
    
    public async getNFTStakesByAddress(address: string, first: number, skip: number): Promise<Stake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [ERC721, ERC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getNFTStakesByValidotor(address: string, first: number, skip: number): Promise<Stake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { validator: "${verifyAddress.toLowerCase()}", tokenType_in: [ERC721, ERC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getTransferNFTStakes(first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [ERC721, ERC1155] }, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    public async getTransferNFTStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [ERC721, ERC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    public async getWithdrawNFTStakes(first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [ERC721, ERC1155] }, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }
    public async getWithdrawNFTStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [ERC721, ERC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options) 
    }

    // validators
    public async getValidators(): Promise<Validator[]> {
        return await this.query.getValidators()
    }

    public async getValidator(address: string): Promise<Validator> {
        const verifyAddress = ethers.utils.getAddress(address)
        return await this.query.getValidator(verifyAddress)
    }

    public async getValidatorPenalties(validator:string, first: number, skip: number): Promise<Penalty[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: {validator: "${validator}"}, first: ${first}, skip: ${skip})`
        return await this.query.getPenalties(options)
    }

    public async getValidatorPenaltiesFromBlock(validator:string, blockNumber: string | number, first: number, skip: number): Promise<Penalty[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(block: {number: ${Number(blockNumber)}}, where: {validator: "${validator}"}, first: ${first}, skip: ${skip})`
        return await this.query.getPenalties(options)
    }

    public async getSumAmountToPenalty(): Promise<{}> {
        return await this.query.getSumAmountToPenalty()
    }

    //nft
    public async getNftCollections(first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getNftCollections(options)
    }

    public async getNftCollectionsByCreator(address:string, first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { creator: "${verifyAddress}"}, first: ${first}, skip: ${skip})`
        return await this.query.getNftCollections(options)
    }

    public async getNftCollectionByAddress(address: string): Promise<NFTCollection> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { address: "${verifyAddress}"})`
        return await this.query.getNftCollection(options)
    }

    public async getNfts(first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getNftsByCollection(address: string, first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { collection: "${verifyAddress.toLowerCase()}"}, first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getAddressBalancesNfts(address: string, first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { balances_: { user: "${verifyAddress.toLowerCase()}" } }, first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getAddressBalancesNftsByCollection(address: string, addressCollection: string, first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const verifyAddressCollection = ethers.utils.getAddress(addressCollection)
        const options = `(where: { collection: "${verifyAddressCollection.toLowerCase()}", balances_: { user: "${verifyAddress.toLowerCase()}" } }, first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getNftCollectionByCreatorAndUser(address: string, first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: {
            or: [
                { creator: "${verifyAddress.toLowerCase()}" },
                { balances_: { user: "${verifyAddress.toLowerCase()}" } }
            ]
        })`
        return await this.query.getNftCollections(options)
    }

    public async getNftCollectionByUser(address: string, first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { balances_: { user: "${verifyAddress.toLowerCase()}" } })`
        return await this.query.getNftCollections(options)
    }

    public async getNftCollectionType(address: string): Promise<string | null> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(id: "${verifyAddress.toLowerCase()}" )`
        return await this.query.getNftCollectionType(options)
    }

    //othres
    public async subgraphCustomQuery(query: string) {
        return await this.query.subgraphCustomQuery(query)
    }

    //bridge
    public async getBridgeTokens(first: number, skip: number): Promise<BridgeToken[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getBridgeTokens(options)
    }

    public async getBridgeTokenByAddress(address: string): Promise<BridgeToken> {
        const verifyAddress = ethers.utils.getAddress(address)
        const addressToBytes32 = "0x" + verifyAddress.slice(2).padStart(64, "0")
        const options = `(where: { address: "${addressToBytes32.toLowerCase()}"})`
        return await this.query.getBridgeToken(options)
    }

    public async getBridgeTokenBySymbol(symbol: string): Promise<BridgeToken> {
        const options = `(where: { symbol: "${symbol}"})`
        return await this.query.getBridgeToken(options)
    }

    public async getBridgeTransfers(first: number, skip: number): Promise<BridgeTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getBridgeTransfers(options)
    }

    public async getBridgeTransfersByFrom(address: string, first: number, skip: number): Promise<BridgeTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { from: "${verifyAddress.toLowerCase()}"}, first: ${first}, skip: ${skip})`
        return await this.query.getBridgeTransfers(options)
    }

    public async getBridgeTransfersByTo(address: string, first: number, skip: number): Promise<BridgeTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const addressToBytes32 = "0x" + verifyAddress.slice(2).padStart(64, "0")
        const options = `(where: { to: "${addressToBytes32.toLowerCase()}"}, first: ${first}, skip: ${skip})`
        return await this.query.getBridgeTransfers(options)
    }

    public async getBridgeTransfersByToken(address: string, first: number, skip: number): Promise<BridgeTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const addressToBytes32 = "0x" + verifyAddress.slice(2).padStart(64, "0")
        const options = `(where: {token_: {address: "${addressToBytes32.toLowerCase()}"}}, first: ${first}, skip: ${skip})`
        return await this.query.getBridgeTransfers(options)
    }
    
    //othres bridge
    public async subgraphBridgeCustomQuery(query: string) {
        return await this.query.subgraphBridgeCustomQuery(query)
    }

    
}