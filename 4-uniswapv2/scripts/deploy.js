const hre = require("hardhat");

async function main() {
    console.log("Deploying Counter contract to", hre.network.name, "...\n");

    // Get signers
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    // Get account balance
    try {
        const balance = await hre.ethers.provider.getBalance(deployer.address);
        console.log("Account balance:", hre.ethers.formatEther(balance), "PAS\n");
    } catch (error) {
        console.log("Could not fetch balance\n");
    }

    // ========== Deploy 2 ERC20 Tokens ==========
    const Token = await hre.ethers.getContractFactory("MyERC20");

    console.log("Deploying TokenA...");
    const tokenA = await Token.deploy("TokenA", "TKA", hre.ethers.parseEther("1000000"));
    await tokenA.waitForDeployment();

    console.log("Deploying TokenB...");
    const tokenB = await Token.deploy("TokenB", "TKB", hre.ethers.parseEther("1000000"));
    await tokenB.waitForDeployment();

    const tokenAAddress = await tokenA.getAddress();
    const tokenBAddress = await tokenB.getAddress();

    console.log("✅ TokenA:", tokenAAddress);
    console.log("✅ TokenB:", tokenBAddress);

    // ========== Deploy UniswapV2Factory ==========
    const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");

    console.log("\nDeploying UniswapV2Factory...");
    const factory = await Factory.deploy(deployer.address);
    await factory.waitForDeployment();

    const factoryAddress = await factory.getAddress();
    console.log("✅ UniswapV2Factory:", factoryAddress);

    console.log("\n🎯 NEXT STEP:");
    console.log("Create Pair: tokenA / tokenB");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
