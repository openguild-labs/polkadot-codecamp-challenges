# Foundry Setup for Scaffold-DOT

This directory contains the Foundry configuration for deploying contracts using Forge instead of Hardhat.

## Quick Start

### Compile Contracts
```bash
cd packages/hardhat/foundry
forge build
```

Or from root:
```bash
yarn foundry:build
```

### Deploy Contracts

**⚠️ Prerequisites: Start local node and RPC server first!**

**Terminal 1**: Start substrate node
```bash
yarn chain
```

**Terminal 2**: Start eth-rpc server
```bash
yarn rpc
```

**Terminal 3**: Deploy contracts (after nodes are running)
```bash
# From root directory
yarn deploy:foundry

# Or directly
cd packages/hardhat/foundry
forge script script/DeployAll.s.sol:DeployAll \
  --rpc-url http://127.0.0.1:8545 \
  --broadcast \
  --private-key 0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133
```

**Troubleshooting**: If you see "connection closed" errors, verify:
1. `yarn chain` is running (substrate node)
2. `yarn rpc` is running (eth-rpc server on port 8545)
3. Both terminals show no errors

### Run Tests
```bash
cd packages/hardhat/foundry
forge test
```

Or from root:
```bash
yarn foundry:test
```

## Configuration

- **foundry.toml**: Foundry configuration file
- **src**: Points to `../contracts/` (shared with Hardhat)
- **script/**: Deployment scripts (Solidity-based)
- **lib/**: Dependencies (OpenZeppelin, forge-std)

## Deployment Scripts

- `DeployERC20.s.sol`: Deploys ERC20Token
- `DeployERC721.s.sol`: Deploys ERC721Token
- `DeployAll.s.sol`: Deploys all contracts (ERC20, ERC721, YourContract)

## Environment Variables

You can set these environment variables to customize deployment:

- `ERC20_NAME`: Token name (default: "MyToken")
- `ERC20_SYMBOL`: Token symbol (default: "MTK")
- `ERC20_INITIAL_SUPPLY`: Initial supply (default: 1000000 * 10^18)
- `ERC721_NAME`: Collection name (default: "MyNFT")
- `ERC721_SYMBOL`: Collection symbol (default: "MNFT")
- `CONTRACT_OWNER`: Owner address for YourContract
- `RPC_URL`: RPC endpoint (default: http://127.0.0.1:8545)
- `PRIVATE_KEY`: Private key for deployment

## Advantages of Foundry

- ⚡ **Faster compilation** - Rust-based compiler
- 🧪 **Better testing** - Built-in fuzzing and invariant testing
- 📊 **Gas optimization** - Built-in gas reporting
- 🎯 **Direct Solidity** - Write tests and scripts in Solidity

## Integration with Scaffold-DOT

The deployment script (`packages/hardhat/scripts/deployFoundry.ts`) automatically:
1. Deploys contracts using Foundry
2. Extracts deployed addresses from broadcast logs
3. Generates TypeScript ABIs for the frontend
4. Updates `packages/nextjs/contracts/deployedContracts.ts`

This ensures the frontend can still use the contracts even though we're using Foundry for deployment.
