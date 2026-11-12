import { Wallet } from '../../src/index'
import {
  decodeCosmosAccountAddress,
  encodeCosmosAccountAddress,
  encodeEvmAccountAddress,
  signTimestamp,
  verifyAddress,
} from '../../src/utils/walletUtils'
import { generateMnemonic, validateMnemonic } from '../../src/wallet'

// Public test mnemonic. Expected values were produced by dsc-js-sdk 2.1.2 (@tendermint/sig + elliptic),
// so these tests guard address derivation and gate signatures against regressions.
const MNEMONIC = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt'

const EXPECTED = {
  validator: 'd0valoper12v52j9y26kkf3crczsxq7m2k4v06y2lxs027uk',
  wallets: [
    { id: 0, address: 'd012v52j9y26kkf3crczsxq7m2k4v06y2lxsme7mx', evmAddress: '0x5328a9148ad5ac98e078140c0f6d56ab1fa22be6', publicKey: '025e065661199079310a6824a0a8d8eae8fd5b0ea3316a2e0c9936db2f7a112633' },
    { id: 1, address: 'd013plxq62utlfwgnx6ts584gwlj5wkt7ryphn20f', evmAddress: '0x887e60695c5fd2e44cda5c287aa1df951d65f864', publicKey: '0233b2ad8f92f5fc2cb21d1630824edd57679660453e4272da39fe9175406a9677' },
    { id: 2, address: 'd010tz3tk5vrqcr4ulggnkz0p8qtphnedj3ctkmh9', evmAddress: '0x7ac515da8c18303af3e844ec2784e0586f3cb651', publicKey: '03db2d865fbdf9ab7c496c840fb21e436826b359750c1d28748126cc67f81400f0' },
  ],
  signature: '{"r":"4b8ee17d662906ff523c50874717845a0a43e521b1b88d201ce64f582d2476b8","s":"703701c3c1ee7d1ae7d0ee804a3398350dcf15ed6fde98018777b22a868f82ed","recoveryParam":1}',
}

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')

describe('Wallet', () => {
  test('derives the master account like 2.x', () => {
    const wallet = new Wallet(MNEMONIC)
    expect(wallet.address).toBe(EXPECTED.wallets[0].address)
    expect(wallet.evmAddress).toBe(EXPECTED.wallets[0].evmAddress)
    expect(wallet.validatorAddress).toBe(EXPECTED.validator)
    expect(hex(wallet.publicKey)).toBe(EXPECTED.wallets[0].publicKey)
    expect(wallet.getPrivateKeyHex()).toMatch(/^0x[0-9a-f]{64}$/)
  })

  test('generates and switches accounts like 2.x', () => {
    const wallet = new Wallet(MNEMONIC)
    wallet.generateAndSwitchAccount(3, 2)
    expect(wallet.id).toBe(2)
    expect(wallet.depth).toBe(3)
    expect(wallet.wallets.map((w) => ({ id: w.id, address: w.address, evmAddress: w.evmAddress, publicKey: hex(w.publicKey) }))).toEqual(EXPECTED.wallets)
    expect(wallet.address).toBe(EXPECTED.wallets[2].address)

    wallet.switchAccount(1)
    expect(wallet.evmAddress).toBe(EXPECTED.wallets[1].evmAddress)
  })

  test('generateAccount appends the next account', () => {
    const wallet = new Wallet(MNEMONIC)
    wallet.generateAccount()
    expect(wallet.id).toBe(1)
    expect(wallet.address).toBe(EXPECTED.wallets[1].address)
  })

  test('creates a new 24-word mnemonic when none is given', () => {
    const wallet = new Wallet('')
    expect(wallet.mnemonic.split(' ')).toHaveLength(24)
    expect(validateMnemonic(wallet.mnemonic)).toBe(true)
    expect(generateMnemonic()).not.toBe(wallet.mnemonic)
  })

  test('rejects an invalid mnemonic', () => {
    expect(() => new Wallet('foo bar baz')).toThrow('Invalid mnemonic')
  })

  test('read-only wallet from address and public key', () => {
    const publicKey = Buffer.from(EXPECTED.wallets[0].publicKey, 'hex')
    const wallet = new Wallet('', EXPECTED.wallets[0].address, publicKey)
    expect(wallet.mnemonic).toBe('')
    expect(wallet.evmAddress).toBe(EXPECTED.wallets[0].evmAddress)
    expect(wallet.privateKey).toHaveLength(0)
  })
})

describe('walletUtils', () => {
  test('bech32 <-> evm address conversion', () => {
    const { address, evmAddress, publicKey } = EXPECTED.wallets[1]
    expect(decodeCosmosAccountAddress(address)).toBe(evmAddress)
    expect(encodeCosmosAccountAddress(evmAddress)).toBe(address)
    expect(encodeCosmosAccountAddress(evmAddress.slice(2))).toBe(address)
    expect(Wallet.encodeCosmosAccountAddress(evmAddress)).toBe(address)
    expect(Wallet.decodeCosmosAccountAddress(address)).toBe(evmAddress)
    expect(encodeEvmAccountAddress(Buffer.from(publicKey, 'hex'))).toBe(evmAddress)
    expect(decodeCosmosAccountAddress('not-an-address')).toBeNull()
  })

  test('verifyAddress', () => {
    expect(verifyAddress(EXPECTED.wallets[0].address)).toBe(true)
    expect(verifyAddress(EXPECTED.validator, 'd0valoper')).toBe(true)
    expect(verifyAddress(EXPECTED.validator)).toBe(false)
    expect(verifyAddress('d0invalid')).toBe(false)
    expect(() => verifyAddress('')).toThrow('address is missing.')
  })

  test('gate signature matches the elliptic format of 2.x', () => {
    const wallet = new Wallet(MNEMONIC)
    expect(signTimestamp(wallet.wallets[0].privateKey, 1700000000)).toBe(EXPECTED.signature)
  })
})
