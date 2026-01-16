//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IUniswapV2ERC20} from "./interfaces/IUniswapV2ERC20.sol";

contract TokenFaucet {
    event Drip(address indexed to, uint256 amount);

    constructor() {}

    function drip(address token, uint256 amount) external {
        IUniswapV2ERC20(token).mint(msg.sender, amount);
        emit Drip(msg.sender, amount);
    }
}