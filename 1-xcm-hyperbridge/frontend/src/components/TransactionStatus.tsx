interface TransactionStatusProps {
  step: string;
  error: string | null;
  approveTxHash?: `0x${string}`;
  teleportTxHash?: `0x${string}`;
  commitmentHash?: string | null;
  explorerUrl?: string;
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function TransactionStatus({
  step,
  error,
  approveTxHash,
  teleportTxHash,
  commitmentHash,
  explorerUrl,
}: TransactionStatusProps) {
  if (step === "idle") return null;

  const variant =
    step === "success" ? "success" : step === "error" ? "error" : "pending";

  const statusText =
    {
      approving: "Waiting for approval...",
      bridging: "Sending bridge transaction...",
      success: "Bridge submitted successfully",
      error: "Transaction failed",
    }[step] || "";

  const txUrl = (hash: string) =>
    explorerUrl ? `${explorerUrl}/tx/${hash}` : "#";

  const commitmentUrl = commitmentHash
    ? `https://explorer.hyperbridge.network/messages?commitment=${commitmentHash}`
    : null;

  return (
    <div className={`status-panel ${variant}`}>
      <div className="status-title">
        {(step === "approving" || step === "bridging") && (
          <span className="spinner" />
        )}
        {statusText}
      </div>

      {approveTxHash && (
        <div className="status-link">
          <span>Approval:</span>
          <a
            href={txUrl(approveTxHash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncateHash(approveTxHash)}
          </a>
        </div>
      )}

      {teleportTxHash && (
        <div className="status-link">
          <span>Bridge tx:</span>
          <a
            href={txUrl(teleportTxHash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncateHash(teleportTxHash)}
          </a>
        </div>
      )}

      {commitmentHash && (
        <div className="status-link">
          <span>Track delivery:</span>
          <a
            href={commitmentUrl!}
            target="_blank"
            rel="noopener noreferrer"
          >
            {truncateHash(commitmentHash)}
          </a>
        </div>
      )}

      {error && (
        <div className="status-error-msg">
          {error.length > 200 ? error.slice(0, 200) + "..." : error}
        </div>
      )}
    </div>
  );
}
