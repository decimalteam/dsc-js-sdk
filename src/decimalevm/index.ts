
import { BigNumberish, ethers, Wallet as HDNodeWallet } from "ethers";
import {
    getWeb3Endpoint,
    getNewApiEndpoint,
    NETWORKS,
    getMultiCallAddresses,
} from "../endpoints";
import Wallet from "../wallet";
import DecimalContractEVM from "./contract";
import Call from "./call";
import {TypeNFT, Token, NFTCollection, ValidotorStake} from "./call";
import { TokenType } from "./interfaces/delegation";
import { ValidatorMeta, ValidatorStatus } from "./interfaces/validator";
import Subgraph from "../subgraph";
import { DecimalContract } from "../subgraph/interfaces/contracts";
import IPFS from "./ipfs";
import {
	abi as multiCallAbi
} from "./abi/Multicall.json";
import {
  buildContractCall,
  buildSafeTransaction,
  executeTx,
  executeTxWithSigners,
  MetaTransaction,
  safeApproveHash,
  SafeSignature,
  SafeTransaction
} from "./multisig/execution";

export default class DecimalEVM {

  private readonly network: NETWORKS;
  private readonly wallet: Wallet;
  private readonly apiUrl: string;
  private readonly subgraph: Subgraph;
  private readonly ipfs: IPFS;
  private call?: Call;
  public provider: ethers.providers.JsonRpcProvider;
  public account: HDNodeWallet;
  private contarcts: { [address: string]: DecimalContractEVM } = {}
  private abis?: { 
    token: ethers.ContractInterface,
    erc721: ethers.ContractInterface,
    erc1155: ethers.ContractInterface,
  };

  private isNotConnected = new Error('DecimalEVM is not connected');

  public multisig = {
    buildTxSendDEL: this.buildMultiSigTxSendDEL.bind(this),
    signTx: this.signMultiSigTx.bind(this),
    executeTx: this.executeMultiSigTx.bind(this),
  };
  

  public constructor(
      wallet: Wallet,
      network: NETWORKS,
  ) {
      this.wallet = wallet;
      this.network = network;
      this.provider = new ethers.providers.JsonRpcProvider(getWeb3Endpoint(network));
      this.account = HDNodeWallet.fromMnemonic(this.wallet.mnemonic!).connect(this.provider);
      this.apiUrl = getNewApiEndpoint(this.network);
      this.subgraph = new Subgraph(this.network)
      this.ipfs = new IPFS(this.network)
  }

  private async getContract(address: string, abi?: any) {
    if (!this.contarcts[address]) {
      this.contarcts[address] = await DecimalContractEVM.getContract(this.network, this.apiUrl, this.account, address, abi)
    }
    return this.contarcts[address]
  }

  public async connect() {
    const contracts = await this.subgraph.getDecimalContracts()

    const [
			contractCenter,
			tokenCenter,
			delegation,
			nftCenter,
			delegationNft,
      masterValidator,
      contractMulticall,
      contractMultiSend,
		] = await Promise.all([
			this.initFromImplementation(contracts, 'contract-center'),
			this.initFromImplementation(contracts, 'token-center'),
			this.initFromImplementation(contracts, 'delegation'),
			this.initFromImplementation(contracts, 'nft-center'),
      this.initFromImplementation(contracts, 'delegation-nft'),
			this.initFromImplementation(contracts, 'master-validator'),
      this.getContract(getMultiCallAddresses(this.network), multiCallAbi),
      this.getContract(getMultiCallAddresses(this.network), multiCallAbi), //TODO edit to multiSend for multisig
		])

    const [
			tokenImplAddress,
			erc721ImplAddress,
			erc1155ImplAddress,
		] = await Promise.all([
			tokenCenter.contract.implementation(),
			nftCenter.contract.implementation(TypeNFT.ERC721),
			nftCenter.contract.implementation(TypeNFT.ERC1155),
		])

    const [
			tokenImpl,
			erc721Impl,
			erc1155Impl,
		] = await Promise.all([
			this.getContract(tokenImplAddress),
			this.getContract(erc721ImplAddress),
			this.getContract(erc1155ImplAddress),
		])

    this.abis = {
      token: tokenImpl.abi,
      erc721: erc721Impl.abi,
      erc1155: erc1155Impl.abi
    }

    this.call = new Call(
      this.network,
      this.provider,
      this.account,
      contractCenter,
      tokenCenter,
      delegation,
      nftCenter,
      delegationNft,
      masterValidator,
      contractMulticall,
      contractMultiSend
    )
  }

