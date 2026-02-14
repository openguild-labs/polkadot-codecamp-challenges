import { createPublicClient, http, createWalletClient, custom, type Chain } from 'viem'
import 'viem/window';

export const polkadotHubTestnet: Chain = {
  id: 420420417,
  name: 'Polkadot Hub Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'PAS',
    symbol: 'PAS',
  },
  rpcUrls: {
    default: {
      http: ['https://eth-rpc-testnet.polkadot.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://blockscout-testnet.polkadot.io',
    },
  },
}

// Keep backward compatibility
export const passetHub = polkadotHubTestnet

const transport = http('https://eth-rpc-testnet.polkadot.io/')

export const publicClient = createPublicClient({
  chain: polkadotHubTestnet,
  transport,
})

export const getWalletClient = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
    return createWalletClient({
      chain: polkadotHubTestnet,
      transport: custom(window.ethereum),
      account: account as `0x${string}`,
    });
  }
  throw new Error('No Ethereum browser provider detected');
};
