"use client"

import { useMetaMask } from "@/hooks/useWallet"

export function WalletStatus() {
  const { account, chainId } = useMetaMask()

  if (!account) {
    return <p className="text-gray-500">Wallet not connected</p>
  }

  return (
    <div className="space-y-1">
      <p>Account: {account}</p>
      <p>Chain ID: {chainId}</p>
    </div>
  )
}