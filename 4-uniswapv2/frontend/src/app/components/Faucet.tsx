"use client";

import React, { useState } from "react";
import { publicClient, getWalletClient } from "../utils/viem";
import { ERC20ABI, TOKEN_A_ADDRESS, TOKEN_B_ADDRESS } from "../utils/contract";
import { formatEther, parseEther } from "viem";

interface FaucetProps {
  account: string | null;
}

const Faucet: React.FC<FaucetProps> = ({ account }) => {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState({ tokenA: "", tokenB: "" });
  const [mintAmount, setMintAmount] = useState("1000");
  const [checkingBalances, setCheckingBalances] = useState(false);

  const checkBalances = async () => {
    if (!account) return;

    try {
      setCheckingBalances(true);
      setStatus({ type: "info", message: "Checking balances..." });

      const balA = await publicClient.readContract({
        address: TOKEN_A_ADDRESS,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: [account as `0x${string}`],
      }) as bigint;
      const balB = await publicClient.readContract({
        address: TOKEN_B_ADDRESS,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: [account as `0x${string}`],
      }) as bigint;

      setBalances({
        tokenA: formatEther(balA),
        tokenB: formatEther(balB),
      });
      setStatus({ type: "success", message: "Balances updated!" });
    } catch (err: any) {
      console.error("Balance check error:", err);
      setStatus({ type: "error", message: err.message || "Failed to check balances" });
    } finally {
      setCheckingBalances(false);
    }
  };

  const mintTokens = async (tokenAddress: `0x${string}`, tokenName: string) => {
    if (!account) {
      setStatus({ type: "error", message: "Connect your wallet first" });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "info", message: `Minting ${tokenName}...` });

      const walletClient = await getWalletClient();
      const amount = parseEther(mintAmount);

      const hash = await walletClient.writeContract({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "faucet",
        args: [account as `0x${string}`, amount],
      });

      setStatus({ type: "info", message: "Waiting for confirmation..." });
      await publicClient.waitForTransactionReceipt({ hash });

      setStatus({ type: "success", message: `Minted ${mintAmount} ${tokenName}!` });
      await checkBalances();
    } catch (err: any) {
      console.error("Mint error:", err);
      setStatus({ type: "error", message: err.message || "Mint failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-bg border border-card-border rounded-2xl p-6 space-y-4">
      <h2 className="text-lg font-bold text-white">Token Faucet</h2>
      <p className="text-sm text-gray-400">
        Mint test tokens for free. Anyone can call the faucet function.
      </p>

      {TOKEN_A_ADDRESS === "0x0000000000000000000000000000000000000000" ? (
        <div className="p-4 bg-warning/10 text-warning rounded-xl text-sm text-center">
          Token addresses not configured. Deploy contracts first and update addresses in contract.ts.
        </div>
      ) : (
        <>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Amount to Mint</label>
            <input
              type="number"
              placeholder="1000"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="w-full p-3 bg-background border border-card-border rounded-xl text-white text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="space-y-3">
            <div className="bg-background border border-card-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Token A (TKA)</span>
                <span className="text-xs font-mono text-gray-400">
                  {`${TOKEN_A_ADDRESS.slice(0, 6)}...${TOKEN_A_ADDRESS.slice(-4)}`}
                </span>
              </div>
              {balances.tokenA !== "" && (
                <div className="text-sm">
                  <span className="text-gray-400">Balance: </span>
                  <span className="text-white">{parseFloat(balances.tokenA).toFixed(4)}</span>
                </div>
              )}
              <button
                onClick={() => mintTokens(TOKEN_A_ADDRESS, "TKA")}
                disabled={loading || !account}
                className="w-full py-2 text-sm text-accent border border-accent rounded-xl hover:bg-accent-light transition disabled:opacity-50"
              >
                {loading ? "Minting..." : "Mint TKA"}
              </button>
            </div>

            <div className="bg-background border border-card-border rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">Token B (TKB)</span>
                <span className="text-xs font-mono text-gray-400">
                  {`${TOKEN_B_ADDRESS.slice(0, 6)}...${TOKEN_B_ADDRESS.slice(-4)}`}
                </span>
              </div>
              {balances.tokenB !== "" && (
                <div className="text-sm">
                  <span className="text-gray-400">Balance: </span>
                  <span className="text-white">{parseFloat(balances.tokenB).toFixed(4)}</span>
                </div>
              )}
              <button
                onClick={() => mintTokens(TOKEN_B_ADDRESS, "TKB")}
                disabled={loading || !account}
                className="w-full py-2 text-sm text-accent border border-accent rounded-xl hover:bg-accent-light transition disabled:opacity-50"
              >
                {loading ? "Minting..." : "Mint TKB"}
              </button>
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
        onClick={checkBalances}
        disabled={!account || checkingBalances}
        className="w-full bg-accent hover:bg-accent-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-bold py-3 rounded-xl transition"
      >
        {!account ? "Connect Wallet" : checkingBalances ? "Checking..." : "Check Balances"}
      </button>

      <div className="border-t border-card-border pt-4">
        <h3 className="text-sm font-bold text-white mb-2">Get PAS Test Tokens</h3>
        <p className="text-xs text-gray-400 mb-3">
          You need PAS tokens for gas fees. Get them from the Polkadot faucet:
        </p>
        <a
          href="https://faucet.polkadot.io/?parachain=1111"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 text-sm text-accent border border-accent rounded-xl hover:bg-accent-light transition"
        >
          Open Polkadot Faucet
        </a>
      </div>
    </div>
  );
};

export default Faucet;
