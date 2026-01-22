import "dotenv/config";
import hre from "hardhat";

async function main() {
    const FACTORY = process.env.FACTORY_ADDRESS;
    const TOKENA = process.env.TOKENA_ADDRESS;
    const TOKENB = process.env.TOKENB_ADDRESS;

    console.log("Factory:", FACTORY);
    console.log("Token A:", TOKENA);
    console.log("Token B:", TOKENB);

    const factory = await hre.ethers.getContractAt("UniswapV2Factory", FACTORY);
    const pair = await factory.getPair(TOKENA, TOKENB);

    console.log("Pair address:", pair);
}

main().catch(console.error);
