"use client";

import React, { useState, useEffect, useCallback } from "react";
import { publicClient, getWalletClient } from "../utils/viem";
import { FactoryABI, PairABI, ERC20ABI, FACTORY_ADDRESS } from "../utils/contract";
import { parseEther, formatEther } from "viem";
import { PoolInfo, TokenInfo } from "../hooks/usePools";

interface SwapProps {
  account: string | null;
  pools: PoolInfo[];
  tokens: TokenInfo[];
}

const Swap: React.FC<SwapProps> = ({ account, pools, tokens }) => {
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [amountIn, setAmountIn] = useState("");
  const [estimatedOut, setEstimatedOut] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [estimating, setEstimating] = useState(false);

  const getAmountOut = (amountInWei: bigint, reserveIn: bigint, reserveOut: bigint): bigint => {
    const amountInWithFee = amountInWei * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;
    return numerator / denominator;
  };

  // Get available "out" tokens based on selected "in" token (only tokens with an existing pool)
  const getAvailableOutTokens = (): TokenInfo[] => {
    if (!tokenIn) return tokens;
    const outAddrs = new Set<string>();
    for (const pool of pools) {
      if (pool.token0.address.toLowerCase() === tokenIn.toLowerCase()) {
        outAddrs.add(pool.token1.address.toLowerCase());
      } else if (pool.token1.address.toLowerCase() === tokenIn.toLowerCase()) {
        outAddrs.add(pool.token0.address.toLowerCase());
      }
    }
    return tokens.filter((t) => outAddrs.has(t.address.toLowerCase()));
  };

  const estimateOutput = useCallback(async () => {
    if (!tokenIn || !tokenOut || !amountIn || parseFloat(amountIn) <= 0) {
      setEstimatedOut("");
      return;
    }

    try {
      setEstimating(true);
      const pairAddress = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "getPair",
        args: [tokenIn as `0x${string}`, tokenOut as `0x${string}`],
      }) as `0x${string}`;

      if (pairAddress === "0x0000000000000000000000000000000000000000") {
        setEstimatedOut("No pool exists");
        return;
      }

      const reserves = await publicClient.readContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "getReserves",
      }) as [bigint, bigint, number];

      const token0 = await publicClient.readContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "token0",
      }) as `0x${string}`;

      const amountInWei = parseEther(amountIn);
      let amountOutWei: bigint;

      if (tokenIn.toLowerCase() === token0.toLowerCase()) {
        amountOutWei = getAmountOut(amountInWei, reserves[0], reserves[1]);
      } else {
        amountOutWei = getAmountOut(amountInWei, reserves[1], reserves[0]);
      }

      setEstimatedOut(formatEther(amountOutWei));
    } catch (err) {
      console.error("Estimate error:", err);
      setEstimatedOut("Error estimating");
    } finally {
      setEstimating(false);
    }
  }, [tokenIn, tokenOut, amountIn]);

  // Auto-estimate with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      estimateOutput();
    }, 500);
    return () => clearTimeout(timer);
  }, [estimateOutput]);

  // Reset tokenOut when tokenIn changes to avoid invalid pairs
  const handleTokenInChange = (addr: string) => {
    setTokenIn(addr);
    if (addr === tokenOut) setTokenOut("");
  };

  const handleSwap = async () => {
    if (!account) {
      setStatus({ type: "error", message: "Connect your wallet first" });
      return;
    }
    if (!tokenIn || !tokenOut || !amountIn) {
      setStatus({ type: "error", message: "Fill in all fields" });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "info", message: "Getting pair info..." });

      const pairAddress = await publicClient.readContract({
        address: FACTORY_ADDRESS,
        abi: FactoryABI,
        functionName: "getPair",
        args: [tokenIn as `0x${string}`, tokenOut as `0x${string}`],
      }) as `0x${string}`;

      if (pairAddress === "0x0000000000000000000000000000000000000000") {
        setStatus({ type: "error", message: "No pool exists for this pair" });
        return;
      }

      const reserves = await publicClient.readContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "getReserves",
      }) as [bigint, bigint, number];

      const token0 = await publicClient.readContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "token0",
      }) as `0x${string}`;

      const amountInWei = parseEther(amountIn);
      let amount0Out = 0n;
      let amount1Out = 0n;

      if (tokenIn.toLowerCase() === token0.toLowerCase()) {
        amount1Out = getAmountOut(amountInWei, reserves[0], reserves[1]);
      } else {
        amount0Out = getAmountOut(amountInWei, reserves[1], reserves[0]);
      }

      const walletClient = await getWalletClient();

      // Approve token transfer
      setStatus({ type: "info", message: "Approving token transfer..." });
      const approveTx = await walletClient.writeContract({
        address: tokenIn as `0x${string}`,
        abi: ERC20ABI,
        functionName: "approve",
        args: [pairAddress, amountInWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: approveTx });

      // Transfer tokens to pair
      setStatus({ type: "info", message: "Transferring tokens to pair..." });
      const transferTx = await walletClient.writeContract({
        address: tokenIn as `0x${string}`,
        abi: ERC20ABI,
        functionName: "transfer",
        args: [pairAddress, amountInWei],
      });
      await publicClient.waitForTransactionReceipt({ hash: transferTx });

      // Execute swap
      setStatus({ type: "info", message: "Executing swap..." });
      const swapTx = await walletClient.writeContract({
        address: pairAddress,
        abi: PairABI,
        functionName: "swap",
        args: [amount0Out, amount1Out, account as `0x${string}`, "0x"],
      });
      await publicClient.waitForTransactionReceipt({ hash: swapTx });

      setStatus({ type: "success", message: "Swap successful!" });
      setAmountIn("");
      setEstimatedOut("");
    } catch (err: any) {
      console.error("Swap error:", err);
      setStatus({ type: "error", message: err.message || "Swap failed" });
    } finally {
      setLoading(false);
    }
  };

  const getTokenSymbol = (addr: string): string => {
    const token = tokens.find((t) => t.address.toLowerCase() === addr.toLowerCase());
    return token ? token.symbol : "";
  };

  const availableOutTokens = getAvailableOutTokens();

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">Swap Tokens</h2>

      <div className="space-y-3">
        {/* Token In */}
        <div className="bg-background border border-card-border rounded-xl p-4 space-y-2">
          <label className="text-xs text-gray-400 block">You Pay</label>
          <select
            value={tokenIn}
            onChange={(e) => handleTokenInChange(e.target.value)}
            className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">-- Select token --</option>
            {tokens.map((token) => (
              <option key={token.address} value={token.address}>
                {token.symbol} ({token.address.slice(0, 6)}...{token.address.slice(-4)})
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="0.0"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              const tmpIn = tokenIn;
              const tmpOut = tokenOut;
              setTokenIn(tmpOut);
              setTokenOut(tmpIn);
              setAmountIn("");
              setEstimatedOut("");
            }}
            className="bg-background border border-card-border rounded-lg p-2 text-accent hover:bg-card-bg transition cursor-pointer"
          >
            ↕
          </button>
        </div>

        {/* Token Out */}
        <div className="bg-background border border-card-border rounded-xl p-4 space-y-2">
          <label className="text-xs text-gray-400 block">You Receive</label>
          <select
            value={tokenOut}
            onChange={(e) => setTokenOut(e.target.value)}
            className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent appearance-none cursor-pointer"
          >
            <option value="">-- Select token --</option>
            {availableOutTokens
              .filter((t) => t.address.toLowerCase() !== tokenIn.toLowerCase())
              .map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol} ({token.address.slice(0, 6)}...{token.address.slice(-4)})
                </option>
              ))}
          </select>
          <div className="w-full p-3 bg-card-bg border border-card-border rounded-xl text-white text-sm min-h-[46px] flex items-center">
            {estimating ? (
              <span className="text-gray-500">Estimating...</span>
            ) : estimatedOut ? (
              <span>{estimatedOut}</span>
            ) : (
              <span className="text-gray-500">—</span>
            )}
          </div>
        </div>
      </div>

      {tokenIn && tokenOut && estimatedOut && estimatedOut !== "No pool exists" && estimatedOut !== "Error estimating" && (
        <div className="text-xs text-gray-400 text-center">
          1 {getTokenSymbol(tokenIn)} ≈ {(parseFloat(estimatedOut) / parseFloat(amountIn || "1")).toFixed(4)} {getTokenSymbol(tokenOut)}
          <span className="ml-2">(0.3% fee included)</span>
        </div>
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
        onClick={handleSwap}
        disabled={loading || !account || !tokenIn || !tokenOut}
        className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition"
      >
        {loading ? "Swapping..." : !account ? "Connect Wallet" : !tokenIn || !tokenOut ? "Select Tokens" : "Swap"}
      </button>
    </div>
  );
};

export default Swap;
