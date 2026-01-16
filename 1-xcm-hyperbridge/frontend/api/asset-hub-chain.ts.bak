import { TypedApi, createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { smoldotRelayChain } from "./relay-chain";
import { paseo_asset_hub as paseoAssetHub } from "@polkadot-api/descriptors";
import { smoldot } from "./smoldot";


const smoldotParaChain = Promise.all([
    smoldotRelayChain,
    import("polkadot-api/chains/paseo_asset_hub"),
]).then(([relayChain, { chainSpec }]) =>
    smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
);

const provider = getSmProvider(smoldotParaChain);
export const paraChain = createClient(provider);

export const PASEO_ASSET_HUB_CHAIN_ID = 1000;
export const paseoAssetHubChainApi = paraChain.getTypedApi(paseoAssetHub);
export type PaseoAssetHubChainApi = TypedApi<typeof paseoAssetHub>;