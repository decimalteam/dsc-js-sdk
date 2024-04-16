import {ethers, HDNodeWallet} from "ethers";
import DecimalContractEVM from "./contract";
import { Stake } from "./interfaces/delegation";
import { ValidatorStatus } from "./interfaces/validator";
import {
    NETWORKS,
} from "../endpoints";

export enum TypeNFT {
    ERC721,
    ERC1155,
    //ERC721Standart,
    //ERC1155Standart,
}

export enum FreezeType {
    Unknown,
    Withdraw,
    Transfer,
    Completed
}

export type Token = {
    tokenOwner: string;
    symbol: string;
    name: string;
    crr: string | number | bigint;
    initialMint: ethers.BigNumberish;
    minTotalSupply: ethers.BigNumberish;
    maxTotalSupply: ethers.BigNumberish;
    identity: string;
}

export type NFTCollection = {
    tokenOwner: string;
    symbol: string;
    name: string;
    contractURI: string;
    baseURI: string;
    refundable: boolean;
    allowMint: boolean;
}

export default class Call {

    private readonly network: NETWORKS;
    private readonly provider: ethers.JsonRpcProvider;
    private readonly account: HDNodeWallet;
    private readonly contractCenter: DecimalContractEVM;
    private readonly tokenCenter: DecimalContractEVM;
    private readonly delegation: DecimalContractEVM;
    private readonly nftCenter: DecimalContractEVM;
    private readonly delegationNft: DecimalContractEVM;
    private readonly masterValidator: DecimalContractEVM;

    public constructor(
        network: NETWORKS,
        provider: ethers.JsonRpcProvider,
        account: HDNodeWallet,
        contractCenter: DecimalContractEVM,
        tokenCenter: DecimalContractEVM,
        delegation: DecimalContractEVM,
        nftCenter: DecimalContractEVM,
        delegationNft: DecimalContractEVM,
        masterValidator: DecimalContractEVM,
    ) {
        this.network = network
        this.provider = provider;
        this.account = account;
        this.contractCenter = contractCenter;
        this.tokenCenter = tokenCenter;
        this.delegation = delegation;
        this.nftCenter = nftCenter;
        this.delegationNft = delegationNft;
        this.masterValidator = masterValidator;
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
        .filter((log:any) => (ethers.getAddress(log.address) == ethers.getAddress(contract.target.toString())))
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

    //token-center
    public async createToken(token:Token, reserve: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) {
            const gas = await this.tokenCenter.contract.createToken.estimateGas(token, await this.txOptions({value: reserve}))
            return {tx: null, tokenAddress: null, estimateGas: gas};
        }

        const tx = await this.tokenCenter.contract.createToken(token, await this.txOptions({value: reserve})).then(tx => tx.wait());
        const event = this.parseLog(this.tokenCenter.contract, tx.logs, 'TokenDeployed')
        return {tx: tx, tokenAddress: event.args[0], estimateGas: null};
    }

    public async convertToken(tokenIn:string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.tokenCenter.contract["convert(address,address,uint256,uint256,address)"].estimateGas(tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions())
            return await this.tokenCenter.contract["convert(address,address,uint256,uint256,address)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, await this.txOptions()).then(tx => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.tokenCenter.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"].estimateGas(tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.tokenCenter.contract["convert(address,address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)"](tokenIn, tokenOut, amountIn, amountOutMin, recipient, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait());
        }
    }

    //token
    public async approveToken(contract: ethers.Contract, spender: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.approve.estimateGas(spender, amount, await this.txOptions())
        return await contract.approve(spender, amount, await this.txOptions()).then(tx => tx.wait());
    }

    public async transferToken(contract: ethers.Contract, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.transfer.estimateGas(to, amount)
        return await contract.transfer(to, amount).then(tx => tx.wait());
    }

    public async transferFromToken(contract: ethers.Contract, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.transferFrom.estimateGas(from, to, amount)
        return await contract.transferFrom(from, to, amount).then(tx => tx.wait());
    }

    public async burnToken(contract: ethers.Contract, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.burn.estimateGas(amount)
        return await contract.burn(amount).then(tx => tx.wait());
    }

