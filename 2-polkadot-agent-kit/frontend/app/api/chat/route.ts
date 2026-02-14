import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  ToolMessage,
} from "@langchain/core/messages";
import { PolkadotAgentKit, getLangChainTools } from "@polkadot-agent-kit/sdk";
import {
  SWAP_PROMPT,
  ASSETS_PROMPT,
  XCM_PROMPT,
  DYNAMIC_CHAIN_INITIALIZATION_PROMPT,
} from "@polkadot-agent-kit/llm";

let initPromise: Promise<PolkadotAgentKit> | null = null;

function getAgentKit(): Promise<PolkadotAgentKit> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const privateKey = process.env.AGENT_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("AGENT_PRIVATE_KEY is not set");
    }

    const isMnemonic = privateKey.includes(" ");

    console.log("[agent] Creating PolkadotAgentKit with chains: paseo, paseo_asset_hub");
    const kit = new PolkadotAgentKit({
      ...(isMnemonic ? { mnemonic: privateKey } : { privateKey }),
      keyType: "Sr25519",
      chains: ["paseo", "paseo_asset_hub"],
    });

    console.log("[agent] Calling initializeApi()...");
    await kit.initializeApi();
    console.log("[agent] Agent fully initialized and ready");

    return kit;
  })();

  initPromise.catch(() => {
    initPromise = null;
  });

  return initPromise;
}

getAgentKit().catch((err) =>
  console.error("[agent] Background init failed:", err)
);

const SYSTEM_PROMPT = [
  "You are an AI assistant that helps users perform cross-chain token swaps on the Polkadot ecosystem using Hydration DEX.",
  "You have access to tools for swapping tokens, checking balances, and transferring assets across chains.",
  "",
  ASSETS_PROMPT,
  SWAP_PROMPT,
  XCM_PROMPT,
  DYNAMIC_CHAIN_INITIALIZATION_PROMPT,
  "",
  "When users ask to swap tokens, use the swap_tokens tool.",
  "If an operation fails due to chain not being initialized, use initialize_chain_api first and then retry.",
  "Be helpful and explain what you're doing at each step.",
].join("\n");

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    console.log("[chat] Received message:", message);

    const agent = await getAgentKit();
    const tools = getLangChainTools(agent);
    console.log("[chat] Agent ready, tools:", tools.map((t) => t.name));

    const llm = new ChatOpenAI({
      model: "gpt-4.1-mini",
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
      timeout: 60000,
    });

    const llmWithTools = llm.bindTools(tools);

    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...history.map((msg: { role: string; content: string }) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content)
      ),
      new HumanMessage(message),
    ];

    console.log("[chat] Calling LLM...");
    let response = await llmWithTools.invoke(messages);
    messages.push(response);
    console.log(
      "[chat] LLM response, tool_calls:",
      response.tool_calls?.length ?? 0
    );

    // Tool execution loop
    let iterations = 0;
    while (
      response.tool_calls &&
      response.tool_calls.length > 0 &&
      iterations < 10
    ) {
      iterations++;
      const toolMessages: ToolMessage[] = [];

      for (const toolCall of response.tool_calls) {
        const tool = tools.find((t) => t.name === toolCall.name);
        if (tool) {
          console.log(
            `[chat] Executing tool: ${toolCall.name}`,
            toolCall.args
          );
          try {
            const result = await tool.invoke(toolCall.args);
            const content =
              typeof result === "string" ? result : JSON.stringify(result);
            console.log(`[chat] Tool ${toolCall.name} result:`, content);
            toolMessages.push(
              new ToolMessage({
                content,
                tool_call_id: toolCall.id || toolCall.name,
              })
            );
          } catch (error) {
            const errMsg =
              error instanceof Error ? error.message : String(error);
            console.error(`[chat] Tool ${toolCall.name} error:`, errMsg);
            toolMessages.push(
              new ToolMessage({
                content: `Error: ${errMsg}`,
                tool_call_id: toolCall.id || toolCall.name,
              })
            );
          }
        } else {
          console.warn(`[chat] Tool not found: ${toolCall.name}`);
          toolMessages.push(
            new ToolMessage({
              content: `Error: Tool ${toolCall.name} not found`,
              tool_call_id: toolCall.id || toolCall.name,
            })
          );
        }
      }

      // Send tool results back to LLM
      const messagesWithResults = [...messages, ...toolMessages];
      console.log("[chat] Calling LLM with tool results...");
      response = await llmWithTools.invoke(messagesWithResults);
      messages.push(...toolMessages, response);
      console.log(
        "[chat] LLM response, tool_calls:",
        response.tool_calls?.length ?? 0
      );
    }

    const content =
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content);

    console.log("[chat] Final response:", content.substring(0, 300));
    return NextResponse.json({ response: content });
  } catch (error) {
    console.error("[chat] API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
