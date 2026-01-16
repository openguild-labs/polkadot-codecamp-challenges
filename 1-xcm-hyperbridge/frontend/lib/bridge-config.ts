import { Address } from "viem";

// Bridge Configuration
// Update these addresses after deploying the TokenBridge contracts

export interface BridgeConfig {
  tokenBridge: Address;
  tokenGateway: Address;
  feeToken: Address; // USD fee token for relayer fees
  defaultBridgeToken: Address; // USDC - the token to bridge
  tokenFaucet?: Address; // Faucet contract for USDC
}

// Chain identifiers for Hyperbridge (StateMachine format)
export const chainIdentifiers: Record<number, string> = {
  11155111: "EVM-11155111", // Ethereum Sepolia
  97: "EVM-97", // BSC Testnet
  11155420: "EVM-11155420", // Optimism Sepolia
  420420420: "EVM-420420420", // Paseo Testnet
};

// Default relayer fee (in USD fee token decimals - 18 decimals)
// 1 USDC = 1e18 wei
export const DEFAULT_RELAYER_FEE = BigInt("1000000000000000000"); // 1 USDC

// Default timeout in seconds (24 hours)
export const DEFAULT_TIMEOUT = BigInt(86400);

// Bridge contract configurations per chain
// USDC is the bridge token, sourced from deployments.toml
export const bridgeConfigs: Record<number, BridgeConfig> = {
  // Ethereum Sepolia
  11155111: {
    tokenBridge: "0x0000000000000000000000000000000000000000",
    tokenGateway: "0xFcDa26cA021d5535C3059547390E6cCd8De7acA6",
    feeToken: "0xA801da100bF16D07F668F4A49E1f71fc54D05177", // USDC
    defaultBridgeToken: "0xA801da100bF16D07F668F4A49E1f71fc54D05177", // USDC (same as feeToken)
    tokenFaucet: "0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3",
  },
  // BSC Testnet
  97: {
    tokenBridge: "0x0000000000000000000000000000000000000000",
    tokenGateway: "0x0000000000000000000000000000000000000000",
    feeToken: "0x0000000000000000000000000000000000000000",
    defaultBridgeToken: "0x0000000000000000000000000000000000000000",
  },
  // Optimism Sepolia
  11155420: {
    tokenBridge: "0x8903331DfE3dcFd8E23bBA2D716B692f1510491e",
    tokenGateway: "0xFcDa26cA021d5535C3059547390E6cCd8De7acA6",
    feeToken: "0xA801da100bF16D07F668F4A49E1f71fc54D05177", // USDC
    defaultBridgeToken: "0xA801da100bF16D07F668F4A49E1f71fc54D05177", // USDC (same as feeToken)
    tokenFaucet: "0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3",
  },
  // Paseo Testnet
  420420420: {
    tokenBridge: "0x0000000000000000000000000000000000000000",
    tokenGateway: "0x0000000000000000000000000000000000000000",
    feeToken: "0x0000000000000000000000000000000000000000",
    defaultBridgeToken: "0x0000000000000000000000000000000000000000",
  },
};

// Get bridge config for a chain
export function getBridgeConfig(chainId: number): BridgeConfig | undefined {
  return bridgeConfigs[chainId];
}

// Get chain identifier for Hyperbridge
export function getChainIdentifier(chainId: number): string | undefined {
  return chainIdentifiers[chainId];
}

// Check if a chain is supported for bridging
export function isBridgeSupported(chainId: number): boolean {
  const config = bridgeConfigs[chainId];
  return (
    config !== undefined &&
    config.tokenBridge !== "0x0000000000000000000000000000000000000000"
  );
}