  private async initFromImplementation(contracts: DecimalContract[], contractName: string) {
    const contract = contracts.find((contract) => contract.name == contractName)
    if (!contract) throw new Error(`${contractName } not found in thegraph`);
    const abi = (await this.getContract(contract.implementation)).abi
    return await this.getContract(contract.address, abi)
  }

  // write function
  public async multiCall(callDatas: {
    target: string;
    iface: string;
    params: any;
  }[], estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    let calls: {
      target: string;
      callData: string;
    }[] = [];
    for (let i = 0; i < callDatas.length; i++) {
      if (callDatas[i].target.length != callDatas[i].iface.length) throw Error('Number of length does not match targets and ifaces');
      const iFace = new ethers.utils.Interface([callDatas[i].iface]);
      const data = iFace.encodeFunctionData(iFace.functions[Object.keys(iFace.functions)[0]].name, callDatas[i].params)
      calls.push({
        target: callDatas[i].target,
        callData: data
      })
    }
    return await this.call.multicall(calls, estimateGas)
  }

  public async sendDEL(address: string, amount: string | number | bigint | BigNumberish, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    if (estimateGas) {
      return await this.account.estimateGas({
        to: address,
        value: amount
      });
    }
    return await this.account.sendTransaction({
      to: address,
      value: amount
    }).then((tx: ethers.ContractTransaction) => tx.wait());
  }

  public async burnDEL(amount: string | number | bigint | BigNumberish, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return this.sendDEL(ethers.constants.AddressZero, amount, estimateGas)
  }

  public async createToken(payload: Token, reserve: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.createToken(payload, reserve, estimateGas)
  }

  public async convertToken(tokenIn:string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.convertToken(tokenIn, tokenOut, amountIn, amountOutMin, recipient, sign, estimateGas)
  }

  public async approveToken(tokenAddress: string, spender: string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.approveToken(token.contract, spender, amount, estimateGas)
  }

  public async transferToken(tokenAddress: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.transferToken(token.contract, to, amount, estimateGas)
  }

  public async transferFromToken(tokenAddress: string, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.transferFromToken(token.contract, from, to, amount, estimateGas)
  }

  public async burnToken(tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.burnToken(token.contract, amount, estimateGas)
  }

  public async buyTokenForExactDEL(tokenAddress: string, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.buyTokenForExactDEL(token.contract, amountDel, amountOutMin, recipient, estimateGas)
  }

  public async buyExactTokenForDEL(tokenAddress: string, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.buyExactTokenForDEL(token.contract, amountDel, amountOut, recipient, estimateGas)
  }

  public async sellTokensForExactDEL(tokenAddress: string, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.sellTokensForExactDEL(token.contract, amountOut, amountInMax, recipient, estimateGas)
  }

  public async sellExactTokensForDEL(tokenAddress: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.sellExactTokensForDEL(token.contract, amountIn, amountOutMin, recipient, estimateGas)
  }

  public async updateDetailsToken(tokenAddress: string, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.updateDetailsToken(token.contract, newIdentity, newMaxTotalSupply, estimateGas)
  }

  public async permitToken(tokenAddress: string, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call.permitToken(token.contract, owner, spender, amount, sign, estimateGas)
  }
/*
  public async createCollectionERC721Standart(payload:NFTCollection, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.createCollection(payload, TypeNFT.ERC721Standart, estimateGas)
  }

  public async createCollectionERC1155Standart(payload:NFTCollection, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.createCollection(payload, TypeNFT.ERC1155Standart, estimateGas)
  }
*/
  public async createCollectionERC721(payload:NFTCollection, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.createCollection(payload, TypeNFT.ERC721, estimateGas)
  }

  public async createCollectionERC1155(payload:NFTCollection, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.createCollection(payload, TypeNFT.ERC1155, estimateGas)
  }

  public async approveNFT721(nftCollectionAddress: string, to: string, tokenId: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress) 
    if (/*typeNFT != TypeNFT.ERC721Standart && */ typeNFT != TypeNFT.ERC721) throw new Error(`Only for ERC721 and ERC721Standart`);
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call.approveNFT721(nft.contract, to, tokenId, estimateGas)
  }

  public async approveForAllNFT(nftCollectionAddress: string, to: string, approved: boolean, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call.setApprovalForAllNFT(nft.contract, to, approved, estimateGas)
  }
