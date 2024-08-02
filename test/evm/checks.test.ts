import SDK from '../../src/index'

jest.setTimeout(2000000)

const mnemonic1 = 'dutch clap mystery cost crush yellow unfair race like casual pole genre local zero liberty vibrant assist banana pact network churn pause finger dirt';
const mnemonic2 = 'concert kid human author paddle rather outdoor wood slab wrap pioneer genuine ghost eight visa weather hybrid either route fortune alone seven nerve black';

describe('checks', () => {

    test('create checks for DEL and redeem', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);

        await decimalEVM.connect('checks')

        const latestBlock = await decimalEVM.getLatestBlock()
        const dueBlock = latestBlock!.number + 200;

        const countChecks = 5;
        const passwords = decimalEVM.getRandomPassword(countChecks, 15)

        const amount = decimalEVM.parseEther('2')
        const gas = await decimalEVM.createChecksDEL(passwords, amount, dueBlock, true)
        const {tx, checks} = await decimalEVM.createChecksDEL(passwords, amount, dueBlock);
        console.log(checks)

        const txRedeem = await decimalEVM.redeemChecks([passwords[0]], [checks[0]])
    })

    test('create checks for Tokens (approve) and redeem', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);

        await decimalEVM.connect('checks')

        const latestBlock = await decimalEVM.getLatestBlock()
        const dueBlock = latestBlock!.number + 200;

        const countChecks = 5;
        const passwords = decimalEVM.getRandomPassword(countChecks, 15)

        const amount = 2
        const amountWei = decimalEVM.parseEther(amount)
        const totalAmount = decimalEVM.parseEther(passwords.length * amount)
        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        const checksAddress = await decimalEVM.getDecimalContractAddress('checks')

        await decimalEVM.approveToken(tokenAddress, checksAddress, totalAmount)
        const gas = await decimalEVM.createChecksToken(passwords, amountWei, dueBlock, tokenAddress, undefined, true)
        const {tx, checks} = await decimalEVM.createChecksToken(passwords, amountWei, dueBlock, tokenAddress);
        console.log(checks)

        const txRedeem = await decimalEVM.redeemChecks([passwords[0]], [checks[0]])
    })

    
    test('create checks for Tokens (permit) and redeem', async() => {
        const { Wallet, DecimalEVM, DecimalNetworks } = SDK;
        const decimalWallet1 = new Wallet(mnemonic1);

        const decimalEVM = new DecimalEVM(decimalWallet1, DecimalNetworks.devnet);

        await decimalEVM.connect('checks')

        const latestBlock = await decimalEVM.getLatestBlock()
        const dueBlock = latestBlock!.number + 200;

        const countChecks = 5;
        const passwords = decimalEVM.getRandomPassword(countChecks, 15)

        const amount = 2
        const amountWei = decimalEVM.parseEther(amount)
        const totalAmount = decimalEVM.parseEther(passwords.length * amount)
        const tokenAddress = "0xe1E885a848DC0c0867E119E7e80289f98e27256C"
        const checksAddress = await decimalEVM.getDecimalContractAddress('checks')

        const sign = await decimalEVM.getSignPermitToken(tokenAddress, checksAddress, totalAmount)
        const gas = await decimalEVM.createChecksToken(passwords, amountWei, dueBlock, tokenAddress, sign, true)
        const {tx, checks} = await decimalEVM.createChecksToken(passwords, amountWei, dueBlock, tokenAddress, sign);
        console.log(checks)

        const txRedeem = await decimalEVM.redeemChecks([passwords[0]], [checks[0]])
    })

})


