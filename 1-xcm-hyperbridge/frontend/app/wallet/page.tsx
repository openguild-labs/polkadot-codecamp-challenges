"use client";
import SigpassKit from "@/components/sigpasskit";
import Link from "next/link";

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-8 max-w-[768px] mx-auto min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Wallet</h1>
      <SigpassKit />
    </div>
  );
}