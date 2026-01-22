const hre = require("hardhat");

async function deployERC20Token(name, symbol) {
  const Token = await hre.ethers.getContractFactory("MyERC20");
  const tokenInstance = await Token.deploy(name, symbol, 18);
  await tokenInstance.waitForDeployment();
  const address = await tokenInstance.getAddress();

  console.log(`Token ${name} deployed to: ${address}`);
  return { tokenInstance, address };
}

async function main() {
  await deployERC20Token("TokenMI", "TMI");
  await deployERC20Token("TokenMA", "TMA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
