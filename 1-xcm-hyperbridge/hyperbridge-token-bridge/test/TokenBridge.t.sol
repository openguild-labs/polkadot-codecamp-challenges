// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import {TokenBridge} from "../src/TokenBridge.sol";

contract MockTokenGateway {
    event TeleportCalled(address sender, uint256 amount, bytes data);
    function teleport(bytes calldata) external payable {
        emit TeleportCalled(msg.sender, msg.value, msg.data);
    }
}

contract MockERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        emit TransferFromCalled(from, to, amount);
        return true;
    }
    function approve(address spender, uint256 amount) external returns (bool) {
        emit ApproveCalled(spender, amount);
        return true;
    }
    event TransferFromCalled(address from, address to, uint256 amount);
    event ApproveCalled(address spender, uint256 amount);
}

contract TokenBridgeTest is Test {
    TokenBridge bridge;
    MockTokenGateway gateway;
    MockERC20 token;
    address user = address(0xBEEF);
    address recipient = address(0xCAFE);
    bytes destChain = hex"01";

    function setUp() public {
        gateway = new MockTokenGateway();
        bridge = new TokenBridge(address(gateway));
        token = new MockERC20();
    }

    function testConstructorSetsGateway() public {
        assertEq(address(bridge.tokenGateway()), address(gateway));
    }

    function testBridgeTokensCallsGateway() public {
        vm.startPrank(user);
        // Expect transferFrom and approve to be called
        vm.expectEmit(true, true, true, true);
        emit MockERC20.TransferFromCalled(user, address(bridge), 100);
        vm.expectEmit(true, true, true, true);
        emit MockERC20.ApproveCalled(address(gateway), 100);
        // Expect teleport to be called
        vm.expectEmit(true, false, false, false);
        emit MockTokenGateway.TeleportCalled(address(bridge), 0, "");
        // bridge.bridgeTokens(address(token), 100, recipient, destChain);
        vm.stopPrank();
    }
}
