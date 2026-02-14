// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract MockTokenGateway is ITokenGateway {
    TeleportParams internal _lastParams;
    uint256 public lastMsgValue;
    bool public teleportCalled;

    function teleport(TeleportParams calldata teleportParams) external payable override {
        _lastParams = teleportParams;
        lastMsgValue = msg.value;
        teleportCalled = true;
    }

    function getLastParams() external view returns (TeleportParams memory) {
        return _lastParams;
    }

    function params() external pure override returns (TokenGatewayParams memory) {
        return TokenGatewayParams(address(0), address(0));
    }

    function erc20(bytes32) external pure override returns (address) {
        return address(0);
    }

    function erc6160(bytes32) external pure override returns (address) {
        return address(0);
    }

    function instance(bytes calldata) external pure override returns (address) {
        return address(0);
    }
}

contract TokenBridgeTest is Test {
    TokenBridge public bridge;
    MockTokenGateway public mockGateway;
    MockERC20 public token;
    MockERC20 public feeToken;

    address public user = address(0x1234);
    bytes32 public assetId = keccak256("TEST_TOKEN");
    uint256 public constant BRIDGE_AMOUNT = 100e18;
    uint256 public constant RELAYER_FEE = 1e18;

    function setUp() public {
        mockGateway = new MockTokenGateway();
        feeToken = new MockERC20("Fee Token", "FEE");
        token = new MockERC20("Test Token", "TEST");

        bridge = new TokenBridge(address(mockGateway), address(feeToken));

        // Fund user with ETH and tokens
        vm.deal(user, 10 ether);
        token.mint(user, 1000e18);
        feeToken.mint(user, 100e18);
    }

    function test_constructorSetsCorrectAddresses() public view {
        assertEq(address(bridge.GATEWAY()), address(mockGateway));
        assertEq(address(bridge.FEE_TOKEN()), address(feeToken));
    }

    function test_bridgeTokensWithNativePayment() public {
        vm.startPrank(user);
        token.approve(address(bridge), BRIDGE_AMOUNT);

        bridge.bridgeTokens{value: 0.1 ether}(
            address(token),
            BRIDGE_AMOUNT,
            user,
            assetId,
            11155111, // Sepolia
            RELAYER_FEE,
            3600,
            true
        );
        vm.stopPrank();

        assertTrue(mockGateway.teleportCalled());
        assertEq(mockGateway.lastMsgValue(), 0.1 ether);

        TeleportParams memory params = mockGateway.getLastParams();
        assertEq(params.amount, BRIDGE_AMOUNT);
        assertEq(params.relayerFee, RELAYER_FEE);
        assertEq(params.assetId, assetId);
        assertTrue(params.redeem);
        assertEq(params.to, bytes32(uint256(uint160(user))));
        assertEq(params.timeout, 3600);
        assertEq(params.nativeCost, 0.1 ether);
    }

    function test_bridgeTokensWithFeeTokenPayment() public {
        vm.startPrank(user);
        token.approve(address(bridge), BRIDGE_AMOUNT);
        feeToken.approve(address(bridge), RELAYER_FEE);

        bridge.bridgeTokens(
            address(token),
            BRIDGE_AMOUNT,
            user,
            assetId,
            11155111,
            RELAYER_FEE,
            3600,
            true
        );
        vm.stopPrank();

        assertTrue(mockGateway.teleportCalled());
        assertEq(mockGateway.lastMsgValue(), 0);
    }

    function test_bridgeTokensTransfersTokens() public {
        uint256 balanceBefore = token.balanceOf(user);

        vm.startPrank(user);
        token.approve(address(bridge), BRIDGE_AMOUNT);

        bridge.bridgeTokens{value: 0.1 ether}(
            address(token),
            BRIDGE_AMOUNT,
            user,
            assetId,
            97,
            RELAYER_FEE,
            3600,
            false
        );
        vm.stopPrank();

        assertEq(token.balanceOf(user), balanceBefore - BRIDGE_AMOUNT);
    }

    function test_bridgeTokensEmitsEvent() public {
        vm.startPrank(user);
        token.approve(address(bridge), BRIDGE_AMOUNT);

        vm.expectEmit(true, true, false, true);
        emit TokenBridge.TokensBridged(user, user, assetId, BRIDGE_AMOUNT, 11155111);

        bridge.bridgeTokens{value: 0.1 ether}(
            address(token),
            BRIDGE_AMOUNT,
            user,
            assetId,
            11155111,
            RELAYER_FEE,
            3600,
            true
        );
        vm.stopPrank();
    }

    function test_getDestination() public view {
        bytes memory dest = bridge.getDestination(11155111);
        assertEq(string(dest), "EVM-11155111");

        bytes memory destBsc = bridge.getDestination(97);
        assertEq(string(destBsc), "EVM-97");
    }

    function test_bridgeTokensRevertsWithoutApproval() public {
        vm.prank(user);
        (bool success,) = address(bridge).call{value: 0.1 ether}(
            abi.encodeWithSelector(
                bridge.bridgeTokens.selector,
                address(token),
                BRIDGE_AMOUNT,
                user,
                assetId,
                uint256(11155111),
                RELAYER_FEE,
                uint64(3600),
                true
            )
        );
        assertFalse(success);
    }
}
