//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../UniswapV2ERC20.sol";

contract ERC20 is UniswapV2ERC20 {
    string private _name;
    string private _symbol;

    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 initialSupply
    ) {
        _name = tokenName;
        _symbol = tokenSymbol;
        _mint(msg.sender, initialSupply);
    }

    function tokenName() external view returns (string memory) {
        return _name;
    }

    function tokenSymbol() external view returns (string memory) {
        return _symbol;
    }

    // Faucet function for testing - anyone can mint tokens
    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

