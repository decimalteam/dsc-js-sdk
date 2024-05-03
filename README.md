# Usage

## Connecting to Decimal Blockchain

You can provide your own Decimal node address to send transactions to the network, or you can use our gateways to do this and much more. Gateway URLs are provided below.

The following code can be used to generate **mnemonic** or use your mnemonic

```js
const bip39 = require("bip39");
const mnemonic = bip39.generateMnemonic();
```

## Connect to DecimalEVM

```js
const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
const decimalWallet = new Wallet(mnemonic);

//DecimalNetworks.devnet - is devnet
//DecimalNetworks.testnet - is testnet
//DecimalNetworks.mainnet - is mainnet
const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
await decimalEVM.connect();
```

## Token

### Create token

```js

const newToken = {
  tokenOwner: decimalWallet.evmAddress, // owner of token (evm address)
  symbol: 'TKNE', // symbol of token
  name: 'TokenName', // name of token
  crr: 50, // crr of token (value is from 10 to 100)
  initialMint: decimalEVM.parseEther(1000), // initial mint of token
  minTotalSupply: decimalEVM.parseEther(1), // minimum total supply after which the token sale will be impossible
  maxTotalSupply: decimalEVM.parseEther(5000000), // maximum total supply after which the token buy will be impossible
  identity: '7815696ecbf1c96e6894b779456d330e', // md5 hash icon of gravatar
}
//The amount of the commission depends on the length of the symbol token
//3 letters — 2500000 DEL
//4 letters — 250,000 DEL
//5 letters — 25,000 DEL
//6 letters — 2500 DEL
//7-10 letters — 250 DEL
//The commission must be added to the amount of the reserve!
const comission = 250000
const reserve = decimalEVM.parseEther(1000+comission) // minimum reserve 1000 DEL.
const {tokenAddress} = await decimalEVM.createToken(newToken, reserve)
```

### Approve Token
```js
const spender = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // address of who will be allowed to spend amount
const amount = decimalEVM.parseEther(1);
const tx = await decimalEVM.approveToken(tokenAddress, spender, amount)
```

### Transfer Token
```js
const to = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // recipient's address
const amount = decimalEVM.parseEther(10); // 10 tokens
const tx = await decimalEVM.transferToken(tokenAddress, to, amount)
```

### Transfer From Token
```js
// Use function approveToken() to approve token from owner to recipient address
// Then you can call transferFromToken() from wallet recipient
const from = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // address of owner tokens
const to = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // recipient's address
const amount = decimalEVM.parseEther(10); // 10 tokens
const tx = await decimalEVM.transferFromToken(tokenAddress, from, to, amount)
```

### Burn Token
```js
const amount = decimalEVM.parseEther(10); // 10 tokens
const tx = await decimalEVM.burnToken(tokenAddress, amount)
```

### Buy Token (buy Token For Exact DEL)
```js
const recipient = decimalWallet.evmAddress
const amountDel = decimalEVM.parseEther(10); // 10 DEL
const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel) // the minimum number of tokens to receive for 10 DEL
// At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
// const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
const tx = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient)
```

### Buy Token (buy Exact Token For DEL)
```js
const recipient = decimalWallet.evmAddress
const amountOut = decimalEVM.parseEther(10); // 10 tokens 
const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut) // the amount of DEL to buy 10 tokens
//If you have sent more DEL than you need, the difference will be refunded
const tx = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient)
```

### Sell Token (sell Tokens For Exact DEL)
```js
const amountOut = decimalEVM.parseEther(10); // 10 DEL
const amountInMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut) // the number of tokens sold to receive 10 DEL
// At the time of the transaction, the price may change, so you can add away, for example, 10% to the amountInMax
// const amountInMaxNew = amountInMax + (amountInMax * 10n / 100n)
const tx = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountInMax, recipient)
```

### Sell Token (sell Exact Tokens For DEL)
```js
const amountIn = decimalEVM.parseEther(10); // 10 tokens
const amountOutMin = await decimalEVM.calculateSellOutput(tokenAddress, amountIn) // the minimum amount of DEL to sell 10 tokens
// At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
// const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
const tx = await decimalEVM.sellExactTokensForDEL(tokenAddress, amountIn, amountOutMin, recipient)
```

### Convert Token to Token (approve Token)
```js
const amountIn = decimalEVM.parseEther(10); // 10 tokens
const futureDEL = await decimalEVM.calculateSellOutput(tokenAddress1, amountIn)
const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress2, futureDEL)
// At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
// const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
await decimalEVM.approveToken(tokenAddress1, tokenCenterAddress, amountIn) // approve to transfer tokenCenterAddress for convertToken
await decimalEVM.convertToken(tokenAddress1, tokenAddress2, amountIn, amountOutMin, recipient)
```

### Convert Token to Token (permit Token)
```js
const amountIn = decimalEVM.parseEther(10); // 10 tokens
const futureDEL = await decimalEVM.calculateSellOutput(tokenAddress1, amountIn)
const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress2, futureDEL)
// At the time of the transaction, the price may change, so you can take away, for example, 10% of the amountOutMin
// const amountOutMinNew = amountOutMin - (amountOutMin * 10n / 100n)
const sign = await decimalEVM.getSignPermitToken(tokenAddress1, tokenCenterAddress, amountIn) // get signature to approve transfer token for tokenCenterAddress
await decimalEVM.convertToken(tokenAddress1, tokenAddress2, amountIn, amountOutMin, recipient, sign)
```

