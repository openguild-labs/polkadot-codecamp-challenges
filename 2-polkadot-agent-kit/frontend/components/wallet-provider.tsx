"use client"

import { createConfig } from "@luno-kit/react"
import { polkadot, kusama, westend, paseo, polkadotAssetHub } from "@luno-kit/react/chains"
import {
  polkadotjsConnector,
  subwalletConnector,
  talismanConnector,
  walletConnectConnector,
} from "@luno-kit/react/connectors"
import { LunoKitProvider } from "@luno-kit/ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const config = createConfig({
  appName: "XCM Swap Agent",
  chains: [polkadot, kusama, westend, paseo, polkadotAssetHub],
  connectors: [
    polkadotjsConnector(),
    subwalletConnector(),
    talismanConnector(),
    walletConnectConnector({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
    }),
  ],
  autoConnect: true,
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={config}>
        {children}
      </LunoKitProvider>
    </QueryClientProvider>
  )
}
