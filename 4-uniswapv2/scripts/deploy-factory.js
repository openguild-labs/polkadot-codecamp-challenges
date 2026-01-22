const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");

    // 👇 thay địa chỉ feeToSetter nếu cần
    const factory = await Factory.deploy(deployer.address);
    await factory.waitForDeployment();

    const address = await factory.getAddress();
    console.log("✅ UniswapV2Factory deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
