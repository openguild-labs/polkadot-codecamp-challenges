"use client";

import { useState, useEffect } from "react";
import { Droplets, Loader2, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { contractAddresses } from "@/lib/contractAddresses";
import { erc20Abi, tokenFaucetAbi } from "@/lib/abi";
import { useAccount, useConfig, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAtomValue } from "jotai";
import { addressAtom } from "@/components/SigpassKit";
import { localConfig } from "@/app/providers";
import { Address, getAddress, formatUnits, parseUnits } from "viem";
import { getSigpassWallet } from "@/lib/sigpass";
import { truncateHash } from "@/lib/utils";

// Drip amount: 1000 tokens
const DRIP_AMOUNT = parseUnits("1000", 18);

interface Token {
  symbol: string;
  name: string;
  address: string;
  balance?: bigint;
}

const tokens: Token[] = [
  {
    symbol: "HARRY",
    name: "Harry Token",
    address: contractAddresses.HARRY_TOKEN,
  },
  {
    symbol: "RIDDLE",
    name: "Riddle Token",
    address: contractAddresses.RIDDLE_TOKEN,
  },
];

export default function FaucetPage() {
  const config = useConfig();
  const sigpassAddress = useAtomValue(addressAtom);
  const { address: wagmiAddress } = useAccount();
  const [claimingToken, setClaimingToken] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const currentAddress = sigpassAddress || wagmiAddress;
  const currentConfig = sigpassAddress ? localConfig : config;

  // Get token balances
  const { data: tokenBalances, refetch: refetchBalances } = useReadContracts({
    config: currentConfig,
    contracts: tokens.flatMap((token) => [
      {
        address: token.address as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [currentAddress as Address],
      },
      {
        address: token.address as Address,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: token.address as Address,
        abi: erc20Abi,
        functionName: "name",
      },
    ]),
    query: {
      enabled: !!currentAddress,
    },
  });

  const { data: hash, writeContractAsync, isPending, error } = useWriteContract({ config: currentConfig });
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, config: currentConfig });

  useEffect(() => {
    if (isConfirmed) {
      refetchBalances();
      setSuccessMessage(`Successfully claimed tokens! Transaction: ${truncateHash(hash!)}`);
      setClaimingToken(null);
      setTimeout(() => setSuccessMessage(null), 5000);
    }
  }, [isConfirmed, refetchBalances, hash]);

  const handleClaim = async (token: Token) => {
    if (!currentAddress) return;

    try {
      setClaimingToken(token.address);
      setSuccessMessage(null);

      await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: contractAddresses.TOKEN_FAUCET as Address,
        abi: tokenFaucetAbi,
        functionName: "drip",
        args: [token.address as Address, DRIP_AMOUNT],
      });
    } catch (error) {
      console.error("Claim failed:", error);
      setClaimingToken(null);
    }
  };

  const getTokenBalance = (index: number): bigint | undefined => {
    if (!tokenBalances) return undefined;
    const balanceResult = tokenBalances[index * 3];
    return balanceResult?.status === "success" ? (balanceResult.result as bigint) : undefined;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🚰 Token Faucet</h1>
          <p className="text-muted-foreground">Get free test tokens to try out the DEX</p>
        </div>

        {successMessage && (
          <Card className="mb-6 border-green-500 bg-green-50">
            <CardContent className="p-4 flex items-center gap-2 text-green-700">
              <Check className="h-5 w-5" />
              {successMessage}
            </CardContent>
          </Card>
        )}

        {!currentAddress && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Connect your wallet to claim tokens</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {tokens.map((token, index) => {
            const balance = getTokenBalance(index);
            const isClaiming = claimingToken === token.address && (isPending || isConfirming);

            return (
              <Card key={token.address} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{token.symbol}</CardTitle>
                        <CardDescription>{token.name}</CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleClaim(token)}
                      disabled={!currentAddress || isClaiming}
                      className="min-w-[120px]"
                    >
                      {isClaiming ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <Droplets className="mr-2 h-4 w-4" />
                          Claim
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Your Balance:</span>
                    <span className="font-mono font-medium">
                      {balance !== undefined ? `${parseFloat(formatUnits(balance, 18)).toFixed(4)} ${token.symbol}` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Contract:</span>
                    <a
                      href={`https://blockscout-passet-hub.parity-testnet.parity.io/address/${token.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-primary hover:underline flex items-center gap-1"
                    >
                      {truncateHash(token.address)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">📋 Faucet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Faucet Contract:</span>
              <a
                href={`https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddresses.TOKEN_FAUCET}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-primary hover:underline flex items-center gap-1"
              >
                {truncateHash(contractAddresses.TOKEN_FAUCET)}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span>Paseo Asset Hub</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Chain ID:</span>
              <span className="font-mono">420420422</span>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 Need native PAS tokens? Visit the{" "}
                <a
                  href="https://faucet.polkadot.io/?parachain=1111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Polkadot Faucet
                </a>{" "}
                to get test tokens for gas fees.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
