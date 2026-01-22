import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GameItemModule = buildModule("GameItemModule", (m) => {
  const gameItem = m.contract("GameItem", []);

  return { gameItem };
});

export default GameItemModule;