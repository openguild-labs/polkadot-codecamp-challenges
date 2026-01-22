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
      // Initialize WASM crypto first to avoid out of memory errors
      try {
        const { cryptoWaitReady } = await import("@polkadot/util-crypto")
        // Wait for crypto to be ready with a timeout
        await Promise.race([
          cryptoWaitReady(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Crypto initialization timeout")), 30000)
          )
        ])
        console.log("[v0] WASM crypto initialized successfully")
      } catch (wasmError) {
        const errorMsg = wasmError instanceof Error ? wasmError.message : String(wasmError)
        console.warn("[v0] WASM crypto initialization failed:", errorMsg)
        
        // If it's an out of memory error, provide helpful message
        if (errorMsg.includes("Out of memory") || errorMsg.includes("out of memory")) {
          throw new Error(
            "WebAssembly memory allocation failed. " +
            "This usually happens when browser memory is low. " +
            "Please try: 1) Close other tabs/apps, 2) Refresh the page, 3) Use a device with more RAM."
          )
        }
        
        // Try ASM fallback for other errors
        try {
          console.log("[v0] Attempting ASM fallback...")
          const wasmInit = await import("@polkadot/wasm-crypto-init/asm")
          await wasmInit.initWasmAsm()
          console.log("[v0] ASM crypto initialized successfully")
        } catch (asmError) {
          console.error("[v0] Both WASM and ASM crypto initialization failed:", asmError)
          throw new Error(
            "Failed to initialize crypto. " +
            "WASM error: " + errorMsg + ". " +
            "ASM error: " + (asmError instanceof Error ? asmError.message : String(asmError))
          )
        }
      }

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
    <div 
      className="flex-1 flex items-center justify-center p-6"
      style={{
        background: "#0a0e27",
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(0, 153, 255, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{
              color: "#00ffff",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5)",
            }}
          >
            Polkadot Agent
          </h1>
          <p 
            className="text-sm"
            style={{
              color: "#66d9ff",
            }}
          >
            Configure your LLM provider and blockchain connection
          </p>
        </div>

        <form onSubmit={handleConnect} className="space-y-6">
          {/* Single Container with Vertical Layout */}
          <div 
            className="p-6 space-y-6"
            style={{
              background: "#0d1229",
              border: "2px solid #00ffff",
              borderRadius: "6px 8px 4px 8px",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.4), 3px 3px 0px #00ffff",
            }}
          >
            {/* LLM Configuration */}
            <div 
              className="p-4"
              style={{
                background: "#001a33",
                border: "2px solid #00d9ff",
                borderRadius: "6px 8px 4px 8px",
                boxShadow: "0 0 15px rgba(0, 217, 255, 0.3), 3px 3px 0px #00d9ff",
              }}
            >
              <h2 
                className="text-base font-bold mb-3"
                style={{
                  color: "#00d9ff",
                  textShadow: "0 0 8px rgba(0, 217, 255, 0.6)",
                }}
              >
                LLM Setup
              </h2>
              <div className="space-y-3">
                <div>
                  <label 
                    className="block text-xs font-bold mb-1"
                    style={{ color: "#00d9ff" }}
                  >
                    Provider
                  </label>
                  <select
                    value={llmProvider}
                    onChange={(e) => handleProviderChange(e.target.value as AgentProvider)}
                    style={{
                      width: "100%",
                      background: "#0a0e27",
                      border: "2px solid #00d9ff",
                      borderRadius: "4px 6px 8px 5px",
                      padding: "6px 8px",
                      color: "#00ffff",
                      fontWeight: "500",
                      fontSize: "12px",
                      boxShadow: "0 0 8px rgba(0, 217, 255, 0.3)",
                    }}
                  >
                    <option value="ollama">Ollama</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-1"
                    style={{ color: "#00d9ff" }}
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
                      background: "#0a0e27",
                      border: "2px solid #00d9ff",
                      borderRadius: "8px 4px 6px 8px",
                      padding: "6px 8px",
                      color: "#00ffff",
                      fontWeight: "500",
                      fontSize: "12px",
                      boxShadow: "0 0 8px rgba(0, 217, 255, 0.3)",
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
                      className="block text-xs font-bold mb-1"
                      style={{ color: "#00d9ff" }}
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
                        background: "#0a0e27",
                        border: "2px solid #00d9ff",
                        borderRadius: "6px 8px 4px 6px",
                        padding: "6px 8px",
                        color: "#00ffff",
                        fontWeight: "500",
                        fontSize: "12px",
                        boxShadow: "0 0 8px rgba(0, 217, 255, 0.3)",
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
                background: "#001a33",
                border: "2px solid #00d9ff",
                borderRadius: "4px 8px 6px 8px",
                boxShadow: "0 0 15px rgba(0, 217, 255, 0.3), 3px 3px 0px #00d9ff",
              }}
            >
              <h2 
                className="text-base font-bold mb-3"
                style={{
                  color: "#00d9ff",
                  textShadow: "0 0 8px rgba(0, 217, 255, 0.6)",
                }}
              >
                Blockchain Setup
              </h2>
              <div className="space-y-3">
                <div>
                  <label 
                    className="block text-xs font-bold mb-1"
                    style={{ color: "#00d9ff" }}
                  >
                    Key Type
                  </label>
                  <select
                    value={keyType}
                    onChange={(e) => setKeyType(e.target.value as "Sr25519" | "Ed25519" | "Ecdsa")}
                    style={{
                      width: "100%",
                      background: "#0a0e27",
                      border: "2px solid #00d9ff",
                      borderRadius: "8px 6px 4px 8px",
                      padding: "6px 8px",
                      color: "#00ffff",
                      fontWeight: "500",
                      fontSize: "12px",
                      boxShadow: "0 0 8px rgba(0, 217, 255, 0.3)",
                    }}
                  >
                    <option value="Sr25519">Sr25519</option>
                    <option value="Ed25519">Ed25519</option>
                    <option value="Ecdsa">Ecdsa</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-xs font-bold mb-1"
                    style={{ color: "#00d9ff" }}
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
                      background: "#0a0e27",
                      border: "2px solid #00d9ff",
                      borderRadius: "6px 4px 8px 6px",
                      padding: "6px 8px",
                      color: "#00ffff",
                      fontWeight: "500",
                      fontSize: "12px",
                      boxShadow: "0 0 8px rgba(0, 217, 255, 0.3)",
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Chains Selection */}
            <div 
              className="p-4"
              style={{
                background: "#001a33",
                border: "2px solid #00d9ff",
                borderRadius: "6px 4px 8px 6px",
                boxShadow: "0 0 15px rgba(0, 217, 255, 0.3), 3px 3px 0px #00d9ff",
              }}
            >
              <label 
                className="block text-sm font-bold mb-3"
                style={{
                  color: "#00d9ff",
                  textShadow: "0 0 8px rgba(0, 217, 255, 0.6)",
                }}
              >
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
                      borderRadius: selectedChains.includes(chain) ? "8px 5px 6px 8px" : "6px 8px 4px 8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      transition: "all 0.2s",
                      border: "2px solid #00d9ff",
                      background: selectedChains.includes(chain) ? "#00ffff" : "#0a0e27",
                      color: selectedChains.includes(chain) ? "#0a0e27" : "#00ffff",
                      boxShadow: selectedChains.includes(chain) 
                        ? "0 0 15px rgba(0, 255, 255, 0.6), 2px 2px 0px #00d9ff" 
                        : "0 0 8px rgba(0, 217, 255, 0.3)",
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
              className="p-4 text-sm"
              style={{
                background: "#ff0066",
                border: "2px solid #00ffff",
                borderRadius: "6px 8px 5px 8px",
                boxShadow: "0 0 15px rgba(255, 0, 102, 0.6), 3px 3px 0px #00ffff",
                color: "white",
              }}
            >
              <div className="font-bold mb-2">{error}</div>
              {error.includes("Out of memory") && (
                <div className="text-xs opacity-90 mb-3">
                  <p className="mb-1">💡 Suggestions:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Close other browser tabs to free up memory</li>
                    <li>Refresh the page and try again</li>
                    <li>Use a device with more available RAM</li>
                    <li>Wait a few seconds before retrying</li>
                  </ul>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setError(null)
                  setDisabled(false)
                }}
                className="text-xs font-bold px-3 py-1 mt-2 hover:opacity-80 transition-opacity"
                style={{
                  background: "#00ffff",
                  color: "#0a0e27",
                  border: "1px solid #00ffff",
                  borderRadius: "4px",
                }}
              >
                Dismiss & Retry
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || selectedChains.length === 0 || disabled}
            style={{
              width: "100%",
              background: disabled || loading || selectedChains.length === 0 ? "#1a2342" : "#00ffff",
              color: disabled || loading || selectedChains.length === 0 ? "#66d9ff" : "#0a0e27",
              fontWeight: "bold",
              padding: "12px",
              borderRadius: "8px 6px 4px 8px",
              border: "2px solid #00ffff",
              boxShadow: disabled || loading || selectedChains.length === 0 
                ? "none" 
                : "0 0 20px rgba(0, 255, 255, 0.6), 3px 3px 0px #00ffff",
              transition: "all 0.2s",
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
