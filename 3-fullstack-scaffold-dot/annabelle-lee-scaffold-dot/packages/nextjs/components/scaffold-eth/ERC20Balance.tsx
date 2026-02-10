"use client";

import { Address, formatUnits } from "viem";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type ERC20BalanceProps = {
  contractName: "ERC20Token";
  address: Address;
  className?: string;
};

/**
 * Display ERC20 token balance for a given address.
 * Only works for ERC20Token contract.
 * Automatically refreshes when new blocks are mined.
 */
export const ERC20Balance = ({ contractName, address, className = "" }: ERC20BalanceProps) => {
  // Read balance - this will auto-refresh on new blocks
  const {
    data: balance,
    isLoading,
    isError,
  } = useScaffoldReadContract({
    contractName,
    functionName: "balanceOf",
    args: [address],
    // Enable watching for automatic updates
    watch: true,
  });

  // Also get token symbol and decimals for display
  const { data: symbol } = useScaffoldReadContract({
    contractName,
    functionName: "symbol",
  });

  const { data: decimals } = useScaffoldReadContract({
    contractName,
    functionName: "decimals",
  });

  if (isLoading || balance === undefined) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded-sm"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-2 border-base-content/30 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer">
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const tokenDecimals = decimals ?? 18;
  const formattedBalance = balance ? Number(formatUnits(balance as bigint, tokenDecimals)) : 0;
  const tokenSymbol = symbol ? String(symbol) : "MTK";

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span>{formattedBalance.toFixed(4)}</span>
      <span className="text-[0.8em] font-bold ml-1">{tokenSymbol}</span>
    </div>
  );
};
