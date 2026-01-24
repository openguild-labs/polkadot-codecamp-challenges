// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    function setUp() public {}

    function run() public returns (TokenBridge) {
        // Get TokenGateway address from environment or use default
        address tokenGateway = vm.envOr("TOKEN_GATEWAY_ADDRESS", address(0));
        require(tokenGateway != address(0), "TOKEN_GATEWAY_ADDRESS not set");

        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        TokenBridge bridge = new TokenBridge(tokenGateway);

        console.log("TokenBridge deployed to:", address(bridge));
        console.log("TokenGateway address:", tokenGateway);
        console.log("Owner:", bridge.owner());

        vm.stopBroadcast();

        return bridge;
    }
}
