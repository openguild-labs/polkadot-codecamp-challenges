const hre = require('hardhat')

async function main() {
    console.log('Deploying Counter contract to', hre.network.name, '...\n')

    // Get signers
    const [deployer] = await hre.ethers.getSigners()
    console.log('Deploying with account:', deployer.address)

    // Get account balance
    try {
        const balance = await hre.ethers.provider.getBalance(deployer.address)
        console.log('Account balance:', hre.ethers.formatEther(balance), 'PAS\n')
    } catch (error) {
        console.log('Could not fetch balance\n')
    }

    // Deploy Counter contract with initial count of 0
    console.log('Deploying Counter contract...')
    const Counter = await hre.ethers.getContractFactory('Counter')
    const counter = await Counter.deploy(0)

    console.log('Waiting for deployment...')
    await counter.waitForDeployment()

    const counterAddress = await counter.getAddress()
    console.log('\n✅ Counter deployed successfully!')
    console.log('Contract address:', counterAddress)

    console.log('\n📝 Save this address to interact with your contract:')
    console.log(
        `CONTRACT_ADDRESS=${counterAddress} npx hardhat run scripts/interact.js --network ${hre.network.name}`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