    public async buyTokenForExactDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.buyTokenForExactDEL.estimateGas(amountOutMin, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyTokenForExactDEL(amountOutMin, recipient, await this.txOptions({value: amountDel})).then(tx => tx.wait());
    }

    public async buyExactTokenForDEL(contract: ethers.Contract, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.buyExactTokenForDEL.estimateGas(amountOut, recipient, await this.txOptions({value: amountDel}))
        return await contract.buyExactTokenForDEL(amountOut, recipient, await this.txOptions({value: amountDel})).then(tx => tx.wait());
    }

    public async sellTokensForExactDEL(contract: ethers.Contract, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.sellTokensForExactDEL.estimateGas(amountOut, amountInMax, recipient)
        return await contract.sellTokensForExactDEL(amountOut, amountInMax, recipient).then(tx => tx.wait());
    }

    public async sellExactTokensForDEL(contract: ethers.Contract, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.sellExactTokensForDEL.estimateGas(amountIn, amountOutMin, recipient)
        return await contract.sellExactTokensForDEL(amountIn, amountOutMin, recipient).then(tx => tx.wait());
    }

    public async updateDetailsToken(contract: ethers.Contract, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.updateDetails.estimateGas(newIdentity, newMaxTotalSupply)
        return await contract.updateDetails(newIdentity, newMaxTotalSupply).then(tx => tx.wait());
    }

    public async permitToken(contract: ethers.Contract, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean) {
        const deadline = ethers.MaxUint256
        if (estimateGas) return await contract.permit.estimateGas(owner, spender, amount, deadline, sign.v, sign.r, sign.s)
        return await contract.permit(owner, spender, amount, deadline, sign.v, sign.r, sign.s).then(tx => tx.wait());
    }
    
    //delegation
    public async delegateDEL(validator:string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation.contract.delegateETH.estimateGas(validator, await this.txOptions({value: amount}))
        return await this.delegation.contract.delegateETH(validator, await this.txOptions({value: amount})).then(tx => tx.wait());
    }
    
    public async delegateToken(validator:string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await this.delegation.contract.delegate.estimateGas(validator, tokenAddress, amount, await this.txOptions())
            return await this.delegation.contract.delegate(validator, tokenAddress, amount, await this.txOptions()).then(tx => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.delegation.contract.delegateByPermit.estimateGas(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegation.contract.delegateByPermit(validator, tokenAddress, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait());
        }
    }

    public async transferStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation.contract.transfer.estimateGas(validator, tokenAddress, amount, newValidator, await this.txOptions())
        return await this.delegation.contract.transfer(validator, tokenAddress, amount, newValidator, await this.txOptions()).then(tx => tx.wait());
    }

