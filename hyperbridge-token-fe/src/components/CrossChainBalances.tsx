import { useAppKitAccount } from '@reown/appkit/react'
import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem'
import { BRIDGE_DESTINATIONS } from '../config/wagmi'
import { erc20Abi } from 'viem'
import { Loader2 } from 'lucide-react'

export function CrossChainBalances({ tokenAddress }: { tokenAddress: `0x${string}` }) {
  const { address } = useAppKitAccount()

  if (!address || !tokenAddress) return null

  const userAddress = address as `0x${string}`

  return (
    <div className="cross-chain-balances" style={{
      marginTop: '20px',
      padding: '15px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h3 style={{ fontSize: '14px', marginBottom: '5px', color: '#888' }}>
        Your Balances on Destination Chains
      </h3>
      <p style={{ fontSize: '10px', color: '#666', marginBottom: '10px', wordBreak: 'break-all' }}>
        Wallet: {userAddress}
      </p>
      <div className="balance-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {BRIDGE_DESTINATIONS.map((dest) => (
          <ChainBalance
            key={dest.chain.id}
            chainId={dest.chain.id}
            chainName={dest.name}
            tokenAddress={tokenAddress}
            userAddress={userAddress}
          />
        ))}
      </div>
    </div>
  )
}

function ChainBalance({
  chainId,
  chainName,
  tokenAddress,
  userAddress
}: {
  chainId: number,
  chainName: string,
  tokenAddress: `0x${string}`,
  userAddress: `0x${string}`
}) {
  const { data: balance, isLoading, isError } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [userAddress],
    chainId: chainId,
  })

  // Format balance
  const formattedBalance = balance ? formatUnits(balance, 18) : '0'
  const displayBalance = parseFloat(formattedBalance).toFixed(4)

  return (
    <div className="chain-balance-item" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px'
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isLoading ? '#fbbf24' : isError ? '#ef4444' : '#10b981'
        }} />
        {chainName}
      </span>
      <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
        {isLoading ? (
          <Loader2 className="spinner" size={12} />
        ) : isError ? (
          <span style={{ color: '#ef4444' }}>Error</span>
        ) : (
          `${displayBalance} USD.h`
        )}
      </span>
    </div>
  )
}
