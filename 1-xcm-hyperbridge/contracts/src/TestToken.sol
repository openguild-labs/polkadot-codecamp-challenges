// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TestToken
 * @notice Simple ERC20 token for testing bridge functionality
 */
contract TestToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    /// @notice Anyone can mint tokens for testing
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
