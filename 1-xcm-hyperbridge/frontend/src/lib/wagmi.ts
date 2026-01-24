import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// Custom chain for Paseo Asset Hub
export const paseoAssetHub = {
  id: 420420422,
  name: 'Paseo Asset Hub',
  nativeCurrency: {
    decimals: 18,
    name: 'PAS',
    symbol: 'PAS',
  },
  rpcUrls: {
    default: { http: ['https://testnet-passet-hub-eth-rpc.polkadot.io'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://blockscout-passet-hub.parity-testnet.parity.io',
    },
  },
  testnet: true,
} as const

export const config = createConfig({
  chains: [sepolia, paseoAssetHub],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(),
    [paseoAssetHub.id]: http(),
  },
})

// Supported chains for bridging
export const SUPPORTED_CHAINS = [
  {
    id: sepolia.id,
    name: 'Ethereum Sepolia',
    symbol: 'ETH',
    icon: '⟠',
  },
  {
    id: paseoAssetHub.id,
    name: 'Paseo Asset Hub',
    symbol: 'PAS',
    icon: '◉',
  },
]

// Token Gateway addresses (deployed MockTokenGateway)
export const TOKEN_GATEWAY_ADDRESSES: Record<number, `0x${string}`> = {
  [sepolia.id]: '0x0000000000000000000000000000000000000000', // Not deployed
  [paseoAssetHub.id]: '0x5D9eaE096BF641258Be58677885F303B4Ff96468',
}

// TokenBridge contract addresses (deployed on Paseo Asset Hub)
export const TOKEN_BRIDGE_ADDRESSES: Record<number, `0x${string}`> = {
  [sepolia.id]: '0x0000000000000000000000000000000000000000', // Not deployed
  [paseoAssetHub.id]: '0xcBc807e1dd9314415b7cbAf1d3B843136bb37EC9',
}

// TestToken addresses per chain
export const TEST_TOKEN_ADDRESSES: Record<number, `0x${string}` | null> = {
  [sepolia.id]: null, // Not deployed on Sepolia
  [paseoAssetHub.id]: '0x136b7Aa6b01E66e035DCDD9868C3016116b69cA5',
}

// TestToken address (deployed on Paseo Asset Hub) - for backward compatibility
export const TEST_TOKEN_ADDRESS: `0x${string}` = '0x136b7Aa6b01E66e035DCDD9868C3016116b69cA5'

// Asset ID for TEST token
export const TEST_ASSET_ID: `0x${string}` = '0x852daa74cc3c31fe64542bb9b8764cfb91cc30f9acf9389071ffb44a9eefde46'
