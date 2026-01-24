'use client'

import { WalletConnect } from "@/components/wallet-connect";
import { BridgeForm } from "@/components/bridge-form";
import { TokenFaucet } from "@/components/token-faucet";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌉</span>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Hyperbridge
            </h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Cross-Chain Token Bridge
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Bridge your ERC20 tokens securely across chains using Hyperbridge's
            crypto-economic coprocessor for verified cross-chain transfers.
          </p>
        </div>

        {/* Token Faucet */}
        <TokenFaucet />

        {/* Bridge Form */}
        <BridgeForm />

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl mb-3">🔐</div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Cryptographically Secured
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Powered by Hyperbridge's crypto-economic coprocessor with verified
              consensus proofs.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Permissionless Relayers
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Decentralized relayer network ensures your transactions are
              delivered without trusted intermediaries.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Multi-Chain Support
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Bridge tokens between Ethereum, Polkadot parachains, and other
              supported networks.
            </p>
          </div>
        </div>

        {/* Supported Chains */}
        <div className="mt-12 text-center">
          <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">
            Supported Networks
          </h3>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
              <span>⟠</span>
              <span className="text-sm font-medium">Ethereum Sepolia</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800">
              <span>◉</span>
              <span className="text-sm font-medium">Paseo Asset Hub</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-zinc-500">
          <p>
            Built for Polkadot Codecamp Challenge 1 |
            Powered by <a href="https://hyperbridge.network" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">Hyperbridge</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
