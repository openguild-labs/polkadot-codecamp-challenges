"use client";

import { useState, useEffect } from "react";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { contractAddresses } from "@/lib/contractAddresses";
import { erc20Abi, uniswapV2FactoryAbi, uniswapV2PairAbi } from "@/lib/abi";
import { useAccount, useConfig, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useAtomValue } from "jotai";
import { addressAtom } from "@/components/SigpassKit";
import { localConfig } from "@/app/providers";
import { Address, getAddress, parseUnits, formatUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { getSigpassWallet } from "@/lib/sigpass";

interface Token {
  symbol: string;
  name: string;
  address: string;
}

const defaultTokens: Token[] = [
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

export default function SwapPage() {
  const config = useConfig();
  const sigpassAddress = useAtomValue(addressAtom);
  const { address: wagmiAddress } = useAccount();
  const [fromToken, setFromToken] = useState<Token>(defaultTokens[0]);
  const [toToken, setToToken] = useState<Token>(defaultTokens[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isSwapping, setIsSwapping] = useState(false);

  const currentAddress = sigpassAddress || wagmiAddress;
  const currentConfig = sigpassAddress ? localConfig : config;

  // Get pair address from factory
  const { data: pairData } = useReadContracts({
    config: currentConfig,
    contracts: [
      {
        address: getAddress(contractAddresses.UNISWAP_V2_FACTORY) as Address,
        abi: uniswapV2FactoryAbi,
        functionName: "getPair",
        args: [getAddress(fromToken.address) as Address, getAddress(toToken.address) as Address],
      },
    ],
    query: {
      enabled: !!fromToken.address && !!toToken.address,
    },
  });

  const pairAddress = pairData?.[0]?.result as string;

  // Get reserves
  const { data: reservesData } = useReadContracts({
    config: currentConfig,
    contracts: [
      {
        address: pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "getReserves",
      },
      {
        address: pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "token0",
      },
    ],
    query: {
      enabled: !!pairAddress && pairAddress !== "0x0000000000000000000000000000000000000000",
    },
  });

  // Get token balances
  const { data: tokenBalances, refetch: refetchBalances } = useReadContracts({
    config: currentConfig,
    contracts: [
      {
        address: fromToken.address as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [currentAddress as Address],
      },
      {
        address: toToken.address as Address,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [currentAddress as Address],
      },
      {
        address: fromToken.address as Address,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: toToken.address as Address,
        abi: erc20Abi,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: !!currentAddress,
    },
  });

  const { data: hash, writeContractAsync, isPending } = useWriteContract({ config: currentConfig });
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, config: currentConfig });

  useEffect(() => {
    if (isConfirmed) {
      refetchBalances();
      setFromAmount("");
      setToAmount("");
      setIsSwapping(false);
    }
  }, [isConfirmed, refetchBalances]);

  // Calculate output amount
  useEffect(() => {
    if (!reservesData || !fromAmount || parseFloat(fromAmount) <= 0) {
      setToAmount("0");
      return;
    }

    const reserves = reservesData[0]?.result as [bigint, bigint, number] | undefined;
    const token0 = reservesData[1]?.result as string | undefined;

    if (!reserves || !token0) {
      setToAmount("0");
      return;
    }

    const [reserve0, reserve1] = reserves;
    const isFromToken0 = getAddress(fromToken.address).toLowerCase() === getAddress(token0).toLowerCase();
    const reserveIn = isFromToken0 ? reserve0 : reserve1;
    const reserveOut = isFromToken0 ? reserve1 : reserve0;

    if (reserveIn === BigInt(0) || reserveOut === BigInt(0)) {
      setToAmount("0");
      return;
    }

    const amountIn = parseUnits(fromAmount, 18);
    const amountInWithFee = amountIn * BigInt(997);
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * BigInt(1000) + amountInWithFee;
    const amountOut = numerator / denominator;

    setToAmount(formatUnits(amountOut, 18));
  }, [fromAmount, reservesData, fromToken.address]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!currentAddress || !fromAmount || parseFloat(fromAmount) <= 0 || !pairAddress) return;

    try {
      setIsSwapping(true);

      const amountIn = parseUnits(fromAmount, 18);
      const amountOut = parseUnits(toAmount, 18);
      const minAmountOut = (amountOut * BigInt(99)) / BigInt(100); // 1% slippage

      const reserves = reservesData?.[0]?.result as [bigint, bigint, number] | undefined;
      const token0 = reservesData?.[1]?.result as string | undefined;
      const isFromToken0 = token0 && getAddress(fromToken.address).toLowerCase() === getAddress(token0).toLowerCase();

      // Step 1: Transfer tokens to pair and wait for confirmation
      const transferHash = await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: fromToken.address as Address,
        abi: erc20Abi,
        functionName: "transfer",
        args: [pairAddress as Address, amountIn],
      });

      // Wait for transfer to be confirmed before executing swap
      await waitForTransactionReceipt(currentConfig, { hash: transferHash });

      // Step 2: Execute swap
      await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "swap",
        args: [
          isFromToken0 ? BigInt(0) : minAmountOut,
          isFromToken0 ? minAmountOut : BigInt(0),
          currentAddress as Address,
          "0x" as `0x${string}`,
        ],
      });
    } catch (error) {
      console.error("Swap failed:", error);
      setIsSwapping(false);
    }
  };

  const fromBalance = tokenBalances?.[0]?.result as bigint | undefined;
  const toBalance = tokenBalances?.[1]?.result as bigint | undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Swap Tokens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">From</span>
                <span className="text-sm text-muted-foreground">
                  Balance: {fromBalance ? parseFloat(formatUnits(fromBalance, 18)).toFixed(4) : "0"}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="text-xl font-bold"
                />
                <Button variant="outline" className="min-w-[100px]">
                  {fromToken.symbol}
                </Button>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button variant="ghost" size="icon" onClick={handleSwapTokens}>
                <ArrowDownUp className="h-4 w-4" />
              </Button>
            </div>

            {/* To Token */}
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">To</span>
                <span className="text-sm text-muted-foreground">
                  Balance: {toBalance ? parseFloat(formatUnits(toBalance, 18)).toFixed(4) : "0"}
                </span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={toAmount}
                  readOnly
                  className="text-xl font-bold"
                />
                <Button variant="outline" className="min-w-[100px]">
                  {toToken.symbol}
                </Button>
              </div>
            </div>

            {/* Swap Action */}
            <Button
              className="w-full"
              size="lg"
              onClick={handleSwap}
              disabled={!currentAddress || !fromAmount || parseFloat(fromAmount) <= 0 || isSwapping || isPending || isConfirming}
            >
              {!currentAddress ? (
                "Connect Wallet"
              ) : isSwapping || isPending || isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap"
              )}
            </Button>

            {/* Price Info */}
            {fromAmount && toAmount && parseFloat(fromAmount) > 0 && parseFloat(toAmount) > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                1 {fromToken.symbol} ≈ {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken.symbol}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
