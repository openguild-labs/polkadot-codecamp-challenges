"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ERC721Example: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  // State for form inputs
  const [mintTo, setMintTo] = useState<string>("");
  const [mintUri, setMintUri] = useState<string>("");
  const [transferFrom, setTransferFrom] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferTokenId, setTransferTokenId] = useState<string>("");
  const [burnTokenId, setBurnTokenId] = useState<string>("");
  const [approveAddress, setApproveAddress] = useState<string>("");
  const [approveTokenId, setApproveTokenId] = useState<string>("");
  const [ownerOfTokenId, setOwnerOfTokenId] = useState<string>("");
  const [tokenUriId, setTokenUriId] = useState<string>("");
  const [updateUriTokenId, setUpdateUriTokenId] = useState<string>("");
  const [updateUriNewUri, setUpdateUriNewUri] = useState<string>("");
  const [balanceOfAddress, setBalanceOfAddress] = useState<string>("");

  // Read contract data - using type assertion for contract that will be deployed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nftName } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "name",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: nftSymbol } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "symbol",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "totalSupply",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: ownerAddress } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "owner",
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userBalance } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "balanceOf",
    args: [connectedAddress],
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: queriedOwner } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "ownerOf",
    args: [ownerOfTokenId ? BigInt(ownerOfTokenId) : undefined],
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: queriedTokenUri } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "tokenURI",
    args: [tokenUriId ? BigInt(tokenUriId) : undefined],
  } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: queriedBalance } = useScaffoldReadContract({
    contractName: "ERC721",
    functionName: "balanceOf",
    args: [balanceOfAddress as `0x${string}`],
  } as any);

  // Write contract functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { writeContractAsync: writeERC721 } = useScaffoldWriteContract({ contractName: "ERC721" } as any);

  const handleMint = async () => {
    if (!mintTo || !mintUri) return;
    try {
      await (writeERC721 as any)({
        functionName: "mint",
        args: [mintTo as `0x${string}`, mintUri],
      });
      setMintTo("");
      setMintUri("");
    } catch (e) {
      console.error("Error minting NFT:", e);
    }
  };

  const handleTransfer = async () => {
    if (!transferFrom || !transferTo || !transferTokenId) return;
    try {
      await (writeERC721 as any)({
        functionName: "safeTransferFrom",
        args: [transferFrom as `0x${string}`, transferTo as `0x${string}`, BigInt(transferTokenId)],
      });
      setTransferFrom("");
      setTransferTo("");
      setTransferTokenId("");
    } catch (e) {
      console.error("Error transferring NFT:", e);
    }
  };

  const handleBurn = async () => {
    if (!burnTokenId) return;
    try {
      await (writeERC721 as any)({
        functionName: "burn",
        args: [BigInt(burnTokenId)],
      });
      setBurnTokenId("");
    } catch (e) {
      console.error("Error burning NFT:", e);
    }
  };

  const handleApprove = async () => {
    if (!approveAddress || !approveTokenId) return;
    try {
      await (writeERC721 as any)({
        functionName: "approve",
        args: [approveAddress as `0x${string}`, BigInt(approveTokenId)],
      });
      setApproveAddress("");
      setApproveTokenId("");
    } catch (e) {
      console.error("Error approving NFT:", e);
    }
  };

  const handleUpdateTokenUri = async () => {
    if (!updateUriTokenId || !updateUriNewUri) return;
    try {
      await (writeERC721 as any)({
        functionName: "updateTokenURI",
        args: [BigInt(updateUriTokenId), updateUriNewUri],
      });
      setUpdateUriTokenId("");
      setUpdateUriNewUri("");
    } catch (e) {
      console.error("Error updating token URI:", e);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 bg-base-100 min-h-screen">
      <div className="px-5 w-full max-w-6xl">
        <h1 className="text-center mb-8">
          <span className="block text-2xl mb-2">ERC721 NFT Example</span>
          <span className="block text-4xl font-bold">{(nftName as string) || "Loading..."}</span>
        </h1>

        {/* NFT Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">🖼️ Collection Info</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {(nftName as string) || "..."}
              </p>
              <p>
                <span className="font-semibold">Symbol:</span> {(nftSymbol as string) || "..."}
              </p>
              <p>
                <span className="font-semibold">Total Supply:</span> {totalSupply?.toString() || "..."}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Owner:</span>
                <Address address={ownerAddress as `0x${string}`} />
              </div>
            </div>
          </div>

          <div className="bg-base-200 rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-primary">💎 Your NFTs</h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent">{userBalance?.toString() || "0"}</p>
              <p className="text-lg text-gray-500">NFTs owned</p>
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
                <p className="text-center text-xl font-semibold">{queriedBalance?.toString()} NFTs</p>
              )}
            </div>
          </div>
        </div>

        {/* Query Functions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Owner Of */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👤</span>
              <h2 className="text-xl font-bold">Owner Of Token</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Token ID</label>
                <InputBase value={ownerOfTokenId} onChange={setOwnerOfTokenId} placeholder="Enter token ID" />
              </div>
              {ownerOfTokenId && queriedOwner && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Owner:</span>
                  <Address address={queriedOwner as `0x${string}`} />
                </div>
              )}
            </div>
          </div>

          {/* Token URI */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔗</span>
              <h2 className="text-xl font-bold">Token URI</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Token ID</label>
                <InputBase value={tokenUriId} onChange={setTokenUriId} placeholder="Enter token ID" />
              </div>
              {tokenUriId && queriedTokenUri && (
                <div className="break-all">
                  <span className="font-semibold">URI:</span>
                  <p className="text-sm mt-1 p-2 bg-base-200 rounded">{queriedTokenUri as string}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Write Functions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mint Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-bold">Mint NFT</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Recipient Address</label>
                <AddressInput value={mintTo} onChange={setMintTo} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Token URI</label>
                <InputBase value={mintUri} onChange={setMintUri} placeholder="ipfs://... or https://..." />
              </div>
              <button className="btn btn-success w-full" onClick={handleMint} disabled={!mintTo || !mintUri}>
                Mint NFT
              </button>
            </div>
          </div>

          {/* Transfer Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📤</span>
              <h2 className="text-xl font-bold">Transfer NFT</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">From Address</label>
                <AddressInput value={transferFrom} onChange={setTransferFrom} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">To Address</label>
                <AddressInput value={transferTo} onChange={setTransferTo} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Token ID</label>
                <InputBase value={transferTokenId} onChange={setTransferTokenId} placeholder="Token ID" />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleTransfer}
                disabled={!transferFrom || !transferTo || !transferTokenId}
              >
                Transfer
              </button>
            </div>
          </div>

          {/* Approve Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✅</span>
              <h2 className="text-xl font-bold">Approve</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Approved Address</label>
                <AddressInput value={approveAddress} onChange={setApproveAddress} placeholder="0x..." />
              </div>
              <div>
                <label className="text-sm font-medium">Token ID</label>
                <InputBase value={approveTokenId} onChange={setApproveTokenId} placeholder="Token ID" />
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={handleApprove}
                disabled={!approveAddress || !approveTokenId}
              >
                Approve
              </button>
            </div>
          </div>

          {/* Burn Card */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl font-bold">Burn NFT</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Token ID</label>
                <InputBase value={burnTokenId} onChange={setBurnTokenId} placeholder="Token ID to burn" />
              </div>
              <button className="btn btn-error w-full" onClick={handleBurn} disabled={!burnTokenId}>
                Burn
              </button>
            </div>
          </div>
        </div>

        {/* Update Token URI */}
        <div className="mt-6 bg-base-100 border border-base-300 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📝</span>
            <h2 className="text-xl font-bold">Update Token URI</h2>
            <span className="badge badge-warning">Owner Only</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium">Token ID</label>
              <InputBase value={updateUriTokenId} onChange={setUpdateUriTokenId} placeholder="Token ID" />
            </div>
            <div>
              <label className="text-sm font-medium">New URI</label>
              <InputBase
                value={updateUriNewUri}
                onChange={setUpdateUriNewUri}
                placeholder="ipfs://... or https://..."
              />
            </div>
            <button
              className="btn btn-secondary"
              onClick={handleUpdateTokenUri}
              disabled={!updateUriTokenId || !updateUriNewUri}
            >
              Update URI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC721Example;
