"use client";

import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import CreatePool from "./components/CreatePool";
import AddLiquidity from "./components/AddLiquidity";
import RemoveLiquidity from "./components/RemoveLiquidity";
import Swap from "./components/Swap";
import AllPools from "./components/AllPools";
import Faucet from "./components/Faucet";
import { usePools } from "./hooks/usePools";

type Tab = "swap" | "pools" | "create" | "add" | "remove" | "faucet";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("swap");
  const { pools, tokens, loading: poolsLoading, refetch: refetchPools } = usePools();

  const handleConnect = (connectedAccount: string) => {
    setAccount(connectedAccount);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "swap", label: "Swap" },
    { id: "pools", label: "Pools" },
    { id: "create", label: "Create Pool" },
    { id: "add", label: "Add Liquidity" },
    { id: "remove", label: "Remove Liquidity" },
    { id: "faucet", label: "Faucet" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-card-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-accent">UniswapV2 DEX</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 bg-card-bg px-2 py-1 rounded">
              Polkadot Hub Testnet
            </span>
            <WalletConnect onConnect={handleConnect} />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-card-border">
        <div className="max-w-6xl mx-auto flex gap-1 px-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-accent border-b-2 border-accent"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 py-8">
        {activeTab === "swap" && <Swap account={account} pools={pools} tokens={tokens} />}
        {activeTab === "pools" && <AllPools pools={pools} loading={poolsLoading} refetch={refetchPools} />}
        {activeTab === "create" && <CreatePool account={account} onPoolCreated={refetchPools} />}
        {activeTab === "add" && <AddLiquidity account={account} pools={pools} />}
        {activeTab === "remove" && <RemoveLiquidity account={account} pools={pools} />}
        {activeTab === "faucet" && <Faucet account={account} />}
      </div>
    </main>
  );
}
