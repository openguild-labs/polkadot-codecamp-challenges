// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract DeployTokenBridge is Script {
    // ============================================
    // Hyperbridge Gargantua V3 (Paseo) - Optimism Sepolia
    // Chain ID: 11155420
    // StateMachine: EVM-11155420
    // ============================================

    // TokenGateway address on Optimism Sepolia (Gargantua V3)
    address public constant TOKEN_GATEWAY =
        0xFcDa26cA021d5535C3059547390E6cCd8De7acA6;

    // Fee token address - USD.h (Hyperbridge stable token)
    address public constant FEE_TOKEN_USDH =
        0xA801da100bF16D07F668F4A49E1f71fc54D05177;

    // Token Faucet - untuk mendapatkan USD.h test tokens
    address public constant TOKEN_FAUCET =
        0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3;

    function run() external {
        // Get private key from environment (must include 0x prefix)
        // If your .env has the key without 0x, add it: PRIVATE_KEY=0x...
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Allow overriding via environment (optional)
        address tokenGateway = vm.envOr("TOKEN_GATEWAY", TOKEN_GATEWAY);
        address feeToken = vm.envOr("FEE_TOKEN", FEE_TOKEN_USDH);

        console.log("=== Hyperbridge TokenBridge Deployment ===");
        console.log("Network: Optimism Sepolia (Gargantua V3)");
        console.log("Chain ID: 11155420");
        console.log("");
        console.log("Deploying TokenBridge with:");
        console.log("  TokenGateway:", tokenGateway);
        console.log("  FeeToken (USD.h):", feeToken);
        console.log("  TokenFaucet:", TOKEN_FAUCET);
        console.log("");

        vm.startBroadcast(deployerPrivateKey);

        TokenBridge bridge = new TokenBridge(tokenGateway, feeToken);

        vm.stopBroadcast();

        console.log("=== Deployment Complete ===");
        console.log("TokenBridge deployed at:", address(bridge));
        console.log("");
        console.log("Next steps:");
        console.log("1. Get USD.h tokens from TokenFaucet:", TOKEN_FAUCET);
        console.log("2. Update frontend config with bridge address");
        console.log("3. Approve tokens and start bridging!");
    }
}

// ============================================
// Additional deployment info:
// ============================================
//
// Ethereum Sepolia:
//   TokenGateway: 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6
//   USD.h: 0xA801da100bF16D07F668F4A49E1f71fc54D05177
//   StateMachine: EVM-11155111
//
// Optimism Sepolia:
//   TokenGateway: 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6
//   USD.h: 0xA801da100bF16D07F668F4A49E1f71fc54D05177
//   StateMachine: EVM-11155420
//
// Base Sepolia:
//   TokenGateway: 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6
//   USD.h: 0xA801da100bF16D07F668F4A49E1f71fc54D05177
//   StateMachine: EVM-84532
//
// Arbitrum Sepolia:
//   TokenGateway: 0xFcDa26cA021d5535C3059547390E6cCd8De7acA6
//   USD.h: 0xA801da100bF16D07F668F4A49E1f71fc54D05177
//   StateMachine: EVM-421614
// ============================================
