const { chai, expect } = require("chai");
const { expandTo18Decimals } = require('./shared/utilities');
const {
    BigInt,
    getBigInt,
    getAddress,
} = require('ethers')

const TOTAL_SUPPLY = expandTo18Decimals(10000)
const DRIP_AMOUNT = expandTo18Decimals(100)

describe('TokenFaucet', async function () {

    let token;
    let faucet;
    let wallet;

    beforeEach(async function () {
        [wallet] = await ethers.getSigners();

        const TokenFaucet = await ethers.getContractFactory("TokenFaucet");
        faucet = await TokenFaucet.deploy();
        await faucet.waitForDeployment();

        const UniswapV2ERC20 = await ethers.getContractFactory("UniswapV2ERC20");
        token = await UniswapV2ERC20.deploy(await faucet.getAddress());
        await token.waitForDeployment();
    });

    it('drip', async () => {
        const initialBalance = await token.balanceOf(wallet.address);

        await expect(faucet.drip(await token.getAddress(), DRIP_AMOUNT))
            .to.emit(faucet, 'Drip')
            .withArgs(wallet.address, DRIP_AMOUNT)
            .to.emit(token, 'Transfer')
            .withArgs(ethers.ZeroAddress, wallet.address, DRIP_AMOUNT);

        expect(await token.balanceOf(wallet.address)).to.eq(initialBalance + DRIP_AMOUNT);
        expect(await token.totalSupply()).to.eq(DRIP_AMOUNT);
    })
})
