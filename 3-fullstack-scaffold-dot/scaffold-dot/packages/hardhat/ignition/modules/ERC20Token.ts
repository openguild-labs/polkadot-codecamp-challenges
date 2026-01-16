import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyERC20", (m) => {
  const owner = "0x1063E6521b82267D3CAc61A146BCC2bE81516559";

  const erc20 = m.contract("MyERC20", [
    owner,
    "Scaffold Token",
    "SCT",
    1_000_000n * 10n ** 18n
  ]);

  return { ERC20Token: erc20 };
});
