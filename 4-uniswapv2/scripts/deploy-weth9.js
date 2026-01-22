const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying WETH with account:", deployer.address);

    const WETH = await ethers.getContractFactory("WETH9");
    const weth = await WETH.deploy();

    await weth.waitForDeployment();

    const address = await weth.getAddress();
    console.log("✅ WETH deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
