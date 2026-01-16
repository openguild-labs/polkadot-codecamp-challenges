import { AccountId, Binary, SS58String } from "polkadot-api";
import {
    PASEO_ASSET_HUB_CHAIN_ID,
    paseoAssetHubChainApi,
} from "./asset-hub-chain";
import {
    XcmVersionedLocation,
    XcmV3MultiassetFungibility,
    XcmV3Junctions,
    XcmVersionedAssets,
    XcmV3WeightLimit,
    XcmV3Junction,
    XcmV5Junctions,
} from "@polkadot-api/descriptors";

const encodeAccount = AccountId().enc;

export const reserveTransferToParachain = (
    address: SS58String,
    amount: bigint
): any => {
    // TODO: Implement a logic to reserve transfer to parachain
    const xcmTx = paseoAssetHubChainApi.tx.PolkadotXcm.reserve_transfer_assets({
        dest: XcmVersionedLocation.V4({
            parents: 1,
            interior: XcmV3Junctions.X1(
                XcmV3Junction.Parachain(PASEO_ASSET_HUB_CHAIN_ID)
            ),
        }),
        beneficiary: getBeneficiary(0, address),
        assets: getNativeAsset(0, amount),
        fee_asset_item: 0,
    });
    return xcmTx;
};

export const teleportToParaChain = (address: SS58String, amount: bigint) => {
    // TODO: Implement a logic to teleport to parachain

    // Construct XCM transaction to teleport from relay chain (PASEO) to parachain (PASEO Asset Hub)
    const xcmTx = paseoAssetHubChainApi.tx.PolkadotXcm.transfer_assets({
        dest: XcmVersionedLocation.V4({
            parents: 0, // Because we are in the relay chain at the moment
            interior: XcmV3Junctions.X1(
                XcmV3Junction.Parachain(PASEO_ASSET_HUB_CHAIN_ID)
            ),
        }),
        beneficiary: getBeneficiary(0, address),
        assets: getNativeAsset(0, amount),
        fee_asset_item: 0,
        weight_limit: XcmV3WeightLimit.Unlimited(),
    });

    return xcmTx;
};

export const teleportToRelayChain = (
    address: SS58String,
    amount: bigint
): any => {
    // TODO: Implement a logic to teleport to relaychain

    // Construct XCM transaction to teleport from parachain (PASEO Asset Hub) to relay chain (PASEO)
    const xcmTx = paseoAssetHubChainApi.tx.PolkadotXcm.transfer_assets({
        dest: XcmVersionedLocation.V4({
            parents: 1, // Because we are in the parachain which is the "child" of the relay chain
            interior: XcmV3Junctions.Here(),
        }),
        beneficiary: getBeneficiary(0, address),
        assets: getNativeAsset(1, amount),
        fee_asset_item: 0,
        weight_limit: XcmV3WeightLimit.Unlimited(),
    });

    return xcmTx;
};

const getBeneficiary = (parents: number, address: SS58String | Uint8Array) =>
    XcmVersionedLocation.V4({
        parents,
        interior: XcmV3Junctions.X1(
            XcmV3Junction.AccountId32({
                network: undefined,
                id: Binary.fromBytes(
                    address instanceof Uint8Array ? address : encodeAccount(address)
                ),
            })
        ),
    });

// Get the native asset in the form of XCM
const getNativeAsset = (parents: number, amount: bigint) =>
    XcmVersionedAssets.V4([
        {
            id: {
                parents,
                interior: XcmV5Junctions.Here(),
            },
            fun: XcmV3MultiassetFungibility.Fungible(amount),
        },
    ]);