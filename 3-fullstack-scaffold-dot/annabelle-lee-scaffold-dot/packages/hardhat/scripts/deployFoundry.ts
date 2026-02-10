import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import generateTsAbis from "./generateTsAbis";

/**
 * Deploy contracts using Foundry and generate TypeScript ABIs
 */
async function deployWithFoundry() {
  const foundryDir = path.join(__dirname, "../foundry");
  const scriptPath = path.join(foundryDir, "script/DeployAll.s.sol:DeployAll");
  const rpcUrl = process.env.RPC_URL || "http://127.0.0.1:8545";
  const privateKey = process.env.PRIVATE_KEY || "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";

  console.log("🚀 Deploying contracts with Foundry...\n");

  return new Promise<void>((resolve, reject) => {
    const forgeScript = spawn("forge", [
      "script",
      scriptPath,
      "--rpc-url",
      rpcUrl,
      "--broadcast",
      "--private-key",
      privateKey,
      "--json",
    ], {
      cwd: foundryDir,
      stdio: "pipe",
    });

    let output = "";
    let errorOutput = "";

    forgeScript.stdout.on("data", (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });

    forgeScript.stderr.on("data", (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);
    });

    forgeScript.on("close", async (code) => {
      // Even if code is non-zero, we might have a successful simulation
      // Check for broadcast logs first before failing
      const broadcastDir = path.join(foundryDir, "broadcast/DeployAll.s.sol");
      let hasBroadcastLog = false;
      
      if (fs.existsSync(broadcastDir)) {
        const chainDirs = fs.readdirSync(broadcastDir, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .map(d => d.name);
        
        for (const chainId of chainDirs) {
          const testPath = path.join(broadcastDir, chainId, "run-latest.json");
          if (fs.existsSync(testPath)) {
            hasBroadcastLog = true;
            break;
          }
        }
      }
      
      // If we have a broadcast log, try to extract addresses even if code is non-zero
      // This handles cases where simulation succeeds but broadcast fails (e.g., PolkaVM compatibility)
      if (hasBroadcastLog) {
        console.log("\n⚠️  Broadcast failed, but simulation succeeded. Extracting addresses from simulation...");
      } else if (code !== 0) {
        console.error("❌ Foundry deployment failed");
        reject(new Error(`Foundry script exited with code ${code}`));
        return;
      }

      try {
        // Find the broadcast log - Foundry uses the actual chain ID from the network
        // Check for common chain IDs: 31337 (local), 420420420 (polkadot testnet), etc.
        const possibleChainIds = ["31337", "420420420", "420420422", "420420418"];
        let broadcastLogPath: string | null = null;
        
        for (const chainId of possibleChainIds) {
          const testPath = path.join(foundryDir, "broadcast/DeployAll.s.sol", chainId, "run-latest.json");
          if (fs.existsSync(testPath)) {
            broadcastLogPath = testPath;
            console.log(`📋 Found broadcast log for chain ID: ${chainId}`);
            break;
          }
        }
        
        // Also try to find any run-latest.json in broadcast directory
        if (!broadcastLogPath) {
          const broadcastDir = path.join(foundryDir, "broadcast/DeployAll.s.sol");
          if (fs.existsSync(broadcastDir)) {
            const chainDirs = fs.readdirSync(broadcastDir, { withFileTypes: true })
              .filter(d => d.isDirectory())
              .map(d => d.name);
            
            for (const chainId of chainDirs) {
              const testPath = path.join(broadcastDir, chainId, "run-latest.json");
              if (fs.existsSync(testPath)) {
                broadcastLogPath = testPath;
                console.log(`📋 Found broadcast log for chain ID: ${chainId}`);
                break;
              }
            }
          }
        }
        
        if (broadcastLogPath && fs.existsSync(broadcastLogPath)) {
          const broadcastLog = JSON.parse(fs.readFileSync(broadcastLogPath, "utf-8"));
          const deployedContracts: Record<string, string> = {};

          // Extract deployed contract addresses from transactions
          // Note: These are simulated addresses, not actual deployed addresses if broadcast failed
          for (const tx of broadcastLog.transactions || []) {
            if (tx.transactionType === "CREATE" && tx.contractName) {
              const contractAddress = tx.contractAddress;
              const contractName = tx.contractName;
              
              if (contractAddress && contractName) {
                deployedContracts[contractName] = contractAddress;
                // Check if transaction actually succeeded (has hash) or was just simulated
                if (tx.hash) {
                  console.log(`✅ ${contractName} deployed to: ${contractAddress}`);
                } else {
                  console.log(`⚠️  ${contractName} simulated address: ${contractAddress} (broadcast may have failed)`);
                }
              }
            }
          }
          
          // If no transactions have hashes, broadcast likely failed
          const hasSuccessfulTxs = broadcastLog.transactions?.some((tx: any) => tx.hash);
          if (!hasSuccessfulTxs && broadcastLog.transactions?.length > 0) {
            console.log("\n⚠️  WARNING: Transactions were simulated but not broadcast successfully.");
            console.log("   This is common with PolkaVM - the transaction format may not be compatible.");
            console.log("   Consider using Hardhat deployment instead: yarn deploy:hardhat");
            console.log("   Or the addresses above are simulated and may not match actual deployment.");
          }

          console.log("\n📝 Generating TypeScript ABIs...");
          const hre = await import("hardhat");
          await generateTsAbis(hre.default, deployedContracts);
          
          if (hasBroadcastLog && !hasSuccessfulTxs) {
            console.log("\n⚠️  NOTE: Contracts were simulated but not actually deployed.");
            console.log("   The addresses above are from simulation and may not be on-chain.");
            console.log("   To actually deploy, try: yarn deploy:hardhat");
            console.log("   Or check DEPLOYMENT_TROUBLESHOOTING.md for more solutions.");
          } else {
            console.log("✨ Done! All contracts deployed and ABIs generated.");
          }
          resolve();
        } else {
          // Fallback: try to extract from console output
          console.log("\n📝 Generating TypeScript ABIs from compiled artifacts...");
          const hre = await import("hardhat");
          
          // Get contract names from foundry artifacts
          const artifactsDir = path.join(foundryDir, "out");
          const contractNames = ["ERC20Token", "ERC721Token", "YourContract"];
          const deployedContracts: Record<string, string> = {};

          // For now, we'll need to manually specify addresses or read from a file
          // This is a limitation - Foundry doesn't easily expose deployed addresses
          console.log("⚠️  Note: Contract addresses need to be extracted from broadcast logs");
          console.log("   Check: packages/hardhat/foundry/broadcast/DeployAll.s.sol/");
          
          await generateTsAbis(hre.default, deployedContracts);
          resolve();
        }
      } catch (error) {
        console.error("Error processing deployment results:", error);
        reject(error);
      }
    });
  });
}

// Run if executed directly
if (require.main === module) {
  deployWithFoundry().catch(console.error);
}

export default deployWithFoundry;
