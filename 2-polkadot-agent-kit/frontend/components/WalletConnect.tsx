'use client';

import { useAccounts } from '@luno-kit/react';
import { ConnectButton } from '@luno-kit/ui';
import { useEffect, useState } from 'react';

export default function WalletConnect() {
  const { accounts } = useAccounts();
  const [balance, setBalance] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-2">
      <ConnectButton />
      {accounts.length > 0 && (
        <div className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {accounts[0].address.slice(0, 6)}...{accounts[0].address.slice(-6)}
        </div>
      )}
    </div>
  );
}
