'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SUPPORTED_CHAINS } from '@/lib/wagmi'

export function WalletConnect() {
    const { address, isConnected } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const chainId = useChainId()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    const currentChain = SUPPORTED_CHAINS.find(c => c.id === chainId)

    // Show loading placeholder during SSR
    if (!mounted) {
        return (
            <div className="flex gap-2">
                <Button disabled className="gap-2">
                    <span>🦊</span>
                    Connect Wallet
                </Button>
            </div>
        )
    }

    if (isConnected) {
        return (
            <div className="flex items-center gap-3">
                {currentChain && (
                    <Badge variant="outline" className="gap-1.5 py-1.5">
                        <span>{currentChain.icon}</span>
                        <span>{currentChain.name}</span>
                    </Badge>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-sm">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => disconnect()}
                >
                    Disconnect
                </Button>
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            {connectors.length > 0 ? (
                connectors.map((connector) => (
                    <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        disabled={isPending}
                        className="gap-2"
                    >
                        {isPending ? (
                            <>
                                <span className="animate-spin">⟳</span>
                                Connecting...
                            </>
                        ) : (
                            <>
                                <span>🦊</span>
                                Connect {connector.name}
                            </>
                        )}
                    </Button>
                ))
            ) : (
                <Button disabled className="gap-2">
                    <span>🦊</span>
                    Connect Wallet
                </Button>
            )}
        </div>
    )
}
