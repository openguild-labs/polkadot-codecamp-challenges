const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();

  const routerAddress = "DÁN ĐỊA CHỈ ROUTER VỪA DEPLOY Ở TRÊN";
  const pairAddress = "0x696bF0956a26F906512bF69eaC7aEAb85b5C9B20";

  const pair = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);
  const token0Addr = await pair.token0();

  const token0 = await hre.ethers.getContractAt("IERC20", token0Addr);
  const router = await hre.ethers.getContractAt("SimpleRouter", routerAddress);

  const amountIn = hre.ethers.parseEther("1");

  console.log("🔑 Approving token0...");
  await (await token0.approve(routerAddress, amountIn)).wait();

  console.log("🔄 Swapping token0 → token1...");
  await (await router.swapExactToken0ForToken1(amountIn)).wait();

  console.log("✅ Swap SUCCESS");
}

main().catch(console.error);
