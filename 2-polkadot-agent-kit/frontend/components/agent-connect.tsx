"use client";

import { AgentWrapper } from "@/app/agent/agent-wrapper";
import { registerNominationInfoTool } from "@/app/agent/getNominationInfo";
import { useState, type FormEvent, useMemo } from "react";

type AgentProvider = "ollama" | "openai" | "gemini";

interface AgentConnectProps {
  onConnect: (agent: AgentWrapper) => void;
}

export default function AgentConnect({ onConnect }: AgentConnectProps) {
  const [llmProvider, setLlmProvider] = useState<AgentProvider>("ollama");
  const [model, setModel] = useState("llama3.2");
  const [apiKey, setApiKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [keyType, setKeyType] = useState<"Sr25519" | "Ed25519" | "Ecdsa">(
    "Sr25519",
  );
  const [selectedChains, setSelectedChains] = useState<string[]>(["westend"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const isMnemonic = (input: string) => {
    return (
      input.trim().split(/\s+/).length >= 12 && /^[a-z\s]+$/.test(input.trim())
    );
  };

  const availableChains = useMemo(() => {
    try {
      const { getAllSupportedChains } = require("@polkadot-agent-kit/common");
      const chains = getAllSupportedChains();
      return chains.map(
        (chain: any) => chain.id || chain.name || String(chain),
      );
    } catch {
      return ["westend", "paseo", "polkadot"];
    }
  }, []);

  const modelSuggestions: Record<AgentProvider, string[]> = {
    openai: ["gpt-4o", "gpt-4-turbo", "gpt-4"],
    ollama: ["llama3.2", "qwen2:latest", "phi3:latest"],
    gemini: ["gemini-2.5-flash", "gemini-2.5-pro"],
  };

  const requiresApiKey = (provider: AgentProvider): boolean => {
    return provider === "openai" || provider === "gemini";
  };

  const handleProviderChange = (provider: AgentProvider) => {
    setLlmProvider(provider);
    const suggestions = modelSuggestions[provider];
    setModel(suggestions?.[0] ?? "");
  };

  const handleChainToggle = (chain: string) => {
    setSelectedChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain],
    );
  };

  const handleConnect = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDisabled(true);

    try {
      let actualPrivateKey = privateKey;
      if (isMnemonic(privateKey)) {
        const { mnemonicToMiniSecret } = await import("@polkadot/util-crypto");
        const { Keyring } = await import("@polkadot/keyring");
        const { u8aToHex } = await import("@polkadot/util");
        const seed = mnemonicToMiniSecret(privateKey);
        const keyring = new Keyring({ type: keyType.toLowerCase() });
        const pair = keyring.addFromSeed(seed);
        console.log("SS58 address:", pair.address);
        console.log("Seed bytes length:", seed.length);
        console.log("Seed hex:", u8aToHex(seed));
        console.log("PublicKey bytes length:", pair.publicKey.length);
        console.log("PublicKey hex:", u8aToHex(pair.publicKey));
        actualPrivateKey = u8aToHex(seed);
      }

      const { PolkadotAgentKit } = await import("@polkadot-agent-kit/sdk");
      const agentKit = new PolkadotAgentKit({
        privateKey: actualPrivateKey,
        keyType: keyType as any,
        chains: selectedChains as any,
      });

      await agentKit.initializeApi();

      registerNominationInfoTool(agentKit);

      const agent = new AgentWrapper(agentKit, {
        provider: llmProvider,
        model,
        apiKey: requiresApiKey(llmProvider) ? apiKey : undefined,
      });

      await agent.init(
        "You are a helpful Polkadot staking assistant. Interpret natural language requests for nomination pool actions like join_pool, bond_extra, unbond, withdraw_unbonded, and claim_rewards.",
      );

      onConnect(agent);
      console.log("[v0] Agent connected successfully!");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to connect agent";
      setError(msg);
      console.error("[v0] Error connecting agent:", err);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-sky-50">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-sky-800">
            Polkadot Agent
          </h1>
          <p className="text-sm text-sky-600">
            Configure your LLM provider and blockchain connection
          </p>
        </div>

        <form onSubmit={handleConnect} className="space-y-6">
          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* LLM Configuration */}
            <div
              className="p-4"
              style={{
                background: "#e0f2fe",
                border: "2px solid #0369a1",
                borderRadius: "6px 8px 4px 8px",
                boxShadow: "3px 3px 0px #0369a1",
              }}
            >
              <h2 className="text-base font-bold mb-3 text-sky-800">
                LLM Setup
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-sky-700">
                    Provider
                  </label>
                  <select
                    value={llmProvider}
                    onChange={(e) =>
                      handleProviderChange(e.target.value as AgentProvider)
                    }
                    style={{
                      width: "100%",
                      background: "white",
                      border: "2px solid #0369a1",
                      borderRadius: "4px 6px 8px 5px",
                      padding: "6px 8px",
                      color: "#0c4a6e",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    <option value="ollama">Ollama</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-sky-700">
                    Model
                  </label>
                  <input
                    type="text"
                    list="model-suggestions"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. gpt-4"
                    style={{
                      width: "100%",
                      background: "white",
                      border: "2px solid #0369a1",
                      borderRadius: "8px 4px 6px 8px",
                      padding: "6px 8px",
                      color: "#0c4a6e",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  />
                  <datalist id="model-suggestions">
                    {modelSuggestions[llmProvider].map((m) => (
                      <option key={m} value={m} />
                    ))}
                  </datalist>
                </div>

                {requiresApiKey(llmProvider) && (
                  <div>
                    <label className="block text-xs font-bold mb-1 text-sky-700">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter key"
                      style={{
                        width: "100%",
                        background: "white",
                        border: "2px solid #0369a1",
                        borderRadius: "6px 8px 4px 6px",
                        padding: "6px 8px",
                        color: "#0c4a6e",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Blockchain Configuration */}
            <div
              className="p-4"
              style={{
                background: "#f0f9ff",
                border: "2px solid #0369a1",
                borderRadius: "4px 8px 6px 8px",
                boxShadow: "3px 3px 0px #0369a1",
              }}
            >
              <h2 className="text-base font-bold mb-3 text-sky-800">
                Blockchain Setup
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1 text-sky-700">
                    Key Type
                  </label>
                  <select
                    value={keyType}
                    onChange={(e) =>
                      setKeyType(
                        e.target.value as "Sr25519" | "Ed25519" | "Ecdsa",
                      )
                    }
                    style={{
                      width: "100%",
                      background: "white",
                      border: "2px solid #0369a1",
                      borderRadius: "8px 6px 4px 8px",
                      padding: "6px 8px",
                      color: "#0c4a6e",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    <option value="Sr25519">Sr25519</option>
                    <option value="Ed25519">Ed25519</option>
                    <option value="Ecdsa">Ecdsa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 text-sky-700">
                    Private Key
                  </label>
                  <input
                    type="password"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="0x... or seed"
                    style={{
                      width: "100%",
                      background: "white",
                      border: "2px solid #0369a1",
                      borderRadius: "6px 4px 8px 6px",
                      padding: "6px 8px",
                      color: "#0c4a6e",
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Chains Selection - Full Width */}
          <div
            className="p-4"
            style={{
              background: "#f0f9ff",
              border: "2px solid #0369a1",
              borderRadius: "6px 4px 8px 6px",
              boxShadow: "3px 3px 0px #0369a1",
            }}
          >
            <label className="block text-sm font-bold mb-3 text-sky-800">
              Select Chains
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableChains.map((chain: any) => (
                <button
                  key={chain}
                  type="button"
                  onClick={() => handleChainToggle(chain)}
                  style={{
                    padding: "8px 10px",
                    borderRadius: selectedChains.includes(chain)
                      ? "8px 5px 6px 8px"
                      : "6px 8px 4px 8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    transition: "all 0.2s",
                    border: "2px solid #0369a1",
                    background: selectedChains.includes(chain)
                      ? "#38bdf8"
                      : "white",
                    color: selectedChains.includes(chain)
                      ? "#0c4a6e"
                      : "#075985",
                    boxShadow: selectedChains.includes(chain)
                      ? "2px 2px 0px #0369a1"
                      : "none",
                    cursor: "pointer",
                  }}
                >
                  {chain}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div
              className="p-4 text-sm font-bold"
              style={{
                background: "#fecaca",
                border: "2px solid #dc2626",
                borderRadius: "6px 8px 5px 8px",
                boxShadow: "3px 3px 0px #dc2626",
                color: "#991b1b",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || selectedChains.length === 0 || disabled}
            style={{
              width: "100%",
              background:
                disabled || loading || selectedChains.length === 0
                  ? "#94a3b8"
                  : "#38bdf8",
              color:
                disabled || loading || selectedChains.length === 0
                  ? "#64748b"
                  : "#0c4a6e",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "8px 6px 4px 8px",
              border: "2px solid #0369a1",
              boxShadow: "3px 3px 0px #0369a1",
              transition: "all 0.2s",
              cursor:
                loading || selectedChains.length === 0
                  ? "not-allowed"
                  : "pointer",
              opacity: loading || selectedChains.length === 0 ? 0.6 : 1,
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-sky-200 border-t-sky-800 rounded-full animate-spin"></div>
                Connecting...
              </div>
            ) : (
              "Launch Agent"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
