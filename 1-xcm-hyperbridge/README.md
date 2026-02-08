# Challenge 1: Cross-chain Token Bridge with XCM + Hyperbridge

## My Submission

- **Demo Video**: [Polkadot Codecamp Challenge 1 - Cross-Chain Token Bridge with XCM + Hyperbridge](https://youtu.be/jK-HwFqj-fE)

A cross-chain token bridge implementation using **Hyperbridge SDK** that enables ERC20 token transfers between Ethereum Sepolia and Paseo Asset Hub.

### Deployed Contracts (Paseo Asset Hub - Chain ID: 420420422)

| Contract         | Address                                      |
| ---------------- | -------------------------------------------- |
| MockTokenGateway | `0x5D9eaE096BF641258Be58677885F303B4Ff96468` |
| TokenBridge      | `0xcBc807e1dd9314415b7cbAf1d3B843136bb37EC9` |
| TestToken (TEST) | `0x136b7Aa6b01E66e035DCDD9868C3016116b69cA5` |

## 🏗️ Project Structure

```
1-xcm-hyperbridge/
├── contracts/           # Foundry smart contracts
│   ├── src/
│   │   └── TokenBridge.sol    # Main bridge contract
│   ├── script/
│   │   └── Deploy.s.sol       # Deployment script
│   ├── test/
│   │   └── TokenBridge.t.sol  # Unit tests (13/13 passed)
│   ├── foundry.toml
│   └── remappings.txt
├── frontend/            # Next.js frontend
│   └── src/
│       ├── app/               # App router pages
│       ├── components/        # React components
│       │   ├── bridge-form.tsx
│       │   ├── chain-selector.tsx
│       │   ├── wallet-connect.tsx
│       │   └── web3-provider.tsx
│       └── lib/
│           └── wagmi.ts       # Web3 configuration
└── README.md
```

## 🚀 Features

### Smart Contracts

- **TokenBridge.sol** - Wrapper for Hyperbridge's `ITokenGateway`
  - `bridgeTokens()` - Bridge tokens using `TeleportParams` struct
  - `bridge()` - Simplified bridge with individual parameters
  - `rescueTokens()` / `rescueNative()` - Emergency rescue functions
  - SafeERC20 for secure token transfers

### Frontend

- **Wallet Connection** - MetaMask integration via Wagmi
- **Chain Selector** - Switch between Sepolia and Paseo Asset Hub
- **Bridge Form** - Token amount, recipient address, transaction execution
- **Transaction Status** - Real-time feedback on bridge operations

## 📋 Prerequisites

- Node.js >= 22
- Foundry (for smart contracts)
- npm

## 🛠️ Setup & Run

### Smart Contracts

```bash
cd contracts

# Install dependencies
forge install

# Build
forge build

# Run tests
forge test -vvv
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 🧪 Test Results

```
Ran 13 tests for test/TokenBridge.t.sol:TokenBridgeTest
[PASS] test_BridgeTokens()
[PASS] test_BridgeTokens_RevertUnknownAsset()
[PASS] test_BridgeTokens_RevertZeroAmount()
[PASS] test_Bridge_SimplifiedMethod()
[PASS] test_Constructor()
[PASS] test_Constructor_RevertZeroAddress()
[PASS] test_GetGatewayParams()
[PASS] test_GetTokenAddress()
[PASS] test_Receive()
[PASS] test_RescueNative()
[PASS] test_RescueNative_RevertZeroAddress()
[PASS] test_RescueTokens()
[PASS] test_RescueTokens_RevertNotOwner()

Suite result: ok. 13 passed; 0 failed; 0 skipped
```

## 📦 Deployment

### Environment Setup

Create `.env` file in `contracts/`:

```
PRIVATE_KEY=your_private_key
TOKEN_GATEWAY_ADDRESS=0x...  # Hyperbridge TokenGateway address
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your_key
```

### Deploy to Testnet

```bash
cd contracts
source .env
forge script script/Deploy.s.sol --rpc-url sepolia --broadcast
```

## 🌐 Supported Networks

| Network          | Chain ID  | Type    |
| ---------------- | --------- | ------- |
| Ethereum Sepolia | 11155111  | Testnet |
| Paseo Asset Hub  | 420420422 | Testnet |

## 📚 Tech Stack

- **Smart Contracts**: Solidity 0.8.20, Foundry, Hyperbridge SDK, OpenZeppelin
- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS, shadcn/ui
- **Web3**: Wagmi, Viem, TanStack Query

## 🔗 Resources

- [Hyperbridge Documentation](https://docs.hyperbridge.network/)
- [Hyperbridge SDK](https://github.com/polytope-labs/hyperbridge-sdk)
- [Foundry Book](https://book.getfoundry.sh/)
