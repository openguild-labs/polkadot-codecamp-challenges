const hre = require('hardhat')
const { createWalletClient, createPublicClient, http } = require('viem')

async function main() {
    console.log('='.repeat(60))
    console.log('Deploying Uniswap V2 contracts to', hre.network.name)
    console.log('='.repeat(60))

    const [deployer] = await hre.ethers.getSigners()
    console.log('\nDeployer address:', deployer.address)

    try {
        const balance = await hre.ethers.provider.getBalance(deployer.address)
        console.log('Account balance:', hre.ethers.formatEther(balance), 'PAS\n')
    } catch (error) {
        console.log('Could not fetch balance\n')
    }

    // 1. Upload UniswapV2Pair bytecode to chain
    // PolkaVM requires contract code to exist on-chain before CREATE2 can use it.
    // We use viem to send this deployment directly, bypassing hardhat's
    // micro-eth-signer which enforces EIP-3860 initcode size limits client-side.
    // The PolkaVM chain itself accepts larger initcode.
    console.log('1. Uploading UniswapV2Pair bytecode to chain...')
    const Pair = await hre.ethers.getContractFactory('UniswapV2Pair')
    const pairBytecode = Pair.bytecode

    const rpcUrl = hre.network.config.url
    const chainId = (await hre.ethers.provider.getNetwork()).chainId

    const viemChain = {
        id: Number(chainId),
        name: hre.network.name,
        nativeCurrency: { name: 'PAS', symbol: 'PAS', decimals: 18 },
        rpcUrls: { default: { http: [rpcUrl] } },
    }

    const viemPublic = createPublicClient({ chain: viemChain, transport: http(rpcUrl) })
    const viemWallet = createWalletClient({
        chain: viemChain,
        transport: http(rpcUrl),
        account: { address: deployer.address, type: 'json-rpc' },
    })

    // Send raw deployment tx via the RPC (node signs it since we're using json-rpc account)
    // If the node doesn't support eth_sendTransaction, fall back to signing with private key
    let pairUploadHash
    try {
        pairUploadHash = await viemWallet.deployContract({
            abi: [],
            bytecode: pairBytecode,
        })
    } catch (e) {
        // If json-rpc signing not supported, use privateKey account
        const { privateKeyToAccount } = require('viem/accounts')
        const account = privateKeyToAccount(process.env.PRIVATE_KEY)
        const signingClient = createWalletClient({
            chain: viemChain,
            transport: http(rpcUrl),
            account,
        })
        pairUploadHash = await signingClient.deployContract({
            abi: [],
            bytecode: pairBytecode,
        })
    }

    console.log('   Tx sent:', pairUploadHash)
    const pairReceipt = await viemPublic.waitForTransactionReceipt({ hash: pairUploadHash })
    console.log('   Pair code uploaded via:', pairReceipt.contractAddress)

    // 2. Deploy UniswapV2Factory
    console.log('\n2. Deploying UniswapV2Factory...')
    const Factory = await hre.ethers.getContractFactory('UniswapV2Factory')
    const factory = await Factory.deploy(deployer.address)
    await factory.waitForDeployment()
    const factoryAddress = await factory.getAddress()
    console.log('   UniswapV2Factory deployed to:', factoryAddress)

    // 3. Deploy Test Tokens
    console.log('\n3. Deploying Test Tokens...')
    const ERC20 = await hre.ethers.getContractFactory('ERC20')
    const initialSupply = hre.ethers.parseEther('1000000')

    console.log('   Deploying Token A (TKA)...')
    const tokenA = await ERC20.deploy('Token A', 'TKA', initialSupply)
    await tokenA.waitForDeployment()
    const tokenAAddress = await tokenA.getAddress()
    console.log('   Token A deployed to:', tokenAAddress)

    console.log('   Deploying Token B (TKB)...')
    const tokenB = await ERC20.deploy('Token B', 'TKB', initialSupply)
    await tokenB.waitForDeployment()
    const tokenBAddress = await tokenB.getAddress()
    console.log('   Token B deployed to:', tokenBAddress)

    // 4. Create a Pair
    console.log('\n4. Creating TKA/TKB Pair...')
    const createPairTx = await factory.createPair(tokenAAddress, tokenBAddress)
    await createPairTx.wait()
    const pairAddress = await factory.getPair(tokenAAddress, tokenBAddress)
    console.log('   TKA/TKB Pair created at:', pairAddress)

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('DEPLOYMENT SUMMARY')
    console.log('='.repeat(60))
    console.log('\nContract Addresses:')
    console.log('-'.repeat(60))
    console.log('UniswapV2Factory:', factoryAddress)
    console.log('Token A (TKA):   ', tokenAAddress)
    console.log('Token B (TKB):   ', tokenBAddress)
    console.log('TKA/TKB Pair:    ', pairAddress)
    console.log('-'.repeat(60))
    console.log('\nNetwork:', hre.network.name)
    console.log('Chain ID:', chainId.toString())
    console.log('-'.repeat(60))
    console.log('\nSave these addresses for frontend configuration!')
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
