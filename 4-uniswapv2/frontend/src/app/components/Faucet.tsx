"use client";

import React, { useState } from "react";
import { parseEther, formatEther } from "viem";
import { publicClient, getWalletClient } from "../utils/viem";
import { CONTRACTS, ABIS } from "../utils/contracts";

interface FaucetProps {
  account: string | null;
  onSuccess?: () => void;
}

const Faucet: React.FC<FaucetProps> = ({ account, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [balanceA, setBalanceA] = useState<string>("0");
  const [balanceB, setBalanceB] = useState<string>("0");

  const FAUCET_AMOUNT = parseEther("1000"); // 1000 tokens

  const fetchBalances = async () => {
    if (!account) return;

    try {
      const [balA, balB] = await Promise.all([
        publicClient.readContract({
          address: CONTRACTS.TOKEN_A,
          abi: ABIS.TOKEN,
          functionName: "balanceOf",
          args: [account as `0x${string}`],
        }),
        publicClient.readContract({
          address: CONTRACTS.TOKEN_B,
          abi: ABIS.TOKEN,
          functionName: "balanceOf",
          args: [account as `0x${string}`],
        }),
      ]);

      setBalanceA(formatEther(balA as bigint));
      setBalanceB(formatEther(balB as bigint));
    } catch (err) {
      console.error("Error fetching balances:", err);
    }
  };

  React.useEffect(() => {
    fetchBalances();
  }, [account]);

  const mintTokens = async (tokenAddress: `0x${string}`, tokenName: string) => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const walletClient = await getWalletClient();

      const hash = await walletClient.writeContract({
        address: tokenAddress,
        abi: ABIS.TOKEN,
        functionName: "faucet",
        args: [account as `0x${string}`, FAUCET_AMOUNT],
      });

      setSuccess(`Minting ${tokenName}... TX: ${hash.slice(0, 10)}...`);

      await publicClient.waitForTransactionReceipt({ hash });

      setSuccess(`Successfully minted 1000 ${tokenName}!`);
      await fetchBalances();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error minting tokens:", err);
      setError(err.message || "Failed to mint tokens");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-green-500 rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold text-green-600 mb-4">Token Faucet</h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mb-3 p-2 bg-green-50 rounded">{success}</p>
      )}

      <div className="space-y-4">
        {/* Token A */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-700">Token A (TKA)</p>
            <p className="text-sm text-gray-500">Balance: {parseFloat(balanceA).toFixed(2)}</p>
          </div>
          <button
            onClick={() => mintTokens(CONTRACTS.TOKEN_A, "TKA")}
            disabled={loading || !account}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
          >
            {loading ? "..." : "Get 1000 TKA"}
          </button>
        </div>

        {/* Token B */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-700">Token B (TKB)</p>
            <p className="text-sm text-gray-500">Balance: {parseFloat(balanceB).toFixed(2)}</p>
          </div>
          <button
            onClick={() => mintTokens(CONTRACTS.TOKEN_B, "TKB")}
            disabled={loading || !account}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
          >
            {loading ? "..." : "Get 1000 TKB"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <p>Token A: {CONTRACTS.TOKEN_A.slice(0, 10)}...</p>
        <p>Token B: {CONTRACTS.TOKEN_B.slice(0, 10)}...</p>
      </div>
    </div>
  );
};

export default Faucet;
