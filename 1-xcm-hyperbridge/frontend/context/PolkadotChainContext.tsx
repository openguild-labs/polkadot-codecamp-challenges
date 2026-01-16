import { createContext, useContext } from "react";

// Simplified context for EVM-only bridging
// Polkadot API integration temporarily disabled

export const polkadotChainCtx = createContext<{
  client: unknown;
  api: unknown;
} | null>(null);

export const usePolkadotChain = () => useContext(polkadotChainCtx);

export const PolkadotChainProvider = polkadotChainCtx.Provider;
