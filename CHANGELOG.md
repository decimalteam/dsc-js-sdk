# Changelog

## 3.0.0

Major release: the SDK is now EVM-only, runs on ethers v6 and has two runtime dependencies (`ethers`, `bech32`).

### Breaking changes

#### ethers v6

All EVM calls go through [ethers v6](https://docs.ethers.org/v6/migrating/) instead of v5.

- Numeric results are native `bigint` instead of `BigNumber`: `getBalance`, `balanceOfToken`,
  `calculate*`, estimated gas (`estimateGas = true`), `parseEther`, etc. Use `+`, `-`, `*`, `/`,
  comparison operators and `BigInt(...)` instead of `.add()`, `.sub()`, `.mul()`, `.eq()`, `.toNumber()`.
- `decimalEVM.provider` is an `ethers.JsonRpcProvider` (v6) and `decimalEVM.account` an `ethers.HDNodeWallet`.
- Transaction methods resolve to a v6 `TransactionReceipt` (`receipt.hash`, `receipt.logs`;
  there is no `receipt.events` / `receipt.transactionHash`).
- `getFeeData()` returns a v6 `FeeData`; permit helpers (`getSignPermitToken`, `getSignPermitDRC721`,
  `getSignPermitDRC1155`) return a v6 `Signature`.
- `getDecimalContract(name)` returns a v6 `Contract` (`contract.target` instead of `contract.address`).
- Errors thrown by contract calls are the original ethers errors (with `revert`, `code`, `shortMessage`)
  instead of `new Error(String(err))`.

#### `delegation-nft` contract removed

NFT staking is done through the main `delegation` contract only. Removed methods and their replacements:

| Removed (delegation-nft) | Use instead (delegation) |
|---|---|
| `delegateDRC721`, `delegateDRC721Hold` | `delegateNFT`, `delegateNFTHold`, `delegateNFTByPermit` |
| `delegateDRC1155`, `delegateDRC1155Hold` | `delegateNFT1155`, `delegateNFT1155Hold` |
| `withdrawStakeNFT`, `withdrawStakeNFTHold` | `withdrawNFT` / `withdrawNFTHold`, `withdrawNFT1155` / `withdrawNFT1155Hold` |
| `transferStakeNFT`, `transferStakeNFTHold` | `transferNFTStake` / `transferNFTStakeHold`, `transferNFT1155Stake` / `transferNFT1155StakeHold` |
| `stakeNFTToHold`, `stakeNFTResetHold(s)`, `withdrawNFTWithReset`, `transferNFTWithReset`, `holdNFTWithReset`, `completeStakeNFT` | — |
| `getStakeNFT`, `getStakeIdNFT`, `getHoldStakeNFT`, `getFrozenStakeNFT(s)`, `getFrozenStakesQueueNFT`, `getFreezeTimeNFT`, `getNFTStakesByMember`, `getNFTStakesPageByMember` | `getNFTStake`, `getNFTStakeId`, `getNFTBackedAmount`, subgraph `getNFTStakesByAddress` |
| `multisig.buildTxDelegateDRC721` / `DRC1155` | `multisig.buildTxDelegateNFT` / `buildTxDelegateNFT1155` |
| `multisig.buildTxWithdrawStakeNFT`, `buildTxTransferStakeNFT` and their hold / reset / complete variants | `multisig.buildTxWithdrawNFT(1155)`, `buildTxTransferNFTStake`, `buildTxTransferNFT1155Stake` |

`connect('delegation-nft')` and `getDecimalContractAddress('delegation-nft')` no longer exist, and
`multisig.decodeTransaction` no longer recognizes calls of that contract.
Reading NFT stakes from the subgraph (`Subgraph.getNFTStakes*`) is unchanged.

#### Methods removed because the deployed `delegation` contract no longer has them

`getTokenStakesByMember`, `getTokenStakesPageByMember` (use `Subgraph.getStakesByAddress`),
`getFrozenStakesQueueToken` (use `Subgraph.getWithdrawStakesByAddress` / `getTransferStakesByAddress`),
`applyPenaltyToStakeToken`, `applyPenaltiesToStakeToken` (the contract now applies penalties by stake id:
`applyPenaltiesToStakes(bytes32[])`, available via `getDecimalContract('delegation')`).

#### Other methods removed because no deployed contract has them

`setTokenURINFT` (NFT collections have no `setTokenURI`), `stakeTokenResetHoldDEL` (the delegation contract
has no `resetHoldDEL`; use `stakeTokenResetHold`). The `allowMint` field was removed from `NFTCollection`
(collection metadata is `creator, symbol, name, contractURI, refundable, burnable`); `refundable` is optional
for reserveless collections and defaults to `false`.

#### Cosmos layer removed

The legacy Cosmos SDK part of the chain is no longer supported. Removed exports: `Decimal` (gate API,
Cosmos RPC client, Cosmos transactions), `Transaction`, `EncoderDecoder`, `PubKey`, `MsgDelegate`,
`MsgRedelegate`, `MsgUndelegate` and the protobuf types. The remaining exports are `Wallet`, `DecimalEVM`,
`Subgraph`, `TX_TYPE`, `DecimalNetworks` and the address helpers from `utils/walletUtils`.

`Wallet` keeps deriving the same accounts and addresses as 2.x (`address` d0..., `evmAddress` 0x...,
`validatorAddress`, `generateAccount`, `switchAccount`, `generateAndSwitchAccount`,
`getAndUseGeneratedWallets`, `sendAndSaveGeneratedWallets`). Removed from `Wallet`: `getPrivateKey()`,
`getPublicKey()`, `getPrivateKeyString()`, `getPublicKeyString()` (use `getPrivateKeyHex()` /
`getPublicKeyHex()`), `setNodeDirectMode`, `setNodeRestUrl`, `availableProposalSubmit`,
`currentNonce` / `updateNonce`, `createPublicKey`, `encodePubKey`, `txEncoderDecoder`.
`mnemonicToSeedSync` returns a `Uint8Array`.

#### Other

- The package root now exposes named exports at runtime (`require('dsc-js-sdk').Wallet`,
  `verifyAddress`, `decodeCosmosAccountAddress`, ...); the default export is still the SDK object.
- IPFS methods accept `Uint8Array` (a Node.js `Buffer` still works) and use the global `fetch` /
  `FormData` / `Blob`, so `uploadNFTBase64ToIPFS` now works in Node.js too. Node.js >= 26 (current LTS) is required.

### Fixes

- `getNftType()` falls back to the `nft-center` contract while the subgraph has not indexed a new
  collection yet, so a freshly created collection can be minted / delegated right away.
- `getNftTypeFromContract()` called the removed `getNftMeta` of nft-center; it now uses `getNFTState` and
  returns the `TypeNFT` value (it used to return the enum name).
- `createCollectionDRC721Reserveless` / `createCollectionDRC1155Reserveless` failed with
  "missing value for component refundable" when `refundable` was omitted.
- `updateTokenIdentity()` called a non-existent contract method; the token contract method is `updateIdentity`.
- `parseMemo()` no longer throws for an unknown transaction hash.
- `sendAndSaveGeneratedWallets()` reports the real result of the request instead of always `false`.

### Tooling

- TypeScript 6, webpack 5 + webpack-cli 7, Jest 30 + ts-jest, ESLint 10 (flat config).
- `npm test` runs offline unit tests; `npm run test:testnet` runs end-to-end tests on testnet
  (`DSC_TEST_MNEMONIC` must be set).
- Removed unused tooling: Babel, Prettier, husky, jsdoc-to-markdown, node-polyfill-webpack-plugin.
