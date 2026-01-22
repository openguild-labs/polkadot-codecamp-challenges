"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowDown, ChevronDown } from "lucide-react"
import { formatUnits, parseUnits } from "viem"
import { usePool } from "@/hooks/usePool"
import type { Pool } from "./PoolAndLiquidity"

type TokenInfo = Pool["token0"]

const FEE_MULTIPLIER = 997n // 0.3% fee like Uniswap V2
const FEE_DENOMINATOR = 1000n

function pickPool(pools: Pool[], tokenIn?: string | null, tokenOut?: string | null) {
  if (!tokenIn || !tokenOut) return undefined
  return pools.find(
    (pool) =>
      (pool.token0.address === tokenIn && pool.token1.address === tokenOut) ||
      (pool.token0.address === tokenOut && pool.token1.address === tokenIn),
  )
}

export function SwapCard() {
  const { handleGetPools, handleSwap, geBalanceOf } = usePool()

  const [pools, setPools] = useState<Pool[]>([])
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null)
  const [fromTokenAddress, setFromTokenAddress] = useState<string | null>(null)
  const [toTokenAddress, setToTokenAddress] = useState<string | null>(null)
  const [fromAmount, setFromAmount] = useState("")
  const [showSelect, setShowSelect] = useState<"from" | "to" | null>(null)
  const [isSwapping, setIsSwapping] = useState(false)
  const [fromBalance, setFromBalance] = useState<string>("")
  const [toBalance, setToBalance] = useState<string>("")

  useEffect(() => {
    const loadPools = async () => {
      const fetched = await handleGetPools()
      if (!fetched || fetched.length === 0) return

      setPools(fetched)
      setSelectedPool(fetched[0])
      setFromTokenAddress(fetched[0].token0.address)
      setToTokenAddress(fetched[0].token1.address)
    }

    loadPools().catch((err) => console.error("Failed to load pools", err))
  }, [])

  const tokens = useMemo(() => {
    const map = new Map<string, TokenInfo>()
    pools.forEach((pool) => {
      map.set(pool.token0.address, pool.token0)
      map.set(pool.token1.address, pool.token1)
    })
    return Array.from(map.values())
  }, [pools])

  const tokenByAddress = useMemo(() => {
    const lookup: Record<string, TokenInfo> = {}
    tokens.forEach((token) => {
      lookup[token.address] = token
    })
    return lookup
  }, [tokens])

  const fromToken = fromTokenAddress ? tokenByAddress[fromTokenAddress] : undefined
  const toToken = toTokenAddress ? tokenByAddress[toTokenAddress] : undefined

  const refreshBalances = useMemo(() => {
    return async () => {
      try {
        if (fromToken) {
          const bal = await geBalanceOf(fromToken.address as `0x${string}`, fromToken.decimals)
          setFromBalance(bal)
        } else {
          setFromBalance("")
        }
        if (toToken) {
          const bal = await geBalanceOf(toToken.address as `0x${string}`, toToken.decimals)
          setToBalance(bal)
        } else {
          setToBalance("")
        }
      } catch (err) {
        console.error("Failed to load balances", err)
      }
    }
  }, [fromToken, geBalanceOf, toToken])

  useEffect(() => {
    if (!fromTokenAddress || pools.length === 0) return

    const poolWithBoth = toTokenAddress ? pickPool(pools, fromTokenAddress, toTokenAddress) : undefined
    if (poolWithBoth) {
      setSelectedPool(poolWithBoth)
      return
    }

    const poolsWithFrom = pools.filter(
      (p) => p.token0.address === fromTokenAddress || p.token1.address === fromTokenAddress,
    )

    if (poolsWithFrom.length > 0) {
      const first = poolsWithFrom[0]
      setSelectedPool(first)
      const counterpart = first.token0.address === fromTokenAddress ? first.token1.address : first.token0.address
      setToTokenAddress(counterpart)
      return
    }

    setSelectedPool(null)
  }, [fromTokenAddress, toTokenAddress, pools])

  useEffect(() => {
    refreshBalances()
  }, [refreshBalances])

  const amountOut = useMemo(() => {
    if (!selectedPool || !fromToken || !toToken) return ""
    if (!fromAmount) return ""

    try {
      const amountIn = parseUnits(fromAmount, fromToken.decimals)
      const reserveIn = fromToken.address === selectedPool.token0.address ? BigInt(selectedPool.reserve0) : BigInt(selectedPool.reserve1)
      const reserveOut = fromToken.address === selectedPool.token0.address ? BigInt(selectedPool.reserve1) : BigInt(selectedPool.reserve0)

      if (amountIn === 0n || reserveIn === 0n || reserveOut === 0n) return "0"

      const amountInWithFee = (amountIn * FEE_MULTIPLIER) / FEE_DENOMINATOR
      const numerator = amountInWithFee * reserveOut
      const denominator = reserveIn + amountInWithFee
      if (denominator === 0n) return "0"

      const out = numerator / denominator
      return formatUnits(out, toToken.decimals)
    } catch (err) {
      console.error("Failed to compute quote", err)
      return ""
    }
  }, [fromAmount, fromToken, selectedPool, toToken])

  const tokensForToSelect = useMemo(() => {
    if (!fromTokenAddress) return tokens

    const counterpartMap = new Map<string, TokenInfo>()
    pools.forEach((pool) => {
      if (pool.token0.address === fromTokenAddress) {
        counterpartMap.set(pool.token1.address, pool.token1)
      }
      if (pool.token1.address === fromTokenAddress) {
        counterpartMap.set(pool.token0.address, pool.token0)
      }
    })

    return counterpartMap.size > 0 ? Array.from(counterpartMap.values()) : []
  }, [fromTokenAddress, pools, tokens])

  return (
    <div className="sketch-card p-8 bg-white max-w-md mx-auto mt-20 relative">
      <h2 className="text-2xl font-bold mb-6 italic underline decoration-pink-500">Swap</h2>

      {pools.length === 0 ? (
        <div className="sketch-border p-6 sketch-highlight-yellow text-sm font-bold italic">
          No pools found on-chain. Create a pool first, then come back to swap.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="sketch-border p-4 sketch-highlight-blue">
              <label className="block text-sm mb-2 font-bold uppercase tracking-tighter">Sell</label>
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="text-3xl bg-transparent outline-none w-1/2 font-bold"
                />
                <button
                  onClick={() => setShowSelect("from")}
                  className="sketch-button px-3 py-1 font-bold flex items-center gap-1 bg-white"
                >
                  {fromToken ? fromToken.symbol : "Select"} <ChevronDown size={14} />
                </button>
              </div>
              {fromBalance && fromToken && (
                <div className="text-xs font-mono mt-1 opacity-60">
                  Balance: {fromBalance} {fromToken.symbol}
                </div>
              )}
            </div>

            <div className="flex justify-center -my-2 relative z-10">
              <div
                onClick={() => {
                  setFromTokenAddress(toTokenAddress)
                  setToTokenAddress(fromTokenAddress)
                }}
                className="bg-white sketch-border p-2 cursor-pointer hover:bg-black hover:text-white transition-colors"
              >
                <ArrowDown size={20} />
              </div>
            </div>

            <div className="sketch-border p-4 sketch-highlight-pink">
              <label className="block text-sm mb-2 font-bold uppercase tracking-tighter">Buy</label>
              <div className="flex justify-between items-center">
                <input
                  type="number"
                  placeholder="0.0"
                  readOnly
                  value={amountOut}
                  className="text-3xl bg-transparent outline-none w-1/2 font-bold"
                />
                <button
                  onClick={() => setShowSelect("to")}
                  className="sketch-button px-3 py-1 font-bold flex items-center gap-1 bg-white"
                >
                  {toToken ? toToken.symbol : "Select"} <ChevronDown size={14} />
                </button>
              </div>
              {toBalance && toToken && (
                <div className="text-xs font-mono mt-1 opacity-60">
                  Balance: {toBalance} {toToken.symbol}
                </div>
              )}
              {selectedPool && (
                <div className="text-xs font-mono mt-2 opacity-60">
                  Pool: {selectedPool.token0.symbol}/{selectedPool.token1.symbol}
                </div>
              )}
            </div>
          </div>

          <button
            className="w-full mt-6 sketch-button bg-black text-white py-4 text-xl font-bold hover:bg-white hover:text-black transition-all"
            disabled={!selectedPool || !fromAmount || isSwapping}
            onClick={async () => {
              if (!selectedPool || !fromToken || !toToken) return
              try {
                setIsSwapping(true)
                const res = await handleSwap({
                  poolAddress: selectedPool.id as `0x${string}`,
                  tokenIn: { address: fromToken.address as `0x${string}`, decimals: fromToken.decimals },
                  tokenOut: { address: toToken.address as `0x${string}`, decimals: toToken.decimals },
                  amountIn: fromAmount,
                })
                await refreshBalances()
                setFromAmount("")
              } catch (err) {
                console.error(err)
              } finally {
                setIsSwapping(false)
              }
            }}
          >
            {isSwapping ? "Swapping..." : "Swap"}
          </button>
        </>
      )}

      {showSelect && tokens.length > 0 && (
        <div className="absolute inset-0 z-20 bg-white p-8 sketch-border m-4 animate-in fade-in zoom-in duration-200">
          <h3 className="text-xl font-bold mb-4 italic">Select a token</h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {showSelect === "to" && tokensForToSelect.length === 0 && (
              <div className="sketch-border p-3 text-sm font-bold italic sketch-highlight-yellow">
                No compatible pools for this side.
              </div>
            )}
            {(showSelect === "from" ? tokens : tokensForToSelect).map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  if (showSelect === "from") {
                    setFromTokenAddress(token.address)
                    if (token.address === toTokenAddress) setToTokenAddress(fromTokenAddress)
                  } else {
                    setToTokenAddress(token.address)
                    if (token.address === fromTokenAddress) setFromTokenAddress(toTokenAddress)
                  }
                  setShowSelect(null)
                }}
                className={`w-full text-left p-3 sketch-border transition-all font-bold ${
                  (showSelect === "from" ? fromTokenAddress : toTokenAddress) === token.address
                    ? "sketch-highlight-yellow"
                    : ""
                } hover:sketch-highlight-yellow`}
              >
                <div className="flex justify-between items-center">
                  <span>
                    {token.symbol} · {token.name}
                  </span>
                  <span className="text-xs font-mono opacity-60">
                    {token.address.slice(0, 6)}...{token.address.slice(-4)}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setShowSelect(null)} className="mt-4 w-full sketch-button py-2 font-bold">
            Close
          </button>
        </div>
      )}
    </div>
  )
}