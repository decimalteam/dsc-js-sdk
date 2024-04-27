import SDK from '../../src/index'

jest.setTimeout(60000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

describe('Tokens', () => {

    test('create token', async() => {

      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.testnet);
        await decimalEVM.connect();

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
        const estimateGas = await decimalEVM.createToken(newToken, reserve, true)
        console.log(estimateGas)
        const {tx, tokenAddress} = await decimalEVM.createToken(newToken, reserve)
        console.log(tx)
        console.log(`successfully createToken ${tokenAddress}`)
      } catch (e) {
        console.log(e)
      }
    });

    test('convert token', async() => {

      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        //prepare
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
        const resultToken1 = await decimalEVM.createToken(newToken, reserve)

        newToken.symbol = 'COStest'+Math.floor(Math.random() * 10000);
        const resultToken2 = await decimalEVM.createToken(newToken, reserve)


        const recipient = decimalWallet.evmAddress!
        const tokenCenterAddress = decimalEVM.getDecimalContractAddress('token-center')

        const amountOut = decimalEVM.parseEther(100); // tokens 
        const amountDel = await decimalEVM.calculateBuyInput(resultToken1.tokenAddress, amountOut) // the amount of DEL to buy 100 tokens
        await decimalEVM.buyExactTokenForDEL(resultToken1.tokenAddress, amountDel, amountOut, recipient)

        const amountIn = amountOut
        const futureDEL = await decimalEVM.calculateSellOutput(resultToken1.tokenAddress, amountIn)
        const amountOutMin = await decimalEVM.calculateBuyOutput(resultToken2.tokenAddress, futureDEL)
        //convert with approve
        await decimalEVM.approveToken(resultToken1.tokenAddress, tokenCenterAddress, amountIn)
        await decimalEVM.convertToken(resultToken1.tokenAddress, resultToken2.tokenAddress, amountIn, amountOutMin, recipient)
        
        const amountOut_2 = decimalEVM.parseEther(100); // tokens 
        const amountDel_2 = await decimalEVM.calculateBuyInput(resultToken1.tokenAddress, amountOut_2) // the amount of DEL to buy 100 tokens
        await decimalEVM.buyExactTokenForDEL(resultToken1.tokenAddress, amountDel_2, amountOut_2, recipient)

        const amountIn_2 = amountOut_2
        const futureDEL_2 = await decimalEVM.calculateSellOutput(resultToken1.tokenAddress, amountIn_2)
        const amountOutMin_2 = await decimalEVM.calculateBuyOutput(resultToken2.tokenAddress, futureDEL_2)
        //convert with permit
        const sign = await decimalEVM.getSignPermitToken(resultToken1.tokenAddress, tokenCenterAddress, amountIn_2)
        await decimalEVM.convertToken(resultToken1.tokenAddress, resultToken2.tokenAddress, amountIn_2, amountOutMin_2, recipient, sign)

        console.log(`successfully convertToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('approve token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')
        const spender = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
        const amount = decimalEVM.parseEther(1);
        const tx = await decimalEVM.approveToken(tokenAddress, spender, amount)
        console.log(`successfully approve`)
      } catch (e) {
        console.log(e)
      }
    });

    test('transfer token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')
        const to = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
        const amount = decimalEVM.parseEther(1);
        const tx = await decimalEVM.transferToken(tokenAddress, to, amount)
        console.log(`successfully transferToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('transferFrom token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);

        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const newToken: any = {
          tokenOwner: decimalWallet.evmAddress,
          symbol: 'COStest'+Math.floor(Math.random() * 10000),
          name: 'CosmosName',
          crr: 50,
          initialMint: decimalEVM.parseEther(1000),
          minTotalSupply: decimalEVM.parseEther(1),
          maxTotalSupply: decimalEVM.parseEther(5000000),
          identity: '7815696ecbf1c96e6894b779456d330e', // gravatar md5 hash
        }
        const reserve = decimalEVM.parseEther(1250);
        const result  = await decimalEVM.createToken(newToken, reserve)
        const tokenAddress = result?.tokenAddress

        const decimalWallet2 = new Wallet(mnemonic2);

        const decimalEVM2 = new DecimalEVM(decimalWallet2, DecimalNetworks.devnet);
        await decimalEVM2.connect();


        const spender = decimalWallet2.evmAddress!;
        const amount = decimalEVM.parseEther(1);
        const tx = await decimalEVM.approveToken(tokenAddress, spender, amount)

        const owner = decimalWallet.evmAddress!;
        const allowance = await decimalEVM.allowanceToken(tokenAddress, owner, spender)
        if (amount != allowance) throw new Error("don't have allowance for spender")
    
        const from = decimalWallet.evmAddress!
        const to = spender
        const tx2 = await decimalEVM2.transferFromToken(tokenAddress, from, to, amount)
        console.log(`successfully transferFromToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('burn token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')
        const amount = decimalEVM.parseEther(1);
        const tx = await decimalEVM.burnToken(tokenAddress, amount)
        console.log(`successfully burnToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('buy token (buy Token For Exact DEL)', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        const recipient = decimalWallet.evmAddress!;
        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const amountDel = decimalEVM.parseEther(10); // DEL
        const amountOutMin = await decimalEVM.calculateBuyOutput(tokenAddress, amountDel) // the minimum number of tokens to receive for 10 DEL
        const tx = await decimalEVM.buyTokenForExactDEL(tokenAddress, amountDel, amountOutMin, recipient)
        console.log(`successfully buyTokenForExactDEL`)
      } catch (e) {
        console.log(e)
      }
    });

    test('buy token (buy Exact Token For DEL)', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        const recipient = decimalWallet.evmAddress!;
        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const amountOut = decimalEVM.parseEther(10); // tokens 
        const amountDel = await decimalEVM.calculateBuyInput(tokenAddress, amountOut) // the amount of DEL to buy 10 tokens
        const tx = await decimalEVM.buyExactTokenForDEL(tokenAddress, amountDel, amountOut, recipient)
        console.log(`successfully buyExactTokenForDEL`)
      } catch (e) {
        console.log(e)
      }
    });

    test('sell token (sell Tokens For Exact DEL)', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        const recipient = decimalWallet.evmAddress!;
        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const amountOut = decimalEVM.parseEther(10); // DEL
        const amountInMax = await decimalEVM.calculateSellInput(tokenAddress, amountOut) // the number of tokens sold to receive 10 DEL
        const tx = await decimalEVM.sellTokensForExactDEL(tokenAddress, amountOut, amountInMax, recipient)
        console.log(`successfully sellTokensForExactDEL`)
      } catch (e) {
        console.log(e)
      }
    });

    test('sell token (sell Exact Tokens For DEL)', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        const recipient = decimalWallet.evmAddress!;
        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const amountIn = decimalEVM.parseEther(10); // tokens
        const amountOutMin = await decimalEVM.calculateSellOutput(tokenAddress, amountIn) // the minimum amount of DEL to sell 10 tokens
        const tx = await decimalEVM.sellExactTokensForDEL(tokenAddress, amountIn, amountOutMin, recipient)
        console.log(`successfully sellExactTokensForDEL`)
      } catch (e) {
        console.log(e)
      }
    });

    test('update details token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const newIdentity = 'qwertyasd123';
        const newMaxTotalSupply = decimalEVM.parseEther(5000000);
        const tx = await decimalEVM.updateDetailsToken(tokenAddress, newIdentity, newMaxTotalSupply)
        console.log(`successfully updateDetailsToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('get signature for permit token', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const spender = decimalWallet2.evmAddress!;
        const amount = decimalEVM.parseEther(1);

        const sign = await decimalEVM.getSignPermitToken(tokenAddress, spender, amount)
        console.log(`
          successfully getSignPermitToken
          v: ${sign?.v}
          r: ${sign?.r}
          s: ${sign?.s}
        `)

        const owner = decimalWallet.evmAddress!;
        const tx = await decimalEVM.permitToken(tokenAddress, owner, spender, amount, sign)
        console.log(`successfully permitToken`)
      } catch (e) {
        console.log(e)
      }
    });

    test('others view functions', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

        const tokenAddress = await decimalEVM.getAddressTokenBySymbol('COStest')

        const account = decimalWallet.evmAddress!;
        const balanceWEi = await decimalEVM.balanceOfToken(tokenAddress, account)
        const balanceEther = decimalEVM.formatEther(balanceWEi)

        const interfaceId = "0x01ffc9a7"
        const support = await decimalEVM.supportsInterfaceToken(tokenAddress, interfaceId)

        console.log(`
          balanceWEi ${balanceWEi}
          balanceEther ${balanceEther}
          supportsInterface ${interfaceId} is ${support}
        `)
        
      } catch (e) {
        console.log(e)
      }
    });
    
  })