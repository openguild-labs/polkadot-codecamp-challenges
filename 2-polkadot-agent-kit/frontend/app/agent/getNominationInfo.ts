import { z } from "zod";
import { isChainIdAssetHub, type KnownChainId } from "@polkadot-agent-kit/common";
import {
	createAction,
	createErrorResponse,
	createSuccessResponse,
	type ToolConfig,
} from "@polkadot-agent-kit/llm";
import { convertAddress, getPoolInfo } from "@polkadot-agent-kit/core";
import type { PolkadotAgentKit } from "@polkadot-agent-kit/sdk";

const nominationInfoSchema = z.object({
	account: z.string().describe("SS58 address of the pool member"),
	chain: z
		.string()
		.describe(
			"Asset Hub chain ID that supports nomination pools (polkadot_asset_hub, west_asset_hub, kusama_asset_hub, paseo_asset_hub)",
		),
});

const nominationInfoConfig: ToolConfig = {
	name: "get_nomination_info",
	description:
		"Fetch nomination pool membership details (pool points, state, roles, pending rewards) for a given account on an Asset Hub chain.",
	schema: nominationInfoSchema,
};

async function getPendingRewards(api: any, memberAddress: string): Promise<string | null> {
	const poolsApi = api?.call?.NominationPoolsApi;
	if (!poolsApi) return null;

	const fn = poolsApi.pending_rewards || poolsApi.pendingRewards;
	if (!fn) return null;

	const raw = await fn(memberAddress);
	if (raw === undefined || raw === null) return null;
	return typeof raw === "bigint" ? raw.toString() : raw.toString?.() ?? String(raw);
}

function normalizeMember(rawMember: any) {
	if (!rawMember) return null;

	return {
		poolId: Number(rawMember.pool_id),
		points: rawMember.points?.toString?.() ?? String(rawMember.points),
		lastRecordedRewardCounter:
			rawMember.last_recorded_reward_counter?.toString?.() ?? String(rawMember.last_recorded_reward_counter),
		unbondingEras: Array.from(rawMember.unbonding_eras || []).map((eraEntry: any) => {
			const [era, value] = Array.isArray(eraEntry) ? eraEntry : [undefined, undefined];
			const eraNumber = era === undefined ? 0 : Number(era);
			return {
				era: eraNumber,
				value: value?.toString?.() ?? (value !== undefined ? String(value) : "0"),
			};
		}),
	};
}

function normalizePool(rawPool: any) {
	if (!rawPool) return null;

	return {
		id: rawPool.id,
		state: rawPool.state,
		points: rawPool.points?.toString?.() ?? String(rawPool.points),
		memberCounter: rawPool.memberCounter?.toString?.() ?? String(rawPool.memberCounter),
		roles: rawPool.roles,
	};
}

export function createNominationInfoAction(agentKit: PolkadotAgentKit) {
	const nominationInfoTool = {
		async invoke(args: z.infer<typeof nominationInfoSchema>) {
			const { account, chain } = args;

			try {
				if (!isChainIdAssetHub(chain)) {
					return createErrorResponse(
						`Nomination pools are only supported on Asset Hub chains. Received '${chain}'.`,
						nominationInfoConfig.name,
					);
				}

				const api = agentKit.getApi(chain as KnownChainId);
				await api.waitReady;

				const memberAddress = convertAddress(account, chain as KnownChainId);
				const poolMember = await api.query.NominationPools.PoolMembers.getValue(memberAddress);

				if (!poolMember) {
					return createSuccessResponse(
						{
							account: memberAddress,
							chain,
							member: null,
							pool: null,
							pendingRewards: null,
						},
						nominationInfoConfig.name,
					);
				}

				const poolId = Number(poolMember.pool_id);
				const poolInfo = await getPoolInfo(api, poolId);
				const pendingRewards = await getPendingRewards(api, memberAddress);

				return createSuccessResponse(
					{
						account: memberAddress,
						chain,
						member: normalizeMember(poolMember),
						pool: normalizePool(poolInfo),
						pendingRewards,
					},
					nominationInfoConfig.name,
				);
			} catch (error) {
				const message = error instanceof Error ? error.message : String(error);
				return createErrorResponse(message, nominationInfoConfig.name);
			}
		},
	};

	return createAction(nominationInfoTool, nominationInfoConfig);
}

export function registerNominationInfoTool(agentKit: PolkadotAgentKit) {
	agentKit.addCustomTools([createNominationInfoAction(agentKit)]);
}