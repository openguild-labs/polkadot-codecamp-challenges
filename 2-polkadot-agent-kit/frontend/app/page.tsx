import Image from "next/image";
import WalletConnect from "@/components/WalletConnect";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 w-full flex justify-between items-center max-w-5xl">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Polkadot Agent Kit</h1>
        </div>
        <WalletConnect />
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <ChatInterface />

        <div className="text-center text-sm text-gray-500 max-w-md">
          <p>Try saying: "My address is...", "Stake 5 DOT", or "Unbond 2 DOT".</p>
          <p className="mt-2 text-xs opacity-70">Powered by Polkadot Agent Kit & LunoKit</p>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://cocdap.github.io/agent-docs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </footer>
    </div>
  );
}
