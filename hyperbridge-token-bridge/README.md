# Hyperbridge Token Bridge (Smart Contract)

This directory contains the Solidity smart contracts for the **Hyperbridge Token Bridge** challenge. It uses the Hyperbridge SDK to enable cross-chain ERC20 token transfers.

## 📄 Contracts

### `TokenBridge.sol`
A wrapper contract that interacts with the Hyperbridge `TokenGateway`.
- **Purpose**: Facilitate cross-chain token transfers while handling fee subsidies.
- **Key Features**:
  - Validates approval and transfers tokens from the user.
  - Subsidizes the **0.483 USD.h** Relayer Fee required by the TokenGateway (the contract pays the fee, so it must be funded).
  - Calls `TokenGateway.teleport()` to execute the bridge transaction.

## 🚀 Deployed Contracts

| Network | Contract Name | Address |
|Strings | ------------- | ------- |
| **Optimism Sepolia** | `TokenBridge` | `0xa74f97D26a3783C94c8a925C3c2598cA80C8C579` |

## 🛠️ Setup & Usage

### Prerequisites
- [Foundry](https://book.getfoundry.sh/) installed.
- `pnpm` or `bun` (optional for tooling).

### Installation

```bash
forge install
```

### Compile

```bash
forge build
```

### Test

```bash
forge test
```

### Deploy to Testnet

To deploy the contract yourself (e.g. to Optimism Sepolia):

1. **Configure Environment**:
   Copy `.env.example` to `.env` and set your `PRIVATE_KEY` and `RPC_URL`.

2. **Run Deployment Script**:
   ```bash
   forge script script/DeployTokenBridge.s.sol --rpc-url $RPC_URL --broadcast
   ```

3. **Important: Fund the Contract**:
   Since the contract subsidizes fees, you MUST send some **USD.h** to the deployed contract address.
   ```bash
   cast send <FEE_TOKEN_ADDRESS> "transfer(address,uint256)" <YOUR_CONTRACT_ADDRESS> <AMOUNT> --rpc-url $RPC_URL --private-key $PRIVATE_KEY
   ```

## 📚 Resources
- [Hyperbridge Documentation](https://docs.hyperbridge.network/)
- [Hyperbridge SDK](https://github.com/polytope-labs/hyperbridge-sdk)
