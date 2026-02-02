const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.getContractAt(
    "MyERC20",
    "ĐỊA_CHỈ_TOKEN_A"
  );

  await token.mint("ĐỊA_CHỈ_VÍ_CỦA_BẠN", hre.ethers.parseEther("1000"));

  console.log("Minted TokenA");
}

main().catch(console.error);
