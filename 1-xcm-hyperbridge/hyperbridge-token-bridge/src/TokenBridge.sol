// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {StateMachine} from "@hyperbridge/core/libraries/StateMachine.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenBridge {
    using SafeERC20 for IERC20;

    ITokenGateway public immutable GATEWAY;
    IERC20 public immutable FEE_TOKEN;

    event TokensBridged(
        address indexed sender,
        address indexed recipient,
        bytes32 assetId,
        uint256 amount,
        uint256 destChainId
    );

    constructor(address _gateway, address _feeToken) {
        GATEWAY = ITokenGateway(_gateway);
        FEE_TOKEN = IERC20(_feeToken);
    }

    /**
     * @notice Bridge tokens to a destination EVM chain via Hyperbridge
     * @param token The ERC20 token to bridge
     * @param amount Amount of tokens to bridge
     * @param recipient Recipient address on the destination chain
     * @param assetId The Hyperbridge asset identifier
     * @param destChainId Destination EVM chain ID (e.g. 11155111 for Sepolia)
     * @param relayerFee Fee for the relayer
     * @param timeout Request timeout in seconds
     * @param redeem Whether to redeem ERC20 on destination
     */
    function bridgeTokens(
        address token,
        uint256 amount,
        address recipient,
        bytes32 assetId,
        uint256 destChainId,
        uint256 relayerFee,
        uint64 timeout,
        bool redeem
    ) external payable {
        IERC20 tokenContract = IERC20(token);

        // Transfer tokens from user to this contract
        tokenContract.safeTransferFrom(msg.sender, address(this), amount);

        // Approve the gateway to spend the tokens
        tokenContract.forceApprove(address(GATEWAY), amount);

        // If paying fees with feeToken, transfer and approve fee tokens
        if (msg.value == 0 && relayerFee > 0) {
            FEE_TOKEN.safeTransferFrom(msg.sender, address(this), relayerFee);
            FEE_TOKEN.forceApprove(address(GATEWAY), relayerFee);
        }

        // Build teleport params
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: relayerFee,
            assetId: assetId,
            redeem: redeem,
            to: bytes32(uint256(uint160(recipient))),
            dest: StateMachine.evm(destChainId),
            timeout: timeout,
            nativeCost: msg.value,
            data: ""
        });

        // Execute the teleport
        GATEWAY.teleport{value: msg.value}(params);

        emit TokensBridged(msg.sender, recipient, assetId, amount, destChainId);
    }

    /**
     * @notice Get the destination chain identifier bytes
     * @param chainId The EVM chain ID
     * @return The encoded state machine identifier
     */
    function getDestination(uint256 chainId) external pure returns (bytes memory) {
        return StateMachine.evm(chainId);
    }
}
