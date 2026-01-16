"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  phantomWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { sepolia, bscTestnet, optimismSepolia } from "wagmi/chains";
import { defineChain, type Chain } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http, createConfig } from "wagmi";
import { Provider as JotaiProvider } from "jotai";

// Paseo Testnet chain definition (Polkadot testnet)
export const paseoTestnet = defineChain({
  id: 420420420,
  name: "Paseo Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Paseo",
    symbol: "PAS",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-passet-hub-eth-rpc.polkadot.io"],
      webSocket: ["wss://passet-hub-paseo.ibp.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout-passet-hub.parity-testnet.parity.io/",
    },
  },
  testnet: true,
});

// Bridge supported chains configuration
export const bridgeChains = {
  sepolia,
  bscTestnet,
  optimismSepolia,
  paseoTestnet,
} as const;

// Network pairs for bridge (source -> destination)
export type BridgeNetworkPair = {
  source: Chain;
  destination: Chain;
  name: string;
};

export const bridgeNetworkPairs: BridgeNetworkPair[] = [
  { source: paseoTestnet, destination: sepolia, name: "Paseo → ETH Sepolia" },
  {
    source: bscTestnet,
    destination: sepolia,
    name: "BSC Testnet → ETH Sepolia",
  },
  {
    source: optimismSepolia,
    destination: sepolia,
    name: "Optimism Sepolia → ETH Sepolia",
  },
];

export const localConfig = createConfig({
  chains: [sepolia, bscTestnet, optimismSepolia, paseoTestnet],
  transports: {
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [optimismSepolia.id]: http(),
    [paseoTestnet.id]: http(),
  },
  ssr: true,
});

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: "Hyperbridge",
  projectId: "ddf8cf3ee0013535c3760d4c79c9c8b9",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [phantomWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [sepolia, bscTestnet, optimismSepolia, paseoTestnet],
  transports: {
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [optimismSepolia.id]: http(),
    [paseoTestnet.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </JotaiProvider>
  );
}
