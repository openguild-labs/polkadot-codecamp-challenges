require('@nomicfoundation/hardhat-toolbox')
require('@parity/hardhat-polkadot')
require('dotenv').config()

// If using hardhat vars, uncomment the line below
// const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.26',

    // Compiler configuration for PolkaVM
    // resolc: {
    //     compilerSource: 'npm',
    //     settings: {
    //         optimizer: {
    //             enabled: true,
    //             parameters: 'z',
    //             fallbackOz: true,
    //             runs: 200,
    //         },
    //         standardJson: true,
    //     },
    // },
    resolc: {
        version: "1.5.2",
        compilerSource: "npm",
        settings: {
            optimizer: {
                enabled: true,
                parameters: "z",
                fallbackOz: true,
                runs: 400,
            },
            standardJson: true,
        },
    },
    networks: {
        // Local node deployment with PolkaVM
        localNode: {
            polkavm: true,
            url: 'http://127.0.0.1:8545',
            accounts: [
                "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
                "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
                "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
            ] // Localnode accounts for testing
        },

        // Polkadot Hub TestNet
        polkadotHubTestnet: {
            polkavm: true,
            url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            // accounts: [vars.get("PRIVATE_KEY")]
        },
    },
}
