import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC721Module = buildModule("ERC721Module", (m) => {
  const collectionName = m.getParameter("name", "MyNFT");
  const collectionSymbol = m.getParameter("symbol", "MNFT");
  
  const erc721 = m.contract("ERC721Token", [collectionName, collectionSymbol]);
  
  return { erc721 };
});

export default ERC721Module;