### Spend tokens signed
```js
//prepare
const owner = "0x35119df12afdf848b7ef2536af2411ab0a611c45"; // address of owner tokens
const spender = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // address of who will be allowed to spend amount
const amount = decimalEVM.parseEther(1);
const sign = await decimalEVM.getSignPermitToken(tokenAddress, spender, amount)

//spend tokens from a spender wallet
const tx = await decimalEVM.permitToken(tokenAddress, owner, spender, amount, sign)
```

### Update details Token
```js
const newIdentity = 'qwertyasd123';
const newMaxTotalSupply = decimalEVM.parseEther(5000000);
const tx = await decimalEVM.updateDetailsToken(tokenAddress, newIdentity, newMaxTotalSupply)
```



## NFT

### Create NFT Collection
```js
const newNFT: any = {
  tokenOwner: decimalWallet.evmAddress, // owner of nft collection (evm address)
  symbol: 'PIRS', // symbol of nft collection
  name: 'Pirates', // name of nft collection
  contractURI: 'ipfs://ipfs/QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk', // uri of nft collection
  baseURI: 'ipfs:/', // base uri for all nfts inside the nft collection
  refundable: false, // is the reserve returned when burning NFT (true or false)
  allowMint: true //is mint allowed for the nft collection
}

const {nftCollectionAddress} = await decimalEVM.createCollectionERC721Standart(newNFT) // create collection ERC721 without reserve
//const {nftCollectionAddress} = await decimalEVM.createCollectionERC1155Standart(newNFT) // create collection ERC1155 without reserve
//const {nftCollectionAddress} = await decimalEVM.createCollectionERC721(newNFT) // create collection ERC721 with reserve
//const {nftCollectionAddress} = await decimalEVM.createCollectionERC1155(newNFT) // create collection ERC1155 with reserve
```

### Mint NFT for NFT Collection

#### Mint NFT for NFT Collection without reserve
```js
const to = decimalWallet.evmAddress
const tokenURI = "/ipfs/QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk"
const {tokenId} = await decimalEVM.mintNFT(nftCollectionAddress, to, tokenURI) // mint NFT for NFT Collection ERC721 without reserve

//const tokenId = 0
//const amount = 20
//const {tokenId} = await decimalEVM.mintNFT(nftCollectionAddress, to, tokenURI, tokenId, amount) // mint NFT for NFT Collection ERC1155 without reserve
```

#### Mint NFT for NFT Collection with DEL reserve
```js
const to = decimalWallet.evmAddress
const tokenURI = "/ipfs/QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk"

const reserve = decimalEVM.parseEther(1); // 1 del
const {tokenId} = await decimalEVM.mintNFTWithDELReserve(nftCollectionAddress, to, tokenURI, reserve) // mint NFT for NFT Collection ERC721 with DEL reserve

//const tokenId = 0
//const amount = 20
//const reserve = decimalEVM.parseEther(1*amount); // =20 del
//const {tokenId} = await decimalEVM.mintNFTWithDELReserve(nftCollectionAddress, to, tokenURI, reserve, tokenId, amount) // mint NFT for NFT Collection ERC1155 with DEL reserve
```

#### Mint NFT for NFT Collection with Token reserve (approve Token)
```js
const to = decimalWallet.evmAddress
const tokenURI = "/ipfs/QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk"

const reserve = decimalEVM.parseEther(1); // 1 del
await decimalEVM.approveToken(tokenAddress, nftCollectionAddress, reserve)
const {tokenId} = await decimalEVM.mintNFTWithTokenReserve(nftCollectionAddress, to, tokenURI, reserve, tokenAddress) // mint NFT for NFT Collection ERC721 with Token reserve
undefi
//const tokenId = 0
//const amount = 20
//const reserve = decimalEVM.parseEther(1*amount); // =20 del
//await decimalEVM.approveToken(tokenAddress, nftCollectionAddress, reserve)
//const {tokenId} = await decimalEVM.mintNFTWithTokenReserve(nftCollectionAddress, to, tokenURI, reserve, tokenAddress, undefined, tokenId, amount) // mint NFT for NFT Collection ERC1155 with Token reserve
 ```

#### Mint NFT for NFT Collection with Token reserve (permit Token)
```js
const to = decimalWallet.evmAddress
const tokenURI = "/ipfs/QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk"

const reserve = decimalEVM.parseEther(1); // 1 del
const sign = await decimalEVM.getSignPermitToken(tokenAddress, nftCollectionAddress, reserve)
const {tokenId} = await decimalEVM.mintNFTWithTokenReserve(nftCollectionAddress, to, tokenURI, reserve, tokenAddress, sign) // mint NFT for NFT Collection ERC721 with Token reserve

//const tokenId = 0
//const amount = 20
//const reserve = decimalEVM.parseEther(1*amount); // =20 del
//const sign = await decimalEVM.getSignPermitToken(tokenAddress, nftCollectionAddress, reserve)
//const {tokenId} = await decimalEVM.mintNFTWithTokenReserve(nftCollectionAddress, to, tokenURI, reserve, tokenAddress, sign, tokenId, amount) // mint NFT for NFT Collection ERC1155 with Token reserve
 ```

