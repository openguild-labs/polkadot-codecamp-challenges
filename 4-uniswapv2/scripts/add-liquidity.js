const hre = require("hardhat");

async function main() {
  const pairAddress = "0x696bF0956a26F906512bF69eaC7aEAb85b5C9B20";

  const pair = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);

  const token0Addr = await pair.token0();
  const token1Addr = await pair.token1();

  const token0 = await hre.ethers.getContractAt("MyERC20", token0Addr);
  const token1 = await hre.ethers.getContractAt("MyERC20", token1Addr);

  const [deployer] = await hre.ethers.getSigners();

  const amount0 = hre.ethers.parseEther("500");
  const amount1 = hre.ethers.parseEther("500");

  // 👉 MINT TOKEN TRƯỚC
  await token0.mint(deployer.address, amount0);
  await token1.mint(deployer.address, amount1);

  // 👉 TRANSFER ĐÚNG THỨ TỰ token0 → token1
  await token0.transfer(pairAddress, amount0);
  await token1.transfer(pairAddress, amount1);

  // 👉 MINT LP
  await pair.mint(deployer.address);

  console.log("✅ Liquidity added successfully");
}

main().catch(console.error);
