'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TEST_TOKEN_ADDRESS } from '@/lib/wagmi'
import { paseoAssetHub } from '@/lib/wagmi'

// ERC20 + Mint ABI
const TEST_TOKEN_ABI = [
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'symbol',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'string' }],
    },
    {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        outputs: [],
    },
] as const

export function TokenFaucet() {
    const { address, isConnected, chainId } = useAccount()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Read TEST token balance
    const { data: balance, refetch: refetchBalance } = useReadContract({
        address: TEST_TOKEN_ADDRESS,
        abi: TEST_TOKEN_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && chainId === paseoAssetHub.id,
        },
    })

    // Mint tokens
    const { writeContract, data: hash, isPending } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    // Refetch balance after successful mint
    useEffect(() => {
        if (isSuccess) {
            refetchBalance()
        }
    }, [isSuccess, refetchBalance])

    const handleMint = () => {
        if (!address) return

        writeContract({
            address: TEST_TOKEN_ADDRESS,
            abi: TEST_TOKEN_ABI,
            functionName: 'mint',
            args: [address, parseEther('1000')], // Mint 1000 TEST
        })
    }

    if (!mounted) {
        return (
            <Card className="w-full max-w-lg mx-auto mb-6">
                <CardContent className="py-6">
                    <div className="animate-pulse h-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </CardContent>
            </Card>
        )
    }

    const isWrongChain = chainId !== paseoAssetHub.id
    const formattedBalance = balance ? formatEther(balance) : '0'
    const hasBalance = balance && balance > BigInt(0)

    return (
        <Card className="w-full max-w-lg mx-auto mb-6">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        🪙 TEST Token
                    </CardTitle>
                    {isConnected && !isWrongChain && (
                        <Badge variant={hasBalance ? "default" : "secondary"} className="text-sm">
                            {parseFloat(formattedBalance).toLocaleString()} TEST
                        </Badge>
                    )}
                </div>
                <CardDescription>
                    Get free TEST tokens for testing the bridge
                </CardDescription>
            </CardHeader>

            <CardContent>
                {!isConnected ? (
                    <p className="text-sm text-zinc-500 text-center py-2">
                        Connect wallet to see balance
                    </p>
                ) : isWrongChain ? (
                    <p className="text-sm text-amber-600 dark:text-amber-400 text-center py-2">
                        ⚠️ Switch to Paseo Asset Hub to use faucet
                    </p>
                ) : (
                    <div className="space-y-4">
                        {/* Balance Display */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 text-center">
                            <p className="text-sm text-zinc-500 mb-1">Your Balance</p>
                            <p className="text-2xl font-bold">
                                {parseFloat(formattedBalance).toLocaleString()} <span className="text-zinc-500 text-lg">TEST</span>
                            </p>
                        </div>

                        {/* Faucet Button */}
                        <Button
                            className="w-full"
                            onClick={handleMint}
                            disabled={isPending || isConfirming}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⟳</span>
                                    Confirm in Wallet...
                                </span>
                            ) : isConfirming ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin">⟳</span>
                                    Minting...
                                </span>
                            ) : (
                                '🚰 Get 1,000 TEST Tokens'
                            )}
                        </Button>

                        {isSuccess && (
                            <p className="text-sm text-green-600 dark:text-green-400 text-center">
                                ✓ Successfully minted 1,000 TEST tokens!
                            </p>
                        )}

                        {/* Token Info */}
                        <div className="text-xs text-zinc-500 text-center space-y-1">
                            <p>Token: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">{TEST_TOKEN_ADDRESS.slice(0, 10)}...{TEST_TOKEN_ADDRESS.slice(-8)}</code></p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
