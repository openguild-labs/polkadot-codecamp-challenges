"use client";

import { useState, useEffect } from "react";
import { publicClient } from "../utils/viem";
import { FactoryABI, PairABI, ERC20ABI, FACTORY_ADDRESS } from "../utils/contract";
import { formatEther } from "viem";

export interface TokenInfo {
  address: `0x${string}`;
  symbol: string;
}

export interface PoolInfo {
  address: `0x${string}`;
  token0: TokenInfo;
  token1: TokenInfo;
  reserve0: string;
  reserve1: string;
}

async function fetchTokenSymbol(address: `0x${string}`): Promise<string> {
  try {
    const symbol = await publicClient.readContract({
      address,
      abi: ERC20ABI,
      functionName: "tokenSymbol",
    }) as string;
    return symbol;
  } catch {
    try {
      const symbol = await publicClient.readContract({
        address,
        abi: ERC20ABI,
        functionName: "symbol",
      }) as string;
      return symbol;
    } catch {
      return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
  }
}

export function usePools() {
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPools = async () => {
    try {
      setLoading(true);

      const pairsLength = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "allPairsLength",
      }) as bigint;

      const poolData: PoolInfo[] = [];
      const tokenMap = new Map<string, TokenInfo>();

      for (let i = 0n; i < pairsLength; i++) {
        const pairAddress = await publicClient.readContract({
          address: FACTORY_ADDRESS,
          abi: FactoryABI,
          functionName: "allPairs",
          args: [i],
        }) as `0x${string}`;

        const [token0Addr, token1Addr, reserves] = await Promise.all([
          publicClient.readContract({ address: pairAddress, abi: PairABI, functionName: "token0" }),
          publicClient.readContract({ address: pairAddress, abi: PairABI, functionName: "token1" }),
          publicClient.readContract({ address: pairAddress, abi: PairABI, functionName: "getReserves" }),
        ]);

        const t0 = token0Addr as `0x${string}`;
        const t1 = token1Addr as `0x${string}`;
        const res = reserves as [bigint, bigint, number];

        // Fetch symbols (cached by address)
        if (!tokenMap.has(t0.toLowerCase())) {
          const sym = await fetchTokenSymbol(t0);
          tokenMap.set(t0.toLowerCase(), { address: t0, symbol: sym });
        }
        if (!tokenMap.has(t1.toLowerCase())) {
          const sym = await fetchTokenSymbol(t1);
          tokenMap.set(t1.toLowerCase(), { address: t1, symbol: sym });
        }

        poolData.push({
          address: pairAddress,
          token0: tokenMap.get(t0.toLowerCase())!,
          token1: tokenMap.get(t1.toLowerCase())!,
          reserve0: formatEther(res[0]),
          reserve1: formatEther(res[1]),
        });
      }

      setPools(poolData);
      setTokens(Array.from(tokenMap.values()));
    } catch (err) {
      console.error("Error fetching pools:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return { pools, tokens, loading, refetch: fetchPools };
}
