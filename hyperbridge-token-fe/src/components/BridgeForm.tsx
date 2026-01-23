import { useBridge } from '../hooks/useBridge'
import { BRIDGE_DESTINATIONS, CONTRACT_ADDRESSES } from '../config/wagmi'
import { ArrowDown, Loader2, CheckCircle, AlertCircle, ExternalLink, Info } from 'lucide-react'
import { optimismSepolia } from 'wagmi/chains'
import { useAppKit } from '@reown/appkit/react'
import { CrossChainBalances } from './CrossChainBalances'

export function BridgeForm() {
  const { open } = useAppKit()
  const {
    formState,
    txStatus,
    errorMessage,
    isCorrectChain,
    isConnected,
    tokenBalance,
    tokenSymbol,
    updateFormState,
    setRecipientToSelf,
    switchToSourceChain,
    needsApproval,
    handleApprove,
    handleBridge,
    isApproving,
    isBridging,
    bridgeTxHash,
    bridgeContractDeployed,
    debugAllowance,
    debugAmountWei,
    refetchAllowance,
  } = useBridge()

  // If not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="bridge-form">
        <div className="chain-warning">
          <Info className="icon" />
          <p>Please connect your wallet first</p>
          <button className="btn btn-primary" onClick={() => open()}>
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  // If not on correct chain, show switch button
  if (!isCorrectChain) {
    return (
      <div className="bridge-form">
        <div className="chain-warning">
          <AlertCircle className="icon" />
          <p>Please switch to Optimism Sepolia to use the bridge</p>
          <button className="btn btn-primary" onClick={switchToSourceChain}>
            Switch to Optimism Sepolia
          </button>
        </div>
      </div>
    )
  }

  // Get destination chain name
  const destinationChain = BRIDGE_DESTINATIONS.find(d => d.chain.id === formState.destinationChainId)

  return (
    <div className="bridge-form">
      {/* Contract not deployed warning */}
      {!bridgeContractDeployed && (
        <div className="info-message">
          <Info className="icon" />
          <div>
            <p><strong>Contract Not Deployed</strong></p>
            <p>Deploy the TokenBridge contract first and update the address in config.</p>
          </div>
        </div>
      )}

      {/* From Chain */}
      <div className="chain-section">
        <div className="chain-header">
          <span className="chain-label">From</span>
          <span className="chain-name">Optimism Sepolia</span>
        </div>

        <div className="input-group">
          <label>Token Address</label>
          <input
            type="text"
            placeholder="0x..."
            value={formState.tokenAddress}
            onChange={(e) => updateFormState('tokenAddress', e.target.value)}
            className="input"
          />
          {tokenSymbol && (
            <div className="token-info">
              <span className="token-symbol">{tokenSymbol}</span>
              <span className="token-balance">Balance: {parseFloat(tokenBalance).toFixed(4)}</span>
            </div>
          )}
          <div className="token-hint">
            <small>Default: USD.h ({CONTRACT_ADDRESSES.FEE_TOKEN_USDH.slice(0, 10)}...)</small>
          </div>
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="0.0"
            value={formState.amount}
            onChange={(e) => updateFormState('amount', e.target.value)}
            className="input"
            min="0"
            step="0.0001"
          />
          {tokenBalance && parseFloat(tokenBalance) > 0 && (
            <button
              className="btn-max"
              onClick={() => updateFormState('amount', tokenBalance)}
            >
              MAX
            </button>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div className="bridge-arrow">
        <ArrowDown className="arrow-icon" />
      </div>

      {/* To Chain */}
      <div className="chain-section">
        <div className="chain-header">
          <span className="chain-label">To</span>
          <select
            className="chain-select"
            value={formState.destinationChainId}
            onChange={(e) => updateFormState('destinationChainId', parseInt(e.target.value))}
          >
            {BRIDGE_DESTINATIONS.map((dest) => (
              <option key={dest.chain.id} value={dest.chain.id}>
                {dest.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Recipient Address</label>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="0x..."
              value={formState.recipient}
              onChange={(e) => updateFormState('recipient', e.target.value)}
              className="input"
            />
            <button className="btn-self" onClick={setRecipientToSelf}>
              Self
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="error-message">
          <AlertCircle className="icon" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {txStatus === 'success' && bridgeTxHash && (
        <div className="success-message">
          <CheckCircle className="icon" />
          <div>
            <p>Bridge transaction submitted!</p>
            <a
              href={`${optimismSepolia.blockExplorers?.default.url}/tx/${bridgeTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              View on Explorer <ExternalLink className="inline-icon" />
            </a>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-buttons">
        {needsApproval() ? (
          <button
            className="btn btn-primary btn-full"
            onClick={handleApprove}
            disabled={isApproving || !formState.tokenAddress || !formState.amount || !bridgeContractDeployed}
          >
            {isApproving ? (
              <>
                <Loader2 className="spinner" />
                Approving...
              </>
            ) : (
              `Approve ${tokenSymbol || 'Token'}`
            )}
          </button>
        ) : (
          <button
            className="btn btn-primary btn-full"
            onClick={handleBridge}
            disabled={isBridging || !formState.tokenAddress || !formState.amount || !formState.recipient || !bridgeContractDeployed}
          >
            {isBridging ? (
              <>
                <Loader2 className="spinner" />
                Bridging...
              </>
            ) : (
              `Bridge to ${destinationChain?.name || 'Destination'}`
            )}
          </button>
        )}
      </div>

      {/* Debug Info (Temporary) */}
      <div className="bridge-info" style={{ textAlign: 'left', fontSize: '10px' }}>
        <p>Debug Diagnostics:</p>
        Allowance: {debugAllowance}<br />
        Required Wei: {debugAmountWei}<br />
        <button
          onClick={() => refetchAllowance()}
          style={{ marginTop: '5px', padding: '2px 5px', background: '#333', border: '1px solid #555', color: '#fff', cursor: 'pointer' }}
        >
          Force Refresh Allowance
        </button>
      </div>

      {/* Cross Chain Balances */}
      {isConnected && formState.tokenAddress && (
        <CrossChainBalances tokenAddress={formState.tokenAddress as `0x${string}`} />
      )}

      {/* Faucet Info */}
      <div className="bridge-info">
        <p>Need test tokens? Get USD.h from the faucet:</p>
        <a
          href={`${optimismSepolia.blockExplorers?.default.url}/address/${CONTRACT_ADDRESSES.TOKEN_FAUCET}`}
          target="_blank"
          rel="noopener noreferrer"
          className="faucet-link"
        >
          TokenFaucet Contract <ExternalLink className="inline-icon" />
        </a>
      </div>
    </div>
  )
}
