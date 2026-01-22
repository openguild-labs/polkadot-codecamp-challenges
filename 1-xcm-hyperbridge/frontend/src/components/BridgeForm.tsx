"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useBridge } from "../hooks/useBridge";
import { useMetaMask } from "../hooks/useMetaMask";

const USDH_ADDRESS = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
const DEST_CHAIN_ID = 11155111;

export function BridgeForm() {
  const { account } = useMetaMask();
  const { bridgeTokens, loading, receipt } = useBridge();

  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0.0");

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(
            USDH_ADDRESS,
            ["function balanceOf(address) view returns (uint256)"],
            provider,
          );
          const bal = await contract.balanceOf(account);
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          console.error("Lỗi lấy số dư:", e);
        }
      }
    };
    fetchBalance();
  }, [account, receipt]);

  const handleSetAmount = (percent: number) => {
    if (!balance) return;
    const maxVal = parseFloat(balance);
    const newVal = (maxVal * (percent / 100)).toFixed(2);
    setAmount(newVal);
  };

  const handleBridge = async () => {
    if (!account) return alert("Vui lòng kết nối ví trước!");
    if (!amount || parseFloat(amount) <= 0)
      return alert("Nhập số lượng hợp lệ!");

    try {
      await bridgeTokens({
        token: USDH_ADDRESS,
        symbol: "USD.h",
        amount: amount,
        destChainId: DEST_CHAIN_ID,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[480px] bg-white/80 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Bridge
        </h1>
      </div>

      {/* FROM - TO CARDS */}
      <div className="space-y-3 mb-6">
        {/* FROM */}
        <div className="group relative bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-3xl p-4 transition-all duration-300">
          <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider text-indigo-400 uppercase bg-white px-2 py-1 rounded-full shadow-sm">
            From
          </span>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2">
              {/* BNB Icon placeholder */}
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-xs">
                BNB
              </div>
            </div>
            <div>
              <h3 className="text-slate-800 font-bold text-lg">BNB Chain</h3>
              <p className="text-slate-500 text-xs font-medium">
                Testnet Network
              </p>
            </div>
          </div>
        </div>

        {/* ARROW DOWN (Floating) */}
        <div className="flex justify-center -my-5 relative z-10">
          <div className="bg-white p-2 rounded-full shadow-md border border-slate-100 text-slate-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </div>

        {/* TO */}
        <div className="group relative bg-pink-50/50 hover:bg-pink-50 border border-pink-100 rounded-3xl p-4 transition-all duration-300">
          <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider text-pink-400 uppercase bg-white px-2 py-1 rounded-full shadow-sm">
            To
          </span>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs">
                ETH
              </div>
            </div>
            <div>
              <h3 className="text-slate-800 font-bold text-lg">Sepolia</h3>
              <p className="text-slate-500 text-xs font-medium">
                Ethereum Testnet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* INPUT AMOUNT */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            You send
          </label>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
            <span>Balance:</span>
            <span className="text-slate-800">
              {parseFloat(balance).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full text-3xl font-bold text-slate-800 placeholder-slate-200 outline-none bg-transparent"
          />
          <div className="flex items-center gap-2 bg-slate-800 text-white px-3 py-1.5 rounded-xl shrink-0">
            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-slate-800"></div>
            <span className="text-sm font-bold">USD.h</span>
          </div>
        </div>

        {/* Percentage Buttons */}
        <div className="flex gap-2 mt-4">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              onClick={() => handleSetAmount(pct)}
              className="flex-1 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 text-xs font-bold rounded-lg transition-colors"
            >
              {pct === 100 ? "Max" : `${pct}%`}
            </button>
          ))}
        </div>
      </div>

      {/* PROGRESS & STATUS */}
      {receipt && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white">
            ✓
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-green-800 font-bold text-sm">
              Transfer Successful!
            </p>
            <a
              href={`https://testnet.bscscan.com/tx/${receipt.hash}`}
              target="_blank"
              className="text-green-600 text-xs underline truncate block"
            >
              View on Explorer
            </a>
          </div>
        </div>
      )}

      {/* MAIN BUTTON */}
      <button
        onClick={handleBridge}
        disabled={loading}
        className={`w-full py-5 rounded-2xl font-bold text-white text-lg shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98] ${
          loading
            ? "bg-slate-300 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Confirm Transfer"
        )}
      </button>
    </div>
  );
}
