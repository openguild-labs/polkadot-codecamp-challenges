import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {

  const initialSupply = m.getParameter("initialSupply", 1000n * 10n ** 18n);
  const token = m.contract("GLDToken", [initialSupply]);

  return { token };
});

export default ERC20Module;