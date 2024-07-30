import {ethers, Wallet as HDNodeWallet} from "ethers";
import DecimalContractEVM from "./contract";
import { Stake } from "./interfaces/delegation";
import { ValidatorStatus } from "./interfaces/validator";
import {
    NETWORKS,
} from "../endpoints";

import {
    buildContractCall,
    buildSafeTransaction,
    executeTx,
    executeTxWithSigners,
    MetaTransaction,
    safeApproveHash,
    SafeSignature,
    safeSignTypedData,
    SafeTransaction
} from "./multisig/execution";
import { buildMultiSendSafeTx } from "./multisig/multisend";

export enum TypeNFT {
    DRC721,
    DRC1155,
    //DRC721Standart,
    //DRC1155Standart,
}

export enum FreezeType {
    Unknown,
    Withdraw,
    Transfer,
    Completed
}

export type Token = {
    creator: string;
    symbol: string;
    name: string;
    crr: string | number | bigint;
    initialMint: ethers.BigNumberish;
    minTotalSupply: ethers.BigNumberish;
    maxTotalSupply: ethers.BigNumberish;
    identity: string;
}

export type NFTCollection = {
    creator: string;
    symbol: string;
    name: string;
    contractURI: string;
    allowMint: boolean;
    burnable: boolean;
    refundable: boolean;
}

export type NFTCollectionReserveless = Omit<NFTCollection, 'refundable'>


export type ValidotorStake = {
    token: string,
    amount: ethers.BigNumberish;
}

export default class Call {

    private readonly network: NETWORKS;
    private readonly provider: ethers.providers.JsonRpcProvider;
    private readonly account: HDNodeWallet;
    public contractCenter?: DecimalContractEVM;
    public tokenCenter?: DecimalContractEVM;
    public delegation?: DecimalContractEVM;
    public nftCenter?: DecimalContractEVM;
    public delegationNft?: DecimalContractEVM;
    public masterValidator?: DecimalContractEVM;
    public multiCall?: DecimalContractEVM;
    public safe?: DecimalContractEVM;
    public safeFactory?: DecimalContractEVM;
    public multiSend?: DecimalContractEVM;
    public checks?: DecimalContractEVM;
    public bridgeV2?: DecimalContractEVM;
    private bridgeV2Nonce: number = 0;

    public constructor(
        network: NETWORKS,
        provider: ethers.providers.JsonRpcProvider,
        account: HDNodeWallet,
    ) {
        this.network = network
        this.provider = provider;
        this.account = account;
    }

    public setDecimalContractEVM(decimalContractEVM: DecimalContractEVM, name: string) {
        switch(name) {
            case 'contractCenter':
                this.contractCenter = decimalContractEVM
                break;
            case 'tokenCenter':
                this.tokenCenter = decimalContractEVM
                break;
            case 'delegation':
                this.delegation = decimalContractEVM
                break;
            case 'nftCenter':
                this.nftCenter = decimalContractEVM
                break;
            case 'delegationNft':
                this.delegationNft = decimalContractEVM
                break;
            case 'masterValidator':
                this.masterValidator = decimalContractEVM
                break;
            case 'multiCall':
                this.multiCall = decimalContractEVM
                break;
            case 'safe':
                this.safe = decimalContractEVM //for multisig
                break;
            case 'safeFactory':
                this.safeFactory = decimalContractEVM //for multisig
                break;
            case 'multiSend':
                this.multiSend = decimalContractEVM //for multisig
                break;
            case 'bridgeV2':
                this.bridgeV2 = decimalContractEVM
                break;
            case 'checks':
                this.checks = decimalContractEVM
                break;
            default:
                throw new Error(`Unknown contract name`);
          }
    }

