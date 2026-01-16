//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A simple ERC20 token contract with minting and burning capabilities
 * @author Scaffold DOT
 */
contract ScaffoldERC20 is ERC20, Ownable {
    // Events
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    /**
     * Constructor: Initialize the token with name and symbol
     * @param _owner The address that will be set as the owner of the contract
     */
    constructor(address _owner) ERC20("Scaffold Token", "SCFD") Ownable(_owner) {
        // Mint initial supply to the owner (1 million tokens with 18 decimals)
        _mint(_owner, 1000000 * 10 ** decimals());
    }

    /**
     * Function to mint new tokens
     * Only the owner can call this function
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint (in wei, considering decimals)
     */
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * Function to burn tokens from the caller's balance
     * @param amount Amount of tokens to burn (in wei, considering decimals)
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * Function to burn tokens from a specific address
     * Requires approval from the token holder
     * @param from Address to burn tokens from
     * @param amount Amount of tokens to burn (in wei, considering decimals)
     */
    function burnFrom(address from, uint256 amount) public {
        _spendAllowance(from, msg.sender, amount);
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }
}
