# Hyperbridge Token Bridge

A cross-chain token bridge implementation using Hyperbridge's TokenGateway infrastructure, enabling seamless token transfers across multiple blockchain networks.

## Overview

This project implements a token bridging solution that leverages Hyperbridge's cross-chain messaging protocol to transfer tokens between different EVM-compatible chains. The implementation includes smart contracts, deployment scripts, and comprehensive testing.

## Architecture

### Core Components

#### 1. **BridgeableToken.sol**
An ERC20 token that extends Hyperbridge's `HyperFungibleToken` standard, making it natively compatible with cross-chain transfers.

**Key Features:**
- Inherits from `HyperFungibleToken`
- Configurable gateway address
- Standard ERC20 functionality with cross-chain capabilities

**Implementation:**
```solidity
contract BridgeableToken is HyperFungibleToken {
    address private immutable _gateway;
    
    constructor(
        string memory name,
        string memory symbol,
        address gatewayAddress
    ) HyperFungibleToken(name, symbol) {
        _gateway = gatewayAddress;
    }
    
    function gateway() public view override returns (address) {
        return _gateway;
    }
}
```

#### 2. **TokenBridge.sol**
The main bridge contract that coordinates token transfers between chains using Hyperbridge's TokenGateway.

**Key Features:**
- Integrates with Hyperbridge's `ITokenGateway`
- Handles token approvals and transfers
- Manages cross-chain teleport parameters
- 24-hour timeout for cross-chain operations

**Core Function:**
```solidity
function bridgeTokens(
    address token,
    uint256 amount,
    address recipient,
    bytes memory destChain
) external payable
```

