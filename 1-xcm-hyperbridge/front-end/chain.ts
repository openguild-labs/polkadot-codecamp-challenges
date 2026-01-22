export interface ChainConfig {
    chainId: string;
    chainIdHex: string;
    chainIdNumber: number;
    name: string;
    shortName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
    icon: string;
    color: string;
}

export const CHAINS: Record<string, ChainConfig> = {
    SEPOLIA: {
        chainId: "0xaa36a7", // 11155111 in hex
        chainIdHex: "0xaa36a7",
        chainIdNumber: 11155111,
        name: "Ethereum Sepolia Testnet",
        shortName: "Sepolia",
        nativeCurrency: {
            name: "Sepolia ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.sepolia.org", "https://ethereum-sepolia.publicnode.com"],
        blockExplorerUrls: ["https://sepolia.etherscan.io"],
        icon: "🟣",
        color: "#627EEA",
    },

    PASEO_ASSET_HUB: {
        chainId: "420420422",
        chainIdHex: "0x190ee6a6",
        chainIdNumber: 420420422,
        name: "Paseo Asset Hub",
        shortName: "Paseo",
        nativeCurrency: {
            name: "Paseo",
            symbol: "PAS",
            decimals: 12,
        },
        rpcUrls: [],
        blockExplorerUrls: [],
        icon: "⬤",
        color: "#E6007A",
    },
};

export const DEFAULT_TOKEN_ADDRESS = "";
export const DEFAULT_TOKEN_SYMBOL = "USD.h";
export const DEFAULT_TOKEN_DECIMALS = 18;
export const DEFAULT_BRIDGE_AMOUNT = "1";

export const SOURCE_CHAIN = CHAINS.BNB_TESTNET;
export const DESTINATION_CHAIN = CHAINS.PASEO_ASSET_HUB;
