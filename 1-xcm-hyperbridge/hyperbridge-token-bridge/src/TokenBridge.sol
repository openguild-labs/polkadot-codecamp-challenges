// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {
    ITokenGateway,
    TeleportParams
} from "@hyperbridge/core/contracts/apps/TokenGateway.sol";
import {
    StateMachine
} from "@hyperbridge/core/contracts/libraries/StateMachine.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridge {
    ITokenGateway public immutable tokenGateway;
    address public immutable feeToken;

    // Default timeout: 24 hours (in seconds)
    uint64 public constant DEFAULT_TIMEOUT = 86400;

    constructor(address _tokenGateway, address _feeToken) {
        tokenGateway = ITokenGateway(_tokenGateway);
        feeToken = _feeToken;
    }

    /// @notice Bridge tokens to another chain with default settings
    /// @param token The token address to bridge
    /// @param symbol The token symbol to bridge
    /// @param amount The amount to bridge
    /// @param recipient The recipient address on the destination chain
    /// @param destChain The destination chain identifier
    function bridgeTokens(
        address token,
        string memory symbol,
        uint256 amount,
        address recipient,
        bytes memory destChain
    ) external payable {
        bytes32 assetId = keccak256(abi.encodePacked(symbol));
        uint256 nativeCost = msg.value;
        _bridgeTokens(
            token,
            amount,
            nativeCost,
            assetId,
            recipient,
            destChain,
            0,
            DEFAULT_TIMEOUT
        );
    }

    /// @notice Bridge tokens with asset ID
    function bridgeTokens(
        address token,
        bytes32 assetId,
        uint256 amount,
        address recipient,
        bytes memory destChain
    ) external payable {
        uint256 nativeCost = msg.value;
        _bridgeTokens(
            token,
            amount,
            nativeCost,
            assetId,
            recipient,
            destChain,
            0,
            DEFAULT_TIMEOUT
        );
    }

    /// @notice Bridge tokens with custom relayer fee and timeout
    /// @param token The token address to bridge
    /// @param symbol The token symbol to bridge
    /// @param amount The amount to bridge
    /// @param recipient The recipient address on the destination chain
    /// @param destChain The destination chain identifier
    /// @param relayerFee Fee paid to relayers (in fee token)
    /// @param timeout Timeout in seconds (0 for default)
    function bridgeTokensWithFee(
        address token,
        string memory symbol,
        uint256 amount,
        address recipient,
        bytes memory destChain,
        uint256 relayerFee,
        uint64 timeout
    ) external payable {
        bytes32 assetId = keccak256(abi.encodePacked(symbol));
        uint256 nativeCost = msg.value;
        uint64 actualTimeout = timeout == 0 ? DEFAULT_TIMEOUT : timeout;
        _bridgeTokens(
            token,
            amount,
            nativeCost,
            assetId,
            recipient,
            destChain,
            relayerFee,
            actualTimeout
        );
    }

    /// @notice Bridge tokens with asset ID, custom relayer fee and timeout
    function bridgeTokensWithFee(
        address token,
        bytes32 assetId,
        uint256 amount,
        address recipient,
        bytes memory destChain,
        uint256 relayerFee,
        uint64 timeout
    ) external payable {
        uint256 nativeCost = msg.value;
        uint64 actualTimeout = timeout == 0 ? DEFAULT_TIMEOUT : timeout;
        _bridgeTokens(
            token,
            amount,
            nativeCost,
            assetId,
            recipient,
            destChain,
            relayerFee,
            actualTimeout
        );
    }

    function getAssetId(string memory symbol) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(symbol));
    }

    function getERC20Address(bytes32 assetId) external view returns (address) {
        return tokenGateway.erc20(assetId);
    }

    function _bridgeTokens(
        address token,
        uint256 amount,
        uint256 nativeCost,
        bytes32 assetId,
        address recipient,
        bytes memory destChain,
        uint256 relayerFee,
        uint64 timeout
    ) internal {
        // Transfer tokens from sender to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve the gateway to spend tokens
        IERC20(token).approve(address(tokenGateway), amount);
        IERC20(feeToken).approve(address(tokenGateway), type(uint256).max);

        // Initiate the cross-chain transfer
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: relayerFee,
            assetId: assetId,
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: destChain,
            timeout: timeout,
            nativeCost: nativeCost,
            data: ""
        });

        tokenGateway.teleport{value: nativeCost}(params);
    }
}
