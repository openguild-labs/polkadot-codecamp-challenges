// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {console} from "@forge/console.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {BaseScript} from "./Base.s.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

interface IERC20Metadata {
    function symbol() external view returns (string memory);
}

contract BridgeTokenScript is BaseScript {
    function run() external broadcast {
        _loadConfig("bridge.toml", false);

        // Get deployed contract addresses
        address tokenBridgeAddress = config.get("token_bridge").toAddress();
        address bridgeableTokenAddress = config.get("bridgeable_token").toAddress();
        address feeTokenAddress = config.get("fee_token").toAddress();

        // Get bridge parameters from config
        uint256 amount = config.get("amount").toUint256();
        address recipient = config.get("recipient").toAddress();
        string memory destChainStr = config.get("dest_chain").toString();
        bytes memory destChain = bytes(destChainStr);
        uint256 nativeCost = config.get("native_cost").toUint256();

        TokenBridge bridge = TokenBridge(tokenBridgeAddress);
        IERC20 token = IERC20(bridgeableTokenAddress);
        IERC20 feeToken = IERC20(feeTokenAddress);

        // Get token symbol
        string memory tokenSymbol = IERC20Metadata(bridgeableTokenAddress).symbol();

        // Check balances
        uint256 tokenBalance = token.balanceOf(broadcaster);
        uint256 feeTokenBalance = feeToken.balanceOf(broadcaster);
        
        console.log("Bridging tokens:");
        console.log("  Token:", bridgeableTokenAddress);
        console.log("  Amount:", amount);
        console.log("  Recipient:", recipient);
        console.log("  Destination:", destChainStr);
        console.log("  Token Balance:", tokenBalance);
        console.log("  Fee Token Balance:", feeTokenBalance);

        require(tokenBalance >= amount, "Insufficient token balance");

        // Approve TokenBridge to spend tokens
        token.approve(tokenBridgeAddress, amount);
        
        // Mint fee tokens if needed (for MockToken during testing)
        if (feeTokenBalance < 1000 * 10**18) {
            console.log("  Minting fee tokens for testing...");
            (bool success,) = feeTokenAddress.call(
                abi.encodeWithSignature("mint(address,uint256)", broadcaster, 1000 * 10**18)
            );
            if (!success) {
                console.log("  Warning: Could not mint fee tokens");
            }
        }

        // Bridge the tokens
        bridge.bridgeTokens{value: nativeCost}(
            bridgeableTokenAddress,
            tokenSymbol,
            amount,
            recipient,
            destChain
        );

        console.log("\nTokens bridged successfully!");
    }
}
