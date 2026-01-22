export type Pool = {
    pair: `0x${string}`;
    token0: `0x${string}`;
    token1: `0x${string}`;
    symbol0: string;
    symbol1: string;
    symbol: string;
    reserve0: string;
    reserve1: string;
    userLp?: string;
};
