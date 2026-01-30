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

type RemoveiquidityFormProps = {
    poolAddress: `0x${string}`,
    tokenA: {
        address: string
        symbol: string
        name: string
        decimals: number
    };
    reserveA: string
    tokenB: {
        address: string
        symbol: string
        name: string
        decimals: number
    };
    reserveB: string
}

export function RemoveLiquidityForm(props: RemoveiquidityFormProps) {
    const [amountReserve, setAmountReserve] = useState("0");
    const [balanceReserve, setBalanceReserve] = useState<string>();
    const { handleRemoveLiquidity, geBalanceOf } = usePool();

    useEffect(() => {
        let active = true;
        const loadBalances = async () => {
            const [a] = await Promise.all([
                geBalanceOf(props.poolAddress as `0x${string}`, 18),
            ]);
            if (!active) return;
            setBalanceReserve(a);
        };
        loadBalances();
        return () => {
            active = false;
        };
    }, [props.tokenA.address, props.tokenB.address, geBalanceOf]);

    const onAddLiquiditySubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleRemoveLiquidity(
            props.poolAddress,
            amountReserve
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-1 px-3 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all text-sm">
                    - Remove
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-2 border-red-300 rounded-2xl">
                <form onSubmit={onAddLiquiditySubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">Remove Liquidity</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Enter the amount of liquidity tokens you want to remove from this pool.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">    
                        <div className="grid gap-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="amountA-1" className="font-bold text-gray-700">LP Tokens to Burn</Label>
                                <p className="text-xs text-gray-600">Your balance: <span className="font-semibold">{balanceReserve ?? "…"}</span></p>
                            </div>
                            <Input 
                                id="amountA-1" 
                                name="amountA" 
                                type="number" 
                                placeholder="0.00" 
                                onChange={(e) => setAmountReserve(e.target.value)}
                                className="border-2 border-red-200 rounded-lg px-3 py-2 focus:border-red-500 focus:outline-none text-gray-800"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all">Cancel</button>
                        </DialogClose>
                        <button type="submit" className="bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all">Remove Liquidity</button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
