
import { BigNumberish, ethers, Wallet as HDNodeWallet } from "ethers";
import {
    getWeb3Endpoint,
    getNewApiEndpoint,
    NETWORKS,
    getMultiCallAddresses,
    getMultiSigAddresses
} from "../endpoints";
import Wallet from "../wallet";
import DecimalContractEVM from "./contract";
import Call, { NFTCollectionReserveless } from "./call";
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
  buildSafeTransaction,
  safeApproveHash,
  SafeSignature,
  SafeTransaction
} from "./multisig/execution";
import { Blob } from "buffer";

export default class DecimalEVM {

  private readonly network: NETWORKS;
  private readonly wallet: Wallet;
  private readonly apiUrl: string;
  private readonly subgraph: Subgraph;
  private readonly ipfs: IPFS;
  private call?: Call;
  private contractAddesses?: DecimalContract[];
  public provider: ethers.providers.JsonRpcProvider;
  public account: HDNodeWallet;
  private contarcts: { [address: string]: DecimalContractEVM } = {}
  private abis: { 
    token?: ethers.ContractInterface,
    drc721?: ethers.ContractInterface,
    drc1155?: ethers.ContractInterface,
    drc721Reserveless?: ethers.ContractInterface,
    drc1155Reserveless?: ethers.ContractInterface,
  } = {
    token: undefined,
    drc721: undefined,
    drc1155: undefined,
    drc721Reserveless: undefined,
    drc1155Reserveless: undefined,
  }

  public multisig = <{
    create: (ownersData: {
        owner: string;
        weight: number;
    }[], weightThreshold?: number, estimateGas?: boolean) => Promise<{
        tx: any;
        multisigAddress: any;
        estimateGas: any;
    }>;
    buildTxSendDEL: (safeAddress: string, to: string, amount: string | number | bigint) => Promise<SafeTransaction>;
    buildTxSendToken: (safeAddress: string, tokenAddress: string, to: string, amount: string | number | bigint) => Promise<SafeTransaction>;
    buildTxSendNFT: (safeAddress: string, tokenAddress: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint) => Promise<SafeTransaction>
    signTx: (safeAddress: string, safeTx: SafeTransaction) => Promise<SafeSignature>;
    approveHash: (safeAddress: string, safeTx: SafeTransaction) => Promise<SafeSignature>;
    executeTx: (safeAddress: string, safeTx: SafeTransaction, signatures: SafeSignature[], estimateGas?: boolean) => Promise<any>;
    getNonce: (safeAddress: string) => Promise<any>;
    getCurrentApproveTransactions: (safeAddress: string) => Promise<SafeTransaction[]>;
    getSignatureForParticipant: (participantAddress: string) => Promise<SafeSignature>
    decodeTransaction: (safeTx: SafeTransaction) => {
      action: string;
      tokenType: string;
      token: string;
      to: string;
      tokenId?: string;
      amount?: string;
    }
  }>{
    create: this.createMultiSig.bind(this),
    buildTxSendDEL: this.buildMultiSigTxSendDEL.bind(this),
    buildTxSendToken: this.buildMultiSigTxSendToken.bind(this),
    buildTxSendNFT: this.buildMultiSigTxSendNFT.bind(this),
    signTx: this.signMultiSigTx.bind(this),
    approveHash: this.approveHashMultiSig.bind(this),
    executeTx: this.executeMultiSigTx.bind(this),
    getNonce: this.getNonceMultiSig.bind(this),
    getCurrentApproveTransactions: this.getCurrentApproveTransactions.bind(this),
    getSignatureForParticipant: this.getSignatureForParticipant.bind(this),
    decodeTransaction: this.decodeMultiSigSafeTransaction.bind(this),
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
      this.call = new Call(
        this.network,
        this.provider,
        this.account
      )
  }

  private async getContract(address: string, abi?: any) {
    if (!this.contarcts[address]) {
      this.contarcts[address] = await DecimalContractEVM.getContract(this.network, this.apiUrl, this.account, address, abi)
    }
    return this.contarcts[address]
  }

  public async connect(contractName?: string) {
    if (contractName) {
      await this.checkConnect(contractName)
    } else {
      await this.checkConnect('contract-center')
      await this.checkConnect('token-center')
      await this.checkConnect('nft-center')
      await this.checkConnect('delegation')
      await this.checkConnect('delegation-nft')
      await this.checkConnect('master-validator')
      await this.checkConnect('multi-call')
      await this.checkConnect('multi-sig')
      //TODO bridge
      //TODO checks
    }
  }
  
