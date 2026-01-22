"use client"

import { useState } from "react"
import { ethers } from "ethers"

export function FundBridge() {
  const [amount, setAmount] = useState("100")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const BRIDGE_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_BRIDGE_ADDRESS || "0x605C9012234fa13BeE444a83b804881e48F014d9"
  const USDH_ADDRESS = "0xA801da100bF16D07F668F4A49E1f71fc54D05177"

  const fundBridge = async () => {
    if (!window.ethereum) {
      setResult("❌ MetaMask not found")
      return
    }

    try {
      setLoading(true)
      setResult("🔄 Processing...")

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Get USD.h contract
      const usdhContract = new ethers.Contract(
        USDH_ADDRESS,
        [
          "function transfer(address to, uint256 amount) returns (bool)",
          "function balanceOf(address) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ],
        signer
      )

      const decimals = await usdhContract.decimals()
      const amountParsed = ethers.parseUnits(amount, decimals)
      
      // Check balance
      const balance = await usdhContract.balanceOf(await signer.getAddress())
      if (balance < amountParsed) {
        setResult(`❌ Insufficient balance. You have ${ethers.formatUnits(balance, decimals)} USD.h`)
        setLoading(false)
        return
      }

      // Transfer to bridge
      console.log(`Transferring ${amount} USD.h to bridge...`)
      const tx = await usdhContract.transfer(BRIDGE_ADDRESS, amountParsed)
      
      setResult("⏳ Waiting for confirmation...")
      const receipt = await tx.wait()
      
      setResult(`✅ Success! Funded bridge with ${amount} USD.h\nTx: ${receipt.hash}`)
    } catch (error: any) {
      console.error(error)
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-xl shadow-2xl border-2 border-purple-200 max-w-sm">
      <h3 className="text-sm font-bold text-purple-900 mb-2">🔧 Fund Bridge Contract</h3>
      <p className="text-xs text-gray-600 mb-3">
        The bridge needs USD.h tokens to pay fees. Transfer some tokens to the bridge contract.
      </p>
      
      <div className="space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (USD.h)"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm text-black"
          disabled={loading}
        />
        
        <button
          onClick={fundBridge}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white text-sm font-bold transition-all ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Processing..." : "Fund Bridge"}
        </button>
        
        {result && (
          <div className="text-xs p-2 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap">
            {result}
          </div>
        )}
        
        <p className="text-xs text-gray-500">
          Bridge: {BRIDGE_ADDRESS.slice(0, 10)}...
        </p>
      </div>
    </div>
  )
}
