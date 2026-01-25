import { NextRequest, NextResponse } from 'next/server';
import { PolkadotAgentKit, getLangChainTools } from '@polkadot-agent-kit/sdk';
import { createAction, createSuccessResponse, type ToolConfig } from "@polkadot-agent-kit/llm";
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import z from "zod";

export const maxDuration = 60;

// --- Custom Tool Definition (from README) ---
const voteTool = {
  async invoke(args: { proposalId: number; vote: "aye" | "nay"; chain: string }) {
    // Mock implementation for demo purposes
    console.log(`Voting ${args.vote} on proposal ${args.proposalId} on chain ${args.chain}`);
    return createSuccessResponse(
      `Voted ${args.vote} on proposal ${args.proposalId}`,
      "vote_on_proposal"
    )
  }
}

const voteConfig: ToolConfig = {
  name: "vote_on_proposal",
  description: "Vote on a governance proposal",
  schema: z.object({
    proposalId: z.number(),
    vote: z.enum(["aye", "nay"]),
    chain: z.string().describe("The chain to vote on, e.g. polkadot, polkadot_asset_hub, west")
  })
}

export const voteAction = createAction(voteTool, voteConfig);
// ---------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Initialize Polkadot Agent Kit
    const network = process.env.POLKADOT_NETWORK || 'westend';
    const config: any = {
      providerUrl: network === 'westend' ? 'wss://westend-rpc.polkadot.io' : 'wss://rpc.polkadot.io',
      // Explicitly limit to the target chain to avoid initializing unnecessary Smoldot instances
      chains: [network],
    };

    if (process.env.POLKADOT_PRIVATE_KEY) {
      config.privateKey = process.env.POLKADOT_PRIVATE_KEY;
    } else if (process.env.POLKADOT_MNEMONIC) {
      config.mnemonic = process.env.POLKADOT_MNEMONIC;
    } else {
      return NextResponse.json({ error: 'Polkadot credentials (Private Key or Mnemonic) not found in env' }, { status: 500 });
    }

    const agent = new PolkadotAgentKit(config);

    console.log('Initializing Polkadot Agent Kit...');
    // Connect to the Polkadot network (as per README)
    await agent.initializeApi();

    // Add custom tools 
    agent.addCustomTools([voteAction]);

    // Get all available tools at once WITH CORRECT USAGE
    const tools = getLangChainTools(agent);

    // Initialize LLM (Google Gemini)
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GOOGLE_API_KEY is not set' }, { status: 500 });
    }

    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash-lite', // Verified in user's model list
      temperature: 0,
      apiKey: apiKey,
      maxRetries: 2,
    }).bindTools(tools);

    // Run the Agent
    console.log(`User Input: ${message}`);
    const result = await llm.invoke([new HumanMessage(message)]);

    // Check if the LLM decided to call a tool
    const toolCalls = result.tool_calls;

    let responseText = "";
    if (typeof result.content === 'string') {
      responseText = result.content;
    } else if (Array.isArray(result.content)) {
      responseText = result.content.map(c => (typeof c === 'string' ? c : JSON.stringify(c))).join(' ');
    } else {
      responseText = JSON.stringify(result.content);
    }
    let toolOutputs = [];

    if (toolCalls && toolCalls.length > 0) {
      console.log('Tool calls triggered:', toolCalls.length);
      responseText += "\n\nExecuting actions on Polkadot... ⚙️";

      for (const toolCall of toolCalls) {
        const selectedTool = tools.find((t: any) => t.name === toolCall.name);
        if (selectedTool) {
          console.log(`Executing ${toolCall.name} with args:`, toolCall.args);
          try {
            const output = await selectedTool.invoke(toolCall.args);
            toolOutputs.push({ name: toolCall.name, output });

            // Format output for display
            let outputStr = typeof output === 'string' ? output : JSON.stringify(output);
            // Check if output is a success response object
            if (output && typeof output === 'object' && 'content' in output) {
              outputStr = (output as any).content;
            }

            responseText += `\n\n✅ **${toolCall.name}**: ${outputStr}`;
          } catch (err: any) {
            console.error(`Error executing ${toolCall.name}:`, err);
            responseText += `\n\n❌ **${toolCall.name}** Failed: ${err.message}`;
          }
        }
      }
    }

    return NextResponse.json({
      response: responseText,
      toolOutputs
    });

  } catch (error: any) {
    console.error('Agent Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
