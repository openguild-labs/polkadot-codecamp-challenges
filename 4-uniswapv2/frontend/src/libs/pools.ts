import { http, getContract, formatUnits } from "viem";
import { publicClient } from "../app/utils/viem";

import factoryAbi from "@/abis/UniswapV2Factory.json";
import pairAbi from "@/abis/UniswapV2Pair.json";
import erc20Abi from "@/abis/MyERC20.json";
import { Pool } from "@/app/types/pool";

export async function fetchPools(account: string | null): Promise<Pool[]> {
    const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

    const factory = getContract({
        address: FACTORY_ADDRESS,
        abi: factoryAbi.abi,
        client: publicClient,
    });

    const pools: Pool[] = [];

    const length = await factory.read.allPairsLength();

    for (let i = 0; i < Number(length); i++) {
        const pairAddress = (await factory.read.allPairs([BigInt(i)])) as `0x${string}`;

        const pair = getContract({
            address: pairAddress,
            abi: pairAbi.abi,
            client: publicClient,
        });

        const token0 = (await pair.read.token0()) as `0x${string}`;
        const token1 = (await pair.read.token1()) as `0x${string}`;
        const [r0, r1] = (await pair.read.getReserves()) as [bigint, bigint, number];

        const t0 = getContract({ address: token0, abi: erc20Abi.abi, client: publicClient });
        const t1 = getContract({ address: token1, abi: erc20Abi.abi, client: publicClient });

        const symbol0 = (await t0.read.symbol()) as string;
        const symbol1 = (await t1.read.symbol()) as string;

        let userLp = "0";
        if (account) {
            const lp = (await pair.read.balanceOf([account])) as bigint;
            userLp = formatUnits(lp, 18);
        }

        pools.push({
            pair: pairAddress,
            token0,
            token1,
            symbol0,
            symbol1,
            symbol: `${symbol0}/${symbol1}`,
            reserve0: formatUnits(r0, 18),
            reserve1: formatUnits(r1, 18),
            userLp,
        });
    }

    return pools;
}
