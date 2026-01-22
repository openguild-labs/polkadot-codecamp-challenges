// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/TokenBridge.sol";
import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock ERC20 Token
contract MockToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }
}

// Mock Token Gateway
contract MockTokenGateway is ITokenGateway {
    event TeleportCalled(TeleportParams params, uint256 value);

    function params() external pure returns (TokenGatewayParams memory) {
        return TokenGatewayParams(address(0), address(0));
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

    function teleport(TeleportParams calldata teleportParams) external payable {
        emit TeleportCalled(teleportParams, msg.value);
    }
}

contract TokenBridgeTest is Test {
    TokenBridge public bridge;
    MockTokenGateway public gateway;
    MockToken public token;
    MockToken public feeToken;

    address public user = address(1);
    address public recipient = address(2);

    function setUp() public {
        gateway = new MockTokenGateway();
        token = new MockToken("Test Token", "TEST");
        feeToken = new MockToken("Fee Token", "FEE");

        bridge = new TokenBridge(address(gateway), address(feeToken));

        // Setup user with tokens
        token.transfer(user, 1000 * 10 ** 18);
        feeToken.transfer(user, 100 * 10 ** 18);
    }

    function testBridgeTokens() public {
        uint256 amount = 100 * 10 ** 18;
        bytes memory destChain = "ETH";
        string memory symbol = "TEST";

        vm.startPrank(user);

        // Approve bridge to spend tokens
        token.approve(address(bridge), amount);

        // Expect the TeleportCalled event from the mock gateway
        // We construct the expected params to match logic in TokenBridge
        TeleportParams memory expectedParams = TeleportParams({
            amount: amount,
            relayerFee: 0,
            assetId: keccak256(abi.encodePacked(symbol)),
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: destChain,
            timeout: 0,
            nativeCost: 0,
            data: ""
        });

        // We check if the event is emitted by the Gateway
        vm.expectEmit(true, true, true, true, address(gateway));
        emit MockTokenGateway.TeleportCalled(expectedParams, 0);

        bridge.bridgeTokens{value: 0}(
            address(token),
            symbol,
            amount,
            recipient,
            destChain
        );

        vm.stopPrank();

        // Verify tokens were transferred from user to bridge (and then subsequently approved to gateway)
        // Since MockGateway.teleport doesn't actually transferFrom, the tokens should sit in the bridge contract
        // IF the bridge didn't transfer them. But wait, standard ITokenGateway usually pulls tokens.
        // However, looking at TokenBridge.sol:
        // 1. IERC20(token).transferFrom(msg.sender, address(this), amount); -> Tokens now in Bridge
        // 2. IERC20(token).approve(address(tokenGateway), amount); -> Bridge approves Gateway
        // 3. tokenGateway.teleport(...) -> Gateway SHOULD pull tokens from Bridge

        // Since our MockTokenGateway.teleport DOES NOT pull tokens, they should remain in the Bridge contract.
        assertEq(token.balanceOf(address(bridge)), amount);

        // Verify approvals
        assertEq(token.allowance(address(bridge), address(gateway)), amount);
        assertEq(
            feeToken.allowance(address(bridge), address(gateway)),
            type(uint256).max
        );
    }

    function testBridgeTokensWithNativeValue() public {
        uint256 amount = 50 * 10 ** 18;
        bytes memory destChain = "POLY";
        string memory symbol = "TEST";
        uint256 nativeFee = 1 ether;

        vm.deal(user, 10 ether);
        vm.startPrank(user);

        token.approve(address(bridge), amount);

        TeleportParams memory expectedParams = TeleportParams({
            amount: amount,
            relayerFee: 0,
            assetId: keccak256(abi.encodePacked(symbol)),
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: destChain,
            timeout: 0,
            nativeCost: nativeFee,
            data: ""
        });

        vm.expectEmit(true, true, true, true, address(gateway));
        emit MockTokenGateway.TeleportCalled(expectedParams, nativeFee);

        bridge.bridgeTokens{value: nativeFee}(
            address(token),
            symbol,
            amount,
            recipient,
            destChain
        );

        vm.stopPrank();
    }
}
