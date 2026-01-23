const { expect } = require("chai");
const { ethers } = require("hardhat");

const MINIMUM_LIQUIDITY = 1000n;

function sqrtBigInt(value) {
  if (value < 0n) throw new Error("negative");
  if (value < 2n) return value;
  let x0 = value / 2n;
  let x1 = (x0 + value / x0) / 2n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) / 2n;
  }
  return x0;
}

async function deployFixture() {
  const [owner, user] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("MyERC20");
  const tokenA = await Token.deploy("TokenA", "TKA", 18);
  const tokenB = await Token.deploy("TokenB", "TKB", 18);

  const Factory = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(owner.address);

  await factory.createPair(tokenA.target, tokenB.target);
  const pairAddress = await factory.getPair(tokenA.target, tokenB.target);
  const Pair = await ethers.getContractFactory("UniswapV2Pair");
  const pair = Pair.attach(pairAddress);

  // sort helper
  const token0 = await pair.token0();
  const token1 = await pair.token1();

  return { owner, user, tokenA, tokenB, token0, token1, factory, pair };
}

async function mintBoth(tokenA, tokenB, to, amountA, amountB) {
  await tokenA.mint(to, amountA);
  await tokenB.mint(to, amountB);
}

async function addLiquidity(pair, tokenA, tokenB, token0, token1, provider, rawA, rawB) {
  // rawA/rawB are BigInt
  const amount0 = token0 === tokenA.target ? rawA : rawB;
  const amount1 = token1 === tokenB.target ? rawB : rawA;

  const token0Contract = token0 === tokenA.target ? tokenA : tokenB;
  const token1Contract = token1 === tokenB.target ? tokenB : tokenA;

  await token0Contract.transfer(pair.target, amount0);
  await token1Contract.transfer(pair.target, amount1);
  await pair.mint(provider);
  return { amount0, amount1 };
}

function expectReserves(reserves, expected0, expected1) {
  expect(reserves[0]).to.equal(expected0);
  expect(reserves[1]).to.equal(expected1);
}

describe("Uniswap V2 core", function () {
  it("faucets/mints tokens to a user", async function () {
    const { user, tokenA } = await deployFixture();
    const mintAmount = ethers.parseUnits("1000", 18);
    await tokenA.mint(user.address, mintAmount);
    expect(await tokenA.balanceOf(user.address)).to.equal(mintAmount);
  });

  it("creates a pair and stores addresses sorted", async function () {
    const { tokenA, tokenB, pair, token0, token1 } = await deployFixture();
    expect([token0, token1].sort()).to.deep.equal([tokenA.target, tokenB.target].sort());
    expect(await pair.factory()).to.not.equal(ethers.ZeroAddress);
  });

  it("mints LP tokens on add liquidity and updates reserves", async function () {
    const { owner, tokenA, tokenB, token0, token1, pair } = await deployFixture();
    const amountA = ethers.parseUnits("1000000", 18); // 1,000,000
    const amountB = ethers.parseUnits("2000000", 18); // 2,000,000

    await mintBoth(tokenA, tokenB, owner.address, amountA, amountB);

    const { amount0, amount1 } = await addLiquidity(
      pair,
      tokenA,
      tokenB,
      token0,
      token1,
      owner.address,
      amountA,
      amountB
    );

    const expectedLiquidity = sqrtBigInt(amount0 * amount1) - MINIMUM_LIQUIDITY;
    expect(await pair.balanceOf(owner.address)).to.equal(expectedLiquidity);
    expect(await pair.totalSupply()).to.equal(expectedLiquidity + MINIMUM_LIQUIDITY);

    const reserves = await pair.getReserves();
    expectReserves(reserves, amount0, amount1);
  });

  it("burns LP on remove liquidity and returns underlying tokens", async function () {
    const { owner, tokenA, tokenB, token0, token1, pair } = await deployFixture();
    const amountA = ethers.parseUnits("500000", 18);
    const amountB = ethers.parseUnits("500000", 18);

    await mintBoth(tokenA, tokenB, owner.address, amountA, amountB);
    await addLiquidity(pair, tokenA, tokenB, token0, token1, owner.address, amountA, amountB);

    const liquidity = await pair.balanceOf(owner.address);
    await pair.transfer(pair.target, liquidity);
    const tx = await pair.burn(owner.address);
    await tx.wait();

    const balanceA = await tokenA.balanceOf(owner.address);
    const balanceB = await tokenB.balanceOf(owner.address);

    // First mint locks MINIMUM_LIQUIDITY in the pool forever, so the provider gets a pro-rata share
    const expectedReturn = amountA - (amountA * MINIMUM_LIQUIDITY) / sqrtBigInt(amountA * amountB);
    expect(balanceA).to.equal(expectedReturn);
    expect(balanceB).to.equal(expectedReturn);
    expect(await pair.totalSupply()).to.equal(MINIMUM_LIQUIDITY);
  });

  it("swaps token0 for token1 respecting 0.3% fee", async function () {
    const { owner, tokenA, tokenB, token0, token1, pair } = await deployFixture();
    const seedA = ethers.parseUnits("100000", 18);
    const seedB = ethers.parseUnits("100000", 18);

    await mintBoth(tokenA, tokenB, owner.address, seedA, seedB);
    await addLiquidity(pair, tokenA, tokenB, token0, token1, owner.address, seedA, seedB);

    // swap token0 -> token1
    const amountIn = ethers.parseUnits("1000", 18);
    const inToken = token0 === tokenA.target ? tokenA : tokenB;
    const outToken = token0 === tokenA.target ? tokenB : tokenA;

    // top up trader for the swap (initial liquidity deposit drained the wallet)
    await inToken.mint(owner.address, amountIn);

    await inToken.transfer(pair.target, amountIn);

    const reserves = await pair.getReserves();
    const reserveIn = token0 === tokenA.target ? reserves[0] : reserves[1];
    const reserveOut = token0 === tokenA.target ? reserves[1] : reserves[0];

    const amountInWithFee = amountIn * 997n;
    const amountOut = (amountInWithFee * reserveOut) / (reserveIn * 1000n + amountInWithFee);

    const amount0Out = token0 === tokenA.target ? 0n : amountOut;
    const amount1Out = token0 === tokenA.target ? amountOut : 0n;

    const beforeOutBal = await outToken.balanceOf(owner.address);
    await pair.swap(amount0Out, amount1Out, owner.address, "0x");
    const afterOutBal = await outToken.balanceOf(owner.address);

    expect(afterOutBal - beforeOutBal).to.equal(amountOut);
  });
});
