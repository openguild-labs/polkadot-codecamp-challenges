import { ConnectButton } from "@luno-kit/ui";
import ChatInterface from "./components/ChatInterface";
import WalletInfo from "./components/WalletInfo";
import NetworkBadge from "./components/NetworkBadge";

export default function Home() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header-left">
          <div className="app-logo">P</div>
          <h1>Polkadot Agent</h1>
        </div>
        <div className="app-header-right">
          <NetworkBadge />
          <ConnectButton chainStatus="none" />
        </div>
      </header>

      <div className="app-content">
        <aside className="app-sidebar">
          <WalletInfo />
        </aside>

        <main className="app-main">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
