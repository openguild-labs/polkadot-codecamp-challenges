//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../UniswapV2ERC20.sol";

contract ERC20 is UniswapV2ERC20 {
    constructor(uint256 _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
