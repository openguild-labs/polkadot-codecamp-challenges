const hre = require("hardhat");

async function deployERC20Token(name, symbol) {
  console.log(`Deploying ${name}...`);

  const Token = await hre.ethers.getContractFactory("MyERC20");
  const token = await Token.deploy(name, symbol, 18);

  console.log("Waiting for deployment...");
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log(`✅ ${name} deployed at: ${address}`);

  return address;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deployer address:", deployer.address);

  await deployERC20Token("TokenA", "TKA");
  await deployERC20Token("TokenB", "TKB");
}

main().catch((err) => {
  console.error("❌ ERROR:", err);
  process.exit(1);
});
