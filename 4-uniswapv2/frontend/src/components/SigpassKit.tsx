"use client";

import { useState, useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  KeyRound,
  Ban,
  ExternalLink,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { formatEther, Address } from "viem";
import {
  createSigpassWallet,
  getSigpassWallet,
  checkSigpassWallet,
  checkBrowserWebAuthnSupport,
} from "@/lib/sigpass";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, createConfig, http, useConfig } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { atomWithStorage, RESET } from "jotai/utils";
import { paseoAssetHub } from "@/lib/chains";

export const addressAtom = atomWithStorage<Address | undefined>(
  "SIGPASS_ADDRESS",
  undefined
);

const localConfig = createConfig({
  chains: [paseoAssetHub],
  transports: {
    [paseoAssetHub.id]: http(),
  },
  ssr: true,
});

export default function SigpassKit() {
  const [wallet, setWallet] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [webAuthnSupport, setWebAuthnSupport] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const account = useAccount();
  const [address, setAddress] = useAtom(addressAtom);
  const [isCopied, setIsCopied] = useState(false);
  const config = useConfig();
  const { data: balance } = useBalance({
    address: address,
    chainId: paseoAssetHub.id,
    config: address ? localConfig : config,
  });

  useEffect(() => {
    async function fetchWalletStatus() {
      const status = await checkSigpassWallet();
      setWallet(status);
    }
    fetchWalletStatus();
  }, []);

  useEffect(() => {
    const support = checkBrowserWebAuthnSupport();
    setWebAuthnSupport(support);
  }, []);

  async function getWallet() {
    const account = await getSigpassWallet();
    if (account) {
      setAddress(account.address);
    } else {
      console.error("Issue getting wallet");
    }
  }

  async function createWallet() {
    const account = await createSigpassWallet("uniswapv2-dapp");
    if (account) {
      setOpen(false);
      setWallet(true);
    }
  }

  function truncateAddress(address: Address, length: number = 4) {
    return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
  }

  function copyAddress() {
    if (address) {
      navigator.clipboard.writeText(address ? address : "");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    }
  }

  function disconnect() {
    setAddress(undefined);
    setOpen(false);
    setAddress(RESET);
  }

  if (isDesktop) {
    return (
      <div className="flex flex-row gap-2 items-center">
        {
          // !wallet && !account.isConnected && !address ? (
          //   <Dialog open={open} onOpenChange={setOpen}>
          //     <DialogTrigger asChild>
          //       <Button className="rounded-xl font-bold text-md hover:scale-105 transition-transform">Create Wallet</Button>
          //     </DialogTrigger>
          //     <DialogContent className="sm:max-w-[425px]">
          //       <DialogHeader>
          //         <DialogTitle>Create Wallet</DialogTitle>
          //         <DialogDescription>
          //           Instantly get a wallet with <a href="https://www.yubico.com/resources/glossary/what-is-a-passkey/" className="inline-flex items-center gap-1 font-bold underline underline-offset-2" target="_blank" rel="noopener noreferrer">Passkey<ExternalLink className="h-4 w-4" /></a>
          //         </DialogDescription>
          //       </DialogHeader>
          //       <div className="flex flex-row gap-8">
          //         <div className="flex flex-col gap-4">
          //           <h2 className="font-bold">What is a Wallet?</h2>
          //           <div className="flex flex-row gap-4 items-center">
          //             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">💰</div>
          //             <div className="flex flex-col gap-2">
          //               <h3 className="text-sm font-bold">A Home for your Digital Assets</h3>
          //               <p className="text-sm text-muted-foreground">Wallets are used to send, receive, store, and display digital assets.</p>
          //             </div>
          //           </div>
          //           <div className="flex flex-row gap-4 items-center">
          //             <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">🔐</div>
          //             <div className="flex flex-col gap-2">
          //               <h3 className="font-bold">A new way to Log In</h3>
          //               <p className="text-sm text-muted-foreground">Instead of creating new accounts and passwords, just connect your wallet.</p>
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //       <DialogFooter>
          //         <div className="flex flex-row gap-2 mt-4 justify-between w-full items-center">
          //           <a href="https://learn.rainbow.me/understanding-web3" className="text-md font-bold" target="_blank" rel="noopener noreferrer">Learn more</a>
          //           {webAuthnSupport ? (
          //             <Button className="rounded-xl font-bold text-md hover:scale-105 transition-transform" onClick={createWallet}>
          //               <KeyRound />
          //               Create
          //             </Button>
          //           ) : (
          //             <Button disabled className="rounded-xl font-bold text-md hover:scale-105 transition-transform">
          //               <Ban />
          //               Unsupported Browser
          //             </Button>
          //           )}
          //         </div>
          //       </DialogFooter>
          //       <div className="text-sm text-muted-foreground">
          //         Powered by <a href="https://github.com/gmgn-app/sigpass" className="inline-flex items-center gap-1 font-bold underline underline-offset-4" target="_blank" rel="noopener noreferrer">Sigpass<ExternalLink className="h-4 w-4" /></a>
          //       </div>
          //     </DialogContent>
          //   </Dialog>
          // ) :
          wallet && !account.isConnected && address === undefined ? (
            <Button
              className="rounded-xl font-bold text-md hover:scale-105 transition-transform"
              onClick={getWallet}
            >
              Get Wallet
            </Button>
          ) : wallet && !account.isConnected && address ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl font-bold text-md hover:scale-105 transition-transform"
                >
                  {balance ? (
                    <span>
                      {parseFloat(formatEther(balance.value)).toFixed(4)}{" "}
                      {balance.symbol}
                    </span>
                  ) : (
                    <Skeleton className="h-4 w-16" />
                  )}
                  <span>{truncateAddress(address)}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Wallet</DialogTitle>
                  <DialogDescription>
                    Your Sigpass wallet details
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <span className="text-sm font-medium">Address:</span>
                    <div className="flex flex-row gap-2 items-center">
                      <span className="font-mono text-sm">
                        {truncateAddress(address, 6)}
                      </span>
                      <Button variant="ghost" size="icon" onClick={copyAddress}>
                        {isCopied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-between">
                    <span className="text-sm font-medium">Balance:</span>
                    {balance ? (
                      <span>
                        {parseFloat(formatEther(balance.value)).toFixed(4)}{" "}
                        {balance.symbol}
                      </span>
                    ) : (
                      <Skeleton className="h-4 w-16" />
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={disconnect}
                    className="w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <ConnectButton />
          )
        }
      </div>
    );
  }

  // Mobile view
  return (
    <div className="flex flex-row gap-2 items-center">
      {!wallet && !account.isConnected && !address ? (
        <Button
          className="rounded-xl font-bold text-sm"
          onClick={() => setOpen(true)}
        >
          Connect
        </Button>
      ) : wallet && !account.isConnected && address === undefined ? (
        <Button className="rounded-xl font-bold text-sm" onClick={getWallet}>
          Get Wallet
        </Button>
      ) : wallet && !account.isConnected && address ? (
        <Button
          variant="outline"
          className="rounded-xl font-bold text-sm"
          onClick={() => setOpen(true)}
        >
          {truncateAddress(address)}
        </Button>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
