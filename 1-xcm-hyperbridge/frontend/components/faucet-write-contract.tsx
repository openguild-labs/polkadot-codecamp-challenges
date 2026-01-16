"use client";

import { useState, useEffect } from "react";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useConfig,
  useWriteContract,
  useReadContracts,
  useAccount,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { formatUnits, Address } from "viem";
import {
  ExternalLink,
  ChevronDown,
  X,
  Hash,
  LoaderCircle,
  CircleCheck,
  DollarSign,
  Droplets,
  RefreshCw,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
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
  DrawerTrigger,
} from "@/components/ui/drawer";

import { truncateHash } from "@/lib/utils";
import CopyButton from "@/components/copy-button";
import { getSigpassWallet } from "@/lib/sigpass";
import { useAtomValue } from "jotai";
import { addressAtom } from "@/components/sigpasskit";
import { Skeleton } from "./ui/skeleton";
import { localConfig } from "@/app/providers";
import { getBridgeConfig, isBridgeSupported } from "@/lib/bridge-config";
import { erc20AbiExtend, dripFunctionAbi } from "@/lib/abi";

export default function FaucetWriteContract() {
  const config = useConfig();
  const account = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const sigpassAddress = useAtomValue(addressAtom);
  const activeAddress = sigpassAddress || account.address;

  const bridgeConfig = getBridgeConfig(chainId);
  const tokenAddress = bridgeConfig?.defaultBridgeToken as Address;
  const faucetAddress = bridgeConfig?.tokenFaucet as Address;
  const isSupported = isBridgeSupported(chainId) && !!faucetAddress;

  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
    reset,
  } = useWriteContract({
    config: sigpassAddress ? localConfig : config,
  });

  const { data: tokenData, refetch } = useReadContracts({
    contracts: [
      {
        address: tokenAddress,
        abi: erc20AbiExtend,
        functionName: "balanceOf",
        args: [activeAddress as Address],
        chainId: chainId as 420420420 | 11155111 | 97 | 11155420,
      },
      {
        address: tokenAddress,
        abi: erc20AbiExtend,
        functionName: "decimals",
        chainId: chainId as 420420420 | 11155111 | 97 | 11155420,
      },
      {
        address: tokenAddress,
        abi: erc20AbiExtend,
        functionName: "symbol",
        chainId: chainId as 420420420 | 11155111 | 97 | 11155420,
      },
    ],
    config: sigpassAddress ? localConfig : config,
    query: {
      enabled: !!activeAddress && !!tokenAddress && isSupported,
    },
  });

  const balance = tokenData?.[0]?.result as bigint | undefined;
  const decimals = tokenData?.[1]?.result as number | undefined;
  const tokenSymbol = tokenData?.[2]?.result as string | undefined;

  async function handleFaucet() {
    if (!faucetAddress || !tokenAddress) return;

    try {
      const writeConfig = sigpassAddress
        ? { account: await getSigpassWallet() }
        : {};
      await writeContractAsync({
        ...writeConfig,
        address: faucetAddress,
        abi: dripFunctionAbi,
        functionName: "drip",
        args: [tokenAddress],
        chainId: chainId as 420420420 | 11155111 | 97 | 11155420,
      });
    } catch (error) {
      console.error("Faucet error:", error);
    }
  }

  useEffect(() => {
    if (hash) setOpen(true);
  }, [hash]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      config: sigpassAddress ? localConfig : config,
    });

  useEffect(() => {
    if (isConfirmed) refetch();
  }, [isConfirmed, refetch]);

  async function handleSwitchToOptimism() {
    try {
      await switchChainAsync({ chainId: 11155420 });
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  }

  // Unsupported chain
  if (!isSupported) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">USDC Faucet</h2>
          <p className="text-sm text-muted-foreground">
            Get test USDC tokens for bridging
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 p-6 border rounded-lg border-dashed">
          <Info className="w-10 h-10 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Faucet is available on Optimism Sepolia and Ethereum Sepolia
          </p>
          <Button
            onClick={handleSwitchToOptimism}
            disabled={isSwitchingChain}
            size="sm"
          >
            {isSwitchingChain ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
                Switching...
              </>
            ) : (
              "Switch to Optimism Sepolia"
            )}
          </Button>
        </div>
      </div>
    );
  }

  const getExplorerUrl = (txHash: string) => {
    const explorer = config.chains?.find((c) => c.id === chainId)
      ?.blockExplorers?.default?.url;
    return explorer
      ? `${explorer}/tx/${txHash}`
      : `https://etherscan.io/tx/${txHash}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">USDC Faucet</h2>
        <p className="text-sm text-muted-foreground">
          Get test USDC tokens for bridging
        </p>
      </div>

      {/* Balance Card */}
      <div className="flex flex-col gap-4 p-4 border rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Your Balance
              </span>
              {balance !== undefined && decimals ? (
                <span className="font-medium">
                  {formatUnits(balance, decimals)} {tokenSymbol || "USDC"}
                </span>
              ) : (
                <Skeleton className="h-5 w-24" />
              )}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Token</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">
              {truncateHash(tokenAddress)}
            </span>
            <CopyButton copyText={tokenAddress} />
          </div>
        </div>

        <Button
          onClick={handleFaucet}
          disabled={isPending || isConfirming || !activeAddress}
          className="w-full"
        >
          {isPending ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
              Requesting...
            </>
          ) : isConfirming ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin mr-2" />
              Confirming...
            </>
          ) : (
            <>
              <Droplets className="w-4 h-4 mr-2" />
              Request USDC
            </>
          )}
        </Button>

        {!activeAddress && (
          <p className="text-sm text-center text-muted-foreground">
            Connect wallet to request tokens
          </p>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
        <p>
          Request test USDC to use with the Hyperbridge token bridge. Tokens are
          for testnet use only.
        </p>
      </div>

      {/* Transaction Status */}
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" disabled={!hash}>
              View Status <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Faucet Transaction</DialogTitle>
              <DialogDescription>Transaction status</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              {hash && (
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="w-4 h-4" />
                  <a
                    className="flex items-center gap-2 underline underline-offset-4"
                    href={getExplorerUrl(hash)}
                    target="_blank"
                  >
                    {truncateHash(hash)}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <CopyButton copyText={hash} />
                </div>
              )}
              {isConfirming && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <LoaderCircle className="w-4 h-4 animate-spin" />{" "}
                  Confirming...
                </div>
              )}
              {isConfirmed && (
                <div className="flex items-center gap-2 text-sm">
                  <CircleCheck className="w-4 h-4" /> USDC received!
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <X className="w-4 h-4" />{" "}
                  {(error as BaseError).shortMessage || error.message}
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full" disabled={!hash}>
              View Status <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Faucet Transaction</DrawerTitle>
              <DrawerDescription>Transaction status</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-3 p-4">
              {hash && (
                <div className="flex items-center gap-2 text-sm">
                  <Hash className="w-4 h-4" />
                  <a
                    className="flex items-center gap-2 underline underline-offset-4"
                    href={getExplorerUrl(hash)}
                    target="_blank"
                  >
                    {truncateHash(hash)}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <CopyButton copyText={hash} />
                </div>
              )}
              {isConfirming && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <LoaderCircle className="w-4 h-4 animate-spin" />{" "}
                  Confirming...
                </div>
              )}
              {isConfirmed && (
                <div className="flex items-center gap-2 text-sm">
                  <CircleCheck className="w-4 h-4" /> USDC received!
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <X className="w-4 h-4" />{" "}
                  {(error as BaseError).shortMessage || error.message}
                </div>
              )}
            </div>
            <DrawerFooter>
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
