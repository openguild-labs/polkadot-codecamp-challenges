//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/IUniswapV2Factory.sol";
import "./interfaces/IUniswapV2Pair.sol";
import "./interfaces/IERC20.sol";
import "./libraries/SafeMath.sol";
import "./libraries/Math.sol";

// Minimal Uniswap V2 router supporting ERC20-token swaps only (no native PAS wrapping).
contract UniswapV2Router {
    using SafeMath for uint;

    address public immutable factory;

    error InvalidPath();
    error InsufficientA();
    error InsufficientB();
    error InsufficientLiquidityMinted();
    error InsufficientLiquidityBurned();
    error InsufficientOutputAmount();
    error InsufficientInputAmount();

    constructor(address _factory) {
        factory = _factory;
    }

    // ***** Liquidity helpers *****
    function _sortTokens(address tokenA, address tokenB) internal pure returns (address, address) {
        return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }

    function _getPair(address tokenA, address tokenB) internal view returns (address pair) {
        pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        require(pair != address(0), "UniswapV2Router: PAIR_NOT_FOUND");
    }

    function _getOrCreatePair(address tokenA, address tokenB) internal returns (address pair) {
        pair = IUniswapV2Factory(factory).getPair(tokenA, tokenB);
        if (pair == address(0)) {
            pair = IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
    }

    function _getReserves(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0, ) = _sortTokens(tokenA, tokenB);
        address pair = _getPair(tokenA, tokenB);
        (uint reserve0, uint reserve1, ) = IUniswapV2Pair(pair).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }

    function quote(uint amountA, uint reserveA, uint reserveB) public pure returns (uint amountB) {
        require(amountA > 0, "UniswapV2Router: INSUFFICIENT_AMOUNT");
        require(reserveA > 0 && reserveB > 0, "UniswapV2Router: INSUFFICIENT_LIQUIDITY");
        amountB = amountA.mul(reserveB) / reserveA;
    }

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to
    ) external returns (uint amountA, uint amountB, uint liquidity) {
        address pair = _getOrCreatePair(tokenA, tokenB);
        
        // Get reserves directly to avoid stack too deep
        (uint reserve0, uint reserve1, ) = IUniswapV2Pair(pair).getReserves();
        
        if (reserve0 == 0 && reserve1 == 0) {
            // First liquidity provision
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            // Calculate optimal amounts based on existing reserves
            (address token0, ) = _sortTokens(tokenA, tokenB);
            (uint reserveA, uint reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            
            uint amountBOptimal = quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "UniswapV2Router: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint amountAOptimal = quote(amountBDesired, reserveB, reserveA);
                require(amountAOptimal >= amountAMin, "UniswapV2Router: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
        }

        IERC20(tokenA).transferFrom(msg.sender, pair, amountA);
        IERC20(tokenB).transferFrom(msg.sender, pair, amountB);
        liquidity = IUniswapV2Pair(pair).mint(to);
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to
    ) external returns (uint amountA, uint amountB) {
        address pair = _getPair(tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity);
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
        (address token0, ) = _sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        if (amountA < amountAMin) revert InsufficientA();
        if (amountB < amountBMin) revert InsufficientB();
    }

    // ***** Swaps *****
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) public pure returns (uint amountOut) {
        require(amountIn > 0, "UniswapV2Router: INSUFFICIENT_INPUT_AMOUNT");
        require(reserveIn > 0 && reserveOut > 0, "UniswapV2Router: INSUFFICIENT_LIQUIDITY");
        uint amountInWithFee = amountIn * 997;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = reserveIn * 1000 + amountInWithFee;
        amountOut = numerator / denominator;
    }

    function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts) {
        if (path.length < 2) revert InvalidPath();
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i = 0; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = _getReserves(path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to
    ) external returns (uint[] memory amounts) {
        amounts = getAmountsOut(amountIn, path);
        if (amounts[amounts.length - 1] < amountOutMin) revert InsufficientOutputAmount();

        IERC20(path[0]).transferFrom(msg.sender, _getPair(path[0], path[1]), amounts[0]);
        _swap(amounts, path, to);
    }

    function _swap(uint[] memory amounts, address[] memory path, address _to) internal {
        for (uint i = 0; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0, ) = _sortTokens(input, output);
            uint amountOut = amounts[i + 1];
            (uint amount0Out, uint amount1Out) = input == token0
                ? (uint(0), amountOut)
                : (amountOut, uint(0));
            address to = i < path.length - 2 ? _getPair(output, path[i + 2]) : _to;
            IUniswapV2Pair(_getPair(input, output)).swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }
}