    private async txOptions(options?:any | undefined) {
        if (options === undefined) options = {};
        if (this.network == NETWORKS.TESTNET) {
            const feeData = await this.provider.getFeeData()
            const gasPrice = feeData.gasPrice!.add(1)
            options.gasPrice = gasPrice
        }
        return options
    }
    private parseLog(contract: ethers.Contract,  logs:any, eventName: string) {
        return logs
        .filter((log:any) => (ethers.utils.getAddress(log.address) == ethers.utils.getAddress(contract.address)))
        .map((log:any) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return undefined;
          }
        })
        .find((event:ethers.utils.LogDescription) => event?.name === eventName)
    }
    
    // -----------write functions----------

    //multicall
    public async multicall(value: string | number | bigint, calls: {target: string; value: string; callData: string;}[], estimateGas?: boolean) {
        if (estimateGas) {
            return await this.multiCall!.contract.estimateGas.aggregate(calls, await this.txOptions({value: value}))
        }
        await this.multiCall!.contract.callStatic.aggregate(calls, await this.txOptions({value: value}))
        return await this.multiCall!.contract.aggregate(calls, await this.txOptions({value: value})).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    //token-center
    public async createToken(token:Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (estimateGas) {
            return await this.tokenCenter!.contract.estimateGas.createToken(token, await this.txOptions({value: reserve}))
        }

        const tx = await this.tokenCenter!.contract.createToken(token, await this.txOptions({value: reserve})).then((tx: ethers.ContractTransaction) => tx.wait());
        const event = this.parseLog(this.tokenCenter!.contract, tx.logs, 'TokenDeployed')
        return {tx: tx, tokenAddress: event.args[0]};
    }

    public async createTokenReserveless(
        name: string,
        symbol: string,
        mintable: boolean,
        burnable: boolean,
        initialMint: string | number | bigint,
        cap: string | number | bigint | undefined | null,
        identity: string,
        estimateGas?: boolean
    ): Promise<any> {
        if (!mintable || !cap) {
            cap = '0'
        }
        if (estimateGas) {
            return await this.tokenCenter!.contract.estimateGas.createTokenReserveless(
                name,
                symbol,
                mintable,
                burnable,
                initialMint,
                cap,
                identity,
                await this.txOptions()
            )
        }

        const tx = await this.tokenCenter!.contract.createTokenReserveless(
            name,
            symbol,
            mintable,
            burnable,
            initialMint,
            cap,
            identity,
            await this.txOptions()
        ).then((tx: ethers.ContractTransaction) => tx.wait());
        const event = this.parseLog(this.tokenCenter!.contract, tx.logs, 'TokenReservelessDeployed')
        return {tx: tx, tokenAddress: event.args[0]};
    }

    public async convertToken(tokenIn:string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.tokenCenter!.contract.estimateGas["convert(address,address,uint256,uint256,address)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions())
            return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await this.tokenCenter!.contract.estimateGas["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

     // token reserveless

     public async mintTokenReserveless(contract: ethers.Contract, amount: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.mint(recipient, amount, await this.txOptions())
        return await contract.mint(recipient, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    //token
    public async approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.approve(spender, amount, await this.txOptions())
        return await contract.approve(spender, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.transfer(to, amount)
        return await contract.transfer(to, amount).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.transferFrom(from, to, amount)
        return await contract.transferFrom(from, to, amount).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.burn(amount)
        return await contract.burn(amount).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.buyTokenForExactDEL(amountOutMin, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyTokenForExactDEL(amountOutMin, recipient, await this.txOptions({value: amountDel})).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.buyExactTokenForDEL(amountOut, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyExactTokenForDEL(amountOut, recipient, await this.txOptions({value: amountDel})).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.sellTokensForExactDEL(amountOut, amountInMax, recipient)
        return await contract.sellTokensForExactDEL(amountOut, amountInMax, recipient).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.sellExactTokensForDEL(amountIn, amountOutMin, recipient)
        return await contract.sellExactTokensForDEL(amountIn, amountOutMin, recipient).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async updateDetailsToken(contract: ethers.Contract, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.updateDetails(newIdentity, newMaxTotalSupply)
        return await contract.updateDetails(newIdentity, newMaxTotalSupply).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean) {
        const deadline = ethers.constants.MaxUint256
        if (estimateGas) return await contract.estimateGas.permit(owner, spender, amount, deadline, sign.v, sign.r, sign.s)
        return await contract.permit(owner, spender, amount, deadline, sign.v, sign.r, sign.s).then((tx: ethers.ContractTransaction) => tx.wait());
    }
    
    //delegation
    public async delegateDEL(validator:string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.estimateGas.delegateDEL(validator, await this.txOptions({value: amount}))
        return await this.delegation!.contract.delegateDEL(validator, await this.txOptions({value: amount})).then((tx: ethers.ContractTransaction) => tx.wait());
    }
    
    public async delegateToken(validator:string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.delegation!.contract.estimateGas.delegate(validator, tokenAddress, amount, await this.txOptions())
            return await this.delegation!.contract.delegate(validator, tokenAddress, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await this.delegation!.contract.estimateGas.delegateByPermit(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegation!.contract.delegateByPermit(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

    public async delegateTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.delegation!.contract.estimateGas.delegateHold(validator, tokenAddress, amount, holdTimestamp, await this.txOptions())
            return await this.delegation!.contract.delegateHold(validator, tokenAddress, amount, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await this.delegation!.contract.estimateGas.delegateHoldByPermit(validator, tokenAddress, amount, holdTimestamp, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegation!.contract.delegateHoldByPermit(validator, tokenAddress, amount, holdTimestamp, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

    public async transferStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.estimateGas.transfer(validator, tokenAddress, amount, newValidator, await this.txOptions())
        return await this.delegation!.contract.transfer(validator, tokenAddress, amount, newValidator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async transferStakeTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.estimateGas.transferHold(validator, tokenAddress, amount, holdTimestamp, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferHold(validator, tokenAddress, amount, holdTimestamp, newValidator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async withdrawStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.estimateGas.withdraw(validator, tokenAddress, amount, await this.txOptions())
        return await this.delegation!.contract.withdraw(validator, tokenAddress, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async withdrawStakeTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.estimateGas.withdrawHold(validator, tokenAddress, amount, await this.txOptions())
        return await this.delegation!.contract.withdrawHold(validator, tokenAddress, amount, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async applyPenaltyToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean):Promise<any> {
        try {
            await this.delegation!.contract.callStatic.applyPenaltyToStake(validator, delegator, tokenAddress, await this.txOptions())
            if (estimateGas) {
                return await this.delegation!.contract.estimateGas.applyPenaltyToStake(validator, delegator, tokenAddress, await this.txOptions())
            }
            const tx = await this.delegation!.contract.applyPenaltyToStake(validator, delegator, tokenAddress, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, error: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name} 
            }
            throw new Error(err)
        }
    }

    public async applyPenaltiesToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean): Promise<any> {
        try {
            await this.delegation!.contract.callStatic.applyPenaltiesToStake(validator, delegator, tokenAddress, await this.txOptions())
            if (estimateGas) {
                return await this.delegation!.contract.estimateGas.applyPenaltiesToStake(validator, delegator, tokenAddress, await this.txOptions())
            }
            const tx = await this.delegation!.contract.applyPenaltiesToStake(validator, delegator, tokenAddress, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, error: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name} 
            }
            throw new Error(err)
        }
    }

    public async completeStakeToken(indexes:string[] | number[], estimateGas?: boolean): Promise<any> {
        try {
            await this.delegation!.contract.callStatic.complete(indexes, await this.txOptions())
            if (estimateGas) {
                return await this.delegation!.contract.estimateGas.complete(indexes, await this.txOptions())
            }
            const tx = await this.delegation!.contract.complete(indexes, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, error: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name} 
            }
            throw new Error(err)
        }
    }

    //nft-center
    public async createCollection(nft:NFTCollection | NFTCollectionReserveless, typeNFT: TypeNFT, withReserve: boolean, estimateGas?: boolean): Promise<any> {
        let collection: string = '';
        if (withReserve) {
            if (typeNFT == TypeNFT.DRC721) {
                collection = 'createDRC721';
            }
            if (typeNFT == TypeNFT.DRC1155) {
                collection = 'createDRC1155';
            }
        } else {
            if (typeNFT == TypeNFT.DRC721) {
                collection = 'createDRC721Reserveless';
            }
            if (typeNFT == TypeNFT.DRC1155) {
                collection = 'createDRC1155Reserveless';
            }
        }
        if (estimateGas) {
            return await this.nftCenter!.contract.estimateGas[collection](nft, await this.txOptions())
        }
        const tx = await this.nftCenter!.contract[collection](nft, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        const event = this.parseLog(this.nftCenter!.contract, tx.logs, 'NFTCreated')
        return {tx: tx, nftCollectionAddress: event.args[0]};
    }
    

    //nft 721Standart && 1155Standart && 721 && 1155
    public async setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.setApprovalForAll(to, approved, await this.txOptions())
        return await contract.setApprovalForAll(to, approved, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.estimateGas.safeTransferFrom(from, to, tokenId, amount, "0x", await this.txOptions())
            return await contract.safeTransferFrom(from, to, tokenId, amount, "0x", await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155, 1155Standart
        } else {
            if (estimateGas) return await contract.estimateGas["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, "0x", await this.txOptions())
            return await contract["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, "0x", await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721, 721Standart
        }
    }

    public async disableMintNFT(contract: ethers.Contract, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.disableMint(await this.txOptions())
        return await contract.disableMint(await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.estimateGas.burn(tokenId, amount, await this.txOptions())
            return await contract.burn(tokenId, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155, 1155Standart
        } else {
            if (estimateGas) return await contract.estimateGas.burn(tokenId, await this.txOptions())
            return await contract.burn(tokenId, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721, 721Standart
        }
    }

    // public async setBaseURINFT(contract: ethers.Contract, baseURI: string, estimateGas?: boolean) {
    //     if (estimateGas) return await contract.estimateGas.setBaseURI(baseURI)
    //     return await contract.setBaseURI(baseURI).then((tx: ethers.ContractTransaction) => tx.wait());
    // }

    public async setTokenURINFT(contract: ethers.Contract, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.setTokenURI(tokenId, tokenURI, await this.txOptions()) 
        return await contract.setTokenURI(tokenId, tokenURI, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    //nft 721Standart && 1155Standart
    public async mintNFT(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                return await contract.estimateGas.mint(to, tokenId, amount, tokenURI, await this.txOptions())
            }
            const tx = await contract.mint(to, tokenId, amount, tokenURI, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155Standart
            return {tx: tx, tokenId: tokenId};
        } else {
            if (estimateGas) {
                return await contract.estimateGas.mint(to, tokenURI, await this.txOptions())
            }
            const tx = await contract.mint(to, tokenURI, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721Standart
            const event = this.parseLog(contract, tx.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2]};
        }
    }

    //nft 721 && 1155
    public async mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                return await contract.estimateGas.mintByDEL(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve}))
            }
            const tx = await contract.mintByDEL(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve})).then((tx: ethers.ContractTransaction) => tx.wait()); //1155
            return {tx: tx, tokenId: tokenId};
        } else {
            if (estimateGas) {
                return await contract.estimateGas.mintByDEL(to, tokenURI, await this.txOptions({ value: reserve}))
            }
            const tx = await contract.mintByDEL(to, tokenURI, await this.txOptions({ value: reserve})).then((tx: ethers.ContractTransaction) => tx.wait()); //721
            const event = this.parseLog(contract, tx.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2]};
        }
    }

    public async mintReserveless(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                return await contract.estimateGas.mint(to, tokenId, amount, tokenURI, '0', ethers.constants.AddressZero, await this.txOptions())
            }
            const tx = await contract.mint(to, tokenId, amount, tokenURI, '0', ethers.constants.AddressZero, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155 approve
            return {tx: tx, tokenId: tokenId};
        } else {
            if (estimateGas) {
                return await contract.estimateGas.mint(to, tokenURI, '0', ethers.constants.AddressZero, await this.txOptions())
            }
            const tx = await contract.mint(to, tokenURI, '0', ethers.constants.AddressZero, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721 approve
            const event = this.parseLog(contract, tx.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2]};

        }
    }

    public async mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (sign != undefined) {
                const deadline = ethers.constants.MaxUint256
                if (estimateGas) {
                    return await contract.estimateGas.mintByPermit(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                }
                const tx = await contract.mintByPermit(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155 permit
                return {tx: tx, tokenId: tokenId};
            } else {
                if (estimateGas) {
                    return await contract.estimateGas.mint(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                }
                const tx = await contract.mint(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155 approve
                return {tx: tx, tokenId: tokenId};
            }
        } else {
            if (sign != undefined) {
                const deadline = ethers.constants.MaxUint256
                if (estimateGas) {
                    return await contract.estimateGas.mintByPermit(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                }
                const tx = await contract.mintByPermit(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721 permit
                const event = this.parseLog(contract, tx.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2]};
            } else {
                if (estimateGas) {
                    return await contract.estimateGas.mint(to, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                }
                const tx = await contract.mint(to, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721 approve
                const event = this.parseLog(contract, tx.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2]};
            }

        }
    }
    public async addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.addReserveByDEL(tokenId, await this.txOptions({ value: amountReserve}))
        return await contract.addReserveByDEL(tokenId, await this.txOptions({ value: amountReserve})).then((tx: ethers.ContractTransaction) => tx.wait()); //721, 1155
    }

    public async addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await contract.estimateGas.addReserve(tokenId, amountReserve, await this.txOptions())
            return await contract.addReserve(tokenId, amountReserve, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721, 1155 (for approve)
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await contract.estimateGas.addReserveByPermit(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await contract.addReserveByPermit(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //721, 1155 (for permit)
        }
    }

    //nft 721
    public async approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.approve(to, tokenId, await this.txOptions())
        return await contract.approve(to, tokenId, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    //nft 1155 && 1155Standart
    public async transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean) {
        if (estimateGas) return await contract.estimateGas.safeBatchTransferFrom(from, to, tokenIds, amounts, "0x", await this.txOptions())
        return await contract.safeBatchTransferFrom(from, to, tokenIds, amounts, "0x", await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); //1155, 1155Standart
    }

    //nft 1155
    

    //delegation nft
    public async delegateDRC721(validator:string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.delegateDRC721(validator, nftAddress, tokenId, await this.txOptions())
            return await this.delegationNft!.contract.delegateDRC721(validator, nftAddress, tokenId, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.delegateByPermitDRC721(validator, nftAddress, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegationNft!.contract.delegateByPermitDRC721(validator, nftAddress, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

    public async delegateDRC1155(validator:string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.delegateDRC1155(validator, nftAddress, tokenId, amount, await this.txOptions())
            return await this.delegationNft!.contract.delegateDRC1155(validator, nftAddress, tokenId, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.delegateByPermitDRC1155(validator, nftAddress, tokenId, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegationNft!.contract.delegateByPermitDRC1155(validator, nftAddress, tokenId, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

    public async transferStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?:string | number | bigint, estimateGas?: boolean) {
        if (amount == undefined) {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.transferDRC721(validator, nftAddress, tokenId, newValidator, await this.txOptions())
            return await this.delegationNft!.contract.transferDRC721(validator, nftAddress, tokenId, newValidator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.transferDRC1155(validator, nftAddress, tokenId, amount, newValidator, await this.txOptions())
            return await this.delegationNft!.contract.transferDRC1155(validator, nftAddress, tokenId, amount, newValidator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait()); 
        }
    }

    public async withdrawStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount == undefined) {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.withdrawDRC721(validator, nftAddress, tokenId, await this.txOptions())
            return await this.delegationNft!.contract.withdrawDRC721(validator, nftAddress, tokenId, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            if (estimateGas) return await this.delegationNft!.contract.estimateGas.withdrawDRC1155(validator, nftAddress, tokenId, amount, await this.txOptions())
            return await this.delegationNft!.contract.withdrawDRC1155(validator, nftAddress, tokenId, amount, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        }
    }

    public async completeStakeNFT(indexes:string[] | number[], estimateGas?: boolean): Promise<any> {
        try {
            await this.delegationNft!.contract.callStatic.complete(indexes, await this.txOptions())
            if (estimateGas) {
                return await this.delegationNft!.contract.estimateGas.complete(indexes, await this.txOptions())
            }
            const tx = await this.delegationNft!.contract.complete(indexes, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, error: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name} 
            }
            throw new Error(err)
        }
    }

    //master-validator
    public async addValidatorWithToken(validator: string, meta: string, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.masterValidator!.contract.estimateGas.addValidator(validator, meta, stake, await this.txOptions())
            return await this.masterValidator!.contract.addValidator(validator, meta, stake, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
        } else {
            //TODO
            throw Error('TODO')
        }
    }

    public async addValidatorWithETH(validator: string, meta: string, amount: string | number | bigint, estimateGas?: boolean) {
        const stake: ValidotorStake = {
            token: ethers.constants.AddressZero,
            amount: '0'
        }
        if (estimateGas) return await this.masterValidator!.contract.estimateGas.addValidator(validator, meta, stake, await this.txOptions({value: amount}))
        return await this.masterValidator!.contract.addValidator(validator, meta, stake, await this.txOptions({value: amount})).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async removeValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.estimateGas.removeValidator(validator, await this.txOptions())
        return await this.masterValidator!.contract.removeValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async pauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.estimateGas.pauseValidator(validator, await this.txOptions())
        return await this.masterValidator!.contract.pauseValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async unpauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.estimateGas.unpauseValidator(validator, await this.txOptions())
        return await this.masterValidator!.contract.unpauseValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    public async updateValidatorMeta(validator: string, meta: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.estimateGas.updateValidatorMeta(validator, meta, await this.txOptions())
        return await this.masterValidator!.contract.updateValidatorMeta(validator, meta, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    //bridgeV2
    public async wrapAndTransferETH(to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
        const addressToBytes32 = "0x" + to.slice(2).padStart(64, "0")
        const value = ethers.BigNumber.from(amount).add(ethers.BigNumber.from(serviceFee))
        if (estimateGas) {
            return await this.bridgeV2!.contract.estimateGas.wrapAndTransferETH(addressToBytes32, toChainId, this.bridgeV2Nonce, serviceFee, await this.txOptions({value: value}))
        }
        const tx = await this.bridgeV2!.contract.wrapAndTransferETH(addressToBytes32, toChainId, this.bridgeV2Nonce, serviceFee, await this.txOptions({value: value})).then((tx: ethers.ContractTransaction) => tx.wait());
        this.bridgeV2Nonce += 1;
        return tx;
    }

    public async transferTokens(tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
        const addressToBytes32 = "0x" + to.slice(2).padStart(64, "0")
        if (estimateGas) {
            return await this.bridgeV2!.contract.estimateGas.transferTokens(tokenAddress, addressToBytes32, amount, toChainId, this.bridgeV2Nonce, await this.txOptions({value: serviceFee}))
        }
        const tx = await this.bridgeV2!.contract.transferTokens(tokenAddress, addressToBytes32, amount, toChainId, this.bridgeV2Nonce, await this.txOptions({value: serviceFee})).then((tx: ethers.ContractTransaction) => tx.wait());
        this.bridgeV2Nonce += 1;
        return tx;
    }

    //checks
    public async createChecksDEL(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean): Promise<any> {
        const nonce = await this.checks!.contract.nonces();
        const passwordHashes = passwords.map((password) => {
            return ethers.utils.solidityKeccak256(['string'], [password])
        })

        const value = ethers.BigNumber.from(passwordHashes.length).mul(ethers.BigNumber.from(amount))
        if (estimateGas) {
            return await this.checks!.contract.estimateGas.createChecksDEL(passwordHashes, amount, dueBlock, nonce, await this.txOptions({value: value}))
        }
        const checks = await this.checks!.contract.callStatic.createChecksDEL(passwordHashes, amount, dueBlock, nonce, await this.txOptions({value: value}))
        const tx = await this.checks!.contract.createChecksDEL(passwordHashes, amount, dueBlock, nonce, await this.txOptions({value: value})).then((tx: ethers.ContractTransaction) => tx.wait());
        return {tx: tx, checks: checks};

    }

    public async createChecksToken(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any> {
        const nonce = await this.checks!.contract.nonces();
        const passwordHashes = passwords.map((password) => {
            return ethers.utils.solidityKeccak256(['string'], [password])
        })
        if (sign == undefined) {
            if (estimateGas) {
                return await this.checks!.contract.estimateGas.createChecksToken(passwordHashes, amount, dueBlock, nonce, tokenAddress, await this.txOptions())
            }
            const checks = await this.checks!.contract.createChecksToken(passwordHashes, amount, dueBlock, nonce, tokenAddress, await this.txOptions())
            const tx = await this.checks!.contract.createChecksToken(passwordHashes, amount, dueBlock, nonce, tokenAddress, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, checks: checks};
        } else {
            const deadline = ethers.constants.MaxUint256
            if (estimateGas) {
                return await this.checks!.contract.estimateGas.createChecksTokenByPermit(passwordHashes, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            }
            const checks = await this.checks!.contract.createChecksTokenByPermit(passwordHashes, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            const tx = await this.checks!.contract.createChecksTokenByPermit(passwordHashes, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransaction) => tx.wait());
            return {tx: tx, checks: checks};
        }
    }

    public async redeemChecks(passwords: string[], checks: string[], callStatic?: boolean, estimateGas?: boolean) {
        if (callStatic) {
            try {
                await this.checks!.contract.callStatic.redeemChecks(passwords, checks);
                return null;
            } catch (err: any) {
                if (err?.revert?.name != null) {
                    return err.revert.name
                }
                throw new Error(err)
            }
        }
        if (estimateGas) {
            return await this.checks!.contract.estimateGas.redeemChecks(passwords, checks);
        }
        return await this.checks!.contract.redeemChecks(passwords, checks).then((tx: ethers.ContractTransaction) => tx.wait());
    }

    // -----------view functions----------
    //token-center
    public async checkTokenExists(address:string) {
        return await this.tokenCenter!.contract.isTokenExists(address)
    }
    
    public async getAddressTokenBySymbol(symbol:string) {
        return await this.tokenCenter!.contract.tokens(symbol)
    }

    public async getCommissionSymbol(symbol:string) {
        return await this.tokenCenter!.contract.getCommissionSymbol(symbol)
    }    

    //token
    public async calculateBuyOutput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract["calculateBuyOutput(uint256)"](amount);
    }
    public async calculateBuyInput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract["calculateBuyInput(uint256)"](amount);
    }

    public async calculateSellInput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract["calculateSellInput(uint256)"](amount);
    }
    
    public async calculateSellOutput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract["calculateSellOutput(uint256)"](amount);
    }

    public async getSignPermitToken(contract: ethers.Contract, spender: string, amount: string | number | bigint): Promise<ethers.Signature> {
        const deadline = ethers.constants.MaxUint256
        const nonce = await contract.nonces(this.account.address)
        const permitHash = await contract.permitHash(
            this.account.address,
            spender,
            amount,
            nonce,
            deadline
        )
        const signingKey = new ethers.utils.SigningKey(this.account.privateKey)
        const sign = signingKey.signDigest(ethers.utils.arrayify(permitHash))
        return sign
    }

    public async allowanceToken(contract: ethers.Contract, owner: string, spender: string) {
        return await contract.allowance(owner, spender);
    }

    public async balanceOfToken(contract: ethers.Contract, account: string) {
        return await contract.balanceOf(account);
    }

    public async supportsInterfaceToken(contract: ethers.Contract, interfaceId: string) {
        return await contract.supportsInterface(interfaceId);
    }

    //nft-center
    public async getNftType(address:string): Promise<TypeNFT> {
        const [active, typeNftString] = await this.nftCenter!.contract.getNftMeta(address)
        if (!active) throw new Error("The nft does not exist")
        const type: string = typeNftString.toString();
        let typeNFT: TypeNFT = TypeNFT[type as keyof typeof TypeNFT]
        return typeNFT
    }

    //nft 721Standart && 1155Standart && 721 && 1155
    public async getAllowMintNFT(contract: ethers.Contract) {
        return await contract.getAllowMint();
    }

    public async isApprovedForAllNFT(contract: ethers.Contract, owner: string, operator: string) {
        return await contract.isApprovedForAll(owner, operator);
    }

    public async balanceOfNFT(contract: ethers.Contract, account: string, tokenId?: string | number | bigint) {
        if (tokenId !== undefined) {
            return await contract.balanceOf(account, tokenId); // drc1155, drc1155standart
        } else {
            return await contract.balanceOf(account); // drc721, drc721standart 
        }
    }

    public async supportsInterfaceNFT(contract: ethers.Contract, interfaceId: string) {
        return await contract.supportsInterface(interfaceId);
    }
    //nft 721 && 1155
    public async getReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint) {
        const result = await contract.getReserve(tokenId)
        return {token: result[0], amount: result[1].toString(), reserveType: TypeNFT[result[2] as keyof typeof TypeNFT]};
    }

    public async getRefundableNFT(contract: ethers.Contract) {
        return await contract.getRefundable();
    }

    //nft 721 & 721Standart
    public async getApprovedNFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.getApproved(tokenId);
    }

    public async ownerOfNFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.ownerOf(tokenId);
    }

    public async getTokenURINFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.tokenURI(tokenId);
    }

    //nft 1155 & 1155Standart
    public async getTokenURINFT1155(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.uri(tokenId);
    }

    //nft 1155 
    public async getRateNFT1155(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.rate(tokenId);
    }
    public async getSupplyNFT1155(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract['totalSupply(uint256)'](tokenId);
    }

    //delegation 
    public async getTokenStakesByMember(account: string): Promise<Stake[]> {
        return await this.delegation!.contract.getStakesByMember(account);
    }
    public async getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
        return await this.delegation!.contract.getStakesPageByMember(account, size, offset);
    }
    public async getFrozenStakesQueueToken() {
        return await this.delegation!.contract.getFrozenStakesQueue();
    }
    public async getFreezeTimeToken() {
        const [
			freezeTimeWithdraw,
			freezeTimeTransfer
		] = await Promise.all([
			this.delegation!.contract.getFreezeTime(FreezeType.Withdraw),
			this.delegation!.contract.getFreezeTime(FreezeType.Transfer),
		])
        return {
            "Withdraw": freezeTimeWithdraw,
            "Transfer": freezeTimeTransfer
        }
    }

    public async getStakeToken(validator: string, delegator: string, tokenAddress: string): Promise<Stake> {
        return await this.delegation!.contract.getStake(validator, delegator, tokenAddress);
    }

    public async getStakeIdToken(validator: string, delegator: string, tokenAddress: string) {
        return await this.delegation!.contract.getStakeId(validator, delegator, tokenAddress);
    }

    //delegation-nft

    public async getNFTStakesByMember(account: string): Promise<Stake[]> {
        return await this.delegationNft!.contract.getStakesByMember(account);
    }
    public async getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<Stake[]> {
        return await this.delegationNft!.contract.getStakesPageByMember(account, size, offset);
    }
    public async getFrozenStakesQueueNFT() {
        return await this.delegationNft!.contract.getFrozenStakesQueue();
    }
    public async getFreezeTimeNFT() {
        const [
			freezeTimeWithdraw,
			freezeTimeTransfer
		] = await Promise.all([
			this.delegationNft!.contract.getFreezeTime(FreezeType.Withdraw),
			this.delegationNft!.contract.getFreezeTime(FreezeType.Transfer),

		])
        return {
            "Withdraw": freezeTimeWithdraw,
            "Transfer": freezeTimeTransfer
        }
    }

    //master-validator
    public async getValidatorStatus(validator: string): Promise<ValidatorStatus> {
        const status = await this.masterValidator!.contract.getValidatorStatus(validator);
        const statusValidator: string = status.toString();
        let validatorStatus: ValidatorStatus = ValidatorStatus[statusValidator as keyof typeof ValidatorStatus]
        return validatorStatus

    }

    public async validatorIsActive(validator: string) {
        return await this.masterValidator!.contract.isActive(validator);
    }

    public async validatorIsMember(validator: string) {
        return await this.masterValidator!.contract.isMember(validator);
    }
    
    //othres
    public getDecimalContract(contractName: string, address?: boolean): string | ethers.Contract {
        switch (contractName) {
            case "contract-center":
                return address ? this.contractCenter!.contract.address : this.contractCenter!.contract
            case "token-center":
                return address ? this.tokenCenter!.contract.address : this.tokenCenter!.contract
            case "nft-center":
                return address ? this.nftCenter!.contract.address : this.nftCenter!.contract
            case "delegation":
                return address ? this.delegation!.contract.address : this.delegation!.contract
            case "delegation-nft":
                return address ? this.delegationNft!.contract.address : this.delegationNft!.contract
            case "master-validator":
                return address ? this.masterValidator!.contract.address : this.masterValidator!.contract
            case "multi-call":
                return address ? this.multiCall!.contract.address : this.multiCall!.contract
            case "multi-sig":
                return address ? this.multiSend!.contract.address : this.multiSend!.contract
            case "bridge":
                return address ? this.bridgeV2!.contract.address : this.bridgeV2!.contract
            case "checks":
                return address ? this.checks!.contract.address : this.checks!.contract
            default:
                throw new Error(`There is no such contract in the Decimal`)
        }
    }

    public async getSignPermitDRC721(
        contract: ethers.Contract,
        spender: string,
        tokenId: string | number | bigint,
    ): Promise<ethers.Signature>  {
        const deadline = ethers.constants.MaxUint256
        const typedData = {
            types: {
                Permit: [
                { name: "spender", type: "address" },
                { name: "tokenId", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
                ],
            },
            primaryType: "Permit",
            domain: {
                name: await contract.name(),
                version: "1",
                chainId: await this.provider.getNetwork().then((n) => n.chainId),
                verifyingContract: contract.target.toString(),
            },
            message: {
                spender,
                tokenId,
                nonce: await contract.nonces(tokenId),
                deadline,
            },
        };

        const signature = await this.account._signTypedData(
            typedData.domain,
            { Permit: typedData.types.Permit },
            typedData.message
        );

        return ethers.utils.splitSignature(signature);
    }

    public async getSignPermitDRC1155(
        contract: ethers.Contract,
        spender: string
    ): Promise<ethers.Signature> {
        const deadline = ethers.constants.MaxUint256
        const typedData = {
            types: {
                Permit: [
                { name: "spender", type: "address" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
                ],
            },
            primaryType: "Permit",
            domain: {
                name: await contract.name(),
                version: "1",
                chainId: await this.provider.getNetwork().then((n) => n.chainId),
                verifyingContract: contract.target.toString(),
            },
            message: {
                spender,
                nonce: await contract.nonces(this.account.address),
                deadline,
            },
        };

        const signature = await this.account._signTypedData(
            typedData.domain,
            { Permit: typedData.types.Permit },
            typedData.message
        );

        return ethers.utils.splitSignature(signature);
    }

    //bridgeV2
    public async getBridgeV2ServiceFees(toChainId: number) {
        return await this.bridgeV2!.contract.minimalServiceFees(toChainId);
    }

    //checks
    public async getChecksNonces() {
        return await this.checks!.contract.nonces();
    }

    //multisig
    public async createMultiSig(ownersData: {
        owner: string;
        weight: number;
    }[], weightThreshold: number, estimateGas?: boolean): Promise<any> {
        const encodedInitializer = this.safe!.contract.interface.encodeFunctionData("setup", [
            ownersData,
            weightThreshold,
            ethers.constants.AddressZero,
            "0x",
            ethers.constants.AddressZero,
            ethers.constants.AddressZero,
            0,
            ethers.constants.AddressZero
        ]);
        const saltNumber = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)).toString();
        if (estimateGas) {
            return await this.safeFactory!.contract.estimateGas.createProxyWithNonce(this.safe!.contract.address, encodedInitializer, saltNumber, await this.txOptions());
        }
        const template = await this.safeFactory!.contract.callStatic.createProxyWithNonce(this.safe!.contract.address, encodedInitializer, saltNumber, await this.txOptions());
        const tx = await this.safeFactory!.contract.createProxyWithNonce(this.safe!.contract.address, encodedInitializer, saltNumber, await this.txOptions()).then((tx: any) => tx.wait());
        return {tx: tx, multisigAddress: template};
    }

    public async buildMultiSigTx(txs: MetaTransaction[], safe: ethers.Contract): Promise<SafeTransaction> {
        return await buildMultiSendSafeTx(this.multiSend!.contract, txs, await safe.nonce());
    }
    public async signMultiSigTx(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature> {
        return safeSignTypedData(this.account, safeAddress, safeTx)
    }
    public async executeMultiSigTx(safeTx: SafeTransaction, signatures: SafeSignature[], safe: ethers.Contract, estimateGas?: boolean) {
        return await executeTx(safe, safeTx, signatures, estimateGas);
    }

    public async getNonceMultiSig(safe: ethers.Contract) {
        return await safe.nonce();
    }
}