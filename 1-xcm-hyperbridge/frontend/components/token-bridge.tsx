"use client";

import { useState, useEffect, useMemo } from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useConfig,
  useWriteContract,
  useReadContracts,
  useAccount,
  useSwitchChain,
} from "wagmi";
import { parseUnits, formatUnits, isAddress, Address, toHex } from "viem";
import {
  ExternalLink,
  ChevronDown,
  X,
  Hash,
  LoaderCircle,
  CircleCheck,
  ArrowRight,
  Wallet,
  RefreshCw,
  Info,
  Clock,
  DollarSign,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { truncateHash } from "@/lib/utils";
import CopyButton from "@/components/copy-button";
import { getSigpassWallet } from "@/lib/sigpass";
import { useAtomValue } from "jotai";
import { addressAtom } from "@/components/sigpasskit";
import { Skeleton } from "./ui/skeleton";
import {
  localConfig,
  bridgeNetworkPairs,
  type BridgeNetworkPair,
} from "@/app/providers";
import {
  bridgeConfigs,
  chainIdentifiers,
  DEFAULT_RELAYER_FEE,
  DEFAULT_TIMEOUT,
  isBridgeSupported,
} from "@/lib/bridge-config";
import { erc20AbiExtend, tokenBridgeAbi } from "@/lib/abi";

type SupportedChainId = 420420420 | 11155111 | 97 | 11155420;

export default function TokenBridge() {
  const config = useConfig();
  const account = useAccount();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(2);
  const [needsApproval, setNeedsApproval] = useState(true);

  const sigpassAddress = useAtomValue(addressAtom);
  const activeAddress = sigpassAddress || account.address;
  const selectedPair: BridgeNetworkPair = bridgeNetworkPairs[selectedPairIndex];

  const {
    data: approveHash,
    error: approveError,
    isPending: isApprovePending,
    writeContractAsync: writeApproveAsync,
    reset: resetApprove,
  } = useWriteContract({
    config: sigpassAddress ? localConfig : config,
  });

  const {
    data: bridgeHash,
    error: bridgeError,
    isPending: isBridgePending,
    writeContractAsync: writeBridgeAsync,
    reset: resetBridge,
  } = useWriteContract({
    config: sigpassAddress ? localConfig : config,
  });

  const sourceBridgeConfig = bridgeConfigs[selectedPair.source.id];
  const bridgeContract = sourceBridgeConfig?.tokenBridge;
  const usdcToken = sourceBridgeConfig?.defaultBridgeToken;

  const {
    data: tokenData,
    refetch: refetchTokenData,
    isLoading: isLoadingTokenData,
  } = useReadContracts({
    contracts: [
      {
        address: usdcToken as Address,
        abi: erc20AbiExtend,
        functionName: "balanceOf",
        args: [activeAddress as Address],
        chainId: selectedPair.source.id as SupportedChainId,
      },
      {
        address: usdcToken as Address,
        abi: erc20AbiExtend,
        functionName: "decimals",
        chainId: selectedPair.source.id as SupportedChainId,
      },
      {
        address: usdcToken as Address,
        abi: erc20AbiExtend,
        functionName: "symbol",
        chainId: selectedPair.source.id as SupportedChainId,
      },
      {
        address: usdcToken as Address,
        abi: erc20AbiExtend,
        functionName: "allowance",
        args: [activeAddress as Address, bridgeContract as Address],
        chainId: selectedPair.source.id as SupportedChainId,
      },
    ],
    config: sigpassAddress ? localConfig : config,
    query: {
      enabled:
        !!activeAddress &&
        !!usdcToken &&
        !!bridgeContract &&
        isBridgeSupported(selectedPair.source.id),
    },
  });

  const tokenBalance = tokenData?.[0]?.result as bigint | undefined;
  const tokenDecimals = tokenData?.[1]?.result as number | undefined;
  const tokenSymbol = tokenData?.[2]?.result as string | undefined;
  const tokenAllowance = tokenData?.[3]?.result as bigint | undefined;

  const formSchema = useMemo(
    () =>
      z.object({
        recipient: z
          .string()
          .min(2)
          .max(50)
          .refine((val) => val === "" || isAddress(val), {
            message: "Invalid address format",
          }) as z.ZodType<Address | "">,
        amount: z
          .string()
          .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: "Amount must be a positive number",
          })
          .refine((val) => /^\d*\.?\d{0,18}$/.test(val), {
            message: "Amount cannot have more than 18 decimal places",
          })
          .superRefine((val, ctx) => {
            if (!tokenBalance || !tokenDecimals) return;
            const inputAmount = parseUnits(val, tokenDecimals);
            if (inputAmount > tokenBalance) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Amount exceeds available balance",
              });
            }
          }),
      }),
    [tokenBalance, tokenDecimals]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      amount: "",
    },
  });

  useEffect(() => {
    if (bridgeHash) setOpen(true);
  }, [bridgeHash]);

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
      config: sigpassAddress ? localConfig : config,
    });

  const { isLoading: isBridgeConfirming, isSuccess: isBridgeConfirmed } =
    useWaitForTransactionReceipt({
      hash: bridgeHash,
      config: sigpassAddress ? localConfig : config,
    });

  useEffect(() => {
    if (isBridgeConfirmed) refetchTokenData();
  }, [isBridgeConfirmed, refetchTokenData]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!value.amount || !tokenDecimals || !tokenAllowance) {
        setNeedsApproval(true);
        return;
      }
      try {
        const amount = parseUnits(value.amount, tokenDecimals);
        setNeedsApproval(tokenAllowance < amount);
      } catch {
        setNeedsApproval(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, tokenDecimals, tokenAllowance]);

  useEffect(() => {
    if (isApproveConfirmed) refetchTokenData();
  }, [isApproveConfirmed, refetchTokenData]);

  useEffect(() => {
    if (
      isApproveConfirmed &&
      !bridgeHash &&
      !isBridgePending &&
      !needsApproval
    ) {
      setTimeout(() => executeBridge(), 100);
    }
  }, [isApproveConfirmed, needsApproval, bridgeHash, isBridgePending]);

  const isOnCorrectChain = account.chainId === selectedPair.source.id;

  async function handleSwitchChain() {
    try {
      await switchChainAsync({ chainId: selectedPair.source.id });
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!activeAddress || !tokenDecimals || !bridgeContract || !usdcToken)
      return;
    const amount = parseUnits(values.amount, tokenDecimals);

    try {
      const requiresApproval = !tokenAllowance || tokenAllowance < amount;
      if (requiresApproval) {
        const writeConfig = sigpassAddress
          ? { account: await getSigpassWallet() }
          : {};
        await writeApproveAsync({
          ...writeConfig,
          address: usdcToken as Address,
          abi: erc20AbiExtend,
          functionName: "approve",
          args: [bridgeContract, amount],
          chainId: selectedPair.source.id as SupportedChainId,
        });
      } else {
        await executeBridge();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }

  async function executeBridge() {
    const values = form.getValues();
    if (
      !activeAddress ||
      !tokenDecimals ||
      !bridgeContract ||
      !tokenSymbol ||
      !usdcToken
    )
      return;

    const amount = parseUnits(values.amount, tokenDecimals);
    const destChainId = chainIdentifiers[selectedPair.destination.id];
    const destChainBytes = toHex(destChainId || "");

    try {
      const writeConfig = sigpassAddress
        ? { account: await getSigpassWallet() }
        : {};
      await writeBridgeAsync({
        ...writeConfig,
        address: bridgeContract,
        abi: tokenBridgeAbi,
        functionName: "bridgeTokensWithFee",
        args: [
          usdcToken as Address,
          tokenSymbol,
          amount,
          values.recipient as Address,
          destChainBytes as `0x${string}`,
          DEFAULT_RELAYER_FEE,
          DEFAULT_TIMEOUT,
        ],
        chainId: selectedPair.source.id as SupportedChainId,
      });
    } catch (error) {
      console.error("Bridge failed:", error);
    }
  }

  function resetTransaction() {
    form.reset();
    resetApprove();
    resetBridge();
    setOpen(false);
  }

  function getExplorerUrl(hash: string, chainId: number) {
    const chain = bridgeNetworkPairs.find(
      (p) => p.source.id === chainId || p.destination.id === chainId
    );
    const targetChain =
      chain?.source.id === chainId ? chain.source : chain?.destination;
    return targetChain?.blockExplorers?.default?.url
      ? `${targetChain.blockExplorers.default.url}/tx/${hash}`
      : `https://etherscan.io/tx/${hash}`;
  }

  const TransactionStatusContent = () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4 border rounded-lg">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-sm">
            1
          </span>
          Token Approval
        </div>
        {approveHash && (
          <div className="flex flex-row gap-2 items-center text-sm">
            <Hash className="w-4 h-4" />
            <a
              className="flex flex-row gap-2 items-center underline underline-offset-4"
              href={getExplorerUrl(approveHash, selectedPair.source.id)}
              target="_blank"
            >
              {truncateHash(approveHash)}
              <ExternalLink className="w-4 h-4" />
            </a>
            <CopyButton copyText={approveHash} />
          </div>
        )}
        {isApprovePending && (
          <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
            <LoaderCircle className="w-4 h-4 animate-spin" /> Confirm in
            wallet...
          </div>
        )}
        {isApproveConfirming && (
          <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
            <LoaderCircle className="w-4 h-4 animate-spin" /> Confirming...
          </div>
        )}
        {isApproveConfirmed && (
          <div className="flex flex-row gap-2 items-center text-sm">
            <CircleCheck className="w-4 h-4" /> Approved
          </div>
        )}
        {approveError && (
          <div className="flex flex-row gap-2 items-center text-destructive text-sm">
            <X className="w-4 h-4" />{" "}
            {(approveError as BaseError).shortMessage || approveError.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4 border rounded-lg">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-background text-sm">
            2
          </span>
          Bridge Transaction
        </div>
        {bridgeHash && (
          <div className="flex flex-row gap-2 items-center text-sm">
            <Hash className="w-4 h-4" />
            <a
              className="flex flex-row gap-2 items-center underline underline-offset-4"
              href={getExplorerUrl(bridgeHash, selectedPair.source.id)}
              target="_blank"
            >
              {truncateHash(bridgeHash)}
              <ExternalLink className="w-4 h-4" />
            </a>
            <CopyButton copyText={bridgeHash} />
          </div>
        )}
        {!approveHash && !bridgeHash && !isBridgePending && (
          <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
            Waiting for approval...
          </div>
        )}
        {isBridgePending && (
          <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
            <LoaderCircle className="w-4 h-4 animate-spin" /> Confirm in
            wallet...
          </div>
        )}
        {isBridgeConfirming && (
          <div className="flex flex-row gap-2 items-center text-muted-foreground text-sm">
            <LoaderCircle className="w-4 h-4 animate-spin" /> Confirming...
          </div>
        )}
        {isBridgeConfirmed && (
          <div className="flex flex-row gap-2 items-center text-sm">
            <CircleCheck className="w-4 h-4" /> Submitted
          </div>
        )}
        {bridgeError && (
          <div className="flex flex-row gap-2 items-center text-destructive text-sm">
            <X className="w-4 h-4" />{" "}
            {(bridgeError as BaseError).shortMessage || bridgeError.message}
          </div>
        )}
      </div>

      {isBridgeConfirmed && (
        <div className="flex flex-col gap-2 p-4 border rounded-lg">
          <div className="flex items-center gap-2 font-medium">
            <CircleCheck className="w-5 h-5" />
            Bridge Initiated
          </div>
          <p className="text-sm text-muted-foreground">
            Your USDC is being bridged to {selectedPair.destination.name}. This
            typically takes 10-30 minutes.
          </p>
          <a
            href="https://explorer.hyperbridge.network"
            target="_blank"
            className="text-sm underline underline-offset-4 flex items-center gap-1"
          >
            Track on Hyperbridge Explorer <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );

  const isChainSupported = isBridgeSupported(selectedPair.source.id);

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Bridge USDC</h2>
        <p className="text-sm text-muted-foreground">
          Transfer USDC across chains via Hyperbridge
        </p>
      </div>

      <div className="flex flex-col gap-3 p-4 border rounded-lg">
        <Select
          value={selectedPairIndex.toString()}
          onValueChange={(value) => setSelectedPairIndex(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select route" />
          </SelectTrigger>
          <SelectContent>
            {bridgeNetworkPairs.map((pair, index) => (
              <SelectItem
                key={index}
                value={index.toString()}
                disabled={!isBridgeSupported(pair.source.id)}
              >
                <div className="flex items-center gap-2">
                  <span>{pair.source.name}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>{pair.destination.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="font-medium text-sm">
              {selectedPair.source.name}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col text-right">
            <span className="text-xs text-muted-foreground">To</span>
            <span className="font-medium text-sm">
              {selectedPair.destination.name}
            </span>
          </div>
        </div>
      </div>

      {!isChainSupported ? (
        <div className="flex flex-col items-center gap-3 p-6 border rounded-lg border-dashed">
          <Info className="w-10 h-10 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            This route is not yet available. Please select another route.
          </p>
        </div>
      ) : !activeAddress ? (
        <div className="flex flex-col items-center gap-3 p-6 border rounded-lg border-dashed">
          <Wallet className="w-10 h-10 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Connect your wallet to bridge tokens
          </p>
        </div>
      ) : !isOnCorrectChain && !sigpassAddress ? (
        <div className="flex flex-col items-center gap-3 p-6 border rounded-lg border-dashed">
          <RefreshCw className="w-10 h-10 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Switch to {selectedPair.source.name} to continue
          </p>
          <Button
            onClick={handleSwitchChain}
            disabled={isSwitchingChain}
            size="sm"
          >
            {isSwitchingChain ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                Switching...
              </>
            ) : (
              `Switch Network`
            )}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Available</span>
                {isLoadingTokenData ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <span className="font-medium">
                    {tokenBalance && tokenDecimals
                      ? `${formatUnits(tokenBalance, tokenDecimals)} ${
                          tokenSymbol || "USDC"
                        }`
                      : "0 USDC"}
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchTokenData()}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Address on {selectedPair.destination.name}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        {isDesktop ? (
                          <Input
                            type="number"
                            placeholder="0.0"
                            {...field}
                            required
                          />
                        ) : (
                          <Input
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*[.]?[0-9]*"
                            placeholder="0.0"
                            {...field}
                            required
                          />
                        )}
                        {tokenBalance && tokenDecimals && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs"
                            onClick={() =>
                              form.setValue(
                                "amount",
                                formatUnits(tokenBalance, tokenDecimals)
                              )
                            }
                          >
                            MAX
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Relayer Fee
                  </span>
                  <span>1 USDC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Est. Time
                  </span>
                  <span>10-30 min</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  isApprovePending ||
                  isBridgePending ||
                  isApproveConfirming ||
                  isBridgeConfirming
                }
              >
                {isApprovePending || isApproveConfirming ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                    Approving...
                  </>
                ) : isBridgePending || isBridgeConfirming ? (
                  <>
                    <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                    Bridging...
                  </>
                ) : needsApproval ? (
                  "Approve & Bridge"
                ) : (
                  "Bridge USDC"
                )}
              </Button>
            </form>
          </Form>
        </>
      )}

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
            disabled={!approveHash && !bridgeHash}
          >
            View Status <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Transaction Status</DialogTitle>
              <DialogDescription>
                Track your bridge transaction progress
              </DialogDescription>
            </DialogHeader>
            <TransactionStatusContent />
            <DialogFooter className="flex gap-2">
              {isBridgeConfirmed && (
                <Button onClick={resetTransaction} className="w-full">
                  New Transfer
                </Button>
              )}
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(true)}
            disabled={!approveHash && !bridgeHash}
          >
            View Status <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Transaction Status</DrawerTitle>
              <DrawerDescription>
                Track your bridge transaction progress
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <TransactionStatusContent />
            </div>
            <DrawerFooter className="flex gap-2">
              {isBridgeConfirmed && (
                <Button onClick={resetTransaction} className="w-full">
                  New Transfer
                </Button>
              )}
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
