import { getContract } from "viem";
import { publicClient, getWalletClient } from "./viem";
import UniswapV2FactoryArtifact from "../../abis/UniswapV2Factory.json";
import UniswapV2PairArtifact from "../../abis/UniswapV2Pair.json";
import ERC20Artifact from "../../abis/ERC20.json";

// Deployed Contract Addresses on Paseo Asset Hub
export const CONTRACTS = {
  FACTORY: "0x2B437a99303752D61d94dce066F1f11400D4dD22" as `0x${string}`,
  TOKEN_A: "0x804892Bd4A820208c57f53a327CA179E12E01170" as `0x${string}`,
  TOKEN_B: "0x890fab1f9c5154Eefcfd3FB90aAd5100e0b6FCa6" as `0x${string}`,
  PAIR_TKA_TKB: "0x4a28ED6ae9213fA78e16284537950A6071112613" as `0x${string}`,
};

// Extract ABI arrays from Hardhat artifacts
export const ABIS = {
  FACTORY: UniswapV2FactoryArtifact.abi,
  PAIR: UniswapV2PairArtifact.abi,
  TOKEN: ERC20Artifact.abi,
};

// Get Factory contract instance for reading
export const getFactoryContract = () => {
  return getContract({
    address: CONTRACTS.FACTORY,
    abi: ABIS.FACTORY,
    client: publicClient,
  });
};

// Get Pair contract instance for reading
export const getPairContract = (pairAddress: `0x${string}`) => {
  return getContract({
    address: pairAddress,
    abi: ABIS.PAIR,
    client: publicClient,
  });
};

// Get Token contract instance for reading
export const getTokenContract = (tokenAddress: `0x${string}`) => {
  return getContract({
    address: tokenAddress,
    abi: ABIS.TOKEN,
    client: publicClient,
  });
};

// Get signed Factory contract for writing
export const getSignedFactoryContract = async () => {
  const walletClient = await getWalletClient();
  return {
    contract: getContract({
      address: CONTRACTS.FACTORY,
      abi: ABIS.FACTORY,
      client: walletClient,
    }),
    walletClient,
  };
};

// Get signed Pair contract for writing
export const getSignedPairContract = async (pairAddress: `0x${string}`) => {
  const walletClient = await getWalletClient();
  return {
    contract: getContract({
      address: pairAddress,
      abi: ABIS.PAIR,
      client: walletClient,
    }),
    walletClient,
  };
};

// Get signed Token contract for writing
export const getSignedTokenContract = async (tokenAddress: `0x${string}`) => {
  const walletClient = await getWalletClient();
  return {
    contract: getContract({
      address: tokenAddress,
      abi: ABIS.TOKEN,
      client: walletClient,
    }),
    walletClient,
  };
};
