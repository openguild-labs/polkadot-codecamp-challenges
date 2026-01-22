import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { ASSETS_PROMPT } from "@polkadot-agent-kit/llm";

export class AgentWrapper {
  private llmWithTools!: any;
  private tools: any[] = []; // FIX 1

  async init(tools: any[] = []) {
    const apiKey = process.env.GEMINI_API_KEY
      || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI API key");
    }

    this.tools = tools; // FIX 2

    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-pro",
      apiKey,
    });

    this.llmWithTools = llm.bindTools(this.tools);
  }

  async ask(question: string): Promise<string> {
    if (!this.llmWithTools) {
      throw new Error("Agent not initialized");
    }

    const messages = [
      new SystemMessage(ASSETS_PROMPT),
      new HumanMessage(question),
    ];

    const response = await this.llmWithTools.invoke(messages);

    const toolCalls =
      response.additional_kwargs?.tool_calls ?? [];

    if (toolCalls.length === 0) {
      return response.content as string;
    }

    const toolCall = toolCalls[0];
    const tool = this.tools.find(t => t.name === toolCall.name);

    if (!tool) {
      throw new Error(`Tool not found: ${toolCall.name}`);
    }

    const result = await tool.invoke(toolCall.args);

    const finalResponse = await this.llmWithTools.invoke([
      ...messages,
      response,
      new ToolMessage({
        content: JSON.stringify(result),
        tool_call_id: toolCall.id,
      }),
    ]);

    return finalResponse.content as string;
  }
}
