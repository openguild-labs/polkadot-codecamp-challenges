const {chai, expect } = require("chai");
const { expandTo18Decimals } = require('./shared/utilities');
// const { hre } = require("hardhat");
const { 
  BigInt,
  getBigInt,
  getAddress,
  keccak256,
  AbiCoder,
  toUtf8Bytes,
  solidityPack,
  MaxUint256
} = require('ethers')
// chai.use(solidity)

const TOTAL_SUPPLY = expandTo18Decimals(10000)
const TEST_AMOUNT = expandTo18Decimals(10)

describe('UniswapV2ERC20', function () {

  let token;
  let wallet;
  let other;
  
  beforeEach(async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");

    token = await ERC20.deploy(TOTAL_SUPPLY);
    await token.waitForDeployment();
    [wallet, other] = await ethers.getSigners();

    let value;

    if (hre.network.name === 'polkavm') {
      value = ethers.parseEther('1000000')
    } else {
      value = ethers.parseEther('1')
    }

    // send balance to other
    await wallet.sendTransaction({
      to: other.address,
      value: value
    });
  });

  it('name, symbol, decimals, totalSupply, balanceOf, DOMAIN_SEPARATOR, PERMIT_TYPEHASH', async () => {
    const [deployer] = await ethers.getSigners();
    const abiCoder = new AbiCoder();
    const name = await token.name();
    expect(name).to.eq('Uniswap V2');
    expect(await token.symbol()).to.eq('UNI-V2')
    expect(await token.decimals()).to.eq(18)
    expect(await token.totalSupply()).to.eq(TOTAL_SUPPLY)
    expect(await token.balanceOf(deployer.address)).to.eq(TOTAL_SUPPLY)

    let token_address = await token.getAddress();
    let chainId = (await ethers.provider.getNetwork()).chainId;
    expect(await token.DOMAIN_SEPARATOR()).to.eq(
      keccak256(
        abiCoder.encode(
          ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
          [
            keccak256(
              toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
            ),
            keccak256(toUtf8Bytes(name)),
            keccak256(toUtf8Bytes('1')),
            chainId,
            token_address
          ]
        )
      )
    )
    expect(await token.PERMIT_TYPEHASH()).to.eq(
      keccak256(toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'))
    )
  })

  it('approve', async () => {
    let walletAddress = await wallet.getAddress();
    await expect(token.approve(other.address, TEST_AMOUNT))
      .to.emit(token, 'Approval')
      .withArgs(walletAddress, other.getAddress(), TEST_AMOUNT)
    expect(await token.allowance(walletAddress, other.address)).to.eq(TEST_AMOUNT)
  })

  it('transfer', async () => {
    await expect(token.transfer(other.address, TEST_AMOUNT))
      .to.emit(token, 'Transfer')
      .withArgs(wallet.address, other.address, TEST_AMOUNT)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY - TEST_AMOUNT)
    expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
  })

  it('transfer:fail', async () => {
    await expect(token.transfer(other.address, TOTAL_SUPPLY + 1n)).to.be.reverted // ds-math-sub-underflow
    await expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow
  })

  it('transferFrom', async () => {
    await token.approve(other.address, TEST_AMOUNT);
    expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
    console.log('address', other.address);
    await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
    .to.emit(token, 'Transfer')
      .withArgs(wallet.address, other.address, TEST_AMOUNT)
    expect(await token.allowance(wallet.address, other.address)).to.eq(0)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY - TEST_AMOUNT)
    expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
  })

  it('transferFrom:max', async () => {
    await token.approve(other.address, ethers.MaxUint256)
    await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
      .to.emit(token, 'Transfer')
      .withArgs(wallet.address, other.address, TEST_AMOUNT)
    expect(await token.allowance(wallet.address, other.address)).to.eq(MaxUint256)
    expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY - TEST_AMOUNT)
    expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
  })

})