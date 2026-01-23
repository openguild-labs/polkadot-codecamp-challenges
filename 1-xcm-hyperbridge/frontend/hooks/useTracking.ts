"use client";

import { ethers } from "ethers";
import { useMetaMask } from "@/hooks/useWallet";
import bridgeAbi from "../abis/TokenBridge.json";
import { getRequestCommitment, RequestStatus } from "@hyperbridge/sdk";
import { indexerClient } from "@/config/hyperbridge/chain-instance";

export function useTracking() {
    const { switchChain } = useMetaMask();

    /**
     * Track bridge status
     */
    const trackStatus = async ({
        commitmentHash,
        onStatus,
    }: {
        commitmentHash: `0x${string}`;
        onStatus?: (status: string) => void;
    }) => {
        try {
            const statusStream = indexerClient.postRequestStatusStream(commitmentHash);
            console.log(await statusStream);
            try {
                for await (const statusUpdate of statusStream) {
                    if (onStatus) onStatus(statusUpdate.status);
                    switch (statusUpdate.status) {
                        case RequestStatus.SOURCE_FINALIZED:
                            console.log("Order finalized on source chain");
                            console.log("Block:", statusUpdate.metadata.blockNumber);
                            break;

                        case RequestStatus.HYPERBRIDGE_DELIVERED:
                            console.log("Hyperbridge received the request");
                            break;

                        case RequestStatus.HYPERBRIDGE_FINALIZED:
                            console.log("Hyperbridge finalized the request");
                            break;

                        case RequestStatus.DESTINATION:
                            console.log("Order fulfilled on destination chain");
                            console.log("Bridge SUCCESS 🚀");
                            break;

                        case RequestStatus.TIMED_OUT:
                            console.log("Order timed out ❌");
                            break;

                        default:
                            console.log("Unknown status:", statusUpdate);
                    }
                }
            }
            catch (err) {
                console.error("Status stream error:", err);
            }

        } catch (err) {
            console.error("Tracking error:", err);
        }
    };

    return { trackStatus };
}