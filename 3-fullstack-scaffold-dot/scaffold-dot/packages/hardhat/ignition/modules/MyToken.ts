import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MyToken", (m) => {
  const token = m.contract("MyToken");
  return { token };
});
