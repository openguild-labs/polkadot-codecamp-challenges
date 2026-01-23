import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { useBalance } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'

export function ConnectWallet() {
  const { open } = useAppKit()
  const { address, isConnected } = useAppKitAccount()
  const { data: balance } = useBalance({
    address: address as `0x${string}` | undefined,
    chainId: optimismSepolia.id
  })

  if (isConnected && address) {
    return (
      <div className="wallet-connected">
        <div className="wallet-info">
          <div className="wallet-address">
            <span className="label">Connected:</span>
            <span className="address">{address.slice(0, 6)}...{address.slice(-4)}</span>
          </div>
          {balance && (
            <div className="wallet-balance">
              <span className="balance">{parseFloat(balance.formatted).toFixed(4)} {balance.symbol}</span>
            </div>
          )}
        </div>
        <button className="btn btn-disconnect" onClick={() => open()}>
          Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-connect">
      <button
        className="btn btn-primary"
        onClick={() => open()}
      >
        Connect Wallet
      </button>
    </div>
  )
}
