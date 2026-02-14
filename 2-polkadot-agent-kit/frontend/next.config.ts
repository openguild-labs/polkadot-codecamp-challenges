import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@polkadot-agent-kit/sdk',
    '@polkadot-agent-kit/llm',
    '@polkadot-agent-kit/core',
    '@polkadot-agent-kit/common',
    '@paraspell/xcm-router',
    '@paraspell/sdk-pjs',
    '@galacticcouncil/sdk',
    '@galacticcouncil/api-augment',
    '@polkadot/api',
    '@polkadot/util',
    '@polkadot/util-crypto',
    '@polkadot/keyring',
    'langchain',
    '@langchain/openai',
    '@langchain/core',
  ],
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
