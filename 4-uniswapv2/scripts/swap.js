const hre = require("hardhat");

async function main() {
  const [user] = await hre.ethers.getSigners();

  const tokenAAddress = "0x907475eBAE5955f98f2AecAeF16E21E40fA6E0aB";
  const tokenBAddress = "0xEE6AC23D468b50FC1A8A8BF72A3fBF6559f1804b";
  const simpleRouterAddress = "0x00349C508f15106bCd3fF0C74f6e06B00D39CF07";

  const Token = await hre.ethers.getContractFactory("ERC20");
  const tokenA = Token.attach(tokenAAddress);
  const tokenB = Token.attach(tokenBAddress);

  const Router = await hre.ethers.getContractFactory("SimpleRouter");
  const router = Router.attach(simpleRouterAddress);

  const amountIn = hre.ethers.parseEther("1");

  console.log("🔑 Approving TokenA...");
  await (await tokenA.approve(simpleRouterAddress, amountIn)).wait();

  console.log("🔄 Swapping TokenA → TokenB...");
  const tx = await router.swap(
    tokenAAddress,
    tokenBAddress,
    amountIn
  );
  await tx.wait();

  console.log("✅ Swap thành công!");

  const balanceB = await tokenB.balanceOf(user.address);
  console.log("💰 TokenB balance:", hre.ethers.formatEther(balanceB));
}

main().catch(console.error);
