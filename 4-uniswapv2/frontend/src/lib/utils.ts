import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncateHash(
    hash: string,
    startLength: number = 6,
    endLength: number = 4
) {
    return `${hash.slice(0, startLength)}...${hash.slice(-endLength)}`;
}

export function truncateAddress(address: string, length: number = 4) {
    return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

export function getBlockExplorerUrl(
    config: any,
    chainId: number | undefined
): string | undefined {
    const chain = config.chains?.find((chain: any) => chain.id === chainId);
    return (
        chain?.blockExplorers?.default?.url ||
        config.chains?.[0]?.blockExplorers?.default?.url
    );
}

export function formatNumber(num: string | number): string {
    const value = typeof num === 'string' ? parseFloat(num) : num;
    if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
        return `$${(value / 1000).toFixed(2)}K`;
    }
    return `$${value.toFixed(2)}`;
}

export function formatPercent(num: string | number): string {
    const value = typeof num === 'string' ? parseFloat(num) : num;
    return `${value.toFixed(2)}%`;
}
