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
    <nav className="flex items-center justify-between p-6 border-b-2 border-black max-w-5xl mx-auto w-full bg-white">

      <div className="flex gap-8 text-xl">
        {["Swap", "Faucet"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`cursor-pointer hover:underline decoration-double px-2 py-1 ${activeTab === tab.toLowerCase() ? "font-bold underline sketch-marker" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <WalletConnect onConnect={handleConnect} />
    </nav>
  )
}
