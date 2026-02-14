import { useState } from "react";
import { useAccount, useChainId, useSwitchChain, useWriteContract } from "wagmi";
import { useBridge } from "../hooks/useBridge";
import { TransactionStatus } from "./TransactionStatus";
import { TOKEN_FAUCET_ABI } from "../config/abis";
import {
  CONTRACT_ADDRESSES,
  type SupportedChainId,
} from "../config/chains";

const USD_H_ADDRESS = "0xA801da100bF16D07F668F4A49E1f71fc54D05177";
const USD_H_ASSET_ID =
  "0x829f01563df2ff9752a529f62c33a4b03b805da1e1dfc748127d6d37795d7257";

const CHAINS: { id: SupportedChainId; name: string; dot: string }[] = [
  { id: 97, name: "BSC Testnet", dot: "chain-dot-bsc" },
  { id: 11155111, name: "Sepolia", dot: "chain-dot-sep" },
];

function getExplorerUrl(chainId: number): string {
  return chainId === 97
    ? "https://testnet.bscscan.com"
    : "https://sepolia.etherscan.io";
}

export function BridgeForm() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const [tokenAddress, setTokenAddress] = useState(USD_H_ADDRESS);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [assetId, setAssetId] = useState(USD_H_ASSET_ID);
  const [destChainId, setDestChainId] = useState<SupportedChainId>(
    chainId === 97 ? 11155111 : 97
  );
  const [redeem, setRedeem] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    bridge,
    step,
    error,
    approveTxHash,
    teleportTxHash,
    commitmentHash,
    isApproving,
    isTeleporting,
    reset,
  } = useBridge();

  const { writeContract: writeFaucet, isPending: isFaucetPending } =
    useWriteContract();

  const sourceChain = CHAINS.find((c) => c.id === chainId);
  const destChain = CHAINS.find((c) => c.id === destChainId);

  const handleBridge = () => {
    const recipientAddr = recipient || address;
    if (!tokenAddress || !amount || !recipientAddr) return;
    reset();
    bridge({
      tokenAddress: tokenAddress as `0x${string}`,
      amount,
      recipient: recipientAddr as `0x${string}`,
      assetId: (assetId || USD_H_ASSET_ID) as `0x${string}`,
      destChainId,
      redeem,
    });
  };

  const handleSwapChains = () => {
    const newSource = destChainId;
    const currentSource = chainId as SupportedChainId;
    setDestChainId(currentSource);
    switchChain({ chainId: newSource });
  };

  const handleFaucet = () => {
    writeFaucet({
      address: CONTRACT_ADDRESSES.TOKEN_FAUCET,
      abi: TOKEN_FAUCET_ABI,
      functionName: "drip",
      args: [CONTRACT_ADDRESSES.FEE_TOKEN],
    });
  };

  const isLoading = isApproving || isTeleporting;
  const canSubmit = isConnected && tokenAddress && amount && !isLoading;

  if (!isConnected) {
    return (
      <div className="bridge-card">
        <div className="connect-prompt">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--text-muted)" }}
          >
            <rect x="2" y="6" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <circle cx="16" cy="14" r="2" />
          </svg>
          <p>Connect your wallet to start bridging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bridge-card">
      <div className="bridge-body">
        {/* Step indicator when active */}
        {step !== "idle" && (
          <div className="steps">
            <div
              className={`step ${step === "approving" ? "active" : ""} ${step === "bridging" || step === "success" ? "done" : ""}`}
            >
              <div className="step-num">
                {step === "bridging" || step === "success" ? "\u2713" : "1"}
              </div>
              Approve
            </div>
            <div className="step-line" />
            <div
              className={`step ${step === "bridging" ? "active" : ""} ${step === "success" ? "done" : ""}`}
            >
              <div className="step-num">
                {step === "success" ? "\u2713" : "2"}
              </div>
              Bridge
            </div>
          </div>
        )}

        {/* Chain selectors */}
        <div className="chain-row">
          <div className="chain-box">
            <div>
              <div className="chain-box-label">From</div>
              <div className="chain-box-name" style={{ display: "flex", alignItems: "center" }}>
                <span
                  className={`chain-dot ${sourceChain?.dot || ""}`}
                />
                {sourceChain?.name || `Chain ${chainId}`}
              </div>
            </div>
          </div>

          <button
            className="swap-btn"
            onClick={handleSwapChains}
            title="Swap chains"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 4l-4 4 4 4" />
              <path d="M17 20l4-4-4-4" />
              <path d="M3 8h14" />
              <path d="M7 16h14" />
            </svg>
          </button>

          <div className="chain-box">
            <div>
              <div className="chain-box-label">To</div>
              <div className="chain-box-name" style={{ display: "flex", alignItems: "center" }}>
                <span
                  className={`chain-dot ${destChain?.dot || ""}`}
                />
                <select
                  value={destChainId}
                  onChange={(e) =>
                    setDestChainId(Number(e.target.value) as SupportedChainId)
                  }
                >
                  {CHAINS.filter((c) => c.id !== chainId).map((chain) => (
                    <option key={chain.id} value={chain.id}>
                      {chain.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="field">
          <div className="field-label">
            <span>Amount</span>
          </div>
          <div className="field-input-wrap">
            <input
              className="field-input field-input-lg"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <span className="field-suffix">USD.h</span>
          </div>
        </div>

        {/* Recipient */}
        <div className="field">
          <div className="field-label">
            <span>Recipient</span>
            <button
              className="field-label-action"
              onClick={() => setRecipient(address || "")}
            >
              Myself
            </button>
          </div>
          <div className="field-input-wrap">
            <input
              className="field-input"
              type="text"
              placeholder={address || "0x..."}
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Advanced fields (collapsed by default) */}
        <button
          className="field-label-action"
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{ marginTop: 14, fontSize: 12 }}
        >
          {showAdvanced ? "Hide advanced" : "Advanced options"}
        </button>

        {showAdvanced && (
          <>
            <div className="field">
              <div className="field-label">
                <span>Token address</span>
              </div>
              <div className="field-input-wrap">
                <input
                  className="field-input"
                  type="text"
                  placeholder="0x..."
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="field-hint">
                Default: USD.h ({USD_H_ADDRESS.slice(0, 10)}...
                {USD_H_ADDRESS.slice(-6)})
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <span>Asset ID (bytes32)</span>
              </div>
              <div className="field-input-wrap">
                <input
                  className="field-input"
                  type="text"
                  placeholder="0x..."
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="field-hint">keccak256 of the token symbol</div>
            </div>

            <div
              className="toggle-row"
              onClick={() => setRedeem(!redeem)}
            >
              <div className={`toggle-track ${redeem ? "active" : ""}`}>
                <div className="toggle-knob" />
              </div>
              <span className="toggle-text">
                Redeem ERC20 on destination (for custodied tokens only)
              </span>
            </div>
          </>
        )}

        {/* Bridge button */}
        <button
          className="btn-primary"
          onClick={handleBridge}
          disabled={!canSubmit}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              {step === "approving" ? "Approving..." : "Bridging..."}
            </>
          ) : (
            "Bridge"
          )}
        </button>

        {/* Faucet */}
        <button
          className="btn-ghost"
          onClick={handleFaucet}
          disabled={isFaucetPending}
        >
          {isFaucetPending ? (
            <>
              <span className="spinner" />
              Requesting...
            </>
          ) : (
            "Get 1,000 USD.h from faucet"
          )}
        </button>

        <TransactionStatus
          step={step}
          error={error}
          approveTxHash={approveTxHash}
          teleportTxHash={teleportTxHash}
          commitmentHash={commitmentHash}
          explorerUrl={getExplorerUrl(chainId)}
        />
      </div>
    </div>
  );
}
