"use client";
import FaucetWriteContract from "@/components/faucet-write-contract";
import SigpassKit from "@/components/sigpasskit";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FaucetPage() {
  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto min-h-screen items-center justify-center p-4">
      {/* Back Link */}
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Bridge
      </Link>

      {/* Wallet */}
      <SigpassKit />

      {/* Faucet */}
      <FaucetWriteContract />
    </div>
  );
}
