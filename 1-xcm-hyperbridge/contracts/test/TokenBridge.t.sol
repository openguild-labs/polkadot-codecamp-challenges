// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {TokenBridge} from "../src/TokenBridge.sol";
import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Mock ERC20 Token for testing
contract MockERC20 is IERC20 {
    string public name = "Mock Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
}

// Mock TokenGateway for testing
contract MockTokenGateway is ITokenGateway {
    mapping(bytes32 => address) public erc20Assets;
    mapping(bytes32 => address) public erc6160Assets;
    mapping(bytes => address) public instances;
    
    TokenGatewayParams internal _params;
    TeleportParams public lastTeleportParams;
    bool public teleportCalled;

    constructor() {
        _params = TokenGatewayParams({
            host: address(this),
            dispatcher: address(this)
        });
    }

    function setErc20(bytes32 assetId, address token) external {
        erc20Assets[assetId] = token;
    }

    function params() external view returns (TokenGatewayParams memory) {
        return _params;
    }

    function erc20(bytes32 assetId) external view returns (address) {
        return erc20Assets[assetId];
    }

    function erc6160(bytes32 assetId) external view returns (address) {
        return erc6160Assets[assetId];
    }

    function instance(bytes calldata destination) external view returns (address) {
        return instances[destination];
    }

    function teleport(TeleportParams calldata teleportParams) external payable {
        lastTeleportParams = teleportParams;
        teleportCalled = true;
        
        // Transfer tokens from sender (TokenBridge) to this gateway
        address token = erc20Assets[teleportParams.assetId];
        if (token != address(0)) {
            IERC20(token).transferFrom(msg.sender, address(this), teleportParams.amount);
        }
    }
}

