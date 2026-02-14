"use client";

import React, { useState, useEffect, useCallback } from "react";
import { publicClient, getWalletClient } from "../utils/viem";
import { PairABI, ERC20ABI } from "../utils/contract";
import { parseEther, formatEther } from "viem";
import { PoolInfo } from "../hooks/usePools";

interface AddLiquidityProps {
  account: string | null;
  pools: PoolInfo[];
}

const AddLiquidity: React.FC<AddLiquidityProps> = ({ account, pools }) => {
  const [selectedPool, setSelectedPool] = useState<PoolInfo | null>(null);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [reserves, setReserves] = useState<{ r0: bigint; r1: bigint } | null>(null);
  const [isFirstDeposit, setIsFirstDeposit] = useState(false);

  // Fetch reserves when pool is selected
  const fetchReserves = useCallback(async () => {
    if (!selectedPool) {
      setReserves(null);
      return;
    }

    try {
      const res = await publicClient.readContract({
        address: selectedPool.address,
        abi: PairABI,
        functionName: "getReserves",
      }) as [bigint, bigint, number];

      if (res[0] === 0n && res[1] === 0n) {
        setIsFirstDeposit(true);
        setReserves(null);
      } else {
        setIsFirstDeposit(false);
        setReserves({ r0: res[0], r1: res[1] });
      }
    } catch (err) {
      console.error("Error fetching reserves:", err);
      setReserves(null);
    }
  }, [selectedPool]);

  useEffect(() => {
    fetchReserves();
    setAmountA("");
    setAmountB("");
  }, [fetchReserves]);

  const handlePoolSelect = (index: string) => {
    if (index === "") {
      setSelectedPool(null);
      return;
    }
    setSelectedPool(pools[parseInt(index)]);
  };

  // Auto-calculate amountB when amountA changes
  const handleAmountAChange = (value: string) => {
    setAmountA(value);
    if (!reserves || !value || parseFloat(value) <= 0) {
      if (!isFirstDeposit) setAmountB("");
      return;
    }
    const amountAWei = parseEther(value);
    // token0 = pool.token0, so reserveA = r0, reserveB = r1
    const amountBWei = (amountAWei * reserves.r1) / reserves.r0;
    setAmountB(formatEther(amountBWei));
  };

  // Auto-calculate amountA when amountB changes
  const handleAmountBChange = (value: string) => {
    setAmountB(value);
    if (!reserves || !value || parseFloat(value) <= 0) {
      if (!isFirstDeposit) setAmountA("");
      return;
    }
    const amountBWei = parseEther(value);
    const amountAWei = (amountBWei * reserves.r0) / reserves.r1;
    setAmountA(formatEther(amountAWei));
  };

  const handleAddLiquidity = async () => {
    if (!account) {
      setStatus({ type: "error", message: "Connect your wallet first" });
      return;
    }
    if (!selectedPool || !amountA || !amountB) {
      setStatus({ type: "error", message: "Select a pool and fill in amounts" });
      return;
    }

    try {
      setLoading(true);
      const walletClient = await getWalletClient();
      const pairAddress = selectedPool.address;
      const token0Addr = selectedPool.token0.address;
      const token1Addr = selectedPool.token1.address;
      const amount0Wei = parseEther(amountA);
      const amount1Wei = parseEther(amountB);

      // Approve token0
      setStatus({ type: "info", message: `Approving ${selectedPool.token0.symbol}...` });
      const approve0 = await walletClient.writeContract({
        address: token0Addr,
        abi: ERC20ABI,
        functionName: "approve",
        args: [pairAddress, amount0Wei],
      });
      await publicClient.waitForTransactionReceipt({ hash: approve0 });

      // Approve token1
      setStatus({ type: "info", message: `Approving ${selectedPool.token1.symbol}...` });
      const approve1 = await walletClient.writeContract({
        address: token1Addr,
        abi: ERC20ABI,
        functionName: "approve",
        args: [pairAddress, amount1Wei],
      });
      await publicClient.waitForTransactionReceipt({ hash: approve1 });

      // Transfer token0 to pair
      setStatus({ type: "info", message: `Transferring ${selectedPool.token0.symbol} to pair...` });
      const tx0 = await walletClient.writeContract({
        address: token0Addr,
        abi: ERC20ABI,
        functionName: "transfer",
        args: [pairAddress, amount0Wei],
      });
      await publicClient.waitForTransactionReceipt({ hash: tx0 });

      // Transfer token1 to pair
      setStatus({ type: "info", message: `Transferring ${selectedPool.token1.symbol} to pair...` });
      const tx1 = await walletClient.writeContract({
        address: token1Addr,
        abi: ERC20ABI,
        functionName: "transfer",
        args: [pairAddress, amount1Wei],
      });
      await publicClient.waitForTransactionReceipt({ hash: tx1 });

      // Mint LP tokens
      setStatus({ type: "info", message: "Minting LP tokens..." });
      const mintTx = await walletClient.writeContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "mint",
        args: [account as `0x${string}`],
      });
      await publicClient.waitForTransactionReceipt({ hash: mintTx });

      // Get LP balance
      const lpBalance = await publicClient.readContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "balanceOf",
        args: [account as `0x${string}`],
      }) as bigint;

      setStatus({
        type: "success",
        message: `Liquidity added! LP tokens: ${formatEther(lpBalance)}`,
      });
      setAmountA("");
      setAmountB("");
      await fetchReserves();
    } catch (err: any) {
      console.error("Add liquidity error:", err);
      setStatus({ type: "error", message: err.message || "Failed to add liquidity" });
    } finally {
      setLoading(false);
    }
  };

  const shortenAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">Add Liquidity</h2>
      <p className="text-sm text-gray-400">Provide tokens to a pool and earn LP tokens.</p>

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
          {isFirstDeposit && (
            <div className="p-3 bg-blue-900/30 text-blue-400 rounded-xl text-sm">
              First deposit — you set the initial price. Enter any amounts you want.
            </div>
          )}

          {reserves && (
            <div className="p-3 bg-blue-900/30 text-blue-400 rounded-xl text-sm">
              Current ratio: 1 {selectedPool.token0.symbol} = {(parseFloat(selectedPool.reserve1) / parseFloat(selectedPool.reserve0)).toFixed(4)} {selectedPool.token1.symbol}. Amounts auto-calculated.
            </div>
          )}

          <div className="space-y-3">
            <div className="bg-background border border-card-border rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">{selectedPool.token0.symbol}</span>
                <span className="text-xs font-mono text-gray-400">{shortenAddr(selectedPool.token0.address)}</span>
              </div>
              <input
                type="number"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => handleAmountAChange(e.target.value)}
                className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex justify-center">
              <div className="bg-background border border-card-border rounded-lg p-2 text-accent">+</div>
            </div>

            <div className="bg-background border border-card-border rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  {selectedPool.token1.symbol}
                  {reserves ? " (auto)" : ""}
                </span>
                <span className="text-xs font-mono text-gray-400">{shortenAddr(selectedPool.token1.address)}</span>
              </div>
              <input
                type="number"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => handleAmountBChange(e.target.value)}
                className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </>
      )}

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
        onClick={handleAddLiquidity}
        disabled={loading || !account || !selectedPool}
        className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition"
      >
        {loading ? "Adding..." : !account ? "Connect Wallet" : !selectedPool ? "Select a Pool" : "Add Liquidity"}
      </button>
    </div>
  );
};

export default AddLiquidity;
