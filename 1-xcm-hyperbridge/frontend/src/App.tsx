import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BridgeForm } from "./components/BridgeForm";
import { bscTestnet, sepolia } from "./config/chains";

const config = getDefaultConfig({
  appName: "Hyperbridge Token Bridge",
  projectId: "demo-project-id",
  chains: [bscTestnet, sepolia],
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#e6007a",
            accentColorForeground: "white",
            borderRadius: "medium",
          })}
        >
          <div className="header">
            <div className="header-brand">
              <div className="header-logo">H</div>
              <span className="header-title">Hyperbridge</span>
              <span className="header-tag">Testnet</span>
            </div>
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus="address"
            />
          </div>

          <main className="page">
            <span className="page-title">Token Bridge</span>
            <BridgeForm />
          </main>

          <footer className="footer">
            Powered by{" "}
            <a
              href="https://hyperbridge.network"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hyperbridge Protocol
            </a>
            {" "}&middot; Polkadot Codecamp
          </footer>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
