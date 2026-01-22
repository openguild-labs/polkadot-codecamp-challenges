import { NextResponse } from "next/server";
import { AgentWrapper } from "@/lib/agent";
import { PolkadotAgentKit } from "@polkadot-agent-kit/sdk";

export async function POST(req: Request) {
  const { message } = await req.json();

  const agentKit = new PolkadotAgentKit({
    privateKey: process.env.DEMO_PRIVATE_KEY!,
    keyType: "Sr25519",
  });

  await agentKit.initializeApi();

  const tools = agentKit.getLangChainTools();

  const agent = new AgentWrapper();
  await agent.init(tools);

  const answer = await agent.ask(message);

  return NextResponse.json({ answer });
}
