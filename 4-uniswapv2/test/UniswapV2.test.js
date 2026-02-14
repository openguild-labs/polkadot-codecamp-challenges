const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('UniswapV2', function () {
    let factory
    let tokenA
    let tokenB
    let pair
    let owner
    let addr1

    const INITIAL_SUPPLY = ethers.parseEther('1000000')
    const MINIMUM_LIQUIDITY = 1000n

    beforeEach(async function () {
        ;[owner, addr1] = await ethers.getSigners()

        // Deploy tokens
        const ERC20 = await ethers.getContractFactory('ERC20')
        tokenA = await ERC20.deploy('Token A', 'TKA', INITIAL_SUPPLY)
        tokenB = await ERC20.deploy('Token B', 'TKB', INITIAL_SUPPLY)

        // Ensure tokenA address < tokenB address for consistency
        const addrA = await tokenA.getAddress()
        const addrB = await tokenB.getAddress()
        if (addrA.toLowerCase() > addrB.toLowerCase()) {
            ;[tokenA, tokenB] = [tokenB, tokenA]
        }

        // Deploy factory
        const Factory = await ethers.getContractFactory('UniswapV2Factory')
        factory = await Factory.deploy(owner.address)
    })

    describe('UniswapV2Factory', function () {
        it('Should set the feeToSetter to deployer', async function () {
            expect(await factory.feeToSetter()).to.equal(owner.address)
        })

        it('Should have zero pairs initially', async function () {
            expect(await factory.allPairsLength()).to.equal(0)
        })

        it('Should create a pair', async function () {
            const tokenAAddr = await tokenA.getAddress()
            const tokenBAddr = await tokenB.getAddress()

            await factory.createPair(tokenAAddr, tokenBAddr)
            expect(await factory.allPairsLength()).to.equal(1)

            const pairAddress = await factory.getPair(tokenAAddr, tokenBAddr)
            expect(pairAddress).to.not.equal(ethers.ZeroAddress)
        })

        it('Should not allow creating duplicate pairs', async function () {
            const tokenAAddr = await tokenA.getAddress()
            const tokenBAddr = await tokenB.getAddress()

            await factory.createPair(tokenAAddr, tokenBAddr)
            await expect(
                factory.createPair(tokenAAddr, tokenBAddr)
            ).to.be.revertedWith('UniswapV2: PAIR_EXISTS')
        })

        it('Should not allow creating pair with identical tokens', async function () {
            const tokenAAddr = await tokenA.getAddress()
            await expect(
                factory.createPair(tokenAAddr, tokenAAddr)
            ).to.be.revertedWith('UniswapV2: IDENTICAL_ADDRESSES')
        })

        it('Should allow setting feeTo', async function () {
            await factory.setFeeTo(addr1.address)
            expect(await factory.feeTo()).to.equal(addr1.address)
        })

        it('Should not allow non-feeToSetter to set feeTo', async function () {
            await expect(
                factory.connect(addr1).setFeeTo(addr1.address)
            ).to.be.revertedWith('UniswapV2: FORBIDDEN')
        })
    })

    describe('UniswapV2Pair', function () {
        beforeEach(async function () {
            const tokenAAddr = await tokenA.getAddress()
            const tokenBAddr = await tokenB.getAddress()

            await factory.createPair(tokenAAddr, tokenBAddr)
            const pairAddress = await factory.getPair(tokenAAddr, tokenBAddr)
            pair = await ethers.getContractAt('UniswapV2Pair', pairAddress)
        })

        it('Should have correct token addresses', async function () {
            const token0 = await pair.token0()
            const token1 = await pair.token1()
            const tokenAAddr = await tokenA.getAddress()
            const tokenBAddr = await tokenB.getAddress()

            expect([token0.toLowerCase(), token1.toLowerCase()]).to.include(tokenAAddr.toLowerCase())
            expect([token0.toLowerCase(), token1.toLowerCase()]).to.include(tokenBAddr.toLowerCase())
        })

        it('Should have zero reserves initially', async function () {
            const [reserve0, reserve1] = await pair.getReserves()
            expect(reserve0).to.equal(0)
            expect(reserve1).to.equal(0)
        })

        describe('Mint (Add Liquidity)', function () {
            const LIQUIDITY_AMOUNT = ethers.parseEther('1000')

            it('Should mint liquidity tokens', async function () {
                const pairAddress = await pair.getAddress()

                // Transfer tokens to pair
                await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT)

                // Mint LP tokens
                await pair.mint(owner.address)

                // Check LP balance (first mint locks MINIMUM_LIQUIDITY)
                const lpBalance = await pair.balanceOf(owner.address)
                expect(lpBalance).to.equal(LIQUIDITY_AMOUNT - MINIMUM_LIQUIDITY)

                // Check reserves
                const [reserve0, reserve1] = await pair.getReserves()
                expect(reserve0).to.equal(LIQUIDITY_AMOUNT)
                expect(reserve1).to.equal(LIQUIDITY_AMOUNT)
            })

            it('Should mint proportional LP tokens for subsequent deposits', async function () {
                const pairAddress = await pair.getAddress()

                // First deposit
                await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await pair.mint(owner.address)

                // Second deposit (same amounts)
                await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await pair.mint(owner.address)

                const lpBalance = await pair.balanceOf(owner.address)
                // First mint: 1000e18 - 1000, second mint: 1000e18
                expect(lpBalance).to.equal(LIQUIDITY_AMOUNT * 2n - MINIMUM_LIQUIDITY)
            })
        })

        describe('Swap', function () {
            const LIQUIDITY_AMOUNT = ethers.parseEther('10000')

            beforeEach(async function () {
                const pairAddress = await pair.getAddress()
                await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await pair.mint(owner.address)
            })

            it('Should swap token0 for token1', async function () {
                const swapAmount = ethers.parseEther('100')
                const pairAddress = await pair.getAddress()

                // Transfer tokenA to pair for the swap
                await tokenA.transfer(pairAddress, swapAmount)

                // Calculate expected output (with 0.3% fee)
                const [reserve0, reserve1] = await pair.getReserves()
                const token0Addr = await pair.token0()
                const tokenAAddr = await tokenA.getAddress()

                let amountOut
                if (token0Addr.toLowerCase() === tokenAAddr.toLowerCase()) {
                    // Swapping token0 for token1
                    const amountInWithFee = swapAmount * 997n
                    amountOut = (amountInWithFee * reserve1) / (reserve0 * 1000n + amountInWithFee)
                    await pair.swap(0, amountOut, owner.address, '0x')
                } else {
                    // Swapping token1 for token0
                    const amountInWithFee = swapAmount * 997n
                    amountOut = (amountInWithFee * reserve0) / (reserve1 * 1000n + amountInWithFee)
                    await pair.swap(amountOut, 0, owner.address, '0x')
                }

                expect(amountOut).to.be.gt(0)
            })

            it('Should fail swap with insufficient output', async function () {
                await expect(
                    pair.swap(0, 0, owner.address, '0x')
                ).to.be.revertedWith('UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT')
            })

            it('Should fail swap with insufficient liquidity', async function () {
                const tooMuch = ethers.parseEther('100000')
                await expect(
                    pair.swap(tooMuch, 0, owner.address, '0x')
                ).to.be.revertedWith('UniswapV2: INSUFFICIENT_LIQUIDITY')
            })
        })

        describe('Burn (Remove Liquidity)', function () {
            const LIQUIDITY_AMOUNT = ethers.parseEther('1000')

            beforeEach(async function () {
                const pairAddress = await pair.getAddress()
                await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT)
                await pair.mint(owner.address)
            })

            it('Should burn LP tokens and return underlying tokens', async function () {
                const pairAddress = await pair.getAddress()
                const lpBalance = await pair.balanceOf(owner.address)

                // Transfer LP tokens to pair for burning
                await pair.transfer(pairAddress, lpBalance)

                // Burn LP tokens
                await pair.burn(owner.address)

                // LP balance should be zero
                expect(await pair.balanceOf(owner.address)).to.equal(0)

                // Reserves should be reduced to MINIMUM_LIQUIDITY
                const [reserve0, reserve1] = await pair.getReserves()
                expect(reserve0).to.equal(MINIMUM_LIQUIDITY)
                expect(reserve1).to.equal(MINIMUM_LIQUIDITY)
            })
        })
    })

    describe('UniswapV2ERC20 (LP Token)', function () {
        beforeEach(async function () {
            const tokenAAddr = await tokenA.getAddress()
            const tokenBAddr = await tokenB.getAddress()
            await factory.createPair(tokenAAddr, tokenBAddr)
            const pairAddress = await factory.getPair(tokenAAddr, tokenBAddr)
            pair = await ethers.getContractAt('UniswapV2Pair', pairAddress)

            // Add liquidity to get LP tokens
            const amount = ethers.parseEther('1000')
            await tokenA.transfer(pairAddress, amount)
            await tokenB.transfer(pairAddress, amount)
            await pair.mint(owner.address)
        })

        it('Should have correct name and symbol', async function () {
            expect(await pair.name()).to.equal('Uniswap V2')
            expect(await pair.symbol()).to.equal('UNI-V2')
        })

        it('Should have 18 decimals', async function () {
            expect(await pair.decimals()).to.equal(18)
        })

        it('Should transfer LP tokens', async function () {
            const amount = ethers.parseEther('100')
            await pair.transfer(addr1.address, amount)
            expect(await pair.balanceOf(addr1.address)).to.equal(amount)
        })

        it('Should approve and transferFrom LP tokens', async function () {
            const amount = ethers.parseEther('100')
            await pair.approve(addr1.address, amount)
            expect(await pair.allowance(owner.address, addr1.address)).to.equal(amount)

            await pair.connect(addr1).transferFrom(owner.address, addr1.address, amount)
            expect(await pair.balanceOf(addr1.address)).to.equal(amount)
        })
    })
})
