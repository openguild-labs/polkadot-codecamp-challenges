const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Deployer:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");

  const factory = await Factory.deploy(deployer.address);

  console.log("⏳ Deploying Factory...");
  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();
  console.log("✅ Factory deployed at:", factoryAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
