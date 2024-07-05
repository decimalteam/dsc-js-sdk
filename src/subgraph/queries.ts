import {
    NETWORKS,
    getSubgraphEndpoint,
    getSubgraphBridgeEndpoint
} from "../endpoints";
import { DecimalContract, DecimalBridgeContract } from "./interfaces/contracts";
import { Token, AddressBalance, BridgeToken, BridgeTransfer } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty, SumAmountToPenalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken, NFTTransfer } from "./interfaces/nfts";
import fetch from "node-fetch";

export default class Queries {
    private readonly network: NETWORKS;

    public constructor(
        network: NETWORKS
    ) {
        this.network = network
    }

    private async query(q:string, endpoint: string) {  
        const results = await fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: q
            })
        })
        const characters = await results.json();
        return characters.data;
    }

    //subgraph contract-center
    public async getDecimalContracts(): Promise<DecimalContract[]> {
        const result = await this.query(`{
            decimalContracts {
                id
                name
                address
                implementation
            }
        }`, getSubgraphEndpoint(this.network))
        return result.decimalContracts
    }

    public async getTokens(options:string): Promise<Token[]> {
        const result = await this.query(`{
            tokens${options} {
                address
                symbol
                name
                decimals
                crr
                totalSupply
                maxTotalSupply
                minTotalSupply
                identity
                reserve
                currentPrice
                creator
                tokenType
            }
        }`, getSubgraphEndpoint(this.network))
        return result.tokens
    }
    public async getToken(options:string): Promise<Token> {
        const result = await this.query(`{
            tokens${options} {
                address
                symbol
                name
                decimals
                crr
                totalSupply
                maxTotalSupply
                minTotalSupply
                identity
                reserve
                currentPrice
                creator
                tokenType
            }
        }`, getSubgraphEndpoint(this.network))
        return result.tokens[0]
    }
    
    public async getAddressBalances(options:string): Promise<AddressBalance[]> {
        const result = await this.query(`{
            balances${options} {
                amount
                token {
                    address
                    symbol
                    name
                    decimals
                    crr
                    totalSupply
                    maxTotalSupply
                    minTotalSupply
                    identity
                    reserve
                    currentPrice
                    creator
                    tokenType
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.balances
    }

    public async getStakes(options: string): Promise<Stake[]> {
        const result = await this.query(`{
            stakes${options} {
                id
                validator {
                    address
                }
                delegator
                token {
                    address
                    symbol  
                }
                nft {
                    address
                    symbol  
                }
                tokenId
                amount
                tokenType
            }
        }`, getSubgraphEndpoint(this.network))
        return result.stakes
    }

    public async getTransferStakes(options: string): Promise<TransferStake[]> {
        const result = await this.query(`{
            transferStakes${options} {
                id
                oldValidator {
                  address
                }
                newValidator {
                  address
                }
                delegator
                token {
                    address
                    symbol
                }
                nft {
                    address
                    symbol  
                }
                tokenId
                amount
                stakeIndex
                unfreezeTimestamp
                tokenType
            }
        }`, getSubgraphEndpoint(this.network))
        return result.transferStakes
    }

    public async getWithdrawStakes(options: string): Promise<WithdrawStake[]> {
        const result = await this.query(`{
            withdrawStakes${options} {
                id
                validator {
                  address
                }
                delegator
                token {
                    address
                    symbol
                }
                nft {
                    address
                    symbol  
                }
                tokenId
                amount
                stakeIndex
                unfreezeTimestamp
                tokenType
            }
        }`, getSubgraphEndpoint(this.network))
        return result.withdrawStakes
    }

    public async getValidators(): Promise<Validator[]> {
        const result = await this.query(`{
        validators {
                id
                address
                status
            }
        }`, getSubgraphEndpoint(this.network))
        return result.validators
    }

    public async getValidator(address: string): Promise<Validator> {
        const result = await this.query(`{
            validator(id: "${address.toLowerCase()}") {
                id
                address
                status
            }
        }`, getSubgraphEndpoint(this.network))
        return result.validator
    }

    public async getPenalties(options: string): Promise<Penalty[]> {
        const result = await this.query(`{
            penalties${options} {
                id
                percentage
                validator {
                    id
                    address
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.penalties
    }

    public async getSumAmountToPenalty(): Promise<SumAmountToPenalty> {
        const resultPenalties = await this.query(`{
                penalties {
                    id
                    percentage
                    validator {
                        id
                        address
                    }
                }
            }`, getSubgraphEndpoint(this.network))
        if (resultPenalties.penalties.length == 0) return {
            sumAmountToPenalty: [],
            sumAmountToPenaltyAll: []
        }

        let queryBlocks = ``;
        for (const penalty of resultPenalties.penalties) {
            const block = penalty.id.split('-')[1]
            queryBlocks += `
            stakes_${penalty.validator.id}_${block}_${penalty.percentage}: stakes(where: {validator: "${penalty.validator.id}"}, block: { number: ${block}}) {
                id
                validator {
                    address
                }
                delegator
                token {
                    address
                    symbol
                    currentPrice
                }
                amount
            }`
        }

        const result = await this.query(`{
            ${queryBlocks}
        }`, getSubgraphEndpoint(this.network))
        console.log(result)

        const validatorMap: { [k: string]: bigint } = {}
        const paneltyMap: { [k: string]: any } = {}
        for (const key of Object.keys(result)) {
            const percentage = BigInt(key.split('_')[3])
            for (const stake of result[key]) {
                //sum amount panalty for all the time
                if (!validatorMap[stake.validator.address]) {
                    validatorMap[stake.validator.address] = BigInt(0)
                }
                const stakeAmountDel = BigInt(stake.amount)*BigInt(stake.token.currentPrice)
                const amountToPenalty = (stakeAmountDel * percentage) / BigInt(100)
                validatorMap[stake.validator.address] += amountToPenalty

                //sum amount panalty for panalty
                if (!paneltyMap[key]) {
                    paneltyMap[key] = {
                        block: Number(key.split('_')[2]),
                        validator: stake.validator.address,
                        amount: BigInt(0)
                    }
                }
                paneltyMap[key].amount += amountToPenalty
            }
        }
        const sumAmountToPenaltyAll = Object.entries(validatorMap).map(([index, value]) => {
            return {
                validator: index,
                amount: value
            }
        })

        const sumAmountToPenalty = Object.entries(paneltyMap).map(([index, penalty]) => {
            return {
                block: penalty.block,
                validator: penalty.validator,
                amount: penalty.amount
            }
        })

        return {
            sumAmountToPenalty: sumAmountToPenalty,
            sumAmountToPenaltyAll: sumAmountToPenaltyAll
        }
        
    }

    public async subgraphCustomQuery(query: string) {
        const result = await this.query(query, getSubgraphEndpoint(this.network))
        return result
    }

    public async getNftCollections(options: string): Promise<NFTCollection[]> {
        const result = await this.query(`{
            nftcollections${options} {
                address
                symbol
                name
                creator
                tokenType
                collectionSupply
                contractURI
                allowMint
                burnable
                withReserve
                refundable
                txHash
                blockNumber
                timestamp
                nfts {
                  tokenURI
                  tokenId
                  supply
                  transfers(orderBy: timestamp, orderDirection: desc) {
                    from
                    to
                    txHash
                    blockNumber
                    timestamp
                    amount
                  }
                  balances {
                    user {
                      address
                    }
                    amount
                  }
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.nftcollections
    }

    public async getNftCollection(options:string): Promise<NFTCollection> {
        const result = await this.query(`{
            nftcollections${options} {
                address
                symbol
                name
                creator
                tokenType
                collectionSupply
                contractURI
                allowMint
                burnable
                withReserve
                refundable
                txHash
                blockNumber
                timestamp
                nfts {
                  tokenURI
                  tokenId
                  supply
                  transfers(orderBy: timestamp, orderDirection: desc) {
                    from
                    to
                    txHash
                    blockNumber
                    timestamp
                    amount
                  }
                  balances {
                    user {
                      address
                    }
                    amount
                  }
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.nftcollections[0]
    }

    public async getNfts(options:string): Promise<NFTToken[]> {
        const result = await this.query(`{
            nfttokens${options} {
                tokenURI
                tokenId
                supply
                collection {
                    address
                    symbol
                    name
                    creator
                    tokenType
                    collectionSupply
                    contractURI
                    allowMint
                    burnable
                    withReserve
                    refundable
                    txHash
                    blockNumber
                    timestamp
                }
                transfers(orderBy: timestamp, orderDirection: desc) {
                  from
                  to
                  txHash
                  blockNumber
                  timestamp
                  amount
                }
                balances {
                  user {
                    address
                  }
                  amount
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.nfttokens
    }

    public async getNftTransfers(options:string): Promise<NFTTransfer[]> {
        const result = await this.query(`{
            nfttransfers${options} {
                from
                to
                txHash
                blockNumber
                timestamp
                amount
                nft {
                    tokenURI
                    tokenId
                    supply
                }
                collection {
                    address
                    symbol
                    name
                    creator
                    tokenType
                    collectionSupply
                    contractURI
                    allowMint
                    burnable
                    withReserve
                    refundable
                    txHash
                    blockNumber
                    timestamp
                }
            }
        }`, getSubgraphEndpoint(this.network))
        return result.nfttransfers
    }

    public async getNftCollectionType(options:string): Promise<string | null> {
        const result = await this.query(`{
            nftcollection${options} {
                tokenType
            }
          }`, getSubgraphEndpoint(this.network))
        if (result.nftcollection == null) return null
        return result.nftcollection.tokenType
    }

    //subgraph bridge
    public async getBridgeContracts(): Promise<DecimalBridgeContract> {
        const result = await this.query(`{
            bridges {
                id
                implementation
            }
        }`, getSubgraphBridgeEndpoint(this.network))
        return result.bridges[0]
    }

    public async getBridgeTokens(options: string): Promise<BridgeToken[]> {
        const result = await this.query(`{
            tokens${options} {
                address
                chainId
                decimals
                name
                symbol
            }
        }`, getSubgraphBridgeEndpoint(this.network))
        const r = result.tokens.map((token:any) => {
            return {
                ...token,
                address: "0x" + token.address.slice(26),
            }
        })
        return r
    }

    public async getBridgeToken(options: string): Promise<BridgeToken> {
        const result = await this.query(`{
            tokens${options} {
                address
                chainId
                decimals
                name
                symbol
            }
        }`, getSubgraphBridgeEndpoint(this.network))
        const r = result.tokens.map((token:any) => {
            return {
                ...token,
                address: "0x" + token.address.slice(26),
            }
        })
        return r[0]
    }

    public async getBridgeTransfers(options: string): Promise<BridgeTransfer[]> {
        const result = await this.query(`{
            transfers${options} {
                from
                to
                amount
                toChainId
                fee
                nonce
                payload
                transferType
                token {
                    address
                    chainId
                    decimals
                    name
                    symbol
                }
            }
        }`, getSubgraphBridgeEndpoint(this.network))
        const r = result.transfers.map((transfer:any) => {
            transfer.token.address = "0x" + transfer.token.address.slice(26);
            return {
                ...transfer,
                to: "0x" + transfer.to.slice(26),
            }
        })
        return r
    }

    public async getBridgeTransfer(options: string): Promise<BridgeTransfer> {
        const result = await this.query(`{
            transfers${options} {
                from
                to
                amount
                toChainId
                fee
                nonce
                payload
                transferType
                token {
                    address
                    chainId
                    decimals
                    name
                    symbol
                }
            }
        }`, getSubgraphBridgeEndpoint(this.network))
        const r = result.transfers.map((transfer:any) => {
            transfer.token.address = "0x" + transfer.token.address.slice(26);
            return {
                ...transfer,
                to: "0x" + transfer.to.slice(26),
            }
        })
        return r[0]
    }

    public async subgraphBridgeCustomQuery(query: string) {
        const result = await this.query(query, getSubgraphBridgeEndpoint(this.network))
        return result
    }
}