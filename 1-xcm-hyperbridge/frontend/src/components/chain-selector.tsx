'use client'

import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { SUPPORTED_CHAINS } from '@/lib/wagmi'

interface ChainSelectorProps {
    sourceChain: number | undefined
    destChain: number | undefined
    onSourceChange: (chainId: number) => void
    onDestChange: (chainId: number) => void
}

export function ChainSelector({
    sourceChain,
    destChain,
    onSourceChange,
    onDestChange,
}: ChainSelectorProps) {
    const handleSwap = () => {
        if (sourceChain && destChain) {
            onSourceChange(destChain)
            onDestChange(sourceChain)
        }
    }

    return (
        <div className="flex items-center gap-3">
            {/* Source Chain */}
            <div className="flex-1">
                <label className="text-sm font-medium text-zinc-500 mb-1.5 block">From</label>
                <Select
                    value={sourceChain?.toString()}
                    onValueChange={(value) => onSourceChange(parseInt(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select chain" />
                    </SelectTrigger>
                    <SelectContent>
                        {SUPPORTED_CHAINS.filter(c => c.id !== destChain).map((chain) => (
                            <SelectItem key={chain.id} value={chain.id.toString()}>
                                <span className="flex items-center gap-2">
                                    <span>{chain.icon}</span>
                                    <span>{chain.name}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Swap Button */}
            <Button
                variant="outline"
                size="icon"
                className="mt-6 rounded-full"
                onClick={handleSwap}
                disabled={!sourceChain || !destChain}
            >
                ⇄
            </Button>

            {/* Destination Chain */}
            <div className="flex-1">
                <label className="text-sm font-medium text-zinc-500 mb-1.5 block">To</label>
                <Select
                    value={destChain?.toString()}
                    onValueChange={(value) => onDestChange(parseInt(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select chain" />
                    </SelectTrigger>
                    <SelectContent>
                        {SUPPORTED_CHAINS.filter(c => c.id !== sourceChain).map((chain) => (
                            <SelectItem key={chain.id} value={chain.id.toString()}>
                                <span className="flex items-center gap-2">
                                    <span>{chain.icon}</span>
                                    <span>{chain.name}</span>
                                </span>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
