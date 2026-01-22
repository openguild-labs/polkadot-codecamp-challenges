"use client";

import { useMetaMask } from "../hooks/useMetaMask";
import Image from "next/image";

export function MetaMaskButton() {
  const { account, connectWallet, disconnectWallet } = useMetaMask();

  return (
    <div className="fixed top-6 right-6 z-50">
      {account ? (
        <div className="h-12 w-60 px-5 py-3 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-2xl border-3 border-black text-emerald-900 font-black text-center select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 w-full">
            <span className="text-lg">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                alt="MetaMask"
                width={24}
                height={24}
                className="inline-block align-middle"
                unoptimized
              />
            </span>
            <span>
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
            <button
              onClick={disconnectWallet}
              title="Disconnect"
              className="ml-2 p-1 rounded-full bg-gray-200 hover:bg-red-400 border border-gray-300 hover:border-red-400 transition-colors group"
              style={{ lineHeight: 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-500 group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="h-12 w-60 group px-7 py-3 bg-gradient-to-br from-sky-200 to-sky-300 rounded-2xl border-3 border-black font-black text-black text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:from-sky-300 hover:to-sky-400 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-200 flex items-center justify-center"
        >
          <span>CONNECT WALLET</span>
        </button>
      )}
    </div>
  );
}
