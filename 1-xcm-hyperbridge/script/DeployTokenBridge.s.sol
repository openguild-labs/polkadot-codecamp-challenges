// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    function run() external {
        // Lấy private key từ env
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        // Lấy địa chỉ từ env
        address tokenGateway = vm.envAddress("TOKEN_GATEWAY_ADDRESS");
        address feeToken = vm.envAddress("FEE_TOKEN_ADDRESS");

        vm.startBroadcast(deployerKey);

        TokenBridge bridge = new TokenBridge(tokenGateway, feeToken);

        vm.stopBroadcast();

        console2.log("TokenBridge deployed at:", address(bridge));
    }
}