  private async checkConnect(contractName: string) {
    if (!this.call) throw new Error('DecimalEVM is not connected');
    switch(contractName) {
      case 'contract-center':
        if (!this.call.contractCenter) {
          const contractCenter = await this.initFromImplementation('contract-center');
          this.call.setDecimalContractEVM(contractCenter, 'contractCenter')
        }
        break;
      case 'token-center':
        if (!this.call.tokenCenter) {
          const tokenCenter = await this.initFromImplementation('token-center');
          const tokenImplAddress = await tokenCenter.contract.implementation();
          const tokenImpl = await this.getContract(tokenImplAddress);
          this.abis.token = tokenImpl.abi;
          this.call.setDecimalContractEVM(tokenCenter, 'tokenCenter')
        }
        break;
      case 'nft-center':
        if (!this.call.nftCenter) {
          const nftCenter = await this.initFromImplementation('nft-center');
          const [
            drc721ImplAddress,
            drc1155ImplAddress,
            drc721ReservelessImplAddress,
            drc1155ReservelessImplAddress,
          ] = await Promise.all([
            nftCenter.contract.implementation(TypeNFT.DRC721, true),
            nftCenter.contract.implementation(TypeNFT.DRC1155, true),
            nftCenter.contract.implementation(TypeNFT.DRC721, false),
            nftCenter.contract.implementation(TypeNFT.DRC1155, false),
          ])
          const [
            drc721Impl,
            drc1155Impl,
            drc721ReservelessImpl,
            drc1155ReservelessImpl,
          ] = await Promise.all([
            this.getContract(drc721ImplAddress),
            this.getContract(drc1155ImplAddress),
            this.getContract(drc721ReservelessImplAddress),
            this.getContract(drc1155ReservelessImplAddress),
          ])
          this.abis.drc721 = drc721Impl.abi;
          this.abis.drc1155 = drc1155Impl.abi;
          this.abis.drc721Reserveless = drc721ReservelessImpl.abi;
          this.abis.drc1155Reserveless = drc1155ReservelessImpl.abi;
          this.call.setDecimalContractEVM(nftCenter, 'nftCenter')
        }
        break;
      case 'delegation':
        if (!this.call.delegation) {
          const delegation = await this.initFromImplementation('delegation');
          this.call.setDecimalContractEVM(delegation, 'delegation')
        }
        break;
      case 'delegation-nft':
        if (!this.call.delegationNft) {
          const delegationNft = await this.initFromImplementation('delegation-nft');
          this.call.setDecimalContractEVM(delegationNft, 'delegationNft')
        }
        break;
      case 'master-validator':
        if (!this.call.masterValidator) {
          const masterValidator = await this.initFromImplementation('master-validator');
          this.call.setDecimalContractEVM(masterValidator, 'masterValidator')
        }
        break;
      case 'multi-call':
        if (!this.call.delegationNft) {
          const multiCall = await this.getContract(getMultiCallAddresses(this.network), multiCallAbi);
          this.call.setDecimalContractEVM(multiCall, 'multiCall')
        }
        break;
      case 'multi-sig':
        if (!this.call.delegationNft) {
          const [
            safe,
            safeFactory,
            multiSend
          ] = await Promise.all([
            this.getContract(getMultiSigAddresses(this.network).safe),
            this.getContract(getMultiSigAddresses(this.network).safeFactory),
            this.getContract(getMultiSigAddresses(this.network).multiSend)
          ])
          this.call.setDecimalContractEVM(multiSend, 'multiSend')
          this.call.setDecimalContractEVM(safe, 'safe')
          this.call.setDecimalContractEVM(safeFactory, 'safeFactory')
        }
        break;
      case 'bridge':
        if (!this.call.bridgeV2) {
          const bridgeContarcts = await this.subgraph.getBridgeContracts()
          const abi = (await this.getContract(bridgeContarcts.implementation)).abi
          const bridgeV2 = await this.getContract(bridgeContarcts.id, abi);
          this.call.setDecimalContractEVM(bridgeV2, 'bridgeV2')
        }
        break;
      case 'checks':
        if (!this.call.checks) {
          //TODO
          //this.call.setDecimalContractEVM(checks, 'checks')
        }
        break;
      default:
        throw new Error(`Unknown contract pack name '${contractName}'`);
    }
  
  }

  private async initFromImplementation( contractName: string) {
    if (!this.contractAddesses) this.contractAddesses = await this.subgraph.getDecimalContracts();
    const contract = this.contractAddesses?.find((contract) => contract.name == contractName)
    if (!contract) throw new Error(`${contractName } not found in thegraph`);
    const abi = (await this.getContract(contract.implementation)).abi
    return await this.getContract(contract.address, abi)
  }

  // write function
  public async multiCall(callData: {
    target: string;
    value: string | number | bigint | BigNumberish;
    iface: string;
    params: any;
  }[], estimateGas?: boolean) {
    await this.checkConnect('multi-call')
    let calls: {
      target: string;
      value: string;
      callData: string;
    }[] = [];
    let valueSum: ethers.BigNumber = ethers.BigNumber.from(0);
    for (let i = 0; i < callData.length; i++) {
      let data: string;
      if (!!callData[i].iface) {
        const iFace = new ethers.utils.Interface([callData[i].iface]);
        const func = iFace.functions[Object.keys(iFace.functions)[0]]
        if (callData[i].params.length != Object.keys(func.inputs).length) throw Error(`The length of 'params' does not match the length of 'iface'`);
        data = iFace.encodeFunctionData(func.name, callData[i].params)
      } else {
        if (callData[i].params.length != 0) throw Error(`The length of 'params' does not match the length of 'iface'`);
        data = "0x";
      }
      calls.push({
        target: callData[i].target,
        value: callData[i].value.toString(),
        callData: data
      })
      valueSum = valueSum.add(ethers.BigNumber.from(callData[i].value))
    }
    return await this.call!.multicall(valueSum.toString(), calls, estimateGas)
  }

