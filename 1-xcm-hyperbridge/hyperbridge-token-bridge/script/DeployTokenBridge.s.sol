// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    // Hyperbridge testnet addresses (same for BSC Testnet & ETH Sepolia)
    address constant TOKEN_GATEWAY = 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6;
    address constant FEE_TOKEN = 0xA801da100bF16D07F668F4A49E1f71fc54D05177;

    function run() external returns (TokenBridge) {
        vm.startBroadcast();

        TokenBridge bridge = new TokenBridge(TOKEN_GATEWAY, FEE_TOKEN);

        vm.stopBroadcast();

        return bridge;
    }
}
