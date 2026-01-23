import { ChainConfigService, IndexerClient, SubstrateChain, createQueryClient, getChain } from '@hyperbridge/sdk'

// Create GraphQL client
const queryClient = createQueryClient({
  url: 'https://gargantua.indexer.polytope.technology/'
})

const configService = new ChainConfigService()

// Initialize chain abstractions
const sourceChain = await getChain({
  consensusStateId: 'BSC0',
  rpcUrl: "https://bsc-testnet.drpc.org",
  stateMachineId: 'EVM-97',
  host: configService.getHostAddress('EVM-97')
})

const destChain = await getChain({
  consensusStateId: 'ETH0',
  rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/WddzdzI2o9S3COdT73d5w6AIogbKq4X-",
  stateMachineId: 'EVM-11155111',
  host: configService.getHostAddress('EVM-11155111')
})

const bifrostChain = new SubstrateChain({  
  stateMachineId: "KUSAMA-2030", 
  wsUrl: "wss://bifrost-rpc.dwellir.com",  
  hasher: "Blake2",  
  consensusStateId: "PAS0"  
})  

const hyperbridgeChain = await getChain({
  consensusStateId: 'PAS0',
  stateMachineId: 'KUSAMA-4009',
  wsUrl: "wss://hyperbridge-paseo-rpc.blockops.network/",
  hasher: 'Keccak' as const
})

// Create IndexerClient
export const indexerClient = new IndexerClient({
  source: sourceChain,
  dest: destChain,
  hyperbridge: hyperbridgeChain,
  queryClient,
  pollInterval: 20000 // Poll every 20 seconds
})