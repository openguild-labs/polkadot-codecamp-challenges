const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();

  const token1 = "0xEE6AC23D468b50FC1A8A8BF72A3fBF6559f1804b"; // TokenB
  const routerAddr = "0x00349C508f15106bCd3fF0C74f6e06B00D39CF07";

  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const token1Contract = ERC20.attach(token1);

  const Router = await hre.ethers.getContractFactory("SimpleRouter");
  const router = Router.attach(routerAddr);

  const amountIn = hre.ethers.parseEther("1");

  console.log("🔑 Approving token1...");
  await (await token1Contract.approve(routerAddr, amountIn)).wait();

  console.log("🔄 Swapping token1 → token0...");
  await (await router.swapExactToken1ForToken0(amountIn)).wait();

  console.log("✅ Swap token1 → token0 DONE");
}

main().catch(console.error);
