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
                <Button variant="destructive">Remove liquidity</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={onAddLiquiditySubmit} className="grid gap-4">
                    <DialogHeader>
                        <DialogTitle>Remove Liquidity</DialogTitle>
                        <DialogDescription>
                            Enter the amount of tokens you would like to remove as liquidity to this pool.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">    
                        <div className="grid gap-3">
                            <div className="flex justify-between">
                                <Label htmlFor="amountA-1">Pool Reserve</Label>
                                <p>Your balance: {balanceReserve ?? "…"}</p>
                            </div>
                            <Input id="amountA-1" name="amountA" type="number" placeholder="0.00" onChange={(e) => setAmountReserve(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Remove Liquidity</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}
