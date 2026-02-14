import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, pad, toHex } from "viem";
import { ERC20_ABI, TOKEN_GATEWAY_ABI } from "../config/abis";
import { CONTRACT_ADDRESSES, type SupportedChainId } from "../config/chains";

interface BridgeParams {
  tokenAddress: `0x${string}`;
  amount: string;
  recipient: `0x${string}`;
  assetId: `0x${string}`;
  destChainId: SupportedChainId;
  redeem: boolean;
}

type BridgeStep = "idle" | "approving" | "bridging" | "success" | "error";

// AssetTeleported event signature
const ASSET_TELEPORTED_TOPIC =
  "0x07d0e7e31f460a5025fe4913407d890186747d91632fe9d1ef4666cc5e01d02d";

function extractCommitmentFromLogs(
  logs: readonly { topics: readonly string[]; data: string }[]
): string | null {
  const teleportLog = logs.find(
    (log) => log.topics[0] === ASSET_TELEPORTED_TOPIC
  );
  if (!teleportLog) return null;

  // commitment is the 4th word (index 3) in the non-indexed data
  // data layout: to(32) + destOffset(32) + amount(32) + commitment(32) + ...
  const data = teleportLog.data.slice(2); // remove 0x
  if (data.length < 256) return null; // need at least 4 words (4 * 64 chars)
  return "0x" + data.slice(192, 256);
}

export function useBridge() {
  const { address } = useAccount();
  const [step, setStep] = useState<BridgeStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [commitmentHash, setCommitmentHash] = useState<string | null>(null);

  const {
    writeContract: writeApprove,
    data: approveTxHash,
    isPending: isApproving,
  } = useWriteContract();

  const {
    writeContract: writeTeleport,
    data: teleportTxHash,
    isPending: isTeleporting,
  } = useWriteContract();

  const { isLoading: isApproveConfirming } =
    useWaitForTransactionReceipt({ hash: approveTxHash });

  const {
    isLoading: isTeleportConfirming,
    isSuccess: isTeleportConfirmed,
    data: teleportReceipt,
  } = useWaitForTransactionReceipt({ hash: teleportTxHash });

  // Extract commitment hash once teleport is confirmed
  useEffect(() => {
    if (isTeleportConfirmed && teleportReceipt) {
      setStep("success");
      const commitment = extractCommitmentFromLogs(teleportReceipt.logs);
      if (commitment) {
        setCommitmentHash(commitment);
      }
    }
  }, [isTeleportConfirmed, teleportReceipt]);

  const bridge = async (params: BridgeParams) => {
    if (!address) {
      setError("Please connect your wallet");
      return;
    }

    setError(null);
    setCommitmentHash(null);
    setStep("approving");

    try {
      const amountParsed = parseUnits(params.amount, 18);

      writeApprove(
        {
          address: params.tokenAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [CONTRACT_ADDRESSES.TOKEN_GATEWAY, amountParsed],
        },
        {
          onSuccess: () => {
            setStep("bridging");

            const destString = `EVM-${params.destChainId}`;
            const destHex = toHex(new TextEncoder().encode(destString));

            writeTeleport(
              {
                address: CONTRACT_ADDRESSES.TOKEN_GATEWAY,
                abi: TOKEN_GATEWAY_ABI,
                functionName: "teleport",
                args: [
                  {
                    amount: amountParsed,
                    relayerFee: 0n,
                    assetId: params.assetId,
                    redeem: params.redeem,
                    to: pad(params.recipient, { size: 32 }),
                    dest: destHex,
                    timeout: BigInt(3600),
                    nativeCost: 0n,
                    data: "0x",
                  },
                ],
              },
              {
                onError: (err) => {
                  setError(err.message);
                  setStep("error");
                },
              }
            );
          },
          onError: (err) => {
            setError(err.message);
            setStep("error");
          },
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setStep("error");
    }
  };

  return {
    bridge,
    step,
    error,
    approveTxHash,
    teleportTxHash,
    commitmentHash,
    isApproving: isApproving || isApproveConfirming,
    isTeleporting: isTeleporting || isTeleportConfirming,
    reset: () => {
      setStep("idle");
      setError(null);
      setCommitmentHash(null);
    },
  };
}