contract TokenBridgeTest is Test {
    TokenBridge public bridge;
    MockTokenGateway public gateway;
    MockERC20 public token;
    
    address public user = address(0x1234);
    bytes32 public constant ASSET_ID = keccak256("TEST_TOKEN");
    bytes public constant DEST_CHAIN = hex"01";
    
    event BridgeInitiated(
        address indexed sender,
        bytes32 indexed assetId,
        uint256 amount,
        bytes32 to,
        bytes dest,
        uint64 timeout
    );

    function setUp() public {
        // Deploy mock gateway
        gateway = new MockTokenGateway();
        
        // Deploy bridge
        bridge = new TokenBridge(address(gateway));
        
        // Deploy mock token
        token = new MockERC20();
        
        // Register token in gateway
        gateway.setErc20(ASSET_ID, address(token));
        
        // Mint tokens to user
        token.mint(user, 1000 ether);
        
        // Fund user with ETH
        vm.deal(user, 10 ether);
    }

    function test_Constructor() public view {
        assertEq(address(bridge.tokenGateway()), address(gateway));
        assertEq(bridge.owner(), address(this));
    }

    function test_Constructor_RevertZeroAddress() public {
        vm.expectRevert(TokenBridge.ZeroAddress.selector);
        new TokenBridge(address(0));
    }

    function test_GetTokenAddress() public view {
        address tokenAddr = bridge.getTokenAddress(ASSET_ID);
        assertEq(tokenAddr, address(token));
    }

    function test_GetGatewayParams() public view {
        TokenGatewayParams memory params = bridge.getGatewayParams();
        assertEq(params.host, address(gateway));
        assertEq(params.dispatcher, address(gateway));
    }

    function test_BridgeTokens() public {
        uint256 amount = 100 ether;
        bytes32 recipient = bytes32(uint256(uint160(address(0x5678))));
        
        vm.startPrank(user);
        
        // Approve bridge to spend tokens
        token.approve(address(bridge), amount);
        
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: 0.01 ether,
            assetId: ASSET_ID,
            redeem: true,
            to: recipient,
            dest: DEST_CHAIN,
            timeout: 3600,
            nativeCost: 0.1 ether,
            data: ""
        });
        
        // Expect event
        vm.expectEmit(true, true, false, true);
        emit BridgeInitiated(user, ASSET_ID, amount, recipient, DEST_CHAIN, 3600);
        
        bridge.bridgeTokens{value: 0.1 ether}(params);
        
        vm.stopPrank();
        
        // Verify teleport was called
        assertTrue(gateway.teleportCalled());
        
        // Verify user's token balance decreased
        assertEq(token.balanceOf(user), 900 ether);
        
        // Verify gateway received tokens
        assertEq(token.balanceOf(address(gateway)), 100 ether);
    }

    function test_Bridge_SimplifiedMethod() public {
        uint256 amount = 50 ether;
        bytes32 recipient = bytes32(uint256(uint160(address(0x5678))));
        
        vm.startPrank(user);
        
        token.approve(address(bridge), amount);
        
        vm.expectEmit(true, true, false, true);
        emit BridgeInitiated(user, ASSET_ID, amount, recipient, DEST_CHAIN, 3600);
        
        bridge.bridge{value: 0.1 ether}(
            ASSET_ID,
            amount,
            recipient,
            DEST_CHAIN,
            3600,
            0.01 ether
        );
        
        vm.stopPrank();
        
        assertTrue(gateway.teleportCalled());
        assertEq(token.balanceOf(user), 950 ether);
    }

    function test_BridgeTokens_RevertZeroAmount() public {
        vm.startPrank(user);
        
        TeleportParams memory params = TeleportParams({
            amount: 0,
            relayerFee: 0,
            assetId: ASSET_ID,
            redeem: true,
            to: bytes32(0),
            dest: DEST_CHAIN,
            timeout: 3600,
            nativeCost: 0,
            data: ""
        });
        
        vm.expectRevert(TokenBridge.ZeroAmount.selector);
        bridge.bridgeTokens(params);
        
        vm.stopPrank();
    }

    function test_BridgeTokens_RevertUnknownAsset() public {
        bytes32 unknownAsset = keccak256("UNKNOWN");
        
        vm.startPrank(user);
        
        TeleportParams memory params = TeleportParams({
            amount: 100 ether,
            relayerFee: 0,
            assetId: unknownAsset,
            redeem: true,
            to: bytes32(0),
            dest: DEST_CHAIN,
            timeout: 3600,
            nativeCost: 0,
            data: ""
        });
        
        vm.expectRevert(TokenBridge.UnknownAsset.selector);
        bridge.bridgeTokens(params);
        
        vm.stopPrank();
    }

    function test_RescueTokens() public {
        // Send some tokens to bridge accidentally
        token.mint(address(bridge), 100 ether);
        
        address recipient = address(0x9999);
        
        bridge.rescueTokens(address(token), recipient, 100 ether);
        
        assertEq(token.balanceOf(recipient), 100 ether);
        assertEq(token.balanceOf(address(bridge)), 0);
    }

    function test_RescueTokens_RevertNotOwner() public {
        vm.prank(user);
        vm.expectRevert("TokenBridge: not owner");
        bridge.rescueTokens(address(token), user, 100 ether);
    }

    function test_RescueNative() public {
        // Send ETH to bridge
        vm.deal(address(bridge), 1 ether);
        
        address payable recipient = payable(address(0x9999));
        uint256 balanceBefore = recipient.balance;
        
        bridge.rescueNative(recipient);
        
        assertEq(recipient.balance, balanceBefore + 1 ether);
        assertEq(address(bridge).balance, 0);
    }

    function test_RescueNative_RevertZeroAddress() public {
        vm.deal(address(bridge), 1 ether);
        
        vm.expectRevert(TokenBridge.ZeroAddress.selector);
        bridge.rescueNative(payable(address(0)));
    }

    function test_Receive() public {
        // Bridge should be able to receive ETH
        vm.deal(user, 1 ether);
        vm.prank(user);
        (bool success, ) = address(bridge).call{value: 0.5 ether}("");
        assertTrue(success);
        assertEq(address(bridge).balance, 0.5 ether);
    }
}
