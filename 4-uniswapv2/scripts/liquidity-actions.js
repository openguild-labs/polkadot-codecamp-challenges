const hre = require("hardhat");

const { ethers } = hre;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

async function getToken(address) {
  return hre.ethers.getContractAt("MyERC20", address);
}

async function getPair(address) {
  return hre.ethers.getContractAt("UniswapV2Pair", address);
}

async function faucetToken(to, tokenAddress, rawAmount) {
  const token = await getToken(tokenAddress);
  const decimals = await token.decimals();
  const amount = ethers.parseUnits(rawAmount, decimals);
  const tx = await token.mint(to, amount);
  await tx.wait();
  console.log(`Fauceted ${rawAmount} tokens from ${tokenAddress} to ${to}`);
}

async function createPair(factoryAddress, tokenA, tokenB) {
  const factory = await hre.ethers.getContractAt("UniswapV2Factory", factoryAddress);
  const tx = await factory.createPair(tokenA, tokenB);
  const receipt = await tx.wait();
  const pairAddress = await factory.getPair(tokenA, tokenB);
  console.log(`Pair created for ${tokenA}/${tokenB} at ${pairAddress}`);
  return { receipt, pairAddress };
}

async function addLiquidity(pairAddress, tokenA, tokenB, rawAmountA, rawAmountB, to) {
  const pair = await getPair(pairAddress);
  const [token0, token1] = [await pair.token0(), await pair.token1()];
  const erc20A = await getToken(tokenA);
  const erc20B = await getToken(tokenB);
  const decimalsA = await erc20A.decimals();
  const decimalsB = await erc20B.decimals();
  const amountA = ethers.parseUnits(rawAmountA, decimalsA);
  const amountB = ethers.parseUnits(rawAmountB, decimalsB);

  // Transfer in desired amounts then mint LP to receiver
  await (await erc20A.transfer(pairAddress, amountA)).wait();
  await (await erc20B.transfer(pairAddress, amountB)).wait();
  const tx = await pair.mint(to);
  const receipt = await tx.wait();
  console.log(`Added liquidity: ${rawAmountA} (tokenA) + ${rawAmountB} (tokenB) -> LP to ${to}`);
  return receipt;
}

async function removeLiquidity(pairAddress, liquidityRaw, to) {
  const pair = await getPair(pairAddress);
  const decimals = 18; // LP token decimals are 18
  const liquidity = ethers.parseUnits(liquidityRaw, decimals);
  await (await pair.transfer(pairAddress, liquidity)).wait();
  const tx = await pair.burn(to);
  const receipt = await tx.wait();
  console.log(`Removed liquidity: ${liquidityRaw} LP burned, assets sent to ${to}`);
  return receipt;
}

function computeAmountOut(amountIn, reserveIn, reserveOut) {
  const amountInWithFee = amountIn * 997n;
  const numerator = amountInWithFee * reserveOut;
  const denominator = reserveIn * 1000n + amountInWithFee;
  return numerator / denominator;
}

async function swapExactTokens(pairAddress, tokenIn, tokenOut, rawAmountIn, minRawAmountOut, to) {
  const pair = await getPair(pairAddress);
  const token0 = await pair.token0();
  const token1 = await pair.token1();
  if (tokenIn !== token0 && tokenIn !== token1) throw new Error("tokenIn not in pair");
  if (tokenOut !== token0 && tokenOut !== token1) throw new Error("tokenOut not in pair");

  const erc20In = await getToken(tokenIn);
  const decimalsIn = await erc20In.decimals();
  const amountIn = ethers.parseUnits(rawAmountIn, decimalsIn);

  const [reserve0, reserve1] = await pair.getReserves();
  const reserveIn = tokenIn === token0 ? reserve0 : reserve1;
  const reserveOut = tokenIn === token0 ? reserve1 : reserve0;

  const amountOut = computeAmountOut(amountIn, reserveIn, reserveOut);
  const minOut = minRawAmountOut
    ? ethers.parseUnits(minRawAmountOut, await (await getToken(tokenOut)).decimals())
    : 0n;
  if (amountOut < minOut) throw new Error("Slippage: amountOut < minOut");

  // move input tokens into the pair, then swap
  await (await erc20In.transfer(pairAddress, amountIn)).wait();

  const [amount0Out, amount1Out] = tokenIn === token0
    ? [0, amountOut]
    : [amountOut, 0];

  const tx = await pair.swap(amount0Out, amount1Out, to, "0x");
  const receipt = await tx.wait();
  console.log(`Swapped ${rawAmountIn} of ${tokenIn} for ~${amountOut} (${tokenOut}), sent to ${to}`);
  return receipt;
}

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const action = process.env.ACTION;
  if (!action) throw new Error("Set ACTION env var: faucet | create-pair | add-liquidity | remove-liquidity | swap");

  switch (action) {
    case "faucet": {
      const token = requireEnv("TOKEN_ADDRESS");
      const to = process.env.TO || signer.address;
      const amount = requireEnv("AMOUNT");
      await faucetToken(to, token, amount);
      break;
    }
    case "create-pair": {
      const factory = requireEnv("FACTORY_ADDRESS");
      const tokenA = requireEnv("TOKEN_A");
      const tokenB = requireEnv("TOKEN_B");
      await createPair(factory, tokenA, tokenB);
      break;
    }
    case "add-liquidity": {
      const pair = requireEnv("PAIR_ADDRESS");
      const tokenA = requireEnv("TOKEN_A");
      const tokenB = requireEnv("TOKEN_B");
      const amountA = requireEnv("AMOUNT_A");
      const amountB = requireEnv("AMOUNT_B");
      const to = process.env.TO || signer.address;
      await addLiquidity(pair, tokenA, tokenB, amountA, amountB, to);
      break;
    }
    case "remove-liquidity": {
      const pair = requireEnv("PAIR_ADDRESS");
      const liquidity = requireEnv("LIQUIDITY");
      const to = process.env.TO || signer.address;
      await removeLiquidity(pair, liquidity, to);
      break;
    }
    case "swap": {
      const pair = requireEnv("PAIR_ADDRESS");
      const tokenIn = requireEnv("TOKEN_IN");
      const tokenOut = requireEnv("TOKEN_OUT");
      const amountIn = requireEnv("AMOUNT_IN");
      const minAmountOut = process.env.MIN_AMOUNT_OUT; // optional
      const to = process.env.TO || signer.address;
      await swapExactTokens(pair, tokenIn, tokenOut, amountIn, minAmountOut, to);
      break;
    }
    default:
      throw new Error(`Unknown ACTION ${action}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
