const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const [user] = await hre.ethers.getSigners();

    const tokenA = await hre.ethers.getContractAt("MyERC20", process.env.TOKENA_ADDRESS);
    const tokenB = await hre.ethers.getContractAt("MyERC20", process.env.TOKENB_ADDRESS);

    const amount = hre.ethers.parseUnits("1000", 18);

    console.log("Minting TokenA...");
    await (await tokenA.mint(user.address, amount)).wait();

    console.log("Minting TokenB...");
    await (await tokenB.mint(user.address, amount)).wait();

    console.log("✅ Faucet done!");
}

main().catch(console.error);
