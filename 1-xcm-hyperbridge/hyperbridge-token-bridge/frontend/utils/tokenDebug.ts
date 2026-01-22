"use client"

import { ethers } from "ethers"

export async function debugTokenInfo(tokenAddress: string) {
  if (!window.ethereum) {
    console.error("No ethereum provider found")
    return
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const tokenContract = new ethers.Contract(
      tokenAddress,
      [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint256)"
      ],
      provider
    )

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals(),
      tokenContract.totalSupply()
    ])

    const accounts = await provider.send("eth_requestAccounts", [])
    const userAddress = accounts[0]
    const balance = await tokenContract.balanceOf(userAddress)

    console.log("=== TOKEN DEBUG INFO ===")
    console.log("Address:", tokenAddress)
    console.log("Name:", name)
    console.log("Symbol:", symbol)
    console.log("Decimals:", decimals)
    console.log("Total Supply:", ethers.formatUnits(totalSupply, decimals))
    console.log("Your Balance:", ethers.formatUnits(balance, decimals))
    console.log("Your Balance (raw):", balance.toString())
    console.log("========================")

    return {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: ethers.formatUnits(totalSupply, decimals),
      balance: ethers.formatUnits(balance, decimals),
      balanceRaw: balance.toString()
    }
  } catch (error) {
    console.error("Failed to fetch token info:", error)
    throw error
  }
}
