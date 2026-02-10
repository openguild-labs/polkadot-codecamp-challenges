import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC20Module = buildModule("ERC20Module", (m) => {
  const tokenName = m.getParameter("name", "MyToken");
  const tokenSymbol = m.getParameter("symbol", "MTK");
  const initialSupply = m.getParameter("initialSupply", 1000000n * 10n ** 18n);
  
  const erc20 = m.contract("ERC20Token", [tokenName, tokenSymbol, initialSupply]);
  
  return { erc20 };
});

export default ERC20Module;
