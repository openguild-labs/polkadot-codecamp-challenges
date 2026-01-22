const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Deploying SimpleRouter with:", deployer.address);

  const pairAddress = "0x696bF0956a26F906512bF69eaC7aEAb85b5C9B20";

  const Router = await hre.ethers.getContractFactory("SimpleRouter");
  const router = await Router.deploy(pairAddress);

  await router.waitForDeployment();

  console.log("✅ SimpleRouter deployed at:", await router.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
