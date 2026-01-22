import { ChatOpenAI } from "@langchain/openai";
import { ChatOllama } from "@langchain/ollama";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, BaseMessage, ToolMessage } from "@langchain/core/messages";
import { PolkadotAgentKit, getLangChainTools } from "@polkadot-agent-kit/sdk";
import { ASSETS_PROMPT, XCM_PROMPT} from "@polkadot-agent-kit/llm"

export type AgentProvider = "openai" | "ollama" | "gemini";

export interface AgentResponse {
  input: string;
  output: string;
  intermediateSteps: any[];
  provider: AgentProvider;
  model: string;
}

export interface AgentConfig {
  provider: AgentProvider;
  model: string;
  apiKey?: string;
  systemPrompt?: string;
}

export class AgentWrapper {
  provider: AgentProvider;
  model: string;
  private llmWithTools: any;
  private tools: any[];
  private apiKey?: string;
  private systemPrompt: string = ASSETS_PROMPT + XCM_PROMPT;

  constructor(
    private agentKit: PolkadotAgentKit,
    config: AgentConfig
  ) {
    this.provider = config.provider;
    this.model = config.model;
    this.apiKey = config.apiKey;
    this.tools = [];
  }

  async init(systemPrompt?: string) {
    console.log(`Initializing ${this.provider} with model: ${this.model}`);
    
    // Use ASSETS_PROMPT as default, or combine with custom prompt if provided
    this.systemPrompt = systemPrompt 
      ? `${ASSETS_PROMPT}\n\nAdditional instructions: ${systemPrompt}`
      : ASSETS_PROMPT;
    this.tools = getLangChainTools(this.agentKit);

    let llm;
    switch (this.provider) {
      case "gemini":
        if (!this.apiKey) {
          throw new Error("Gemini API key is required");
        }
        llm = new ChatGoogleGenerativeAI({
          model: this.model,
          apiKey: this.apiKey,
          convertSystemMessageToHumanContent: true,
        });
        break;

      case "openai":
        if (!this.apiKey) {
          throw new Error("OpenAI API key is required");
        }
        llm = new ChatOpenAI({
          model: this.model,
          apiKey: this.apiKey,
        });
        break;

      case "ollama":
        llm = new ChatOllama({
          model: this.model,
          baseUrl: "http://localhost:11434", // Default Ollama URL
        });
        break;

      default:
        throw new Error(`Unsupported provider: ${this.provider}`);
    }

    // Bind tools to the LLM (modern approach without deprecated AgentExecutor)
    this.llmWithTools = llm.bindTools(this.tools);

    console.log("Agent initialized successfully");
  }

  async ask(query: string): Promise<AgentResponse> {
    if (!this.llmWithTools) {
      throw new Error("Agent not initialized. Call init() first.");
    }

    const messages: BaseMessage[] = [
      new SystemMessage(this.systemPrompt),
      new HumanMessage(query),
    ];

    const intermediateSteps: any[] = [];
    let currentMessages: BaseMessage[] = messages;
    let iterations = 0;
    const maxIterations = 15;

    // Agent loop: invoke LLM, check for tool calls, execute tools, repeat
    while (iterations < maxIterations) {
      iterations++;

      const response = await this.llmWithTools.invoke(currentMessages);
      intermediateSteps.push(response);

      // Check if there are tool calls
      if (!response.tool_calls || response.tool_calls.length === 0) {
        // No more tool calls, return the final response
        const output = typeof response.content === 'string'
          ? response.content
          : JSON.stringify(response.content);

        return {
          input: query,
          output,
          intermediateSteps,
          provider: this.provider,
          model: this.model,
        };
      }

      // Execute tool calls
      currentMessages = [...currentMessages, response];

      for (const toolCall of response.tool_calls) {
        try {
          const tool = this.tools.find((t: any) => t.name === toolCall.name);
          if (!tool) {
            throw new Error(`Tool ${toolCall.name} not found`);
          }

          const toolResult = await tool.invoke(toolCall.args);
          
          // Use ToolMessage for tool results (LangChain standard)
          currentMessages.push(
            new ToolMessage({
              content: JSON.stringify(toolResult),
              tool_call_id: toolCall.id || toolCall.name,
            })
          );
          intermediateSteps.push({ tool: toolCall.name, result: toolResult });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          
          // Use ToolMessage for errors too
          currentMessages.push(
            new ToolMessage({
              content: `Error: ${errorMessage}`,
              tool_call_id: toolCall.id || toolCall.name,
            })
          );
          intermediateSteps.push({ tool: toolCall.name, error: errorMessage });
        }
      }
    }

    // Max iterations reached
    return {
      input: query,
      output: "Maximum iterations reached without completing the task.",
      intermediateSteps,
      provider: this.provider,
      model: this.model,
    };
  }

  isReady(): boolean {
    return !!this.llmWithTools;
  }
}
