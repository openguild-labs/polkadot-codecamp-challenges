import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MatMeoModule = buildModule("MatMeoNFT", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const MatMeo = m.contract("MatMeo", ["0x64Af47389872C326835598e9ffB26B69ecD9B8ae"]);
  
  return { MatMeo };
});

export default MatMeoModule;