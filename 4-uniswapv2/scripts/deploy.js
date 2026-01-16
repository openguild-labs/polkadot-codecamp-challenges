const { ethers } = require("hardhat");
const hre = require("hardhat");
const { JsonRpcProvider } = require("ethers");
require("dotenv").config();

async function deploy() {
  const [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  // Deploy Token Faucet
  console.log("Deploying TokenFaucet...");
  const faucetFactory = await ethers.getContractFactory("TokenFaucet");
  const faucetInstance = await faucetFactory.deploy();
  await faucetInstance.waitForDeployment();
  const faucetAddress = await faucetInstance.getAddress();
  console.log(`Faucet deployed to : ${faucetAddress}`);

  // Deploy ERC20 - 1
  console.log("Deploying HarryToken...");
  const harryTokenFactory = await ethers.getContractFactory("UniswapV2ERC20");
  const harryToken = await harryTokenFactory.deploy(faucetAddress);
  await harryToken.waitForDeployment();
  console.log(
    `HarryToken deployed to : ${await harryToken.getAddress()}`
  );

  // DEploy ERC20 - 2 (RiddleToken)
  console.log("Deploying RiddleToken...");
  const riddleTokenFactory = await ethers.getContractFactory("UniswapV2ERC20");
  const riddleToken = await riddleTokenFactory.deploy(faucetAddress);
  await riddleToken.waitForDeployment();
  console.log(`RiddleToken deployed to : ${await riddleToken.getAddress()}`);

  //Deploy Factory
  console.log("Deploying UniswapV2Factory...");
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = await factory.deploy(deployerAddress);
  await factoryInstance.waitForDeployment();
  console.log(`Factory deployed to : ${await factoryInstance.getAddress()}`);

  // Drip
  console.log("Dripping tokens from Faucet...");
  const dripAmount = ethers.parseUnits("1000", 18);

  let dripTx = await faucetInstance.drip(
    await harryToken.getAddress(),
    dripAmount
  );
  await dripTx.wait();
  console.log(`Dripped ${dripAmount} HarryToken to ${deployerAddress}`);

  dripTx = await faucetInstance.drip(
    await riddleToken.getAddress(),
    dripAmount
  );
  await dripTx.wait();
  console.log(`Dripped ${dripAmount} RiddleToken to ${deployerAddress}`);


  // Deploy Pair using JsonRpcProvider to bypass size limits
  console.log("Deploying UniswapV2Pair...");

  const networkName = hre.network.name;
  const networkConfig = hre.config.networks[networkName];
  const rpcUrl = networkConfig.url || "http://localhost:8545";

  console.log(`Using RPC URL: ${rpcUrl}`);

  const provider = new JsonRpcProvider(rpcUrl);

  const pairArtifact = await hre.artifacts.readArtifact("UniswapV2Pair");

  let privateKey;
  if (networkName === "localNode") {
    privateKey = process.env.LOCAL_PRIVATE_KEY;
  }
  if (networkName === "polkadotHubTestnet") {
    privateKey = process.env.PRIVATE_KEY;
  }

  const wallet = new ethers.Wallet(privateKey, provider);

  const pairFactory = new ethers.ContractFactory(
    pairArtifact.abi,
    pairArtifact.bytecode,
    wallet
  );

  const pairInstance = await pairFactory.deploy();
  console.log(`Pair deployed to : ${await pairInstance.getAddress()}`);

  console.log(`Creating pair for HarryToken and RiddleToken...`);
  await new Promise(resolve => setTimeout(resolve, 2000));
  const pairTx = await factoryInstance.createPair(
    await harryToken.getAddress(),
    await riddleToken.getAddress()
  );
  await pairTx.wait();

  const checkedPair = await factoryInstance.getPair(
    await harryToken.getAddress(),
    await riddleToken.getAddress()
  );

  console.log(`Pair created at address: ${checkedPair}`);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });