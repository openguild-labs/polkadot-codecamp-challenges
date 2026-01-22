"use client";

import { useEffect, useState } from "react";
import { getContract, parseUnits, formatUnits } from "viem";
import pairAbi from "@/abis/UniswapV2Pair.json";
import routerAbi from "@/abis/MiniUniswapV2Router.json";
import { getWalletClient, publicClient } from "../utils/viem";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    pool: {
        pair: `0x${string}`;
        token0: `0x${string}`;
        token1: `0x${string}`;
        symbol0: string;
        symbol1: string;
    };
    user: `0x${string}` | null;
};

const ROUTER_ADDRESS = process.env.NEXT_PUBLIC_ROUTER_ADDRESS as `0x${string}`;

export default function RemoveLiquidityModal({
    isOpen,
    onClose,
    onSuccess,
    pool: { pair, token0, token1, symbol0, symbol1 },
    user,
}: Props) {
    const [lpAmount, setLpAmount] = useState("");
    const [lpBalance, setLpBalance] = useState("0");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !user) return;

        const fetchLpBalance = async () => {
            const walletClient = await getWalletClient();

            const pairContract = getContract({
                address: pair,
                abi: pairAbi.abi,
                client: walletClient,
            });

            const bal = (await pairContract.read.balanceOf([user])) as bigint;
            setLpBalance(formatUnits(bal, 18));
        };

        fetchLpBalance();
    }, [isOpen, user, pair]);

    if (!isOpen) return null;

    const handleRemove = async () => {
        try {
            setLoading(true);
            const walletClient = await getWalletClient();

            const pairContract = getContract({
                address: pair,
                abi: pairAbi.abi,
                client: walletClient,
            });

            const router = getContract({
                address: ROUTER_ADDRESS,
                abi: routerAbi.abi,
                client: walletClient,
            });

            const amountLP = parseUnits(lpAmount, 18);

            // Approve LP
            const tx1 = await pairContract.write.approve([ROUTER_ADDRESS, amountLP]);
            await publicClient.waitForTransactionReceipt({ hash: tx1 });

            // 👉 Lấy token0/token1 đúng thứ tự từ Pair
            const t0 = (await pairContract.read.token0()) as `0x${string}`;
            const t1 = (await pairContract.read.token1()) as `0x${string}`;

            // Remove
            const tx2 = await router.write.removeLiquidity([t0, t1, amountLP, user!]);
            await publicClient.waitForTransactionReceipt({ hash: tx2 });

            alert("✅ Liquidity removed!");
            await onSuccess();
            await onClose();
        } catch (err: any) {
            console.error("Remove failed:", err);
            alert(err?.shortMessage || err?.message || "Remove liquidity failed");
        } finally {
            setLoading(false);
        }
    };

    const isValid = Number(lpAmount) > 0 && Number(lpAmount) <= Number(lpBalance);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] space-y-4">
                <h3 className="text-lg font-bold">Remove Liquidity</h3>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>LP Balance</span>
                    <span>{lpBalance}</span>
                </div>

                <input
                    placeholder="0.00"
                    value={lpAmount}
                    onChange={(e) => setLpAmount(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                {Number(lpAmount) > Number(lpBalance) && (
                    <p className="text-sm text-red-500">Not enough LP tokens</p>
                )}

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 border rounded">
                        Cancel
                    </button>
                    <button
                        onClick={handleRemove}
                        disabled={loading || !isValid}
                        className={`px-3 py-1 rounded ${
                            loading || !isValid ? "bg-gray-400" : "bg-red-500 text-white"
                        }`}
                    >
                        {loading ? "Removing..." : "Remove Liquidity"}
                    </button>
                </div>
            </div>
        </div>
    );
}