  public async multiSendToken(multiData: {
    token: string;
    to: string;
    amount: any;
  }[], estimateGas?: boolean) {
    const owner = this.account.address
    const spender = await this.getDecimalContractAddress('multi-call')
    let amountSum: {[token:string]: ethers.BigNumber} = {}
    let callDatas: {
      target: string;
      value: string | number | bigint | BigNumberish;
      iface: string;
      params: any;
    }[] = [];
    for (let i = 0; i < multiData.length; i++) {
      const tokenAddress = multiData[i].token;
      if (tokenAddress == 'del') continue;
      if (!amountSum[tokenAddress]) amountSum[tokenAddress] = ethers.BigNumber.from(0);
      amountSum[tokenAddress] = amountSum[tokenAddress].add(ethers.BigNumber.from(multiData[i].amount))
    }
    for (const tokenAddress of Object.keys(amountSum)) {
      const sign = await this.getSignPermitToken(tokenAddress, spender, amountSum[tokenAddress].toString())
      const deadline = ethers.constants.MaxUint256
      callDatas.push({
        target: tokenAddress,
        value: 0,
        iface: "function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)",
        params: [owner, spender, amountSum[tokenAddress], deadline, sign?.v, sign?.r, sign?.s ]
      })
    }
    for (let i = 0; i < multiData.length; i++) {
      const tokenAddress = multiData[i].token
      if (tokenAddress == 'del') {
        const to = multiData[i].to
        const amount = multiData[i].amount
        callDatas.push({
          target: to,
          value: amount,
          iface: "",
          params: []
        })
      } else {
        const to = multiData[i].to
        const amount = multiData[i].amount
        callDatas.push({
          target: tokenAddress,
          value: 0,
          iface: "function transferFrom(address from, address to, uint256 value)",
          params: [owner, to, amount]
        })
      }
    }
    return await this.multiCall(callDatas, estimateGas)
  }

  public async sendDEL(address: string, amount: string | number | bigint | BigNumberish, estimateGas?: boolean) {
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
    return this.sendDEL(ethers.constants.AddressZero, amount, estimateGas)
  }

  public async createToken(payload: Token, reserve: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    return await this.call!.createToken(payload, reserve, estimateGas)
  }

  public async convertToken(tokenIn:string, tokenOut: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    return await this.call!.convertToken(tokenIn, tokenOut, amountIn, amountOutMin, recipient, sign, estimateGas)
  }

  public async approveToken(tokenAddress: string, spender: string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.approveToken(token.contract, spender, amount, estimateGas)
  }

  public async transferToken(tokenAddress: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.transferToken(token.contract, to, amount, estimateGas)
  }

  public async transferFromToken(tokenAddress: string, from: string, to: string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.transferFromToken(token.contract, from, to, amount, estimateGas)
  }

  public async burnToken(tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.burnToken(token.contract, amount, estimateGas)
  }

  public async buyTokenForExactDEL(tokenAddress: string, amountDel: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.buyTokenForExactDEL(token.contract, amountDel, amountOutMin, recipient, estimateGas)
  }

  public async buyExactTokenForDEL(tokenAddress: string, amountDel: string | number | bigint, amountOut: string | number | bigint, recipient: string, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.buyExactTokenForDEL(token.contract, amountDel, amountOut, recipient, estimateGas)
  }

  public async sellTokensForExactDEL(tokenAddress: string, amountOut: string | number | bigint, amountInMax: string | number | bigint, recipient: string, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.sellTokensForExactDEL(token.contract, amountOut, amountInMax, recipient, estimateGas)
  }

  public async sellExactTokensForDEL(tokenAddress: string, amountIn: string | number | bigint, amountOutMin: string | number | bigint, recipient: string, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.sellExactTokensForDEL(token.contract, amountIn, amountOutMin, recipient, estimateGas)
  }

  public async updateDetailsToken(tokenAddress: string, newIdentity: string, newMaxTotalSupply: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.updateDetailsToken(token.contract, newIdentity, newMaxTotalSupply, estimateGas)
  }

  public async permitToken(tokenAddress: string, owner: string, spender: string, amount: string | number | bigint, sign: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('token-center');
    const token = await this.getContract(tokenAddress, this.abis?.token)
    return await this.call!.permitToken(token.contract, owner, spender, amount, sign, estimateGas)
  }

  public async createCollectionDRC721(payload:NFTCollection, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    return await this.call!.createCollection(payload, TypeNFT.DRC721, true, estimateGas)
  }

  public async createCollectionDRC1155(payload:NFTCollection, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    return await this.call!.createCollection(payload, TypeNFT.DRC1155, true, estimateGas)
  }

  public async createCollectionDRC721Reserveless(payload:NFTCollectionReserveless, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    return await this.call!.createCollection(payload, TypeNFT.DRC721, false, estimateGas)
  }

  public async createCollectionDRC1155Reserveless(payload:NFTCollectionReserveless, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    return await this.call!.createCollection(payload, TypeNFT.DRC1155, false, estimateGas)
  }

  public async approveNFT721(nftCollectionAddress: string, to: string, tokenId: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress) 
    if (/*typeNFT != TypeNFT.DRC721Standart && */ typeNFT != TypeNFT.DRC721) throw new Error(`Only for DRC721 and DRC721Standart`);
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call!.approveNFT721(nft.contract, to, tokenId, estimateGas)
  }

  public async approveForAllNFT(nftCollectionAddress: string, to: string, approved: boolean, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call!.setApprovalForAllNFT(nft.contract, to, approved, estimateGas)
  }
