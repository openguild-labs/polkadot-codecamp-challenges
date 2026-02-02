const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚰 Faucet by:", deployer.address);

  const tokenA = await hre.ethers.getContractAt(
    "MyERC20",
    "0x907475eBAE5955f98f2AecAeF16E21E40fA6E0aB" // TokenA
  );

  const tokenB = await hre.ethers.getContractAt(
    "MyERC20",
    "0xEE6AC23D468b50FC1A8A8BF72A3fBF6559f1804b" // TokenB
  );

  const amount = hre.ethers.parseEther("1000");

  await (await tokenA.mint(deployer.address, amount)).wait();
  await (await tokenB.mint(deployer.address, amount)).wait();

  console.log("✅ Minted 1000 TokenA & TokenB");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
