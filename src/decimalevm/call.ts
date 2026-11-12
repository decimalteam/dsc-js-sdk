import { ethers, HDNodeWallet } from "ethers";
import DecimalContractEVM from "./contract";
import { Stake, NFTStake } from "./interfaces/delegation";
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
    SafeSignature,
    safeSignTypedData,
    SafeTransaction
} from "./multisig/execution";
import { buildMultiSendSafeTx } from "./multisig/multisend";

export enum TypeNFT {
    DRC721,
    DRC1155,
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
    burnable: boolean;
    refundable: boolean;
}

/** `refundable` is ignored by reserveless collections (there is no reserve) and defaults to `false`. */
export type NFTCollectionReserveless = Omit<NFTCollection, 'refundable'> & { refundable?: boolean }


export type ValidotorStake = {
    token: string,
    amount: ethers.BigNumberish;
}

export default class Call {

    private readonly network: NETWORKS;
    private readonly provider: ethers.JsonRpcProvider;
    private readonly account: HDNodeWallet;
    public contractCenter?: DecimalContractEVM;
    public tokenCenter?: DecimalContractEVM;
    public delegation?: DecimalContractEVM;
    public nftCenter?: DecimalContractEVM;
    public masterValidator?: DecimalContractEVM;
    public multiCall?: DecimalContractEVM;
    public safe?: DecimalContractEVM;
    public safeFactory?: DecimalContractEVM;
    public multiSend?: DecimalContractEVM;
    public checks?: DecimalContractEVM;
    public bridgeV2?: DecimalContractEVM;
    public gasCenter?: DecimalContractEVM;
    private bridgeV2Nonce: number = 0;
    private debug: boolean;

    public constructor(
        network: NETWORKS,
        provider: ethers.JsonRpcProvider,
        account: HDNodeWallet,
    ) {
        this.network = network
        this.provider = provider;
        this.account = account;
        this.debug = true;
    }

    public setDecimalContractEVM(decimalContractEVM: DecimalContractEVM, name: string) {
        switch(name) {
            case 'contractCenter':
                this.contractCenter = decimalContractEVM
                break;
            case 'tokenCenter':
                this.tokenCenter = decimalContractEVM
                break;
            case 'gasCenter':
                this.gasCenter = decimalContractEVM
                break;
            case 'delegation':
                this.delegation = decimalContractEVM
                break;
            case 'nftCenter':
                this.nftCenter = decimalContractEVM
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
            const gasPrice = feeData.gasPrice! + BigInt(1)
            options.gasPrice = gasPrice
        }
        return options
    }
    private parseLog(contract: ethers.Contract,  logs:any, eventName: string) {
        return logs
        .filter((log:any) => (ethers.getAddress(log.address) == ethers.getAddress((contract.target as string))))
        .map((log:any) => {
          try {
            return contract.interface.parseLog(log);
          } catch {
            return undefined;
          }
        })
        .find((event:ethers.LogDescription) => event?.name === eventName)
    }
    
    // -----------write functions----------