    public async withdrawStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await this.delegation.contract.withdraw.estimateGas(validator, tokenAddress, amount, await this.txOptions())
        return await this.delegation.contract.withdraw(validator, tokenAddress, amount, await this.txOptions()).then(tx => tx.wait());
    }
    public async applyPenaltyToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
        try {
            await this.delegation.contract.applyPenaltyToStake.staticCall(validator, delegator, tokenAddress, await this.txOptions())
            if (estimateGas) {
                const gas = await this.delegation.contract.applyPenaltyToStake.estimateGas(validator, delegator, tokenAddress, await this.txOptions())
                return {tx: null, error: null, estimateGas: gas} 
            }
            const tx = await this.delegation.contract.applyPenaltyToStake(validator, delegator, tokenAddress, await this.txOptions()).then(tx => tx.wait());
            return {tx: tx, error: null, estimateGas: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name, estimateGas: null} 
            }
            throw new Error(err)
        }
    }

    public async applyPenaltiesToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
        try {
            await this.delegation.contract.applyPenaltiesToStake.staticCall(validator, delegator, tokenAddress, await this.txOptions())
            if (estimateGas) {
                const gas = await this.delegation.contract.applyPenaltiesToStake.estimateGas(validator, delegator, tokenAddress, await this.txOptions())
                return {tx: null, error: null, estimateGas: gas} 
            }
            const tx = await this.delegation.contract.applyPenaltiesToStake(validator, delegator, tokenAddress, await this.txOptions()).then(tx => tx.wait());
            return {tx: tx, error: null, estimateGas: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name, estimateGas: null} 
            }
            throw new Error(err)
        }
    }

    public async completeStakeToken(index:string| number, estimateGas?: boolean) {
        try {
            await this.delegation.contract.completeStake.staticCall(index, await this.txOptions())
            if (estimateGas) {
                const gas = await this.delegation.contract.completeStake.estimateGas(index, await this.txOptions())
                return {tx: null, error: null, estimateGas: gas} 
            }
            const tx = await this.delegation.contract.completeStake(index, await this.txOptions()).then(tx => tx.wait());
            return {tx: tx, error: null, estimateGas: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name, estimateGas: null} 
            }
            throw new Error(err)
        }
    }

    //nft-center
    public async createCollection(nft:NFTCollection, typeNFT: TypeNFT, estimateGas?: boolean) {
        let collection: string;
        switch (typeNFT) {
            //case TypeNFT.ERC721Standart:
            //    collection = 'createERC721Standart';
            //    break;
            //case TypeNFT.ERC1155Standart:
            //    collection = 'createERC1155Standart';
            //    break;
            case TypeNFT.ERC721:
                collection = 'createERC721';
                break;
            case TypeNFT.ERC1155:
                collection = 'createERC1155';
                break;
        }
        if (estimateGas) {
            const gas = await this.nftCenter.contract[collection].estimateGas(nft, await this.txOptions())
            return {tx: null, nftCollectionAddress: null, estimateGas: gas};
        }
        const tx = await this.nftCenter.contract[collection](nft, await this.txOptions()).then(tx => tx.wait());
        const event = this.parseLog(this.nftCenter.contract, tx.logs, 'NFTCreated')
        return {tx: tx, nftCollectionAddress: event.args[0], estimateGas: null};
    }
    

    //nft 721Standart && 1155Standart && 721 && 1155
    public async setApprovalForAllNFT(contract: ethers.Contract, to: string, approved: boolean, estimateGas?: boolean) {
        if (estimateGas) return await contract.setApprovalForAll.estimateGas(to, approved, await this.txOptions())
        return await contract.setApprovalForAll(to, approved, await this.txOptions()).then(tx => tx.wait());
    }

    public async transferNFT(contract: ethers.Contract, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.safeTransferFrom.estimateGas(from, to, tokenId, amount, "0x", await this.txOptions())
            return await contract.safeTransferFrom(from, to, tokenId, amount, "0x", await this.txOptions()).then(tx => tx.wait()); //1155, 1155Standart
        } else {
            if (estimateGas) return await contract["safeTransferFrom(address,address,uint256,bytes)"].estimateGas(from, to, tokenId, "0x", await this.txOptions())
            return await contract["safeTransferFrom(address,address,uint256,bytes)"](from, to, tokenId, "0x", await this.txOptions()).then(tx => tx.wait()); //721, 721Standart
        }
    }

    public async disableMintNFT(contract: ethers.Contract, estimateGas?: boolean) {
        if (estimateGas) return await contract.disableMint.estimateGas(await this.txOptions())
        return await contract.disableMint(await this.txOptions()).then(tx => tx.wait());
    }

    public async burnNFT(contract: ethers.Contract, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount !== undefined) {
            if (estimateGas) return await contract.burn.estimateGas(tokenId, amount, await this.txOptions())
            return await contract.burn(tokenId, amount, await this.txOptions()).then(tx => tx.wait()); //1155, 1155Standart
        } else {
            if (estimateGas) return await contract.burn.estimateGas(tokenId, await this.txOptions())
            return await contract.burn(tokenId, await this.txOptions()).then(tx => tx.wait()); //721, 721Standart
        }
    }

    public async setBaseURINFT(contract: ethers.Contract, baseURI: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.setBaseURI.estimateGas(baseURI)
        return await contract.setBaseURI(baseURI).then(tx => tx.wait());
    }

    public async setTokenURINFT(contract: ethers.Contract, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean) {
        if (estimateGas) return await contract.setTokenURI(tokenId, tokenURI, await this.txOptions()) 
        return await contract.setTokenURI(tokenId, tokenURI, await this.txOptions()).then(tx => tx.wait());
    }

    //nft 721Standart && 1155Standart
    public async mintNFT(contract: ethers.Contract, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                const gas = await contract.mint.estimateGas(to, tokenId, amount, tokenURI, await this.txOptions())
                return {tx: null, tokenId: null, estimateGas: gas};
            }
            const tx = await contract.mint(to, tokenId, amount, tokenURI, await this.txOptions()).then(tx => tx.wait()); //1155Standart
            return {tx: tx, tokenId: tokenId, estimateGas: null};
        } else {
            if (estimateGas) {
                const gas = await contract.mint.estimateGas(to, tokenURI, await this.txOptions())
                return {tx: null, tokenId: null, estimateGas: gas};
            }
            const tx = await contract.mint(to, tokenURI, await this.txOptions()).then(tx => tx.wait()); //721Standart
            const event = this.parseLog(contract, tx.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2], estimateGas: null};
        }
    }

    //nft 721 && 1155
    public async mintNFTWithDELReserve(contract: ethers.Contract, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (tokenId !== undefined && amount !== undefined) {
            if (estimateGas) {
                const gas = await contract.mintByETH.estimateGas(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve}))
                return {tx: null, tokenId: tokenId, estimateGas: gas};
            }
            const tx = await contract.mintByETH(to, tokenId, amount, tokenURI, await this.txOptions({ value: reserve})).then(tx => tx.wait()); //1155
            return {tx: tx, tokenId: tokenId, estimateGas: null};
        } else {
            if (estimateGas) {
                const gas = await contract.mintByETH.estimateGas(to, tokenURI, await this.txOptions({ value: reserve}))
                return {tx: null, tokenId: tokenId, estimateGas: gas}; 
            }
            const tx = await contract.mintByETH(to, tokenURI, await this.txOptions({ value: reserve})).then(tx => tx.wait()); //721
            const event = this.parseLog(contract, tx.logs, 'Transfer')
            return {tx: tx, tokenId: event.args[2], estimateGas: null};
        }
    }

    public async mintNFTWithTokenReserve(contract: ethers.Contract, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (tokenId !== undefined && amount !== undefined) {
            if (sign != undefined) {
                const deadline = ethers.MaxUint256
                if (estimateGas) {
                    const gas = await contract.mintByPermit.estimateGas(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                    return {tx: null, tokenId: null, estimateGas: gas};
                }
                const tx = await contract.mintByPermit(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait()); //1155 permit
                return {tx: tx, tokenId: tokenId, estimateGas: null};
            } else {
                if (estimateGas) {
                    const gas = await contract.mint.estimateGas(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                    return {tx: null, tokenId: null, estimateGas: gas};
                }
                const tx = await contract.mint(to, tokenId, amount, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then(tx => tx.wait()); //1155 approve
                return {tx: tx, tokenId: tokenId, estimateGas: null};
            }
        } else {
            if (sign != undefined) {
                const deadline = ethers.MaxUint256
                if (estimateGas) {
                    const gas = await contract.mintByPermit.estimateGas(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions())
                    return {tx: null, tokenId: null, estimateGas: gas};
                }
                const tx = await contract.mintByPermit(to, tokenURI, reserveAmount, reserveToken, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait()); //721 permit
                const event = this.parseLog(contract, tx.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2], estimateGas: null};
            } else {
                if (estimateGas) {
                    const gas = await contract.mint.estimateGas(to, tokenURI, reserveAmount, reserveToken, await this.txOptions())
                    return {tx: null, tokenId: null, estimateGas: gas};
                }
                const tx = await contract.mint(to, tokenURI, reserveAmount, reserveToken, await this.txOptions()).then(tx => tx.wait()); //721 approve
                const event = this.parseLog(contract, tx.logs, 'Transfer')
                return {tx: tx, tokenId: event.args[2], estimateGas: null};
            }

        }
    }
    public async addDELReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract["addReserve(uint256)"].estimateGas(tokenId, await this.txOptions({ value: amountReserve}))
        return await contract["addReserve(uint256)"](tokenId, await this.txOptions({ value: amountReserve})).then(tx => tx.wait()); //721, 1155
    }

    public async addTokenReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign === undefined) {
            if (estimateGas) return await contract["addReserve(uint256,uint256)"].estimateGas(tokenId, amountReserve, await this.txOptions())
            return await contract["addReserve(uint256,uint256)"](tokenId, amountReserve, await this.txOptions()).then(tx => tx.wait()); //721, 1155 (for approve)
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await contract["addReserve(uint256,uint256,uint256,uint8,bytes32,bytes32)"].estimateGas(tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await contract["addReserve(uint256,uint256,uint256,uint8,bytes32,bytes32)"](tokenId, amountReserve, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait()); //721, 1155 (for permit)
        }
    }

    //nft 721
    public async approveNFT721(contract: ethers.Contract, to: string, tokenId: string | number | bigint, estimateGas?: boolean) {
        if (estimateGas) return await contract.approve.estimateGas(to, tokenId, await this.txOptions())
        return await contract.approve(to, tokenId, await this.txOptions()).then(tx => tx.wait());
    }

    //nft 1155 && 1155Standart
    public async transferBatchNFT1155(contract: ethers.Contract, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean) {
        if (estimateGas) return await contract.safeBatchTransferFrom.estimateGas(from, to, tokenIds, amounts, "0x", await this.txOptions())
        return await contract.safeBatchTransferFrom(from, to, tokenIds, amounts, "0x", await this.txOptions()).then(tx => tx.wait()); //1155, 1155Standart
    }

    //nft 1155
    

    //delegation nft
    public async delegateERC721(validator:string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.delegationNft.contract.delegateERC721.estimateGas(validator, nftAddress, tokenId, await this.txOptions())
            return await this.delegationNft.contract.delegateERC721(validator, nftAddress, tokenId, await this.txOptions()).then(tx => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.delegationNft.contract.delegateByPermitERC721.estimateGas(validator, nftAddress, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegationNft.contract.delegateByPermitERC721(validator, nftAddress, tokenId, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait());
        }
    }

    public async delegateERC1155(validator:string, nftAddress: string, tokenId: string | number | bigint, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
        if (sign == undefined) {
            if (estimateGas) return await this.delegationNft.contract.delegateERC1155.estimateGas(validator, nftAddress, tokenId, amount, await this.txOptions())
            return await this.delegationNft.contract.delegateERC1155(validator, nftAddress, tokenId, amount, await this.txOptions()).then(tx => tx.wait());
        } else {
            const deadline = ethers.MaxUint256
            if (estimateGas) return await this.delegationNft.contract.delegateByPermitERC1155.estimateGas(validator, nftAddress, tokenId, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions())
            return await this.delegationNft.contract.delegateByPermitERC1155(validator, nftAddress, tokenId, amount, deadline, sign.v, sign.r, sign.s, await this.txOptions()).then(tx => tx.wait());
        }
    }

    public async transferStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?:string | number | bigint, estimateGas?: boolean) {
        if (amount == undefined) {
            if (estimateGas) return await this.delegationNft.contract.transferERC721.estimateGas(validator, nftAddress, tokenId, newValidator, await this.txOptions())
            return await this.delegationNft.contract.transferERC721(validator, nftAddress, tokenId, newValidator, await this.txOptions()).then(tx => tx.wait());
        } else {
            if (estimateGas) return await this.delegationNft.contract.transferERC1155.estimateGas(validator, nftAddress, tokenId, amount, newValidator, await this.txOptions())
            return await this.delegationNft.contract.transferERC1155(validator, nftAddress, tokenId, amount, newValidator, await this.txOptions()).then(tx => tx.wait()); 
        }
    }

    public async withdrawStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
        if (amount == undefined) {
            if (estimateGas) return await this.delegationNft.contract.withdrawERC721.estimateGas(validator, nftAddress, tokenId, await this.txOptions())
            return await this.delegationNft.contract.withdrawERC721(validator, nftAddress, tokenId, await this.txOptions()).then(tx => tx.wait());
        } else {
            if (estimateGas) return await this.delegationNft.contract.withdrawERC1155.estimateGas(validator, nftAddress, tokenId, amount, await this.txOptions())
            return await this.delegationNft.contract.withdrawERC1155(validator, nftAddress, tokenId, amount, await this.txOptions()).then(tx => tx.wait());
        }
    }

    public async completeStakeNFT(index:string| number, estimateGas?: boolean) {
        try {
            await this.delegationNft.contract.completeStake.staticCall(index, await this.txOptions())
            if (estimateGas) {
                const gas = await this.delegationNft.contract.completeStake.estimateGas(index, await this.txOptions())
                return {tx: null, error: null, estimateGas: gas} 
            }
            const tx = await this.delegationNft.contract.completeStake(index, await this.txOptions()).then(tx => tx.wait());
            return {tx: tx, error: null, estimateGas: null} 
        } catch (err: any) {
            if (err?.revert?.name != null) {
                return {tx: null, error: err.revert.name, estimateGas: null} 
            }
            throw new Error(err)
        }
    }

    //master-validator
    public async addValidator(validator: string, meta: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator.contract.addValidator.estimateGas(validator, meta, await this.txOptions())
        return await this.masterValidator.contract.addValidator(validator, meta, await this.txOptions()).then(tx => tx.wait());
    }

    public async addValidators(validators: string[], metas: string[], estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator.contract.addValidators.estimateGas(validators, metas, await this.txOptions())
        return await this.masterValidator.contract.addValidators(validators, metas, await this.txOptions()).then(tx => tx.wait());
    }

    public async removeValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator.contract.removeValidator.estimateGas(validator, await this.txOptions())
        return await this.masterValidator.contract.removeValidator(validator, await this.txOptions()).then(tx => tx.wait());
    }

    public async pauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator.contract.pauseValidator.estimateGas(validator, await this.txOptions())
        return await this.masterValidator.contract.pauseValidator(validator, await this.txOptions()).then(tx => tx.wait());
    }

    public async unpauseValidator(validator: string, estimateGas?: boolean) {
        if (estimateGas) return await this.masterValidator.contract.unpauseValidator.estimateGas(validator, await this.txOptions())
        return await this.masterValidator.contract.unpauseValidator(validator, await this.txOptions()).then(tx => tx.wait());
    }

    // -----------view functions----------
    //token-center
    public async checkTokenExists(address:string) {
        return await this.tokenCenter.contract.isTokenExists(address)
    }
    
    public async getAddressTokenBySymbol(symbol:string) {
        return await this.tokenCenter.contract.tokens(symbol)
    }

    public async getCommissionSymbol(symbol:string) {
        return await this.tokenCenter.contract.getCommissionSymbol(symbol)
    }    

    //token
    public async calculateBuyOutput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract.calculateBuyOutput(amount);
    }
    public async calculateBuyInput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract.calculateBuyInput(amount);
    }

    public async calculateSellInput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract.calculateSellInput(amount);
    }
    
    public async calculateSellOutput(contract: ethers.Contract, amount: string | number | bigint) {
        return await contract.calculateSellOutput(amount);
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
        const sign = signingKey.sign(ethers.getBytes(permitHash))
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
        const [active, typeNftString] = await this.nftCenter.contract.getNftMeta(address)
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
            return await contract.balanceOf(account, tokenId); // erc1155, erc1155standart
        } else {
            return await contract.balanceOf(account); // erc721, erc721standart 
        }
    }

    public async supportsInterfaceNFT(contract: ethers.Contract, interfaceId: string) {
        return await contract.supportsInterface(interfaceId);
    }
    //nft 721 && 1155
    public async getReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint) {
        const result = await contract.getReserve(tokenId)
        return {amount: result[0], token: result[1]};
    }
    public async getTypeReserveNFT(contract: ethers.Contract, tokenId: string | number | bigint) {
        return await contract.getTypeReserve(tokenId);
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
        return await contract.supply(tokenId);
    }

    //delegation 
    public async getTokenStakesByMember(account: string): Promise<Stake[]> {
        return await this.delegation.contract.getStakesByMember(account);
    }
    public async getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
        return await this.delegation.contract.getStakesPageByMember(account, size, offset);
    }
    public async getFrozenStakesQueueToken() {
        return await this.delegation.contract.getFrozenStakesQueue();
    }
    public async getFreezeTimeToken() {
        const [
			freezeTimeWithdraw,
			freezeTimeTransfer
		] = await Promise.all([
			this.delegation.contract.getFreezeTime(FreezeType.Withdraw),
			this.delegation.contract.getFreezeTime(FreezeType.Transfer),
		])
        return {
            "Withdraw": freezeTimeWithdraw,
            "Transfer": freezeTimeTransfer
        }
    }

    public async getStakeToken(validator: string, delegator: string, tokenAddress: string): Promise<Stake> {
        return await this.delegation.contract.getStake(validator, delegator, tokenAddress);
    }

    public async getStakeIdToken(validator: string, delegator: string, tokenAddress: string) {
        return await this.delegation.contract.getStakeId(validator, delegator, tokenAddress);
    }

    //delegation-nft

    public async getNFTStakesByMember(account: string): Promise<Stake[]> {
        return await this.delegationNft.contract.getStakesByMember(account);
    }
    public async getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint): Promise<Stake[]> {
        return await this.delegationNft.contract.getStakesPageByMember(account, size, offset);
    }
    public async getFrozenStakesQueueNFT() {
        return await this.delegationNft.contract.getFrozenStakesQueue();
    }
    public async getFreezeTimeNFT() {
        const [
			freezeTimeWithdraw,
			freezeTimeTransfer
		] = await Promise.all([
			this.delegationNft.contract.getFreezeTime(FreezeType.Withdraw),
			this.delegationNft.contract.getFreezeTime(FreezeType.Transfer),

		])
        return {
            "Withdraw": freezeTimeWithdraw,
            "Transfer": freezeTimeTransfer
        }
    }

    //master-validator
    public async getValidatorStatus(validator: string): Promise<ValidatorStatus> {
        const status = await this.masterValidator.contract.getValidatorStatus(validator);
        const statusValidator: string = status.toString();
        let validatorStatus: ValidatorStatus = ValidatorStatus[statusValidator as keyof typeof ValidatorStatus]
        return validatorStatus

    }

    public async validatorIsActive(validator: string) {
        return await this.masterValidator.contract.isActive(validator);
    }

    public async validatorIsMember(validator: string) {
        return await this.masterValidator.contract.isMember(validator);
    }
    
    //othres
    public getDecimalContractAddress(contract: string) {
        switch (contract) {
            case "contract-center":
                return this.contractCenter.contract.target
            case "token-center":
                return this.tokenCenter.contract.target
            case "nft-center":
                return this.nftCenter.contract.target
            case "delegation":
                return this.delegation.contract.target
            case "delegation-nft":
                return this.delegationNft.contract.target
            case "master-validator":
                return this.masterValidator.contract.target
            default:
                throw new Error(`There is no such contract in the Decimal`)
        }
    }

    public getDecimalContract(contract: string) {
        switch (contract) {
            case "contract-center":
                return this.contractCenter.contract
            case "token-center":
                return this.tokenCenter.contract
            case "nft-center":
                return this.nftCenter.contract
            case "delegation":
                return this.delegation.contract
            case "delegation-nft":
                return this.delegationNft.contract
            case "master-validator":
                return this.masterValidator.contract
            default:
                throw new Error(`There is no such contract in the Decimal`)
        }
    }

    public async getSignPermitERC721(
        contract: ethers.Contract,
        spender: string | ethers.Addressable,
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
                verifyingContract: contract.target.toString(),
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

    public async getSignPermitERC1155(
        contract: ethers.Contract,
        spender: string | ethers.Addressable
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
                verifyingContract: contract.target.toString(),
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

}