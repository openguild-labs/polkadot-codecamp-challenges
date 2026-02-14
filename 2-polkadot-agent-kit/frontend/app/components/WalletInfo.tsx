"use client";

import { useAccounts, useAccount, useChain, useBalance } from "@luno-kit/react";

function AccountBalanceDisplay({ address }: { address: string }) {
  const { data: balance } = useBalance({ address });
  const { chain } = useChain();

  if (!balance) {
    return <span className="wallet-balance" style={{ color: "var(--text-muted)" }}>--</span>;
  }

  const decimals = chain?.nativeCurrency?.decimals ?? 10;
  const symbol = chain?.nativeCurrency?.symbol ?? "";
  const free = Number(balance.free) / Math.pow(10, decimals);

  return (
    <span className="wallet-balance">
      {free.toFixed(4)} <span className="wallet-balance-symbol">{symbol}</span>
    </span>
  );
}

export default function WalletInfo() {
  const { accounts } = useAccounts();
  const { account: selectedAccount } = useAccount();
  const { chain } = useChain();

  if (!accounts || accounts.length === 0) {
    return (
      <div className="wallet-info">
        <h3>Wallet</h3>
        <p className="wallet-empty">
          Connect a wallet to view your accounts and balances
        </p>
      </div>
    );
  }

  return (
    <div className="wallet-info">
      <h3>Wallet</h3>

      {chain && (
        <div className="wallet-section">
          <div className="wallet-chain-card">
            <div className="wallet-chain-icon">
              {chain.name.charAt(0)}
            </div>
            <div className="wallet-chain-details">
              <div className="wallet-chain-name">{chain.name}</div>
              <div className="wallet-chain-type">Connected</div>
            </div>
          </div>
        </div>
      )}

      <div className="wallet-section">
        <div className="wallet-label">Accounts</div>
        {accounts.map((account) => {
          const isActive = selectedAccount?.address === account.address;
          return (
            <div
              key={account.address}
              className={`wallet-account ${isActive ? "wallet-account-active" : ""}`}
            >
              <div className="wallet-account-header">
                <div className="wallet-account-name">
                  {account.name || "Account"}
                </div>
                {isActive && (
                  <span className="wallet-account-active-badge">Active</span>
                )}
              </div>
              <div className="wallet-account-address">
                {account.address.slice(0, 8)}...{account.address.slice(-8)}
              </div>
              <AccountBalanceDisplay address={account.address} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
