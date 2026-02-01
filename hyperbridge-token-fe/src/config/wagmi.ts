import { http } from 'wagmi'
import { optimismSepolia, sepolia, baseSepolia, arbitrumSepolia } from 'wagmi/chains'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// ============================================
// Hyperbridge Gargantua V3 (Paseo) Contract Addresses
// ============================================

export const HYPERBRIDGE_CONTRACTS = {
  TOKEN_GATEWAY: '0xFcDa26cA021d5535C3059547390E6cCd8De7acA6' as const,
  FEE_TOKEN_USDH: '0xA801da100bF16D07F668F4A49E1f71fc54D05177' as const,
  TOKEN_FAUCET: '0x1794aB22388303ce9Cb798bE966eeEBeFe59C3a3' as const,
}

export const CONTRACT_ADDRESSES = {
  TOKEN_BRIDGE: '0xa74f97D26a3783C94c8a925C3c2598cA80C8C579' as const,
  ...HYPERBRIDGE_CONTRACTS,
}

export const STATE_MACHINES = {
  ETHEREUM_SEPOLIA: 'EVM-11155111',
  OPTIMISM_SEPOLIA: 'EVM-11155420',
  BASE_SEPOLIA: 'EVM-84532',
  ARBITRUM_SEPOLIA: 'EVM-421614',
}

export const CHAIN_IDENTIFIERS: Record<number, `0x${string}`> = {
  [sepolia.id]: '0x45564d2d3131313535313131' as const,
  [optimismSepolia.id]: '0x45564d2d3131313535343230' as const,
  [baseSepolia.id]: '0x45564d2d3834353332' as const,
  [arbitrumSepolia.id]: '0x45564d2d343231363134' as const,
}

export const SUPPORTED_CHAINS = {
  source: optimismSepolia,
  destination: sepolia,
}

export const BRIDGE_DESTINATIONS = [
  { chain: sepolia, name: 'Ethereum Sepolia', stateMachine: STATE_MACHINES.ETHEREUM_SEPOLIA },
  { chain: baseSepolia, name: 'Base Sepolia', stateMachine: STATE_MACHINES.BASE_SEPOLIA },
  { chain: arbitrumSepolia, name: 'Arbitrum Sepolia', stateMachine: STATE_MACHINES.ARBITRUM_SEPOLIA },
]

// Reown Project ID
export const projectId = '12b780f19f13be85ec7aa4d90b03a253'

// Chains
export const chains = [optimismSepolia, sepolia, baseSepolia, arbitrumSepolia] as const

// Metadata
export const metadata = {
  name: 'Hyperbridge Token Bridge',
  description: 'Bridge tokens across chains using Hyperbridge',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create Wagmi Adapter
export const wagmiAdapter = new WagmiAdapter({
  networks: chains,
  projectId,
  ssr: false,
})

// Export wagmi config
export const config = wagmiAdapter.wagmiConfig

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
