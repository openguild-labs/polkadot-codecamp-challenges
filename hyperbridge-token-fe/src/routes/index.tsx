import { createFileRoute } from '@tanstack/react-router'
import { useAppKitAccount } from '@reown/appkit/react'
import { ConnectWallet } from '../components/ConnectWallet'
import { BridgeForm } from '../components/BridgeForm'

export const Route = createFileRoute('/')({
  component: BridgePage,
})

function BridgePage() {
  const { isConnected } = useAppKitAccount()

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="logo-text">Hyperbridge</span>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          {/* Hero Section */}
          <div className="hero">
            <h1 className="hero-title">Token Bridge</h1>
            <p className="hero-subtitle">
              Bridge your tokens between Optimism Sepolia and other testnets
              using Hyperbridge cross-chain communication.
            </p>
            <div className="network-badge">
              <span className="badge">Gargantua V3 Testnet</span>
            </div>
          </div>

          {/* Bridge Card */}
          <div className="bridge-card">
            {isConnected ? (
              <BridgeForm />
            ) : (
              <div className="connect-prompt">
                <div className="connect-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Connect Your Wallet</h3>
                <p>Connect your wallet to start bridging tokens across chains.</p>
                <ConnectWallet />
              </div>
            )}
          </div>

          {/* Features */}
          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure</h4>
              <p>Powered by Hyperbridge cryptographic proofs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h4>Fast</h4>
              <p>Quick cross-chain transfers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h4>Low Fees</h4>
              <p>Pay fees in USD.h stablecoin</p>
            </div>
          </div>

          {/* Supported Networks */}
          <div className="networks-section">
            <h3>Supported Networks</h3>
            <div className="networks-grid">
              <div className="network-card">
                <span className="network-icon">🔴</span>
                <span>Optimism Sepolia</span>
              </div>
              <div className="network-card">
                <span className="network-icon">🔵</span>
                <span>Ethereum Sepolia</span>
              </div>
              <div className="network-card">
                <span className="network-icon">⚪</span>
                <span>Base Sepolia</span>
              </div>
              <div className="network-card">
                <span className="network-icon">🟣</span>
                <span>Arbitrum Sepolia</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built with Hyperbridge SDK • Polkadot Codecamp 2026</p>
        <div className="footer-links">
          <a href="https://docs.hyperbridge.network/" target="_blank" rel="noopener noreferrer">
            Hyperbridge Docs
          </a>
          <span>•</span>
          <a href="https://github.com/polytope-labs/hyperbridge-sdk" target="_blank" rel="noopener noreferrer">
            SDK GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
