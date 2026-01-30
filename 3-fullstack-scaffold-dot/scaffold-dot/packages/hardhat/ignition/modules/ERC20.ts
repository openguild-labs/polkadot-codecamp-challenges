import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20", (m) => {
  const erc20 = m.contract("ERC20");
  return { erc20 };
});

export default ERC20Module;
