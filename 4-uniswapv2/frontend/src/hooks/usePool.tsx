'use client';

import { getWalletClient, publicClient } from "@/app/utils/viem";
import UniswapFactoryABI from "../abis/UniswapV2Factory.json"
import UniswapPairABI from "../abis/UniswapV2Pair.json"
import MyERC20ABI from "../abis/MyERC20.json"
import PASEO_ADDRESS from "../address.json"
import { Pool } from "@/app/components/PoolAndLiquidity";
import { formatUnits, parseUnits } from "viem";

export function usePool() {
    const loadTokenMeta = async (address: string) => {
        const [name, symbol, decimals] = await Promise.all([
            publicClient.readContract({
                address: address as `0x${string}`,
                abi: MyERC20ABI,
                functionName: "name",
            }),
            publicClient.readContract({
                address: address as `0x${string}`,
                abi: MyERC20ABI,
                functionName: "symbol",
            }),
            publicClient.readContract({
                address: address as `0x${string}`,
                abi: MyERC20ABI,
                functionName: "decimals",
            }),
        ])

        return { name: name as string, symbol: symbol as string, decimals: Number(decimals) }
    }

    const geBalanceOf = async (tokenAddress: `0x${string}`, decimals: number) => {
        const walletClient = await getWalletClient();
        const balance = await publicClient.readContract({
            address: tokenAddress,
            abi: MyERC20ABI,
            functionName: "balanceOf",
            args: [walletClient.account.address],
        }) as bigint;
        return Number(formatUnits(balance, decimals)).toFixed(4);
    }

    const handleGetPools = async () => {
        try {
            const pairLength = await publicClient.readContract({
                address: PASEO_ADDRESS.factory as `0x${string}`,
                abi: UniswapFactoryABI,
                functionName: "allPairsLength",
            })
            console.log(pairLength);

            const fetched: Pool[] = []

            for (let i = 0; i < Number(pairLength); i++) {
                const pairAddress = await publicClient.readContract({
                    address: PASEO_ADDRESS.factory as `0x${string}`,
                    abi: UniswapFactoryABI,
                    functionName: "allPairs",
                    args: [BigInt(i)],
                })

                const [token0, token1, reserves, totalSupply] = await Promise.all([
                    publicClient.readContract({
                        address: pairAddress as `0x${string}`,
                        abi: UniswapPairABI,
                        functionName: "token0",
                    }),
                    publicClient.readContract({
                        address: pairAddress as `0x${string}`,
                        abi: UniswapPairABI,
                        functionName: "token1",
                    }),
                    publicClient.readContract({
                        address: pairAddress as `0x${string}`,
                        abi: UniswapPairABI,
                        functionName: "getReserves",
                    }),
                    publicClient.readContract({
                        address: pairAddress as `0x${string}`,
                        abi: UniswapPairABI,
                        functionName: "totalSupply",
                    }),
                ])

                const [meta0, meta1] = await Promise.all([
                    loadTokenMeta(token0 as string),
                    loadTokenMeta(token1 as string),
                ])

                fetched.push({
                    id:  pairAddress as string,
                    token0: {
                        address: token0 as string,
                        ...meta0,
                    },
                    token1: {
                        address: token1 as string,
                        ...meta1,
                    },
                    fee: "0.30%", // core V2 fee
                    reserve0: reserves[0].toString(),
                    reserve1: reserves[1].toString(),
                    totalSupply: totalSupply.toString(),
                })
            }

            return fetched
        } catch (err) {
            console.error("Failed to load pools", err)
        }
    }

    const handleCreatePool = async (tokenA: string, tokenB: string) => {
        console.log(tokenA, tokenB)
          try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: PASEO_ADDRESS.factory as `0x${string}`,
                abi: UniswapFactoryABI,
                functionName: "createPair",
                args: [tokenA, tokenB],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

        }
        catch (err) {
            throw err;
        }
    }

    const handleAddLiquidity = async (poolAddress: `0x${string}`, tokenA: { address: `0x${string}`, amount: string, decimals: number }, tokenB: { address: `0x${string}`, amount: string, decimals: number }) => {
        // Transfer token A and B to the pool contract
        console.log(tokenA, tokenB);
        try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: tokenA.address,
                abi: MyERC20ABI,
                functionName: "transfer",
                args: [poolAddress, parseUnits(tokenA.amount, tokenA.decimals)],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log(`Transfer token ${tokenA.address} transaction receipt:`, receipt);
        }
        catch (err) {
            throw err;
        }

        try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: tokenB.address,
                abi: MyERC20ABI,
                functionName: "transfer",
                args: [poolAddress, parseUnits(tokenB.amount, tokenB.decimals)],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log(`Transfer token ${tokenB.address} transaction receipt:`, receipt);
        }
        catch (err) {
            throw err;
        }

        // Call mint function on the pool contract
        try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: poolAddress,
                abi: UniswapPairABI,
                functionName: "mint",
                args: [walletClient.account.address],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log("Mint liquidity tokens transaction receipt:", receipt);
        }
        catch (err) {
            throw err;
        }
    }

    const handleRemoveLiquidity = async (poolAddress: `0x${string}`, amount: string) => {
         try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: poolAddress,
                abi: MyERC20ABI,
                functionName: "transfer",
                args: [poolAddress, parseUnits(amount, 18)],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log(`Transfer token ${poolAddress} transaction receipt:`, receipt);
        }
        catch (err) {
            throw err;
        }
        // Call burn function on the pool contract
        try {
            const walletClient = await getWalletClient();
            const { request } = await publicClient.simulateContract({
                address: poolAddress,
                abi: UniswapPairABI,
                functionName: "burn",
                args: [walletClient.account.address],
                account: walletClient.account,
            });

            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({
                hash,
            });

            console.log("Mint liquidity tokens transaction receipt:", receipt);
        }
        catch (err) {
            throw err;
        }
    }

    const handleSwap = async (params: {
        poolAddress: `0x${string}`,
        tokenIn: { address: `0x${string}`, decimals: number },
        tokenOut: { address: `0x${string}`, decimals: number },
        amountIn: string,
        minAmountOut?: string, // optional slippage guard in human units
    }) => {
        const { poolAddress, tokenIn, tokenOut, amountIn, minAmountOut } = params;
        const walletClient = await getWalletClient();

        // fetch pair tokens & reserves
        const [t0, t1, reserves] = await Promise.all([
            publicClient.readContract({
                address: poolAddress,
                abi: UniswapPairABI,
                functionName: "token0",
            }),
            publicClient.readContract({
                address: poolAddress,
                abi: UniswapPairABI,
                functionName: "token1",
            }),
            publicClient.readContract({
                address: poolAddress,
                abi: UniswapPairABI,
                functionName: "getReserves",
            }),
        ]);

        const token0 = t0 as `0x${string}`;
        const token1 = t1 as `0x${string}`;

        const isToken0In = tokenIn.address.toLowerCase() === token0.toLowerCase();
        const isToken1In = tokenIn.address.toLowerCase() === token1.toLowerCase();
        if (!isToken0In && !isToken1In) throw new Error("TokenIn not in this pool");
        const isToken0Out = tokenOut.address.toLowerCase() === token0.toLowerCase();
        const isToken1Out = tokenOut.address.toLowerCase() === token1.toLowerCase();
        if (!isToken0Out && !isToken1Out) throw new Error("TokenOut not in this pool");
        if (tokenIn.address.toLowerCase() === tokenOut.address.toLowerCase()) {
            throw new Error("TokenIn and TokenOut must differ");
        }

        const amountInWei = parseUnits(amountIn, tokenIn.decimals);
        if (amountInWei <= 0n) throw new Error("amountIn must be > 0");

        const reserve0 = BigInt(reserves[0]);
        const reserve1 = BigInt(reserves[1]);

        const reserveIn = isToken0In ? reserve0 : reserve1;
        const reserveOut = isToken0In ? reserve1 : reserve0;
        if (reserveIn === 0n || reserveOut === 0n) throw new Error("Pool has zero liquidity");

        // Uniswap V2 formula with 0.3% fee
        const amountInWithFee = (amountInWei * 997n) / 1000n;
        const numerator = amountInWithFee * reserveOut;
        const denominator = reserveIn + amountInWithFee;
        const amountOutWei = numerator / denominator;
        if (amountOutWei <= 0n) throw new Error("Amount out is zero");

        if (minAmountOut) {
            const minOutWei = parseUnits(minAmountOut, tokenOut.decimals);
            if (amountOutWei < minOutWei) throw new Error("Slippage too high");
        }

        const amount0Out = isToken0In ? 0n : amountOutWei;
        const amount1Out = isToken0In ? amountOutWei : 0n;

        // 1) transfer tokenIn to the pair
        {
            const { request } = await publicClient.simulateContract({
                address: tokenIn.address,
                abi: MyERC20ABI,
                functionName: "transfer",
                args: [poolAddress, amountInWei],
                account: walletClient.account,
            });
            const hash = await walletClient.writeContract(request);

            const receipt = await publicClient.waitForTransactionReceipt({ hash });
            console.log(`Transfer tokenIn ${tokenIn.address} transaction receipt:`, receipt);
        }

        // 2) call swap on the pair
        const { request: swapRequest } = await publicClient.simulateContract({
            address: poolAddress,
            abi: UniswapPairABI,
            functionName: "swap",
            args: [amount0Out, amount1Out, walletClient.account.address, "0x"],
            account: walletClient.account,
        });
        const txHash = await walletClient.writeContract(swapRequest);

        const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
        return { amountOut: amountOutWei, txHash, receipt };
    }

    return {
        handleGetPools,
        handleCreatePool,
        handleAddLiquidity,
        handleRemoveLiquidity,
        geBalanceOf,
        handleSwap,
    }
}