// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {BridgeableToken} from "../src/BridgeableToken.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract MockTokenGateway {
    event TeleportCalled(address sender, uint256 amount, bytes data);
    function teleport(bytes calldata) external payable {
        emit TeleportCalled(msg.sender, msg.value, msg.data);
    }
}

contract IntegrationTest is Test {
    BridgeableToken token;
    TokenBridge bridge;
    MockTokenGateway gateway;
    address user = address(0xBEEF);
    address recipient = address(0xCAFE);
    bytes destChain = hex"01";

    function setUp() public {
        gateway = new MockTokenGateway();
        token = new BridgeableToken("Bridgeable Token", "BRG", address(gateway));
        bridge = new TokenBridge(address(gateway));
        // Mint tokens to user (assume mint function exists or use deal if not)
        deal(address(token), user, 1000);
    }

    function testBridgeableTokenAndBridgeIntegration() public {
        vm.startPrank(user);
        token.approve(address(bridge), 100);
        // Expect teleport to be called
        vm.expectEmit(true, false, false, false);
        emit MockTokenGateway.TeleportCalled(address(bridge), 0, "");
        bridge.bridgeTokens(address(token), 100, recipient, destChain);
        vm.stopPrank();
    }
}
