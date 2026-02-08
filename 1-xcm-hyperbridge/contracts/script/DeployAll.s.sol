// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {MockTokenGateway} from "../src/MockTokenGateway.sol";
import {TestToken} from "../src/TestToken.sol";

contract DeployAll is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy MockTokenGateway
        MockTokenGateway gateway = new MockTokenGateway();
        console.log("MockTokenGateway deployed to:", address(gateway));

        // 2. Deploy TokenBridge
        TokenBridge bridge = new TokenBridge(address(gateway));
        console.log("TokenBridge deployed to:", address(bridge));

        // 3. Deploy TestToken (1 million initial supply)
        TestToken testToken = new TestToken("Test Token", "TEST", 1_000_000 ether);
        console.log("TestToken deployed to:", address(testToken));

        // 4. Register TestToken in MockTokenGateway
        bytes32 assetId = keccak256("TEST");
        gateway.registerERC20(assetId, address(testToken));
        console.log("TestToken registered with assetId:", vm.toString(assetId));

        vm.stopBroadcast();

        // Summary
        console.log("\n===========================================");
        console.log("DEPLOYMENT SUMMARY");
        console.log("===========================================");
        console.log("MockTokenGateway:", address(gateway));
        console.log("TokenBridge:     ", address(bridge));
        console.log("TestToken:       ", address(testToken));
        console.log("Asset ID (TEST): ", vm.toString(assetId));
        console.log("===========================================");
    }
}
