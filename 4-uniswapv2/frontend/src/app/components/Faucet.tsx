"use client";

import { useState } from "react";
import { createWalletClient, custom, getContract, parseUnits } from "viem";
import { passetHub } from "../utils/viem";
import { abi as erc20Abi } from "@/abis/MyERC20.json";

export default function Faucet({ account }: { account: string }) {
    const [tokenAddress, setTokenAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const faucet = async () => {
        try {
            if (!account) {
                setError("Please connect wallet first");
                return;
            }

            setLoading(true);
            setError(null);

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

            const contract = getContract({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                client: walletClient,
            });

            const amount = parseUnits("100", 18); // 100 token

            const hash = await contract.write.mint([account, amount]);

            setTxHash(hash);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Mint failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-3">🚰 Faucet</h2>

            <input
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                placeholder="ERC20 Token Address"
                className="w-full border px-3 py-2 rounded mb-3"
            />

            <button
                onClick={faucet}
                disabled={loading || !tokenAddress || !account}
                className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
                {loading ? "Minting..." : "Faucet"}
            </button>

            {txHash && <p className="mt-3 text-sm break-all">✅Faucet successful!</p>}
            {error && <p className="mt-3 text-red-500">{error}</p>}
        </div>
    );
}
