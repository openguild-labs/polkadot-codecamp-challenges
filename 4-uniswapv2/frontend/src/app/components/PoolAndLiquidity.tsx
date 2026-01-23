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
    <div className="max-w-2xl mx-auto mt-12 p-4">
      <div className="sketch-card bg-white overflow-hidden mb-8">
        <div className="flex border-b-2 border-black">
          <button
            onClick={() => setSubTab("list")}
            className={`flex-1 py-4 text-xl font-bold italic flex items-center justify-center gap-2 ${subTab === "list" ? "sketch-highlight-yellow" : "bg-white"}`}
          >
            <History size={20} /> Positions
          </button>
          <button
            onClick={() => setSubTab("create")}
            className={`flex-1 py-4 text-xl font-bold italic flex items-center justify-center gap-2 border-l-2 border-black ${subTab === "create" ? "sketch-highlight-pink" : "bg-white"}`}
          >
            <Plus size={20} /> Create Pool
          </button>
        </div>

        <div className="p-8">
          {subTab === "create" ? (
            <div>
              <h3 className="text-2xl font-bold mb-6 italic underline">Create New Pool</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="sketch-border p-4 sketch-highlight-blue">
                  <label className="text-xs uppercase font-bold mb-1 block">Token A</label>
                  <input
                    className="w-full text-xl outline-none bg-transparent"
                    value={newPool.tokenA}
                    onChange={(e) => setNewPool({ ...newPool, tokenA: e.target.value })}
                    placeholder="0x..."
                  />
                </div>
                <div className="sketch-border p-4 sketch-highlight-pink">
                  <label className="text-xs uppercase font-bold mb-1 block">Token B</label>
                  <input
                    className="w-full text-xl outline-none bg-transparent"
                    value={newPool.tokenB}
                    onChange={(e) => setNewPool({ ...newPool, tokenB: e.target.value })}
                    placeholder="0x..."
                  />
                </div>
              </div>
              <button
                onClick={handleCreatePoolClick}
                className="w-full sketch-button bg-black text-white py-4 text-xl font-bold"
              >
                Create Pool
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold italic underline">Pools</h3>
                <div className="text-sm italic opacity-60 flex items-center gap-1">
                </div>
              </div>

              {pools.length === 0 ? (
                <div className="sketch-border p-12 text-center italic text-xl sketch-highlight-yellow">
                  Your sketchbook is empty. <br /> Start by creating a pool!
                </div>
              ) : (
                pools.map((pool) => (
                  <div
                    key={pool.id}
                    className="sketch-border p-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="ml-4">
                        <div className="text-2xl font-bold italic">
                          {pool.token0.symbol}/{pool.token1.symbol}
                        </div>
                        <div className="text-sm font-bold opacity-50 uppercase tracking-tighter">{pool.fee} Tier</div>
                        <div className="text-xs font-mono opacity-60 mt-1">
                          {pool.token0.address.slice(0, 6)}...{pool.token0.address.slice(-4)} · {pool.token1.address.slice(0, 6)}...{pool.token1.address.slice(-4)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold uppercase opacity-50">Pool Reserves</div>
                      <div className="text-sm font-bold">
                        {formatUnits(BigInt(pool.reserve0), pool.token0.decimals)} {pool.token0.symbol}
                      </div>
                      <div className="text-sm font-bold">
                        {formatUnits(BigInt(pool.reserve1), pool.token1.decimals)} {pool.token1.symbol}
                      </div>
                      <div className="text-xs opacity-60 mt-1">LP Supply: {formatUnits(BigInt(pool.totalSupply), 18)}</div>
                      <div className="flex gap-[5px] mt-3">
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
