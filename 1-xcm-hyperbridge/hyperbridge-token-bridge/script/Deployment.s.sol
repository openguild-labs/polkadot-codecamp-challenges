// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {console} from "@forge/console.sol";
import {BaseScript} from "./Base.s.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeploymentScript is BaseScript {
    function run() external broadcast returns (TokenBridge bridge) {
        // Determine network based on chain ID
        uint256 chainId = block.chainid;
        string memory networkPrefix;

        if (chainId == 11155420) {
            // Optimism Sepolia
            networkPrefix = "optimism-sepolia";
            console.log("Deploying to Optimism Sepolia (Chain ID: 11155420)");
        } else if (chainId == 11155111) {
            // Sepolia
            networkPrefix = "sepolia";
            console.log("Deploying to Sepolia (Chain ID: 11155111)");
        } else {
            revert("Unsupported network. Chain ID not recognized.");
        }

        // Read and parse the TOML file
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/deployments.toml");
        string memory toml = vm.readFile(path);

        // Parse addresses from the specific network section
        string memory tokenGatewayKey = string.concat(
            ".",
            networkPrefix,
            ".token_gateway"
        );
        address tokenGatewayAddress = vm.parseTomlAddress(
            toml,
            tokenGatewayKey
        );
        require(
            tokenGatewayAddress != address(0),
            "TokenGateway address not found in config"
        );
        console.log("TokenGateway address:", tokenGatewayAddress);

        string memory feeTokenKey = string.concat(
            ".",
            networkPrefix,
            ".usd_fee_token"
        );
        address feeTokenAddress = vm.parseTomlAddress(toml, feeTokenKey);
        require(
            feeTokenAddress != address(0),
            "Fee token address not found in config"
        );
        console.log("Fee token address:", feeTokenAddress);

        console.log("Deploying TokenBridge contract...");
        // Deploy the TokenBridge contract
        bridge = new TokenBridge(tokenGatewayAddress, feeTokenAddress);

        console.log("TokenBridge deployed at:", address(bridge));
        console.log("");
        console.log("Deployment complete!");
    }
}
