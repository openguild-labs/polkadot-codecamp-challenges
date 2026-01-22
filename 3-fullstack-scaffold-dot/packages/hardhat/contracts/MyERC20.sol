// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {
    constructor(address owner, uint256 initialSupply)
        ERC20("My Token", "MTK")
        Ownable(owner)
    {
        _mint(owner, initialSupply);
    }
}
