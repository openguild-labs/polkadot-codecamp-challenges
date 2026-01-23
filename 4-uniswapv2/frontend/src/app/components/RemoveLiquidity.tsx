"use client";

import React, { useState, useEffect } from "react";
import { parseEther, formatEther } from "viem";
import { publicClient, getWalletClient } from "../utils/viem";
import { CONTRACTS, ABIS } from "../utils/contracts";

interface RemoveLiquidityProps {
  account: string | null;
  onSuccess?: () => void;
}

const RemoveLiquidity: React.FC<RemoveLiquidityProps> = ({ account, onSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [lpBalance, setLpBalance] = useState<string>("0");
  const [reserves, setReserves] = useState<{ reserve0: string; reserve1: string }>({
    reserve0: "0",
    reserve1: "0",
  });

  const fetchData = async () => {
    if (!account) return;

    try {
      const [lpBal, reservesData] = await Promise.all([
        publicClient.readContract({
          address: CONTRACTS.PAIR_TKA_TKB,
          abi: ABIS.PAIR,
          functionName: "balanceOf",
          args: [account as `0x${string}`],
        }),
        publicClient.readContract({
          address: CONTRACTS.PAIR_TKA_TKB,
          abi: ABIS.PAIR,
          functionName: "getReserves",
        }),
      ]);

      setLpBalance(formatEther(lpBal as bigint));

      const resArray = reservesData as [bigint, bigint, number];
      setReserves({
        reserve0: formatEther(resArray[0]),
        reserve1: formatEther(resArray[1]),
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account]);

  const removeLiquidity = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > parseFloat(lpBalance)) {
      setError("Insufficient LP token balance");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const walletClient = await getWalletClient();
      const amountWei = parseEther(amount);

      // Step 1: Transfer LP tokens to pair contract
      setSuccess("Transferring LP tokens to pair...");
      const transferHash = await walletClient.writeContract({
        address: CONTRACTS.PAIR_TKA_TKB,
        abi: ABIS.PAIR,
        functionName: "transfer",
        args: [CONTRACTS.PAIR_TKA_TKB, amountWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: transferHash });

      // Step 2: Burn LP tokens to get back underlying tokens
      setSuccess("Burning LP tokens...");
      const burnHash = await walletClient.writeContract({
        address: CONTRACTS.PAIR_TKA_TKB,
        abi: ABIS.PAIR,
        functionName: "burn",
        args: [account as `0x${string}`],
      });
      await publicClient.waitForTransactionReceipt({ hash: burnHash });

      setSuccess(`Successfully removed ${amount} LP tokens!`);
      setAmount("");
      await fetchData();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error removing liquidity:", err);
      setError(err.message || "Failed to remove liquidity");
    } finally {
      setLoading(false);
    }
  };

  const setMaxAmount = () => {
    setAmount(lpBalance);
  };

  return (
    <div className="border border-red-500 rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold text-red-600 mb-4">Remove Liquidity</h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mb-3 p-2 bg-green-50 rounded">{success}</p>
      )}

      <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
        <p className="text-gray-600">Pool: TKA/TKB</p>
        <p className="text-gray-600">Your LP Balance: {parseFloat(lpBalance).toFixed(6)}</p>
        <p className="text-gray-600">
          Pool Reserves: {parseFloat(reserves.reserve0).toFixed(2)} TKA / {parseFloat(reserves.reserve1).toFixed(2)} TKB
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              LP Token Amount
            </label>
            <button
              onClick={setMaxAmount}
              className="text-red-500 hover:text-red-700 text-xs underline"
            >
              Max
            </button>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={removeLiquidity}
          disabled={loading || !account || !amount || parseFloat(amount) <= 0}
          className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Processing..." : "Remove Liquidity"}
        </button>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
