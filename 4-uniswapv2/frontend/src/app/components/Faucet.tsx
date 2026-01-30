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
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl border border-purple-100">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">Test Token Faucet</h1>
                <p className="text-gray-600 text-sm">
                    Get free test tokens for development and testing.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="token" className="text-gray-700 font-semibold text-sm uppercase tracking-wider">Token Address</Label>
                    <Input
                        id="token"
                        placeholder="0x..."
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        className="mt-2 border-2 border-purple-200 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none text-gray-800"
                    />
                </div>

                <button 
                    onClick={handleFaucet} 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg mt-6"
                >
                    Request Tokens
                </button>
            </div>
        </div>
    );
}
