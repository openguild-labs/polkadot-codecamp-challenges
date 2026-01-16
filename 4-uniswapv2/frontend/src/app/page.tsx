"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Droplets, Coins, ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🦄 UniswapV2 on Polkadot</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Decentralized exchange on Paseo Asset Hub
        </p>
        <div className="flex flex-row gap-4 justify-center">
          <Link href="/swap">
            <Button size="lg" className="font-bold">
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              Start Swapping
            </Button>
          </Link>
          <Link href="/pools">
            <Button size="lg" variant="outline" className="font-bold">
              <Droplets className="mr-2 h-5 w-5" />
              View Pools
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              Swap Tokens
            </CardTitle>
            <CardDescription>
              Exchange tokens instantly with low fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Swap between HarryToken and RiddleToken with automatic market making.
            </p>
            <Link href="/swap">
              <Button className="w-full">Go to Swap</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              Liquidity Pools
            </CardTitle>
            <CardDescription>
              Provide liquidity and earn fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add or remove liquidity from pools and earn trading fees.
            </p>
            <Link href="/pools">
              <Button className="w-full">Manage Pools</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-primary" />
              Token Faucet
            </CardTitle>
            <CardDescription>
              Get test tokens for free
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Claim HarryToken and RiddleToken to test the DEX.
            </p>
            <Link href="/faucet">
              <Button className="w-full">Get Tokens</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>📋 Contract Addresses</CardTitle>
          <CardDescription>Deployed on Paseo Asset Hub (Chain ID: 420420422)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">UniswapV2Factory</p>
              <code className="text-xs break-all">0x9Df9FcCbe3116Ba85Ba0D1FcDdC18Cad08c64351</code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">UniswapV2Pair</p>
              <code className="text-xs break-all">0x7090BAC7a9514512F04394133d26aB5618d41EA5</code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">HarryToken</p>
              <code className="text-xs break-all">0xA8F30E8941A9fB41f613E61C4E8CC7ef12b972Fe</code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">RiddleToken</p>
              <code className="text-xs break-all">0x29278c594F0898e004f4bE755E1b3761C4d88112</code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-1">TokenFaucet</p>
              <code className="text-xs break-all">0xd9e256cD6aaC860955d9f36F2a460D0310C4107B</code>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <a 
          href="https://blockscout-passet-hub.parity-testnet.parity.io/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:underline"
        >
          View on Block Explorer <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
