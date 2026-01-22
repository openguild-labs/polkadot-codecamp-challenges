"use client"

import { useState } from "react";
import { useBridge } from "@/hooks/useBridge";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { useMetaMask } from "@/hooks/useMetaMask";
import { MetaMaskButton } from "@/components/MetaMaskButton";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { TransactionStatus } from "@/components/TransactionStatus";
import { FundBridge } from "@/components/FundBridge";
import { SOURCE_CHAIN, DESTINATION_CHAIN, DEFAULT_TOKEN_SYMBOL } from "@/constants/chains";
import { debugTokenInfo } from "@/utils/tokenDebug";

export default function Home() {
  const { account } = useMetaMask();
  const { bridgeTokens, loading, error, receipt, stage } = useBridge();
  
  // State for form inputs
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbol, setSymbol] = useState(DEFAULT_TOKEN_SYMBOL);
  const [amount, setAmount] = useState("1");
  
  const { balance, loading: balanceLoading, symbol: detectedSymbol, decimals } = useTokenBalance(tokenAddress);

  const handleDebugToken = async () => {
    if (tokenAddress) {
      await debugTokenInfo(tokenAddress);
    } else {
      alert("Please enter a token address first");
    }
  };

  const handleBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }
    
    if (!tokenAddress || !tokenAddress.startsWith("0x")) {
      alert("Please enter a valid token address");
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    try {
      await bridgeTokens({
        token: tokenAddress,
        symbol: detectedSymbol || symbol,
        amount,
        destChainId: parseInt(DESTINATION_CHAIN.chainId),
      });
    } catch (err) {
      // Error is handled in hook
    }
  };

  const handleMaxClick = () => {
    if (balance) {
      setAmount(balance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <MetaMaskButton />
      <FundBridge />
      
      <main className="w-full max-w-lg mt-16 space-y-4">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Hyperbridge Token Bridge</h1>
              <p className="text-emerald-50 text-sm">Transfer USD.h tokens across chains</p>
            </div>
          </div>
          
          {/* Network Info */}
          <div className="p-6 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-2xl mb-2 shadow-lg">
                  {SOURCE_CHAIN.icon}
                </div>
                <p className="text-sm font-semibold text-gray-700">{SOURCE_CHAIN.shortName}</p>
                <p className="text-xs text-gray-500">Source Chain</p>
              </div>
              
              <div className="flex items-center justify-center px-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <div className="flex-1 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl mb-2 shadow-lg">
                  {DESTINATION_CHAIN.icon}
                </div>
                <p className="text-sm font-semibold text-gray-700">{DESTINATION_CHAIN.shortName}</p>
                <p className="text-xs text-gray-500">Destination Chain</p>
              </div>
            </div>
            
            {account && <NetworkSwitcher />}
          </div>
          
          <form onSubmit={handleBridge} className="p-6 space-y-5">
            {/* Token Address Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Token Address
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="0x..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-black bg-white placeholder-gray-400"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleDebugToken}
                  className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-xl transition-all"
                  title="Debug Token Info (check console)"
                >
                  🔍
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                Enter the USD.h token contract address on {SOURCE_CHAIN.shortName}
              </p>
            </div>

            {/* Token Balance Display */}
            {tokenAddress && account && (
              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Your Balance</p>
                    <p className="text-lg font-bold text-gray-900">
                      {balanceLoading ? (
                        <span className="text-gray-400">Loading...</span>
                      ) : balance ? (
                        <span>{parseFloat(balance).toFixed(4)} {detectedSymbol || symbol}</span>
                      ) : (
                        <span className="text-gray-400">Unable to fetch</span>
                      )}
                    </p>
                    {decimals && !balanceLoading && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Token decimals: {decimals}
                      </p>
                    )}
                  </div>
                  {balance && parseFloat(balance) > 0 && (
                    <button
                      type="button"
                      onClick={handleMaxClick}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      MAX
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Amount and Symbol Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="any"
                  placeholder="1.0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-black bg-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Symbol</label>
                <input
                  type="text"
                  placeholder="USD.h"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-black bg-white text-center font-bold"
                  value={detectedSymbol || symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  disabled={!!detectedSymbol}
                />
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
              <p className="text-xs text-purple-700 font-medium mb-1">Destination</p>
              <p className="text-sm font-semibold text-purple-900">{DESTINATION_CHAIN.name}</p>
              <p className="text-xs text-purple-600 mt-1">Chain ID: {DESTINATION_CHAIN.chainId}</p>
            </div>

            {/* Transaction Status */}
            <TransactionStatus loading={loading} error={error} receipt={receipt} stage={stage} />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !account}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform
                ${loading || !account
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                }`}
            >
              {!account ? (
                "Connect Wallet to Bridge"
              ) : loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Transaction
                </span>
              ) : (
                "Bridge Tokens"
              )}
            </button>
          </form>
        </div>
        
        {/* Info Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">
            Powered by <span className="font-semibold text-emerald-600">Hyperbridge Protocol</span>
          </p>
          <p className="text-xs text-gray-400">
            Secure cross-chain token transfers
          </p>
        </div>
      </main>
    </div>
  );
}
