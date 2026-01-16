import { defineChain } from "viem";

export const paseoAssetHub = defineChain({
    id: 420420422,
    name: "Paseo Asset Hub",
    nativeCurrency: {
        decimals: 18,
        name: "Paseo",
        symbol: "PAS",
    },
    rpcUrls: {
        default: {
            http: ["https://testnet-passet-hub-eth-rpc.polkadot.io/"],
            webSocket: ["wss://testnet-passet-hub.polkadot.io"],
        },
    },
    blockExplorers: {
        default: {
            name: "Blockscout",
            url: "https://blockscout-passet-hub.parity-testnet.parity.io/",
        },
    },
});
