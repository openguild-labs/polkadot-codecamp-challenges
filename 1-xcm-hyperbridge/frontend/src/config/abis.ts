export const TOKEN_BRIDGE_ABI = [
  {
    inputs: [
      { name: "_gateway", type: "address" },
      { name: "_feeToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "GATEWAY",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEE_TOKEN",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "recipient", type: "address" },
      { name: "assetId", type: "bytes32" },
      { name: "destChainId", type: "uint256" },
      { name: "relayerFee", type: "uint256" },
      { name: "timeout", type: "uint64" },
      { name: "redeem", type: "bool" },
    ],
    name: "bridgeTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "chainId", type: "uint256" }],
    name: "getDestination",
    outputs: [{ name: "", type: "bytes" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "sender", type: "address" },
      { indexed: true, name: "recipient", type: "address" },
      { indexed: false, name: "assetId", type: "bytes32" },
      { indexed: false, name: "amount", type: "uint256" },
      { indexed: false, name: "destChainId", type: "uint256" },
    ],
    name: "TokensBridged",
    type: "event",
  },
] as const;

export const ERC20_ABI = [
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TOKEN_FAUCET_ABI = [
  {
    inputs: [{ name: "token", type: "address" }],
    name: "drip",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const TOKEN_GATEWAY_ABI = [
  {
    inputs: [
      {
        components: [
          { name: "amount", type: "uint256" },
          { name: "relayerFee", type: "uint256" },
          { name: "assetId", type: "bytes32" },
          { name: "redeem", type: "bool" },
          { name: "to", type: "bytes32" },
          { name: "dest", type: "bytes" },
          { name: "timeout", type: "uint64" },
          { name: "nativeCost", type: "uint256" },
          { name: "data", type: "bytes" },
        ],
        name: "teleportParams",
        type: "tuple",
      },
    ],
    name: "teleport",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