### Add reserve to NFT

#### Add DEL reserve to NFT
```js
// The function add a reserve to NFT with reserve. It is not possible to add a reserve to NFT without a reserve.
const tokenId = 0
const reserve = decimalEVM.parseEther(1); // 1 del
await decimalEVM.addDELReserveNFT(nftCollectionAddress, tokenId, reserve)
// Only the owner can add a reserve to ERC721
// Anyone can add a reserve to ERC1155
```

#### Add Token reserve to NFT (approve Token)
```js
// The function add a reserve to NFT with reserve. It is not possible to add a reserve to NFT without a reserve.
const tokenId = 0
const reserve = decimalEVM.parseEther(1); // 1 del
await decimalEVM.approveToken(tokenAddress, nftCollectionAddress, reserve)
await decimalEVM.addTokenReserveNFT(nftCollectionAddress, tokenId, reserve)
// Only the owner can add a reserve to ERC721
// Anyone can add a reserve to ERC1155
```

#### Add Token reserve to NFT (permit Token)
```js
// The function add a reserve to NFT with reserve. It is not possible to add a reserve to NFT without a reserve.
const tokenId = 0
const reserve = decimalEVM.parseEther(1); // 1 del
const sign = await decimalEVM.getSignPermitToken(tokenAddress, nftCollectionAddress, reserve)
await decimalEVM.addTokenReserveNFT(nftCollectionAddress, tokenId, reserve, sign)
// Only the owner can add a reserve to ERC721
// Anyone can add a reserve to ERC1155
```

### Transfer NFT
```js
const tokenId = 0
await decimalEVM.transferNFT(nftCollectionAddress, from, to, tokenId) // for ERC721
//const amount = 20
//await decimalEVM.transferNFT(nftCollectionAddress, from, to, tokenId, amount) // for ERC1155
```

### Transfer batch for ERC1155
```js
const tokenIds = [0, 1] // array tokenIds
const amounts = [10, 20] // array amounts of tokenIds
await decimalEVM.transferBatchNFT1155(nftCollectionAddress, from, to, tokenIds, amounts) 
```

### Disable mint NFT
```js
// The mint can be disabled, to do this, check what status it is in.
//const resultBoolean = await decimalEVM.getAllowMintNFT(nftCollectionAddress)
await decimalEVM.disableMintNFT(nftCollectionAddress)
```

### Burn NFT
```js
const tokenId = 0
await decimalEVM.burnNFT(nftCollectionAddress, tokenId) // for ERC721
//const amount = 20
//await decimalEVM.burnNFT(nftCollectionAddress, tokenId, amount) // for ERC1155
```
### Set BaseURI for NFT Collection
```js
const baseURI = 'https://example.com/'
await decimalEVM.setBaseURINFT(nftCollectionAddress, baseURI)
```

### Set TokenURI for NFT
```js
const tokenId = 0
const tokenURI = 'image.png'
await decimalEVM.setTokenURINFT(nftCollectionAddress, tokenId, tokenURI)
```

### Approve NFT

#### Approve for NFT ERC721
```js
const tokenId = 0
await decimalEVM.approveNFT721(nftCollectionAddress, to, tokenId) // ERC721
```

#### Approve for all NFT
```js
// enable approval for all nfts inside the NFT Collection
await decimalEVM.approveForAllNFT(nftCollectionAddress, to, true)
// disable approval for all nfts inside the NFT Collection
//await decimalEVM.approveForAllNFT(nftCollectionAddress, to, false)
```

## Delegation

### Delegation DEL
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const amount = decimalEVM.parseEther(1) // 1 del
await decimalEVM.delegateDEL(validator, amount)
```

### Delegation Token (approve Token)
```js
const amount = decimalEVM.parseEther(1) //1 token
const delegationAddress = decimalEVM.getDecimalContractAddress('delegation')
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

await decimalEVM.approveToken(tokenAddress, delegationAddress, amount)
await decimalEVM.delegateToken(validator, tokenAddress, amount)
```

### Delegation Token (permit Token)
```js
const amount = decimalEVM.parseEther(1) //1 token
const delegationAddress  = decimalEVM.getDecimalContractAddress('delegation')
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

const sign = await decimalEVM.getSignPermitToken(tokenAddress, delegationAddress, amount)
await decimalEVM.delegateToken(validator, tokenAddress, amount, sign)
```

### Transfer stake
```js
const stakes = await subgraph.getStakesByAddress(owner) // Get your stakes from subgraph
//const stakes = await decimalEVM.getTokenStakesByMember(owner) // Or get your stakes from smart contract

const stake = stakes[0] // first stake (for example)
const newValidator = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
await decimalEVM.transferStakeToken(stake.validator, stake.token, stake.amount, newValidator)
```

### Withdraw stake
```js
const stakes = await subgraph.getStakesByAddress(owner) // Get your stakes from subgraph
//const stakes = await decimalEVM.getTokenStakesByMember(owner) // Or get your stakes from smart contract

