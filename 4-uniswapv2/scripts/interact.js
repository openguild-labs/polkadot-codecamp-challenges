const hre = require("hardhat");
const prompts = require("prompts");

async function main() {
  // Get contract address from command line argument or environment variable
  let contractAddress = process.env.CONTRACT_ADDRESS || process.argv[2];

  if (!contractAddress || contractAddress === "INSERT_CONTRACT_ADDRESS") {
    const response = await prompts({
      type: "text",
      name: "address",
      message: "Enter the Counter contract address:",
      validate: (value) =>
        value.startsWith("0x") && value.length === 42
          ? true
          : "Please enter a valid Ethereum address",
    });

    if (!response.address) {
      console.log("Operation cancelled");
      process.exit(0);
    }

    contractAddress = response.address;
  }

  // Get the contract factory
  const Counter = await hre.ethers.getContractFactory("Counter");

  // Attach to existing contract
  const counter = Counter.attach(contractAddress);

  // Get signers
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n📝 Counter Contract Interaction");
  console.log("================================");
  console.log("Contract:", contractAddress);
  console.log("Account:", deployer.address);
  console.log("Network:", hre.network.name);
  console.log("================================\n");

  let running = true;

  while (running) {
    // Get current count
    const currentCount = await counter.getCount();
    console.log(`Current count: ${currentCount.toString()}\n`);

    const action = await prompts({
      type: "select",
      name: "value",
      message: "What would you like to do?",
      choices: [
        { title: "Increment counter", value: "increment" },
        { title: "Decrement counter", value: "decrement" },
        { title: "Reset counter (owner only)", value: "reset" },
        { title: "View owner", value: "owner" },
        { title: "Exit", value: "exit" },
      ],
    });

    if (!action.value || action.value === "exit") {
      console.log("\n👋 Goodbye!");
      running = false;
      break;
    }

    try {
      switch (action.value) {
        case "increment":
          console.log("\n⏳ Incrementing counter...");
          const incrementTx = await counter.increment();
          await incrementTx.wait();
          console.log("✅ Transaction confirmed:", incrementTx.hash);
          const newCount = await counter.getCount();
          console.log(`New count: ${newCount.toString()}\n`);
          break;

        case "decrement":
          console.log("\n⏳ Decrementing counter...");
          const decrementTx = await counter.decrement();
          await decrementTx.wait();
          console.log("✅ Transaction confirmed:", decrementTx.hash);
          const decrementedCount = await counter.getCount();
          console.log(`New count: ${decrementedCount.toString()}\n`);
          break;

        case "reset":
          console.log("\n⏳ Resetting counter...");
          const resetTx = await counter.reset();
          await resetTx.wait();
          console.log("✅ Transaction confirmed:", resetTx.hash);
          const resetCount = await counter.getCount();
          console.log(`New count: ${resetCount.toString()}\n`);
          break;

        case "owner":
          const owner = await counter.owner();
          console.log("\n👤 Contract owner:", owner);
          console.log(
            "Is current account owner?",
            owner.toLowerCase() === deployer.address.toLowerCase()
              ? "Yes ✅"
              : "No ❌",
          );
          console.log();
          break;
      }
    } catch (error) {
      console.error("\n❌ Error:", error.message, "\n");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
