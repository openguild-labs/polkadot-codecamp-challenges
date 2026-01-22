# Hyperbridge Token Bridge - Frontend

A modern, user-friendly interface for bridging USD.h tokens between BNB Smart Chain Testnet and Paseo Asset Hub using the Hyperbridge protocol.

## Features

### Core Functionality
- **Token Bridging**: Transfer USD.h tokens from BNB Testnet to Paseo Asset Hub
- **MetaMask Integration**: Seamless wallet connection and management
- **Real-time Balance**: Automatic token balance fetching and display
- **Network Detection**: Auto-detect and switch to the correct network
- **Transaction Tracking**: Visual progress indicators for approval, bridging, and confirmation stages

### UI/UX Enhancements
- **Modern Design**: Clean, gradient-based interface with smooth animations
- **Network Status Indicator**: Real-time display of connected network with visual feedback
- **Progress Tracking**: Step-by-step visual progress for bridge transactions
- **Balance Display**: Shows current token balance with MAX button for convenience
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Responsive Design**: Mobile-first approach that works on all screen sizes
- **Chain Icons**: Visual representation of source and destination chains

## Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with enhanced features
- **TypeScript 5.9.3** - Type-safe development
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **ethers.js 6.16.0** - Ethereum library for blockchain interactions
- **@hyperbridge/sdk 1.5.1** - Hyperbridge protocol integration

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Main bridge interface
│   └── globals.css          # Global styles and Tailwind config
├── components/
│   ├── MetaMaskButton.tsx   # Wallet connection component
│   ├── NetworkSwitcher.tsx  # Network status and switching UI
│   └── TransactionStatus.tsx # Transaction progress indicator
├── hooks/
│   ├── useMetaMask.ts       # MetaMask wallet integration
│   ├── useBridge.ts         # Bridge transaction logic
│   └── useTokenBalance.ts   # Token balance fetching
├── constants/
│   └── chains.ts            # Chain configurations
└── abi/
    └── TOKEN_BRIDGE.json    # Smart contract ABI
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- MetaMask browser extension
- BNB Testnet tokens for gas fees

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the frontend directory:
```bash
NEXT_PUBLIC_TOKEN_BRIDGE_ADDRESS=0x605C9012234fa13BeE444a83b804881e48F014d9
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. **Connect Wallet**: Click "CONNECT WALLET" in the top-right corner
2. **Switch Network**: If not on BNB Testnet, click "Switch to BSC Testnet"
3. **Enter Token Address**: Input the USD.h token contract address
4. **View Balance**: Your token balance will automatically appear
5. **Enter Amount**: Type amount or click "MAX" to bridge all tokens
6. **Bridge Tokens**: Click "Bridge Tokens" and approve transactions in MetaMask
7. **Track Progress**: Watch the visual progress indicator through approval, bridging, and confirmation
8. **View Transaction**: Click the transaction link to view on BSCScan

## Key Components

### NetworkSwitcher (frontend/components/NetworkSwitcher.tsx:1)
Displays current network status with visual indicators:
- Green pulse: Connected to correct network
- Red pulse: Wrong network detected
- Auto-switch button when on incorrect network

### TransactionStatus (frontend/components/TransactionStatus.tsx:1)
Shows transaction progress with 3 stages:
1. Approve - Token spending approval
2. Bridge - Bridge transaction submission
3. Confirm - Transaction confirmation

### useTokenBalance (frontend/hooks/useTokenBalance.ts:1)
Custom hook that:
- Fetches token balance automatically
- Detects token symbol from contract
- Updates on network/account changes

## Chain Configuration

### Source Chain: BNB Smart Chain Testnet
- Chain ID: 97 (0x61)
- RPC: https://data-seed-prebsc-1-s1.binance.org:8545
- Explorer: https://testnet.bscscan.com

### Destination Chain: Paseo Asset Hub
- Chain ID: 420420422
- Polkadot Testnet parachain

Configuration can be updated in `frontend/constants/chains.ts:1`

## Styling

The application uses Tailwind CSS 4 with:
- Gradient backgrounds for visual appeal
- Custom animations and transitions
- Neomorphic button designs
- Responsive grid layouts
- Custom scrollbar styling

Global styles are defined in `frontend/app/globals.css:1`

## Environment Variables

Required environment variables:

```bash
NEXT_PUBLIC_TOKEN_BRIDGE_ADDRESS  # Token bridge contract address on BSC Testnet
```

## Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Hyperbridge Protocol](https://hyperbridge.network/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import the project on Vercel
3. Add environment variables
4. Deploy

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
