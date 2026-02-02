import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NathanTokenModule = buildModule("NathanTok", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const nathanTok = m.contract("NathanTok", ["0xdE3C137489C65f11F1F9aE88E6F9026920602cB8"]);
  
  return { nathanTok };
});

export default NathanTokenModule;