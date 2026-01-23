"use client";

import React, { useState, useEffect } from "react";
import { formatEther } from "viem";
import { publicClient } from "../utils/viem";
import { CONTRACTS, ABIS } from "../utils/contracts";

interface Pool {
  address: string;
  token0: string;
  token1: string;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
}

interface ShowAllPoolsProps {
  refreshTrigger?: number;
}

const ShowAllPools: React.FC<ShowAllPoolsProps> = ({ refreshTrigger }) => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPools = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get total number of pairs
      const pairsLength = await publicClient.readContract({
        address: CONTRACTS.FACTORY,
        abi: ABIS.FACTORY,
        functionName: "allPairsLength",
      }) as bigint;

      const poolsData: Pool[] = [];

      // Fetch each pair's details
      for (let i = 0; i < Number(pairsLength); i++) {
        const pairAddress = await publicClient.readContract({
          address: CONTRACTS.FACTORY,
          abi: ABIS.FACTORY,
          functionName: "allPairs",
          args: [BigInt(i)],
        }) as `0x${string}`;

        // Get pair details
        const [token0, token1, reserves, totalSupply] = await Promise.all([
          publicClient.readContract({
            address: pairAddress,
            abi: ABIS.PAIR,
            functionName: "token0",
          }),
          publicClient.readContract({
            address: pairAddress,
            abi: ABIS.PAIR,
            functionName: "token1",
          }),
          publicClient.readContract({
            address: pairAddress,
            abi: ABIS.PAIR,
            functionName: "getReserves",
          }),
          publicClient.readContract({
            address: pairAddress,
            abi: ABIS.PAIR,
            functionName: "totalSupply",
          }),
        ]);

        const reservesArray = reserves as [bigint, bigint, number];

        poolsData.push({
          address: pairAddress,
          token0: token0 as string,
          token1: token1 as string,
          reserve0: formatEther(reservesArray[0]),
          reserve1: formatEther(reservesArray[1]),
          totalSupply: formatEther(totalSupply as bigint),
        });
      }

      setPools(poolsData);
    } catch (err: any) {
      console.error("Error fetching pools:", err);
      setError(err.message || "Failed to fetch pools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [refreshTrigger]);

  const getTokenName = (address: string) => {
    if (address.toLowerCase() === CONTRACTS.TOKEN_A.toLowerCase()) return "TKA";
    if (address.toLowerCase() === CONTRACTS.TOKEN_B.toLowerCase()) return "TKB";
    return address.slice(0, 6) + "...";
  };

  return (
    <div className="border border-blue-500 rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-600">All Pools</h2>
        <button
          onClick={fetchPools}
          disabled={loading}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{error}</p>
      )}

      {pools.length === 0 && !loading ? (
        <p className="text-gray-500 text-center py-4">No pools found</p>
      ) : (
        <div className="space-y-3">
          {pools.map((pool, index) => (
            <div
              key={pool.address}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  Pool #{index + 1}: {getTokenName(pool.token0)}/{getTokenName(pool.token1)}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  Reserve {getTokenName(pool.token0)}:{" "}
                  <span className="font-mono">{parseFloat(pool.reserve0).toFixed(4)}</span>
                </p>
                <p>
                  Reserve {getTokenName(pool.token1)}:{" "}
                  <span className="font-mono">{parseFloat(pool.reserve1).toFixed(4)}</span>
                </p>
                <p>
                  LP Supply:{" "}
                  <span className="font-mono">{parseFloat(pool.totalSupply).toFixed(4)}</span>
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-mono">
                {pool.address.slice(0, 20)}...
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <p>Factory: {CONTRACTS.FACTORY.slice(0, 20)}...</p>
      </div>
    </div>
  );
};

export default ShowAllPools;
