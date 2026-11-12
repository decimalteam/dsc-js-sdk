/**
 * Live end-to-end tests against Decimal testnet. They send real (testnet) transactions.
 *
 *   DSC_TEST_MNEMONIC="..." npm run test:testnet
 *
 * The wallet (account #0 of the mnemonic) needs a few thousand tDEL. Account #1 of the same
 * mnemonic is used as the second party. Steps run in order and share state (created token,
 * collections, multisig); a failed step usually fails the steps that depend on it.
 */
import { ethers } from 'ethers'
import { DecimalEVM, DecimalNetworks, Subgraph, Wallet } from '../../src/index'

const MNEMONIC = process.env.DSC_TEST_MNEMONIC
const describeLive = MNEMONIC ? describe : describe.skip

jest.setTimeout(5 * 60 * 1000)

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Polls `fn` until it returns a truthy value (the subgraph lags behind the chain). */
async function waitFor<T>(fn: () => Promise<T>, timeoutMs = 180_000, stepMs = 5_000): Promise<T> {
  const started = Date.now()
  let last: unknown
  for (;;) {
    try {
      const value = await fn()
      if (value) return value
    } catch (e) {
      last = e
    }
    if (Date.now() - started > timeoutMs) throw new Error(`waitFor timed out${last ? `: ${last}` : ''}`)
    await sleep(stepMs)
  }
}

const addr = (a: string) => ethers.getAddress(a)

const ok = (receipt: any) => {
  expect(receipt).toBeTruthy()
  expect(receipt.status).toBe(1)
  return receipt
}

