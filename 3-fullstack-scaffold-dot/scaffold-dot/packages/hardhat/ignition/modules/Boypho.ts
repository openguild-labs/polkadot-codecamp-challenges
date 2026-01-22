import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BoyphoModule = buildModule("BOYPHONFT", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const Boypho = m.contract("Boypho", ["0xCDEC43D8c276F14466f196D61453A314bc28c0ac"]);

  return { Boypho };
});

export default BoyphoModule;
