import type { Metadata } from 'next';
import './globals.css';
import '@luno-kit/ui/styles.css';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: 'Polkadot XCM Swap Agent',
  description: 'AI-powered cross-chain swap on Polkadot with Hydration DEX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
