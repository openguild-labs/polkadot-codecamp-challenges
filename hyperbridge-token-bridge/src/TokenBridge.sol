// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenBridge {
    using SafeERC20 for IERC20;

    ITokenGateway public immutable TOKEN_GATEWAY;
    address public immutable FEE_TOKEN;

    constructor(address _tokenGateway, address _feeToken) {
        TOKEN_GATEWAY = ITokenGateway(_tokenGateway);
        FEE_TOKEN = _feeToken;
    }

    /// @notice Bridge tokens to another chain
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
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        IERC20(token).forceApprove(address(TOKEN_GATEWAY), amount);
        IERC20(FEE_TOKEN).forceApprove(
            address(TOKEN_GATEWAY),
            type(uint256).max
        );
        bytes32 assetId = keccak256(abi.encodePacked(symbol));
        bytes32 recipientId = bytes32(uint256(uint160(recipient)));

        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: 0,
            assetId: assetId,
            redeem: false,
            to: recipientId,
            dest: destChain,
            timeout: 0,
            nativeCost: 0,
            data: ""
        });

        TOKEN_GATEWAY.teleport{value: msg.value}(params);
    }
}
