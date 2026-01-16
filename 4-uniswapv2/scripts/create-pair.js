const { ethers } = require("hardhat");
const hre = require("hardhat");
const { JsonRpcProvider } = require("ethers");
require("dotenv").config();

async function deploy() {
  const [account] = await ethers.getSigners();
  const deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);

  console.log("Deploying First...");
  const firstTokenFactory = await ethers.getContractFactory("UniswapV2ERC20");
  const firstToken = firstTokenFactory.attach(
    "0xA8F30E8941A9fB41f613E61C4E8CC7ef12b972Fe"
  );
  console.log(`First token got to : ${await firstToken.getAddress()}`);

  console.log("Deploying Second...");
  const secondTokenFactory = await ethers.getContractFactory("UniswapV2ERC20");
  const secondToken = secondTokenFactory.attach(
    "0x29278c594F0898e004f4bE755E1b3761C4d88112"
  );
  console.log(`Second token got to : ${await secondToken.getAddress()}`);

  //Get the Factory contract
  console.log("Deploying UniswapV2Factory...");
  const factory = await ethers.getContractFactory("UniswapV2Factory");
  const factoryInstance = factory.attach(
    "0x9Df9FcCbe3116Ba85Ba0D1FcDdC18Cad08c64351"
  );
  console.log(`Factory got to : ${await factoryInstance.getAddress()}`);

  const existingPair = await factoryInstance.getPair(
    await firstToken.getAddress(),
    await secondToken.getAddress()
  );

  if (existingPair !== ethers.ZeroAddress) {
    console.log(`Pair already exists at address: ${existingPair}`);
    const pairFactory = await ethers.getContractFactory("UniswapV2Pair");
    const pairInstance = pairFactory.attach(existingPair);

    await firstToken.transfer(
      await pairInstance.getAddress(),
      ethers.parseEther("100")
    );
    await secondToken.transfer(
      await pairInstance.getAddress(),
      ethers.parseEther("70")
    );
    await pairInstance.mint(deployerAddress);
    console.log(
      `Balance of liquidity: ${await pairInstance.balanceOf(deployerAddress)}`
    );
    return;
  }

  console.log(`Creating pair for First and Second...`);
  const pairTx = await factoryInstance.createPair(
    await firstToken.getAddress(),
    await secondToken.getAddress()
  );
  await pairTx.wait();

  const checkedPair = await factoryInstance.getPair(
    await firstToken.getAddress(),
    await secondToken.getAddress()
  );

  console.log(`Pair created at address: ${checkedPair}`);

  const pairFactory = await ethers.getContractFactory("UniswapV2Pair");
  const pairInstance = pairFactory.attach(checkedPair);

  await firstToken.transfer(
    await pairInstance.getAddress(),
    ethers.parseEther("100")
  );
  await secondToken.transfer(
    await pairInstance.getAddress(),
    ethers.parseEther("70")
  );
  await pairInstance.mint(deployerAddress);

  console.log(
    `Balance of liquidity: ${await pairInstance.balanceOf(deployerAddress)}`
  );
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });