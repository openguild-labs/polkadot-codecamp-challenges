const hre = require("hardhat");

async function main() {
  const factory = await hre.ethers.getContractAt(
    "UniswapV2Factory",
    "0x7a525E9Dc37A47d57718300e0325C79B9eC3a216"
  );

  const tokenA = "0x907475eBAE5955f98f2AecAeF16E21E40fA6E0aB";
  const tokenB = "0xEE6AC23D468b50FC1A8A8BF72A3fBF6559f1804b";

  const tx = await factory.createPair(tokenA, tokenB);
  await tx.wait();

  const pair = await factory.getPair(tokenA, tokenB);
  console.log("✅ Pair created at:", pair);
}

main().catch(console.error);
