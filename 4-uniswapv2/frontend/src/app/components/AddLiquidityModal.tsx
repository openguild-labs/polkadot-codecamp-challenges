"use client";

import { useEffect, useState } from "react";
import { getContract, parseUnits, formatUnits } from "viem";
import erc20Abi from "@/abis/MyERC20.json";
import pairAbi from "@/abis/UniswapV2Pair.json";
import routerAbi from "@/abis/MiniUniswapV2Router.json";
import { getWalletClient, publicClient } from "../utils/viem";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    pool: {
        pair: `0x${string}`;
        token0: `0x${string}`;
        symbol0: string;
        token1: `0x${string}`;
        symbol1: string;
    };
    user: string | null;
    onSuccess: () => void;
};

export default function AddLiquidityModal({
    isOpen,
    onClose,
    pool: { pair, token0, token1, symbol0, symbol1 },
    user,
    onSuccess,
}: Props) {
    const [amount0, setAmount0] = useState("");
    const [amount1, setAmount1] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance0, setBalance0] = useState("0");
    const [balance1, setBalance1] = useState("0");

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchBalances = async () => {
            const walletClient = await getWalletClient();

            const tokenA = getContract({
                address: token0,
                abi: erc20Abi.abi,
                client: walletClient,
            });
            const tokenB = getContract({
                address: token1,
                abi: erc20Abi.abi,
                client: walletClient,
            });

            const bal0 = (await tokenA.read.balanceOf([user])) as bigint;
            const bal1 = (await tokenB.read.balanceOf([user])) as bigint;

            setBalance0(formatUnits(bal0, 18));
            setBalance1(formatUnits(bal1, 18));
        };

        fetchBalances();
    }, [isOpen, user, token0, token1]);

    if (!isOpen) return null;

    const handleAddLiquidity = async () => {
        try {
            setLoading(true);

            const walletClient = await getWalletClient();

            const tokenA = getContract({
                address: token0,
                abi: erc20Abi.abi,
                client: walletClient,
            });

            const tokenB = getContract({
                address: token1,
                abi: erc20Abi.abi,
                client: walletClient,
            });

            const router = getContract({
                address: process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`,
                abi: routerAbi.abi,
                client: walletClient,
            });

            const a0 = parseUnits(amount0, 18);
            const a1 = parseUnits(amount1, 18);

            // 1. Approve cho Router
            // Approve token0
            const hash1 = await tokenA.write.approve([router.address, a0]);
            await publicClient.waitForTransactionReceipt({ hash: hash1 });

            // Approve token1
            const hash2 = await tokenB.write.approve([router.address, a1]);
            await publicClient.waitForTransactionReceipt({ hash: hash2 });

            // 2. Add liquidity qua Router (1 tx 🎯)
            const tx = await router.write.addLiquidity([token0, token1, a0, a1, user]);

            await publicClient.waitForTransactionReceipt({ hash: tx });

            alert("✅ Liquidity added via Router!");
            await onSuccess();
        } catch (err) {
            console.error(err);
            alert("❌ Add liquidity failed");
        } finally {
            setLoading(false);
        }
    };

    const isValid =
        Number(amount0) > 0 &&
        Number(amount1) > 0 &&
        Number(amount0) <= Number(balance0) &&
        Number(amount1) <= Number(balance1);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">
                <h3 className="text-lg font-bold">Add Liquidity</h3>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>{symbol0}</span>
                    <span>Balance: {balance0}</span>
                </div>
                <input
                    placeholder="0.00"
                    value={amount0}
                    onChange={(e) => setAmount0(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <div className="flex justify-between text-sm text-gray-600">
                    <span>{symbol1}</span>
                    <span>Balance: {balance1}</span>
                </div>
                <input
                    placeholder="0.00"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                {(!amount0 || !amount1) && (
                    <p className="text-sm text-red-500"> You must enter both token amounts</p>
                )}

                {Number(amount0) > Number(balance0) && (
                    <p className="text-sm text-red-500"> Not enough {symbol0} balance</p>
                )}

                {Number(amount1) > Number(balance1) && (
                    <p className="text-sm text-red-500"> Not enough {symbol1} balance</p>
                )}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleAddLiquidity}
                        disabled={loading || !isValid}
                        className={`px-3 py-1 rounded ${
                            loading || !isValid ? "bg-gray-400" : "bg-black text-white"
                        }`}
                    >
                        {loading ? "Adding..." : "Add Liquidity"}
                    </button>
                </div>
            </div>
        </div>
    );
}
