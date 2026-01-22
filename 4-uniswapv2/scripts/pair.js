const hre = require("hardhat");
require("dotenv").config();

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Using account:", deployer.address);

    const FACTORY_ADDRESS = process.env.FACTORY_ADDRESS;
    const TOKENA_ADDRESS = process.env.TOKENA_ADDRESS;
    const TOKENB_ADDRESS = process.env.TOKENB_ADDRESS;

    if (!FACTORY_ADDRESS || !TOKENA_ADDRESS || !TOKENB_ADDRESS) {
        throw new Error("❌ Missing env: FACTORY_ADDRESS / TOKENA_ADDRESS / TOKENB_ADDRESS");
    }

    console.log("Factory:", FACTORY_ADDRESS);
    console.log("TokenA:", TOKENA_ADDRESS);
    console.log("TokenB:", TOKENB_ADDRESS);

    const Factory = await hre.ethers.getContractAt("UniswapV2Factory", FACTORY_ADDRESS);

    console.log("⏳ Creating pair...");
    const tx = await Factory.createPair(TOKENA_ADDRESS, TOKENB_ADDRESS);
    await tx.wait();

    const pairAddress = await Factory.getPair(TOKENA_ADDRESS, TOKENB_ADDRESS);
    console.log("✅ Pair created at:", pairAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
