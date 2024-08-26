import Queries from "./queries"
import {ethers} from "ethers";
import {
    NETWORKS
} from "../endpoints";
import { DecimalContract, DecimalBridgeContract } from "./interfaces/contracts";
import { Token, AddressBalance, BridgeToken, BridgeTransfer, TokenReserveless } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken, NFTTransfer } from "./interfaces/nfts";
import { MultisigWallets, TransactionData } from "./interfaces/multisig";
import { SubgraphResponse } from "./interfaces/subgraph";

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

    public async getTokensReserveless(first: number, skip: number): Promise<TokenReserveless[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getTokensReserveless(options)
    }

    public async getTokensReservelessByCreator(address: string, first: number, skip: number): Promise<TokenReserveless[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { creator: "${verifyAddress}"}, first: ${first}, skip: ${skip})`
        return await this.query.getTokensReserveless(options)
    }

    public async getTokenReservelessByAddress(address: string): Promise<TokenReserveless> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { address: "${verifyAddress}"} )`
        const [token] = await this.query.getTokensReserveless(options)
        return token;
    }
    
    public async getAddressBalances(address: string, first: number, skip: number): Promise<AddressBalance[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { user_: { address: "${verifyAddress}" } }, first: ${first}, skip: ${skip})`
        return await this.query.getAddressBalances(options)
    }

    public async getAddressBalancesReserveless(address: string, first: number, skip: number): Promise<AddressBalance[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { user_: { address: "${verifyAddress}" } }, first: ${first}, skip: ${skip})`
        return await this.query.getAddressBalancesReserveless(options)
    }

    // stakes token
    public async getStakes(first: number, skip: number): Promise<SubgraphResponse<Stake[]>> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: {tokenType_in: [DRC20, DEL]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }
    
    public async getStakesByAddress(address: string, first: number, skip: number): Promise<SubgraphResponse<Stake[]>> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { tokenType_in: [DRC20, DEL], delegator: "${verifyAddress}" }, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getStakesByValidotor(address: string, first: number, skip: number): Promise<SubgraphResponse<Stake[]>> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { tokenType_in: [DRC20, DEL], validator: "${verifyAddress.toLowerCase()}" }, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getTransferStakes(first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [DRC20, DEL] }, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    
    public async getTransferStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [DRC20, DEL]}, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }

    public async getWithdrawStakes(first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [DRC20, DEL] }, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }

    public async getWithdrawStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [DRC20, DEL]}, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }

    // stakes nft
    public async getNFTStakes(first: number, skip: number): Promise<SubgraphResponse<Stake[]>>  {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [DRC721, DRC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }
    
    public async getNFTStakesByAddress(address: string, first: number, skip: number): Promise<SubgraphResponse<Stake[]>> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [DRC721, DRC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getNFTStakesByValidotor(address: string, first: number, skip: number): Promise<SubgraphResponse<Stake[]>> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { validator: "${verifyAddress.toLowerCase()}", tokenType_in: [DRC721, DRC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getStakes(options)
    }

    public async getTransferNFTStakes(first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [DRC721, DRC1155] }, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    public async getTransferNFTStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [DRC721, DRC1155]}, first: ${first}, skip: ${skip})`
        return await this.query.getTransferStakes(options)
    }
    public async getWithdrawNFTStakes(first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(where: { tokenType_in: [DRC721, DRC1155] }, first: ${first}, skip: ${skip})`
        return await this.query.getWithdrawStakes(options)
    }
    public async getWithdrawNFTStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { delegator: "${verifyAddress}", tokenType_in: [DRC721, DRC1155]}, first: ${first}, skip: ${skip})`
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

    public async getNftByCollectionAndTokenId(address: string, tokenId: string | number): Promise<NFTToken> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { tokenId: "${tokenId}", collection: "${verifyAddress.toLowerCase()}"})`
        return (await this.query.getNfts(options))[0]
    }

    public async getAddressBalancesNfts(address: string, first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { balances_: { 
            user: "${verifyAddress.toLowerCase()}",
            amount_not: "0"
        }}, first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getAddressBalancesNftsByCollection(address: string, addressCollection: string, first: number, skip: number): Promise<NFTToken[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const verifyAddressCollection = ethers.utils.getAddress(addressCollection)
        const options = `(where: { 
            collection: "${verifyAddressCollection.toLowerCase()}", 
            balances_: { 
                user: "${verifyAddress.toLowerCase()}",
                amount_not: "0"
            } 
        }, first: ${first}, skip: ${skip})`
        return await this.query.getNfts(options)
    }

    public async getNftCollectionByCreatorAndUser(address: string, first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: {
            or: [
                { creator: "${verifyAddress.toLowerCase()}" },
                { 
                    balances_: { 
                        user: "${verifyAddress.toLowerCase()}",
                        amount_not: "0"
                    }
                }
            ]
        })`
        return await this.query.getNftCollections(options)
    }

    // 
    public async getNftCollectionByUser(address: string, first: number, skip: number): Promise<NFTCollection[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(where: { balances_: { 
            user: "${verifyAddress.toLowerCase()}",
            amount_not: "0"
        }})`
        return await this.query.getNftCollections(options)
    }

    public async getNftCollectionType(address: string): Promise<string | null> {
        const verifyAddress = ethers.utils.getAddress(address)
        const options = `(id: "${verifyAddress.toLowerCase()}" )`
        return await this.query.getNftCollectionType(options)
    }

    public async getNftTransfersByUser(user: string, first: number, skip: number): Promise<NFTTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(user)
        const options = `(where: {
            or: [
                { to: "${verifyAddress.toLowerCase()}" },
                { from: "${verifyAddress.toLowerCase()}" },
                { initializer: "${verifyAddress.toLowerCase()}" },
            ]
        }, first: ${first}, skip: ${skip}, orderBy: timestamp, orderDirection: desc)`
        return await this.query.getNftTransfers(options)
    }

    public async getNftTransfersByNftAndUser(collection: string, tokenId: string | number, user: string, first: number, skip: number): Promise<NFTTransfer[]> {
        this.checkFirstAndSkip(first, skip)
        collection = ethers.utils.getAddress(collection).toLowerCase()
        user = ethers.utils.getAddress(user).toLowerCase()
        const options = `(where: {
            and: [
                {
                    or: [
                        { to: "${user}" },
                        { from: "${user}" },
                        { initializer: "${user}" },
                    ]
                },
                { collection: "${collection}" },
                { nft_: { tokenId: "${tokenId}" }}
            ]
        }, first: ${first}, skip: ${skip}, orderBy: timestamp, orderDirection: desc)`
        return await this.query.getNftTransfers(options)
    }

    //othres
    public async subgraphCustomQuery(query: string) {
        return await this.query.subgraphCustomQuery(query)
    }

    //bridge
    public async getBridgeContracts(): Promise<DecimalBridgeContract> {
        return await this.query.getBridgeContracts()
    }
    public async getBridgeETHContracts(): Promise<DecimalBridgeContract> {
        return await this.query.getBridgeETHContracts()
    }
    public async getBridgeBSCContracts(): Promise<DecimalBridgeContract> {
        return await this.query.getBridgeBSCContracts()
    }

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

    //multisig
    public async getMultisigWallets(first: number, skip: number): Promise<MultisigWallets[]> {
        this.checkFirstAndSkip(first, skip)
        const options = `(first: ${first}, skip: ${skip})`
        return await this.query.getMultisigWallets(options)
    }
    public async getMultisigWalletsByParticipant(addressParticipant: string, first: number, skip: number): Promise<MultisigWallets[]> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(addressParticipant)
        const options = `(where: {participants_: {address: "${verifyAddress.toLowerCase()}"}}, first: ${first}, skip: ${skip})`
        return await this.query.getMultisigWallets(options)
    }

    public async getMultisigApproveTransactionsByMultisigAddressAndNonce(addressMultisig: string, nonce: string | number, first: number, skip: number): Promise<{
        transactions: TransactionData[],
        approvers: string[]
    }> {
        this.checkFirstAndSkip(first, skip)
        const verifyAddress = ethers.utils.getAddress(addressMultisig)
        const options = `(where: {transactionData_: {nonce: "${nonce.toString()}"}, wallet_: {address: "${verifyAddress.toLowerCase()}"}}, first: ${first}, skip: ${skip})`
        return await this.query.getMultisigApproveTransactions(options)
    }
    
}