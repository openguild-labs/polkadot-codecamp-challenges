//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Script, console} from "forge-std/Script.sol";
import {ERC721Token} from "@contracts/ERC721.sol";

/**
 * @title DeployERC721
 * @dev Foundry deployment script for ERC721Token
 */
contract DeployERC721 is Script {
    function run() external returns (ERC721Token) {
        // Get deployment parameters from environment or use defaults
        string memory name = vm.envOr("ERC721_NAME", string("MyNFT"));
        string memory symbol = vm.envOr("ERC721_SYMBOL", string("MNFT"));

        vm.startBroadcast();
        
        ERC721Token nft = new ERC721Token(name, symbol);
        
        vm.stopBroadcast();
        
        console.log("ERC721Token deployed to:", address(nft));
        console.log("Collection name:", name);
        console.log("Collection symbol:", symbol);
        
        return nft;
    }
}
