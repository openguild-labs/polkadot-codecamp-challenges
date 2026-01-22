// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/* ========= INTERFACES ========= */

interface IERC20 {
    function approve(address spender, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
}

interface IUniswapV2Factory {
    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function createPair(address tokenA, address tokenB) external returns (address pair);
}

interface IUniswapV2Pair {
    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
}

/* ========= ROUTER ========= */

contract MiniUniswapV2Router {
    address public immutable factory;

    constructor(address _factory) {
        factory = _factory;
    }

    /* ========= ADD LIQUIDITY ========= */

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        address to
    ) external returns (uint liquidity) {
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);

        if (pair == address(0)) {
            pair = IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }

        // user -> pair
        IERC20(tokenA).transferFrom(msg.sender, pair, amountADesired);
        IERC20(tokenB).transferFrom(msg.sender, pair, amountBDesired);

        // mint LP
        liquidity = IUniswapV2Pair(pair).mint(to);
    }

    /* ========= REMOVE LIQUIDITY ========= */

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        address to
    ) external returns (uint amountA, uint amountB) {
        address pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "PAIR_NOT_EXISTS");

        // user -> pair (LP token)
        IERC20(pair).transferFrom(msg.sender, pair, liquidity);

        // burn LP → trả token
        (amountA, amountB) = IUniswapV2Pair(pair).burn(to);
    }
}
