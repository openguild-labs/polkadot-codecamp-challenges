import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {
  const defaultOwner = m.getAccount(0);
  const owner = m.getParameter("owner", defaultOwner);
  const erc20 = m.contract("ScaffoldERC20", [owner]);
  
  return { erc20 };
});

export default ERC20Module;
