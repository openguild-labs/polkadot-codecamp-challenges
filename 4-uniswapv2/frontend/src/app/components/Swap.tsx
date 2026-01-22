"use client";

import { useEffect, useState } from "react";
import { getContract, parseUnits, formatUnits } from "viem";
import erc20Abi from "@/abis/MyERC20.json";
import pairAbi from "@/abis/UniswapV2Pair.json";
import factoryAbi from "@/abis/UniswapV2Factory.json";
import { getWalletClient, publicClient } from "../utils/viem";

type Token = {
    address: `0x${string}`;
    symbol: string;
    balance: string;
};

export default function Swap({
    user,
    factoryAddress,
    onSuccess,
}: {
    user: string | null;
    factoryAddress?: `0x${string}`;
    onSuccess?: () => void;
}) {
    const [tokenIn, setTokenIn] = useState<Token | null>(null);
    const [tokenOut, setTokenOut] = useState<Token | null>(null);
    const [tokens, setTokens] = useState<Token[]>([]);

    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");

    const [pair, setPair] = useState<`0x${string}` | null>(null);
    const [reserves, setReserves] = useState<{ r0: bigint; r1: bigint }>({ r0: 0n, r1: 0n });
    const [token0Addr, setToken0Addr] = useState<`0x${string}` | null>(null);

    /* ===== LOAD PAIR + RESERVES ===== */
    useEffect(() => {
        if (!user) return;

        const loadTokensFromPools = async () => {
            const factory = getContract({
                address: factoryAddress as `0x${string}`,
                abi: factoryAbi.abi,
                client: publicClient,
            });

            const length = await factory.read.allPairsLength();
            const tokenMap = new Map<string, Token>();

            for (let i = 0; i < Number(length); i++) {
                const pairAddr = await factory.read.allPairs([BigInt(i)]);

                const pair = getContract({
                    address: pairAddr as `0x${string}`,
                    abi: pairAbi.abi,
                    client: publicClient,
                });

                const token0 = await pair.read.token0();
                const token1 = await pair.read.token1();

                for (const tokenAddr of [token0, token1]) {
                    if (tokenMap.has(tokenAddr as string)) continue;

                    const token = getContract({
                        address: tokenAddr as `0x${string}`,
                        abi: erc20Abi.abi,
                        client: publicClient,
                    });

                    const symbol = await token.read.symbol();
                    const bal = await token.read.balanceOf([user]);
                    const balance = formatUnits(bal as bigint, 18);

                    tokenMap.set(tokenAddr as string, {
                        address: tokenAddr as `0x${string}`,
                        symbol: symbol as string,
                        balance,
                    });
                }
            }

            setTokens(Array.from(tokenMap.values()));
        };

        loadTokensFromPools();
    }, [user]);

    /* ===== LOAD PAIR + RESERVES WHEN TOKEN CHANGE ===== */
    useEffect(() => {
        if (!tokenIn || !tokenOut || tokenIn.address === tokenOut.address) return;

        const loadPairAndReserves = async () => {
            const factory = getContract({
                address: factoryAddress as `0x${string}`,
                abi: factoryAbi.abi,
                client: publicClient,
            });

            const pairAddr = await factory.read.getPair([tokenIn.address, tokenOut.address]);

            if (!pairAddr || pairAddr === "0x0000000000000000000000000000000000000000") {
                setPair(null);
                return;
            }

            setPair(pairAddr as `0x${string}`);

            const pairContract = getContract({
                address: pairAddr as `0x${string}`,
                abi: pairAbi.abi,
                client: publicClient,
            });

            const token0 = await pairContract.read.token0();
            const [r0, r1] = (await pairContract.read.getReserves()) as [bigint, bigint];

            setToken0Addr(token0 as `0x${string}`);
            setReserves({ r0: r0 as bigint, r1: r1 as bigint });
        };

        loadPairAndReserves();
    }, [tokenIn, tokenOut]);

    /* ===== AUTO SELECT TOKENS ===== */
    useEffect(() => {
        if (tokens.length >= 2 && !tokenIn && !tokenOut) {
            setTokenIn(tokens[0]);
            setTokenOut(tokens[1]);
        }
    }, [tokens]);

    /* ===== AUTO CALC ===== */
    useEffect(() => {
        if (!amountIn || !reserves.r0 || !reserves.r1 || !token0Addr || !tokenIn) {
            setAmountOut("");
            return;
        }

        const x = parseUnits(amountIn, 18);

        const isToken0In = tokenIn.address === token0Addr;
        const reserveIn = isToken0In ? reserves.r0 : reserves.r1;
        const reserveOut = isToken0In ? reserves.r1 : reserves.r0;

        const amountInWithFee = x * 997n;
        const numerator = amountInWithFee * reserveOut;
        const denominator = reserveIn * 1000n + amountInWithFee;

        const y = numerator / denominator;
        setAmountOut(formatUnits(y, 18));
    }, [amountIn, reserves, tokenIn, token0Addr]);

    /* ===== REFRESH BALANCES AFTER SWAP ===== */
    const refreshBalances = async () => {
        if (!user || !tokens.length) return;

        const updated = await Promise.all(
            tokens.map(async (t) => {
                const token = getContract({
                    address: t.address,
                    abi: erc20Abi.abi,
                    client: publicClient,
                });

                const bal = await token.read.balanceOf([user]);
                return {
                    ...t,
                    balance: formatUnits(bal as bigint, 18),
                };
            }),
        );

        setTokens(updated);

        // Update lại tokenIn / tokenOut cho UI
        setTokenIn(updated.find((t) => t.address === tokenIn?.address) || null);
        setTokenOut(updated.find((t) => t.address === tokenOut?.address) || null);
    };

    /* ===== SWAP ===== */
    const handleSwap = async () => {
        if (!pair || !tokenIn || !tokenOut || !user || !token0Addr) return;

        try {
            const wallet = await getWalletClient();

            const tokenA = getContract({
                address: tokenIn.address,
                abi: erc20Abi.abi,
                client: wallet,
            });

            const pairContract = getContract({ address: pair, abi: pairAbi.abi, client: wallet });

            const aIn = parseUnits(amountIn, 18);
            const aOut = parseUnits(amountOut, 18);

            // Approve
            const tx0 = await tokenA.write.approve([pair, aIn]);
            await publicClient.waitForTransactionReceipt({ hash: tx0 });

            // Transfer tokenIn → pair
            const tx1 = await tokenA.write.transfer([pair, aIn]);
            await publicClient.waitForTransactionReceipt({ hash: tx1 });

            const isToken0In = tokenIn.address === token0Addr;

            const tx2 = await pairContract.write.swap([
                isToken0In ? 0n : aOut,
                isToken0In ? aOut : 0n,
                user,
                "0x",
            ]);

            await publicClient.waitForTransactionReceipt({ hash: tx2 });

            alert("✅ Swap success!");
            await refreshBalances();
            await onSuccess?.();
        } catch (e) {
            console.error(e);
            alert("❌ Swap failed");
        }
    };

    /* ===== SWAP TOKEN POSITION ===== */
    const flipToken = () => {
        setTokenIn(tokenOut);
        setTokenOut(tokenIn);
        setAmountIn("");
        setAmountOut("");
    };

    return (
        <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold">Swap</h2>

            {/* SELL */}
            <div className="bg-blue-100 p-4 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-500">SELL</p>

                <div className="flex justify-between">
                    <input
                        placeholder="0.0"
                        value={amountIn}
                        onChange={(e) => setAmountIn(e.target.value)}
                        className="bg-transparent text-2xl outline-none w-full"
                    />
                    <select
                        value={tokenIn?.address}
                        onChange={(e) => {
                            const t = tokens.find((t) => t.address === e.target.value);
                            setTokenIn(t || null);
                        }}
                    >
                        {tokens.map((t) => (
                            <option key={t.address} value={t.address}>
                                {t.symbol}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="text-sm text-gray-500">Balance: {tokenIn?.balance}</p>
            </div>

            {/* FLIP */}
            <div className="flex justify-center">
                <button
                    onClick={flipToken}
                    className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100"
                >
                    ↕
                </button>
            </div>

            {/* BUY */}
            <div className="bg-pink-100 p-4 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-500">BUY</p>

                <div className="flex justify-between">
                    <input
                        placeholder="0.0"
                        value={amountOut}
                        readOnly
                        className="bg-transparent text-2xl outline-none w-full"
                    />
                    <select
                        value={tokenOut?.address}
                        onChange={(e) => {
                            const t = tokens.find((t) => t.address === e.target.value);
                            setTokenOut(t || null);
                        }}
                    >
                        {tokens.map((t) => (
                            <option key={t.address} value={t.address}>
                                {t.symbol}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="text-sm text-gray-500">Balance: {tokenOut?.balance}</p>
            </div>

            <button onClick={handleSwap} className="w-full bg-black text-white py-3 rounded-xl">
                Swap
            </button>
        </div>
    );
}
