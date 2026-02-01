'use client';

import { createConfig } from '@luno-kit/react';
import { kusama, polkadot, westend } from '@luno-kit/react/chains';
import {
  polkadotjsConnector,
  polkagateConnector,
  subwalletConnector,
  talismanConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
];

const lunoConfig = createConfig({
  appName: 'LunoKit Next.js App Router Example',
  chains: [polkadot, kusama, westend],
  connectors,
  autoConnect: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LunoKitProvider config={lunoConfig}>{children}</LunoKitProvider>;
}
