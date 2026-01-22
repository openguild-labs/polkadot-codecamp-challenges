"use client";
const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`;

import { useEffect, useState } from "react";
import WalletConnect from "./components/WalletConnect";
import Faucet from "./components/Faucet";
import CreatePool from "./components/CreatePool";
import PoolList from "./components/PoolList";
import Swap from "./components/Swap";

import { fetchPools } from "../libs/pools";
import { Pool } from "./types/pool";

export default function Home() {
    const [account, setAccount] = useState<string | null>(null);

    const handleConnect = (connectedAccount: string) => {
        setAccount(connectedAccount);
    };

    const [pools, setPools] = useState<Pool[]>([]);

    useEffect(() => {
        if (!account) return;

        fetchPools(account).then(setPools);
    }, [account]);

    const handleSuccessLiquidity = async () => {
        fetchPools(account).then(setPools);
    };

    return (
        <section className="min-h-screen bg-white text-black flex flex-col justify-center items-center gap-4 py-10">
            <WalletConnect onConnect={handleConnect} />

            {account && <Faucet account={account} />}

            <CreatePool account={account} factoryAddress={FACTORY_ADDRESS} />
            <PoolList userAddress={account} pools={pools} onSuccess={handleSuccessLiquidity} />
            <Swap
                user={account}
                factoryAddress={FACTORY_ADDRESS}
                onSuccess={handleSuccessLiquidity}
            />
        </section>
    );
}