const stake = stakes[0] // first stake (for example)
await decimalEVM.withdrawStakeToken(stake.validator, stake.token, stake.amount)
```

### Apply penalty to stake
```js
const stakes = await subgraph.getStakesByAddress(owner) // Get your stakes from subgraph
//const stakes = await decimalEVM.getTokenStakesByMember(owner) // Or get your stakes from smart contract

const stake = stakes[0] // first stake (for example)
const result = await decimalEVM.applyPenaltyToStakeToken(stake.validator, stake.delegator, stake.token)
if (result.error == null) {
  //successfully transaction: result.tx
} else {
  console.log(result.error == 'NothingToBurn' ? 'Nothing to burn, there is no need for applyPenaltyToStakeToken' : result.error)
}
```

### Apply penalties to stake
```js
const stakes = await subgraph.getStakesByAddress(owner) // Get your stakes from subgraph
//const stakes = await decimalEVM.getTokenStakesByMember(owner) // Or get your stakes from smart contract

const stake = stakes[0] // first stake (for example)
const result = await decimalEVM.applyPenaltiesToStakeToken(stake.validator, stake.delegator, stake.token)
if (result.error == null) {
  //successfully transaction: result.tx
} else {
  console.log(result.error == 'NoPenaltyToApply' ? 'Nothing to burn, there is no need for applyPenaltiesToStakeToken' : result.error)
}
```

### Complete stake after frozen
```js
const stakesFrozen = await subgraph.getTransferStakesByAddress(owner) // get transfer stakes
//const stakesFrozen = await subgraph.getWithdrawStakesByAddress(owner) // or get withdraw stakes

const block = await decimalEVM.getLatestBlock();
const stakesFrozenFiltered = stakesFrozen.filter(({unfreezeTimestamp}) => unfreezeTimestamp <= block.timestamp)
if (stakesFrozenFiltered.length > 0) {
  const stakeFrozen = stakesFrozenFiltered[0] // first stake frozen (for example)

  const result = await decimalEVM.completeStakeToken(stakeFrozen.queueIndex)
  if (result.error == null) {
      //successfully transaction: result.tx
  } else {
      console.log(result.error)
  }
}
```

## Delegation NFT 

### Delegation NFT (approve NFT)
```js
const tokenId = 0 // tokenId of NFT
const delegationNftAddress = decimalEVM.getDecimalContractAddress('delegation-nft')
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

//delegate ERC721
await decimalEVM.approveNFT721(nftCollectionAddress, delegationNftAddress, tokenId)
await decimalEVM.delegateERC721(validator, nftCollectionAddress, tokenId)

//delegate ERC1155
//const amount = decimalEVM.parseEther(1) //1 token
//await decimalEVM.approveForAllNFT(nftCollectionAddress, delegationNftAddress, true)
//await decimalEVM.delegateERC1155(validator, nftCollectionAddress, tokenId, amount)
```

### Delegation NFT (permit NFT)
```js
const tokenId = 0 // tokenId of NFT
const delegationNftAddress = decimalEVM.getDecimalContractAddress('delegation-nft')
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

//delegate ERC721
const sign = await decimalEVM.getSignPermitERC721(nftCollectionAddress, delegationNftAddress, tokenId)
await decimalEVM.delegateERC721(validator, nftCollectionAddress, tokenId, sign)

//delegate ERC1155
//const amount = decimalEVM.parseEther(1) //1 token
//const sign = await decimalEVM.getSignPermitERC1155(nftCollectionAddress, delegationNftAddress)
//await decimalEVM.delegateERC1155(validator, nftCollectionAddress, tokenId, amount, sign)
```

### Transfer stake NFT
```js
const newValidator = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"

                                                          // Get stakes from subgraph TODO
let stakes = await decimalEVM.getNFTStakesByMember(owner) // Or get your stakes from smart contract
const stake = stakes[0] // first stake (for example)
// stake.tokenType will give the NFT type (ERC721 or ERC1155)
// or get the NFT type from TODO

// transfer stake ERC721
await decimalEVM.transferStakeNFT(stake.validator, stake.token, stake.tokenId, newValidator)

// transfer stake ERC1155
//await decimalEVM.transferStakeNFT(stake.validator, stake.token, stake.tokenId, newValidator, stake.amount)
```

### Withdraw stake NFT
```js
                                                          // Get stakes from subgraph TODO
let stakes = await decimalEVM.getNFTStakesByMember(owner) // Or get your stakes from smart contract

const stake = stakes[0] // first stake (for example)
// stake.tokenType will give the NFT type (ERC721 or ERC1155)
// or get the NFT type from TODO

// withdraw stake ERC721
await decimalEVM.withdrawStakeNFT(stake.validator, stake.token, stake.tokenId)

// withdraw stake ERC1155
//await decimalEVM.withdrawStakeNFT(stake.validator, stake.token, stake.tokenId, stake.amount)
```

### Complete stake NFT after frozen
```js
  // get transfer stakes NFT TODO
  // or get withdraw stakes NFT TODO

