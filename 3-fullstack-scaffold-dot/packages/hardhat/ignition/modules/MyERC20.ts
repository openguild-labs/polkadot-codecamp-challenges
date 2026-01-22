import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MyERC20Module = buildModule("MyERC20", (m) => {
  const defaultOwner = "0x36A2646BB0FFa83f133B9A2DBE69c2304F93F54E";
  const owner = m.getParameter("owner", defaultOwner);
  const initialSupply = m.getParameter("initialSupply", 1_000n * 10n ** 18n);

  const myERC20 = m.contract("MyERC20", [owner, initialSupply]);

  return { myERC20 };
});

export default MyERC20Module;
