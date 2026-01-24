// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title MockTokenGateway
 * @notice A mock implementation of TokenGateway for demo/testing purposes
 * @dev This does NOT perform actual cross-chain transfers, only simulates the interface
 */
contract MockTokenGateway is ITokenGateway {
    mapping(bytes32 => address) public erc20Assets;
    mapping(bytes32 => address) public erc6160Assets;
    mapping(bytes => address) public gatewayInstances;
    
    TokenGatewayParams internal _params;
    
    event MockTeleport(
        address indexed from,
        bytes32 indexed assetId,
        uint256 amount,
        bytes32 to,
        bytes dest
    );

    constructor() {
        _params = TokenGatewayParams({
            host: address(this),
            dispatcher: address(this)
        });
    }

    /// @notice Register an ERC20 token for bridging
    function registerERC20(bytes32 assetId, address token) external {
        erc20Assets[assetId] = token;
    }

    /// @notice Register gateway instance for a destination
    function registerInstance(bytes calldata destination, address gateway) external {
        gatewayInstances[destination] = gateway;
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
        return gatewayInstances[destination];
    }

    /// @notice Mock teleport - just transfers tokens to this contract and emits event
    function teleport(TeleportParams calldata teleportParams) external payable {
        address token = erc20Assets[teleportParams.assetId];
        
        if (token != address(0)) {
            // Transfer tokens from sender to this gateway (simulating lock)
            IERC20(token).transferFrom(msg.sender, address(this), teleportParams.amount);
        }

        emit MockTeleport(
            msg.sender,
            teleportParams.assetId,
            teleportParams.amount,
            teleportParams.to,
            teleportParams.dest
        );

        // In a real implementation, this would dispatch a cross-chain message
        // For demo purposes, tokens are just locked in this contract
    }
}
