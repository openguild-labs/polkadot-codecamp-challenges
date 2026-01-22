#!/bin/bash

# Quick Fund Bridge Script
# This script helps you fund the TokenBridge contract with USD.h tokens

set -e

echo "=================================="
echo "Fund TokenBridge with USD.h"
echo "=================================="
echo ""

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

BRIDGE_ADDRESS="0x605C9012234fa13BeE444a83b804881e48F014d9"
USDH_ADDRESS="0xA801da100bF16D07F668F4A49E1f71fc54D05177"
RPC_URL="https://bsc-testnet-rpc.publicnode.com"

echo "Bridge Address: $BRIDGE_ADDRESS"
echo "USD.h Address: $USDH_ADDRESS"
echo ""

# Check current bridge balance
echo "Checking current bridge balance..."
CURRENT_BALANCE=$(cast call $USDH_ADDRESS "balanceOf(address)(uint256)" $BRIDGE_ADDRESS --rpc-url $RPC_URL)
echo "Current Balance: $CURRENT_BALANCE wei"
echo ""

# Prompt for private key
echo "⚠️  You need to use your MetaMask private key (the one with 1000 USD.h)"
echo "Your address should be: 0x8173912a21AA42C64f824F92086E556C3B2B8256"
echo ""
read -sp "Enter your MetaMask private key (input will be hidden): " PRIVATE_KEY
echo ""
echo ""

# Verify the address
WALLET_ADDRESS=$(cast wallet address $PRIVATE_KEY)
echo "Wallet Address: $WALLET_ADDRESS"
echo ""

# Check wallet balance
echo "Checking your USD.h balance..."
YOUR_BALANCE=$(cast call $USDH_ADDRESS "balanceOf(address)(uint256)" $WALLET_ADDRESS --rpc-url $RPC_URL)
echo "Your Balance: $YOUR_BALANCE wei"
echo ""

if [ "$YOUR_BALANCE" == "0" ]; then
    echo "❌ Error: Your wallet has 0 USD.h tokens!"
    echo "Make sure you're using the correct private key."
    exit 1
fi

# Prompt for amount
echo "How much USD.h do you want to send to the bridge?"
echo "Recommended: 100 (for ~100 transactions)"
read -p "Amount: " AMOUNT

# Convert to wei (18 decimals)
AMOUNT_WEI=$(cast --to-wei $AMOUNT ether)
echo ""
echo "Will transfer: $AMOUNT USD.h ($AMOUNT_WEI wei)"
echo "From: $WALLET_ADDRESS"
echo "To: $BRIDGE_ADDRESS"
echo ""

read -p "Continue? (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Sending transaction..."
echo ""

# Send the transaction
TX_HASH=$(cast send $USDH_ADDRESS \
    "transfer(address,uint256)" \
    $BRIDGE_ADDRESS \
    $AMOUNT_WEI \
    --private-key $PRIVATE_KEY \
    --rpc-url $RPC_URL \
    --json | jq -r '.transactionHash')

echo "✅ Transaction sent!"
echo "Transaction Hash: $TX_HASH"
echo "View on BSCScan: https://testnet.bscscan.com/tx/$TX_HASH"
echo ""

# Wait a bit and check new balance
echo "Waiting for confirmation..."
sleep 5

NEW_BALANCE=$(cast call $USDH_ADDRESS "balanceOf(address)(uint256)" $BRIDGE_ADDRESS --rpc-url $RPC_URL)
echo ""
echo "New Bridge Balance: $NEW_BALANCE wei"
echo ""
echo "✅ Done! You can now bridge tokens in the frontend."
echo "=================================="
