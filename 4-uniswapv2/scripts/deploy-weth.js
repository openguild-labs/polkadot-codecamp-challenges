const hre = require("hardhat");

async function main() {
  const WETH = await hre.ethers.getContractFactory("WETH");
  const weth = await WETH.deploy();

  console.log("⏳ Deploying WETH...");
  await weth.waitForDeployment();

  console.log("✅ WETH deployed at:", await weth.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});