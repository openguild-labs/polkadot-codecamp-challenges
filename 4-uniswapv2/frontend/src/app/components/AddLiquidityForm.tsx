'use client';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePool } from "@/hooks/usePool"
import { FormEvent, useEffect, useState } from "react";

type AddLiquidityFormProps = {
    poolAddress: `0x${string}`,
    tokenA: {
        address: string
        symbol: string
        name: string
        decimals: number
    };
    tokenB: {
        address: string
        symbol: string
        name: string
        decimals: number
    };
}

export function AddLiquidityForm(props: AddLiquidityFormProps) {
    const [amountA, setAmountA] = useState("0");
    const [amountB, setAmountB] = useState("0");
    const [balanceA, setBalanceA] = useState<string>();
    const [balanceB, setBalanceB] = useState<string>();
    const { handleAddLiquidity, geBalanceOf } = usePool();

    useEffect(() => {
        let active = true;
        const loadBalances = async () => {
            const [a, b] = await Promise.all([
                geBalanceOf(props.tokenA.address as `0x${string}`, props.tokenA.decimals),
                geBalanceOf(props.tokenB.address as `0x${string}`, props.tokenB.decimals)
            ]);
            if (!active) return;
            setBalanceA(a);
            setBalanceB(b);
        };
        loadBalances();
        return () => {
            active = false;
        };
    }, [props.tokenA.address, props.tokenB.address, geBalanceOf]);

    const onAddLiquiditySubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleAddLiquidity(
            props.poolAddress,
            {
                address: props.tokenA.address as `0x${string}`,
                amount: amountA,
                decimals: props.tokenA.decimals
            },
            {
                address: props.tokenB.address as `0x${string}`,
                amount: amountB,
                decimals: props.tokenB.decimals
            }
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all text-sm">
                    + Add
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-2 border-purple-300 rounded-2xl">
                <form onSubmit={onAddLiquiditySubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">Add Liquidity</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Enter the amount of tokens you would like to add as liquidity to this pool.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="amountA-1" className="font-bold text-gray-700">{props.tokenA.symbol}</Label>
                                <p className="text-xs text-gray-600">Balance: <span className="font-semibold">{balanceA ?? "…"}</span></p>
                            </div>
                            <Input 
                                id="amountA-1" 
                                name="amountA" 
                                type="number" 
                                placeholder="0.00" 
                                onChange={(e) => setAmountA(e.target.value)}
                                className="border-2 border-purple-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none text-gray-800"
                            />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="amountB-1" className="font-bold text-gray-700">{props.tokenB.symbol}</Label>
                                <p className="text-xs text-gray-600">Balance: <span className="font-semibold">{balanceB ?? "…"}</span></p>
                            </div>
                            <Input 
                                id="amountB-1" 
                                name="amountB" 
                                type="number" 
                                placeholder="0.00" 
                                onChange={(e) => setAmountB(e.target.value)}
                                className="border-2 border-purple-200 rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none text-gray-800"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all">Cancel</button>
                        </DialogClose>
                        <button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">Add Liquidity</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
