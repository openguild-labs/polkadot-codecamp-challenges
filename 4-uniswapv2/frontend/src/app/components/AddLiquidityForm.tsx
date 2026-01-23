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
                <Button variant="outline">Add liquidity</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onAddLiquiditySubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle>Add Liquidity</DialogTitle>
                        <DialogDescription>
                            Enter the amount of tokens you would like to add as liquidity to this pool.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <div className="flex justify-between">
                                <Label htmlFor="amountA-1">{props.tokenA.symbol}</Label>
                                <p>Your balance: {balanceA ?? "…"}</p>
                            </div>
                            <Input id="amountA-1" name="amountA" type="number" placeholder="0.00" onChange={(e) => setAmountA(e.target.value)} />
                        </div>
                        <div className="grid gap-3">
                            <div className="flex justify-between">
                                <Label htmlFor="amountB-1">{props.tokenB.symbol}</Label>
                                <p>Your balance: {balanceB ?? "…"}</p>
                            </div>
                            <Input id="amountB-1" name="amountB" type="number" placeholder="0.00" onChange={(e) => setAmountB(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Add Liquidity</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
