"use client";

import { useEffect } from "react";
import { BridgeInterface } from "@/components/bridge-interface";
import { SeascapeBackground } from "@/components/seascape-background";
import { MetaMaskButton } from "@/components/Wallet/WalletButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-200 overflow-hidden relative">
      <MetaMaskButton />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <BridgeInterface />
      </div>
    </main>
  );
}
