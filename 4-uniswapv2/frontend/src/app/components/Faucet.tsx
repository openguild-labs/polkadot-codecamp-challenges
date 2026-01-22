'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getWalletClient, publicClient } from '../utils/viem';
import MyERC20ABI from "../../abis/MyERC20.json"
import { parseUnits } from 'viem';

const FAUCET_DEFAULT_AMOUNT = '100';

export function Faucet() {
    const [tokenAddress, setTokenAddress] = useState('');

    const handleFaucet = async () => {
        if (!tokenAddress) return;
        try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: tokenAddress as `0x${string}`,
                abi: MyERC20ABI,
                functionName: "mint",
                args: [walletClient.account.address, parseUnits(FAUCET_DEFAULT_AMOUNT, 18)],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log(`Faucet transaction receipt:`, receipt);
        }
        catch (err) {
            throw err;
        }
    };

    return (
        <div className="max-w-md space-y-4 p-4 items-center justify-center mx-auto">
            <div>
                <h1 className="text-2xl font-semibold">Faucet</h1>
                <p className="text-sm text-muted-foreground">
                    Request test tokens for development and testing.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="token">Token address</Label>
                <Input
                    id="token"
                    placeholder="0x..."
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
            </div>

            <Button onClick={handleFaucet} className="w-full">
                Faucet
            </Button>
        </div>
    );
}
