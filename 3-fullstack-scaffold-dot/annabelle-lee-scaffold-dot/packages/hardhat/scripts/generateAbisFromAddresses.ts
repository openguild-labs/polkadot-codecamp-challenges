/**
 * Generate TypeScript ABIs from already deployed contract addresses
 * Useful when contracts are already deployed and you just need to update the frontend
 */

import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

async function generateAbisFromAddresses() {
  console.log("📝 Generating TypeScript ABIs from deployed addresses...\n");

  // Paseo testnet deployed addresses (from your deployment)
  const deployedContracts: Record<string, string> = {
    ERC20Token: "0xED940451B58fDa5c5D1074A687c9a4486D1E8cd7",
    ERC721Token: "0x13e3FE2e4b4869aB59a342fD0e2205489CF23513",
    YourContract: "0x08Fc69fF90c71037B3Cfc57a893B4da079B8EbBE",
  };

  console.log("📋 Using deployed contract addresses:");
  for (const [name, address] of Object.entries(deployedContracts)) {
    console.log(`   ${name}: ${address}`);
  }
  console.log("");

  const hre = require("hardhat");
  const generateTsAbis = require("./generateTsAbis").default;
  
  // Pass chain ID directly (Paseo testnet)
  await generateTsAbis(hre, deployedContracts, "420420422");

  console.log("\n✅ ABI generation complete!");
  console.log("   Frontend contracts updated in packages/nextjs/contracts/deployedContracts.ts");
}

// Run if executed directly
if (require.main === module) {
  generateAbisFromAddresses().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export default generateAbisFromAddresses;
