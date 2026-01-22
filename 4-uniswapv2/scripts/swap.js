const hre = require("hardhat");

async function main() {
    const [user] = await hre.ethers.getSigners();

    const tokenA = await hre.ethers.getContractAt("MyERC20", "0xTOKENA_ADDRESS");
    const tokenB = await hre.ethers.getContractAt("MyERC20", "0xTOKENB_ADDRESS");
    const pair = await hre.ethers.getContractAt("UniswapV2Pair", "0xPAIR_ADDRESS");

    const amountIn = hre.ethers.parseUnits("1", 18);

    // 1. Approve TokenA cho Pair
    await tokenA.approve(pair.target, amountIn);

    // 2. Transfer TokenA vào Pair
    await tokenA.transfer(pair.target, amountIn);

    // 3. Tính amountOut (theo công thức Uniswap)
    const [reserve0, reserve1] = await pair.getReserves();
    const token0 = await pair.token0();

    let amountOut;
    if (token0.toLowerCase() === tokenA.target.toLowerCase()) {
        amountOut = getAmountOut(amountIn, reserve0, reserve1);
        await pair.swap(0, amountOut, user.address, "0x");
    } else {
        amountOut = getAmountOut(amountIn, reserve1, reserve0);
        await pair.swap(amountOut, 0, user.address, "0x");
    }

    console.log("Swap done!");
}

function getAmountOut(amountIn, reserveIn, reserveOut) {
    const amountInWithFee = amountIn * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;
    return numerator / denominator;
}

main();
