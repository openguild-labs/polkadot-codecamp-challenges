"use client";

import { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import Faucet from "./components/Faucet";
import ShowAllPools from "./components/ShowAllPools";
import CreatePool from "./components/CreatePool";
import AddLiquidity from "./components/AddLiquidity";
import RemoveLiquidity from "./components/RemoveLiquidity";

type TabType = "faucet" | "pools" | "create" | "add" | "remove";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("faucet");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleConnect = (connectedAccount: string) => {
    setAccount(connectedAccount);
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const tabs: { id: TabType; label: string; color: string }[] = [
    { id: "faucet", label: "Faucet", color: "green" },
    { id: "pools", label: "Pools", color: "blue" },
    { id: "create", label: "Create Pool", color: "purple" },
    { id: "add", label: "Add Liquidity", color: "orange" },
    { id: "remove", label: "Remove Liquidity", color: "red" },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black flex flex-col items-center gap-6 py-10 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Uniswap V2 DEX
        </h1>
        <p className="text-gray-500">Paseo Asset Hub Testnet</p>
      </div>

      <WalletConnect onConnect={handleConnect} />

      {account && (
        <>
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 w-full max-w-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-500 text-white shadow-md`
                    : `bg-white text-gray-600 hover:bg-gray-100 border border-gray-200`
                }`}
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor:
                          tab.color === "green"
                            ? "#22c55e"
                            : tab.color === "blue"
                            ? "#3b82f6"
                            : tab.color === "purple"
                            ? "#a855f7"
                            : tab.color === "orange"
                            ? "#f97316"
                            : "#ef4444",
                      }
                    : {}
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-full flex justify-center">
            {activeTab === "faucet" && (
              <Faucet account={account} onSuccess={handleRefresh} />
            )}
            {activeTab === "pools" && (
              <ShowAllPools refreshTrigger={refreshTrigger} />
            )}
            {activeTab === "create" && (
              <CreatePool account={account} onSuccess={handleRefresh} />
            )}
            {activeTab === "add" && (
              <AddLiquidity account={account} onSuccess={handleRefresh} />
            )}
            {activeTab === "remove" && (
              <RemoveLiquidity account={account} onSuccess={handleRefresh} />
            )}
          </div>
        </>
      )}

      {!account && (
        <div className="text-center text-gray-500 mt-8">
          <p>Please connect your wallet to use the DEX</p>
        </div>
      )}

      {/* Contract Info */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-md">
        <h3 className="font-semibold text-gray-700 mb-2">Contract Addresses</h3>
        <div className="text-xs text-gray-500 space-y-1 font-mono">
          <p>Factory: 0x2B437a99303752D61d94dce066F1f11400D4dD22</p>
          <p>Token A: 0x804892Bd4A820208c57f53a327CA179E12E01170</p>
          <p>Token B: 0x890fab1f9c5154Eefcfd3FB90aAd5100e0b6FCa6</p>
          <p>Pair: 0x4a28ED6ae9213fA78e16284537950A6071112613</p>
        </div>
        <div className="mt-3 text-xs text-gray-400">
          <p>Network: Paseo Asset Hub (Chain ID: 420420422)</p>
        </div>
      </div>
    </section>
  );
}
