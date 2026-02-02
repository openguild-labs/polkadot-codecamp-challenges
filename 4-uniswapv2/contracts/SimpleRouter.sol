// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UniswapV2Pair.sol";
import "./IERC20.sol";

contract SimpleRouter {
    address public pair;
    address public token0;
    address public token1;

    constructor(address _pair) {
        pair = _pair;
        token0 = UniswapV2Pair(_pair).token0();
        token1 = UniswapV2Pair(_pair).token1();
    }

    // swap token0 -> token1
    function swapExactToken0ForToken1(uint amountIn) external {
        IERC20(token0).transferFrom(msg.sender, pair, amountIn);

        (uint112 reserve0, uint112 reserve1,) =
            UniswapV2Pair(pair).getReserves();

        uint amountOut = getAmountOut(amountIn, reserve0, reserve1);

        UniswapV2Pair(pair).swap(
            0,
            amountOut,
            msg.sender,
            new bytes(0)
        );
    }

    // swap token1 -> token0
    function swapExactToken1ForToken0(uint amountIn) external {
        IERC20(token1).transferFrom(msg.sender, pair, amountIn);

        (uint112 reserve0, uint112 reserve1,) =
            UniswapV2Pair(pair).getReserves();

        uint amountOut = getAmountOut(amountIn, reserve1, reserve0);

        UniswapV2Pair(pair).swap(
            amountOut,
            0,
            msg.sender,
            new bytes(0)
        );
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) internal pure returns (uint) {
        require(amountIn > 0, "INSUFFICIENT_INPUT");
        require(reserveIn > 0 && reserveOut > 0, "INSUFFICIENT_LIQ");

        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = reserveIn * 1000 + amountInWithFee;

        return numerator / denominator;
    }
}
