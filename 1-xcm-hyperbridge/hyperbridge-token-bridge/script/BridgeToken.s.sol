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
        address tokenBridge = address(
            0xA3A861d8fd9270E188B1594C9CE477C2e98519d5
        );
        address token = address(0xA801da100bF16D07F668F4A49E1f71fc54D05177);
        string memory symbol = "USD.h";
        bytes32 recipient = bytes32(uint256(uint160(vm.addr(pk))));
        // bytes32 recipient = bytes32(
        //     bytes(
        //         hex"421f7c0be86e76f6bf63094ae9cbf239de2643a56f04980f7e55280f198e83"
        //     )
        // );
        uint256 amount = 10000000000000000;
        uint256 chainId = 11155111;

        vm.startBroadcast(pk);

        IERC20(token).approve(tokenBridge, amount);

        TokenBridge(tokenBridge).bridgeTokens(
            token,
            symbol,
            amount,
            recipient,
            StateMachine.evm(chainId)
        );
        vm.stopBroadcast();
    }
}
