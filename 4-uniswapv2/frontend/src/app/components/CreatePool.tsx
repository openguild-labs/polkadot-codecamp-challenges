"use client";

import React, { useState } from "react";
import { isAddress } from "viem";
import { publicClient, getWalletClient } from "../utils/viem";
import { CONTRACTS, ABIS } from "../utils/contracts";

interface CreatePoolProps {
  account: string | null;
  onSuccess?: () => void;
}

const CreatePool: React.FC<CreatePoolProps> = ({ account, onSuccess }) => {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createPool = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!isAddress(tokenA) || !isAddress(tokenB)) {
      setError("Please enter valid token addresses");
      return;
    }

    if (tokenA.toLowerCase() === tokenB.toLowerCase()) {
      setError("Token addresses must be different");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check if pair already exists
      const existingPair = await publicClient.readContract({
        address: CONTRACTS.FACTORY,
        abi: ABIS.FACTORY,
        functionName: "getPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      });

      if (existingPair !== "0x0000000000000000000000000000000000000000") {
        setError("Pair already exists!");
        setLoading(false);
        return;
      }

      const walletClient = await getWalletClient();

      const hash = await walletClient.writeContract({
        address: CONTRACTS.FACTORY,
        abi: ABIS.FACTORY,
        functionName: "createPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      });

      setSuccess(`Creating pool... TX: ${hash.slice(0, 10)}...`);

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      // Get the new pair address
      const newPair = await publicClient.readContract({
        address: CONTRACTS.FACTORY,
        abi: ABIS.FACTORY,
        functionName: "getPair",
        args: [tokenA as `0x${string}`, tokenB as `0x${string}`],
      });

      setSuccess(`Pool created successfully! Pair: ${(newPair as string).slice(0, 10)}...`);
      setTokenA("");
      setTokenB("");
      onSuccess?.();
    } catch (err: any) {
      console.error("Error creating pool:", err);
      setError(err.message || "Failed to create pool");
    } finally {
      setLoading(false);
    }
  };

  const useDefaultTokens = () => {
    setTokenA(CONTRACTS.TOKEN_A);
    setTokenB(CONTRACTS.TOKEN_B);
  };

  return (
    <div className="border border-purple-500 rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold text-purple-600 mb-4">Create Pool</h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mb-3 p-2 bg-green-50 rounded">{success}</p>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token A Address
          </label>
          <input
            type="text"
            value={tokenA}
            onChange={(e) => setTokenA(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token B Address
          </label>
          <input
            type="text"
            value={tokenB}
            onChange={(e) => setTokenB(e.target.value)}
            placeholder="0x..."
            className="w-full p-2 border border-gray-300 rounded-lg text-sm font-mono"
          />
        </div>

        <button
          onClick={useDefaultTokens}
          className="text-purple-500 hover:text-purple-700 text-sm underline"
        >
          Use TKA/TKB tokens
        </button>

        <button
          onClick={createPool}
          disabled={loading || !account || !tokenA || !tokenB}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create Pool"}
        </button>
      </div>
    </div>
  );
};

export default CreatePool;
