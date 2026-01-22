const hre = require('hardhat');

async function deployERC20Token(name, symbol) {
  const Token = await hre.ethers.getContractFactory('MyERC20');
  const tokenInstance = await Token.deploy(name, symbol, 18);
  await tokenInstance.waitForDeployment();
  const address = await tokenInstance.getAddress();

  console.log(`Token ${name} deployed to: ${address}`);
  return { tokenInstance, address };
}

async function deployFactory(deployerAddress) {
  console.log('Deploying UniswapV2Factory...');
  const Factory = await hre.ethers.getContractFactory('UniswapV2Factory');
  const factoryInstance = await Factory.deploy(deployerAddress);
  await factoryInstance.waitForDeployment();
  const address = await factoryInstance.getAddress();
  console.log('Factory deployed to:', address);
  return { factoryInstance, address };
}

function resolveNetworkSettings() {
  const networkName = hre.network.name;
  const networkConfig = hre.config.networks[networkName] || {};
  const rpcUrl = networkConfig.url || 'http://localhost:8545';

  let privateKey;
  if (networkName === 'localNode') {
    privateKey = process.env.LOCAL_PRIV_KEY;
  } else if (networkName === 'paseoAssetHub') {
    privateKey = process.env.AH_PRIV_KEY;
  } else {
    privateKey = process.env.PRIVATE_KEY;
  }

  if (!privateKey) {
    throw new Error(`Missing private key for network ${networkName}.`);
  }

  console.log('Using RPC URL:', rpcUrl);
  return { networkName, rpcUrl, privateKey };
}

function buildWallet(privateKey, rpcUrl) {
  const provider = new hre.ethers.JsonRpcProvider(rpcUrl);
  return new hre.ethers.Wallet(privateKey, provider);
}

async function deployPairWithWallet(wallet) {
  const pairArtifact = await hre.artifacts.readArtifact('UniswapV2Pair');
  const pairFactory = new hre.ethers.ContractFactory(
    pairArtifact.abi,
    pairArtifact.bytecode,
    wallet
  );

  const pairInstance = await pairFactory.deploy();
  await pairInstance.waitForDeployment();
  const address = await pairInstance.getAddress();
  console.log('Pair deployed to:', address);
  return { pairInstance, address };
}

async function createPair(factoryInstance, tokenA, tokenB) {
  console.log(`Creating pair for ${tokenA} and ${tokenB}...`);
  const tx = await factoryInstance.createPair(tokenA, tokenB);
  await tx.wait();
  const pairAddress = await factoryInstance.getPair(tokenA, tokenB);
  console.log('Pair created at address:', pairAddress);
  return pairAddress;
}

async function main() {
  console.log('Deploying contracts to', hre.network.name, '...\n');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with account:', deployer.address);

  const { address: aToken } = await deployERC20Token("TokenA", "TKA");
  const { address: bToken } = await deployERC20Token("TokenB", "TKB");
  const { factoryInstance } = await deployFactory(deployer.address);

  const { rpcUrl, privateKey } = resolveNetworkSettings();
  const wallet = buildWallet(privateKey, rpcUrl);

  await deployPairWithWallet(wallet);
  await createPair(factoryInstance, aToken, bToken);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
