# Hyperbridge Token Bridge

Cross-chain token bridge using the Hyperbridge SDK. Bridges ERC20 tokens between **BSC Testnet** and **ETH Sepolia** via Hyperbridge's `TokenGateway.teleport()`.

## Architecture

- **TokenBridge.sol** - Wrapper contract that transfers tokens from the user, approves the TokenGateway, builds `TeleportParams`, and calls `gateway.teleport()`.
- **Frontend** - React + Vite app with RainbowKit wallet connection, chain selector, and bridge form.

## Contracts

| Contract | Description |
|----------|-------------|
| `src/TokenBridge.sol` | Main bridge contract wrapping TokenGateway |
| `script/DeployTokenBridge.s.sol` | Deployment script for testnet |
| `script/BridgeTokens.s.sol` | Script to execute a bridge transaction |
| `test/TokenBridge.t.sol` | Unit tests with mock TokenGateway |

## Testnet Addresses

| Network | TokenGateway | FeeToken |
|---------|-------------|----------|
| BSC Testnet (97) | `0xFcDa26cA021d5535C3059547390E6cCd8De7acA6` | `0xA801da100bF16D07F668F4A49E1f71fc54D05177` |
| ETH Sepolia (11155111) | `0xFcDa26cA021d5535C3059547390E6cCd8De7acA6` | `0xA801da100bF16D07F668F4A49E1f71fc54D05177` |

## Setup

```bash
# Initialize submodules
git submodule update --init --recursive

# Build contracts
cd hyperbridge-token-bridge
forge build

# Run tests
forge test -v

# Deploy (set PRIVATE_KEY env var)
forge script script/DeployTokenBridge.s.sol --rpc-url <RPC_URL> --broadcast --private-key $PRIVATE_KEY
```

## Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173 to use the bridge UI.

## Tests

7 unit tests covering:
- Constructor initialization
- Bridge with native payment
- Bridge with fee token payment
- Token transfer verification
- Event emission
- Destination chain encoding
- Revert on missing approval
