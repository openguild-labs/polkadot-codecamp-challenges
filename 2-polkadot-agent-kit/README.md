# Challenge 2: Polkadot Agent Kit

Use the `@polkadot-agent-kit` tool to build AI-powered cross-chain applications. Integrate AI capabilities with Polkadot blockchain functionality.

## You can choose one of the following features:

1.  Nomination Staking
2.  XCM Cross-Chain Swap on Hydration with multiple pairs 
3.  Other Ideas such as Governance Agent, Bounty Agent, .... 

## Requirements

  * Use `polkadot-agent-kit`, mainly the 2 packages `@polkadot-agent-kit/llm` and `@polkadot-agent-kit/sdk`.
  * For **Nomination Staking**, use all of the following tool calls:
      * `join_pool`
      * `bond_extra`
      * `unbond`
      * `withdraw_unbonded`
      * `claim_rewards`
      * `get_pool_info`
  * For **XCM Cross-Chain swap**, use the following tool call:
      * `swap_tokens`

## How to use `polkadot-agent-kit`

GitHub Link: [https://github.com/elasticlabs-org/polkadot-agent-kit](https://github.com/elasticlabs-org/polkadot-agent-kit)

```bash
pnpm add @polkadot-agent-kit/llm @polkadot-agent-kit/sdk
```

### Main Usage

```typescript
import { PolkadotAgentKit } from '@polkadot-agent-kit/sdk';

// Initialize the Polkadot Agent Kit with your credentials
const agent = new PolkadotAgentKit({
  privateKey: "your-private-key-here",
  keyType: "Sr25519", // Options: "Sr25519", "Ed25519", "Ecdsa"
});

// Connect to the Polkadot network
await agent.initializeApi();

// Option 1: Get specific tools individually
const balanceTool = agent.getNativeBalanceTool();
const transferTool = agent.transferNativeTool();
const xcmTransferTool = agent.xcmTransferNativeTool();

// Option 2: Get all available tools at once
const allTools = agent.getLangChainTools();

// Now you can use these tools with your AI agent or LangChain
```

### Extend your features by using `addToolCalls`

```typescript
// Define new tools
import z from "zod";
import { createAction, createSuccessResponse, type ToolConfig } from "@polkadot-agent-kit/llm"

// 1. Build a LangChain-style tool
const voteTool = {
    async invoke(args: { proposalId: number; vote: "aye" | "nay" ; chain: string }) {
        // TODO:
        // - Call the vote on the proposal
        // - Return the result

        return createSuccessResponse(
            `Voted ${args.vote} on proposal ${args.proposalId}`,
            "vote_on_proposal"
        )
    }
}

// 2. Describe it with a ToolConfig
const voteConfig: ToolConfig = {
    name: "vote_on_proposal",
    description: "Vote on a governance proposal",
    schema: z.object({
        proposalId: z.number(),
        vote: z.enum(["aye", "nay"]),
        chain: z.string().describe("The chain to vote on, e.g. polkadot, polkadot_asset_hub, west")
    })
}

// 3. Convert to an Action and register
export const voteAction = createAction(voteTool, voteConfig)

// Add custom tools 
agent.addCustomTools([voteAction]);
```

### Resources

  * **Official Docs:** [https://cocdap.github.io/agent-docs/](https://cocdap.github.io/agent-docs/)
  * **Example Telegram:** [https://github.com/elasticlabs-org/polkadot-agent-kit/tree/main/examples/telegram-bot](https://github.com/elasticlabs-org/polkadot-agent-kit/tree/main/examples/telegram-bot)
  * **Example MCP Server:** [https://github.com/elasticlabs-org/polkadot-agent-kit/tree/main/examples/mcp-server](https://github.com/elasticlabs-org/polkadot-agent-kit/tree/main/examples/mcp-server)
  * **LunoKit** [https://github.com/Luno-lab/LunoKit](https://github.com/Luno-lab/LunoKit)

## Submission Requirements

  * [ ] Create AI-powered cross-chain applications using `polkadot-agent-kit`.
  * [ ] Use `LunoKit` to integrate Wallet , show all accounts and Connected Chain
  * [ ] Link github project 
  * [ ] Recording Video to demo 

