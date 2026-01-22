import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyERC721Module = buildModule("MyERC721", (m) => {
  const defaultOwner = "0x36A2646BB0FFa83f133B9A2DBE69c2304F93F54E";
  const owner = m.getParameter("owner", defaultOwner);

  const myERC721 = m.contract("MyERC721", [owner]);

  return { myERC721 };
});

export default MyERC721Module;