const block = await decimalEVM.getLatestBlock();
const stakesFrozenFiltered = stakesFrozen.filter(({unfreezeTimestamp}) => unfreezeTimestamp <= block.timestamp)
if (stakesFrozenFiltered.length > 0) {
  const stakeFrozen = stakesFrozenFiltered[0] // first stake frozen (for example)

  const result = await decimalEVM.completeStakeNFT(stakeFrozen.queueIndex)
  if (result.error == null) {
      //successfully transaction: result.tx
  } else {
      console.log(result.error)
  }
}
```

## Validators

#### Add new validator with DEL stake
```js
const newValidator: any = {
    operator_address: decimalWallet.evmAddress,
    reward_address: decimalWallet.evmAddress,
    consensus_pubkey: decimalWallet.getPublicKeyString(),
    description: {
        moniker: 'test-node-sgp1-01',
        identity: '',
        website: 'decimalchain.com',
        security_contact: '',
        details: 'Declaring validator on test-node-sgp1-01'
    },
    commission: '0.100000000000000000',
}
await decimalEVM.addValidatorWithETH(newValidator, decimalEVM.parseEther(2))
```

#### Add new validator with token stake
```js
const newValidator: any = {
    operator_address: decimalWallet.evmAddress,
    reward_address: decimalWallet.evmAddress,
    consensus_pubkey: decimalWallet.getPublicKeyString(),
    description: {
        moniker: 'test-node-sgp1-01',
        identity: '',
        website: 'decimalchain.com',
        security_contact: '',
        details: 'Declaring validator on test-node-sgp1-01'
    },
    commission: '0.100000000000000000',
}
const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')
const stakeValidator: any = {
  token: tokenAddress,
  amount: decimalEVM.parseEther(10)
}
await decimalEVM.addValidatorWithToken(newValidator, stakeValidator)
```

#### Pause validator
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const pauseValidator = await decimalEVM.pauseValidator(validator)
```

#### Unpause validator
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const unpauseValidator = await decimalEVM.unpauseValidator(validator)
```

## Сalculation of the transaction fee
```js
//To create a token, you use this function
const {tokenAddress} = await decimalEVM.createToken(newToken, reserve)

//Before send the transaction, you can calculate estimate gas price for this function
const getEstimateGas = true
const {tokenAddress, estimateGas} = await decimalEVM.createToken(newToken, reserve, getEstimateGas)
//To calculate the fee, request the current gasPrice and multiply by the received estimateGas
const feeData = await decimalEVM.getFeeData()
const resultFee = estimateGas*feeData.gasPrice

//You can get the current estimateGas from any write function by specifying `true` in the last parameter
//Another example
const estimateGas = await decimalEVM.approveToken(tokenAddress, spender, amount, getEstimateGas)
const feeData = await decimalEVM.getFeeData()
const resultFeeForApproveToken = estimateGas*feeData.gasPrice
```


## Viewing functions

### Token

#### Check Token exists
```js
const tokenAddress = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
const result = await decimalEVM.checkTokenExists(tokenAddress)
```

#### Get address Token by symbol
```js
const symbol = "TKN"
const result = await decimalEVM.getAddressTokenBySymbol(symbol)
```

#### Get a commission for the specified symbol to create a new token
```js
const symbol = "TKN"
const result = await decimalEVM.getCommissionSymbol(symbol)
```

#### Calculate buy output
```js
// If you specify the number of DEL, you will calculate the number of tokens to buy tokens
const amountDel = decimalEVM.parseEther(10); // 10 DEL
const amountTokens = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel)
```

#### Calculate buy input
```js
// If you specify the number of tokens, you will calculate the number of DEL to buy tokens
const amountTokens = decimalEVM.parseEther(10); // 10 tokens 
const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountTokens)
```

#### Calculate Sell Input
```js
// If you specify the number of DEL, you will calculate the number of tokens to sell tokens
const amountDEL = decimalEVM.parseEther(10); // 10 DEL
const amountTokens = await decimalEVM.calculateSellInput(tokenAddress, amountDEL)
```

#### Get the number of DEL to send for the specified amount of tokens (for sell)
```js
// If you specify the number of tokens, you will calculate the number of DEL to sell tokens
const amountTokens = decimalEVM.parseEther(10); // 10 tokens 
const amountDEL = await decimalEVM.calculateSellOutput(tokenAddress, amountTokens)
```
    
#### Get signature for permit Token
```js
const spender = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // address of who will be allowed to spend amount
const amount = decimalEVM.parseEther(1);
const sign = await decimalEVM.getSignPermitToken(tokenAddress, spender, amount)
```

#### Get approved to spend of Token
```js
const result = await decimalEVM.allowanceToken(tokenAddress, owner, spender)
// the output example: true
```

#### Get balance of Token
```js
const result = await decimalEVM.balanceOfToken(tokenAddress, account)
```

#### Get supported interface Token
```js
const interfaceId = "0x01ffc9a7"
const result = await decimalEVM.supportsInterfaceToken(tokenAddress, interfaceId) 
```

### NFT 
#### Get type NFT (from subgraph)
```js
const result = await decimalEVM.getNftType(nftCollectionAddress)
 ```

#### Get type NFT (from contract)
```js
const result = await decimalEVM.getNftTypeFromContract(nftCollectionAddress)
 ```

#### Get approved to spend of ERC721
```js
const result = await decimalEVM.getApprovedNFT721(nftCollectionAddress, tokenId)
// the output example: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
 ```

#### Is approved for all NFT
```js
const result = await decimalEVM.isApprovedForAllNFT(nftCollectionAddress, owner, spender)
// the output example: true
 ```

#### Owner of ERC721
```js
const result = await decimalEVM.ownerOfNFT721(nftCollectionAddress, tokenId)
```

#### Get tokenURI of NFT
```js
const result = await decimalEVM.getTokenURINFT(nftCollectionAddress, tokenId)
```

#### Get allow mint of NFT
```js
const result = await decimalEVM.getAllowMintNFT(nftCollectionAddress)
```

#### Get balance of NFT
```js
const account = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"

