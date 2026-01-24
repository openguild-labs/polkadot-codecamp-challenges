// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ITokenGateway, TeleportParams, TokenGatewayParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title TokenBridge
 * @notice A wrapper contract for Hyperbridge TokenGateway to simplify ERC20 cross-chain transfers
 * @dev This contract handles token approvals and calls the TokenGateway's teleport function
 */
contract TokenBridge {
    using SafeERC20 for IERC20;

    ITokenGateway public immutable tokenGateway;
    address public immutable owner;

    event BridgeInitiated(
        address indexed sender,
        bytes32 indexed assetId,
        uint256 amount,
        bytes32 to,
        bytes dest,
        uint64 timeout
    );

    event BridgeFailed(
        address indexed sender,
        bytes32 indexed assetId,
        uint256 amount,
        string reason
    );

    error ZeroAmount();
    error ZeroAddress();
    error UnknownAsset();
    error TransferFailed();
    error InsufficientNativeValue();

    modifier onlyOwner() {
        require(msg.sender == owner, "TokenBridge: not owner");
        _;
    }

    /**
     * @notice Initialize the TokenBridge with the Hyperbridge TokenGateway address
     * @param _tokenGateway Address of the deployed TokenGateway contract
     */
    constructor(address _tokenGateway) {
        if (_tokenGateway == address(0)) revert ZeroAddress();
        tokenGateway = ITokenGateway(_tokenGateway);
        owner = msg.sender;
    }

    /**
     * @notice Bridge tokens to another chain using Hyperbridge
     * @param params The teleport parameters for the cross-chain transfer
     * @dev User must approve this contract to spend their tokens before calling
     */
    function bridgeTokens(TeleportParams calldata params) external payable {
        if (params.amount == 0) revert ZeroAmount();
        
        // Get the ERC20 token address for this asset
        address tokenAddr = tokenGateway.erc20(params.assetId);
        if (tokenAddr == address(0)) revert UnknownAsset();

        // Transfer tokens from user to this contract
        IERC20(tokenAddr).safeTransferFrom(msg.sender, address(this), params.amount);

        // Approve TokenGateway to spend tokens
        IERC20(tokenAddr).approve(address(tokenGateway), params.amount);

        // Call teleport on TokenGateway
        tokenGateway.teleport{value: msg.value}(params);

        emit BridgeInitiated(
            msg.sender,
            params.assetId,
            params.amount,
            params.to,
            params.dest,
            params.timeout
        );
    }

    /**
     * @notice Bridge tokens with simplified parameters
     * @param assetId The token identifier (keccak256 of token details)
     * @param amount Amount of tokens to bridge
     * @param recipient Recipient address on destination chain (as bytes32)
     * @param destChain Destination chain identifier
     * @param timeout Request timeout in seconds
     * @param relayerFee Fee for the relayer
     */
    function bridge(
        bytes32 assetId,
        uint256 amount,
        bytes32 recipient,
        bytes calldata destChain,
        uint64 timeout,
        uint256 relayerFee
    ) external payable {
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: relayerFee,
            assetId: assetId,
            redeem: true,
            to: recipient,
            dest: destChain,
            timeout: timeout,
            nativeCost: msg.value,
            data: ""
        });

        if (amount == 0) revert ZeroAmount();
        
        address tokenAddr = tokenGateway.erc20(assetId);
        if (tokenAddr == address(0)) revert UnknownAsset();

        IERC20(tokenAddr).safeTransferFrom(msg.sender, address(this), amount);
        IERC20(tokenAddr).approve(address(tokenGateway), amount);

        tokenGateway.teleport{value: msg.value}(params);

        emit BridgeInitiated(
            msg.sender,
            assetId,
            amount,
            recipient,
            destChain,
            timeout
        );
    }

    /**
     * @notice Get the ERC20 token address for a given asset ID
     * @param assetId The asset identifier
     * @return The ERC20 token address
     */
    function getTokenAddress(bytes32 assetId) external view returns (address) {
        return tokenGateway.erc20(assetId);
    }

    /**
     * @notice Get the TokenGateway parameters
     * @return The TokenGateway params including host and dispatcher addresses
     */
    function getGatewayParams() external view returns (TokenGatewayParams memory) {
        return tokenGateway.params();
    }

    /**
     * @notice Get the TokenGateway instance for a destination chain
     * @param destination The destination chain identifier
     * @return The TokenGateway address on that chain
     */
    function getDestinationGateway(bytes calldata destination) external view returns (address) {
        return tokenGateway.instance(destination);
    }

    /**
     * @notice Rescue tokens accidentally sent to this contract
     * @param token The token address to rescue
     * @param to The recipient address
     * @param amount The amount to rescue
     */
    function rescueTokens(address token, address to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        IERC20(token).safeTransfer(to, amount);
    }

    /**
     * @notice Rescue native tokens accidentally sent to this contract
     * @param to The recipient address
     */
    function rescueNative(address payable to) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        (bool success, ) = to.call{value: address(this).balance}("");
        if (!success) revert TransferFailed();
    }

    receive() external payable {}
}