/*
  public async mintNFT(nftCollectionAddress: string, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      case TypeNFT.ERC721:
      case TypeNFT.ERC1155:
        throw new Error(`The ${typeNFT} type is not supported by the mintNFT() method. Try mintNFTWithDELReserve() or mintNFTWithTokenReserve()`)
      case TypeNFT.ERC721Standart:
        return await this.call.mintNFT(nft.contract, to, tokenURI, undefined, undefined, estimateGas)
      case TypeNFT.ERC1155Standart:
        return await this.call.mintNFT(nft.contract, to, tokenURI, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }
*/
  public async mintNFTWithDELReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      //case TypeNFT.ERC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the mintNFTWithDELReserve() and mintNFTWithTokenReserve() methods. Try mintNFT()`)
      case TypeNFT.ERC721:
        return await this.call.mintNFTWithDELReserve(nft.contract, to, tokenURI, reserve, undefined, undefined, estimateGas)
      case TypeNFT.ERC1155:
        return await this.call.mintNFTWithDELReserve(nft.contract, to, tokenURI, reserve, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async mintNFTWithTokenReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      //case TypeNFT.ERC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the mintNFTWithDELReserve() and mintNFTWithTokenReserve() methods. Try mintNFT()`)
      case TypeNFT.ERC721:
        return await this.call.mintNFTWithTokenReserve(nft.contract, to, tokenURI, reserveAmount, reserveToken, sign, undefined, undefined, estimateGas)
      case TypeNFT.ERC1155:
        return await this.call.mintNFTWithTokenReserve(nft.contract, to, tokenURI, reserveAmount, reserveToken, sign, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async addDELReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      //case TypeNFT.ERC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the addDELReserveNFT() and addTokenReserveNFT() methods.`)
      case TypeNFT.ERC721:
      case TypeNFT.ERC1155:
        return await this.call.addDELReserveNFT(nft.contract, tokenId, amountReserve, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async addTokenReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      //case TypeNFT.ERC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the addDELReserveNFT() and addTokenReserveNFT() methods.`)
      case TypeNFT.ERC721:
      case TypeNFT.ERC1155:
        return await this.call.addTokenReserveNFT(nft.contract, tokenId, amountReserve, sign, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async transferNFT(nftCollectionAddress: string, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      case TypeNFT.ERC721:
        return await this.call.transferNFT(nft.contract, from, to, tokenId, undefined, estimateGas)
      //case TypeNFT.ERC1155Standart:
      case TypeNFT.ERC1155:
        return await this.call.transferNFT(nft.contract, from, to, tokenId, amount, estimateGas)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async transferBatchNFT1155(nftCollectionAddress: string, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    if (/*typeNFT != TypeNFT.ERC1155Standart &&*/ typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC1155 and ERC1155Standart`);
    return await this.call.transferBatchNFT1155(nft.contract, from, to, tokenIds, amounts, estimateGas)
  }

  public async disableMintNFT(nftCollectionAddress: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    await this.call.disableMintNFT(nft.contract, estimateGas)
  }

  public async burnNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      case TypeNFT.ERC721:
        return await this.call.burnNFT(nft.contract, tokenId, undefined, estimateGas)
      //case TypeNFT.ERC1155Standart:
      case TypeNFT.ERC1155:
        return await this.call.burnNFT(nft.contract, tokenId, amount, estimateGas)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async setBaseURINFT(nftCollectionAddress: string, baseURI: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call.setBaseURINFT(nft.contract, baseURI, estimateGas)
  }

  public async setTokenURINFT(nftCollectionAddress: string, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call.setTokenURINFT(nft.contract, tokenId, tokenURI, estimateGas)
  }

  public async delegateDEL(validator:string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.delegateDEL(validator, amount, estimateGas)
  }

  public async delegateToken(validator:string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.delegateToken(validator, tokenAddress, amount, sign, estimateGas)
  }

  public async transferStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.transferStakeToken(validator, tokenAddress, amount, newValidator, estimateGas)
  }

  public async withdrawStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.withdrawStakeToken(validator, tokenAddress, amount, estimateGas)
  }

  public async applyPenaltyToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.applyPenaltyToStakeToken(validator, delegator, tokenAddress, estimateGas)
  }

  public async applyPenaltiesToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.applyPenaltiesToStakeToken(validator, delegator, tokenAddress, estimateGas)
  }
  public async completeStakeToken(indexes:string[] | number[], estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.completeStakeToken(indexes, estimateGas)
  }

  public async delegateERC721(validator:string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.ERC721) throw new Error(`Only for ERC721`);
    return await this.call.delegateERC721(validator, nftAddress, tokenId, sign, estimateGas)
  }

  public async delegateERC1155(validator:string, nftAddress: string, tokenId: string | number | bigint, amount:string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC1155`);
    return await this.call.delegateERC1155(validator, nftAddress, tokenId, amount, sign, estimateGas)
  }

  public async transferStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?:string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.ERC721 && typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC721 and ERC1155`);
    return await this.call.transferStakeNFT(validator, nftAddress, tokenId, newValidator, amount, estimateGas)
  }

  public async withdrawStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.ERC721 && typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC721 and ERC1155`);
    return await this.call.withdrawStakeNFT(validator, nftAddress, tokenId, amount, estimateGas)
  }
  public async completeStakeNFT(indexes:string[] | number[], estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.completeStakeNFT(indexes, estimateGas)
  }

  public async addValidatorWithToken(meta: ValidatorMeta, stake: ValidotorStake, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const validator = meta.operator_address
    this.validationValidatorMeta(meta)
    return await this.call.addValidatorWithToken(validator, JSON.stringify(meta), stake, estimateGas)
  }

  public async addValidatorWithETH(meta: ValidatorMeta, amount: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const validator = meta.operator_address
    this.validationValidatorMeta(meta)
    return await this.call.addValidatorWithETH(validator, JSON.stringify(meta), amount, estimateGas)
  }

  public async removeValidator(validator: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.removeValidator(validator, estimateGas)
  }

  public async pauseValidator(validator: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.pauseValidator(validator, estimateGas)
  }

  public async unpauseValidator(validator: string, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.unpauseValidator(validator, estimateGas)
  }
  
  public async buildMultiSigTxSendDEL(address: string, amount: string | number | bigint): Promise<SafeTransaction> {
    if (!this.call) throw this.isNotConnected;
    return buildSafeTransaction({ to: address, value: amount, nonce: 0 });
  }

  public async signMultiSigTx(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature> {
    if (!this.call) throw this.isNotConnected;
    return await this.call.signMultiSigTx(safeAddress, safeTx);
  }

  public async executeMultiSigTx(safeTx: SafeTransaction, signatures: SafeSignature[], safeAddress: string) {
    if (!this.call) throw this.isNotConnected;
    const safe = new ethers.Contract(safeAddress, []) //TODO add abi
    return await this.call.executeMultiSigTx(safeTx, signatures, safe) 
  }


  // view function

  public async getBalance(address: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.provider.getBalance(address)
  }

  public async getNftType(address: string): Promise<TypeNFT> {
    if (!this.call) throw this.isNotConnected;
    const type = await this.subgraph.getNftCollectionType(address)
    if (type == null) throw new Error("The nft collection does not exist")
    let typeNFT: TypeNFT = TypeNFT[type as keyof typeof TypeNFT]
    return typeNFT
  }

  public async getNftTypeFromContract(address: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getNftType(address)
  }

  public async getAddressTokenBySymbol(symbol: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getAddressTokenBySymbol(symbol)
  }

  public async checkTokenExists(address: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.checkTokenExists(address)
  }

  public async getCommissionSymbol(symbol:string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getCommissionSymbol(symbol)
  }

  public async calculateBuyOutput(address: string, amount: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.calculateBuyOutput(token.contract, amount)
  }
  public async calculateBuyInput(address: string, amount: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.calculateBuyInput(token.contract, amount)
  }
  public async calculateSellInput(address: string, amount: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.calculateSellInput(token.contract, amount)
  }
  public async calculateSellOutput(address: string, amount: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.calculateSellOutput(token.contract, amount)
  }
  public async getSignPermitToken(address: string, spender: string, amount: string | number | bigint): Promise<ethers.Signature> {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.getSignPermitToken(token.contract, spender, amount)
  }
  public async allowanceToken(address: string, owner: string, spender: string) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.allowanceToken(token.contract, owner, spender)
  }
  public async balanceOfToken(address: string, account: string) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.balanceOfToken(token.contract, account) 
  }
  public async supportsInterfaceToken(address: string, interfaceId: string) {
    if (!this.call) throw this.isNotConnected;
    const token = await this.getContract(address, this.abis?.token)
    return await this.call.supportsInterfaceToken(token.contract, interfaceId) 
  }

  public async getApprovedNFT721(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(address)
    if (/*typeNFT != TypeNFT.ERC721Standart &&*/ typeNFT != TypeNFT.ERC721) throw new Error(`Only for ERC721 and ERC721Standart`);
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call.getApprovedNFT721(nft.contract, tokenId) 
  }

  public async getAllowMintNFT(address: string) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call.getAllowMintNFT(nft.contract) 
  }

  public async isApprovedForAllNFT(address: string, owner: string, operator: string) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call.isApprovedForAllNFT(nft.contract, owner, operator) 
  }

  public async ownerOfNFT721(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(address)
    if (/*typeNFT != TypeNFT.ERC721Standart &&*/ typeNFT != TypeNFT.ERC721) throw new Error(`Only for ERC721 and ERC721Standart`);
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call.ownerOfNFT721(nft.contract, tokenId) 
  }

  public async getTokenURINFT(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      case TypeNFT.ERC721:
        return await this.call.getTokenURINFT721(nft.contract, tokenId)
      //case TypeNFT.ERC1155Standart:
      case TypeNFT.ERC1155:
        return await this.call.getTokenURINFT1155(nft.contract, tokenId)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async balanceOfNFT(address: string, account:string, tokenId?: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.ERC721Standart:
      case TypeNFT.ERC721:
        return await this.call.balanceOfNFT(nft.contract, account)
      //case TypeNFT.ERC1155Standart:
      case TypeNFT.ERC1155:
        if (tokenId === undefined) throw new Error(`You need to specify the tokenId`)
        return await this.call.balanceOfNFT(nft.contract, account, tokenId)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async supportsInterfaceNFT(address: string, interfaceId: string) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call.supportsInterfaceNFT(nft.contract, interfaceId) 
  }

  public async getRateNFT1155(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC1155`);
    return await this.call.getRateNFT1155(nft.contract, tokenId) 
  }

  public async calcReserveNFT1155(address: string, tokenId: string | number | bigint, quantity:string | number | bigint) {
    const rate = await this.getRateNFT1155(address, tokenId)
    return (BigInt(rate) * BigInt(quantity)).toString()
  }

  public async getReserveNFT(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC721 && typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC721 and ERC1155`);
    return await this.call.getReserveNFT(nft.contract, tokenId) 
  }
  
  public async getRefundableNFT(address: string) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC721 && typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC721 and ERC1155`);
    return await this.call.getRefundableNFT(nft.contract) 
  }

  public async getSupplyNFT1155(address: string, tokenId: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC1155`);
    return await this.call.getSupplyNFT1155(nft.contract, tokenId) 
  }

  public async getTokenStakesByMember(account:string) {
    if (!this.call) throw this.isNotConnected;
    return this.call.getTokenStakesByMember(account)
  }
  
  public async getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getTokenStakesPageByMember(account, size, offset)
  }

  public async getFrozenStakesQueueToken() {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getFrozenStakesQueueToken()
  }

  public async getFreezeTimeToken() {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getFreezeTimeToken()
  }

  public async getStakeToken(validator: string, delegator: string, tokenAddress: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getStakeToken(validator, delegator, tokenAddress)
  }
  public async getStakeIdToken(validator: string, delegator: string, tokenAddress: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getStakeIdToken(validator, delegator, tokenAddress)
  }

  public async getNFTStakesByMember(account:string) {
    if (!this.call) throw this.isNotConnected;
    return this.call.getNFTStakesByMember(account)
  }
  
  public async getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getNFTStakesPageByMember(account, size, offset)
  }

  public async getFrozenStakesQueueNFT() {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getFrozenStakesQueueNFT()
  }

  public async getFreezeTimeNFT() {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getFreezeTimeNFT()
  }

  public async getSignPermitERC721(address: string, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature> {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC721) throw new Error(`Only for ERC721`);
    return await this.call.getSignPermitERC721(nft.contract, spender, tokenId)
  }

  public async getSignPermitERC1155(address: string, spender: string): Promise<ethers.Signature> {
    if (!this.call) throw this.isNotConnected;
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.ERC1155) throw new Error(`Only for ERC1155`);
    return await this.call.getSignPermitERC1155(nft.contract, spender)
  }

  public async getValidatorStatus(validator: string): Promise<ValidatorStatus> {
    if (!this.call) throw this.isNotConnected;
    return await this.call.getValidatorStatus(validator)
  }

  public async validatorIsActive(validator: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.validatorIsActive(validator)
  }

  public async validatorIsMember(validator: string) {
    if (!this.call) throw this.isNotConnected;
    return await this.call.validatorIsMember(validator)
  }

  //utils
  public parseEther(amount: string | number | bigint | BigNumberish){
    return ethers.utils.parseEther(amount.toString()).toString()
  }
  public formatEther(amount: string | number | bigint | BigNumberish){
    const amountETH = ethers.utils.formatEther(amount.toString()).toString()
    const decimals = amountETH.split(".")[1]
    return decimals == "0" ? amountETH.split(".")[0] : amountETH
  }
  public getAddress(address: string){
    return ethers.utils.getAddress(address)
  }

  private async getNFTContract(address: string, typeNFT: TypeNFT) {
    switch (typeNFT as TypeNFT) {
      //case TypeNFT.ERC721Standart:
      //  return await this.getContract(address)
      //case TypeNFT.ERC1155Standart:
      //  return await this.getContract(address)
      case TypeNFT.ERC721:
        return await this.getContract(address, this.abis?.erc721)
      case TypeNFT.ERC1155:
        return await this.getContract(address, this.abis?.erc1155)
      default:
        throw new Error(`type ${typeNFT} not exist`)
    }
  }

  public getDecimalContractAddress(contract: string): string {
    if (!this.call) throw this.isNotConnected;
    return this.call.getDecimalContractAddress(contract).toString()
  }

  public getDecimalContract(contract: string): ethers.Contract {
    if (!this.call) throw this.isNotConnected;
    return this.call.getDecimalContract(contract)
  }

  public async getLatestBlock() {
    if (!this.provider) throw this.isNotConnected;

    const block = await this.provider.getBlock('latest')
    if (block == null) throw new Error("try again")
    return block;
  }

  public getTokenTypes() {
    return TokenType;
  }

  public async connectToContract(address: string, abi?: ethers.ContractInterface): Promise<DecimalContractEVM> {
    return await DecimalContractEVM.getContract(this.network, this.apiUrl, this.account, address, abi)
  }

  public async verifyСontract(address: string, contract_code: string, compiler: string, optimizer: string, runs: string, evm_version: string): Promise<boolean> {
    return await DecimalContractEVM.verifyСontract(this.apiUrl, address, contract_code, compiler, optimizer, runs, evm_version)
  }

  private validationValidatorMeta(meta: ValidatorMeta) {
    if (meta.commission == undefined || meta.commission == null ||
        meta.consensus_pubkey == undefined || meta.consensus_pubkey == null ||
        meta.description == undefined || meta.description == null ||
        meta.description.details == undefined || meta.description.details == null ||
        meta.description.identity == undefined || meta.description.identity == null ||
        meta.description.moniker == undefined || meta.description.moniker == null ||
        meta.description.security_contact == undefined || meta.description.security_contact == null ||
        meta.description.website == undefined || meta.description.website == null ||
        meta.operator_address == undefined || meta.operator_address == null ||
        meta.reward_address == undefined || meta.reward_address == null
    ) throw new Error("failed validation of validator meta")
  }

  public async getFeeData() {
    const feeData = await this.provider.getFeeData()
    if (this.network != NETWORKS.TESTNET) return feeData
    return <ethers.providers.FeeData>{
      gasPrice: feeData.gasPrice!.add(1),
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
    }
  }

  //ipfs
  public async uploadNFTBufferToIPFS(buffer:Buffer, fileName:string, name:string, description:string) {
    return await this.ipfs.uploadNFTBufferToIPFS(buffer, fileName, name, description);
  }

  public async uploadTokenBufferToIPFS(buffer:Buffer, fileName:string) {
    return await this.ipfs.uploadTokenBufferToIPFS(buffer, fileName);
  }

  public async getBlobMetadata(name:string, description:string) {
    return this.ipfs.getBlobMetadata(name, description);
  }

  public async uploadNFTFormToIPFS(form: any) {
    return await this.ipfs.upload(form, true);
  }

  public async uploadTokenFormToIPFS(form: any) {
    return await this.ipfs.upload(form, false);
  }

  public getUrlFromCid(cid:string) {
    return this.ipfs.getUrlFromCid(cid);
  }
  
}