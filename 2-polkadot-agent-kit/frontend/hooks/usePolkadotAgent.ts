"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChatOpenAI } from "@langchain/openai";
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
} from "@langchain/core/messages";
import {
  PolkadotAgentKit,
  getLangChainTools,
} from "@polkadot-agent-kit/sdk";
import { ASSETS_PROMPT } from "@polkadot-agent-kit/llm";

type UsePolkadotAgentParams = {
  agentKit: PolkadotAgentKit;
  apiKey: string;
};

export function usePolkadotAgent({
  agentKit,
  apiKey,
}: UsePolkadotAgentParams) {
  const llmWithToolsRef = useRef<any>(null);
  const toolsRef = useRef<any[]>([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        setReady(false);
        setError(null);

        const tools = getLangChainTools(agentKit);
        toolsRef.current = tools;

        const llm = new ChatOpenAI({
          model: "gpt-4o-mini",
          apiKey,
        });

        llmWithToolsRef.current = llm.bindTools(tools);

        setReady(true);
      } catch (err: any) {
        setError(err?.message ?? "Init agent failed");
      }
    }

    if (agentKit && apiKey) {
      init();
    }
  }, [agentKit, apiKey]);

  const ask = useCallback(async (question: string): Promise<string> => {
    if (!ready || !llmWithToolsRef.current) {
      throw new Error("Agent is not ready");
    }

    setLoading(true);
    setError(null);

    try {
      const messages = [
        new SystemMessage(ASSETS_PROMPT),
        new HumanMessage(question),
      ];

      const response = await llmWithToolsRef.current.invoke(messages);

      if (!response.tool_calls || response.tool_calls.length === 0) {
        return response.content;
      }

      const toolCall = response.tool_calls[0];
      const tool = toolsRef.current.find(
        (t) => t.name === toolCall.name
      );

      if (!tool) {
        throw new Error(`Tool not found: ${toolCall.name}`);
      }

      const toolResult = await tool.invoke(toolCall.args);

      const finalResponse = await llmWithToolsRef.current.invoke([
        ...messages,
        response,
        new ToolMessage({
          content: JSON.stringify(toolResult),
          tool_call_id: toolCall.id,
        }),
      ]);

      return finalResponse.content;
    } catch (err: any) {
      setError(err?.message ?? "Ask failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [ready]);

  return {
    ready,   
    loading,   
    error,     
    ask,      
  }
}
