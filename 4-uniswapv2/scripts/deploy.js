const hre = require("hardhat");

async function main() {
  console.log("=".repeat(60));
  console.log("Deploying Uniswap V2 contracts to", hre.network.name);
  console.log("=".repeat(60));

  // Get signers
  const [deployer] = await hre.ethers.getSigners();
  console.log("\nDeployer address:", deployer.address);

  // Get account balance
  try {
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", hre.ethers.formatEther(balance), "PAS\n");
  } catch (error) {
    console.log("Could not fetch balance\n");
  }

  // ============================================
  // 1. Deploy UniswapV2Factory
  // ============================================
  console.log("1. Deploying UniswapV2Factory...");
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(deployer.address); // feeToSetter = deployer
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("   UniswapV2Factory deployed to:", factoryAddress);

  // ============================================
  // 2. Deploy Test Tokens
  // ============================================
  console.log("\n2. Deploying Test Tokens...");

  const ERC20 = await hre.ethers.getContractFactory("ERC20");
  const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens

  // Deploy Token A
  console.log("   Deploying Token A (TKA)...");
  const tokenA = await ERC20.deploy("Token A", "TKA", initialSupply);
  await tokenA.waitForDeployment();
  const tokenAAddress = await tokenA.getAddress();
  console.log("   Token A deployed to:", tokenAAddress);

  // Deploy Token B
  console.log("   Deploying Token B (TKB)...");
  const tokenB = await ERC20.deploy("Token B", "TKB", initialSupply);
  await tokenB.waitForDeployment();
  const tokenBAddress = await tokenB.getAddress();
  console.log("   Token B deployed to:", tokenBAddress);

  // ============================================
  // 3. Create a Pair (optional demo)
  // ============================================
  console.log("\n3. Creating TKA/TKB Pair...");
  const createPairTx = await factory.createPair(tokenAAddress, tokenBAddress);
  await createPairTx.wait();

  const pairAddress = await factory.getPair(tokenAAddress, tokenBAddress);
  console.log("   TKA/TKB Pair created at:", pairAddress);

  // ============================================
  // Summary
  // ============================================
  console.log("\n" + "=".repeat(60));
  console.log("DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("\nContract Addresses:");
  console.log("-".repeat(60));
  console.log("UniswapV2Factory:", factoryAddress);
  console.log("Token A (TKA):   ", tokenAAddress);
  console.log("Token B (TKB):   ", tokenBAddress);
  console.log("TKA/TKB Pair:    ", pairAddress);
  console.log("-".repeat(60));

  console.log("\nNetwork Info:");
  console.log("-".repeat(60));
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId.toString());
  console.log("-".repeat(60));

  console.log("\n✅ Deployment completed successfully!");

  // Return addresses for programmatic use
  return {
    factory: factoryAddress,
    tokenA: tokenAAddress,
    tokenB: tokenBAddress,
    pair: pairAddress
  };
}

main()
  .then((addresses) => {
    console.log("\nExported addresses:", JSON.stringify(addresses, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