// For ERC721
const result = await decimalEVM.balanceOfNFT(nftCollectionAddress, account)
// For ERC1155
const result = await decimalEVM.balanceOfNFT(nftCollectionAddress, account, tokenId)
```

#### Get supported interface NFT
```js
const interfaceId = "0x01ffc9a7"
const result = await decimalEVM.supportsInterfaceNFT(nftCollectionAddress, interfaceId) 
```

#### Get rate tokenId of ERC1155
```js
const tokenId = 0
const result = await decimalEVM.getRateNFT1155(nftCollectionAddress, tokenId)
```

#### Calculate amount reserve for repeat mint ERC1155
```js
const tokenId = 0
const quantity = 10 // 10 quantity for mint
const result = await decimalEVM.calcReserveNFT1155(nftCollectionAddress, tokenId, quantity)
```

#### Get signature for permit NFT
```js
const spender = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"; // address of who will be allowed to spend amount
const amount = decimalEVM.parseEther(1);

// for ERC721
const sign = await decimalEVM.getSignPermitERC721(nftCollectionAddress, spender, tokenId)

// for ERC1155
//const sign = await decimalEVM.getSignPermitERC1155(nftCollectionAddress, spender)
```

#### Get reserve NFT
```js
const tokenId = 0
const result = await decimalEVM.getReserveNFT(nftCollectionAddress, tokenId)
/* the output example:
{
  token: '0x0000000000000000000000000000000000000000',
  amount: '1000000000000000000',
  reserveType: 'ERC1155'
}
if token is 0x0000000000000000000000000000000000000000, then is DEL reserve
*/
```

#### Get status refundable the reserve after burning the NFT
```js
const result = await decimalEVM.getRefundableNFT(nftCollectionAddress)
```

#### Get supply tokenId of ERC1155
```js
const tokenId = 0
const result = await decimalEVM.getSupplyNFT1155(nftCollectionAddress, tokenId)
```


### Delegation

#### Get stakes by address
```js
const account = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
const result = await decimalEVM.getTokenStakesByMember(account)
```

#### Get page stakes by address
```js
const account = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
const size = 1000
const offset = 0 // offset of viewed steaks
const result = await decimalEVM.getTokenStakesPageByMember(account, size, offset)
```

#### Get Token frozen stakes queue
```js
const result = await decimalEVM.getFrozenStakesQueueToken()
```

#### Get Token freeze time
```js
const result = await decimalEVM.getFreezeTimeToken()
/* the output example:
{
  "Withdraw": 2592000n,
  "Transfer": 604800n
}
*/
```

#### Get stake Token
```js
const result = await decimalEVM.getStakeToken(validator, delegator, tokenAddress)
```

#### Get stakeId Token
```js
const result = await decimalEVM.getStakeIdToken(validator, delegator, tokenAddress)
```

### Delegation NFT

#### Get stakes NFT by address
```js
const account = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
const result = await decimalEVM.getNFTStakesByMember(account)
```

#### Get page stakes NFT by address
```js
const account = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
const size = 1000
const offset = 0 // offset of viewed steaks
const result = await decimalEVM.getNFTStakesPageByMember(account, size, offset)
```

#### Get NFT frozen stakes queue
```js
const result = await decimalEVM.getFrozenStakesQueueNFT()
```

#### Get NFT freeze time
```js
const result = await decimalEVM.getFreezeTimeNFT()
/* the output example:
{
  "Withdraw": 2592000n,
  "Transfer": 604800n
}
*/
```

### Validator

#### Get validator status
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const getValidatorStatus = await decimalEVM.getValidatorStatus(validator)
```

#### Get validator is active
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const validatorIsActive = await decimalEVM.validatorIsActive(validator)
```

#### Get validator is member
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const validatorIsMember = await decimalEVM.validatorIsMember(validator)
```


## Subgraph

#### Connect to Subgraph
```js
const { Subgraph, DecimalNetworks } = SDK;
const subgraph = new Subgraph(DecimalNetworks.testnet)

// In queries where `first` and `skip` is mentioned, you need to specify their value. `first` and `skip` parameter can be used to paginate
// The `first` argument must be between 0 and 1000
// The `skip` argument must be between 1 and 999999999
```

#### Get Decimal contracts
```js
const result = await subgraph.getDecimalContracts()
```


#### Get validators
```js
const result = await subgraph.getValidators()
```

### Validators

#### Get validator
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const result = await subgraph.getValidator(validator)
```

#### Get validator penalties
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const result = await subgraph.getValidatorPenalties(validator, first, skip)
```