describeLive('DSC SDK on testnet', () => {
  const network = DecimalNetworks.testnet
  let wallet: Wallet
  let evm: DecimalEVM
  let subgraph: Subgraph
  let me: string
  let other: string // account #1 of the same mnemonic
  let validator1: string
  let validator2: string
  // token symbols may contain letters only
  const suffix = Date.now().toString().slice(-6).split('').map((d) => String.fromCharCode(97 + Number(d))).join('')
  const state: {
    token?: string
    tokenReserveless?: string
    nft721?: string
    nft1155?: string
    nft721Reserveless?: string
    ids721: bigint[]
    multisig?: string
  } = { ids721: [] }

  const DEL = (v: string | number) => ethers.parseEther(String(v))
  const holdTimestamp = async (days = 30) => (await evm.getLatestBlock())!.timestamp + days * 86400

  beforeAll(async () => {
    wallet = new Wallet(MNEMONIC!)
    const second = new Wallet(MNEMONIC!)
    second.generateAndSwitchAccount(2, 1)
    me = wallet.evmAddress!
    other = second.evmAddress!

    evm = new DecimalEVM(wallet, network)
    await evm.connect()
    subgraph = new Subgraph(network)

    const validators = await subgraph.getValidators()
    const active: string[] = []
    for (const v of validators) {
      const address = (v as any).address ?? (v as any).id
      if (await evm.validatorIsActive(address)) active.push(address)
      if (active.length === 2) break
    }
    expect(active.length).toBe(2)
    ;[validator1, validator2] = active
  })

  describe('DEL', () => {
    test('balance, fee data, latest block', async () => {
      expect(await evm.getBalance(me)).toBeGreaterThan(DEL(100))
      const fee = await evm.getFeeData()
      expect(typeof fee.gasPrice).toBe('bigint')
      expect((await evm.getLatestBlock())!.number).toBeGreaterThan(0)
    })

    test('sendDEL (estimate + send)', async () => {
      const gas = await evm.sendDEL(other, DEL(1), true)
      expect(typeof gas).toBe('bigint')
      const before = await evm.getBalance(other)
      ok(await evm.sendDEL(other, DEL(1)))
      expect(await evm.getBalance(other)).toBe(before + DEL(1))
    })

    test('burnDEL', async () => {
      ok(await evm.burnDEL(DEL('0.001')))
    })

    test('multiCall with memo + parseMemo', async () => {
      const receipt = ok(await evm.multiCall([{ target: other, value: DEL('0.01'), iface: '', params: [] }], 'sdk-test memo'))
      expect(await evm.parseMemo(receipt.hash)).toBe('sdk-test memo')
    })
  })

  describe('Token', () => {
    const symbol = `sdkt${suffix}`

    test('createToken', async () => {
      const commission = await evm.getCommissionSymbol(symbol) // 7-10 letters: 250 DEL, added to the reserve
      expect(typeof commission).toBe('bigint')
      const { tx, tokenAddress } = await evm.createToken({
        creator: me,
        symbol,
        name: `SDK test ${suffix}`,
        crr: 50,
        initialMint: DEL(1000),
        minTotalSupply: DEL(1),
        maxTotalSupply: DEL(5_000_000),
        identity: 'sdk-test',
      }, DEL(1000) + commission)
      ok(tx)
      expect(ethers.isAddress(tokenAddress)).toBe(true)
      state.token = tokenAddress
      expect(await evm.checkTokenExists(tokenAddress)).toBe(true)
      expect((await evm.getAddressTokenBySymbol(symbol)).toLowerCase()).toBe(tokenAddress.toLowerCase())
    })

    test('calculate* views', async () => {
      for (const fn of ['calculateBuyOutput', 'calculateBuyInput', 'calculateSellInput', 'calculateSellOutput'] as const) {
        expect(typeof (await (evm as any)[fn](state.token!, DEL(1)))).toBe('bigint')
      }
    })

    test('buy and sell', async () => {
      ok(await evm.buyTokenForExactDEL(state.token!, DEL(10), 0, me))
      ok(await evm.sellExactTokensForDEL(state.token!, DEL(1), 0, me))
      const maxDel = await evm.calculateBuyInput(state.token!, DEL(1))
      ok(await evm.buyExactTokenForDEL(state.token!, (maxDel * 11n) / 10n, DEL(1), me))
      const maxIn = await evm.calculateSellInput(state.token!, DEL('0.5'))
      ok(await evm.sellTokensForExactDEL(state.token!, DEL('0.5'), (maxIn * 11n) / 10n, me))
    })

    test('approve, allowance, transfer, balanceOf', async () => {
      ok(await evm.approveToken(state.token!, other, DEL(5)))
      expect(await evm.allowanceToken(state.token!, me, other)).toBe(DEL(5))
      ok(await evm.transferToken(state.token!, other, DEL(2)))
      expect(await evm.balanceOfToken(state.token!, other)).toBe(DEL(2))
    })

    test('getSignPermitToken + permitToken', async () => {
      const sign = await evm.getSignPermitToken(state.token!, other, DEL(3))
      expect(sign).toBeInstanceOf(ethers.Signature)
      ok(await evm.permitToken(state.token!, me, other, DEL(3), sign))
      expect(await evm.allowanceToken(state.token!, me, other)).toBe(DEL(3))
    })

    test('burnToken', async () => {
      const before = await evm.balanceOfToken(state.token!, me)
      ok(await evm.burnToken(state.token!, DEL(1)))
      expect(await evm.balanceOfToken(state.token!, me)).toBe(before - DEL(1))
    })

    test('update identity / max supply', async () => {
      ok(await evm.updateTokenIdentity(state.token!, 'sdk-test-2'))
      ok(await evm.updateTokenMaxTotalSupply(state.token!, DEL(6_000_000)))
    })

    test('createTokenReserveless + mintTokenReserveless', async () => {
      const { tx, tokenAddress } = await evm.createTokenReserveless(`SDK free ${suffix}`, `sdkf${suffix}`, true, true, DEL(100), DEL(1_000_000), 'sdk-test')
      ok(tx)
      state.tokenReserveless = tokenAddress
      ok(await evm.mintTokenReserveless(tokenAddress, DEL(10), me))
      expect(await evm.balanceOfToken(tokenAddress, me)).toBe(DEL(110))
    })

    test('multiSendToken (token + DEL)', async () => {
      const before = await evm.balanceOfToken(state.token!, other)
      ok(await evm.multiSendToken([
        { token: state.token!, to: other, amount: DEL(1) },
        { token: 'del', to: other, amount: DEL('0.01') },
      ], 'sdk multisend'))
      expect(await evm.balanceOfToken(state.token!, other)).toBe(before + DEL(1))
    })
  })

  describe('Delegation (DEL / token)', () => {
    test('delegateDEL', async () => {
      ok(await evm.delegateDEL(validator1, DEL(1)))
    })

    test('delegateDELHold', async () => {
      ok(await evm.delegateDELHold(validator1, DEL(1), await holdTimestamp()))
    })

    test('delegateToken (approve)', async () => {
      const delegation = await evm.getDecimalContractAddress('delegation')
      ok(await evm.approveToken(state.token!, delegation, DEL(3)))
      ok(await evm.delegateToken(validator1, state.token!, DEL(3)))
      const stake = await evm.getStakeToken(validator1, me, state.token!)
      expect(stake).toBeDefined()
    })

    test('delegateToken (permit)', async () => {
      const delegation = await evm.getDecimalContractAddress('delegation')
      const sign = await evm.getSignPermitToken(state.token!, delegation, DEL(1))
      ok(await evm.delegateToken(validator1, state.token!, DEL(1), sign))
    })

    test('delegateTokenHold (permit)', async () => {
      const delegation = await evm.getDecimalContractAddress('delegation')
      const sign = await evm.getSignPermitToken(state.token!, delegation, DEL(1))
      ok(await evm.delegateTokenHold(validator1, state.token!, DEL(1), await holdTimestamp(), sign))
    })

    test('transferStakeToken', async () => {
      ok(await evm.transferStakeToken(validator1, state.token!, DEL(1), validator2))
    })

    test('withdrawStakeToken', async () => {
      ok(await evm.withdrawStakeToken(validator1, state.token!, DEL(1)))
    })

    test('stakeTokenToHold', async () => {
      ok(await evm.stakeTokenToHold(validator1, state.token!, DEL(1), 0, await holdTimestamp()))
    })

    test('freeze time / stake id views', async () => {
      const freeze = await evm.getFreezeTimeToken()
      expect(freeze).toHaveProperty('Withdraw')
      expect(await evm.getStakeIdToken(validator1, me, state.token!)).toMatch(/^0x/)
    })
  })

  describe('NFT', () => {
    test('create collections (DRC721, DRC1155, DRC721 reserveless)', async () => {
      const base = { creator: me, contractURI: 'https://example.com/sdk-test.json', burnable: true }
      const c721 = await evm.createCollectionDRC721({ ...base, symbol: `S721${suffix}`, name: `SDK 721 ${suffix}`, refundable: true })
      ok(c721.tx)
      state.nft721 = c721.nftCollectionAddress
      const c1155 = await evm.createCollectionDRC1155({ ...base, symbol: `S1155${suffix}`, name: `SDK 1155 ${suffix}`, refundable: true })
      ok(c1155.tx)
      state.nft1155 = c1155.nftCollectionAddress
      const cFree = await evm.createCollectionDRC721Reserveless({ ...base, symbol: `SF721${suffix}`, name: `SDK free 721 ${suffix}` })
      ok(cFree.tx)
      state.nft721Reserveless = cFree.nftCollectionAddress
    })

    test('getNftType works right after creation (contract fallback)', async () => {
      expect(await evm.getNftType(state.nft721!)).toBe(0)
      expect(await evm.getNftType(state.nft1155!)).toBe(1)
      expect(await evm.getNftTypeFromContract(state.nft721!)).toBe(0)
      expect(await evm.getNftTypeFromContract(state.nft1155!)).toBe(1)
    })

    test('mint with DEL reserve (DRC721 x4, DRC1155)', async () => {
      for (let i = 0; i < 4; i++) {
        const { tx, tokenId } = await evm.mintNFTWithDELReserve(state.nft721!, me, `https://example.com/721/${i}.json`, DEL(1))
        ok(tx)
        state.ids721.push(BigInt(tokenId))
      }
      const { tx } = await evm.mintNFTWithDELReserve(state.nft1155!, me, 'https://example.com/1155/1.json', DEL(1), 1, 10)
      ok(tx)
    })

    test('mintReserveless', async () => {
      const { tx, tokenId } = await evm.mintReserveless(state.nft721Reserveless!, me, 'https://example.com/free/1.json')
      ok(tx)
      expect(addr(await evm.ownerOfNFT721(state.nft721Reserveless!, tokenId))).toBe(addr(me))
    })

    test('NFT views', async () => {
      const id = state.ids721[0]
      expect(addr(await evm.ownerOfNFT721(state.nft721!, id))).toBe(addr(me))
      expect(await evm.getTokenURINFT(state.nft721!, id)).toContain('721/0.json')
      expect(await evm.balanceOfNFT(state.nft721!, me)).toBe(4n)
      expect(await evm.balanceOfNFT(state.nft1155!, me, 1)).toBe(10n)
      expect(await evm.getReserveNFT(state.nft721!, id)).toBeDefined()
      expect(await evm.getSupplyNFT1155(state.nft1155!, 1)).toBe(10n)
      expect(await evm.getAllowMintNFT(state.nft721!)).toBe(true)
    })

    test('addDELReserveNFT', async () => {
      ok(await evm.addDELReserveNFT(state.nft721!, state.ids721[0], DEL(1)))
    })

    test('approvals', async () => {
      ok(await evm.approveNFT721(state.nft721!, other, state.ids721[3]))
      expect(addr(await evm.getApprovedNFT721(state.nft721!, state.ids721[3]))).toBe(addr(other))
      ok(await evm.approveForAllNFT(state.nft1155!, other, true))
      expect(await evm.isApprovedForAllNFT(state.nft1155!, me, other)).toBe(true)
    })

    test('transferNFT (DRC721, DRC1155)', async () => {
      ok(await evm.transferNFT(state.nft721!, me, other, state.ids721[3]))
      expect(addr(await evm.ownerOfNFT721(state.nft721!, state.ids721[3]))).toBe(addr(other))
      ok(await evm.transferNFT(state.nft1155!, me, other, 1, 2))
      expect(await evm.balanceOfNFT(state.nft1155!, other, 1)).toBe(2n)
    })

    test('burnNFT', async () => {
      const { tokenId } = await evm.mintReserveless(state.nft721Reserveless!, me, 'https://example.com/free/burn.json')
      ok(await evm.burnNFT(state.nft721Reserveless!, tokenId))
    })
  })

  describe('NFT delegation (main delegation contract)', () => {
    let delegation: string

    beforeAll(async () => {
      delegation = await evm.getDecimalContractAddress('delegation')
    })

    test('delegateNFT + getNFTStake', async () => {
      const id = state.ids721[0]
      ok(await evm.approveNFT721(state.nft721!, delegation, id))
      ok(await evm.delegateNFT(validator1, state.nft721!, id))
      const stake: any = await evm.getNFTStake(state.nft721!, id, me, validator1, 0)
      expect(stake).toBeDefined()
      expect(await evm.getNFTStakeId(state.nft721!, id, me, validator1, 0)).toMatch(/^0x/)
    })

    test('transferNFTStake', async () => {
      ok(await evm.transferNFTStake(validator1, state.nft721!, state.ids721[0], validator2))
    })

    test('delegateNFT + withdrawNFT', async () => {
      const id = state.ids721[1]
      ok(await evm.approveNFT721(state.nft721!, delegation, id))
      ok(await evm.delegateNFT(validator1, state.nft721!, id))
      ok(await evm.withdrawNFT(validator1, state.nft721!, id))
    })

    test('delegateNFTHold', async () => {
      const id = state.ids721[2]
      ok(await evm.approveNFT721(state.nft721!, delegation, id))
      ok(await evm.delegateNFTHold(validator1, state.nft721!, id, await holdTimestamp()))
    })

    test('delegateNFT1155 + withdrawNFT1155', async () => {
      ok(await evm.approveForAllNFT(state.nft1155!, delegation, true))
      ok(await evm.delegateNFT1155(validator1, state.nft1155!, 1, 3))
      ok(await evm.withdrawNFT1155(validator1, state.nft1155!, 1))
    })

    test('delegateNFT1155 + transferNFT1155Stake', async () => {
      ok(await evm.delegateNFT1155(validator1, state.nft1155!, 1, 2))
      ok(await evm.transferNFT1155Stake(validator1, state.nft1155!, 1, validator2))
    })
  })

  describe('Checks', () => {
    test('createChecksDEL + redeemChecks', async () => {
      const passwords = evm.getRandomPassword(2, 12) as unknown as string[]
      const dueBlock = (await evm.getLatestBlock())!.number + 10_000
      const { tx, checks } = await evm.createChecksDEL(passwords, DEL('0.1'), dueBlock)
      ok(tx)
      expect(checks.length).toBe(2)
      ok(await evm.redeemChecks(passwords, Array.from(checks) as string[]))
    })
  })

  describe('Multisig', () => {
    test('create', async () => {
      const { tx, multisigAddress } = await evm.multisig.create([{ owner: me, weight: 1 }], 1)
      ok(tx)
      expect(ethers.isAddress(multisigAddress)).toBe(true)
      state.multisig = multisigAddress
      ok(await evm.sendDEL(multisigAddress, DEL(3)))
    })

    test('buildTxSendDEL + signTx + executeTx', async () => {
      const safeTx = await evm.multisig.buildTxSendDEL(state.multisig!, other, DEL('0.1'))
      expect(evm.multisig.decodeTransaction(safeTx)).toMatchObject({ action: 'transfer', tokenType: 'Native', amount: DEL('0.1').toString() })
      const signature = await evm.multisig.signTx(state.multisig!, safeTx)
      const before = await evm.getBalance(other)
      ok(await evm.multisig.executeTx(state.multisig!, safeTx, [signature]))
      expect(await evm.getBalance(other)).toBe(before + DEL('0.1'))
    })

    test('approveHash flow + getSignatureForParticipant', async () => {
      const safeTx = await evm.multisig.buildTxSendDEL(state.multisig!, other, DEL('0.1'))
      const { tx } = await evm.multisig.approveHash(state.multisig!, safeTx)
      ok(tx)
      const signature = await evm.multisig.getSignatureForParticipant(me)
      ok(await evm.multisig.executeTx(state.multisig!, safeTx, [signature]))
    })

    test('buildTxDelegateDEL', async () => {
      const safeTx = await evm.multisig.buildTxDelegateDEL(state.multisig!, validator1, DEL(1))
      expect(evm.multisig.decodeTransaction(safeTx)).toMatchObject({ action: 'delegate', tokenType: 'Native' })
      const signature = await evm.multisig.signTx(state.multisig!, safeTx)
      ok(await evm.multisig.executeTx(state.multisig!, safeTx, [signature]))
    })

    test('buildTxSendToken / buildTxDelegateToken (MultiSend)', async () => {
      ok(await evm.transferToken(state.token!, state.multisig!, DEL(2)))
      let safeTx = await evm.multisig.buildTxSendToken(state.multisig!, state.token!, other, DEL('0.5'))
      ok(await evm.multisig.executeTx(state.multisig!, safeTx, [await evm.multisig.signTx(state.multisig!, safeTx)]))

      safeTx = await evm.multisig.buildTxDelegateToken(state.multisig!, validator1, state.token!, DEL('0.5'))
      expect(evm.multisig.decodeTransaction(safeTx)).toMatchObject({ action: 'delegate', tokenType: 'DRC20', amount: DEL('0.5').toString() })
      ok(await evm.multisig.executeTx(state.multisig!, safeTx, [await evm.multisig.signTx(state.multisig!, safeTx)]))
    })

    test('getNonce / getCurrentApproveTransactions', async () => {
      expect(Number(await evm.multisig.getNonce(state.multisig!))).toBeGreaterThanOrEqual(5)
      const current = await evm.multisig.getCurrentApproveTransactions(state.multisig!)
      expect(Array.isArray(current.transactions)).toBe(true)
    })
  })

  describe('IPFS', () => {
    // 1x1 transparent PNG
    const png = ethers.decodeBase64('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=')

    test('uploadNFTBufferToIPFS', async () => {
      const result = await evm.uploadNFTBufferToIPFS(png, 'sdk-test.png', 'SDK test', 'uploaded by dsc-js-sdk tests')
      expect(result).toBeTruthy()
    })

    test('uploadNFTBase64ToIPFS', async () => {
      const base64 = `data:image/png;base64,${ethers.encodeBase64(png)}`
      const result = await evm.uploadNFTBase64ToIPFS(base64, 'sdk-test.png', 'SDK test', 'uploaded by dsc-js-sdk tests')
      expect(result).toBeTruthy()
    })

    test('uploadTokenBufferToIPFS', async () => {
      const result = await evm.uploadTokenBufferToIPFS(png, 'sdk-token.png')
      expect(result).toBeTruthy()
      expect(evm.getUrlFromCid('abc')).toMatch(/ipfs\/abc$/)
    })
  })

  describe('Subgraph', () => {
    test('token, collection, validator', async () => {
      const token = await waitFor(() => subgraph.getTokenByAddress(state.token!))
      expect(token).toBeTruthy()
      const collection = await waitFor(() => subgraph.getNftCollectionByAddress(state.nft721!))
      expect(collection).toBeTruthy()
      expect(await subgraph.getValidator(validator1)).toBeTruthy()
    })

    test('stakes of the test wallet', async () => {
      const stakes = await waitFor(async () => {
        const res = await subgraph.getStakesByAddress(me, 100, 0)
        return res.data.length ? res : null
      })
      expect(stakes.data.length).toBeGreaterThan(0)
      const nftStakes = await waitFor(async () => {
        const res = await subgraph.getNFTStakesByAddress(me, 100, 0)
        return res.data.length ? res : null
      })
      expect(nftStakes.data.length).toBeGreaterThan(0)
      expect(Array.isArray(await subgraph.getWithdrawStakesByAddress(me, 10, 0))).toBe(true)
      expect(Array.isArray(await subgraph.getTransferStakesByAddress(me, 10, 0))).toBe(true)
      expect(Array.isArray(await subgraph.getWithdrawNFTStakesByAddress(me, 10, 0))).toBe(true)
      expect(Array.isArray(await subgraph.getTransferNFTStakesByAddress(me, 10, 0))).toBe(true)
    })

    test('multisig wallets of the participant', async () => {
      const wallets = await waitFor(async () => {
        const res = await subgraph.getMultisigWalletsByParticipant(me, 100, 0)
        return res.length ? res : null
      })
      expect(wallets.length).toBeGreaterThan(0)
    })
  })
})
