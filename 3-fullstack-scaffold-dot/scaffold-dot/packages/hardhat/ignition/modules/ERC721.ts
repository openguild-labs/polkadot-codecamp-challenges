import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC721Module = buildModule("ERC721Module", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const erc721 = m.contract("ScaffoldERC721", [owner]);
  
  return { erc721 };
});

export default ERC721Module;
