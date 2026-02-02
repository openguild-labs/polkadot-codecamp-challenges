const hre = require("hardhat");

async function main() {
  const routerAddress = "0x00349C508f15106bCd3fF0C74f6e06B00D39CF07";

  const tokenA = await hre.ethers.getContractAt(
    "MyERC20",
    "0x907475eBAE5955f98f2AecAeF16E21E40fA6E0aB"
  );

  await tokenA.approve(routerAddress, hre.ethers.parseEther("100"));

  console.log("✅ Approved router");
}

main().catch(console.error);
