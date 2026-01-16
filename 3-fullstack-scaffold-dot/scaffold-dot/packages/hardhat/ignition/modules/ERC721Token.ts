import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyERC721", (m) => {
  const owner = "0x1063E6521b82267D3CAc61A146BCC2bE81516559";

  const erc721 = m.contract("MyERC721", [owner]);

  return { ERC721Token: erc721 };
});
