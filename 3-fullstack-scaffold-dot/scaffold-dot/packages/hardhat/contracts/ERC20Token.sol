//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * ERC20 – Scaffold-ETH Challenge 3
 */
contract MyERC20 is ERC20 {
    address public immutable owner;

    event Mint(address indexed to, uint256 amount);

    constructor(
        address _owner,
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {
        owner = _owner;
        _mint(_owner, initialSupply);
    }

    modifier isOwner() {
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    function mint(address to, uint256 amount) public isOwner {
        _mint(to, amount);
        emit Mint(to, amount);
    }
}
