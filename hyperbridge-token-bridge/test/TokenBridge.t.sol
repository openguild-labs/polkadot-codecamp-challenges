// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";

// Mock ERC20
contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MOCK") {
        _mint(msg.sender, 10000 ether);
    }
}

// Mock Gateway
contract MockGateway is ITokenGateway {
    function teleport(TeleportParams calldata teleportParams) external payable {
        emit AssetTeleported(
            teleportParams.to,
            string(teleportParams.dest),
            teleportParams.amount,
            bytes32(0),
            msg.sender,
            teleportParams.assetId,
            teleportParams.redeem
        );
    }

    function params() external pure returns (TokenGatewayParams memory) {
        return TokenGatewayParams({host: address(0), dispatcher: address(0)});
    }

    function quoteExchangeFee(
        uint256,
        uint256
    ) external pure returns (uint256) {
        return 0;
    }

    function erc20(bytes32) external pure returns (address) {
        return address(0);
    }

    function erc6160(bytes32) external pure returns (address) {
        return address(0);
    }

    function instance(bytes calldata) external pure returns (address) {
        return address(0);
    }
}

contract TokenBridgeTest is Test {
    using SafeERC20 for IERC20;
    TokenBridge public bridge;
    MockERC20 public token;
    MockERC20 public feeToken;
    MockGateway public gateway;

    address user = address(0x123);

    function setUp() public {
        // deploy mock contracts
        token = new MockERC20();
        feeToken = new MockERC20();
        gateway = new MockGateway();

        // deploy token bridge
        bridge = new TokenBridge(address(gateway), address(feeToken));

        // mint token
        IERC20(address(token)).safeTransfer(user, 1000 ether);
        IERC20(address(feeToken)).safeTransfer(user, 100 ether);

        // Labeling address for log
        vm.label(user, "User");
        vm.label(address(bridge), "BridgeContract");
        vm.label(address(token), "TestToken");
        vm.label(address(gateway), "HyperbridgeGateway");
    }

    function testBridgeTokens() public {
        vm.startPrank(user);

        // approve
        IERC20(address(token)).forceApprove(address(bridge), 100 ether);

        bytes memory destChain = hex"01";

        // Action
        bridge.bridgeTokens(address(token), "MOCK", 100 ether, user, destChain);

        vm.stopPrank();

        // should pass
        assertEq(token.balanceOf(user), 900 ether, "Balance should be reduced");

        assertEq(
            token.balanceOf(address(bridge)),
            100 ether,
            "Balance should be moved to bridge contract"
        );
    }
}
