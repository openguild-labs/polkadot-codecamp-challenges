const { expect } = require("chai");
const hre = require("hardhat");

describe("UniswapV2", function () {
  let factory;
  let tokenA;
  let tokenB;
  let pair;
  let owner;
  let user1;
  let user2;

  const INITIAL_SUPPLY = hre.ethers.parseEther("1000000"); // 1 million tokens
  const MINIMUM_LIQUIDITY = 1000n;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();

    // Deploy Factory
    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
    factory = await Factory.deploy(owner.address);
    await factory.waitForDeployment();

    // Deploy Test Tokens
    const ERC20 = await hre.ethers.getContractFactory("ERC20");
    tokenA = await ERC20.deploy("Token A", "TKA", INITIAL_SUPPLY);
    tokenB = await ERC20.deploy("Token B", "TKB", INITIAL_SUPPLY);
    await tokenA.waitForDeployment();
    await tokenB.waitForDeployment();

    // Sort tokens (token0 should be the smaller address)
    const tokenAAddress = await tokenA.getAddress();
    const tokenBAddress = await tokenB.getAddress();
    if (tokenAAddress.toLowerCase() > tokenBAddress.toLowerCase()) {
      [tokenA, tokenB] = [tokenB, tokenA];
    }
  });

  describe("UniswapV2Factory", function () {
    it("should set feeToSetter correctly", async function () {
      expect(await factory.feeToSetter()).to.equal(owner.address);
    });

    it("should create a pair", async function () {
      const tokenAAddress = await tokenA.getAddress();
      const tokenBAddress = await tokenB.getAddress();

      await factory.createPair(tokenAAddress, tokenBAddress);

      const pairAddress = await factory.getPair(tokenAAddress, tokenBAddress);
      expect(pairAddress).to.not.equal(hre.ethers.ZeroAddress);
      expect(await factory.allPairsLength()).to.equal(1);
    });

    it("should not create duplicate pair", async function () {
      const tokenAAddress = await tokenA.getAddress();
      const tokenBAddress = await tokenB.getAddress();

      await factory.createPair(tokenAAddress, tokenBAddress);

      await expect(
        factory.createPair(tokenAAddress, tokenBAddress)
      ).to.be.revertedWith("UniswapV2: PAIR_EXISTS");
    });

    it("should not create pair with identical tokens", async function () {
      const tokenAAddress = await tokenA.getAddress();

      await expect(
        factory.createPair(tokenAAddress, tokenAAddress)
      ).to.be.revertedWith("UniswapV2: IDENTICAL_ADDRESSES");
    });

    it("should not create pair with zero address", async function () {
      const tokenAAddress = await tokenA.getAddress();

      await expect(
        factory.createPair(tokenAAddress, hre.ethers.ZeroAddress)
      ).to.be.revertedWith("UniswapV2: ZERO_ADDRESS");
    });

    it("should allow feeToSetter to set feeTo", async function () {
      await factory.setFeeTo(user1.address);
      expect(await factory.feeTo()).to.equal(user1.address);
    });

    it("should not allow non-feeToSetter to set feeTo", async function () {
      await expect(
        factory.connect(user1).setFeeTo(user1.address)
      ).to.be.revertedWith("UniswapV2: FORBIDDEN");
    });
  });

  describe("UniswapV2Pair", function () {
    beforeEach(async function () {
      // Create pair
      const tokenAAddress = await tokenA.getAddress();
      const tokenBAddress = await tokenB.getAddress();
      await factory.createPair(tokenAAddress, tokenBAddress);

      const pairAddress = await factory.getPair(tokenAAddress, tokenBAddress);
      pair = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);
    });

    it("should have correct token addresses", async function () {
      const tokenAAddress = await tokenA.getAddress();
      const tokenBAddress = await tokenB.getAddress();

      expect(await pair.token0()).to.equal(tokenAAddress);
      expect(await pair.token1()).to.equal(tokenBAddress);
    });

    it("should have factory address set", async function () {
      expect(await pair.factory()).to.equal(await factory.getAddress());
    });

    describe("Liquidity", function () {
      const LIQUIDITY_AMOUNT = hre.ethers.parseEther("10000");

      it("should add liquidity (mint)", async function () {
        const pairAddress = await pair.getAddress();

        // Transfer tokens to pair
        await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT);
        await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT);

        // Mint liquidity tokens
        await pair.mint(owner.address);

        // Check LP balance (minus MINIMUM_LIQUIDITY)
        const expectedLiquidity = LIQUIDITY_AMOUNT - MINIMUM_LIQUIDITY;
        expect(await pair.balanceOf(owner.address)).to.equal(expectedLiquidity);

        // Check reserves
        const reserves = await pair.getReserves();
        expect(reserves[0]).to.equal(LIQUIDITY_AMOUNT);
        expect(reserves[1]).to.equal(LIQUIDITY_AMOUNT);
      });

      it("should remove liquidity (burn)", async function () {
        const pairAddress = await pair.getAddress();

        // Add liquidity first
        await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT);
        await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT);
        await pair.mint(owner.address);

        // Get LP balance
        const lpBalance = await pair.balanceOf(owner.address);

        // Transfer LP tokens to pair for burning
        await pair.transfer(pairAddress, lpBalance);

        // Get balances before burn
        const balanceABefore = await tokenA.balanceOf(owner.address);
        const balanceBBefore = await tokenB.balanceOf(owner.address);

        // Burn liquidity
        await pair.burn(owner.address);

        // Check tokens returned
        const balanceAAfter = await tokenA.balanceOf(owner.address);
        const balanceBAfter = await tokenB.balanceOf(owner.address);

        expect(balanceAAfter).to.be.gt(balanceABefore);
        expect(balanceBAfter).to.be.gt(balanceBBefore);

        // LP balance should be 0
        expect(await pair.balanceOf(owner.address)).to.equal(0);
      });
    });

    describe("Swap", function () {
      const LIQUIDITY_AMOUNT = hre.ethers.parseEther("10000");
      const SWAP_AMOUNT = hre.ethers.parseEther("100");

      beforeEach(async function () {
        // Add liquidity
        const pairAddress = await pair.getAddress();
        await tokenA.transfer(pairAddress, LIQUIDITY_AMOUNT);
        await tokenB.transfer(pairAddress, LIQUIDITY_AMOUNT);
        await pair.mint(owner.address);
      });

      it("should swap token0 for token1", async function () {
        const pairAddress = await pair.getAddress();

        // Transfer tokenA to pair
        await tokenA.transfer(pairAddress, SWAP_AMOUNT);

        // Calculate expected output (with 0.3% fee)
        const reserves = await pair.getReserves();
        const amountInWithFee = SWAP_AMOUNT * 997n;
        const numerator = amountInWithFee * reserves[1];
        const denominator = reserves[0] * 1000n + amountInWithFee;
        const amountOut = numerator / denominator;

        // Get balance before
        const balanceBefore = await tokenB.balanceOf(user1.address);

        // Swap
        await pair.swap(0, amountOut, user1.address, "0x");

        // Check balance after
        const balanceAfter = await tokenB.balanceOf(user1.address);
        expect(balanceAfter - balanceBefore).to.equal(amountOut);
      });

      it("should swap token1 for token0", async function () {
        const pairAddress = await pair.getAddress();

        // Transfer tokenB to pair
        await tokenB.transfer(pairAddress, SWAP_AMOUNT);

        // Calculate expected output
        const reserves = await pair.getReserves();
        const amountInWithFee = SWAP_AMOUNT * 997n;
        const numerator = amountInWithFee * reserves[0];
        const denominator = reserves[1] * 1000n + amountInWithFee;
        const amountOut = numerator / denominator;

        // Get balance before
        const balanceBefore = await tokenA.balanceOf(user1.address);

        // Swap
        await pair.swap(amountOut, 0, user1.address, "0x");

        // Check balance after
        const balanceAfter = await tokenA.balanceOf(user1.address);
        expect(balanceAfter - balanceBefore).to.equal(amountOut);
      });

      it("should fail swap with insufficient output amount", async function () {
        await expect(
          pair.swap(0, 0, user1.address, "0x")
        ).to.be.revertedWith("UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT");
      });

      it("should fail swap with insufficient liquidity", async function () {
        const hugeAmount = hre.ethers.parseEther("100000");
        await expect(
          pair.swap(hugeAmount, 0, user1.address, "0x")
        ).to.be.revertedWith("UniswapV2: INSUFFICIENT_LIQUIDITY");
      });
    });
  });

  describe("ERC20", function () {
    it("should have correct name and symbol", async function () {
      expect(await tokenA.tokenName()).to.equal("Token A");
      expect(await tokenA.tokenSymbol()).to.equal("TKA");
    });

    it("should mint initial supply to deployer", async function () {
      expect(await tokenA.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("should allow faucet", async function () {
      const faucetAmount = hre.ethers.parseEther("1000");
      await tokenA.faucet(user1.address, faucetAmount);
      expect(await tokenA.balanceOf(user1.address)).to.equal(faucetAmount);
    });

    it("should transfer tokens", async function () {
      const transferAmount = hre.ethers.parseEther("100");
      await tokenA.transfer(user1.address, transferAmount);
      expect(await tokenA.balanceOf(user1.address)).to.equal(transferAmount);
    });

    it("should approve and transferFrom", async function () {
      const amount = hre.ethers.parseEther("100");

      await tokenA.approve(user1.address, amount);
      expect(await tokenA.allowance(owner.address, user1.address)).to.equal(amount);

      await tokenA.connect(user1).transferFrom(owner.address, user2.address, amount);
      expect(await tokenA.balanceOf(user2.address)).to.equal(amount);
    });
  });
});
