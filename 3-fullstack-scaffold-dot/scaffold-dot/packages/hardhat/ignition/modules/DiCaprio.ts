import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DiCaprioModule = buildModule("DiCaprioNFT", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const GameItem = m.contract("DiCaprio", ["0xdE3C137489C65f11F1F9aE88E6F9026920602cB8"]);
  
  return { GameItem };
});

export default DiCaprioModule;