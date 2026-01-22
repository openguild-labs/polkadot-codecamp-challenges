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
        bytes memory destChain
    ) external payable {
        // Approve token
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(address(tokenGateway), amount);
        IERC20(feeToken).approve(address(tokenGateway), type(uint256).max);
        
        TeleportParams memory params = TeleportParams(
            amount,                                 
            0,                                    
            bytes32(uint256(uint160(token))),      
            false,                                 
            bytes32(uint256(uint160(recipient))),   
            destChain,                             
            0,                                   
            msg.value,                             
            ""                                   
        );

        tokenGateway.teleport(params);
    }
}