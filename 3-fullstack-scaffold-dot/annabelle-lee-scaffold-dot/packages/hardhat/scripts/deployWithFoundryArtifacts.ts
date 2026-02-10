/**
 * Deploy contracts using Foundry's compiled artifacts with Hardhat's deployment system
 * This bypasses Hardhat's compiler download issue by using Foundry's compilation
 */

import * as fs from "fs";
import * as path from "path";
import hre from "hardhat";
import generateTsAbis from "./generateTsAbis";

// Access Hardhat's ethers plugin (loaded by @nomicfoundation/hardhat-toolbox)
// TypeScript doesn't recognize it, but it exists at runtime
const getEthers = () => {
  return (hre as any).ethers;
};

interface FoundryArtifact {
  abi: any[];
  bytecode: {
    object: string;
  };
}

async function loadFoundryArtifact(contractName: string): Promise<FoundryArtifact> {
  // Map contract names to their source file names
  const contractToFile: Record<string, string> = {
    "ERC20Token": "ERC20",
    "ERC721Token": "ERC721",
    "YourContract": "YourContract",
  };
  
  const sourceFile = contractToFile[contractName] || contractName;
  
  // Try multiple possible paths for Foundry artifacts
  const possiblePaths = [
    path.join(__dirname, "../foundry/out/contracts", `${sourceFile}.sol`, `${contractName}.json`),
    path.join(__dirname, "../foundry/out", `${sourceFile}.sol`, `${contractName}.json`),
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

async function deployWithFoundryArtifacts() {
  console.log("🚀 Deploying contracts using Foundry artifacts...\n");
  
  // @ts-ignore - Hardhat ethers plugin is loaded at runtime by @nomicfoundation/hardhat-toolbox
  const hreEthers: any = getEthers();
  // @ts-ignore
  const [deployer] = await hreEthers.getSigners();
  console.log("Deploying with account:", deployer.address);
  // @ts-ignore
  console.log("Account balance:", (await hreEthers.provider.getBalance(deployer.address)).toString(), "\n");

  const deployedContracts: Record<string, string> = {};

  try {
    // Deploy ERC20Token
    console.log("📦 Deploying ERC20Token...");
    const erc20Artifact = await loadFoundryArtifact("ERC20Token");
    // @ts-ignore
    const erc20Factory = new hreEthers.ContractFactory(erc20Artifact.abi, erc20Artifact.bytecode.object, deployer);
    // @ts-ignore
    const erc20 = await erc20Factory.deploy("MyToken", "MTK", hreEthers.parseEther("1000000"));
    await erc20.waitForDeployment();
    const erc20Address = await erc20.getAddress();
    deployedContracts["ERC20Token"] = erc20Address;
    console.log(`✅ ERC20Token deployed to: ${erc20Address}`);

    // Deploy ERC721Token
    console.log("\n📦 Deploying ERC721Token...");
    const erc721Artifact = await loadFoundryArtifact("ERC721Token");
    // @ts-ignore
    const erc721Factory = new hreEthers.ContractFactory(erc721Artifact.abi, erc721Artifact.bytecode.object, deployer);
    const erc721 = await erc721Factory.deploy("MyNFT", "MNFT");
    await erc721.waitForDeployment();
    const erc721Address = await erc721.getAddress();
    deployedContracts["ERC721Token"] = erc721Address;
    console.log(`✅ ERC721Token deployed to: ${erc721Address}`);

    // Deploy YourContract
    console.log("\n📦 Deploying YourContract...");
    const yourContractArtifact = await loadFoundryArtifact("YourContract");
    // @ts-ignore
    const yourContractFactory = new hreEthers.ContractFactory(yourContractArtifact.abi, yourContractArtifact.bytecode.object, deployer);
    const yourContract = await yourContractFactory.deploy(deployer.address);
    await yourContract.waitForDeployment();
    const yourContractAddress = await yourContract.getAddress();
    deployedContracts["YourContract"] = yourContractAddress;
    console.log(`✅ YourContract deployed to: ${yourContractAddress}`);

    console.log("\n📝 Generating TypeScript ABIs...");
    await generateTsAbis(hre, deployedContracts);
    
    console.log("\n✨ Done! All contracts deployed and ABIs generated.");
    console.log("\n📋 Deployment Summary:");
    console.log(`   ERC20Token: ${erc20Address}`);
    console.log(`   ERC721Token: ${erc721Address}`);
    console.log(`   YourContract: ${yourContractAddress}`);

  } catch (error: any) {
    console.error("❌ Deployment failed:", error.message);
    if (error.message.includes("Artifact not found")) {
      console.error("\n💡 Solution: Run 'yarn foundry:build' first to compile contracts with Foundry.");
    }
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  deployWithFoundryArtifacts().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

export default deployWithFoundryArtifacts;
