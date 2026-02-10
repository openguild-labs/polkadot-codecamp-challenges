//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Script, console} from "forge-std/Script.sol";
import {ERC20Token} from "@contracts/ERC20.sol";

/**
 * @title DeployERC20
 * @dev Foundry deployment script for ERC20Token
 */
contract DeployERC20 is Script {
    function run() external returns (ERC20Token) {
        // Get deployment parameters from environment or use defaults
        string memory name = vm.envOr("ERC20_NAME", string("MyToken"));
        string memory symbol = vm.envOr("ERC20_SYMBOL", string("MTK"));
        uint256 initialSupply = vm.envOr("ERC20_INITIAL_SUPPLY", uint256(1000000 * 10**18));

        vm.startBroadcast();
        
        ERC20Token token = new ERC20Token(name, symbol, initialSupply);
        
        vm.stopBroadcast();
        
        console.log("ERC20Token deployed to:", address(token));
        console.log("Token name:", name);
        console.log("Token symbol:", symbol);
        console.log("Initial supply:", initialSupply);
        
        return token;
    }
}
