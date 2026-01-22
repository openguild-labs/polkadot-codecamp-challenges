"use client";

import "./globals.css";
import { MetaMaskButton } from "../components/MetamaskButton";
import { useApprove } from "../hooks/useApprove";
import { useBridge } from "../hooks/useBridge";
import { useState } from "react";
import { useMetaMask } from "../hooks/useMetamask";

export default function Home() {
  // "Lấy" handleBridge ra từ hook
  const { approveToken, isApproving } = useApprove();
  const { bridgeTokens, loading } = useBridge();
  const [amount, setAmount] = useState("");
  const { switchChain, chainId } = useMetaMask();

  const onButtonClick = async () => {
    if (!amount || Number(amount) <= 0) return alert("Vui lòng nhập số lượng!");

    try {
      // Bước 1: Chuyển mạng
      await switchChain("0xaa36a7");

      const token = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
      const symbol = "USD.h";
      const destChainId = 11155111;

      // ĐỊA CHỈ BRIDGE (Phải là địa chỉ 42 ký tự của contract)
      const bridgeAddress = "0xec373e79fe65b09117e7a80058fd42c51f7e3289";

      // Bước 2: Gọi Approve (Đợi cho đến khi giao dịch trên blockchain thành công)
      console.log("Đang Approve...");
      await approveToken(token, bridgeAddress, amount);

      // Bước 3: Gọi Bridge
      console.log("Đang Bridge...");
      await bridgeTokens({ token, symbol, amount, destChainId });

      alert("Bridge thành công!");
    } catch (error: any) {
      console.error("Lỗi:", error);
      alert("Bridge thành công!");
    }
  };

  return (
    <main className="min-h-screen bg-[#e0f7fa] flex flex-col items-center p-6 md:p-12 font-sans text-black">
      {/* Header: Logo và Nút Connect */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
          OPEN GUILD <span className="text-gray-500 font-bold">BRIDGE</span>
        </h1>
        <MetaMaskButton />
      </div>

      {/* Bridge Card - Neo-Brutalism Style */}
      <div className="bg-white border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 w-full max-w-xl">
        {/* FROM - TO Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          {/* Network From */}
          <div className="w-full border-2 border-black rounded-2xl p-4 bg-white relative">
            <p className="text-[10px] font-black text-black uppercase mb-1">
              From
            </p>
            <div className="font-extrabold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full border border-black flex items-center justify-center text-[10px]">
                  B
                </div>
                BNB Chain Testnet
              </div>
              <span>▼</span>
            </div>
          </div>

          {/* Switch Button */}
          <button className="bg-yellow-400 border-2 border-black rounded-full p-2 hover:rotate-180 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 3l4 4-4 4M8 21l-4-4 4-4M20 7H4M4 17h16" />
            </svg>
          </button>

          {/* Network To */}
          <div className="w-full border-2 border-black rounded-2xl p-4 bg-white">
            <p className="text-[10px] font-black text-black uppercase mb-1">
              To
            </p>
            <div className="font-extrabold flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full border border-black flex items-center justify-center text-[10px]">
                  E
                </div>
                Ethereum Sepolia
              </div>
              <span>▼</span>
            </div>
          </div>
        </div>

        {/* AMOUNT Section */}
        <div className="border-2 border-black rounded-2xl p-4 mb-8 bg-white">
          <p className="text-[10px] font-black text-black uppercase mb-2">
            Amount
          </p>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 border-2 border-black rounded-xl px-3 py-2 bg-gray-50 min-w-[120px]">
              <div className="w-5 h-5 bg-blue-500 rounded-full border border-black text-[8px] text-white flex items-center justify-center font-bold">
                $
              </div>
              <span className="font-black text-sm">USDh</span>
              <span className="ml-auto">▼</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              className="text-3xl font-black text-right outline-none w-full bg-transparent placeholder-gray-300"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4 items-center">
            <span className="text-xs font-bold text-black">Balance: 6.94</span>
            <div className="flex gap-1">
              {["25%", "50%", "75%", "Max"].map((p) => (
                <button
                  key={p}
                  className="text-[10px] font-bold border-2 border-black rounded-full px-3 py-1 bg-gray-100 hover:bg-yellow-200 transition-colors uppercase"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-[10px] font-black uppercase mb-2">
            <span>Transaction Progress</span>
            <span>0%</span>
          </div>
          <div className="w-full h-5 bg-gray-100 border-2 border-black rounded-full overflow-hidden p-0.5">
            <div className="w-[0%] h-full bg-emerald-400 rounded-full border-r border-black"></div>
          </div>
        </div>

        {/* ACTION Button */}
        <button
          className={`w-full py-4 rounded-2xl font-black text-xl uppercase border-[3px] border-black transition-all
            ${
              loading || isApproving || !amount
                ? "bg-gray-300 shadow-none cursor-not-allowed"
                : "bg-[#fff176] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none"
            }`}
          onClick={onButtonClick}
          disabled={loading || isApproving || !amount}
        >
          {isApproving
            ? "1/2 Approving..."
            : loading
            ? "2/2 Bridging..."
            : "Bridge Now"}
        </button>
      </div>
    </main>
  );
}
