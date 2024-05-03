import { NETWORKS } from "../endpoints";
import { DecimalContract } from "./interfaces/contracts";
import { Token, AddressBalance } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty } from "./interfaces/delegation";
import { NFTCollection, NFT } from "./interfaces/nfts";
export default class Subgraph {
    private readonly network;
    private readonly query;
    constructor(network: NETWORKS);
    private checkFirstAndSkip;
    getDecimalContracts(): Promise<DecimalContract[]>;
    getTokens(first: number, skip: number): Promise<Token[]>;
    getTokensByOwner(address: string, first: number, skip: number): Promise<Token[]>;
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
    getNftCollectionsByOwner(address: string, first: number, skip: number): Promise<NFTCollection[]>;
    getNftCollectionByAddress(address: string): Promise<Token>;
    getNfts(first: number, skip: number): Promise<NFT[]>;
    getNftsByCollection(address: string, first: number, skip: number): Promise<NFT[]>;
    getAddressBalancesNfts(address: string, first: number, skip: number): Promise<NFT[]>;
    getNftCollectionType(address: string): Promise<string | null>;
    subgraphCustomQuery(query: string): Promise<any>;
}