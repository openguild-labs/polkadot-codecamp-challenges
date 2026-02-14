"use client";

import React, { useState } from "react";
import { publicClient, getWalletClient } from "../utils/viem";
import { FactoryABI, FACTORY_ADDRESS } from "../utils/contract";

interface CreatePoolProps {
  account: string | null;
  onPoolCreated?: () => void;
}

const CreatePool: React.FC<CreatePoolProps> = ({ account, onPoolCreated }) => {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [createdPair, setCreatedPair] = useState("");

  const handleCreatePool = async () => {
    if (!account) {
      setStatus({ type: "error", message: "Connect your wallet first" });
      return;
    }
    if (!tokenA || !tokenB) {
      setStatus({ type: "error", message: "Enter both token addresses" });
      return;
    }
    if (tokenA.toLowerCase() === tokenB.toLowerCase()) {
      setStatus({ type: "error", message: "Tokens must be different" });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "info", message: "Creating pool..." });

      // Check if pair already exists
      const existingPair = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "getPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      }) as `0x${string}`;

      if (existingPair !== "0x0000000000000000000000000000000000000000") {
        setStatus({ type: "error", message: `Pool already exists at ${existingPair}` });
        setCreatedPair(existingPair);
        return;
      }

      const walletClient = await getWalletClient();

      setStatus({ type: "info", message: "Confirm transaction in your wallet..." });
      const hash = await walletClient.writeContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "createPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      });

      setStatus({ type: "info", message: "Waiting for confirmation..." });
      await publicClient.waitForTransactionReceipt({ hash });

      const pairAddress = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "getPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      }) as string;

      setCreatedPair(pairAddress);
      setStatus({ type: "success", message: "Pool created successfully!" });
      onPoolCreated?.();
    } catch (err: any) {
      console.error("Create pool error:", err);
      setStatus({ type: "error", message: err.message || "Failed to create pool" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">Create New Pool</h2>
      <p className="text-sm text-gray-400">Create a new liquidity pair for two ERC20 tokens.</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Token A Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
            className="w-full p-3 bg-background border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Token B Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
            className="w-full p-3 bg-background border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {status.message && (
        <div
          className={`p-3 rounded-xl text-sm ${
            status.type === "error"
              ? "bg-red-900/30 text-red-400"
              : status.type === "success"
              ? "bg-green-900/30 text-green-400"
              : "bg-blue-900/30 text-blue-400"
          }`}
        >
          {status.message}
        </div>
      )}

      {createdPair && (
        <div className="p-3 bg-accent-light rounded-xl text-sm">
          <span className="text-gray-400">Pair Address: </span>
          <span className="text-accent font-mono text-xs break-all">{createdPair}</span>
        </div>
      )}

      <button
        onClick={handleCreatePool}
        disabled={loading || !account}
        className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition"
      >
        {loading ? "Creating..." : !account ? "Connect Wallet" : "Create Pool"}
      </button>
    </div>
  );
};

export default CreatePool;
