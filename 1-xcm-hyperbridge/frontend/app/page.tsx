"use client";

import { MetaMaskButton } from "../src/components/MetamaskButton";
import { BridgeForm } from "../src/components/BridgeForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Pastel Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-pink-200/40 rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar Area */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2"></div>
        <MetaMaskButton />
      </div>

      {/* Form Area */}
      <div className="z-10 w-full flex justify-center px-4 mt-10">
        <BridgeForm />
      </div>
    </main>
  );
}
