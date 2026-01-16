# Deployment Guide

This guide covers deployment and interaction with the Hyperbridge Token Bridge contracts.

## Security: Managing Private Keys

We use `cast wallet` to securely manage private keys instead of `.env` files.

### Import Your Private Key

```bash
cast wallet import defaultKey --interactive
```

You'll be prompted to enter your private key and set a password. The key will be encrypted and stored securely.

## Prerequisites

1. **Configure Token Gateway Addresses**: Update `deployments.toml` with the TokenGateway addresses for each chain:

```toml
[sepolia]
endpoint_url = "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

[sepolia.address]
token_gateway = "0xYourTokenGatewayAddress"

[bsc-testnet]
endpoint_url = "https://data-seed-prebsc-1-s1.binance.org:8545"

[bsc-testnet.address]
token_gateway = "0xYourTokenGatewayAddress"

[optimism-sepolia]
endpoint_url = "https://sepolia.optimism.io"

[optimism-sepolia.address]
token_gateway = "0xYourTokenGatewayAddress"
```

2. **Get Testnet Funds**: Ensure your wallet has native tokens for gas fees on each chain.

## Step 1: Deploy Contracts

Deploy the contracts on each chain where you want to enable bridging.

### Deploy on Sepolia

```bash
ETH_FROM=0x5984A519fFfE5aFc5e8bBA233DCc01AC774f4301 forge script script/Deployment.s.sol:DeploymentScript \
  --rpc-url https://1rpc.io/sepolia \
  --account defaultKey \
  --sender 0x5984A519fFfE5aFc5e8bBA233DCc01AC774f4301 \
  --broadcast \
  --verifier etherscan \
  --etherscan-api-key <API_KEY> \
  -vvvvv
```

### Deploy on BSC Testnet

```bash
ETH_FROM=0x5984A519fFfE5aFc5e8bBA233DCc01AC774f4301 forge script script/Deployment.s.sol:DeploymentScript \
  --rpc-url bsc-testnet \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  --verifier etherscan \
  --etherscan-api-key <API_KEY> \
  -vvvvv
```

### Deploy on Optimism Sepolia

```bash
ETH_FROM=0x5984A519fFfE5aFc5e8bBA233DCc01AC774f4301 forge script script/Deployment.s.sol:DeploymentScript \
  --rpc-url https://sepolia.optimism.io \
  --account defaultKey \
  --sender 0x5984A519fFfE5aFc5e8bBA233DCc01AC774f4301 \
  --broadcast \
  --verifier etherscan \
  --etherscan-api-key <API_KEY> \
  -vvvvv
```

**Note**: Deployment addresses will be automatically saved to `deployments.toml` after each deployment.

## Step 2: Configure Bridge Parameters

After deployment, configure the bridge parameters in `bridge.toml`:

```toml
[sepolia]
endpoint_url = "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

[sepolia.address]
token_gateway = "0xYourTokenGatewayAddress"
bridgeable_token = "0xDeployedBridgeableTokenAddress"
fee_token = "0xDeployedFeeTokenAddress"
token_bridge = "0xDeployedTokenBridgeAddress"

[sepolia.bridge_params]
amount = "1000000000000000000000"  # 1000 tokens (with 18 decimals)
recipient = "0xRecipientAddressOnDestinationChain"
dest_chain = "optimism-sepolia"  # Destination chain name
native_cost = "1000000000000000"  # 0.001 ETH (in wei) for gas
```

Repeat for all chains (`bsc-testnet`, `optimism-sepolia`, etc.).

## Step 3: Mint Test Tokens (Optional)

Before bridging, you may want to mint some test tokens to your address:

```bash
# Mint BridgeableTokens
cast send <BRIDGEABLE_TOKEN_ADDRESS> \
  "mint(address,uint256)" \
  <YOUR_ADDRESS> \
  1000000000000000000000 \
  --rpc-url sepolia \
  --account defaultKey

# Mint FeeTokens
cast send <FEE_TOKEN_ADDRESS> \
  "mint(address,uint256)" \
  <YOUR_ADDRESS> \
  1000000000000000000000 \
  --rpc-url sepolia \
  --account defaultKey
```

## Step 4: Bridge Tokens

Execute the bridge transaction using the configured parameters in `bridge.toml`.

### Bridge from Sepolia to Optimism Sepolia

```bash
forge script script/BridgeToken.s.sol:BridgeTokenScript \
  --rpc-url sepolia \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  -vvvvv
```

### Bridge from BSC Testnet to Sepolia

First, update `bridge.toml` to set the correct `dest_chain` for BSC Testnet, then:

```bash
forge script script/BridgeToken.s.sol:BridgeTokenScript \
  --rpc-url bsc-testnet \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  -vvvvv
```

### Bridge from Optimism Sepolia to Sepolia

```bash
forge script script/BridgeToken.s.sol:BridgeTokenScript \
  --rpc-url optimism-sepolia \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  -vvvvv
```

## Step 5: Verify Bridge Transaction

After bridging, you can verify:

1. **Check token balance on destination chain**:
```bash
cast call <BRIDGEABLE_TOKEN_ADDRESS> \
  "balanceOf(address)(uint256)" \
  <RECIPIENT_ADDRESS> \
  --rpc-url <DESTINATION_RPC_URL>
```

2. **Monitor transaction status** through the Hyperbridge explorer or chain explorer.

## Configuration Files

- **`deployments.toml`**: Stores deployment addresses (auto-updated by deployment script)
- **`bridge.toml`**: Stores bridge parameters and deployed contract addresses for bridging operations

## Troubleshooting

### Insufficient Balance Error
- Ensure you have minted enough tokens
- Check your token balance: `cast call <TOKEN_ADDRESS> "balanceOf(address)(uint256)" <YOUR_ADDRESS> --rpc-url <RPC_URL>`

### Transaction Reverts
- Verify TokenGateway address is correct
- Ensure you have enough native tokens for gas
- Check that bridge parameters in `bridge.toml` are valid

### Script Fails to Load Config
- Verify TOML file paths are correct
- Ensure addresses are properly formatted with `0x` prefix
- Check that all required fields are populated