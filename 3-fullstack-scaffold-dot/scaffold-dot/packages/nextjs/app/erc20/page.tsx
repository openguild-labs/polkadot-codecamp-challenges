"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address, AddressInput, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ERC20Example: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // State for form inputs
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [mintTo, setMintTo] = useState<string>("");
  const [mintAmount, setMintAmount] = useState<string>("");
  const [burnAmount, setBurnAmount] = useState<string>("");
  const [approveSpender, setApproveSpender] = useState<string>("");
  const [approveAmount, setApproveAmount] = useState<string>("");
  const [balanceOfAddress, setBalanceOfAddress] = useState<string>("");
  const [allowanceOwner, setAllowanceOwner] = useState<string>("");
  const [allowanceSpender, setAllowanceSpender] = useState<string>("");

  // Read contract data - using type assertion for contract that will be deployed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenName } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "name",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenSymbol } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "symbol",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: tokenDecimals } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "decimals",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "totalSupply",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: ownerAddress } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "owner",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userBalance } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "balanceOf",
    args: [connectedAddress],
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: queriedBalance } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "balanceOf",
    args: [balanceOfAddress as `0x${string}`],
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: queriedAllowance } = useScaffoldReadContract({
    contractName: "ERC20",
    functionName: "allowance",
    args: [allowanceOwner as `0x${string}`, allowanceSpender as `0x${string}`],
  } as any);

  // Write contract functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { writeContractAsync: writeERC20 } = useScaffoldWriteContract({ contractName: "ERC20" } as any);

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount) return;
    try {
      await (writeERC20 as any)({
        functionName: "transfer",
        args: [transferTo as `0x${string}`, parseEther(transferAmount)],
      });
      setTransferTo("");
      setTransferAmount("");
    } catch (e) {
      console.error("Error transferring tokens:", e);
    }
  };

  const handleMint = async () => {
    if (!mintTo || !mintAmount) return;
    try {
      await (writeERC20 as any)({
        functionName: "mint",
        args: [mintTo as `0x${string}`, parseEther(mintAmount)],
      });
      setMintTo("");
      setMintAmount("");
    } catch (e) {
      console.error("Error minting tokens:", e);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount) return;
    try {
      await (writeERC20 as any)({
        functionName: "burn",
        args: [parseEther(burnAmount)],
      });
      setBurnAmount("");
    } catch (e) {
      console.error("Error burning tokens:", e);
    }
  };

  const handleApprove = async () => {
    if (!approveSpender || !approveAmount) return;
    try {
      await (writeERC20 as any)({
        functionName: "approve",
        args: [approveSpender as `0x${string}`, parseEther(approveAmount)],
      });
      setApproveSpender("");
      setApproveAmount("");
    } catch (e) {
      console.error("Error approving tokens:", e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-base-100 min-h-screen">
      <div className="px-5 w-full max-w-6xl">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">ERC20 Token Example</span>
          <span className="block text-4xl font-bold">{(tokenName as string) || "Loading..."}</span>
        </h1>

        {/* Token Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">📊 Token Info</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {(tokenName as string) || "..."}
              </p>
              <p>
                <span className="font-semibold">Symbol:</span> {(tokenSymbol as string) || "..."}
              </p>
              <p>
                <span className="font-semibold">Decimals:</span> {tokenDecimals?.toString() || "..."}
              </p>
              <p>
                <span className="font-semibold">Total Supply:</span>{" "}
                {totalSupply ? formatEther(totalSupply as bigint) : "..."} {tokenSymbol as string}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Owner:</span>
                <Address address={ownerAddress as `0x${string}`} />
              </div>
            </div>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">💰 Your Balance</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{userBalance ? formatEther(userBalance as bigint) : "0"}</p>
              <p className="text-lg text-gray-500">{tokenSymbol as string}</p>
              <div className="mt-4">
                <Address address={connectedAddress} />
              </div>
            </div>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">🔍 Check Balance</h2>
            <div className="space-y-3">
              <AddressInput value={balanceOfAddress} onChange={setBalanceOfAddress} placeholder="Enter address" />
              {balanceOfAddress && queriedBalance !== undefined && (
                <p className="text-center text-xl font-semibold">
                  {formatEther(queriedBalance as bigint)} {tokenSymbol as string}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Write Functions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📤</span>
              <h2 className="text-xl font-bold">Transfer Tokens</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Recipient Address</label>
                <AddressInput value={transferTo} onChange={setTransferTo} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Amount ({tokenSymbol as string})</label>
                <IntegerInput
                  value={transferAmount}
                  onChange={val => setTransferAmount(val.toString())}
                  placeholder="0.0"
                />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleTransfer}
                disabled={!transferTo || !transferAmount}
              >
                Transfer
              </button>
            </div>
          </div>

          {/* Approve Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-xl font-bold">Approve Spender</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Spender Address</label>
                <AddressInput value={approveSpender} onChange={setApproveSpender} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Amount ({tokenSymbol as string})</label>
                <IntegerInput
                  value={approveAmount}
                  onChange={val => setApproveAmount(val.toString())}
                  placeholder="0.0"
                />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleApprove}
                disabled={!approveSpender || !approveAmount}
              >
                Approve
              </button>
            </div>
          </div>

          {/* Mint Card (Owner only) */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🪙</span>
              <h2 className="text-xl font-bold">Mint Tokens</h2>
              <span className="badge badge-warning">Owner Only</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Recipient Address</label>
                <AddressInput value={mintTo} onChange={setMintTo} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Amount ({tokenSymbol as string})</label>
                <IntegerInput value={mintAmount} onChange={val => setMintAmount(val.toString())} placeholder="0.0" />
              </div>
              <button className="btn btn-success w-full" onClick={handleMint} disabled={!mintTo || !mintAmount}>
                Mint
              </button>
            </div>
          </div>

          {/* Burn Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-bold">Burn Tokens</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount to Burn ({tokenSymbol as string})</label>
                <IntegerInput value={burnAmount} onChange={val => setBurnAmount(val.toString())} placeholder="0.0" />
              </div>
              <button className="btn btn-error w-full" onClick={handleBurn} disabled={!burnAmount}>
                Burn
              </button>
            </div>
          </div>
        </div>

        {/* Allowance Check */}
        <div className="mt-6 bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔎</span>
            <h2 className="text-xl font-bold">Check Allowance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium">Owner Address</label>
              <AddressInput value={allowanceOwner} onChange={setAllowanceOwner} placeholder="Owner 0x..." />
            </div>
            <div>
              <label className="text-sm font-medium">Spender Address</label>
              <AddressInput value={allowanceSpender} onChange={setAllowanceSpender} placeholder="Spender 0x..." />
            </div>
            <div className="text-center">
              {allowanceOwner && allowanceSpender && queriedAllowance !== undefined && (
                <p className="text-xl font-semibold">
                  Allowance: {formatEther(queriedAllowance as bigint)} {tokenSymbol as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC20Example;
