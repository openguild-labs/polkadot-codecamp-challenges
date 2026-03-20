// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridge {
    ITokenGateway public immutable tokenGateway;
    address public immutable feeToken;

    constructor(address _tokenGateway, address _feeToken) {
        tokenGateway = ITokenGateway(_tokenGateway);
        feeToken = _feeToken;
    }

    function bridgeTokens(
        address token,
        uint256 amount,
        address recipient,
        bytes32 destChain,
        uint256 relayerFee
    ) external payable {
        // 1. Chuyển token từ user vào contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        
        // 2. Approve cho TokenGateway
        IERC20(token).approve(address(tokenGateway), amount);

        // 3. Xử lý phí nếu có
        if (relayerFee > 0) {
            IERC20(feeToken).transferFrom(msg.sender, address(this), relayerFee);
            IERC20(feeToken).approve(address(tokenGateway), relayerFee);
        }

        // 4. Gọi Hyperbridge để chuyển đi
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: relayerFee,
            assetId: bytes32(uint256(uint160(token))),
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: abi.encodePacked(destChain),
            timeout: 0,
            nativeCost: 0,
            data: ""
        });

        tokenGateway.teleport(params);
    }
}

