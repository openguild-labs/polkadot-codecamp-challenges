const {chai, expect } = require("chai");
const { expandTo18Decimals, getWallets } = require('./shared/utilities');
const hre = require("hardhat");
const { 
  BigInt,
  getBigInt,
  getAddress,
  keccak256,
  AbiCoder,
  toUtf8Bytes,
  getCreate2Address,
  solidityPacked,
  Contract,
} = require('ethers')


const TEST_ADDRESSES = [
  '0x1000000000000000000000000000000000000000',
  '0x2000000000000000000000000000000000000000'
];

const TOTAL_SUPPLY = expandTo18Decimals(10000)

describe('UniswapV2Factory', function () {

let wallet;
let other;
let deployer;

let token;
let factory;

 
  beforeEach(async function () {


    [wallet, other] = await ethers.getSigners();

    // NOTE: It's not necessary to deploy the pair contract
    // while pallet-revive now require the code exists on chain
    // before it is deployed inside a contract.
    let UniswapV2Pair;
    if (hre.network.name == 'polkavm' || hre.network.name == 'ah') {
      UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair", getWallets(1)[0]);
    } else {
      UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    }
    // const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    let pair = await UniswapV2Pair.deploy();
    await pair.waitForDeployment();

    const ERC20 = await ethers.getContractFactory("ERC20", deployer);
    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();


    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    factory = await UniswapV2Factory.deploy(wallet.address);
    await factory.waitForDeployment();

  });
  
  it('feeTo, feeToSetter, allPairsLength', async function() {
    expect(await factory.feeTo()).to.eq(ethers.ZeroAddress);
    expect(await factory.feeToSetter()).to.eq(wallet.address);
    expect(await factory.allPairsLength()).to.eq(0);
  });

  async function createPair(tokens) {
    const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    const bytecode = UniswapV2Pair.bytecode;
    const initCodeHash = keccak256(bytecode);
    const [token0, token1] = tokens[0] < tokens[1] ? [tokens[0], tokens[1]] : [tokens[1], tokens[0]];

    let salt = keccak256(solidityPacked(['address', 'address'], [token0, token1]));
    const create2Address = getCreate2Address(await factory.getAddress(), salt, initCodeHash);

    await expect(factory.createPair(tokens[0], tokens[1])).to.emit(factory, "PairCreated")
    .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], create2Address, 1n);

    await expect(factory.createPair(...tokens)).to.be.reverted; // UniswapV2: PAIR_EXISTS
    await expect(factory.createPair(...tokens.slice().reverse())).to.be.reverted; // UniswapV2: PAIR_EXISTS
    expect(await factory.getPair(...tokens)).to.eq(create2Address);
    expect(await factory.getPair(...tokens.slice().reverse())).to.eq(create2Address);
    expect(await factory.allPairs(0)).to.eq(create2Address);
    expect(await factory.allPairsLength()).to.eq(1);

    const pair = await ethers.getContractAt("UniswapV2Pair", create2Address); 
    expect(await pair.factory()).to.eq(await factory.getAddress());
    expect(await pair.token0()).to.eq(TEST_ADDRESSES[0]);
    expect(await pair.token1()).to.eq(TEST_ADDRESSES[1]);
  }

  it('createPair', async function() {
    await createPair(TEST_ADDRESSES);
  });

  it('createPair:reverse', async function() {
    await createPair(TEST_ADDRESSES.slice().reverse());
  });

  // it('createPair:gas', async function() {
  //   const tx = await factory.createPair(...TEST_ADDRESSES);
  //   const receipt = await tx.wait();
  //   expect(receipt.gasUsed).to.eq(2615453569882727);
  // });

  it('setFeeTo', async function() {
    this.timeout(1000000000000);
    await expect(factory.connect(other).setFeeTo(other.address))
      .to.be.revertedWith('UniswapV2: FORBIDDEN');
    await factory.setFeeTo(wallet.address);
    expect(await factory.feeTo()).to.eq(wallet.address);
  });

  it('setFeeToSetter', async function() {
    await expect(factory.connect(other).setFeeToSetter(other.address))
      .to.be.revertedWith('UniswapV2: FORBIDDEN');

    await factory.setFeeToSetter(other.address);
    expect(await factory.feeToSetter()).to.eq(other.address);
    await expect(factory.setFeeToSetter(wallet.address))
      .to.be.revertedWith('UniswapV2: FORBIDDEN');
  });
});