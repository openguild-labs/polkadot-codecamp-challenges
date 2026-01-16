import TokenBridge from "@/components/token-bridge";
import SigpassKit from "@/components/sigpasskit";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto min-h-screen items-center justify-center p-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Hyperbridge</h1>
        <p className="text-sm text-muted-foreground">
          Cross-chain USDC bridge powered by Polkadot
        </p>
      </div>

      {/* Wallet */}
      <SigpassKit />

      {/* Bridge */}
      <TokenBridge />

      {/* Quick Links */}
      <div className="flex items-center gap-4 text-sm">
        <Link
          href="/faucet"
          className="flex items-center gap-1 underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Get test USDC <ArrowRight className="w-3 h-3" />
        </Link>
        <a
          href="https://explorer.hyperbridge.network"
          target="_blank"
          className="flex items-center gap-1 underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          Explorer <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
