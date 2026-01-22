"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useMetaMask } from "./useMetaMask"

export function useTokenBalance(tokenAddress: string) {
  const { account, chainId } = useMetaMask()
  const [balance, setBalance] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [symbol, setSymbol] = useState<string>("")
  const [decimals, setDecimals] = useState<number>(18)

  const fetchBalance = async () => {
    if (!tokenAddress || !account || !window.ethereum) {
      setBalance(null)
      return
    }

    try {
      setLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          "function balanceOf(address owner) view returns (uint256)",
          "function decimals() view returns (uint8)",
          "function symbol() view returns (string)"
        ],
        provider
      )

      const [balanceRaw, tokenDecimals, tokenSymbol] = await Promise.all([
        tokenContract.balanceOf(account),
        tokenContract.decimals(),
        tokenContract.symbol()
      ])

      const formattedBalance = ethers.formatUnits(balanceRaw, tokenDecimals)
      setBalance(formattedBalance)
      setSymbol(tokenSymbol)
      setDecimals(tokenDecimals)
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      setBalance(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [tokenAddress, account, chainId])

  return { balance, loading, symbol, decimals, refetch: fetchBalance }
}
