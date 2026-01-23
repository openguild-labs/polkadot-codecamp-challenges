"use client"

import { AgentWrapper } from "@/app/agent/agent-wrapper"
import { registerNominationInfoTool } from "@/app/agent/getNominationInfo"
import { useState, type FormEvent, useMemo } from "react"

type AgentProvider = "ollama" | "openai" | "gemini"

interface AgentConnectProps {
  onConnect: (agent: AgentWrapper) => void
}

export default function AgentConnect({ onConnect }: AgentConnectProps) {
  const [llmProvider, setLlmProvider] = useState<AgentProvider>("ollama")
  const [model, setModel] = useState("llama3.2")
  const [apiKey, setApiKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [keyType, setKeyType] = useState<"Sr25519" | "Ed25519" | "Ecdsa">("Sr25519")
  const [selectedChains, setSelectedChains] = useState<string[]>(["westend"])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(false) 

  const isMnemonic = (input: string) => {
    return (input.trim().split(/\s+/).length >= 12 && /^[a-z\s]+$/.test(input.trim()))
  }

  const availableChains = useMemo(() => {
    try {
      const { getAllSupportedChains } = require("@polkadot-agent-kit/common")
      const chains = getAllSupportedChains()
      return chains.map((chain: any) => chain.id || chain.name || String(chain))
    } catch {
      return ["westend", "paseo", "polkadot"]
    }
  }, [])

  const modelSuggestions: Record<AgentProvider, string[]> = {
    openai: ["gpt-4o", "gpt-4-turbo", "gpt-4"],
    ollama: ["llama3.2", "qwen2:latest", "phi3:latest"],
    gemini: ["gemini-2.5-flash", "gemini-2.5-pro"],
  }

  const requiresApiKey = (provider: AgentProvider): boolean => {
    return provider === "openai" || provider === "gemini"
  }

  const handleProviderChange = (provider: AgentProvider) => {
    setLlmProvider(provider)
    const suggestions = modelSuggestions[provider]
    setModel(suggestions?.[0] ?? "")
  }

  const handleChainToggle = (chain: string) => {
    setSelectedChains((prev) => (prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain]))
  }

  const handleConnect = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setDisabled(true) // Set disabled to true when connecting

    try {
      let actualPrivateKey = privateKey
      // If user input is mnemonic, convert to seed and log info
      if (isMnemonic(privateKey)) {
        const { mnemonicToMiniSecret } = await import("@polkadot/util-crypto")
        const { Keyring } = await import("@polkadot/keyring")
        const { u8aToHex } = await import("@polkadot/util")
        const seed = mnemonicToMiniSecret(privateKey)
        const keyring = new Keyring({ type: keyType.toLowerCase() })
        const pair = keyring.addFromSeed(seed)
        console.log("SS58 address:", pair.address)
        console.log("Seed bytes length:", seed.length) // 32
        console.log("Seed hex:", u8aToHex(seed)) // 0x + 64 hex chars
        console.log("PublicKey bytes length:", pair.publicKey.length) // 32
        console.log("PublicKey hex:", u8aToHex(pair.publicKey)) // 0x + 64 hex chars
        actualPrivateKey = u8aToHex(seed)
      }

      const { PolkadotAgentKit } = await import("@polkadot-agent-kit/sdk")
      const agentKit = new PolkadotAgentKit({
        privateKey: actualPrivateKey,
        keyType: keyType as any,
        chains: selectedChains as any,
      })

      await agentKit.initializeApi()

      registerNominationInfoTool(agentKit)

      const agent = new AgentWrapper(agentKit, {
        provider: llmProvider,
        model,
        apiKey: requiresApiKey(llmProvider) ? apiKey : undefined,
      })

      await agent.init(
        "You are a helpful Polkadot staking assistant. Interpret natural language requests for nomination pool actions like join_pool, bond_extra, unbond, withdraw_unbonded, and claim_rewards.",
      )

      onConnect(agent)
      console.log("[v0] Agent connected successfully!")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to connect agent"
      setError(msg)
      console.error("[v0] Error connecting agent:", err)
    } finally {
      setLoading(false)
      setDisabled(false) // Set disabled to false after connection attempt
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-8 sm:p-8 bg-background min-h-screen">
      <div className="w-full max-w-3xl md:max-w-4xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-3 text-foreground tracking-tight"
          >
            Polkadot Agent
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-4"></div>
          <p
            className="text-base sm:text-lg text-muted-foreground"
          >
            Initialize your AI assistant with blockchain capabilities
          </p>
        </div>

        <form onSubmit={handleConnect} className="space-y-6 sm:space-y-8">
          {/* Single Column - Full Width Sections */}
          <div className="space-y-8">
            {/* LLM Configuration */}
            <div 
              className="p-5 sm:p-6 rounded-lg border transition-all hover:shadow-lg"
              style={{
                background: "#252525",
                borderColor: "#4a4a4a",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-8 bg-gray-600 rounded"></div>
                <h2 
                  className="text-lg font-bold text-foreground"
                >
                  LLM Configuration
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Provider
                  </label>
                  <select
                    value={llmProvider}
                    onChange={(e) => handleProviderChange(e.target.value as AgentProvider)}
                    style={{
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #3a3a3a",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      color: "#e0e0e0",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    <option value="ollama">Ollama</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
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
                      background: "#1a1a1a",
                      border: "1px solid #3a3a3a",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      color: "#e0e0e0",
                      fontWeight: "500",
                      fontSize: "14px",
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
                    <label 
                      className="block text-sm font-semibold mb-2 text-foreground"
                    >
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter key"
                      style={{
                        width: "100%",
                        background: "#1a1a1a",
                        border: "1px solid #3a3a3a",
                        borderRadius: "6px",
                        padding: "10px 12px",
                        color: "#e0e0e0",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                      required
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Blockchain Configuration */}
            <div 
              className="p-5 sm:p-6 rounded-lg border transition-all hover:shadow-lg"
              style={{
                background: "#252525",
                borderColor: "#4a4a4a",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-8 bg-gray-600 rounded"></div>
                <h2 
                  className="text-lg font-bold text-foreground"
                >
                  Blockchain Setup
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Key Type
                  </label>
                  <select
                    value={keyType}
                    onChange={(e) => setKeyType(e.target.value as "Sr25519" | "Ed25519" | "Ecdsa")}
                    style={{
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #3a3a3a",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      color: "#e0e0e0",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    <option value="Sr25519">Sr25519</option>
                    <option value="Ed25519">Ed25519</option>
                    <option value="Ecdsa">Ecdsa</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-sm font-semibold mb-2 text-foreground"
                  >
                    Private Key
                  </label>
                  <input
                    type="password"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="0x... or seed"
                    style={{
                      width: "100%",
                      background: "#1a1a1a",
                      border: "1px solid #3a3a3a",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      color: "#e0e0e0",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Chains Selection */}
            <div 
              className="p-5 sm:p-6 rounded-lg border transition-all hover:shadow-lg"
              style={{
                background: "#252525",
                borderColor: "#4a4a4a",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-8 bg-gray-600 rounded"></div>
                <label 
                  className="text-lg font-bold text-foreground"
                >
                  Select Chains
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableChains.map((chain: any) => (
                  <button
                    key={chain}
                    type="button"
                    onClick={() => handleChainToggle(chain)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      border: "1px solid " + (selectedChains.includes(chain) ? "#888888" : "#3a3a3a"),
                      background: selectedChains.includes(chain) ? "#4a4a4a" : "#1a1a1a",
                      color: selectedChains.includes(chain) ? "#f0f0f0" : "#b0b0b0",
                      cursor: "pointer",
                    }}
                  >
                    {chain}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div 
              className="p-4 rounded-lg border text-sm font-semibold"
              style={{
                background: "#2a1a1a",
                borderColor: "#d32f2f",
                color: "#ff6b6b",
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
              background: disabled || loading || selectedChains.length === 0 ? "#3a3a3a" : "#4a4a4a",
              color: disabled || loading || selectedChains.length === 0 ? "#707070" : "#f0f0f0",
              fontWeight: "bold",
              padding: "14px 16px",
              borderRadius: "6px",
              border: "1px solid " + (disabled || loading || selectedChains.length === 0 ? "#2a2a2a" : "#5a5a5a"),
              transition: "all 0.3s ease",
              cursor: loading || selectedChains.length === 0 ? "not-allowed" : "pointer",
              opacity: loading || selectedChains.length === 0 ? 0.6 : 1,
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Connecting...
              </div>
            ) : (
              "Launch Agent"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
