"use client";

import React, { useState, useEffect } from "react";
import { polkadotHubTestnet } from "../utils/viem";

interface WalletConnectProps {
  onConnect: (account: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_accounts",
          })) as string[];
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            const chainIdHex = (await window.ethereum.request({
              method: "eth_chainId",
            })) as string;
            setChainId(parseInt(chainIdHex, 16));
            onConnect(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking connection:", err);
        }
      }
    };

    checkConnection();

    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0] || null);
        if (accounts[0]) onConnect(accounts[0]);
      };
      const handleChainChanged = (chainIdHex: string) => {
        setChainId(parseInt(chainIdHex, 16));
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [onConnect]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      setAccount(accounts[0]);
      const chainIdHex = (await window.ethereum.request({
        method: "eth_chainId",
      })) as string;
      const currentChainId = parseInt(chainIdHex, 16);
      setChainId(currentChainId);
      if (currentChainId !== polkadotHubTestnet.id) {
        await switchNetwork();
      }
      onConnect(accounts[0]);
    } catch (err) {
      console.error("Error connecting:", err);
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum!.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${polkadotHubTestnet.id.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum!.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${polkadotHubTestnet.id.toString(16)}`,
              chainName: polkadotHubTestnet.name,
              rpcUrls: [polkadotHubTestnet.rpcUrls.default.http[0]],
              nativeCurrency: polkadotHubTestnet.nativeCurrency,
            },
          ],
        });
      }
    }
  };

  if (!account) {
    return (
      <button
        onClick={connectWallet}
        className="bg-accent hover:bg-accent-hover text-white font-medium py-2 px-4 rounded-lg text-sm transition"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {chainId !== polkadotHubTestnet.id && (
        <button
          onClick={switchNetwork}
          className="bg-warning text-black font-medium py-2 px-3 rounded-lg text-xs transition"
        >
          Switch Network
        </button>
      )}
      <span className="text-xs font-mono bg-card-bg border border-card-border px-3 py-2 rounded-lg text-gray-300">
        {`${account.substring(0, 6)}...${account.substring(38)}`}
      </span>
    </div>
  );
};

export default WalletConnect;
