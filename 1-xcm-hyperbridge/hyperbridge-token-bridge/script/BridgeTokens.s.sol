// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeTokens is Script {
    function run() external {
        // Configure these values before running
        address bridgeAddress = vm.envAddress("BRIDGE_ADDRESS");
        address tokenAddress = vm.envAddress("TOKEN_ADDRESS");
        address recipient = vm.envAddress("RECIPIENT");
        uint256 amount = vm.envUint("AMOUNT");
        bytes32 assetId = vm.envBytes32("ASSET_ID");
        uint256 destChainId = vm.envUint("DEST_CHAIN_ID");
        uint256 relayerFee = vm.envOr("RELAYER_FEE", uint256(0));
        uint64 timeout = uint64(vm.envOr("TIMEOUT", uint256(3600)));

        TokenBridge bridge = TokenBridge(bridgeAddress);
        IERC20 token = IERC20(tokenAddress);

        vm.startBroadcast();

        // Approve bridge to spend tokens
        token.approve(bridgeAddress, amount);

        // If paying with fee token, approve that too
        if (relayerFee > 0) {
            IERC20(address(bridge.FEE_TOKEN())).approve(bridgeAddress, relayerFee);
        }

        // Execute bridge
        bridge.bridgeTokens{value: msg.sender.balance > 0.01 ether ? 0.01 ether : 0}(
            tokenAddress,
            amount,
            recipient,
            assetId,
            destChainId,
            relayerFee,
            timeout,
            true // redeem ERC20 on destination
        );

        vm.stopBroadcast();

        console.log("Bridge transaction submitted successfully");
    }
}
