"use client";

import { useState } from "react";
import { createWalletClient, custom, getContract } from "viem";
import { passetHub, publicClient } from "../utils/viem";
import { abi as factoryAbi } from "@/abis/UniswapV2Factory.json";

export default function CreatePool({
    account,
    factoryAddress,
}: {
    account: string | null;
    factoryAddress: string;
}) {
    const [tokenA, setTokenA] = useState("");
    const [tokenB, setTokenB] = useState("");
    const [pair, setPair] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPool = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!account) {
                setError("❌ Please connect wallet first");
                return;
            }

            if (!window.ethereum) {
                setError("❌ MetaMask or wallet extension not found");
                setLoading(false);
                return;
            }

            const walletClient = createWalletClient({
                chain: passetHub,
                transport: custom(window.ethereum),
                account: account as `0x${string}`,
            });

            const factory = getContract({
                address: factoryAddress as `0x${string}`,
                abi: factoryAbi,
                client: walletClient,
            });

            const hash = await factory.write.createPair([
                tokenA as `0x${string}`,
                tokenB as `0x${string}`,
            ]);

            // ⏳ Chờ tx mine
            await publicClient.waitForTransactionReceipt({ hash });

            // 🔎 Lấy pair address thật
            const pairAddress = await factory.read.getPair([
                tokenA as `0x${string}`,
                tokenB as `0x${string}`,
            ]);

            setPair(pairAddress as string);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Create pool failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-3">🧩 Create Pool</h2>

            <input
                value={tokenA}
                onChange={(e) => setTokenA(e.target.value)}
                placeholder="Token A Address"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <input
                value={tokenB}
                onChange={(e) => setTokenB(e.target.value)}
                placeholder="Token B Address"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <button
                onClick={createPool}
                disabled={loading || !tokenA || !tokenB}
                className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Pool"}
            </button>

            {pair && <p className="mt-3 text-sm break-all">✅ Tx: {pair}</p>}
            {error && <p className="mt-3 text-red-500">{error}</p>}
        </div>
    );
}
