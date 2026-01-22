"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!")

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      const chain = await window.ethereum.request({ method: "eth_chainId" })
      setChainId(chain)
    } catch (err) {
      console.error(err)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setChainId(null)
  }

  const switchChain = async (targetChainIdHex: string) => {
    if (!window.ethereum) return
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainIdHex }],
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => setAccount(accounts[0] || null)
    const handleChainChanged = (chainId: string) => setChainId(chainId)

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      window.ethereum.removeListener("chainChanged", handleChainChanged)
    }
  }, [])

  return { account, chainId, connectWallet, disconnectWallet, switchChain }
}
