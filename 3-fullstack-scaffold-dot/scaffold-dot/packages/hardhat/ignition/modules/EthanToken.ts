import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EthanTokenModule = buildModule("EthanToken", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const ethanToken = m.contract("EthanToken", ["0x64Af47389872C326835598e9ffB26B69ecD9B8ae"]);
  
  return { ethanToken };
});

export default EthanTokenModule;