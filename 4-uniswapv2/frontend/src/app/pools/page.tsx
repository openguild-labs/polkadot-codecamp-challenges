"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Minus, TrendingUp, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { contractAddresses } from "@/lib/contractAddresses";
import { erc20Abi, uniswapV2FactoryAbi, uniswapV2PairAbi } from "@/lib/abi";
import { useAccount, useConfig, useReadContracts, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { useAtomValue } from "jotai";
import { addressAtom } from "@/components/SigpassKit";
import { localConfig } from "@/app/providers";
import { Address, getAddress, parseUnits, formatUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { getSigpassWallet } from "@/lib/sigpass";

interface Pool {
  id: string;
  pairAddress: string;
  token0: { symbol: string; name: string; address: string };
  token1: { symbol: string; name: string; address: string };
  reserve0: bigint;
  reserve1: bigint;
  totalSupply: bigint;
  userBalance: bigint;
}

export default function PoolsPage() {
  const config = useConfig();
  const sigpassAddress = useAtomValue(addressAtom);
  const { address: wagmiAddress } = useAccount();
  const [activeTab, setActiveTab] = useState("all");
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [showRemoveLiquidity, setShowRemoveLiquidity] = useState(false);
  const [showCreatePool, setShowCreatePool] = useState(false);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [removeAmount, setRemoveAmount] = useState("");

  const currentAddress = sigpassAddress || wagmiAddress;
  const currentConfig = sigpassAddress ? localConfig : config;

  // Get number of pairs
  const { data: allPairsLength } = useReadContract({
    config: currentConfig,
    address: getAddress(contractAddresses.UNISWAP_V2_FACTORY) as Address,
    abi: uniswapV2FactoryAbi,
    functionName: "allPairsLength",
  });

  // Get pair addresses
  const pairQueries = useMemo(() => {
    const length = Math.min(Number(allPairsLength || 0), 10);
    return Array.from({ length }, (_, i) => ({
      address: getAddress(contractAddresses.UNISWAP_V2_FACTORY) as Address,
      abi: uniswapV2FactoryAbi,
      functionName: "allPairs" as const,
      args: [BigInt(i)] as const,
    }));
  }, [allPairsLength]);

  const { data: pairAddresses, isLoading: isPairsLoading } = useReadContracts({
    config: currentConfig,
    contracts: pairQueries,
    query: { enabled: !!allPairsLength && Number(allPairsLength) > 0 },
  });

  const validPairAddresses = useMemo(() => {
    if (!pairAddresses) return [];
    return pairAddresses.filter((result) => result.status === "success").map((result) => getAddress(result.result as string));
  }, [pairAddresses]);

  // Get pair data
  const pairDataQueries = useMemo(() => {
    return validPairAddresses.flatMap((pairAddress) => [
      { address: pairAddress as Address, abi: uniswapV2PairAbi, functionName: "token0" as const },
      { address: pairAddress as Address, abi: uniswapV2PairAbi, functionName: "token1" as const },
      { address: pairAddress as Address, abi: uniswapV2PairAbi, functionName: "getReserves" as const },
      { address: pairAddress as Address, abi: uniswapV2PairAbi, functionName: "totalSupply" as const },
      ...(currentAddress ? [{ address: pairAddress as Address, abi: uniswapV2PairAbi, functionName: "balanceOf" as const, args: [currentAddress as Address] as const }] : []),
    ]);
  }, [validPairAddresses, currentAddress]);

  const { data: pairData, isLoading: isPairDataLoading, refetch: refetchPairData } = useReadContracts({
    config: currentConfig,
    contracts: pairDataQueries as any[],
    query: { enabled: validPairAddresses.length > 0 },
  });

  // Get token info
  const tokenAddresses = useMemo(() => {
    if (!pairData) return [];
    const contractsPerPair = currentAddress ? 5 : 4;
    const tokens = new Set<string>();
    validPairAddresses.forEach((_, pairIndex) => {
      const baseIndex = pairIndex * contractsPerPair;
      if (pairData[baseIndex]?.status === "success") tokens.add(pairData[baseIndex].result as string);
      if (pairData[baseIndex + 1]?.status === "success") tokens.add(pairData[baseIndex + 1].result as string);
    });
    return Array.from(tokens);
  }, [pairData, validPairAddresses, currentAddress]);

  const tokenDataQueries = useMemo(() => {
    return tokenAddresses.flatMap((tokenAddress) => [
      { address: getAddress(tokenAddress) as Address, abi: erc20Abi, functionName: "symbol" as const },
      { address: getAddress(tokenAddress) as Address, abi: erc20Abi, functionName: "name" as const },
    ]);
  }, [tokenAddresses]);

  const { data: tokenData, isLoading: isTokenDataLoading } = useReadContracts({
    config: currentConfig,
    contracts: tokenDataQueries as any[],
    query: { enabled: tokenAddresses.length > 0 },
  });

  // Process pools
  useEffect(() => {
    if (!pairData || !tokenData || isPairDataLoading || isTokenDataLoading) return;

    const processedPools: Pool[] = [];
    const contractsPerPair = currentAddress ? 5 : 4;

    validPairAddresses.forEach((pairAddress, pairIndex) => {
      const baseIndex = pairIndex * contractsPerPair;
      const token0Result = pairData[baseIndex];
      const token1Result = pairData[baseIndex + 1];
      const reservesResult = pairData[baseIndex + 2];
      const totalSupplyResult = pairData[baseIndex + 3];
      const userBalanceResult = currentAddress ? pairData[baseIndex + 4] : null;

      if (token0Result?.status !== "success" || token1Result?.status !== "success" || reservesResult?.status !== "success" || totalSupplyResult?.status !== "success") return;

      const token0Address = token0Result.result as string;
      const token1Address = token1Result.result as string;
      const reserves = reservesResult.result as [bigint, bigint, number];
      const totalSupply = totalSupplyResult.result as bigint;

      const token0Index = tokenAddresses.findIndex((addr) => getAddress(addr).toLowerCase() === getAddress(token0Address).toLowerCase());
      const token1Index = tokenAddresses.findIndex((addr) => getAddress(addr).toLowerCase() === getAddress(token1Address).toLowerCase());

      if (token0Index === -1 || token1Index === -1) return;

      const token0Symbol = tokenData[token0Index * 2]?.result as string;
      const token0Name = tokenData[token0Index * 2 + 1]?.result as string;
      const token1Symbol = tokenData[token1Index * 2]?.result as string;
      const token1Name = tokenData[token1Index * 2 + 1]?.result as string;

      processedPools.push({
        id: pairIndex.toString(),
        pairAddress,
        token0: { symbol: token0Symbol || "???", name: token0Name || "Unknown", address: token0Address },
        token1: { symbol: token1Symbol || "???", name: token1Name || "Unknown", address: token1Address },
        reserve0: reserves[0],
        reserve1: reserves[1],
        totalSupply,
        userBalance: userBalanceResult?.status === "success" ? (userBalanceResult.result as bigint) : BigInt(0),
      });
    });

    setPools(processedPools);
  }, [pairData, tokenData, validPairAddresses, tokenAddresses, currentAddress, isPairDataLoading, isTokenDataLoading]);

  const { data: hash, writeContractAsync, isPending } = useWriteContract({ config: currentConfig });
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, config: currentConfig });

  useEffect(() => {
    if (isConfirmed) {
      refetchPairData();
      setShowAddLiquidity(false);
      setShowRemoveLiquidity(false);
      setAmount0("");
      setAmount1("");
      setRemoveAmount("");
    }
  }, [isConfirmed, refetchPairData]);

  const handleAddLiquidity = async () => {
    if (!selectedPool || !currentAddress || !amount0 || !amount1) return;

    try {
      const amt0 = parseUnits(amount0, 18);
      const amt1 = parseUnits(amount1, 18);

      // Step 1: Transfer token0 and wait for confirmation
      const transfer0Hash = await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: selectedPool.token0.address as Address,
        abi: erc20Abi,
        functionName: "transfer",
        args: [selectedPool.pairAddress as Address, amt0],
      });
      await waitForTransactionReceipt(currentConfig, { hash: transfer0Hash });

      // Step 2: Transfer token1 and wait for confirmation
      const transfer1Hash = await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: selectedPool.token1.address as Address,
        abi: erc20Abi,
        functionName: "transfer",
        args: [selectedPool.pairAddress as Address, amt1],
      });
      await waitForTransactionReceipt(currentConfig, { hash: transfer1Hash });

      // Step 3: Mint LP tokens
      await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: selectedPool.pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "mint",
        args: [currentAddress as Address],
      });
    } catch (error) {
      console.error("Add liquidity failed:", error);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!selectedPool || !currentAddress || !removeAmount) return;

    try {
      const lpAmount = parseUnits(removeAmount, 18);

      // Step 1: Transfer LP tokens to pair and wait for confirmation
      const transferHash = await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: selectedPool.pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "transfer",
        args: [selectedPool.pairAddress as Address, lpAmount],
      });
      await waitForTransactionReceipt(currentConfig, { hash: transferHash });

      // Step 2: Burn LP tokens
      await writeContractAsync({
        account: sigpassAddress ? await getSigpassWallet() : undefined,
        address: selectedPool.pairAddress as Address,
        abi: uniswapV2PairAbi,
        functionName: "burn",
        args: [currentAddress as Address],
      });
    } catch (error) {
      console.error("Remove liquidity failed:", error);
    }
  };

  const userPools = pools.filter((pool) => pool.userBalance > BigInt(0));
  const isLoading = isPairsLoading || isPairDataLoading || isTokenDataLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Liquidity Pools</h1>
            <p className="text-muted-foreground">Provide liquidity and earn fees</p>
          </div>
          <Button onClick={() => setShowCreatePool(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Pool
          </Button>
        </div>

        {isLoading ? (
          <Card className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading pools...</p>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="all">All Pools ({pools.length})</TabsTrigger>
              <TabsTrigger value="my">My Positions ({userPools.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {pools.length > 0 ? (
                pools.map((pool) => (
                  <Card key={pool.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {pool.token0.symbol.charAt(0)}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold -ml-3 border-2 border-white">
                              {pool.token1.symbol.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{pool.token0.symbol}/{pool.token1.symbol}</h3>
                              <Badge variant="secondary">0.3%</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{pool.token0.name} • {pool.token1.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Reserve {pool.token0.symbol}</p>
                            <p className="font-semibold">{parseFloat(formatUnits(pool.reserve0, 18)).toFixed(2)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Reserve {pool.token1.symbol}</p>
                            <p className="font-semibold">{parseFloat(formatUnits(pool.reserve1, 18)).toFixed(2)}</p>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedPool(pool);
                              setShowAddLiquidity(true);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Liquidity
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No pools found</h3>
                  <p className="text-muted-foreground mb-4">Be the first to create a liquidity pool</p>
                  <Button onClick={() => setShowCreatePool(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Pool
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="my" className="space-y-4">
              {userPools.length > 0 ? (
                userPools.map((pool) => (
                  <Card key={pool.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {pool.token0.symbol.charAt(0)}
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold -ml-3 border-2 border-white">
                              {pool.token1.symbol.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{pool.token0.symbol}/{pool.token1.symbol}</h3>
                            <p className="text-sm text-muted-foreground">
                              My LP: {parseFloat(formatUnits(pool.userBalance, 18)).toFixed(6)} LP tokens
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedPool(pool);
                              setShowRemoveLiquidity(true);
                            }}
                          >
                            <Minus className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedPool(pool);
                              setShowAddLiquidity(true);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No liquidity positions</h3>
                  <p className="text-muted-foreground">Add liquidity to a pool to start earning fees</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Add Liquidity Dialog */}
        <Dialog open={showAddLiquidity} onOpenChange={setShowAddLiquidity}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Liquidity</DialogTitle>
              <DialogDescription>
                {selectedPool && `Add liquidity to ${selectedPool.token0.symbol}/${selectedPool.token1.symbol} pool`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{selectedPool?.token0.symbol} Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount0}
                  onChange={(e) => setAmount0(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{selectedPool?.token1.symbol} Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount1}
                  onChange={(e) => setAmount1(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddLiquidity(false)}>Cancel</Button>
              <Button onClick={handleAddLiquidity} disabled={isPending || isConfirming || !amount0 || !amount1}>
                {isPending || isConfirming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Add Liquidity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove Liquidity Dialog */}
        <Dialog open={showRemoveLiquidity} onOpenChange={setShowRemoveLiquidity}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Liquidity</DialogTitle>
              <DialogDescription>
                {selectedPool && `Remove liquidity from ${selectedPool.token0.symbol}/${selectedPool.token1.symbol} pool`}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">LP Token Amount</label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={removeAmount}
                  onChange={(e) => setRemoveAmount(e.target.value)}
                />
                {selectedPool && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Available: {parseFloat(formatUnits(selectedPool.userBalance, 18)).toFixed(6)} LP
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRemoveLiquidity(false)}>Cancel</Button>
              <Button onClick={handleRemoveLiquidity} disabled={isPending || isConfirming || !removeAmount}>
                {isPending || isConfirming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Remove Liquidity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Pool Dialog */}
        <Dialog open={showCreatePool} onOpenChange={setShowCreatePool}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Pool</DialogTitle>
              <DialogDescription>
                Create a new liquidity pool between two tokens
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                To create a new pool, you need to select two tokens that don&apos;t have an existing pair.
                The existing pool is between HarryToken and RiddleToken.
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Available Tokens:</p>
                <p className="text-xs text-muted-foreground">HarryToken: {contractAddresses.HARRY_TOKEN}</p>
                <p className="text-xs text-muted-foreground">RiddleToken: {contractAddresses.RIDDLE_TOKEN}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreatePool(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
