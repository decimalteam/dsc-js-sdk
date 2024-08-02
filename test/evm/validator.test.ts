import SDK from '../../src/index'

jest.setTimeout(2000000)

const mnemonic = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

describe('Validators', () => {

    test('validator', async() => {
      try {
        // Sdk.
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet = new Wallet(mnemonic);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();
        
        const newValidator: any = {
            operator_address: decimalWallet.evmAddress,
            reward_address: decimalWallet.evmAddress,
            consensus_pubkey: Buffer.from(decimalWallet.getPublicKey().key.buffer).toString('base64'),
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
        const masterValidatorAddress = await decimalEVM.getDecimalContractAddress('master-validator')
        await decimalEVM.approveToken(tokenAddress, masterValidatorAddress, stakeValidator.amount)
        const resultAddWithToken = await decimalEVM.addValidatorWithToken(newValidator, stakeValidator)
        const pauseValidator = await decimalEVM.pauseValidator(newValidator.operator_address)
        const unpauseValidator = await decimalEVM.unpauseValidator(newValidator.operator_address)
        const getValidatorStatus = await decimalEVM.getValidatorStatus(newValidator.operator_address)
        const validatorIsActive = await decimalEVM.validatorIsActive(newValidator.operator_address)
        const validatorIsMember = await decimalEVM.validatorIsMember(newValidator.operator_address)
        const resultRemove = await decimalEVM.removeValidator(newValidator)
        const resultAddWithETH = await decimalEVM.addValidatorWithETH(newValidator, decimalEVM.parseEther(2))

        console.log('5')
        console.log(`successfully 
            addValidator 
            removeValidator
            pauseValidator
            unpauseValidator
            getValidatorStatus ${getValidatorStatus}
            validatorIsActive ${validatorIsActive}
            validatorIsMember ${validatorIsMember}
        `)
      } catch (e) {
        console.log(e)
      }
    });
});