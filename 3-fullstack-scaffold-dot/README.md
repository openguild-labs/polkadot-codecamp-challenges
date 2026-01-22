# Full-stack development with Scaffold DOT


## Introduction

Scaffold DOT is a similar tool to [scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2) that helps new Web3 Solidity developers get started with full-stack development. Scaffold DOT is specifically designed for PolkaVM, supporting local node execution and an explorer. Developers can easily check and deploy smart contracts, then use the UI to interact with them seamlessly.


## How to use 

### Step 1: Fork the scaffold-dot (https://github.com/scaffold-dot/scaffold-dot) 

![Fork the repository](images/fork.png)


### Step 2

```
git clone https://github.com/<your github name>/scaffold-dot
```


### Step 3 : Install dependences 

> **Note:** Make sure your node version > 22+
```
yarn install
```

### Step 4 : On a terminal, start the substrate node:

```
yarn chain
```

### Step 5 : On a second terminal, start the eth-rpc server:

```
yarn rpc
```


### Step 6: On a third terminal, deploy the test default contract:

```
yarn deploy 
```

### Step 7: On a fourth terminal, start your NextJS app:

```
yarn start
```

### Step 8: Request native tokens using the faucet icon in the top right corner


![Faucet ](images/faucet.png)


### Step 9: Use READ/ WRITE Contract  

![Read and Write](images/read_write.png)


## Requirements 

- [x] **Add ERC20 example**
- [x] **Add ERC721 examples**


### Example UI

![Example ](images/example.png)

### How to add a new contract on `Scaffold DOT`

- Create a new contract file in `packages/hardhat/contracts` directory (see [contracts folder](https://github.com/scaffold-dot/scaffold-dot/tree/main/packages/hardhat/contracts)), for example `ERC20.sol`

- Create an ignition module for the new contract. Ensure the module name matches the contract file name exactly[ignition modules](https://github.com/scaffold-dot/scaffold-dot/blob/main/packages/hardhat/ignition/modules/YourContract.ts) (e.g., if your contract file is `YourContract.sol`, the module should be named `YourContract`)

- Run `yarn deploy` again. Scaffold DOT will automatically detect the new contract and deploy it.

```
📋 Available ignition modules: Counter, YourContract
📋 Available contracts: Counter, YourContract
🚀 Deploying ALL contracts...

📦 Deploying Counter...
✅ Counter deployed to: 0x21cb3940e6Ba5284E1750F1109131a8E8062b9f1

📦 Deploying YourContract...
✅ YourContract deployed to: 0x3469E1DaC06611030AEce8209F07501E9A7aCC69

📝 Writing ABIs to nextjs directory...
🎯 Using provided deployed contract addresses...
Processing contract: Counter at 0x21cb3940e6Ba5284E1750F1109131a8E8062b9f1
Found 1 artifacts in Counter.sol: Counter
✅ Added Counter with address 0x21cb3940e6Ba5284E1750F1109131a8E8062b9f1
Processing contract: YourContract at 0x3469E1DaC06611030AEce8209F07501E9A7aCC69
Found 1 artifacts in YourContract.sol: YourContract
✅ Added YourContract with address 0x3469E1DaC06611030AEce8209F07501E9A7aCC69
📝 Updated TypeScript contract definition file on ../nextjs/contracts/deployedContracts.ts
✨ Done! All contracts deployed and ABIs generated.
cocdap@Hos-MacBook-Pro scaffold-dot % yarn deploy
📋 Available ignition modules: Counter, YourContract
📋 Available contracts: Counter, YourContract
```

- Go to `UI Debug` to check function 

## Submission Requirements 

- [x] **Accessible video recording link demonstrating ERC20 and ERC721 examples on Debug Scaffold DOT**


## Resources 

## Bugs & Issues

If you encounter any bugs or have suggestions for improvements, please [raise an issue](https://github.com/scaffold-dot/scaffold-dot) on GitHub and ping me `CocDap` 