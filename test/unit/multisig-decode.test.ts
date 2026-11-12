import { ethers } from 'ethers'
import { DecimalEVM, DecimalNetworks, Wallet } from '../../src/index'
import { buildSafeTransaction, MetaTransaction, SafeTransaction } from '../../src/decimalevm/multisig/execution'
import { encodeMultiSend } from '../../src/decimalevm/multisig/multisend'

// decodeTransaction is pure: it never touches the network, so a throwaway wallet is enough.
const evm = new DecimalEVM(new Wallet(''), DecimalNetworks.testnet)
const decode = (tx: SafeTransaction) => evm.multisig.decodeTransaction(tx)

const SAFE = '0x00000000000000000000000000000000000000aa'
const DELEGATION = '0x00000000000000000000000000000000000000d1'
const VALIDATOR = '0x1111111111111111111111111111111111111111'
const NEW_VALIDATOR = '0x2222222222222222222222222222222222222222'
const TOKEN = '0x3333333333333333333333333333333333333333'
const NFT = '0x4444444444444444444444444444444444444444'
const TO = '0x5555555555555555555555555555555555555555'
const MULTISEND = '0x6666666666666666666666666666666666666666'

const encode = (signature: string, args: unknown[]) => {
  const iface = new ethers.Interface([signature])
  return iface.encodeFunctionData(iface.fragments[0] as ethers.FunctionFragment, args)
}
const call = (to: string, signature: string, args: unknown[], value: bigint = 0n) =>
  buildSafeTransaction({ to, data: encode(signature, args), value, nonce: 0 })
const multiSend = (txs: MetaTransaction[]) =>
  buildSafeTransaction({
    to: MULTISEND,
    data: encode('function multiSend(bytes transactions)', [encodeMultiSend(txs)]),
    operation: 1,
    nonce: 0,
  })

