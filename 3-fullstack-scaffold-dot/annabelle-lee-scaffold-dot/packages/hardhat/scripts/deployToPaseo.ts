/**
 * Deployment script specifically for Paseo testnet
 * Uses Foundry artifacts with Hardhat's deployment system
 * Bypasses Hardhat compiler download issues
 */

import * as fs from "fs";
import * as path from "path";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import password from "@inquirer/password";

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

interface FoundryArtifact {
  abi: any[];
  bytecode: {
    object: string;
  };
}

async function loadFoundryArtifact(contractName: string): Promise<FoundryArtifact> {
  const contractToFile: Record<string, string> = {
    "ERC20Token": "ERC20",
    "ERC721Token": "ERC721",
    "YourContract": "YourContract",
  };

  const solFileName = contractToFile[contractName] || contractName;
  const possiblePaths = [
    path.join(__dirname, "../foundry/out/contracts", `${solFileName}.sol`, `${contractName}.json`),
    path.join(__dirname, "../foundry/out", `${solFileName}.sol`, `${contractName}.json`),
  ];

  let artifactPath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      artifactPath = p;
      break;
    }
  }

  if (!artifactPath) {
    throw new Error(`Artifact not found for ${contractName}. Tried:\n${possiblePaths.join("\n")}\n\nRun 'yarn foundry:build' first.`);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
  return {
    abi: artifact.abi,
    bytecode: artifact.bytecode,
  };
}

async function getDeployerWallet(): Promise<ethers.Wallet> {
  // Try environment variable first
  const envPrivateKey = process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY;
  if (envPrivateKey) {
    return new ethers.Wallet(envPrivateKey);
  }

  // Try encrypted key
  const encryptedKey = process.env.DEPLOYER_PRIVATE_KEY_ENCRYPTED;
  if (encryptedKey) {
    const pass = await password({ message: "Enter password to decrypt private key:" });
    try {
      const wallet = await ethers.Wallet.fromEncryptedJson(encryptedKey, pass);
      // fromEncryptedJson returns Wallet | HDNodeWallet, but both are compatible
      return wallet as ethers.Wallet;
    } catch (e) {
      throw new Error("Failed to decrypt private key. Wrong password?");
    }
  }

  throw new Error("No deployer private key found. Set __RUNTIME_DEPLOYER_PRIVATE_KEY or run 'yarn account:generate'");
}

async function deployToPaseo() {
  console.log("🚀 Deploying contracts to Paseo Asset Hub testnet...\n");

  // Paseo RPC URL
  const rpcUrl = "https://testnet-passet-hub-eth-rpc.polkadot.io";
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Get deployer wallet
  const wallet = await getDeployerWallet();
  const deployer = wallet.connect(provider);

  console.log("Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "PAS\n");

  if (balance === 0n) {
    console.log("⚠️  WARNING: Account has zero balance!");
    console.log("   Fund your account at: https://faucet.polkadot.io/?parachain=1111\n");
  }

  const deployedContracts: Record<string, string> = {};

  try {
    // Deploy ERC20Token
    console.log("📦 Deploying ERC20Token...");
    const erc20Artifact = await loadFoundryArtifact("ERC20Token");
    const erc20Factory = new ethers.ContractFactory(erc20Artifact.abi, erc20Artifact.bytecode.object, deployer);
    const erc20 = await erc20Factory.deploy("MyToken", "MTK", ethers.parseEther("1000000"));
    await erc20.waitForDeployment();
    const erc20Address = await erc20.getAddress();
    deployedContracts["ERC20Token"] = erc20Address;
    console.log(`✅ ERC20Token deployed to: ${erc20Address}`);

    // Deploy ERC721Token
    console.log("\n📦 Deploying ERC721Token...");
    const erc721Artifact = await loadFoundryArtifact("ERC721Token");
    const erc721Factory = new ethers.ContractFactory(erc721Artifact.abi, erc721Artifact.bytecode.object, deployer);
    const erc721 = await erc721Factory.deploy("MyNFT", "MNFT");
    await erc721.waitForDeployment();
    const erc721Address = await erc721.getAddress();
    deployedContracts["ERC721Token"] = erc721Address;
    console.log(`✅ ERC721Token deployed to: ${erc721Address}`);

    // Deploy YourContract
    console.log("\n📦 Deploying YourContract...");
    const yourContractArtifact = await loadFoundryArtifact("YourContract");
    const yourContractFactory = new ethers.ContractFactory(yourContractArtifact.abi, yourContractArtifact.bytecode.object, deployer);
    const yourContract = await yourContractFactory.deploy(deployer.address);
    await yourContract.waitForDeployment();
    const yourContractAddress = await yourContract.getAddress();
    deployedContracts["YourContract"] = yourContractAddress;
    console.log(`✅ YourContract deployed to: ${yourContractAddress}`);

    // Generate TypeScript ABIs
    console.log("\n📝 Generating TypeScript ABIs...");
    const hre = require("hardhat");
    const generateTsAbis = require("./generateTsAbis").default;
    // Pass chain ID directly since we're not using Hardhat's network provider
    await generateTsAbis(hre, deployedContracts, "420420422"); // Paseo testnet chain ID

    console.log("\n✨ Deployment complete!");
    console.log("\n📋 Deployment Summary:");
    console.log(`   Network: Paseo Asset Hub (Chain ID: 420420422)`);
    console.log(`   ERC20Token: ${erc20Address}`);
    console.log(`   ERC721Token: ${erc721Address}`);
    console.log(`   YourContract: ${yourContractAddress}`);
    console.log(`\n🔍 View on Blockscout: https://blockscout-passet-hub.parity-testnet.parity.io/address/${erc20Address}`);

  } catch (error: any) {
    console.error("❌ Deployment failed:", error.message);
    if (error.message.includes("Artifact not found")) {
      console.error("\n💡 Solution: Run 'yarn foundry:build' first to compile contracts with Foundry.");
    } else if (error.message.includes("insufficient funds")) {
      console.error("\n💡 Solution: Fund your account at https://faucet.polkadot.io/?parachain=1111");
    }
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  deployToPaseo().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export default deployToPaseo;
