// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TokenBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {StateMachine} from "@hyperbridge/core/libraries/StateMachine.sol";

contract BridgeToken is Script {
    function run() external {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address tokenBridge = vm.envAddress("TOKEN_BRIDGE_ADDRESS");
        address token = vm.envAddress("USDH_ADDRESS");
        string memory symbol = "USD.h";
        // address recipient = ; EVM receiver bytes32(uint256(uint160(vm.addr(pk))))
        bytes32 recipient = bytes32(
            bytes(
                hex"484ad2225c6edc06c84e623642d51483c0218d09a3a8ccd3649158b4e8aa656f"
            )
        );
        uint256 amount = 1e18; // 1 USD.h
        uint256 chainId = 420420422;

        vm.startBroadcast(pk);

        IERC20(token).approve(tokenBridge, amount);

        TokenBridge(tokenBridge).bridgeTokens(
            token,
            symbol,
            amount,
            address(uint160(uint256(recipient))),
            StateMachine.kusama(chainId)
        );
        vm.stopBroadcast();
    }
}