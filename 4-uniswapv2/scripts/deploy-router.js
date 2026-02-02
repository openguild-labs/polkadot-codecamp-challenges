const hre = require("hardhat");

async function main() {
  const factoryAddress = "0x7a525E9Dc37A47d57718300e0325C79B9eC3a216"; // Factory của bạn
  const wethAddress = "0x314060c25EB2417BA2e3a427C3220043C984a54C";

  console.log("🚀 Deploying Router...");
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02");
  const router = await Router.deploy(factoryAddress, wethAddress);
  await router.waitForDeployment();

  console.log("✅ Router deployed at:", await router.getAddress());
}

main().catch(console.error);