#### Get validator penalties from blockNumber
```js
// You can see what penalties were at the time of the blockNumber
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const blockBumber = 7346728
const result = await subgraph.getValidatorPenaltiesFromBlock(validator, blockBumber, first, skip)
```

#### Get sum amount to penalty
```js
const result = await subgraph.getSumAmountToPenalty()
```

### Tokens

#### Get Tokens
```js
const result = await subgraph.getTokens(first, skip)
```

#### Get Tokens by owner
```js
const owner = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getTokensByOwner(owner, first, skip)
```

#### Get Token by symbol
```js
const symbol = 'SBT_TOKEN'
const result = await subgraph.getTokenBySymbol(symbol)
```

#### Get Token by address
```js
const tokenAddress = "0x24804c5a0da7a3e1a779b710647428795291b82a"
const result = await subgraph.getTokenByAddress(tokenAddress)
```

#### Get Token balances by account
```js
const account = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getAddressBalances(account, first, skip)
```

### Delegation Token

#### Get Token stakes
```js
const result = await subgraph.getStakes(first, skip)
```

#### Get Token stakes by delegator
```js
const delegator = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getStakesByAddress(delegator, first, skip)
```

#### Get Token stakes by validator
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const result = await subgraph.getStakesByValidotor(validator, first, skip)
```

#### Get Token transfer stakes
```js
const result = await subgraph.getTransferStakes(first, skip)
```

#### Get Token transfer stakes by delegator
```js
const delegator = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getTransferStakesByAddress(delegator, first, skip)
```

#### Get Token withdraw stakes
```js
const result = await subgraph.getWithdrawStakes(first, skip)
```

#### Get Token withdraw stakes by delegator
```js
const delegator = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getWithdrawStakesByAddress(delegator, first, skip)
```


### NFT

#### Get NFT Collections
```js
const result = await subgraph.getNftCollections(first, skip)
```

#### Get NFT Collections
```js
const owner = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getNftCollectionsByOwner(owner, first, skip)
```

#### Get NFT Collection by address NFT Connection
```js
const nftCollectionAddress = "0x15ea2325268864227d7eaf6a4b76cafbeec3050d"
const result = await subgraph.getNftCollectionByAddress(nftCollectionAddress)
```

#### Get NFT Collection type
```js
const nftCollectionAddress = "0x15ea2325268864227d7eaf6a4b76cafbeec3050d"
const result = await subgraph.getNftCollectionType(nftCollectionAddress)
```

#### Get NFTs
```js
const result = await subgraph.getNfts(first, skip)
```

#### Get NFTs by NFT Collection
```js
const nftCollectionAddress = "0x15ea2325268864227d7eaf6a4b76cafbeec3050d"
const result = await subgraph.getNftsByCollection(nftCollectionAddress, first, skip)
```

#### Get NFT balances by account
```js
const account = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getAddressBalancesNfts(account, first, skip)
```


### Delegation NFT

#### Get NFT stakes
```js
const result = await subgraph.getNFTStakes(first, skip)
```

#### Get NFT stakes by delegator
```js
const account = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getNFTStakesByAddress(account, first, skip)
```

#### Get NFT stakes by validator
```js
const validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"
const result = await subgraph.getNFTStakesByValidotor(validator, first, skip)
```

#### Get NFT transfer stakes
```js
const result = await subgraph.getTransferNFTStakes(first, skip)
```

#### Get Token transfer stakes by delegator
```js
const account = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getTransferNFTStakesByAddress(account, first, skip)
```

#### Get Token withdraw stakes
```js
const result = await subgraph.getWithdrawNFTStakes(first, skip)
```

#### Get Token withdraw stakes by delegator
```js
const account = "0x35119df12afdf848b7ef2536af2411ab0a611c45"
const result = await subgraph.getWithdrawNFTStakesByAddress(account, first, skip)
```


## IPFS

#### Example: Upload from filesystem (node js)
```js
const filePath = 'C:/Users/User/Desktop/unnamed.png'
const buffer = fs.readFileSync(filePath);

const filename = filePath
const name = 'NameNFT23'
const description = 'Description NFT2'
const result = await decimalEVM.uploadBufferToIPFS(buffer, filename, name, description)
/* example response
{
  file_cid_media: 'Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A',
  file_cid_meta: 'QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk'     // this cid is needed for contractURI or tokenURI
}
*/
```

#### Example: Upload from url (node js)
```js
const uri = `https://example.com/image.png`
const imageBlob = await fetch(uri).then((res) => res.blob());

const buffer = Buffer.from(await imageBlob.arrayBuffer());

const filename = uri
const name = 'NameNFT23'
const description = 'Description NFT2'
const result = await decimalEVM.uploadBufferToIPFS(buffer, filename, name, description)
/* example response
{
  file_cid_media: 'Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A',
  file_cid_meta: 'QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk'     // this cid is needed for contractURI or tokenURI
}
*/
```

#### Example: Upload from input (browser)
```js
const name = 'NameNFT23'
const description = 'Description NFT2'
const metadataBlob = await decimalEVM.getBlobMetadata(name, description)

var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('uploading_files', input.files[0])
data.append('uploading_files', metadataBlob)