    //multicall
    public async multicall(value: string | number | bigint, calls: {target: string; value: string; callData: string;}[], estimateGas?: boolean) {
        if (estimateGas) {
            return await this.multiCall!.contract.aggregate.estimateGas(calls, await this.txOptions({value: value}))
        }
        if (this.debug)
            await this.multiCall!.contract.aggregate.staticCall(calls, await this.txOptions({value: value}))
        return await this.multiCall!.contract.aggregate(calls, await this.txOptions({value: value})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    //token-center
    public async createToken(token:Token, reserve: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (estimateGas) {
            return await this.tokenCenter!.contract.createToken.estimateGas(token, await this.txOptions({value: reserve}))
        }

        if (this.debug)
            await this.tokenCenter!.contract.createToken.staticCall(token, await this.txOptions({value: reserve}))
        const tx = await this.tokenCenter!.contract.createToken(token, await this.txOptions({value: reserve})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        const event = this.parseLog(this.tokenCenter!.contract, tx!.logs, 'TokenDeployed')
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
            return await this.tokenCenter!.contract.createTokenReserveless.estimateGas(
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

        if (this.debug)
            await this.tokenCenter!.contract.createTokenReserveless.staticCall(
                name,
                symbol,
                mintable,
                burnable,
                initialMint,
                cap,
                identity,
                await this.txOptions()
            )

        const tx = await this.tokenCenter!.contract.createTokenReserveless(
            name,
            symbol,
            mintable,
            burnable,
            initialMint,
            cap,
            identity,
            await this.txOptions()
        ).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        const event = this.parseLog(this.tokenCenter!.contract, tx!.logs, 'TokenReservelessDeployed')
        return {tx: tx, tokenAddress: event.args[0]};
    }

    public async convertToken(tokenIn:string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address)"].estimateGas(tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions())
            if (this.debug)
                await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address)"].staticCall(tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions())
            return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"].estimateGas(tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            if (this.debug)
                await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"].staticCall(tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.tokenCenter!.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        }
    }

     // token reserveless

     public async mintTokenReserveless(contract: ethers.Contract, amount: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.mint.estimateGas(recipient, amount, await this.txOptions())
        if (this.debug)
            await contract.mint.staticCall(recipient, amount, await this.txOptions())
        return await contract.mint(recipient, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    //token
    public async convertToDEL(owner: string, token: string, amount: string | number | bigint, estimateGas: string | number | bigint, sign: ethers.Signature, estimateGasUsage?: boolean) {
        const deadline = ethers.MaxUint256;
        if (estimateGasUsage) return await this.gasCenter!.contract.convertToDEL.estimateGas(owner, token, amount, estimateGas, deadline, sign.v, sign.r, sign.s, await this.txOptions())
        if (this.debug)
            await this.gasCenter!.contract.convertToDEL.staticCall(owner, token, amount, estimateGas, deadline, sign.v, sign.r, sign.s, await this.txOptions())
        return await this.gasCenter!.contract.convertToDEL(owner, token, amount, estimateGas, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.approve.estimateGas(spender, amount, await this.txOptions())
        if (this.debug)
            await contract.approve.staticCall(spender, amount, await this.txOptions())
        return await contract.approve(spender, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.transfer.estimateGas(to, amount)
        if (this.debug)
            await contract.transfer.staticCall(to, amount)
        return await contract.transfer(to, amount).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.transferFrom.estimateGas(from, to, amount)
        if (this.debug)
            await contract.transferFrom.staticCall(from, to, amount)
        return await contract.transferFrom(from, to, amount).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.burn.estimateGas(amount)
        if (this.debug)
            await contract.burn.staticCall(amount)
        return await contract.burn(amount).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.buyTokenForExactDEL.estimateGas(amountOutMin, recipient, await this.txOptions({value: amountDel}))
        if (this.debug)
            await contract.buyTokenForExactDEL.staticCall(amountOutMin, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyTokenForExactDEL(amountOutMin, recipient, await this.txOptions({value: amountDel})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.buyExactTokenForDEL.estimateGas(amountOut, recipient, await this.txOptions({value: amountDel}))
        if (this.debug)
            await contract.buyExactTokenForDEL.staticCall(amountOut, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyExactTokenForDEL(amountOut, recipient, await this.txOptions({value: amountDel})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.sellTokensForExactDEL.estimateGas(amountOut, amountInMax, recipient)
        if (this.debug)
            await contract.sellTokensForExactDEL.staticCall(amountOut, amountInMax, recipient)
        return await contract.sellTokensForExactDEL(amountOut, amountInMax, recipient).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.sellExactTokensForDEL.estimateGas(amountIn, amountOutMin, recipient)
        if (this.debug)
            await contract.sellExactTokensForDEL.staticCall(amountIn, amountOutMin, recipient)
        return await contract.sellExactTokensForDEL(amountIn, amountOutMin, recipient).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async updateTokenIdentity(contract: ethers.Contract, newIdentity: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.updateIdentity.estimateGas(newIdentity, await this.txOptions())
        if (this.debug)
            await contract.updateIdentity.staticCall(newIdentity, await this.txOptions())
        return await contract.updateIdentity(newIdentity, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }
    
    public async updateTokenMaxTotalSupply(contract: ethers.Contract, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.updateMaxTotalSupply.estimateGas(newMaxTotalSupply)
        if (this.debug)
            await contract.updateMaxTotalSupply.staticCall(newMaxTotalSupply)
        return await contract.updateMaxTotalSupply(newMaxTotalSupply).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async updateTokenMinTotalSupply(contract: ethers.Contract, newMinTotalSupply: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.updateMinTotalSupply.estimateGas(newMinTotalSupply)
        if (this.debug)
            await contract.updateMinTotalSupply.staticCall(newMinTotalSupply)
        return await contract.updateMinTotalSupply(newMinTotalSupply).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean) {
        const deadline = ethers.MaxUint256
        if (estimateGas) return await contract.permit.estimateGas(owner, spender, amount, deadline, sign.v, sign.r, sign.s)
        if (this.debug)
            await contract.permit.staticCall(owner, spender, amount, deadline, sign.v, sign.r, sign.s)
        return await contract.permit(owner, spender, amount, deadline, sign.v, sign.r, sign.s).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }
    
    //delegation
    public async delegateDEL(validator:string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateDEL.estimateGas(validator, await this.txOptions({value: amount}))
        if (this.debug)
            await this.delegation!.contract.delegateDEL.staticCall(validator, await this.txOptions({value: amount}))
        return await this.delegation!.contract.delegateDEL(validator, await this.txOptions({value: amount})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async delegateDELHold(validator:string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateHoldDEL.estimateGas(validator, holdTimestamp, await this.txOptions({value: amount}))
        if (this.debug)
            await this.delegation!.contract.delegateHoldDEL.staticCall(validator, holdTimestamp, await this.txOptions({value: amount}))
        return await this.delegation!.contract.delegateHoldDEL(validator, holdTimestamp, await this.txOptions({value: amount})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }
    
    public async delegateToken(validator:string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.delegation!.contract.delegate.estimateGas(validator, tokenAddress, amount, await this.txOptions())
            if (this.debug)
                await this.delegation!.contract.delegate.staticCall(validator, tokenAddress, amount, await this.txOptions())
            return await this.delegation!.contract.delegate(validator, tokenAddress, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.delegation!.contract.delegateByPermit.estimateGas(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            if (this.debug)
                await this.delegation!.contract.delegateByPermit.staticCall(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegation!.contract.delegateByPermit(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        }
    }

    public async delegateTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.delegation!.contract.delegateHold.estimateGas(validator, tokenAddress, amount, holdTimestamp, await this.txOptions())
            if (this.debug)
                await this.delegation!.contract.delegateHold.staticCall(validator, tokenAddress, amount, holdTimestamp, await this.txOptions())
            return await this.delegation!.contract.delegateHold(validator, tokenAddress, amount, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.delegation!.contract.delegateHoldByPermit.estimateGas(validator, tokenAddress, amount, holdTimestamp, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            if (this.debug)
                await this.delegation!.contract.delegateHoldByPermit.staticCall(validator, tokenAddress, amount, holdTimestamp, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegation!.contract.delegateHoldByPermit(validator, tokenAddress, amount, holdTimestamp, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        }
    }

    public async transferStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transfer.estimateGas(validator, tokenAddress, amount, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transfer.staticCall(validator, tokenAddress, amount, newValidator, await this.txOptions())
        return await this.delegation!.contract.transfer(validator, tokenAddress, amount, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferStakeTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferHold.estimateGas(validator, tokenAddress, amount, holdTimestamp, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferHold.staticCall(validator, tokenAddress, amount, holdTimestamp, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferHold(validator, tokenAddress, amount, holdTimestamp, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdraw.estimateGas(validator, tokenAddress, amount, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdraw.staticCall(validator, tokenAddress, amount, await this.txOptions())
        return await this.delegation!.contract.withdraw(validator, tokenAddress, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawStakeTokenHold(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawHold.estimateGas(validator, tokenAddress, amount, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawHold.staticCall(validator, tokenAddress, amount, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.withdrawHold(validator, tokenAddress, amount, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async stakeTokenToHold(validator:string, tokenAddress: string, amount: string | number | bigint, oldHoldTimestamp: number, newHoldTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.hold.estimateGas(validator, tokenAddress, amount, oldHoldTimestamp, newHoldTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.hold.staticCall(validator, tokenAddress, amount, oldHoldTimestamp, newHoldTimestamp, await this.txOptions())
        return await this.delegation!.contract.hold(validator, tokenAddress, amount, oldHoldTimestamp, newHoldTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async stakeTokenResetHold(validator:string, delegator: string, tokenAddress: string, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.resetHold.estimateGas(validator, delegator, tokenAddress, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.resetHold.staticCall(validator, delegator, tokenAddress, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.resetHold(validator, delegator, tokenAddress, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawTokenWithReset(validator:string, tokenAddress: string, amount: string | number | bigint, holdTimestampsToReset: number[], estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawWithReset.estimateGas(validator, tokenAddress, amount, holdTimestampsToReset, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawWithReset.staticCall(validator, tokenAddress, amount, holdTimestampsToReset, await this.txOptions())
        return await this.delegation!.contract.withdrawWithReset(validator, tokenAddress, amount, holdTimestampsToReset, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferTokenWithReset(oldValidator:string, tokenAddress: string, amount: string | number | bigint, newValidator:string, holdTimestampsToReset: number[], estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferWithReset.estimateGas(oldValidator, tokenAddress, amount, newValidator, holdTimestampsToReset, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferWithReset.staticCall(oldValidator, tokenAddress, amount, newValidator, holdTimestampsToReset, await this.txOptions())
        return await this.delegation!.contract.transferWithReset(oldValidator, tokenAddress, amount, newValidator, holdTimestampsToReset, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async holdTokenWithReset(validator:string, tokenAddress: string, amount: string | number | bigint, newHoldTimestamp: number, holdTimestampsToReset: number[], estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.holdWithReset.estimateGas(validator, tokenAddress, amount, newHoldTimestamp, holdTimestampsToReset, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.holdWithReset.staticCall(validator, tokenAddress, amount, newHoldTimestamp, holdTimestampsToReset, await this.txOptions())
        return await this.delegation!.contract.holdWithReset(validator, tokenAddress, amount, newHoldTimestamp, holdTimestampsToReset, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async completeStakeToken(indexes:string[] | number[], estimateGas?: boolean): Promise<any> {
        try {
            if (estimateGas) {
                return await this.delegation!.contract.complete.estimateGas(indexes, await this.txOptions())
            }
            if (this.debug)
                await this.delegation!.contract.complete.staticCall(indexes, await this.txOptions())
            const tx = await this.delegation!.contract.complete(indexes, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
            return {tx: tx, error: null}
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name}
            }
            throw err
        }
    }

    // NFT delegation via main delegation contract (DRC721)
    public async delegateNFT(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateNFT.estimateGas(validator, nftContract, tokenId, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.delegateNFT.staticCall(validator, nftContract, tokenId, await this.txOptions())
        return await this.delegation!.contract.delegateNFT(validator, nftContract, tokenId, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async delegateNFTHold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateNFTHold.estimateGas(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.delegateNFTHold.staticCall(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.delegateNFTHold(validator, nftContract, tokenId, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async delegateNFTByPermit(validator: string, nftContract: string, tokenId: bigint, sign: ethers.Signature, estimateGas?: boolean) {
        const deadline = ethers.MaxUint256
        if (estimateGas) return await this.delegation!.contract.delegateNFTByPermit.estimateGas(validator, nftContract, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.delegateNFTByPermit.staticCall(validator, nftContract, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions())
        return await this.delegation!.contract.delegateNFTByPermit(validator, nftContract, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawNFT(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawNFT.estimateGas(validator, nftContract, tokenId, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawNFT.staticCall(validator, nftContract, tokenId, await this.txOptions())
        return await this.delegation!.contract.withdrawNFT(validator, nftContract, tokenId, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawNFTHold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawNFTHold.estimateGas(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawNFTHold.staticCall(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.withdrawNFTHold(validator, nftContract, tokenId, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferNFTStake(oldValidator: string, nftContract: string, tokenId: bigint, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferNFT.estimateGas(oldValidator, nftContract, tokenId, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferNFT.staticCall(oldValidator, nftContract, tokenId, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferNFT(oldValidator, nftContract, tokenId, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferNFTStakeHold(oldValidator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferNFTHold.estimateGas(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferNFTHold.staticCall(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferNFTHold(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    // NFT delegation via main delegation contract (DRC1155)
    public async delegateNFT1155(validator: string, nftContract: string, tokenId: bigint, amount: bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateNFT1155.estimateGas(validator, nftContract, tokenId, amount, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.delegateNFT1155.staticCall(validator, nftContract, tokenId, amount, await this.txOptions())
        return await this.delegation!.contract.delegateNFT1155(validator, nftContract, tokenId, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async delegateNFT1155Hold(validator: string, nftContract: string, tokenId: bigint, amount: bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.delegateNFT1155Hold.estimateGas(validator, nftContract, tokenId, amount, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.delegateNFT1155Hold.staticCall(validator, nftContract, tokenId, amount, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.delegateNFT1155Hold(validator, nftContract, tokenId, amount, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawNFT1155(validator: string, nftContract: string, tokenId: bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawNFT1155.estimateGas(validator, nftContract, tokenId, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawNFT1155.staticCall(validator, nftContract, tokenId, await this.txOptions())
        return await this.delegation!.contract.withdrawNFT1155(validator, nftContract, tokenId, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async withdrawNFT1155Hold(validator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.withdrawNFT1155Hold.estimateGas(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.withdrawNFT1155Hold.staticCall(validator, nftContract, tokenId, holdTimestamp, await this.txOptions())
        return await this.delegation!.contract.withdrawNFT1155Hold(validator, nftContract, tokenId, holdTimestamp, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferNFT1155Stake(oldValidator: string, nftContract: string, tokenId: bigint, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferNFT1155.estimateGas(oldValidator, nftContract, tokenId, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferNFT1155.staticCall(oldValidator, nftContract, tokenId, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferNFT1155(oldValidator, nftContract, tokenId, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferNFT1155StakeHold(oldValidator: string, nftContract: string, tokenId: bigint, holdTimestamp: number, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation!.contract.transferNFT1155Hold.estimateGas(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions())
        if (this.debug)
            await this.delegation!.contract.transferNFT1155Hold.staticCall(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions())
        return await this.delegation!.contract.transferNFT1155Hold(oldValidator, nftContract, tokenId, holdTimestamp, newValidator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
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
        const meta = {
            creator: nft.creator,
            symbol: nft.symbol,
            name: nft.name,
            contractURI: nft.contractURI,
            refundable: nft.refundable ?? false,
            burnable: nft.burnable,
        }
        if (estimateGas) {
            return await this.nftCenter!.contract[collection].estimateGas(meta, await this.txOptions())
        }
        if (this.debug)
            await this.nftCenter!.contract[collection].staticCall(meta, await this.txOptions())
        const tx = await this.nftCenter!.contract[collection](meta, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        const event = this.parseLog(this.nftCenter!.contract, tx!.logs, 'NFTCreated')
        return {tx: tx, nftCollectionAddress: event.args[0]};
    }
    

    //nft 721 && 1155
    public async setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean) {
        if (estimateGas) return await contract.setApprovalForAll.estimateGas(to, approved, await this.txOptions())
        if (this.debug)
            await contract.setApprovalForAll.staticCall(to, approved, await this.txOptions())
        return await contract.setApprovalForAll(to, approved, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.safeTransferFrom.estimateGas(from, to, tokenId, amount, "0x", await this.txOptions())
            if (this.debug)
                await contract.safeTransferFrom.staticCall(from, to, tokenId, amount, "0x", await this.txOptions())
            return await contract.safeTransferFrom(from, to, tokenId, amount, "0x", await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            if (estimateGas) return await contract["safeTransferFrom(address,address,uint256,bytes)"].estimateGas(from, to, tokenId, "0x", await this.txOptions())
            if (this.debug)
                await contract["safeTransferFrom(address,address,uint256,bytes)"].staticCall(from, to, tokenId, "0x", await this.txOptions())
            return await contract["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, "0x", await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        }
    }

    public async disableMintNFT(contract: ethers.Contract, estimateGas?: boolean) {
        if (estimateGas) return await contract.disableMint.estimateGas(await this.txOptions())
        if (this.debug)
            await contract.disableMint.staticCall(await this.txOptions())
        return await contract.disableMint(await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.burn.estimateGas(tokenId, amount, await this.txOptions())
            if (this.debug)
                await contract.burn.staticCall(tokenId, amount, await this.txOptions())
            return await contract.burn(tokenId, amount, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            if (estimateGas) return await contract.burn.estimateGas(tokenId, await this.txOptions())
            return await contract.burn(tokenId, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        }
    }


    //nft 721 && 1155
    public async mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                return await contract.mintByDEL.estimateGas(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve}))
            }
            if (this.debug)
                await contract.mintByDEL.staticCall(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve}))
            const tx = await contract.mintByDEL(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve})).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //1155
            return {tx: tx, tokenId: tokenId};
        } else {
            if (estimateGas) {
                return await contract.mintByDEL.estimateGas(to, tokenURI, await this.txOptions({ value: reserve}))
            }
            if (this.debug)
                await contract.mintByDEL.staticCall(to, tokenURI, await this.txOptions({ value: reserve}))
            const tx = await contract.mintByDEL(to, tokenURI, await this.txOptions({ value: reserve})).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721
            const event = this.parseLog(contract, tx!.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2]};
        }
    }

    public async mintReserveless(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                return await contract.mint.estimateGas(to, tokenId, amount, tokenURI, '0', ethers.ZeroAddress, await this.txOptions())
            }
            if (this.debug)
                await contract.mint.staticCall(to, tokenId, amount, tokenURI, '0', ethers.ZeroAddress, await this.txOptions())
            const tx = await contract.mint(to, tokenId, amount, tokenURI, '0', ethers.ZeroAddress, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //1155 approve
            return {tx: tx, tokenId: tokenId};
        } else {
            if (estimateGas) {
                return await contract.mint.estimateGas(to, tokenURI, '0', ethers.ZeroAddress, await this.txOptions())
            }
            if (this.debug)
                await contract.mint.staticCall(to, tokenURI, '0', ethers.ZeroAddress, await this.txOptions())
            const tx = await contract.mint(to, tokenURI, '0', ethers.ZeroAddress, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721 approve
            const event = this.parseLog(contract, tx!.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2]};

        }
    }

    public async mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean): Promise<any> {
        if (tokenId !== undefined && amount !== undefined) {
            if (sign != undefined) {
                const deadline = ethers.MaxUint256
                if (estimateGas) {
                    return await contract.mintByPermit.estimateGas(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                }
                if (this.debug)
                    await contract.mintByPermit.staticCall(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                const tx = await contract.mintByPermit(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //1155 permit
                return {tx: tx, tokenId: tokenId};
            } else {
                if (estimateGas) {
                    return await contract.mint.estimateGas(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                }
                if (this.debug)
                    await contract.mint.staticCall(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                const tx = await contract.mint(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //1155 approve
                return {tx: tx, tokenId: tokenId};
            }
        } else {
            if (sign != undefined) {
                const deadline = ethers.MaxUint256
                if (estimateGas) {
                    return await contract.mintByPermit.estimateGas(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                }
                if (this.debug)
                    await contract.mintByPermit.staticCall(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                const tx = await contract.mintByPermit(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721 permit
                const event = this.parseLog(contract, tx!.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2]};
            } else {
                if (estimateGas) {
                    return await contract.mint.estimateGas(to, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                }
                if (this.debug)
                    await contract.mint.staticCall(to, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                const tx = await contract.mint(to, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721 approve
                const event = this.parseLog(contract, tx!.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2]};
            }

        }
    }
    public async addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.addReserveByDEL.estimateGas(tokenId, await this.txOptions({ value: amountReserve}))
        if (this.debug)
            await contract.addReserveByDEL.staticCall(tokenId, await this.txOptions({ value: amountReserve}))
        return await contract.addReserveByDEL(tokenId, await this.txOptions({ value: amountReserve})).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721, 1155
    }

    public async addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await contract.addReserve.estimateGas(tokenId, amountReserve, await this.txOptions())
            if (this.debug)
                await contract.addReserve.staticCall(tokenId, amountReserve, await this.txOptions())
            return await contract.addReserve(tokenId, amountReserve, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721, 1155 (for approve)
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await contract.addReserveByPermit.estimateGas(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            if (this.debug)
                await contract.addReserveByPermit.staticCall(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await contract.addReserveByPermit(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait()); //721, 1155 (for permit)
        }
    }

    //nft 721
    public async approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.approve.estimateGas(to, tokenId, await this.txOptions())
        if (this.debug)
            await contract.approve.staticCall(to, tokenId, await this.txOptions())
        return await contract.approve(to, tokenId, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    //nft 
    public async transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean) {
        if (estimateGas) return await contract.safeBatchTransferFrom.estimateGas(from, to, tokenIds, amounts, "0x", await this.txOptions())
        if (this.debug)
            await contract.safeBatchTransferFrom.staticCall(from, to, tokenIds, amounts, "0x", await this.txOptions())
        return await contract.safeBatchTransferFrom(from, to, tokenIds, amounts, "0x", await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    //nft 1155
    

    //master-validator
    public async addValidatorWithToken(validator: string, meta: string, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.masterValidator!.contract.addCandidate.estimateGas(validator, meta, stake, await this.txOptions())
            if (this.debug)
                await this.masterValidator!.contract.addCandidate.staticCall(validator, meta, stake, await this.txOptions())
            return await this.masterValidator!.contract.addCandidate(validator, meta, stake, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        } else {
            //TODO
            throw Error('TODO')
        }
    }

    public async addValidatorWithETH(validator: string, meta: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.addCandidateDEL.estimateGas(validator, meta, await this.txOptions({value: amount}))
        if (this.debug)
            await this.masterValidator!.contract.addCandidateDEL.staticCall(validator, meta, await this.txOptions({value: amount}))
        return await this.masterValidator!.contract.addCandidateDEL(validator, meta, await this.txOptions({value: amount})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async removeValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.removeValidator.estimateGas(validator, await this.txOptions())
        if (this.debug)
            await this.masterValidator!.contract.removeValidator.staticCall(validator, await this.txOptions())
        return await this.masterValidator!.contract.removeValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async pauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.pauseValidator.estimateGas(validator, await this.txOptions())
        if (this.debug)
            await this.masterValidator!.contract.pauseValidator.staticCall(validator, await this.txOptions())
        return await this.masterValidator!.contract.pauseValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async unpauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.unpauseValidator.estimateGas(validator, await this.txOptions())
        if (this.debug)
            await this.masterValidator!.contract.unpauseValidator.staticCall(validator, await this.txOptions())
        return await this.masterValidator!.contract.unpauseValidator(validator, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    public async updateValidatorMeta(validator: string, meta: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator!.contract.updateValidatorMeta.estimateGas(validator, meta, await this.txOptions())
        if (this.debug)
            await this.masterValidator!.contract.updateValidatorMeta.staticCall(validator, meta, await this.txOptions())
        return await this.masterValidator!.contract.updateValidatorMeta(validator, meta, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }

    //bridgeV2
    public async wrapAndTransferETH(contract: ethers.Contract, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
        const addressToBytes32 = "0x" + to.slice(2).padStart(64, "0")
        const value = BigInt(amount) + BigInt(serviceFee)
        if (estimateGas) {
            return await contract.wrapAndTransferETH.estimateGas(addressToBytes32, toChainId, this.bridgeV2Nonce, serviceFee, await this.txOptions({value: value}))
        }
        if (this.debug)
            await contract.wrapAndTransferETH.staticCall(addressToBytes32, toChainId, this.bridgeV2Nonce, serviceFee, await this.txOptions({value: value}))
        const tx = await contract.wrapAndTransferETH(addressToBytes32, toChainId, this.bridgeV2Nonce, serviceFee, await this.txOptions({value: value})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        this.bridgeV2Nonce += 1;
        return tx;
    }

    public async transferTokens(contract: ethers.Contract, tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
        const addressToBytes32 = "0x" + to.slice(2).padStart(64, "0")
        if (estimateGas) {
            return await contract.transferTokens.estimateGas(tokenAddress, addressToBytes32, amount, toChainId, this.bridgeV2Nonce, await this.txOptions({value: serviceFee}))
        }
        if (this.debug)
            await contract.transferTokens.staticCall(tokenAddress, addressToBytes32, amount, toChainId, this.bridgeV2Nonce, await this.txOptions({value: serviceFee}))
        const tx = await contract.transferTokens(tokenAddress, addressToBytes32, amount, toChainId, this.bridgeV2Nonce, await this.txOptions({value: serviceFee})).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        this.bridgeV2Nonce += 1;
        return tx;
    }

    public async completeTransfer(contract: ethers.Contract, encodedVM: string, unwrapWETH: boolean, estimateGas?: boolean) {
        if (estimateGas) {
            return await contract.completeTransfer.estimateGas(encodedVM, unwrapWETH, await this.txOptions())
        }
        if (this.debug)
            await contract.completeTransfer.staticCall(encodedVM, unwrapWETH, await this.txOptions())
        return await contract.completeTransfer(encodedVM, unwrapWETH, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
    }   

    //checks
    public async createChecksDEL(signers: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean): Promise<any> {
        const nonce = await this.checks!.contract.nonces();

        const value = BigInt(signers.length) * BigInt(amount)
        if (estimateGas) {
            return await this.checks!.contract.createChecksDEL.estimateGas(signers, amount, dueBlock, nonce, await this.txOptions({ value: value }))
        }
        const checks = await this.checks!.contract.createChecksDEL.staticCall(signers, amount, dueBlock, nonce, await this.txOptions({ value: value }))
        const tx = await this.checks!.contract.createChecksDEL(signers, amount, dueBlock, nonce, await this.txOptions({ value: value })).then((tx: ethers.ContractTransactionResponse) => tx.wait());
        return { tx: tx, checks: checks };
    }

    public async createChecksToken(signers: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean): Promise<any> {
        const nonce = await this.checks!.contract.nonces();

        if (sign == undefined) {
            if (estimateGas) {
                return await this.checks!.contract.createChecksToken.estimateGas(signers, amount, dueBlock, nonce, tokenAddress, await this.txOptions())
            }
            const checks = await this.checks!.contract.createChecksToken.staticCall(signers, amount, dueBlock, nonce, tokenAddress, await this.txOptions())
            const tx = await this.checks!.contract.createChecksToken(signers, amount, dueBlock, nonce, tokenAddress, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
            return {tx: tx, checks: checks};
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) {
                return await this.checks!.contract.createChecksTokenByPermit.estimateGas(signers, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            }
            const checks = await this.checks!.contract.createChecksTokenByPermit.staticCall(signers, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            const tx = await this.checks!.contract.createChecksTokenByPermit(signers, amount, dueBlock, nonce, tokenAddress, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then((tx: ethers.ContractTransactionResponse) => tx.wait());
            return {tx: tx, checks: checks};
        }
    }

    public async redeemChecks(signatures: string[], checks: string[], callStatic?: boolean, estimateGas?: boolean) {
        if (callStatic) {
            try {
                await this.checks!.contract.redeemChecks.staticCall(signatures, checks);
                return null;
            } catch (err: any) {
                if (err?.revert?.name != null) {
                    return err.revert.name
                }
                throw err
            }
        }
        if (estimateGas) {
            return await this.checks!.contract.redeemChecks.estimateGas(signatures, checks);
        }
        return await this.checks!.contract.redeemChecks(signatures, checks).then((tx: ethers.ContractTransactionResponse) => tx.wait());
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
        const deadline = ethers.MaxUint256
        const nonce = await contract.nonces(this.account.address)
        const permitHash = await contract.permitHash(
            this.account.address,
            spender,
            amount,
            nonce,
            deadline
        )
        const signingKey = new ethers.SigningKey(this.account.privateKey)
        const sign = signingKey.sign(permitHash)
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
        const { active, nftType } = await this.nftCenter!.contract.getNFTState(address)
        if (!active) throw new Error("The nft does not exist")
        const typeNFT = Number(nftType)
        if (TypeNFT[typeNFT] === undefined) throw new Error(`Unknown nft type ${nftType}`)
        return typeNFT as TypeNFT
    }

    //nft 721 && 1155
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

    //nft 
    public async getApprovedNFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.getApproved(tokenId);
    }

    public async ownerOfNFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.ownerOf(tokenId);
    }

    public async getTokenURINFT721(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.tokenURI(tokenId);
    }

    //nft 
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

    // NFT stake view methods (main delegation contract)
    public async getNFTStakeFromDelegation(
        nftContract: string,
        tokenId: bigint,
        delegator: string,
        validator: string,
        holdTimestamp: number
    ): Promise<NFTStake> {
        return await this.delegation!.contract.getNFTStake(nftContract, tokenId, delegator, validator, holdTimestamp);
    }

    public async getNFTStakeIdFromDelegation(
        nftContract: string,
        tokenId: bigint,
        delegator: string,
        validator: string,
        holdTimestamp: number
    ): Promise<string> {
        return await this.delegation!.contract.getNFTStakeId(nftContract, tokenId, delegator, validator, holdTimestamp);
    }

    public async getAvailableCoinAmount(
        validator: string,
        delegator: string,
        token: string,
        holdTimestamp: number
    ): Promise<bigint> {
        return await this.delegation!.contract.getAvailableCoinAmount(validator, delegator, token, holdTimestamp);
    }

    public async getNFTBackedAmount(
        validator: string,
        delegator: string,
        token: string,
        holdTimestamp: number
    ): Promise<bigint> {
        return await this.delegation!.contract.getNFTBackedAmount(validator, delegator, token, holdTimestamp);
    }

    //master-validator
    public async getValidatorStatus(validator: string): Promise<ValidatorStatus> {
        const status = await this.masterValidator!.contract.getValidatorStatus(validator);
        const statusValidator: string = status.toString();
        const validatorStatus: ValidatorStatus = ValidatorStatus[statusValidator as keyof typeof ValidatorStatus]
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
                return address ? this.contractCenter!.address : this.contractCenter!.contract
            case "token-center":
                return address ? this.tokenCenter!.address : this.tokenCenter!.contract
            case "nft-center":
                return address ? this.nftCenter!.address : this.nftCenter!.contract
            case "delegation":
                return address ? this.delegation!.address : this.delegation!.contract
            case "master-validator":
                return address ? this.masterValidator!.address : this.masterValidator!.contract
            case "multi-call":
                return address ? this.multiCall!.address : this.multiCall!.contract
            case "multi-sig":
                return address ? this.multiSend!.address : this.multiSend!.contract
            case "bridge":
                return address ? this.bridgeV2!.address : this.bridgeV2!.contract
            case "checks":
                return address ? this.checks!.address : this.checks!.contract
            default:
                throw new Error(`There is no such contract in the Decimal`)
        }
    }

    public async getSignPermitDRC721(
        contract: ethers.Contract,
        spender: string,
        tokenId: string | number | bigint,
    ): Promise<ethers.Signature>  {
        const deadline = ethers.MaxUint256
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
                verifyingContract: (contract.target as string).toString(),
            },
            message: {
                spender,
                tokenId,
                nonce: await contract.nonces(tokenId),
                deadline,
            },
        };

        const signature = await this.account.signTypedData(
            typedData.domain,
            { Permit: typedData.types.Permit },
            typedData.message
        );

        return ethers.Signature.from(signature);
    }

    public async getSignPermitDRC1155(
        contract: ethers.Contract,
        spender: string
    ): Promise<ethers.Signature> {
        const deadline = ethers.MaxUint256
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
                verifyingContract: (contract.target as string).toString(),
            },
            message: {
                spender,
                nonce: await contract.nonces(this.account.address),
                deadline,
            },
        };

        const signature = await this.account.signTypedData(
            typedData.domain,
            { Permit: typedData.types.Permit },
            typedData.message
        );

        return ethers.Signature.from(signature);
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
    }[], weightThreshold: number, estimateGas?: boolean, fallbackHandler?: string): Promise<any> {
        const encodedInitializer = this.safe!.contract.interface.encodeFunctionData("setup", [
            ownersData,
            weightThreshold,
            ethers.ZeroAddress,
            "0x",
            fallbackHandler || ethers.ZeroAddress,
            ethers.ZeroAddress,
            0,
            ethers.ZeroAddress
        ]);
        const saltNumber = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1)).toString();
        if (estimateGas) {
            return await this.safeFactory!.contract.createProxyWithNonce.estimateGas(this.safe!.address, encodedInitializer, saltNumber, await this.txOptions());
        }
        const template = await this.safeFactory!.contract.createProxyWithNonce.staticCall(this.safe!.address, encodedInitializer, saltNumber, await this.txOptions());
        const tx = await this.safeFactory!.contract.createProxyWithNonce(this.safe!.address, encodedInitializer, saltNumber, await this.txOptions()).then((tx: any) => tx.wait());
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