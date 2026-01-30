import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const KhanhQuanTokenModule = buildModule("KhanhQuanToken", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const KhanhQuanToken = m.contract("KhanhQuanToken", ["0xCDEC43D8c276F14466f196D61453A314bc28c0ac"]);

  return { KhanhQuanToken };
});

export default KhanhQuanTokenModule;