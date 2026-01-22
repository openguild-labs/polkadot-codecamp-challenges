const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();

  const tokenA = await hre.ethers.getContractAt(
    "FaucetERC20",
    "0xB2eEfB1a57a51be15CaE412af39DbA13e42B5230",
  );
  const tokenB = await hre.ethers.getContractAt(
    "FaucetERC20",
    "0x5ac42405b51Dd9D823F9054238FEEf411cB2934C",
  );
  const router = await hre.ethers.getContractAt(
    "UniswapV2Router",
    "0x2eb9a99957999bf0B9204f6d0c5B09918c07BB6C",
  );

  console.log("Minting tokens...");
  await (await tokenA.faucet()).wait();
  await (await tokenB.faucet()).wait();

  console.log("Approving router...");
  await (
    await tokenA.approve(router.getAddress(), hre.ethers.parseUnits("100", 18))
  ).wait();
  await (
    await tokenB.approve(router.getAddress(), hre.ethers.parseUnits("100", 18))
  ).wait();

  console.log("Adding liquidity...");
  await (
    await router.addLiquidity(
      tokenA.getAddress(),
      tokenB.getAddress(),
      hre.ethers.parseUnits("100", 18),
      hre.ethers.parseUnits("100", 18),
      0,
      0,
      signer.address,
    )
  ).wait();

  console.log("Done!");
}

main().catch(console.error);
