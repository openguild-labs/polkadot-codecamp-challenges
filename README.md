# Challenge 1: Cross-chain Solidity Smart Contract with XCM + Hyperbridge

## 🎯 Challenge Overview

Build a cross-chain token bridge using **Hyperbridge SDK** that enables ERC20 token transfers between different chains in the Polkadot ecosystem.

In this challenge, you will:
- Learn how Hyperbridge enables secure cross-chain communication
- Interact with the `TokenGateway` for cross-chain transfers
- Deploy and test your bridge on Polkadot testnets

## 📚 Background

### What is Hyperbridge?

[Hyperbridge](https://github.com/polytope-labs/hyperbridge-sdk) is a cross-chain interoperability protocol that enables secure message passing between different blockchain networks. It provides:

- **Post Requests**: Send data across chains
- **Get Requests**: Pull data from other chains  
- **Token Transfers**: Bridge tokens using `TokenGateway` and `IntentGateway`

### Hyperbridge SDK Core Components

The [@hyperbridge/core](https://github.com/polytope-labs/hyperbridge-sdk/tree/main/packages/core) package provides:

| Component | Description |
| --------- | ----------- |
| `IHost` | Protocol host interface |
| `IDispatcher` | Protocol dispatcher interface |
| `IHandler` | Protocol message handler interface |
| `HyperApp` | Abstract base contract for cross-chain apps |
| `HyperFungibleToken` | ERC20 with gateway-restricted minting/burning |
| `ITokenGateway` | Interface for cross-chain token transfers |
| `IIntentGateway` | Interface for intent-based cross-chain orders |

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 22
- Foundry (for Solidity development)
- pnpm

### Setup

1. **Initialize your project**

```bash
mkdir hyperbridge-token-bridge
cd hyperbridge-token-bridge
forge init
```

2. **Install Hyperbridge SDK**

```bash
forge install OpenZeppelin/openzeppelin-contracts
forge install polytope-labs/hyperbridge-sdk
```

3. **Configure remappings** (add to `remappings.txt`)

```
@hyperbridge/core/=lib/hyperbridge-sdk/packages/core/contracts/
@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/
```

## 📝 Challenge Tasks

### Task 1: Implement Cross-Chain Transfer Logic

Create a contract that interacts with the TokenGateway for bridging:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {ITokenGateway, TeleportParams} from "@hyperbridge/core/apps/TokenGateway.sol";
import {StateMachine} from "@hyperbridge/core/libraries/StateMachine.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenBridge {
    ITokenGateway public immutable tokenGateway;
    address public immutable feeToken;
    
    constructor(address _tokenGateway, address _feeToken) {
        tokenGateway = ITokenGateway(_tokenGateway);
        feeToken = _feeToken;
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
        // Approve the gateway to spend tokens
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        IERC20(token).approve(address(tokenGateway), amount);
        IERC20(feeToken).approve(address(tokenGateway), type(uint256).max);
        
        // Initiate the cross-chain transfer
        // Implementation depends on TokenGateway interface
    }
}
```

### Task 2: Build a Simple Frontend

Create a basic UI to interact with your bridge:
- Connect wallet (MetaMask, etc.)
- Select source and destination chains
- Input token amount and recipient
- Execute bridge transaction
- Display transaction status

**Minimum supported network pairs (pick at least one):**

| Source Network     | Destination Network |
| ------------------ | ------------------- |
| Paseo              | ETH Sepolia         |
| BSC Testnet        | ETH Sepolia         |
| Optimism Sepolia   | ETH Sepolia         |

### Task 3: Deploy and Test
- Write unit tests
- Deploy your contracts to testnets
- Document deployment addresses and test results


## 📋 Submission Requirements

Your submission should include:

1. **Smart Contracts**
   - [ ] `TokenBridge.sol` - Bridge logic contract
   - [ ] Deployment scripts
   - [ ] Bridge token script

2. **Documentation**
   - [ ] README explaining your implementation
   - [ ] Deployment addresses

3. **Testing**
   - [ ] Unit tests for `TokenBridge.sol` contract

4. **Frontend**
   - [ ] Basic UI for bridging tokens
   - [ ] Screenshots of your UI in action
   - [ ] Accessible Recording Link 
   - [ ] Minimum supported network pairs (pick at least one)

## 🔗 Resources

### Hyperbridge Documentation
- [Hyperbridge SDK GitHub](https://github.com/polytope-labs/hyperbridge-sdk)
- [@hyperbridge/core Package](https://github.com/polytope-labs/hyperbridge-sdk/tree/main/packages/core)
- [HyperFungibleToken Contract](https://github.com/polytope-labs/hyperbridge-sdk/blob/main/packages/core/contracts/apps/HyperFungibleToken.sol)

### Hyperbridge Resources
- [HyperBridge Docs](https://docs.hyperbridge.network/)
- [Deployed Contract](https://docs.hyperbridge.network/developers/explore/configurations/testnet)

- [XCM](https://wiki.polkadot.com/learn/learn-xcm/)

### Solidity & Foundry
- [Foundry Book](https://book.getfoundry.sh/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)


