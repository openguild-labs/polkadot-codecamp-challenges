"use client"

import { useState, useEffect } from "react"
import { Plus, Info, History } from "lucide-react"
import { publicClient } from "../utils/viem"
import UniswapFactoryABI from "../../abis/UniswapV2Factory.json"
import UniswapPairABI from "../../abis/UniswapV2Pair.json"
import MyERC20ABI from "../../abis/MyERC20.json"
import PASEO_ADDRESS from "../../address.json"
import { usePool } from "@/hooks/usePool"
import { AddLiquidityForm } from "./AddLiquidityForm"
import { RemoveLiquidityForm } from "./RemoveLiquidityForm"
import { Input } from "@/components/ui/input"

export interface Pool {
  id: string
  token0: {
    address: string
    symbol: string
    name: string
    decimals: number
  }
  token1: {
    address: string
    symbol: string
    name: string
    decimals: number
  }
  fee: string
  reserve0: string
  reserve1: string
  totalSupply: string
}

export function PoolAndLiquidity() {
  const [pools, setPools] = useState<Pool[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [subTab, setSubTab] = useState<"list" | "create">("list")
  const [newPool, setNewPool] = useState({ tokenA: "", tokenB: "", fee: "0.3%" })

  const { handleGetPools, handleCreatePool } = usePool();
  useEffect(() => {
    const loadPools = async () => {
      try {
        const fetchedPools = await handleGetPools()
        setPools(fetchedPools || [])
      } catch (error) {
        console.error("Failed to load pools", error)
      }
    }

    loadPools()
  }, [handleGetPools])

  const formatUnits = (value: bigint, decimals: number) => {
    if (decimals === 0) return value.toString()
    const base = 10 ** decimals
    return (Number(value) / base).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    })
  }

  const handleCreatePoolClick = async() => {
    handleCreatePool(newPool.tokenA, newPool.tokenB)
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 mb-8">
        <div className="flex border-b border-purple-200">
          <button
            onClick={() => setSubTab("list")}
            className={`flex-1 py-4 text-lg font-bold flex items-center justify-center gap-2 transition-all ${subTab === "list" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-gray-50 text-gray-800 hover:bg-gray-100"}`}
          >
            <History size={20} /> Positions
          </button>
          <button
            onClick={() => setSubTab("create")}
            className={`flex-1 py-4 text-lg font-bold flex items-center justify-center gap-2 transition-all border-l border-purple-200 ${subTab === "create" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "bg-gray-50 text-gray-800 hover:bg-gray-100"}`}
          >
            <Plus size={20} /> Create Pool
          </button>
        </div>

        <div className="p-8">
          {subTab === "create" ? (
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Create New Pool</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 p-4 rounded-xl">
                  <label className="text-xs uppercase font-bold mb-2 block text-gray-700">Token A Address</label>
                  <input
                    className="w-full text-lg outline-none bg-transparent text-gray-800 font-mono"
                    value={newPool.tokenA}
                    onChange={(e) => setNewPool({ ...newPool, tokenA: e.target.value })}
                    placeholder="0x..."
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 p-4 rounded-xl">
                  <label className="text-xs uppercase font-bold mb-2 block text-gray-700">Token B Address</label>
                  <input
                    className="w-full text-lg outline-none bg-transparent text-gray-800 font-mono"
                    value={newPool.tokenB}
                    onChange={(e) => setNewPool({ ...newPool, tokenB: e.target.value })}
                    placeholder="0x..."
                  />
                </div>
              </div>
              <button
                onClick={handleCreatePoolClick}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl text-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
              >
                Create Pool
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Liquidity Pools</h3>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                </div>
              </div>

              {pools.length === 0 ? (
                <div className="border-2 border-dashed border-amber-300 bg-amber-50 p-12 text-center rounded-xl">
                  <p className="text-xl font-semibold text-amber-800">No pools yet</p>
                  <p className="text-gray-600">Create a pool to start providing liquidity</p>
                </div>
              ) : (
                pools.map((pool) => (
                  <div
                    key={pool.id}
                    className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl flex justify-between items-center hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {pool.token0.symbol.charAt(0)}{pool.token1.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800">
                          {pool.token0.symbol}/{pool.token1.symbol}
                        </div>
                        <div className="text-sm font-semibold text-purple-600 uppercase tracking-wider">{pool.fee} Tier</div>
                        <div className="text-xs font-mono text-gray-600 mt-1">
                          {pool.token0.address.slice(0, 6)}...{pool.token0.address.slice(-4)} · {pool.token1.address.slice(0, 6)}...{pool.token1.address.slice(-4)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-600 uppercase">Pool Reserves</div>
                      <div className="text-sm font-bold text-gray-800">
                        {formatUnits(BigInt(pool.reserve0), pool.token0.decimals)} {pool.token0.symbol}
                      </div>
                      <div className="text-sm font-bold text-gray-800">
                        {formatUnits(BigInt(pool.reserve1), pool.token1.decimals)} {pool.token1.symbol}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">LP Supply: {formatUnits(BigInt(pool.totalSupply), 18)}</div>
                      <div className="flex gap-2 mt-3">
                        <AddLiquidityForm
                          poolAddress={pool.id as `0x${string}`}
                          tokenA={pool.token0}
                          tokenB={pool.token1}
                        />

                        <RemoveLiquidityForm
                          poolAddress={pool.id as `0x${string}`}
                          tokenA={pool.token0}
                          reserveA={formatUnits(BigInt(pool.reserve0), 18)}
                          tokenB={pool.token1}
                          reserveB={formatUnits(BigInt(pool.reserve1), 18)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
