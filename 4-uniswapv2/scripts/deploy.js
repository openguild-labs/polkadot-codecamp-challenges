const hre = require("hardhat");

async function main() {
  console.log("Deploying Uniswap V2 core to", hre.network.name, "...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  try {
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("Balance:", hre.ethers.formatEther(balance), "PAS\n");
  } catch (error) {
    console.log("Could not fetch balance\n");
  }

  // Deploy factory (feeToSetter = deployer)
  console.log("Deploying UniswapV2Factory...");
  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factory = await Factory.deploy(deployer.address);
  await factory.waitForDeployment();
  const factoryAddress = await factory.getAddress();
  console.log("Factory deployed at:", factoryAddress);

  // Deploy faucet tokens
  console.log("Deploying Faucet Tokens...");
  const Faucet = await hre.ethers.getContractFactory("FaucetERC20");
  const tokenA = await Faucet.deploy();
  const tokenB = await Faucet.deploy();
  await tokenA.waitForDeployment();
  await tokenB.waitForDeployment();
  const tokenAAddress = await tokenA.getAddress();
  const tokenBAddress = await tokenB.getAddress();
  console.log("TokenA deployed at:", tokenAAddress);
  console.log("TokenB deployed at:", tokenBAddress);

  // Deploy router
  console.log("Deploying UniswapV2Router...");
  const Router = await hre.ethers.getContractFactory("UniswapV2Router");
  const router = await Router.deploy(factoryAddress);
  await router.waitForDeployment();
  const routerAddress = await router.getAddress();
  console.log("Router deployed at:", routerAddress);

  // Create the first pair via factory
  console.log("Creating pair...");
  const tx = await factory.createPair(tokenAAddress, tokenBAddress);
  const receipt = await tx.wait();
  const pairCreatedEvent = receipt.logs
    .map((log) => {
      try {
        return factory.interface.parseLog(log);
      } catch (_) {
        return null;
      }
    })
    .find((e) => e && e.name === "PairCreated");

  const pairAddress = pairCreatedEvent?.args?.pair;
  console.log("Pair deployed at:", pairAddress);

  console.log("\n✅ Deployment summary:");
  console.log("Factory        :", factoryAddress);
  console.log("Router         :", routerAddress);
  console.log("TokenA         :", tokenAAddress);
  console.log("TokenB         :", tokenBAddress);
  console.log("Initial Pair   :", pairAddress);
  console.log(
    "\nExport addresses as needed for the frontend and interactions.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
