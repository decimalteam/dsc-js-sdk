import {
    NETWORKS,
    getSubgraphEndpoint
} from "../endpoints";
import { DecimalContract } from "./interfaces/contracts";
import { Token, AddressBalance } from "./interfaces/tokens";
import { Stake, TransferStake, WithdrawStake, Validator, Penalty, SumAmountToPenalty } from "./interfaces/delegation";
import { NFTCollection, NFTToken } from "./interfaces/nfts";
import fetch from "node-fetch";

export default class Queries {
    private readonly network: NETWORKS;

    public constructor(
        network: NETWORKS
    ) {
        this.network = network
    }

    private async query(q:string) {
        let results = await fetch(getSubgraphEndpoint(this.network), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: q
            })
        })
        let characters = await results.json();
        return characters.data;
    }

    public async getDecimalContracts(): Promise<DecimalContract[]> {
        const result = await this.query(`{
            decimalContracts {
                id
                name
                address
                implementation
            }
        }`)
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
                owner
                tokenType
            }
        }`)
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
                owner
                tokenType
            }
        }`)
        return result.tokens[0]
    }
    
    public async getAddressBalances(options:string): Promise<AddressBalance[]> {
        const result = await this.query(`{
            balances${options} {
                balance
                token {
                    address
                    symbol
                    identity
                }
            }
        }`)
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
        }`)
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
        }`)
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
        }`)
        return result.withdrawStakes
    }

    public async getValidators(): Promise<Validator[]> {
        const result = await this.query(`{
        validators {
                id
                address
                status
            }
        }`)
        return result.validators
    }

    public async getValidator(address: string): Promise<Validator> {
        const result = await this.query(`{
            validator(id: "${address.toLowerCase()}") {
                id
                address
                status
            }
        }`)
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
        }`)
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
            }`)
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
        }`)
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
        const result = await this.query(query)
        return result
    }

    public async getNftCollections(options: string): Promise<NFTCollection[]> {
        const result = await this.query(`{
            nftcollections${options} {
                address
                symbol
                name
                collectionOwner
                tokenType
                collectionSupply
                nfts {
                  tokenURI
                  tokenId
                  supply
                  transfers {
                    from
                    to
                    txHash
                    blockNumber
                    amount
                  }
                  balances {
                    owner {
                      address
                    }
                    amount
                  }
                }
            }
        }`)
        return result.nftcollections
    }

    public async getNftCollection(options:string): Promise<NFTCollection> {
        const result = await this.query(`{
            nftcollections${options} {
                address
                symbol
                name
                collectionOwner
                tokenType
                collectionSupply
                nfts {
                  tokenURI
                  tokenId
                  supply
                  transfers {
                    from
                    to
                    txHash
                    blockNumber
                    amount
                  }
                  balances {
                    owner {
                      address
                    }
                    amount
                  }
                }
            }
        }`)
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
                    collectionOwner
                    tokenType
                    collectionSupply
                }
                transfers {
                  from
                  to
                  txHash
                  blockNumber
                  amount
                }
                balances {
                  owner {
                    address
                  }
                  amount
                }
            }
        }`)
        return result.nfttokens
    }

    public async getNftCollectionType(options:string): Promise<string | null> {
        const result = await this.query(`{
            nftcollection${options} {
                tokenType
            }
          }`)
        if (result.nftcollection == null) return null
        return result.nftcollection.tokenType
    }
}