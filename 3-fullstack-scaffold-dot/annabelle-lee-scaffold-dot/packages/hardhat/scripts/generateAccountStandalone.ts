/**
 * Standalone account generation script that doesn't require Hardhat compiler
 * Uses ethers directly to avoid Hardhat compiler download issues
 */

import { ethers } from "ethers";
import { parse, stringify } from "envfile";
import * as fs from "fs";
import * as path from "path";
import password from "@inquirer/password";

const envFilePath = path.join(__dirname, "../.env");

const getValidatedPassword = async () => {
  while (true) {
    const pass = await password({ message: "Enter a password to encrypt your private key:" });
    const confirmation = await password({ message: "Confirm password:" });

    if (pass === confirmation) {
      return pass;
    }
    console.log("❌ Passwords don't match. Please try again.");
  }
};

const setNewEnvConfig = async (existingEnvConfig = {}) => {
  console.log("👛 Generating new Wallet\n");
  const randomWallet = ethers.Wallet.createRandom();

  const pass = await getValidatedPassword();
  const encryptedJson = await randomWallet.encrypt(pass);

  const newEnvConfig = {
    ...existingEnvConfig,
    DEPLOYER_PRIVATE_KEY_ENCRYPTED: encryptedJson,
  };

  // Store in .env
  fs.writeFileSync(envFilePath, stringify(newEnvConfig));
  console.log("\n📄 Encrypted Private Key saved to packages/hardhat/.env file");
  console.log("🪄 Generated wallet address:", randomWallet.address, "\n");
  console.log("⚠️ Make sure to remember your password! You'll need it to decrypt the private key.");
  console.log("\n💡 Next steps:");
  console.log("   1. Fund this address on Paseo testnet: https://faucet.polkadot.io/?parachain=1111");
  console.log("   2. Update hardhat.config.ts: defaultNetwork = 'passetHub'");
  console.log("   3. Update scaffold.config.ts: targetNetworks = [passetHub]");
  console.log("   4. Run: yarn deploy");
};

async function main() {
  if (!fs.existsSync(envFilePath)) {
    // No .env file yet.
    await setNewEnvConfig();
    return;
  }

  const existingEnvConfig = parse(fs.readFileSync(envFilePath).toString());
  if (existingEnvConfig.DEPLOYER_PRIVATE_KEY_ENCRYPTED) {
    console.log("⚠️ You already have a deployer account. Check the packages/hardhat/.env file");
    console.log("   To generate a new account, delete the .env file first or use a different location.");
    return;
  }

  await setNewEnvConfig(existingEnvConfig);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
