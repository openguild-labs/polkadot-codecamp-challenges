"use client";

import React from "react";
import { FACTORY_ADDRESS } from "../utils/contract";
import { PoolInfo } from "../hooks/usePools";

interface AllPoolsProps {
  pools: PoolInfo[];
  loading: boolean;
  refetch: () => void;
}

const AllPools: React.FC<AllPoolsProps> = ({ pools, loading, refetch }) => {
  const shortenAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">All Pools</h2>
        <button
          onClick={refetch}
          disabled={loading}
          className="text-sm text-accent border border-accent px-3 py-1 rounded-lg hover:bg-accent-light transition"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {FACTORY_ADDRESS === "0x0000000000000000000000000000000000000000" && (
        <div className="p-4 bg-warning/10 text-warning rounded-xl text-sm text-center">
          Factory address not configured. Deploy contracts first and update the address in contract.ts.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : pools.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No pools found. Create one to get started!
        </div>
      ) : (
        <div className="space-y-3">
          {pools.map((pool, index) => (
            <div
              key={pool.address}
              className="bg-background border border-card-border rounded-xl p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {pool.token0.symbol} / {pool.token1.symbol}
                </span>
                <span className="text-xs font-mono text-gray-400">{shortenAddr(pool.address)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">{pool.token0.symbol}: </span>
                  <span className="text-white">{parseFloat(pool.reserve0).toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-gray-400">{pool.token1.symbol}: </span>
                  <span className="text-white">{parseFloat(pool.reserve1).toFixed(4)}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                {shortenAddr(pool.token0.address)} / {shortenAddr(pool.token1.address)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPools;
