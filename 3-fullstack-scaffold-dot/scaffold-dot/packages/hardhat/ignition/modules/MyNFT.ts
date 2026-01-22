import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyNFT", (m) => {
  const nft = m.contract("MyNFT");
  return { nft };
});
