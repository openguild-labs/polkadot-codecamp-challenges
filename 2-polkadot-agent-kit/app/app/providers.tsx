'use client';

import { createConfig } from '@luno-kit/react';
import { kusama, polkadot, westend } from '@luno-kit/react/chains';
import {
  novaConnector,
  polkadotjsConnector,
  polkagateConnector,
  subwalletConnector,
  talismanConnector,
  walletConnectConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react';

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID! }),
  novaConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID! }),
];

const lunoConfig = createConfig({
  appName: 'LunoKit Next.js App Router Example',
  chains: [polkadot, kusama, westend],
  connectors,
  autoConnect: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <LunoKitProvider config={lunoConfig}>{children}</LunoKitProvider>;
    </QueryClientProvider>
  )
}