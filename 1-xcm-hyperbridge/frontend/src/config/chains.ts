import { defineChain } from "viem";

export const bscTestnet = defineChain({
  id: 97,
  name: "BSC Testnet",
  nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545"] },
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
});

export const sepolia = defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://ethereum-sepolia-rpc.publicnode.com"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
  },
  testnet: true,
});

export const SUPPORTED_CHAINS = [bscTestnet, sepolia] as const;

export const CONTRACT_ADDRESSES = {
  TOKEN_GATEWAY: "0xFcDa26cA021d5535C3059547390E6cCd8De7acA6" as const,
  FEE_TOKEN: "0xA801da100bF16D07F668F4A49E1f71fc54D05177" as const,
  TOKEN_FAUCET: "0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3" as const,
};

export type SupportedChainId = 97 | 11155111;

export const CHAIN_NAMES: Record<SupportedChainId, string> = {
  97: "BSC Testnet",
  11155111: "Sepolia",
};
