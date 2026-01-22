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
    <main className="min-h-screen bg-white pb-20">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
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
