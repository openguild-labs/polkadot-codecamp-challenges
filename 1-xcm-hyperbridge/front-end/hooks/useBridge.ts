import { useState } from "react";
import { ethers } from "ethers";
import TOKEN_BRIDGE from "../abi/TokenBridge.json";

const TOKEN_BRIDGE_CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_TOKEN_BRIDGE_ADDRESS || "0x0000000000000000000000000000000000000000";

export type BridgeStage = "idle" | "approving" | "bridging" | "confirming" | "success" | "error";

export function useBridge() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [receipt, setReceipt] = useState<any>(null);
    const [stage, setStage] = useState<BridgeStage>("idle");

    const bridgeTokens = async ({
        token,
        symbol,
        amount,
        destChainId,
    }: {
        token: string;
        symbol: string;
        amount: string;
        destChainId: number;
    }) => {
        try {
            setLoading(true);
            setError(null);
            setReceipt(null);
            setStage("idle");

            if (!window.ethereum) throw new Error("No crypto wallet found");

            // Connect to wallet
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Create contract instance
            const contract = new ethers.Contract(
                TOKEN_BRIDGE_CONTRACT_ADDRESS,
                TOKEN_BRIDGE.abi,
                signer,
            );

            // Get recipient address (self)
            const recipient = await signer.getAddress();

            // Get token decimals dynamically
            const tokenContract = new ethers.Contract(
                token,
                [
                    "function approve(address spender, uint256 amount) public returns (bool)",
                    "function decimals() view returns (uint8)",
                    "function balanceOf(address owner) view returns (uint256)",
                ],
                signer,
            );

            const decimals = await tokenContract.decimals();
            console.log(`Token decimals: ${decimals}`);

            // Check user balance
            const userBalance = await tokenContract.balanceOf(recipient);
            const amountParsed = ethers.parseUnits(amount, decimals);

            if (userBalance < amountParsed) {
                throw new Error(
                    `Insufficient balance. You have ${ethers.formatUnits(userBalance, decimals)} tokens but trying to bridge ${amount}`,
                );
            }

            console.log(
                `Bridging ${amount} tokens (${amountParsed.toString()} wei) with ${decimals} decimals`,
            );

            // Convert destChainId to bytes (e.g. "11155111" for Sepolia)
            // Note: The destChain format depends on how Hyperbridge expects it.
            // If it expects the chain ID as string bytes:
            const destChain = ethers.toUtf8Bytes(destChainId.toString());

            // Approve token first (if it's an ERC20)
            // This is a simplified example; in production, check allowance first.

            setStage("approving");
            console.log("Approving token...");
            const approveTx = await tokenContract.approve(
                TOKEN_BRIDGE_CONTRACT_ADDRESS,
                amountParsed,
            );
            await approveTx.wait();
            console.log("Token approved");

            // Send bridge transaction
            setStage("bridging");
            console.log("Bridging tokens...");
            const tx = await contract.bridgeTokens(
                token,
                symbol,
                amountParsed,
                recipient,
                destChain,
                { value: 0 }, // Add value if native fee is required
            );

            setStage("confirming");
            const txReceipt = await tx.wait();
            setStage("success");
            setReceipt(txReceipt);

            return txReceipt;
        } catch (err: any) {
            console.error(err);
            setStage("error");
            setError(err.message || "Unknown error");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { bridgeTokens, loading, error, receipt, stage };
}
