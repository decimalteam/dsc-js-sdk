import { NETWORKS } from "../endpoints";
import { DecimalContract, DecimalBridgeContract } from "./interfaces/contracts";
import { Token, AddressBalance, BridgeToken, BridgeTransfer } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken, NFTTransfer } from "./interfaces/nfts";
export default class Subgraph {
    private readonly network;
    private readonly query;
    constructor(network: NETWORKS);
    private checkFirstAndSkip;
    getDecimalContracts(): Promise<DecimalContract[]>;
    getTokens(first: number, skip: number): Promise<Token[]>;
    getTokensByCreator(address: string, first: number, skip: number): Promise<Token[]>;
    getTokenBySymbol(symbol: string): Promise<Token>;
    getTokenByAddress(address: string): Promise<Token>;
    getAddressBalances(address: string, first: number, skip: number): Promise<AddressBalance[]>;
    getStakes(first: number, skip: number): Promise<Stake[]>;
    getStakesByAddress(address: string, first: number, skip: number): Promise<Stake[]>;
    getStakesByValidotor(address: string, first: number, skip: number): Promise<Stake[]>;
    getTransferStakes(first: number, skip: number): Promise<TransferStake[]>;
    getTransferStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]>;
    getWithdrawStakes(first: number, skip: number): Promise<WithdrawStake[]>;
    getWithdrawStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]>;
    getNFTStakes(first: number, skip: number): Promise<Stake[]>;
    getNFTStakesByAddress(address: string, first: number, skip: number): Promise<Stake[]>;
    getNFTStakesByValidotor(address: string, first: number, skip: number): Promise<Stake[]>;
    getTransferNFTStakes(first: number, skip: number): Promise<TransferStake[]>;
    getTransferNFTStakesByAddress(address: string, first: number, skip: number): Promise<TransferStake[]>;
    getWithdrawNFTStakes(first: number, skip: number): Promise<WithdrawStake[]>;
    getWithdrawNFTStakesByAddress(address: string, first: number, skip: number): Promise<WithdrawStake[]>;
    getValidators(): Promise<Validator[]>;
    getValidator(address: string): Promise<Validator>;
    getValidatorPenalties(validator: string, first: number, skip: number): Promise<Penalty[]>;
    getValidatorPenaltiesFromBlock(validator: string, blockNumber: string | number, first: number, skip: number): Promise<Penalty[]>;
    getSumAmountToPenalty(): Promise<{}>;
    getNftCollections(first: number, skip: number): Promise<NFTCollection[]>;
    getNftCollectionsByCreator(address: string, first: number, skip: number): Promise<NFTCollection[]>;
    getNftCollectionByAddress(address: string): Promise<NFTCollection>;
    getNfts(first: number, skip: number): Promise<NFTToken[]>;
    getNftsByCollection(address: string, first: number, skip: number): Promise<NFTToken[]>;
    getNftByCollectionAndTokenId(address: string, tokenId: string | number): Promise<NFTToken>;
    getAddressBalancesNfts(address: string, first: number, skip: number): Promise<NFTToken[]>;
    getAddressBalancesNftsByCollection(address: string, addressCollection: string, first: number, skip: number): Promise<NFTToken[]>;
    getNftCollectionByCreatorAndUser(address: string, first: number, skip: number): Promise<NFTCollection[]>;
    getNftCollectionByUser(address: string, first: number, skip: number): Promise<NFTCollection[]>;
    getNftCollectionType(address: string): Promise<string | null>;
    getNftTransfersByUser(user: string, first: number, skip: number): Promise<NFTTransfer[]>;
    subgraphCustomQuery(query: string): Promise<any>;
    getBridgeContracts(): Promise<DecimalBridgeContract>;
    getBridgeTokens(first: number, skip: number): Promise<BridgeToken[]>;
    getBridgeTokenByAddress(address: string): Promise<BridgeToken>;
    getBridgeTokenBySymbol(symbol: string): Promise<BridgeToken>;
    getBridgeTransfers(first: number, skip: number): Promise<BridgeTransfer[]>;
    getBridgeTransfersByFrom(address: string, first: number, skip: number): Promise<BridgeTransfer[]>;
    getBridgeTransfersByTo(address: string, first: number, skip: number): Promise<BridgeTransfer[]>;
    getBridgeTransfersByToken(address: string, first: number, skip: number): Promise<BridgeTransfer[]>;
    subgraphBridgeCustomQuery(query: string): Promise<any>;
}
