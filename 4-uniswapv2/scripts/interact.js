const hre = require("hardhat");

const FACTORY_ADDR = "0x2a62566645eD08f04cfA719052Dd037F4f64C71c";
const TOKEN_A_ADDR = "0xeF9A6Dc13455C406E3d0859936B1DAbfF7321a7d";
const TOKEN_B_ADDR = "0x9FeDBF468CCCE7E8b316CAb167Dc85e8c99FD1EF";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("👤 Interact wallet:", deployer.address);

  const tokenA = await hre.ethers.getContractAt("MyERC20", TOKEN_A_ADDR);
  const tokenB = await hre.ethers.getContractAt("MyERC20", TOKEN_B_ADDR);
  const factory = await hre.ethers.getContractAt(
    "UniswapV2Factory",
    FACTORY_ADDR,
  );

  console.log("\n--- 🔍 BALANCE CHECK ---");
  let balA = await tokenA.balanceOf(deployer.address);
  let balB = await tokenB.balanceOf(deployer.address);

  console.log(`💰 Token A Balance: ${hre.ethers.formatEther(balA)}`);
  console.log(`💰 Token B Balance: ${hre.ethers.formatEther(balB)}`);

  if (balA < hre.ethers.parseEther("100")) {
    console.log("⚠️ Not enough Token A. minting...");
    try {
      const tx = await tokenA.mint(
        deployer.address,
        hre.ethers.parseEther("1000"),
      );
      await tx.wait();
      console.log("✅ Minted 1000 TokenA");
    } catch (e) {
      console.error("❌ Error.");
    }
  }

  if (balB < hre.ethers.parseEther("100")) {
    console.log("⚠️ Not enough Token B...");
    try {
      const tx = await tokenB.mint(
        deployer.address,
        hre.ethers.parseEther("1000"),
      );
      await tx.wait();
      console.log("✅ Minted 1000 Token B!");
    } catch (e) {
      console.error("❌ Error.");
    }
  }

  balA = await tokenA.balanceOf(deployer.address);
  balB = await tokenB.balanceOf(deployer.address);

  if (balA == 0n || balB == 0n) {
    console.error("Error!");
    return;
  }

  console.log("\n--- 1. CREATE PAIR ---");
  let pairAddress = await factory.getPair(TOKEN_A_ADDR, TOKEN_B_ADDR);
  if (pairAddress === "0x0000000000000000000000000000000000000000") {
    console.log("Creating Pair...");
    const tx = await factory.createPair(TOKEN_A_ADDR, TOKEN_B_ADDR);
    await tx.wait();
    pairAddress = await factory.getPair(TOKEN_A_ADDR, TOKEN_B_ADDR);
  }
  console.log("✅ Pair Address:", pairAddress);

  console.log("\n--- 2. ADD LIQUIDITY ---");
  const pair = await hre.ethers.getContractAt("UniswapV2Pair", pairAddress);

  const lpBalance = await pair.balanceOf(deployer.address);
  if (lpBalance > 0n) {
    console.log(" Have LP Token.");
  } else {
    console.log("Approving & Transferring...");
    try {
      await (
        await tokenA.transfer(pairAddress, hre.ethers.parseEther("100"))
      ).wait();
      await (
        await tokenB.transfer(pairAddress, hre.ethers.parseEther("100"))
      ).wait();
      console.log("Minting LP...");
      await (await pair.mint(deployer.address)).wait();
      console.log("✅ Liquidity Added!");
    } catch (error) {
      console.error("❌ Error Add Liquidity:", error.message);
    }
  }

  console.log("\n--- 3. SWAP ---");
  console.log("Transferring Token A for Swap...");
  try {
    await (
      await tokenA.transfer(pairAddress, hre.ethers.parseEther("10"))
    ).wait();

    const token0 = await pair.token0();
    const amountOut = hre.ethers.parseEther("5");
    const amount0Out =
      token0.toLowerCase() === TOKEN_A_ADDR.toLowerCase() ? 0n : amountOut;
    const amount1Out =
      token0.toLowerCase() === TOKEN_A_ADDR.toLowerCase() ? amountOut : 0n;

    console.log("Calling Swap...");
    await (
      await pair.swap(amount0Out, amount1Out, deployer.address, "0x")
    ).wait();
    console.log("✅ Swap Complete!");
  } catch (error) {
    console.error("❌ Error Swap:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
