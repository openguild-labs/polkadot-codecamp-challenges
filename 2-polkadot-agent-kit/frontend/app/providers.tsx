'use client';

import { createConfig } from '@luno-kit/react';
import { paseoAssetHub } from '@luno-kit/react/chains';
import {
  novaConnector,
  polkadotjsConnector,
  polkagateConnector,
  subwalletConnector,
  talismanConnector,
  walletConnectConnector,
} from '@luno-kit/react/connectors';
import { LunoKitProvider } from '@luno-kit/ui';
import type { LunokitTheme } from '@luno-kit/ui';

const connectors = [
  polkadotjsConnector(),
  subwalletConnector(),
  talismanConnector(),
  polkagateConnector(),
  walletConnectConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID! }),
  novaConnector({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID! }),
];

const lunoConfig = createConfig({
  appName: 'Polkadot Agent',
  chains: [paseoAssetHub],
  connectors,
  autoConnect: true,
});

const darkTheme: Partial<LunokitTheme> = {
  colors: {
    accentColor: '#e6007a',
    connectButtonBackground: '#1a1a26',
    connectButtonInnerBackground: '#22222e',
    connectButtonText: '#eaeaf0',
    modalBackground: '#12121a',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    modalBorder: 'rgba(255, 255, 255, 0.06)',
    modalText: '#eaeaf0',
    modalTextSecondary: '#8888a0',
    modalControlButtonBackgroundHover: '#22222e',
    modalControlButtonText: '#eaeaf0',
    walletSelectItemBackground: '#1a1a26',
    walletSelectItemBackgroundHover: '#22222e',
    walletSelectItemText: '#eaeaf0',
    accountActionItemBackground: '#1a1a26',
    accountActionItemBackgroundHover: '#22222e',
    accountActionItemText: '#eaeaf0',
    accountSelectItemBackground: '#1a1a26',
    accountSelectItemBackgroundHover: '#22222e',
    accountSelectItemText: '#eaeaf0',
    currentNetworkButtonBackground: '#1a1a26',
    currentNetworkButtonText: '#eaeaf0',
    networkSelectItemBackground: '#1a1a26',
    networkSelectItemBackgroundHover: '#22222e',
    networkSelectItemText: '#eaeaf0',
    assetSelectItemBackground: '#1a1a26',
    navigationButtonBackground: '#22222e',
    separatorLine: 'rgba(255, 255, 255, 0.06)',
    success: '#00c853',
    successForeground: '#ffffff',
    warning: '#ff9800',
    warningForeground: '#ffffff',
    error: '#f44336',
    errorForeground: '#ffffff',
    info: '#2196f3',
    infoForeground: '#ffffff',
    defaultIconBackground: '#22222e',
    skeleton: '#22222e',
  },
  radii: {
    connectButton: '12px',
    modal: '16px',
    modalMobile: '16px',
    walletSelectItem: '10px',
    modalControlButton: '10px',
    accountActionItem: '10px',
    accountSelectItem: '10px',
    currentNetworkButton: '10px',
    networkSelectItem: '10px',
    assetSelectItem: '10px',
  },
  shadows: {
    button: 'none',
    modal: '0 24px 48px rgba(0, 0, 0, 0.4)',
  },
  blurs: {
    modalOverlay: 'blur(8px)',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LunoKitProvider
      config={lunoConfig}
      theme={{ defaultMode: 'dark', theme: darkTheme as LunokitTheme }}
    >
      {children}
    </LunoKitProvider>
  );
}
