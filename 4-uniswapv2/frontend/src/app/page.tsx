"use client";

import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import ReadContract from "./components/ReadContract";
import WriteContract from "./components/WriteContract";
import { Navbar } from "./components/Navbar";
import { PoolAndLiquidity } from "./components/PoolAndLiquidity";
import { Faucet } from "./components/Faucet";
import { SwapCard } from "./components/SwapCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("swap")
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pb-20">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 80%, #06b6d4 0%, transparent 50%)" }}
      />

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative z-10">
        {activeTab === "swap" && <SwapCard />}
        {activeTab === "pool" && <PoolAndLiquidity />}
        {activeTab === "faucet" && <Faucet />}
      </div>

    </main>
  );
}
