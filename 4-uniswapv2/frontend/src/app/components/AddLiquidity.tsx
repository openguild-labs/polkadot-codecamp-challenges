"use client";

import React, { useState, useEffect } from "react";
import { parseEther, formatEther } from "viem";
import { publicClient, getWalletClient } from "../utils/viem";
import { CONTRACTS, ABIS } from "../utils/contracts";

interface AddLiquidityProps {
  account: string | null;
  onSuccess?: () => void;
}

const AddLiquidity: React.FC<AddLiquidityProps> = ({ account, onSuccess }) => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [balanceA, setBalanceA] = useState<string>("0");
  const [balanceB, setBalanceB] = useState<string>("0");
  const [reserves, setReserves] = useState<{ reserve0: string; reserve1: string }>({
    reserve0: "0",
    reserve1: "0",
  });

  const fetchData = async () => {
    if (!account) return;

    try {
      const [balA, balB, reservesData] = await Promise.all([
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
        publicClient.readContract({
          address: CONTRACTS.PAIR_TKA_TKB,
          abi: ABIS.PAIR,
          functionName: "getReserves",
        }),
      ]);

      setBalanceA(formatEther(balA as bigint));
      setBalanceB(formatEther(balB as bigint));

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

  const addLiquidity = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    if (!amountA || !amountB || parseFloat(amountA) <= 0 || parseFloat(amountB) <= 0) {
      setError("Please enter valid amounts");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const walletClient = await getWalletClient();
      const amountAWei = parseEther(amountA);
      const amountBWei = parseEther(amountB);

      // Step 1: Approve Token A
      setSuccess("Approving Token A...");
      const approveAHash = await walletClient.writeContract({
        address: CONTRACTS.TOKEN_A,
        abi: ABIS.TOKEN,
        functionName: "approve",
        args: [CONTRACTS.PAIR_TKA_TKB, amountAWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: approveAHash });

      // Step 2: Approve Token B
      setSuccess("Approving Token B...");
      const approveBHash = await walletClient.writeContract({
        address: CONTRACTS.TOKEN_B,
        abi: ABIS.TOKEN,
        functionName: "approve",
        args: [CONTRACTS.PAIR_TKA_TKB, amountBWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: approveBHash });

      // Step 3: Transfer tokens to pair
      setSuccess("Transferring Token A to pair...");
      const transferAHash = await walletClient.writeContract({
        address: CONTRACTS.TOKEN_A,
        abi: ABIS.TOKEN,
        functionName: "transfer",
        args: [CONTRACTS.PAIR_TKA_TKB, amountAWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: transferAHash });

      setSuccess("Transferring Token B to pair...");
      const transferBHash = await walletClient.writeContract({
        address: CONTRACTS.TOKEN_B,
        abi: ABIS.TOKEN,
        functionName: "transfer",
        args: [CONTRACTS.PAIR_TKA_TKB, amountBWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: transferBHash });

      // Step 4: Mint LP tokens
      setSuccess("Minting LP tokens...");
      const mintHash = await walletClient.writeContract({
        address: CONTRACTS.PAIR_TKA_TKB,
        abi: ABIS.PAIR,
        functionName: "mint",
        args: [account as `0x${string}`],
      });
      await publicClient.waitForTransactionReceipt({ hash: mintHash });

      setSuccess(`Liquidity added successfully! Added ${amountA} TKA + ${amountB} TKB`);
      setAmountA("");
      setAmountB("");
      await fetchData();
      onSuccess?.();
    } catch (err: any) {
      console.error("Error adding liquidity:", err);
      setError(err.message || "Failed to add liquidity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-orange-500 rounded-lg p-4 shadow-md bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold text-orange-600 mb-4">Add Liquidity</h2>

      {error && (
        <p className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-500 text-sm mb-3 p-2 bg-green-50 rounded">{success}</p>
      )}

      <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
        <p className="text-gray-600">Pool: TKA/TKB</p>
        <p className="text-gray-600">
          Reserves: {parseFloat(reserves.reserve0).toFixed(2)} / {parseFloat(reserves.reserve1).toFixed(2)}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token A Amount (Balance: {parseFloat(balanceA).toFixed(2)})
          </label>
          <input
            type="number"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
            placeholder="0.0"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token B Amount (Balance: {parseFloat(balanceB).toFixed(2)})
          </label>
          <input
            type="number"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
            placeholder="0.0"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          onClick={addLiquidity}
          disabled={loading || !account || !amountA || !amountB}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? "Processing..." : "Add Liquidity"}
        </button>
      </div>
    </div>
  );
};

export default AddLiquidity;
