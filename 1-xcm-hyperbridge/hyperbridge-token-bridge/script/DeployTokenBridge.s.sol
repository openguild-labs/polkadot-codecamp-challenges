// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address tokenGateway = vm.envAddress("TOKEN_GATEWAY_ADDRESS");
        address feeToken = vm.envAddress("FEE_TOKEN_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        TokenBridge bridge = new TokenBridge(tokenGateway, feeToken);

        console.log("TokenBridge deployed to:", address(bridge));

        vm.stopBroadcast();
    }
}
