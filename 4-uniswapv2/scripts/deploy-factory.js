const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment of UniswapV2Factory...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await Factory.deploy(deployer.address);

  await factoryInstance.waitForDeployment();
  const address = await factoryInstance.getAddress();

  console.log(`✅ UniswapV2Factory deployed to: ${address}`);
  console.log("👉 SAVE THIS ADDRESS for your frontend!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
