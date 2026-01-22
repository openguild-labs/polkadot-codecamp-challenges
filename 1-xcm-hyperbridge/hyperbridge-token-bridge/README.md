# Hyperbridge Token Bridge

A cross-chain token bridge implementation using the Hyperbridge protocol to bridge USD.h tokens between BNB Smart Chain Testnet and Paseo Asset Hub.

## Overview

This project implements a token bridge contract that enables seamless transfer of USD.h tokens across different blockchain networks using Hyperbridge's cross-chain messaging protocol. The bridge allows users to lock tokens on the source chain and mint equivalent tokens on the destination chain.

## Architecture

### Core Components

- **TokenBridge.sol**: Main bridge contract that handles cross-chain token transfers
- **Frontend**: Next.js application for user interaction (see [frontend/README.md](./frontend/README.md))
- **Hyperbridge SDK**: Integration with Hyperbridge protocol for secure cross-chain communication

### Supported Chains

- **Source Chain**: BNB Smart Chain Testnet (Chain ID: 97)
- **Destination Chain**: Paseo Asset Hub (Chain ID: 420420422)

## Contract Implementation

### TokenBridge Contract

The `TokenBridge` contract (`src/TokenBridge.sol`) is the core component that facilitates token bridging:

```solidity
contract TokenBridge {
    ITokenGateway public immutable tokenGateway;
    address public immutable feeToken;

    constructor(address _tokenGateway, address _feeToken) {
        tokenGateway = ITokenGateway(_tokenGateway);
        feeToken = _feeToken;
    }

    function bridgeTokens(
        address token,
        string memory symbol,
        uint256 amount,
        address recipient,
        bytes memory destChain
    ) external payable {
        // Transfer tokens from user to bridge
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve gateway to spend tokens
        IERC20(token).approve(address(tokenGateway), amount);
        IERC20(feeToken).approve(address(tokenGateway), type(uint256).max);

        // Prepare teleport parameters
        TeleportParams memory params = TeleportParams({
            amount: amount,
            relayerFee: 0,
            assetId: keccak256(abi.encodePacked(symbol)),
            redeem: false,
            to: bytes32(uint256(uint160(recipient))),
            dest: destChain,
            timeout: 0,
            nativeCost: msg.value,
            data: ""
        });

        // Execute cross-chain transfer
        tokenGateway.teleport{value: msg.value}(params);
    }
}
```

### Key Features

1. **Cross-Chain Token Transfer**: Uses Hyperbridge's `ITokenGateway` interface to initiate teleport operations
2. **Fee Management**: Supports both ERC20 fee tokens and native token payments for cross-chain fees
3. **Asset Identification**: Uses token symbol hash as asset ID for consistent identification across chains
4. **Recipient Specification**: Allows specifying destination recipient addresses
5. **Timeout Handling**: Configurable timeout parameters for transaction validity

### Security Considerations

- **Access Control**: No privileged functions - any user can bridge tokens
- **Token Approval**: Requires user approval for token spending
- **Gateway Trust**: Relies on the security of the Hyperbridge TokenGateway contract
- **Reentrancy Protection**: Uses standard ERC20 transfer patterns
