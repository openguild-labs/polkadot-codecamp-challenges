"use client";

import { useState } from "react";
import { ethers } from "ethers";
import TOKEN_BRIDGE from "../abi/TokenBridge.json";

const TOKEN_BRIDGE_CONTRACT_ADDRESS =
  "0x6a7EDD974851055367763B92fec281d118E54e90";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

export function useBridge() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<any>(null);

  const bridgeTokens = async ({
    token,
    symbol,
    amount,
    destChainId,
  }: {
    token: string;
    symbol: string;
    amount: string;
    destChainId: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setReceipt(null);

      if (!window.ethereum) throw new Error("No crypto wallet found!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const amountParsed = ethers.parseUnits(amount, 18);
      const recipient = await signer.getAddress();
      const destChain = ethers.toUtf8Bytes(`EVM-${destChainId}`);

      const tokenContract = new ethers.Contract(token, ERC20_ABI, signer);

      console.log("Checking allowance...");
      console.log("Approving token...");
      const approveTx = await tokenContract.approve(
        TOKEN_BRIDGE_CONTRACT_ADDRESS,
        amountParsed,
      );
      await approveTx.wait();
      console.log("Approve confirmed!");

      const bridgeContract = new ethers.Contract(
        TOKEN_BRIDGE_CONTRACT_ADDRESS,
        TOKEN_BRIDGE.abi,
        signer,
      );

      console.log("Bridging tokens...");
      const tx = await bridgeContract.bridgeTokens(
        token,
        symbol,
        amountParsed,
        recipient,
        destChain,
        { value: 0 },
      );

      console.log("Tx Sent:", tx.hash);
      const txReceipt = await tx.wait();
      setReceipt(txReceipt);

      return txReceipt;
    } catch (err: any) {
      console.error("Bridge Error:", err);
      const errorMessage =
        err.reason || err.message || "Unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bridgeTokens, loading, error, receipt };
}
