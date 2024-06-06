import { NETWORKS } from "../endpoints";
import { DecimalContract } from "./interfaces/contracts";
import { Token, AddressBalance } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty, SumAmountToPenalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken } from "./interfaces/nfts";
export default class Queries {
    private readonly network;
    constructor(network: NETWORKS);
    private query;
    getDecimalContracts(): Promise<DecimalContract[]>;
    getTokens(options: string): Promise<Token[]>;
    getToken(options: string): Promise<Token>;
    getAddressBalances(options: string): Promise<AddressBalance[]>;
    getStakes(options: string): Promise<Stake[]>;
    getTransferStakes(options: string): Promise<TransferStake[]>;
    getWithdrawStakes(options: string): Promise<WithdrawStake[]>;
    getValidators(): Promise<Validator[]>;
    getValidator(address: string): Promise<Validator>;
    getPenalties(options: string): Promise<Penalty[]>;
    getSumAmountToPenalty(): Promise<SumAmountToPenalty>;
    subgraphCustomQuery(query: string): Promise<any>;
    getNftCollections(options: string): Promise<NFTCollection[]>;
    getNftCollection(options: string): Promise<NFTCollection>;
    getNfts(options: string): Promise<NFTToken[]>;
    getNftCollectionType(options: string): Promise<string | null>;
}
