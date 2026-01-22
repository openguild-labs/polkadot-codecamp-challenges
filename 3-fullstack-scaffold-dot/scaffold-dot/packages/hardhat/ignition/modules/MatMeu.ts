import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MatMeuModule = buildModule("MatMeuNFT", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const MatMeu = m.contract("MatMeu", ["0x64Af47389872C326835598e9ffB26B69ecD9B8ae"]);
  
  return { MatMeu };
});

export default MatMeuModule;