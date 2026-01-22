import pkg from "hardhat";
import "dotenv/config";

const { ethers } = pkg;

async function main() {
    const factory = process.env.FACTORY_ADDRESS;

    if (!factory) {
        throw new Error("Missing FACTORY_ADDRESS in .env");
    }

    console.log("Deploying Router with Factory:", factory);

    const Router = await ethers.getContractFactory("MiniUniswapV2Router");
    const router = await Router.deploy(factory);

    await router.waitForDeployment();

    console.log("Router deployed to:", await router.getAddress());
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
