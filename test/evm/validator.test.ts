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
        const decimalWallet2 = new Wallet(mnemonic2);
        
        const decimalEVM = new DecimalEVM(decimalWallet, DecimalNetworks.devnet);
        await decimalEVM.connect();

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

        const resultAdd = await decimalEVM.addValidator(newValidator)
        const resultRemove = await decimalEVM.removeValidator(newValidator)

        const arrayValidator:any[] = [];
        arrayValidator.push(newValidator)
        newValidator.operator_address = decimalWallet2.evmAddress
        newValidator.consensus_pubkey.key = decimalWallet2.getPublicKeyString()

        const resultAddBatch = await decimalEVM.addValidators(arrayValidator)

        const pauseValidator = await decimalEVM.pauseValidator(newValidator.operator_address)
        const unpauseValidator = await decimalEVM.unpauseValidator(newValidator.operator_address)

        const getValidatorStatus = await decimalEVM.getValidatorStatus(newValidator.operator_address)
        const validatorIsActive = await decimalEVM.validatorIsActive(newValidator.operator_address)
        const validatorIsMember = await decimalEVM.validatorIsMember(newValidator.operator_address)

        console.log(`successfully 
            addValidator 
            addValidators
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