"use client"

import { AgentWrapper } from "@/app/agent/agent-wrapper"
import { registerNominationInfoTool } from "@/app/agent/getNominationInfo"
import { useState, type FormEvent, useMemo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

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
  const [openSections, setOpenSections] = useState({
    llm: true,
    blockchain: false,
    chains: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  } 

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
        background: "#0f0b1e",
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0f0b1e 0%, #0a0718 100%)
        `,
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 
            className="text-4xl font-semibold mb-3"
            style={{
              color: "#e8e6f3",
              letterSpacing: "-0.02em",
            }}
          >
            Polkadot Agent
          </h1>
          <p 
            className="text-base"
            style={{
              color: "rgba(232, 230, 243, 0.7)",
            }}
          >
            Configure your LLM provider and blockchain connection
          </p>
        </div>

        <form onSubmit={handleConnect} className="space-y-4">
          {/* Single Container with Vertical Layout */}
          <div 
            className="p-8 space-y-4 glass"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)",
            }}
          >
            {/* LLM Configuration - Accordion */}
            <div 
              className="overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('llm');
                }}
                className="w-full p-5 flex items-center justify-between hover:bg-opacity-10 transition-all cursor-pointer"
                style={{
                  background: openSections.llm ? "rgba(139, 92, 246, 0.1)" : "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                <div 
                  className="text-lg font-semibold flex items-center gap-2"
                  style={{
                    color: "#c4b5fd",
                    letterSpacing: "-0.01em",
                    pointerEvents: "none",
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: "rgba(139, 92, 246, 0.6)" }}>Step 1</span>
                  LLM Setup
                </div>
                {openSections.llm ? (
                  <ChevronUp size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                ) : (
                  <ChevronDown size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                )}
              </button>
              <div 
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openSections.llm ? "1000px" : "0px",
                }}
              >
                <div className="px-5 pb-5 space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(232, 230, 243, 0.9)" }}
                  >
                    Provider
                  </label>
                  <select
                    value={llmProvider}
                    onChange={(e) => handleProviderChange(e.target.value as AgentProvider)}
                    className="w-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#e8e6f3",
                      fontWeight: "400",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="ollama">Ollama</option>
                    <option value="openai">OpenAI</option>
                    <option value="gemini">Gemini</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(232, 230, 243, 0.9)" }}
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    list="model-suggestions"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. gpt-4"
                    className="w-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#e8e6f3",
                      fontWeight: "400",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
                      e.target.style.boxShadow = "none";
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
                      className="block text-sm font-medium mb-2"
                      style={{ color: "rgba(232, 230, 243, 0.9)" }}
                    >
                      API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter key"
                      className="w-full"
                      style={{
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        borderRadius: "8px",
                        padding: "10px 12px",
                        color: "#e8e6f3",
                        fontWeight: "400",
                        fontSize: "14px",
                        transition: "all 0.2s",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
                        e.target.style.boxShadow = "none";
                      }}
                      required
                    />
                  </div>
                )}
                </div>
              </div>
            </div>

            {/* Blockchain Configuration - Accordion */}
            <div 
              className="overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('blockchain');
                }}
                className="w-full p-5 flex items-center justify-between hover:bg-opacity-10 transition-all cursor-pointer"
                style={{
                  background: openSections.blockchain ? "rgba(139, 92, 246, 0.1)" : "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                <div 
                  className="text-lg font-semibold flex items-center gap-2"
                  style={{
                    color: "#c4b5fd",
                    letterSpacing: "-0.01em",
                    pointerEvents: "none",
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: "rgba(139, 92, 246, 0.6)" }}>Step 2</span>
                  Blockchain Setup
                </div>
                {openSections.blockchain ? (
                  <ChevronUp size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                ) : (
                  <ChevronDown size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                )}
              </button>
              <div 
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openSections.blockchain ? "1000px" : "0px",
                }}
              >
                <div className="px-5 pb-5 space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(232, 230, 243, 0.9)" }}
                  >
                    Key Type
                  </label>
                  <select
                    value={keyType}
                    onChange={(e) => setKeyType(e.target.value as "Sr25519" | "Ed25519" | "Ecdsa")}
                    className="w-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#e8e6f3",
                      fontWeight: "400",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="Sr25519">Sr25519</option>
                    <option value="Ed25519">Ed25519</option>
                    <option value="Ecdsa">Ecdsa</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: "rgba(232, 230, 243, 0.9)" }}
                  >
                    Private Key
                  </label>
                  <input
                    type="password"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    placeholder="0x... or seed"
                    className="w-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#e8e6f3",
                      fontWeight: "400",
                      fontSize: "14px",
                      transition: "all 0.2s",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(139, 92, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(139, 92, 246, 0.3)";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>
                </div>
              </div>
            </div>

            {/* Chains Selection - Accordion */}
            <div 
              className="overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSection('chains');
                }}
                className="w-full p-5 flex items-center justify-between hover:bg-opacity-10 transition-all cursor-pointer"
                style={{
                  background: openSections.chains ? "rgba(139, 92, 246, 0.1)" : "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                <div 
                  className="text-lg font-semibold flex items-center gap-2"
                  style={{
                    color: "#c4b5fd",
                    letterSpacing: "-0.01em",
                    pointerEvents: "none",
                  }}
                >
                  <span className="text-sm font-medium" style={{ color: "rgba(139, 92, 246, 0.6)" }}>Step 3</span>
                  Select Chains
                </div>
                {openSections.chains ? (
                  <ChevronUp size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                ) : (
                  <ChevronDown size={20} style={{ color: "#c4b5fd", pointerEvents: "none" }} />
                )}
              </button>
              <div 
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openSections.chains ? "1000px" : "0px",
                }}
              >
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-3 gap-3">
                    {availableChains.map((chain: any) => (
                      <button
                        key={chain}
                        type="button"
                        onClick={() => handleChainToggle(chain)}
                        className="transition-all duration-200"
                        style={{
                          padding: "10px 12px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: "500",
                          border: selectedChains.includes(chain) 
                            ? "1px solid rgba(139, 92, 246, 0.5)" 
                            : "1px solid rgba(139, 92, 246, 0.2)",
                          background: selectedChains.includes(chain) 
                            ? "rgba(139, 92, 246, 0.2)" 
                            : "rgba(255, 255, 255, 0.05)",
                          color: selectedChains.includes(chain) ? "#c4b5fd" : "rgba(232, 230, 243, 0.7)",
                          boxShadow: selectedChains.includes(chain) 
                            ? "0 4px 12px rgba(139, 92, 246, 0.3)" 
                            : "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedChains.includes(chain)) {
                            e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedChains.includes(chain)) {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.2)";
                          }
                        }}
                      >
                        {chain}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error and Launch Button - Outside main container */}
          {error && (
            <div 
              className="p-5 text-sm glass mt-6"
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)",
                color: "#fca5a5",
              }}
            >
              <div className="font-semibold mb-3" style={{ color: "#fca5a5" }}>{error}</div>
              {error.includes("Out of memory") && (
                <div className="text-xs opacity-90 mb-4" style={{ color: "rgba(252, 165, 165, 0.8)" }}>
                  <p className="mb-2 font-medium">💡 Suggestions:</p>
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
                className="text-sm font-medium px-4 py-2 mt-2 transition-all"
                style={{
                  background: "rgba(139, 92, 246, 0.2)",
                  color: "#c4b5fd",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                }}
              >
                Dismiss & Retry
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || selectedChains.length === 0 || disabled}
            className="w-full font-semibold py-4 transition-all duration-200 mt-6"
            style={{
              background: disabled || loading || selectedChains.length === 0 
                ? "rgba(139, 92, 246, 0.1)" 
                : "#8b5cf6",
              color: disabled || loading || selectedChains.length === 0 
                ? "rgba(232, 230, 243, 0.5)" 
                : "#ffffff",
              borderRadius: "12px",
              border: "none",
              boxShadow: disabled || loading || selectedChains.length === 0 
                ? "none" 
                : "0 4px 16px rgba(139, 92, 246, 0.4)",
              cursor: loading || selectedChains.length === 0 ? "not-allowed" : "pointer",
              opacity: loading || selectedChains.length === 0 ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!disabled && !loading && selectedChains.length > 0) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && !loading && selectedChains.length > 0) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(139, 92, 246, 0.4)";
              }
            }}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
