//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../UniswapV2ERC20.sol";

contract ERC20 is UniswapV2ERC20 {
    string private _name;
    string private _symbol;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) {
        _name = name_;
        _symbol = symbol_;
        _mint(msg.sender, initialSupply);
    }

    function tokenName() external view returns (string memory) {
        return _name;
    }

    function tokenSymbol() external view returns (string memory) {
        return _symbol;
    }

    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
