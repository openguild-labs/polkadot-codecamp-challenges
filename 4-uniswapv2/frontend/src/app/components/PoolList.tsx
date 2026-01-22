"use client";

import { use, useEffect, useState } from "react";
import { createPublicClient, http, getContract, formatUnits } from "viem";
import { passetHub } from "../utils/viem";

import factoryJson from "@/abis/UniswapV2Factory.json";
import pairJson from "@/abis/UniswapV2Pair.json";
import erc20Abi from "@/abis/MyERC20.json";

import AddLiquidityModal from "../components/AddLiquidityModal";
import RemoveLiquidityModal from "../components/RemoveLiquidityModal";

import { Pool } from "../types/pool";
import { fetchPools } from "@/libs/pools";

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

type Props = {
    userAddress: string | null;
    pools: Pool[];
    onSuccess: () => Promise<void>;
};

export default function PoolList({ userAddress, pools, onSuccess }: Props) {
    const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
    const [removePool, setRemovePool] = useState<Pool | null>(null);

    return (
        <div className="max-w-3xl w-full mt-8">
            <h2 className="text-xl font-bold mb-4">📊 Pools</h2>

            {pools.length === 0 && <p>No pools found</p>}

            <div className="space-y-4">
                {pools.map((pool) => (
                    <div
                        key={pool.pair}
                        className="border p-4 rounded-xl flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold text-lg">{pool.symbol}</p>

                            <p className="text-sm text-gray-600">
                                Reserves: {pool.reserve0} / {pool.reserve1}
                            </p>

                            <p className="text-sm text-green-600">Your LP: {pool.userLp}</p>

                            <p className="text-xs text-gray-400">
                                Pair: {pool.pair.slice(0, 10)}...
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 border rounded"
                                onClick={() => setSelectedPool(pool)}
                            >
                                Add Liquidity
                            </button>
                            <button
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => setRemovePool(pool)}
                            >
                                Remove Liquidity
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPool && (
                <AddLiquidityModal
                    isOpen={true}
                    pool={{
                        pair: selectedPool.pair,
                        token0: selectedPool.token0,
                        token1: selectedPool.token1,
                        symbol0: selectedPool.symbol0,
                        symbol1: selectedPool.symbol1,
                    }}
                    user={userAddress}
                    onClose={() => setSelectedPool(null)}
                    onSuccess={onSuccess}
                />
            )}

            {removePool && (
                <RemoveLiquidityModal
                    isOpen={true}
                    pool={{
                        pair: removePool.pair,
                        token0: removePool.token0,
                        token1: removePool.token1,
                        symbol0: removePool.symbol0,
                        symbol1: removePool.symbol1,
                    }}
                    user={userAddress as `0x${string}`}
                    onClose={() => setRemovePool(null)}
                    onSuccess={onSuccess}
                />
            )}
        </div>
    );
}