**Parameters:**
- `token`: Address of the token to bridge
- `amount`: Amount to transfer (in token's smallest unit)
- `recipient`: Destination address on target chain
- `destChain`: Identifier of the destination chain (e.g., "sepolia", "optimism-sepolia")

**Process Flow:**
1. Validates token address (non-zero)
2. Transfers tokens from user to bridge contract
3. Approves TokenGateway to spend tokens
4. Approves fee token spending
5. Constructs `TeleportParams` with transfer details
6. Calls `tokenGateway.teleport()` to initiate cross-chain transfer

#### 3. **MockToken.sol**
A simple ERC20 token used for fee payments and testing purposes.

**Key Features:**
- Mintable by owner
- Burnable by owner
- Standard ERC20 implementation

## How It Works

### Cross-Chain Token Transfer Flow

```
User (Chain A)
    ↓
    1. Approve tokens
    ↓
TokenBridge (Chain A)
    ↓
    2. Transfer tokens to bridge
    3. Approve gateway
    4. Call teleport()
    ↓
TokenGateway (Chain A)
    ↓
    5. Lock tokens
    6. Create cross-chain message
    ↓
Hyperbridge Network
    ↓
    7. Verify and relay message
    ↓
TokenGateway (Chain B)
    ↓
    8. Process message
    9. Mint/unlock tokens
    ↓
Recipient (Chain B)
```

### Key Concepts

**Teleport Parameters:**
- `amount`: Token amount to bridge
- `assetId`: Token contract address (as bytes32)
- `to`: Recipient address (as bytes32)
- `dest`: Destination chain identifier
- `timeout`: Unix timestamp for operation expiry
- `nativeCost`: Native token (ETH) for gas on destination
- `relayerFee`: Fee for message relayers (set to 0)
- `redeem`: Whether to redeem wrapped tokens (set to false)

## Smart Contracts

### Deployment Addresses

Addresses are stored in `deployments.toml` and `bridge.toml` after deployment:

- **BridgeableToken**: Cross-chain compatible ERC20
- **FeeToken**: Token used for fee payments
- **TokenBridge**: Main bridge orchestrator
- **TokenGateway**: Hyperbridge's gateway (pre-deployed)

## Configuration Files

### `deployments.toml`
Stores deployment information for each chain:
```toml
[sepolia]
endpoint_url = "https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

[sepolia.address]
token_gateway = "0x..."  # Pre-deployed by Hyperbridge
bridgeable_token = "0x..."  # Deployed by you
fee_token = "0x..."  # Deployed by you
token_bridge = "0x..."  # Deployed by you
```

### `bridge.toml`
Stores bridge operation parameters:
```toml
[sepolia.bridge_params]
amount = "1000000000000000000000"  # 1000 tokens (18 decimals)
recipient = "0x..."  # Destination address
dest_chain = "optimism-sepolia"  # Target chain
native_cost = "1000000000000000"  # 0.001 ETH
```

## Scripts

### Deployment Script (`Deployment.s.sol`)
Deploys all contracts on a specified chain:
1. Loads TokenGateway address from config
2. Deploys BridgeableToken
3. Deploys MockToken (fee token)
4. Deploys TokenBridge
5. Saves deployment addresses back to config

### Bridge Script (`BridgeToken.s.sol`)
Executes a token bridge operation:
1. Loads contract addresses and parameters from config
2. Checks token balances
3. Approves token spending
4. Mints fee tokens if needed (testing)
5. Calls `bridgeTokens()` to initiate transfer
6. Logs transaction details

## Testing

Comprehensive test suite in `TokenBridge.t.sol` covers:

### Unit Tests
- ✅ Constructor initialization
- ✅ Successful token bridging
- ✅ Zero address validation
- ✅ Insufficient allowance handling
- ✅ Insufficient balance handling
- ✅ Different amounts, recipients, and chains
- ✅ Teleport parameter correctness
- ✅ Edge cases (zero amount, max amount)
- ✅ Multiple consecutive bridges

### Fuzz Tests
- ✅ Random amounts and recipients
- ✅ Boundary conditions

**Run Tests:**
```bash
forge test -vvv
```

**Run Specific Test:**
```bash
forge test --match-test testBridgeTokensSuccess -vvv
```

**Test Coverage:**
```bash
forge coverage
```

## Deployment & Usage

### Prerequisites
1. Install Foundry
2. Configure RPC endpoints in `deployments.toml`
3. Import private key securely:
```bash
cast wallet import defaultKey --interactive
```

### Deploy Contracts

**On Sepolia:**
```bash
forge script script/Deployment.s.sol:DeploymentScript \
  --rpc-url sepolia \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  -vvvvv
```

**On Other Chains:**
Repeat for `bsc-testnet`, `optimism-sepolia`, etc.

### Bridge Tokens

1. **Mint Test Tokens (optional):**
```bash
cast send <BRIDGEABLE_TOKEN_ADDRESS> \
  "mint(address,uint256)" \
  <YOUR_ADDRESS> \
  1000000000000000000000 \
  --rpc-url sepolia \
  --account defaultKey
```

2. **Update `bridge.toml`** with bridge parameters

3. **Execute Bridge:**
```bash
forge script script/BridgeToken.s.sol:BridgeTokenScript \
  --rpc-url sepolia \
  --account defaultKey \
  --sender <YOUR_ADDRESS> \
  --broadcast \
  -vvvvv
```

### Verify Transaction

**Check Balance on Destination:**
```bash
cast call <BRIDGEABLE_TOKEN_ADDRESS> \
  "balanceOf(address)(uint256)" \
  <RECIPIENT_ADDRESS> \
  --rpc-url <DESTINATION_RPC>
```

## Security Considerations

1. **Private Key Management**: Uses `cast wallet` for encrypted key storage
2. **Token Approvals**: Bridge only gets approved for specific amounts
3. **Address Validation**: Zero address checks prevent invalid transfers
4. **Timeout Protection**: 24-hour timeout prevents stuck transactions
5. **Testing**: Comprehensive test coverage for edge cases

## Supported Chains

Currently configured for:
- Ethereum Sepolia (testnet)
- BSC Testnet
- Optimism Sepolia

Can be extended to any EVM chain supported by Hyperbridge.

## Project Structure

```
hyperbridge-token-bridge/
├── src/
│   ├── BridgeableToken.sol    # Cross-chain ERC20 token
│   ├── MockToken.sol           # Fee token for testing
│   └── TokenBridge.sol         # Main bridge logic
├── script/
│   ├── Base.s.sol              # Base script utilities
│   ├── Deployment.s.sol        # Deployment script
│   └── BridgeToken.s.sol       # Bridge execution script
├── test/
│   └── TokenBridge.t.sol       # Comprehensive test suite
├── deployments.toml            # Deployment addresses
└── bridge.toml                 # Bridge parameters
```

## References

- [Hyperbridge Documentation](https://docs.hyperbridge.network/)
- [TokenGateway Interface](https://github.com/polytope-labs/hyperbridge)
- [Deployment Guide](./DEPLOYMENT.md)
- [Test Plan](./TEST_PLAN.md)

## License

MIT License - See individual contract files for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass: `forge test`
5. Submit a pull request

## Troubleshooting

**Issue: "Token address cannot be zero"**
- Ensure you're providing a valid token address

**Issue: "Transfer failed"**
- Check token balance: `cast call <TOKEN> "balanceOf(address)" <YOUR_ADDR>`
- Verify token approval: `cast call <TOKEN> "allowance(address,address)" <YOUR_ADDR> <BRIDGE>`

**Issue: "Insufficient token balance"**
- Mint more tokens or reduce bridge amount

**Issue: Transaction times out**
- Check destination chain status
- Verify TokenGateway is operational
- Monitor Hyperbridge network status

## Contact & Support

For issues and questions:
- Open an issue in the repository
- Check Hyperbridge documentation
- Join Hyperbridge community channels