describe('multisig.decodeTransaction', () => {
  test('native DEL transfer', () => {
    expect(decode(buildSafeTransaction({ to: TO, value: 5n, nonce: 0 }))).toEqual({
      action: 'transfer', tokenType: 'Native', token: 'DEL', to: TO, amount: '5',
    })
  })

  test('DRC20 transfer and burn', () => {
    expect(decode(call(TOKEN, 'function transfer(address to, uint256 value)', [TO, 7n]))).toEqual({
      action: 'transfer', tokenType: 'DRC20', token: TOKEN, to: ethers.getAddress(TO), amount: '7',
    })
    expect(decode(call(TOKEN, 'function burn(uint256 amount)', [9n]))).toMatchObject({
      action: 'burn', tokenType: 'DRC20', token: TOKEN, amount: '9',
    })
  })

  test('NFT transfers', () => {
    expect(decode(call(NFT, 'function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)', [SAFE, TO, 3n, '0x']))).toEqual({
      action: 'transfer', tokenType: 'DRC721', token: NFT, to: ethers.getAddress(TO), tokenId: '3',
    })
    expect(decode(call(NFT, 'function safeTransferFrom(address from, address to, uint256 tokenId, uint256 value, bytes data)', [SAFE, TO, 3n, 2n, '0x']))).toEqual({
      action: 'transfer', tokenType: 'DRC1155', token: NFT, to: ethers.getAddress(TO), tokenId: '3', amount: '2',
    })
  })

  test('DEL delegation (plain and hold)', () => {
    expect(decode(call(DELEGATION, 'function delegateDEL(address validator)', [VALIDATOR], 10n))).toEqual({
      action: 'delegate', tokenType: 'Native', token: 'DEL', to: ethers.getAddress(VALIDATOR), amount: '10',
    })
    expect(decode(call(DELEGATION, 'function delegateHoldDEL(address validator, uint256 holdTimestamp)', [VALIDATOR, 1234n], 10n))).toMatchObject({
      action: 'delegate', tokenType: 'Native', amount: '10', holdTimestamp: '1234',
    })
  })

  test('token stake redelegate / unbond (plain and hold)', () => {
    expect(decode(call(DELEGATION, 'function transfer(address validator, address token, uint256 amount, address newValidator)', [VALIDATOR, TOKEN, 4n, NEW_VALIDATOR]))).toEqual({
      action: 'redelegate', tokenType: 'DRC20', token: ethers.getAddress(TOKEN), to: ethers.getAddress(VALIDATOR), amount: '4', newValidator: ethers.getAddress(NEW_VALIDATOR),
    })
    expect(decode(call(DELEGATION, 'function withdraw(address validator, address token, uint256 amount)', [VALIDATOR, TOKEN, 4n]))).toMatchObject({
      action: 'unbond', tokenType: 'DRC20', amount: '4',
    })
    expect(decode(call(DELEGATION, 'function transferHold(address validator, address token, uint256 amount, uint256 holdTimestamp, address newValidator)', [VALIDATOR, TOKEN, 4n, 99n, NEW_VALIDATOR]))).toMatchObject({
      action: 'redelegate', tokenType: 'DRC20', holdTimestamp: '99', newValidator: ethers.getAddress(NEW_VALIDATOR),
    })
    expect(decode(call(DELEGATION, 'function withdrawHold(address validator, address token, uint256 amount, uint256 holdTimestamp)', [VALIDATOR, TOKEN, 4n, 99n]))).toMatchObject({
      action: 'unbond', tokenType: 'DRC20', holdTimestamp: '99',
    })
  })

  test('NFT stake unbond / redelegate via the delegation contract', () => {
    expect(decode(call(DELEGATION, 'function withdrawNFT(address validator, address nftAddress, uint256 tokenId)', [VALIDATOR, NFT, 1n]))).toEqual({
      action: 'unbond', tokenType: 'DRC721', token: ethers.getAddress(NFT), to: ethers.getAddress(VALIDATOR), tokenId: '1',
    })
    expect(decode(call(DELEGATION, 'function withdrawNFT1155(address validator, address nftAddress, uint256 tokenId)', [VALIDATOR, NFT, 1n]))).toMatchObject({
      action: 'unbond', tokenType: 'DRC1155', tokenId: '1',
    })
    expect(decode(call(DELEGATION, 'function transferNFT(address oldValidator, address nftAddress, uint256 tokenId, address newValidator)', [VALIDATOR, NFT, 1n, NEW_VALIDATOR]))).toMatchObject({
      action: 'redelegate', tokenType: 'DRC721', newValidator: ethers.getAddress(NEW_VALIDATOR),
    })
    expect(decode(call(DELEGATION, 'function transferNFT1155(address oldValidator, address nftAddress, uint256 tokenId, address newValidator)', [VALIDATOR, NFT, 1n, NEW_VALIDATOR]))).toMatchObject({
      action: 'redelegate', tokenType: 'DRC1155',
    })
  })

  test('MultiSend approve + delegate (token, token hold, DRC721, DRC1155)', () => {
    const approve = { to: TOKEN, value: 0, operation: 0, data: encode('function approve(address spender, uint256 amount)', [DELEGATION, 4n]) }
    const inner = (signature: string, args: unknown[]) => ({ to: DELEGATION, value: 0, operation: 0, data: encode(signature, args) })

    expect(decode(multiSend([approve, inner('function delegate(address validator, address token, uint256 amount)', [VALIDATOR, TOKEN, 4n])]))).toEqual({
      action: 'delegate', tokenType: 'DRC20', token: ethers.getAddress(TOKEN), to: ethers.getAddress(VALIDATOR), amount: '4',
    })
    expect(decode(multiSend([approve, inner('function delegateHold(address validator, address token, uint256 amount, uint256 holdTimestamp)', [VALIDATOR, TOKEN, 4n, 55n])]))).toMatchObject({
      action: 'delegate', tokenType: 'DRC20', holdTimestamp: '55',
    })
    expect(decode(multiSend([approve, inner('function delegateNFT(address validator, address nftAddress, uint256 tokenId)', [VALIDATOR, NFT, 8n])]))).toEqual({
      action: 'delegate', tokenType: 'DRC721', token: ethers.getAddress(NFT), to: ethers.getAddress(VALIDATOR), tokenId: '8',
    })
    expect(decode(multiSend([approve, inner('function delegateNFT1155(address validator, address nftAddress, uint256 tokenId, uint256 amount)', [VALIDATOR, NFT, 8n, 3n])]))).toMatchObject({
      action: 'delegate', tokenType: 'DRC1155', tokenId: '8', amount: '3',
    })
  })

  test('calls of the removed delegation-nft contract are not recognized', () => {
    expect(() => decode(multiSend([
      { to: NFT, value: 0, operation: 0, data: encode('function approve(address to, uint256 tokenId)', [DELEGATION, 8n]) },
      { to: DELEGATION, value: 0, operation: 0, data: encode('function delegateDRC721(address validator, address nftAddress, uint256 tokenId)', [VALIDATOR, NFT, 8n]) },
    ]))).toThrow('Unknown MultiSend inner transaction')
    expect(() => decode(call(DELEGATION, 'function withdraw(address validator, address nftAddress, uint256 tokenId, uint256 amount)', [VALIDATOR, NFT, 1n, 1n]))).toThrow()
  })
})
