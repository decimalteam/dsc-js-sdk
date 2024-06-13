import SDK from '../../src/index'

jest.setTimeout(60000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';

const Validator = "0x75BF4906ae6d68A013FD1a6F9D04297cd463222d"

describe('Delegation', () => {

    test('delegate DEL', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();
  
            const amount = decimalEVM.parseEther(1) //1 del
            await decimalEVM.delegateDEL(Validator, amount)
            console.log(`successfully delegateDEL`)
        } catch (e) {
            console.log(e)
        }
    });

    test('delegate token with approve', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            //prepare
            const newToken: any = {
                tokenOwner: decimalWallet.evmAddress,
                symbol: 'COStestSymbol'+Math.floor(Math.random() * 10000),
                name: 'CosmosName',
                crr: 50,
                initialMint: decimalEVM.parseEther(1000),
                minTotalSupply: decimalEVM.parseEther(1),
                maxTotalSupply: decimalEVM.parseEther(5000000),
                identity: 'asd',
            }
            const reserve = decimalEVM.parseEther(1000);
            const {tokenAddress} = await decimalEVM.createToken(newToken, reserve)
            //delegate
            const amount = decimalEVM.parseEther(1) //1 token
            const delegationAddress = await decimalEVM.getDecimalContractAddress('delegation')

            await decimalEVM.approveToken(tokenAddress, delegationAddress, amount)
            await decimalEVM.delegateToken(Validator, tokenAddress, amount)
            console.log(`successfully delegateToken`)
        } catch (e) {
            console.log(e)
        }
    });
    test('delegate token with permit', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            //prepare
            const newToken: any = {
                tokenOwner: decimalWallet.evmAddress,
                symbol: 'COStestSymbol'+Math.floor(Math.random() * 10000),
                name: 'CosmosName',
                crr: 50,
                initialMint: decimalEVM.parseEther(1000),
                minTotalSupply: decimalEVM.parseEther(1),
                maxTotalSupply: decimalEVM.parseEther(5000000),
                identity: 'asd',
            }
            const reserve = decimalEVM.parseEther(1000);
            const {tokenAddress} = await decimalEVM.createToken(newToken, reserve)

            //delegate
            const amount = decimalEVM.parseEther(1) //1 token

            const owner = decimalWallet.evmAddress!

            const delegationAddress  = await decimalEVM.getDecimalContractAddress('delegation')
            const sign = await decimalEVM.getSignPermitToken(tokenAddress, delegationAddress, amount)
            await decimalEVM.delegateToken(Validator, tokenAddress, amount, sign)
            console.log(`successfully delegateToken`)

            const stakes = await decimalEVM.getTokenStakesByMember(owner)
            console.log(stakes)
        } catch (e) {
            console.log(e)
        }
    });
    test('transfer stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            let stakes = await decimalEVM.getTokenStakesByMember(owner)
            const stake = stakes[0] // first stake
            const newValidator = "0x5c089e1b93fef3d7f7672e8d515eba846f42b924"
            await decimalEVM.transferStakeToken(stake.validator, stake.token, stake.amount, newValidator)
            console.log(`successfully transferStakeToken`)
        } catch (e) {
            console.log(e)
        }
    });
    
    test('withdraw stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            let stakes = await decimalEVM.getTokenStakesByMember(owner)
            const stake = stakes[0] // first stake
            await decimalEVM.withdrawStakeToken(stake.validator, stake.token, stake.amount)
            console.log(`successfully withdrawStakeToken`)
        } catch (e) {
            console.log(e)
        }
    });

    test('apply penalty to stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            let stakes = await decimalEVM.getTokenStakesByMember(owner)
            const stake = stakes[0] // first stake
            const result = await decimalEVM.applyPenaltyToStakeToken(stake.validator, stake.delegator, stake.token)
            if (result.error == null) {
                //successfully transaction: result.tx
            } else {
                console.log(result.error == 'NothingToBurn' ? 'Nothing to burn, there is no need for applyPenaltyToStakeToken' : result.error)
            }
            console.log(`successfully applyPenaltyToStakeToken`)
        } catch (e) {
            console.log(e)
        }
    });
    
    test('apply penalties to stake', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            let stakes = await decimalEVM.getTokenStakesByMember(owner)
            const stake = stakes[0] // first stake
            const result = await decimalEVM.applyPenaltiesToStakeToken(stake.validator, stake.delegator, stake.token)
            if (result.error == null) {
                //successfully transaction: result.tx
            } else {
                console.log(result.error == 'NoPenaltyToApply' ? 'Nothing to burn, there is no need for applyPenaltiesToStakeToken' : result.error)
            }
            console.log(`successfully applyPenaltiesToStakeToken`)
        } catch (e) {
            console.log(e)
        }
    });

    test('complete stake after frozen', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            const result = await decimalEVM.getFrozenStakesQueueToken()
            const resultFrozen = result.map((frozen:any, index:number) => {
                return {
                    index: index,
                    stake: {
                        validator: frozen[0][0],
                        delegator: frozen[0][1],
                        token: frozen[0][2],
                        amount: frozen[0][3],
                        tokenId: frozen[0][4],
                        tokenType: frozen[0][5]
                    },
                    freezeType: frozen[1],
                    unfreezeTimestamp: frozen[2]
                }
            })

            const block = await decimalEVM.getLatestBlock();
            const frozenFiltered = resultFrozen.filter(({stake, unfreezeTimestamp}) => stake.delegator == decimalEVM.getAddress(owner) && unfreezeTimestamp <= block.timestamp)
            if (frozenFiltered.length > 0) {
                const index = frozenFiltered[0].index // first frozen (ready to be complete) by delegator

                const result = await decimalEVM.completeStakeToken([index])
                if (result.error == null) {
                    //successfully completeStakeToken
                } else {
                    console.log(result.error)
                }
            } else {
                console.log(`There is no need for completeStakeToken`)
            }

        } catch (e) {
            console.log(e)
        }
    });
    
    test('others view functions', async() => {
        try {
            // Sdk.
            const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
            const decimalWallet = new Wallet(mnemonic);
          
            const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
            await decimalEVM.connect();

            const owner = decimalWallet.evmAddress!

            let stakes = await decimalEVM.getTokenStakesByMember(owner)
            const stake = stakes[0] // first stake

            const [
                resultFreezeTimeToken,
                resultStakeToken,
                resultStakeIdToken,
              ] = await Promise.all([
                decimalEVM.getFreezeTimeToken(),
                decimalEVM.getStakeToken(stake.validator, stake.delegator, stake.token),
                decimalEVM.getStakeIdToken(stake.validator, stake.delegator, stake.token),
              ])

            console.log(`
                resultFreezeTimeToken Transfer: ${resultFreezeTimeToken.Transfer} Withdraw: ${resultFreezeTimeToken.Withdraw} 
                resultStakeToken ${resultStakeToken}
                resultStakeIdToken ${resultStakeIdToken}
            `)

        } catch (e) {
            console.log(e)
        }
    })
    
})