const result = await decimalEVM.uploadToIPFS(data)
/* example response
{
  file_cid_media: 'Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A',
  file_cid_meta: 'QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk'     // this cid is needed for contractURI or tokenURI
}
*/
```

#### Example: Upload from url (browser)
```js
const name = 'NameNFT23'
const description = 'Description NFT2'
const metadataBlob = await decimalEVM.getBlobMetadata(name, description)

const imageBlob = await fetch(uri).then((res) => res.blob());

var data = new FormData()
data.append('uploading_files', imageBlob)
data.append('uploading_files', metadataBlob)

const result = await decimalEVM.uploadToIPFS(data)
/* example response
{
  file_cid_media: 'Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A',
  file_cid_meta: 'QmShfT7LRyjN4ZFNyGAK5YftGU7sa9xqTTukzPiYPsrLFk'     // this cid is needed for contractURI or tokenURI
}
*/
```

#### Get url ipfs from cid
```js
const cid = "Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A"
const result = decimalEVM.getUrlFromCid(cid)
/* example result
 https://testnet-nft-ipfs.decimalchain.com/ipfs/Qmaw2FvZamk5AsEBfbe3bz3c9yc7mfReRpmVfiMJMxs93A
*/
```

## Helper function

#### Convert ETH to wei
```js
const amountETH = 1   // amount ETH (string | number | bigint)
const amountWei = decimalEVM.parseEther(amountETH);    // 1000000000000000000 wei
```

#### Convert Wei to ETH
```js
const amountWei = BigInt(10000000000000000000000) // amount Wei (string | number | bigint)
const amountETH = decimalEVM.parseEther(amountWei);   // 10000 ETH

//const amountWei = '20000000000000' // amount Wei (string | number | bigint)
//const amountETH = decimalEVM.parseEther(amountWei);   // 0.00002 ETH
```

#### Address to a checksum address
```js
const address = decimalEVM.getAddress("0xd115bffabbdd893a6f7cea402e7338643ced44a6") // 0xD115BFFAbbdd893A6f7ceA402e7338643Ced44a6
```

#### Get latest block
```js
const block = await decimalEVM.getLatestBlock()
```

#### Get fee data
```js
const feeData = await decimalEVM.getFeeData()
```

#### Get instance Decimal contract
```js
// You can call to the contract you need using a instance of the contract
// Example
const tokenCenter = decimalEVM.getDecimalContract('token-center')
const tokenAddress = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
const result = await tokenCenter.isTokenExists(tokenAddress)
/* Available contracts
  contract-center
  token-center
  nft-center
  delegation
  delegation-nft
  master-validator
*/
```

## Contracts function

#### Verify contract
```js
const contractCode = `...`
const contractAddress = '0x21786df4741ab50cdfec064ad9aeef84898a86a4'

const compiler = 'solc-linux-amd64-v0.8.20+commit.a1b79de6'
const optimizer = "true"
const runs = "100"
const evm_version = "paris"
const contract = await decimalEVM.verifyСontract(contractAddress, contractCode, compiler, optimizer, runs, evm_version)
```

#### Call to verify contract
```js
  const contractAddress = '0x3c546e3eb206c0be7d3c9b85c81cd98700fd3db6'
  const contract = await decimalEVM.connectToContract(contractAddress)
  const owner = await contract.call("owner()")
  console.log(owner)
```

#### Call write fuction to verify contract
```js
const contractAddress = '0x3c546e3eb206c0be7d3c9b85c81cd98700fd3db6'
const contract = await decimalEVM.connectToContract(contractAddress)

const newToken: any = {
    tokenOwner: decimalWallet.evmAddress,
    symbol: 'COStest'+Math.floor(Math.random() * 10000),
    name: 'CosmosName',
    crr: 50,
    initialMint: decimalEVM.parseEther(1000),
    minTotalSupply: decimalEVM.parseEther(1),
    maxTotalSupply: decimalEVM.parseEther(5000000),
    identity: 'asd',
}
const reserve = decimalEVM.parseEther(1250);

const options = {
    ...await contract.getDefaultOptions(),
    value: reserve,
}

const tx = await contract.call("createToken", newToken, options)
```

#### Send signed transaction
```js
const newToken: any = {
    tokenOwner: decimalWallet.evmAddress,
    symbol: 'COStest'+Math.floor(Math.random() * 10000),
    name: 'CosmosName',
    crr: 50,
    initialMint: decimalEVM.parseEther(1000),
    minTotalSupply: decimalEVM.parseEther(1),
    maxTotalSupply: decimalEVM.parseEther(5000000),
    identity: 'asd',
}
const reserve = decimalEVM.parseEther(1250);

const contractAddress = decimalEVM.getDecimalContractAddress('token-center')

const contract = await decimalEVM.connectToContract(contractAddress, tokenCenterAbi)

const options = {
    ...await contract.getDefaultOptions(),
    value: reserve,
}

const populateTransaction = await contract.populateTransaction("createToken", newToken, options)
populateTransaction.chainId = 20202020 //for ethres 5.5.1

const signTransaction = await contract.signTransaction(populateTransaction)

//send signed populateTransaction
const sendTransaction = await contract.sendSignedTransaction(signTransaction)
console.log(sendTransaction)

// or send just populateTransaction
//const sendTransaction = await contract.sendTransaction(populateTransaction)
//console.log(sendTransaction)
```