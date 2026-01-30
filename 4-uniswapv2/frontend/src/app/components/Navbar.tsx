"use client"

import Image from "next/image"
import { useState } from "react"
import WalletConnect from "./WalletConnect";

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const [account, setAccount] = useState<string | null>(null);

    const handleConnect = (connectedAccount: string) => {
    setAccount(connectedAccount);
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-6 border-b border-purple-200 max-w-7xl mx-auto w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-purple-500 bg-gradient-to-br from-purple-100 to-blue-100">
          <Image src="/og-logo.png" alt="Uniswap V2" fill sizes="48px" className="object-contain" priority />
        </div>
        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Uniswap V2</span>
      </div>

      <div className="flex gap-8 text-lg">
        {["Swap", "Pool", "Faucet"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === tab.toLowerCase() ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg" : "text-gray-700 hover:bg-gray-100"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <WalletConnect onConnect={handleConnect} />
    </nav>
  )
}
