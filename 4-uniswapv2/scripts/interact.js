const hre = require('hardhat')
const prompts = require('prompts')

async function main() {
    const [signer] = await hre.ethers.getSigners()
    console.log('Using account:', signer.address)
    console.log('Network:', hre.network.name)

    const factoryAddr = process.env.FACTORY_ADDRESS
    const tokenAAddr = process.env.TOKEN_A_ADDRESS
    const tokenBAddr = process.env.TOKEN_B_ADDRESS

    if (!factoryAddr || !tokenAAddr || !tokenBAddr) {
        console.log('\nPlease set FACTORY_ADDRESS, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS env vars')
        console.log('Example:')
        console.log(
            `FACTORY_ADDRESS=0x... TOKEN_A_ADDRESS=0x... TOKEN_B_ADDRESS=0x... npx hardhat run scripts/interact.js --network ${hre.network.name}`
        )
        return
    }

    const factory = await hre.ethers.getContractAt('UniswapV2Factory', factoryAddr)
    const tokenA = await hre.ethers.getContractAt('ERC20', tokenAAddr)
    const tokenB = await hre.ethers.getContractAt('ERC20', tokenBAddr)

    let running = true
    while (running) {
        const { action } = await prompts({
            type: 'select',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { title: 'View all pairs', value: 'pairs' },
                { title: 'Check token balances', value: 'balances' },
                { title: 'Create pair', value: 'create' },
                { title: 'Add liquidity', value: 'add' },
                { title: 'Swap tokens', value: 'swap' },
                { title: 'Remove liquidity', value: 'remove' },
                { title: 'Exit', value: 'exit' },
            ],
        })

        if (action === 'exit' || action === undefined) {
            running = false
            break
        }

        try {
            if (action === 'pairs') {
                const length = await factory.allPairsLength()
                console.log(`\nTotal pairs: ${length}`)
                for (let i = 0; i < length; i++) {
                    const pairAddr = await factory.allPairs(i)
                    const pair = await hre.ethers.getContractAt('UniswapV2Pair', pairAddr)
                    const [r0, r1] = await pair.getReserves()
                    const t0 = await pair.token0()
                    const t1 = await pair.token1()
                    console.log(`  Pair ${i}: ${pairAddr}`)
                    console.log(`    Token0: ${t0} | Token1: ${t1}`)
                    console.log(`    Reserve0: ${hre.ethers.formatEther(r0)} | Reserve1: ${hre.ethers.formatEther(r1)}`)
                }
            } else if (action === 'balances') {
                const balA = await tokenA.balanceOf(signer.address)
                const balB = await tokenB.balanceOf(signer.address)
                console.log(`\nToken A balance: ${hre.ethers.formatEther(balA)}`)
                console.log(`Token B balance: ${hre.ethers.formatEther(balB)}`)
            } else if (action === 'create') {
                console.log('\nCreating pair...')
                const tx = await factory.createPair(tokenAAddr, tokenBAddr)
                await tx.wait()
                const pairAddr = await factory.getPair(tokenAAddr, tokenBAddr)
                console.log('Pair created at:', pairAddr)
            } else if (action === 'add') {
                const { amount } = await prompts({
                    type: 'text',
                    name: 'amount',
                    message: 'Amount of each token to add (e.g., 1000):',
                })
                const pairAddr = await factory.getPair(tokenAAddr, tokenBAddr)
                const amountWei = hre.ethers.parseEther(amount)
                console.log('Transferring tokens to pair...')
                await (await tokenA.transfer(pairAddr, amountWei)).wait()
                await (await tokenB.transfer(pairAddr, amountWei)).wait()
                const pair = await hre.ethers.getContractAt('UniswapV2Pair', pairAddr)
                console.log('Minting LP tokens...')
                await (await pair.mint(signer.address)).wait()
                const lpBal = await pair.balanceOf(signer.address)
                console.log(`LP tokens received: ${hre.ethers.formatEther(lpBal)}`)
            } else if (action === 'swap') {
                const { swapAmount } = await prompts({
                    type: 'text',
                    name: 'swapAmount',
                    message: 'Amount of Token A to swap for Token B:',
                })
                const pairAddr = await factory.getPair(tokenAAddr, tokenBAddr)
                const pair = await hre.ethers.getContractAt('UniswapV2Pair', pairAddr)
                const amountIn = hre.ethers.parseEther(swapAmount)
                const [r0, r1] = await pair.getReserves()
                const token0 = await pair.token0()

                let amountOut
                if (tokenAAddr.toLowerCase() === token0.toLowerCase()) {
                    const fee = amountIn * 997n
                    amountOut = (fee * r1) / (r0 * 1000n + fee)
                    await (await tokenA.transfer(pairAddr, amountIn)).wait()
                    await (await pair.swap(0, amountOut, signer.address, '0x')).wait()
                } else {
                    const fee = amountIn * 997n
                    amountOut = (fee * r0) / (r1 * 1000n + fee)
                    await (await tokenA.transfer(pairAddr, amountIn)).wait()
                    await (await pair.swap(amountOut, 0, signer.address, '0x')).wait()
                }
                console.log(`Swapped! Received: ${hre.ethers.formatEther(amountOut)} Token B`)
            } else if (action === 'remove') {
                const pairAddr = await factory.getPair(tokenAAddr, tokenBAddr)
                const pair = await hre.ethers.getContractAt('UniswapV2Pair', pairAddr)
                const lpBal = await pair.balanceOf(signer.address)
                console.log(`\nYour LP balance: ${hre.ethers.formatEther(lpBal)}`)
                const { removeAmount } = await prompts({
                    type: 'text',
                    name: 'removeAmount',
                    message: 'LP tokens to burn:',
                })
                const removeWei = hre.ethers.parseEther(removeAmount)
                await (await pair.transfer(pairAddr, removeWei)).wait()
                await (await pair.burn(signer.address)).wait()
                console.log('Liquidity removed!')
            }
        } catch (err) {
            console.error('Error:', err.message)
        }

        console.log('')
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
