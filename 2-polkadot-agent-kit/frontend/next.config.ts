import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@polkadot-agent-kit/sdk',
    '@polkadot-agent-kit/llm',
    '@luno-kit/react',
    '@luno-kit/ui',
    '@polkadot/api',
    '@polkadot/util',
    '@polkadot/util-crypto',
    '@polkadot/wasm-crypto',
    '@polkadot/keyring',
    '@polkadot/rpc-provider',
    '@polkadot/types',
    '@polkadot/types-codec',
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  }
};

export default nextConfig;
