"use client";

import React, { useState, useEffect } from "react";
import { publicClient, getWalletClient } from "../utils/viem";
import { PairABI } from "../utils/contract";
import { parseEther, formatEther } from "viem";
import { PoolInfo } from "../hooks/usePools";

interface RemoveLiquidityProps {
  account: string | null;
  pools: PoolInfo[];
}

const RemoveLiquidity: React.FC<RemoveLiquidityProps> = ({ account, pools }) => {
  const [selectedPool, setSelectedPool] = useState<PoolInfo | null>(null);
  const [lpAmount, setLpAmount] = useState("");
  const [lpBalance, setLpBalance] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const checkBalance = async () => {
    if (!account || !selectedPool) return;

    try {
      const balance = await publicClient.readContract({
        address: selectedPool.address,
        abi: PairABI,
        functionName: "balanceOf",
        args: [account as `0x${string}`],
      }) as bigint;

      setLpBalance(formatEther(balance));
    } catch (err) {
      console.error("Balance check error:", err);
    }
  };

  useEffect(() => {
    if (selectedPool && account) {
      checkBalance();
    } else {
      setLpBalance("");
    }
    setLpAmount("");
  }, [selectedPool, account]);

  const handlePoolSelect = (index: string) => {
    if (index === "") {
      setSelectedPool(null);
      return;
    }
    setSelectedPool(pools[parseInt(index)]);
  };

  const handleRemoveLiquidity = async () => {
    if (!account) {
      setStatus({ type: "error", message: "Connect your wallet first" });
      return;
    }
    if (!selectedPool || !lpAmount) {
      setStatus({ type: "error", message: "Select a pool and enter LP amount" });
      return;
    }

    try {
      setLoading(true);
      const walletClient = await getWalletClient();
      const lpAmountWei = parseEther(lpAmount);

      // Transfer LP tokens to the pair contract
      setStatus({ type: "info", message: "Transferring LP tokens to pair..." });
      const transferTx = await walletClient.writeContract({
        address: selectedPool.address,
        abi: PairABI,
        functionName: "transfer",
        args: [selectedPool.address, lpAmountWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: transferTx });

      // Burn LP tokens to get underlying tokens back
      setStatus({ type: "info", message: "Burning LP tokens..." });
      const burnTx = await walletClient.writeContract({
        address: selectedPool.address,
        abi: PairABI,
        functionName: "burn",
        args: [account as `0x${string}`],
      });
      await publicClient.waitForTransactionReceipt({ hash: burnTx });

      setStatus({ type: "success", message: "Liquidity removed successfully!" });
      setLpAmount("");
      await checkBalance();
    } catch (err: any) {
      console.error("Remove liquidity error:", err);
      setStatus({ type: "error", message: err.message || "Failed to remove liquidity" });
    } finally {
      setLoading(false);
    }
  };

  const shortenAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">Remove Liquidity</h2>
      <p className="text-sm text-gray-400">Burn LP tokens to withdraw your deposited tokens.</p>

      <div className="space-y-3">
        {/* Pool Selector */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Select Pool</label>
          <select
            value={selectedPool ? pools.indexOf(selectedPool).toString() : ""}
            onChange={(e) => handlePoolSelect(e.target.value)}
            className="w-full p-3 bg-background border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">-- Select a pool --</option>
            {pools.map((pool, index) => (
              <option key={pool.address} value={index.toString()}>
                {pool.token0.symbol} / {pool.token1.symbol} ({shortenAddr(pool.address)})
              </option>
            ))}
          </select>
        </div>

        {selectedPool && (
          <>
            {lpBalance !== "" && (
              <div className="p-3 bg-background border border-card-border rounded-xl text-sm">
                <span className="text-gray-400">Your LP Balance: </span>
                <span className="text-white font-mono">{parseFloat(lpBalance).toFixed(6)}</span>
                {parseFloat(lpBalance) > 0 && (
                  <button
                    onClick={() => setLpAmount(lpBalance)}
                    className="ml-2 text-xs text-accent hover:underline"
                  >
                    MAX
                  </button>
                )}
              </div>
            )}

            <div>
              <label className="text-xs text-gray-400 mb-1 block">LP Tokens to Burn</label>
              <input
                type="number"
                placeholder="0.0"
                value={lpAmount}
                onChange={(e) => setLpAmount(e.target.value)}
                className="w-full p-3 bg-background border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </>
        )}
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

      <button
        onClick={handleRemoveLiquidity}
        disabled={loading || !account || !selectedPool}
        className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition"
      >
        {loading ? "Removing..." : !account ? "Connect Wallet" : !selectedPool ? "Select a Pool" : "Remove Liquidity"}
      </button>
    </div>
  );
};

export default RemoveLiquidity;