/*
  public async mintNFT(nftCollectionAddress: string, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    if (!this.call) throw this.isNotConnected;
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      case TypeNFT.DRC721:
      case TypeNFT.DRC1155:
        throw new Error(`The ${typeNFT} type is not supported by the mintNFT() method. Try mintNFTWithDELReserve() or mintNFTWithTokenReserve()`)
      case TypeNFT.DRC721Standart:
        return await this.call.mintNFT(nft.contract, to, tokenURI, undefined, undefined, estimateGas)
      case TypeNFT.DRC1155Standart:
        return await this.call.mintNFT(nft.contract, to, tokenURI, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }
*/
  public async mintReserveless(nftCollectionAddress: string, to: string, tokenURI: string, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      case TypeNFT.DRC721:
        return await this.call!.mintReserveless(nft.contract, to, tokenURI, tokenId, undefined, estimateGas)
      case TypeNFT.DRC1155:
        return await this.call!.mintReserveless(nft.contract, to, tokenURI, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async mintNFTWithDELReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserve: string | number | bigint, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      //case TypeNFT.DRC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the mintNFTWithDELReserve() and mintNFTWithTokenReserve() methods. Try mintNFT()`)
      case TypeNFT.DRC721:
        return await this.call!.mintNFTWithDELReserve(nft.contract, to, tokenURI, reserve, undefined, undefined, estimateGas)
      case TypeNFT.DRC1155:
        return await this.call!.mintNFTWithDELReserve(nft.contract, to, tokenURI, reserve, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async mintNFTWithTokenReserve(nftCollectionAddress: string, to: string, tokenURI: string, reserveAmount: string | number | bigint, reserveToken: string, sign?: ethers.Signature, tokenId?: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      //case TypeNFT.DRC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the mintNFTWithDELReserve() and mintNFTWithTokenReserve() methods. Try mintNFT()`)
      case TypeNFT.DRC721:
        return await this.call!.mintNFTWithTokenReserve(nft.contract, to, tokenURI, reserveAmount, reserveToken, sign, undefined, undefined, estimateGas)
      case TypeNFT.DRC1155:
        return await this.call!.mintNFTWithTokenReserve(nft.contract, to, tokenURI, reserveAmount, reserveToken, sign, tokenId, amount, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async addDELReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      //case TypeNFT.DRC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the addDELReserveNFT() and addTokenReserveNFT() methods.`)
      case TypeNFT.DRC721:
      case TypeNFT.DRC1155:
        return await this.call!.addDELReserveNFT(nft.contract, tokenId, amountReserve, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async addTokenReserveNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amountReserve: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      //case TypeNFT.DRC1155Standart:
      //  throw new Error(`The ${typeNFT} type is not supported by the addDELReserveNFT() and addTokenReserveNFT() methods.`)
      case TypeNFT.DRC721:
      case TypeNFT.DRC1155:
        return await this.call!.addTokenReserveNFT(nft.contract, tokenId, amountReserve, sign, estimateGas)
      default:
          throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async transferNFT(nftCollectionAddress: string, from: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      case TypeNFT.DRC721:
        return await this.call!.transferNFT(nft.contract, from, to, tokenId, undefined, estimateGas)
      //case TypeNFT.DRC1155Standart:
      case TypeNFT.DRC1155:
        return await this.call!.transferNFT(nft.contract, from, to, tokenId, amount, estimateGas)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async transferBatchNFT1155(nftCollectionAddress: string, from: string, to: string, tokenIds: string[] | number[], amounts: string[] | number[], estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    if (/*typeNFT != TypeNFT.DRC1155Standart &&*/ typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC1155 and DRC1155Standart`);
    return await this.call!.transferBatchNFT1155(nft.contract, from, to, tokenIds, amounts, estimateGas)
  }

  public async disableMintNFT(nftCollectionAddress: string, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call!.disableMintNFT(nft.contract, estimateGas)
  }

  public async burnNFT(nftCollectionAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      case TypeNFT.DRC721:
        return await this.call!.burnNFT(nft.contract, tokenId, undefined, estimateGas)
      //case TypeNFT.DRC1155Standart:
      case TypeNFT.DRC1155:
        return await this.call!.burnNFT(nft.contract, tokenId, amount, estimateGas)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  // public async setBaseURINFT(nftCollectionAddress: string, baseURI: string, estimateGas?: boolean) {
  //   await this.checkConnect('nft-center');
  //   const typeNFT = await this.getNftType(nftCollectionAddress)
  //   const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
  //   return await this.call!.setBaseURINFT(nft.contract, baseURI, estimateGas)
  // }

  public async setTokenURINFT(nftCollectionAddress: string, tokenId: string | number | bigint, tokenURI: string, estimateGas?: boolean) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(nftCollectionAddress)
    const nft = await this.getNFTContract(nftCollectionAddress, typeNFT)
    return await this.call!.setTokenURINFT(nft.contract, tokenId, tokenURI, estimateGas)
  }

  public async delegateDEL(validator:string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.delegateDEL(validator, amount, estimateGas)
  }

  public async delegateToken(validator:string, tokenAddress: string, amount: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.delegateToken(validator, tokenAddress, amount, sign, estimateGas)
  }

  public async transferStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, newValidator: string, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.transferStakeToken(validator, tokenAddress, amount, newValidator, estimateGas)
  }

  public async withdrawStakeToken(validator:string, tokenAddress: string, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.withdrawStakeToken(validator, tokenAddress, amount, estimateGas)
  }

  public async applyPenaltyToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.applyPenaltyToStakeToken(validator, delegator, tokenAddress, estimateGas)
  }

  public async applyPenaltiesToStakeToken(validator:string, delegator: string, tokenAddress: string, estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.applyPenaltiesToStakeToken(validator, delegator, tokenAddress, estimateGas)
  }
  public async completeStakeToken(indexes:string[] | number[], estimateGas?: boolean) {
    await this.checkConnect('delegation');
    return await this.call!.completeStakeToken(indexes, estimateGas)
  }

  public async delegateDRC721(validator:string, nftAddress: string, tokenId: string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('delegation-nft');
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.DRC721) throw new Error(`Only for DRC721`);
    return await this.call!.delegateDRC721(validator, nftAddress, tokenId, sign, estimateGas)
  }

  public async delegateDRC1155(validator:string, nftAddress: string, tokenId: string | number | bigint, amount:string | number | bigint, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('delegation-nft');
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC1155`);
    return await this.call!.delegateDRC1155(validator, nftAddress, tokenId, amount, sign, estimateGas)
  }

  public async transferStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, newValidator: string, amount?:string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('delegation-nft');
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.DRC721 && typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC721 and DRC1155`);
    return await this.call!.transferStakeNFT(validator, nftAddress, tokenId, newValidator, amount, estimateGas)
  }

  public async withdrawStakeNFT(validator:string, nftAddress: string, tokenId: string | number | bigint, amount?: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('delegation-nft');
    const typeNFT = await this.getNftType(nftAddress)
    if (typeNFT != TypeNFT.DRC721 && typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC721 and DRC1155`);
    return await this.call!.withdrawStakeNFT(validator, nftAddress, tokenId, amount, estimateGas)
  }
  public async completeStakeNFT(indexes:string[] | number[], estimateGas?: boolean) {
    await this.checkConnect('delegation-nft');
    return await this.call!.completeStakeNFT(indexes, estimateGas)
  }

  public async addValidatorWithToken(meta: ValidatorMeta, stake: ValidotorStake, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    const validator = meta.operator_address
    this.validationValidatorMeta(meta)
    return await this.call!.addValidatorWithToken(validator, JSON.stringify(meta), stake, sign, estimateGas)
  }

  public async addValidatorWithETH(meta: ValidatorMeta, amount: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    const validator = meta.operator_address
    this.validationValidatorMeta(meta)
    return await this.call!.addValidatorWithETH(validator, JSON.stringify(meta), amount, estimateGas)
  }

  public async removeValidator(validator: string, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    return await this.call!.removeValidator(validator, estimateGas)
  }

  public async pauseValidator(validator: string, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    return await this.call!.pauseValidator(validator, estimateGas)
  }

  public async unpauseValidator(validator: string, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    return await this.call!.unpauseValidator(validator, estimateGas)
  }

  public async updateValidatorMeta(meta: ValidatorMeta, estimateGas?: boolean) {
    await this.checkConnect('master-validator');
    const validator = meta.operator_address
    this.validationValidatorMeta(meta)
    return await this.call!.updateValidatorMeta(validator, JSON.stringify(meta), estimateGas)
  }
  
  private async buildMultiSigTxSendDEL(safeAddress: string, to: string, amount: string | number | bigint): Promise<SafeTransaction> {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    return buildSafeTransaction({ to: to, value: amount, nonce: await safe.contract.nonce() });
  }

  private async buildMultiSigTxSendToken(safeAddress: string, tokenAddress: string, to: string, amount: string | number | bigint): Promise<SafeTransaction> {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    const iFace = new ethers.utils.Interface(["function transfer(address to, uint256 value)"]);
    const data = iFace.encodeFunctionData('transfer', [to, amount])
    return buildSafeTransaction({ data, to: tokenAddress, nonce: await safe.contract.nonce() });
  }

  private async buildMultiSigTxSendNFT(safeAddress: string, tokenAddress: string, to: string, tokenId: string | number | bigint, amount?: string | number | bigint): Promise<SafeTransaction> {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    let data: string;
    if (amount === undefined) {
      const iFace = new ethers.utils.Interface(["function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)"]);
      data = iFace.encodeFunctionData('safeTransferFrom', [safeAddress, to, tokenId, "0x"])
    } else {
      const iFace = new ethers.utils.Interface(["function safeTransferFrom(address from, address to, uint256 tokenId, uint256 value, bytes data)"]);
      data = iFace.encodeFunctionData('safeTransferFrom', [safeAddress, to, tokenId, amount, "0x"])
    }
    return buildSafeTransaction({ data, to: tokenAddress, nonce: await safe.contract.nonce() });
  }

  private async signMultiSigTx(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature> {
    await this.checkConnect('multi-sig');
    return await this.call!.signMultiSigTx(safeAddress, safeTx);
  }

  private async approveHashMultiSig(safeAddress: string, safeTx: SafeTransaction): Promise<SafeSignature> {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    return await safeApproveHash(this.account, safe.contract, safeTx)
  }

  private async getSignatureForParticipant(participantAddress: string): Promise<SafeSignature> {
    await this.checkConnect('multi-sig');
    return {
      signer: participantAddress,
      data:
          "0x000000000000000000000000" +
          participantAddress.slice(2) +
          "0000000000000000000000000000000000000000000000000000000000000000" +
          "01",
    };
 }

  private async executeMultiSigTx(safeAddress: string, safeTx: SafeTransaction, signatures: SafeSignature[], estimateGas?: boolean) {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    return await this.call!.executeMultiSigTx(safeTx, signatures, safe.contract, estimateGas) 
  }

  private async createMultiSig(ownersData: {
    owner: string;
    weight: number;
  }[], weightThreshold?: number, estimateGas?: boolean) {
    await this.checkConnect('multi-sig');
    let totalWeight = 0;
    for (let i = 0; i < ownersData.length; i++) {
      if (ownersData[i].weight < 1 || ownersData[i].weight > 1000)  throw new Error("Invalid owner weight")
        totalWeight += ownersData[i].weight
    }
    if (weightThreshold === 0) throw new Error("Invalid weightThreshold")
    if (weightThreshold) {
      if (weightThreshold > totalWeight) throw new Error("Invalid weightThreshold. weightThreshold must not exceed total weight of owners")
    } else {
      weightThreshold = ownersData.reduce((sum, num) => sum + num.weight, 0);
    }
    return await this.call!.createMultiSig(ownersData, weightThreshold, estimateGas) 
  }

  private async getNonceMultiSig(safeAddress: string) {
    await this.checkConnect('multi-sig');
    const safe = await this.getContract(safeAddress, this.call!.safe!.contract.interface)
    return await this.call!.getNonceMultiSig(safe.contract)
  }

  private async getCurrentApproveTransactions(safeAddress: string) {
    await this.checkConnect('multi-sig');
    const nonce = await this.getNonceMultiSig(safeAddress)
    const transactionData = await this.subgraph.getMultisigApproveTransactionsByMultisigAddressAndNonce(safeAddress, nonce, 1000, 0)
    return <SafeTransaction[]>transactionData.map((trancastion: any) => {
      return {
        ...trancastion,
        safeTxGas: ethers.BigNumber.from(trancastion.safeTxGas),
        baseGas: ethers.BigNumber.from(trancastion.baseGas),
        gasPrice: ethers.BigNumber.from(trancastion.gasPrice),
        nonce: ethers.BigNumber.from(trancastion.nonce),
        value: ethers.BigNumber.from(trancastion.value),
        operation: Number(trancastion.operation),
      }
    })
  }

  private decodeMultiSigSafeTransaction(safeTx: SafeTransaction): {
    action: string;
    tokenType: string;
    token: string;
    to: string;
    tokenId?: string;
    amount?: string;
  } {
    if (safeTx.data == "0x") return {
      action: 'transfer',
      tokenType: 'Native',
      token: 'DEL',
      to: safeTx.to,
      amount: safeTx.value.toString()
    }
    const resultTransferDRC20 = this.decodeData("function transfer(address to, uint256 value)", safeTx.data)
    if (resultTransferDRC20) return {
      action: 'transfer',
      tokenType: 'DRC20',
      token: safeTx.to,
      to: resultTransferDRC20[0],
      amount: resultTransferDRC20[1]
    }
    const resultTransferDRC721 = this.decodeData("function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)", safeTx.data)
    if (resultTransferDRC721) return {
      action: 'transfer',
      tokenType: 'DRC721',
      token: safeTx.to,
      to: resultTransferDRC721[1],
      tokenId: resultTransferDRC721[2],
    }
    const resultTransferDRC1155 = this.decodeData("function safeTransferFrom(address from, address to, uint256 tokenId, uint256 value, bytes data)", safeTx.data)
    if (resultTransferDRC1155) return {
      action: 'transfer',
      tokenType: 'DRC1155',
      token: safeTx.to,
      to: resultTransferDRC1155[1],
      tokenId: resultTransferDRC1155[2],
      amount: resultTransferDRC1155[3]
    }
    throw Error('Dot')
  }

  private decodeData(interFace: string, data: string) {
    try {
      const iFace = new ethers.utils.Interface([interFace]);
      const func = iFace.functions[Object.keys(iFace.functions)[0]]
      return iFace.decodeFunctionData(func.name, data)
    } catch {
      return undefined
    }
  }

  public async bridgeTransferDEL(to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
    await this.checkConnect('bridge');
    return await this.call!.wrapAndTransferETH(to, amount, serviceFee, toChainId, estimateGas);
  }

  public async bridgeTransferTokens(tokenAddress: string, to: string, amount: string | number | bigint, serviceFee: string | number | bigint, toChainId: number, estimateGas?: boolean) {
    await this.checkConnect('bridge');
    //TODO check chainId
    return await this.call!.transferTokens(tokenAddress, to, amount, serviceFee, toChainId, estimateGas);
  }

  public async createChecksDEL(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, estimateGas?: boolean) {
    await this.checkConnect('checks');
    return await this.call!.createChecksDEL(passwords, amount, dueBlock, estimateGas);
  }

  public async createChecksToken(passwords: string[], amount: string | number | bigint, dueBlock: string | number | bigint, tokenAddress: string, sign?: ethers.Signature, estimateGas?: boolean) {
    await this.checkConnect('checks');
    return await this.call!.createChecksToken(passwords, amount, dueBlock, tokenAddress, sign, estimateGas);
  }

  public async redeemChecks(passwords: string[], checks: string[], estimateGas?: boolean) {
    await this.checkConnect('checks');
    return await this.call!.redeemChecks(passwords, checks, false, estimateGas);
  }

  public async redeemChecksTest(passwords: string[], checks: string[]) {
    await this.checkConnect('checks');
    return await this.call!.redeemChecks(passwords, checks, true, false);
  }

  // view function

  public async getBalance(address: string) {
    return await this.provider.getBalance(address)
  }

  public async getNftType(address: string): Promise<TypeNFT> {
    const type = await this.subgraph.getNftCollectionType(address)
    if (type == null) throw new Error("The nft collection does not exist")
    let typeNFT: TypeNFT = TypeNFT[type as keyof typeof TypeNFT]
    return typeNFT
  }

  public async getNftTypeFromContract(address: string) {
    await this.checkConnect('nft-center');
    return await this.call!.getNftType(address)
  }

  public async getAddressTokenBySymbol(symbol: string) {
    await this.checkConnect('token-center');
    return await this.call!.getAddressTokenBySymbol(symbol)
  }

  public async checkTokenExists(address: string) {
    await this.checkConnect('token-center');
    return await this.call!.checkTokenExists(address)
  }

  public async getCommissionSymbol(symbol:string) {
    await this.checkConnect('token-center');
    return await this.call!.getCommissionSymbol(symbol)
  }

  public async calculateBuyOutput(address: string, amount: string | number | bigint) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.calculateBuyOutput(token.contract, amount)
  }
  public async calculateBuyInput(address: string, amount: string | number | bigint) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.calculateBuyInput(token.contract, amount)
  }
  public async calculateSellInput(address: string, amount: string | number | bigint) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.calculateSellInput(token.contract, amount)
  }
  public async calculateSellOutput(address: string, amount: string | number | bigint) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.calculateSellOutput(token.contract, amount)
  }
  public async getSignPermitToken(address: string, spender: string, amount: string | number | bigint): Promise<ethers.Signature> {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.getSignPermitToken(token.contract, spender, amount)
  }
  public async allowanceToken(address: string, owner: string, spender: string) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.allowanceToken(token.contract, owner, spender)
  }
  public async balanceOfToken(address: string, account: string) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.balanceOfToken(token.contract, account) 
  }
  public async supportsInterfaceToken(address: string, interfaceId: string) {
    await this.checkConnect('token-center');
    const token = await this.getContract(address, this.abis?.token)
    return await this.call!.supportsInterfaceToken(token.contract, interfaceId) 
  }

  public async getApprovedNFT721(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(address)
    if (/*typeNFT != TypeNFT.DRC721Standart &&*/ typeNFT != TypeNFT.DRC721) throw new Error(`Only for DRC721 and DRC721Standart`);
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call!.getApprovedNFT721(nft.contract, tokenId) 
  }

  public async getAllowMintNFT(address: string) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call!.getAllowMintNFT(nft.contract) 
  }

  public async isApprovedForAllNFT(address: string, owner: string, operator: string) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call!.isApprovedForAllNFT(nft.contract, owner, operator) 
  }

  public async ownerOfNFT721(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT = await this.getNftType(address)
    if (/*typeNFT != TypeNFT.DRC721Standart &&*/ typeNFT != TypeNFT.DRC721) throw new Error(`Only for DRC721 and DRC721Standart`);
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call!.ownerOfNFT721(nft.contract, tokenId) 
  }

  public async getTokenURINFT(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      case TypeNFT.DRC721:
        return await this.call!.getTokenURINFT721(nft.contract, tokenId)
      //case TypeNFT.DRC1155Standart:
      case TypeNFT.DRC1155:
        return await this.call!.getTokenURINFT1155(nft.contract, tokenId)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async balanceOfNFT(address: string, account:string, tokenId?: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    switch (+TypeNFT[TypeNFT[typeNFT] as keyof typeof TypeNFT]) {
      //case TypeNFT.DRC721Standart:
      case TypeNFT.DRC721:
        return await this.call!.balanceOfNFT(nft.contract, account)
      //case TypeNFT.DRC1155Standart:
      case TypeNFT.DRC1155:
        if (tokenId === undefined) throw new Error(`You need to specify the tokenId`)
        return await this.call!.balanceOfNFT(nft.contract, account, tokenId)
      default:
        throw new Error(`The ${typeNFT} type does not exist`)
    }
  }

  public async supportsInterfaceNFT(address: string, interfaceId: string) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    return await this.call!.supportsInterfaceNFT(nft.contract, interfaceId) 
  }

  public async getRateNFT1155(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC1155`);
    return await this.call!.getRateNFT1155(nft.contract, tokenId) 
  }

  public async calcReserveNFT1155(address: string, tokenId: string | number | bigint, quantity:string | number | bigint) {
    const rate = await this.getRateNFT1155(address, tokenId)
    return (BigInt(rate) * BigInt(quantity)).toString()
  }

  public async getReserveNFT(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC721 && typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC721 and DRC1155`);
    return await this.call!.getReserveNFT(nft.contract, tokenId) 
  }
  
  public async getRefundableNFT(address: string) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC721 && typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC721 and DRC1155`);
    return await this.call!.getRefundableNFT(nft.contract) 
  }

  public async getSupplyNFT1155(address: string, tokenId: string | number | bigint) {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC1155`);
    return await this.call!.getSupplyNFT1155(nft.contract, tokenId) 
  }

  public async getTokenStakesByMember(account:string) {
    await this.checkConnect('delegation');
    return this.call!.getTokenStakesByMember(account)
  }
  
  public async getTokenStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
    await this.checkConnect('delegation');
    return await this.call!.getTokenStakesPageByMember(account, size, offset)
  }

  public async getFrozenStakesQueueToken() {
    await this.checkConnect('delegation');
    return await this.call!.getFrozenStakesQueueToken()
  }

  public async getFreezeTimeToken() {
    await this.checkConnect('delegation');
    return await this.call!.getFreezeTimeToken()
  }

  public async getStakeToken(validator: string, delegator: string, tokenAddress: string) {
    await this.checkConnect('delegation');
    return await this.call!.getStakeToken(validator, delegator, tokenAddress)
  }
  public async getStakeIdToken(validator: string, delegator: string, tokenAddress: string) {
    await this.checkConnect('delegation');
    return await this.call!.getStakeIdToken(validator, delegator, tokenAddress)
  }

  public async getNFTStakesByMember(account:string) {
    await this.checkConnect('delegation-nft');
    return this.call!.getNFTStakesByMember(account)
  }
  
  public async getNFTStakesPageByMember(account: string, size: string | number | bigint, offset: string | number | bigint) {
    await this.checkConnect('delegation-nft');
    return await this.call!.getNFTStakesPageByMember(account, size, offset)
  }

  public async getFrozenStakesQueueNFT() {
    await this.checkConnect('delegation-nft');
    return await this.call!.getFrozenStakesQueueNFT()
  }

  public async getFreezeTimeNFT() {
    await this.checkConnect('delegation-nft');
    return await this.call!.getFreezeTimeNFT()
  }

  public async getSignPermitDRC721(address: string, spender: string, tokenId: string | number | bigint): Promise<ethers.Signature> {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC721) throw new Error(`Only for DRC721`);
    return await this.call!.getSignPermitDRC721(nft.contract, spender, tokenId)
  }

  public async getSignPermitDRC1155(address: string, spender: string): Promise<ethers.Signature> {
    await this.checkConnect('nft-center');
    const typeNFT: TypeNFT = await this.getNftType(address)
    const nft = await this.getNFTContract(address, typeNFT)
    if (typeNFT != TypeNFT.DRC1155) throw new Error(`Only for DRC1155`);
    return await this.call!.getSignPermitDRC1155(nft.contract, spender)
  }

  public async getValidatorStatus(validator: string): Promise<ValidatorStatus> {
    await this.checkConnect('master-validator');
    return await this.call!.getValidatorStatus(validator)
  }

  public async validatorIsActive(validator: string) {
    await this.checkConnect('master-validator');
    return await this.call!.validatorIsActive(validator)
  }

  public async validatorIsMember(validator: string) {
    await this.checkConnect('master-validator');
    return await this.call!.validatorIsMember(validator)
  }

  public async getBridgeServiceFees(toChainId: number) {
    await this.checkConnect('bridge');
    return await this.call!.getBridgeV2ServiceFees(toChainId)
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

  public getRandomPassword(count: number, length: number): string[] {
    const passwords = [];
    for (let i = 0; i < count; i++) {
      passwords.push(ethers.utils.hexlify(ethers.utils.randomBytes(length)).slice(2))
    }
    return passwords;
  }

  private async getNFTContract(address: string, typeNFT: TypeNFT) {
    switch (typeNFT as TypeNFT) {
      //case TypeNFT.DRC721Standart:
      //  return await this.getContract(address)
      //case TypeNFT.DRC1155Standart:
      //  return await this.getContract(address)
      case TypeNFT.DRC721:
        return await this.getContract(address, this.abis?.drc721)
      case TypeNFT.DRC1155:
        return await this.getContract(address, this.abis?.drc1155)
      default:
        throw new Error(`type ${typeNFT} not exist`)
    }
  }

  public async getDecimalContractAddress(contract: string): Promise<string> {
    await this.checkConnect(contract);
    return <string>this.call!.getDecimalContract(contract, true).toString()
  }

  public async getDecimalContract(contract: string): Promise<ethers.Contract> {
    await this.checkConnect(contract);
    return <ethers.Contract>this.call!.getDecimalContract(contract)
  }

  public async getLatestBlock() {
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
  public async uploadNFTBase64ToIPFS(base64: string, fileName:string, name:string, description:string) {
    var base64Image;
    if (base64.includes(';base64,')) {
      base64Image = base64.split(';base64,').pop();
    } else {
      base64Image = base64;
    }
    const buffer = Buffer.from(base64Image!, 'base64');
    const blob = new Blob([buffer], { type: base64.split(';base64,')[0].split(':')[1] })
    return await this.ipfs.uploadNFTBlobToIPFS(blob, fileName, name, description);
  }

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