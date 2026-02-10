//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Script, console} from "forge-std/Script.sol";
import {ERC20Token} from "@contracts/ERC20.sol";
import {ERC721Token} from "@contracts/ERC721.sol";
import {YourContract} from "@contracts/YourContract.sol";

/**
 * @title DeployAll
 * @dev Foundry deployment script that deploys all contracts
 */
contract DeployAll is Script {
    struct DeploymentResults {
        ERC20Token erc20;
        ERC721Token erc721;
        YourContract yourContract;
    }

    function run() external returns (DeploymentResults memory) {
        // ERC20 parameters
        string memory tokenName = vm.envOr("ERC20_NAME", string("MyToken"));
        string memory tokenSymbol = vm.envOr("ERC20_SYMBOL", string("MTK"));
        uint256 initialSupply = vm.envOr("ERC20_INITIAL_SUPPLY", uint256(1000000 * 10**18));

        // ERC721 parameters
        string memory nftName = vm.envOr("ERC721_NAME", string("MyNFT"));
        string memory nftSymbol = vm.envOr("ERC721_SYMBOL", string("MNFT"));

        // YourContract parameters
        address owner = vm.envOr("CONTRACT_OWNER", msg.sender);

        vm.startBroadcast();

        console.log("Deploying ERC20Token...");
        ERC20Token erc20 = new ERC20Token(tokenName, tokenSymbol, initialSupply);
        console.log("ERC20Token deployed to:", address(erc20));

        console.log("Deploying ERC721Token...");
        ERC721Token erc721 = new ERC721Token(nftName, nftSymbol);
        console.log("ERC721Token deployed to:", address(erc721));

        console.log("Deploying YourContract...");
        YourContract yourContract = new YourContract(owner);
        console.log("YourContract deployed to:", address(yourContract));

        vm.stopBroadcast();

        console.log("\n=== Deployment Summary ===");
        console.log("ERC20Token:", address(erc20));
        console.log("ERC721Token:", address(erc721));
        console.log("YourContract:", address(yourContract));

        return DeploymentResults({
            erc20: erc20,
            erc721: erc721,
            yourContract: yourContract
        });
    }
}
