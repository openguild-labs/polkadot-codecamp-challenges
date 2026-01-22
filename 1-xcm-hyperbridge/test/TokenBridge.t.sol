// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/TokenBridge.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";

// 1. Mock Token giả
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MOCK") {
        _mint(msg.sender, 10000 ether);
    }
}

// 2. Mock Gateway (Đã sửa lỗi)
// LƯU Ý: Bỏ "is ITokenGateway" để không bị bắt lỗi thiếu hàm
contract MockGateway {
    event TeleportCalled(TeleportParams params);

    // Sửa signature: dùng 'calldata' và KHÔNG có returns để khớp với interface SDK
    function teleport(TeleportParams calldata params) external payable {
        emit TeleportCalled(params); 
    }
}

contract TokenBridgeTest is Test {
    TokenBridge bridge;
    MockERC20 token;
    MockERC20 feeToken;
    MockGateway gateway;

    address user = address(1);

    function setUp() public {
        token = new MockERC20();
        feeToken = new MockERC20();
        gateway = new MockGateway();

        // Ép kiểu address(gateway) khi truyền vào constructor
        bridge = new TokenBridge(address(gateway), address(feeToken));

        // Cấp tiền cho user giả
        token.transfer(user, 100 ether);
        feeToken.transfer(user, 10 ether);
        
        // Label cho dễ nhìn log
        vm.label(user, "User");
        vm.label(address(bridge), "Bridge");
        vm.label(address(token), "Token");
    }

    function testBridgeTokens() public {
        vm.startPrank(user); 

        // 1. Approve
        token.approve(address(bridge), 10 ether);
        
        // 2. Gọi hàm bridge
        bridge.bridgeTokens(
            address(token),
            "MOCK",
            10 ether,
            user,
            bytes("EVM-11155111")
        );

        vm.stopPrank();

        // 3. Kiểm tra logic:
        // Token của user phải giảm đi 10
        assertEq(token.balanceOf(user), 90 ether);
        // Token phải chui vào contract Bridge
        assertEq(token.balanceOf(address(bridge)), 10 ether);
    }
}