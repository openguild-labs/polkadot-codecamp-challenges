'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useReadContract } from 'wagmi'
import { parseEther, pad, toHex, formatEther } from 'viem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChainSelector } from '@/components/chain-selector'
import { SUPPORTED_CHAINS, TOKEN_BRIDGE_ADDRESSES, TEST_TOKEN_ADDRESS, TEST_ASSET_ID, TEST_TOKEN_ADDRESSES } from '@/lib/wagmi'
import { sepolia } from 'wagmi/chains'
import { paseoAssetHub } from '@/lib/wagmi'

// Zero address constant
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// TokenBridge ABI (simplified)
const TOKEN_BRIDGE_ABI = [
    {
        name: 'bridge',
        type: 'function',
        stateMutability: 'payable',
        inputs: [
            { name: 'assetId', type: 'bytes32' },
            { name: 'amount', type: 'uint256' },
            { name: 'recipient', type: 'bytes32' },
            { name: 'destChain', type: 'bytes' },
            { name: 'timeout', type: 'uint64' },
            { name: 'relayerFee', type: 'uint256' },
        ],
        outputs: [],
    },
] as const

// ERC20 ABI for approve, balanceOf, and allowance
const ERC20_ABI = [
    {
        name: 'approve',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool' }],
    },
    {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'allowance',
        type: 'function',
        stateMutability: 'view',
        inputs: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
        ],
        outputs: [{ name: '', type: 'uint256' }],
    },
] as const

type BridgeStatus = 'idle' | 'pending' | 'confirming' | 'success' | 'error'

export function BridgeForm() {
    const { address, isConnected, chainId } = useAccount()
    const { switchChain } = useSwitchChain()
    // Default to Paseo Asset Hub as source (where contracts are deployed)
    const [sourceChain, setSourceChain] = useState<number>(paseoAssetHub.id)
    const [destChain, setDestChain] = useState<number>(sepolia.id)
    const [amount, setAmount] = useState('')
    const [recipient, setRecipient] = useState('')
    const [tokenSymbol, setTokenSymbol] = useState('TEST')
    const [status, setStatus] = useState<BridgeStatus>('idle')
    const [errorMessage, setErrorMessage] = useState('')
    const [needsApproval, setNeedsApproval] = useState(true)
    const [approvalPending, setApprovalPending] = useState(false)
    const [lastBridgeDetails, setLastBridgeDetails] = useState<{
        amount: string;
        token: string;
        from: string;
        to: string;
        recipient: string;
    } | null>(null)

    const { writeContract, data: hash, isPending, reset } = useWriteContract()
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    })

    // Get token address for current source chain
    const sourceTokenAddress = TEST_TOKEN_ADDRESSES[sourceChain]

    // Fetch TEST token balance for source chain
    const { data: tokenBalance } = useReadContract({
        address: sourceTokenAddress || undefined,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address && isConnected && !!sourceTokenAddress,
        },
    })

    const formattedBalance = tokenBalance ? formatEther(tokenBalance as bigint) : '0'
    const hasTokenOnSourceChain = !!sourceTokenAddress

    // Check if bridge contract is deployed on source chain
    const bridgeAddress = TOKEN_BRIDGE_ADDRESSES[sourceChain]
    const isBridgeDeployed = bridgeAddress && bridgeAddress !== ZERO_ADDRESS

    // Fetch current allowance for TokenBridge
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
        address: sourceTokenAddress || undefined,
        abi: ERC20_ABI,
        functionName: 'allowance',
        args: address && bridgeAddress ? [address, bridgeAddress] : undefined,
        query: {
            enabled: !!address && isConnected && !!sourceTokenAddress && isBridgeDeployed,
        },
    })

    // Check if allowance is sufficient for the amount
    const currentAllowance = allowanceData as bigint | undefined
    const amountInWei = amount ? parseEther(amount) : BigInt(0)
    const hasEnoughAllowance = currentAllowance !== undefined && currentAllowance >= amountInWei && amountInWei > BigInt(0)

    // Check if connected to the correct chain
    const isWrongChain = isConnected && chainId !== sourceChain

    const sourceName = SUPPORTED_CHAINS.find(c => c.id === sourceChain)?.name || 'Unknown'
    const destName = SUPPORTED_CHAINS.find(c => c.id === destChain)?.name || 'Unknown'

    const handleSwitchChain = () => {
        if (switchChain) {
            switchChain({ chainId: sourceChain })
        }
    }

    const handleApprove = async () => {
        if (!isConnected || !address || !isBridgeDeployed) return

        try {
            setStatus('pending')
            setErrorMessage('')

            writeContract({
                address: TEST_TOKEN_ADDRESS,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [bridgeAddress, parseEther(amount || '1000000')],
            })
        } catch (error: any) {
            console.error('Approve error:', error)
            setErrorMessage(error.message || 'Approval failed')
            setStatus('error')
        }
    }

    const handleBridge = async () => {
        if (!isConnected || !address) {
            setErrorMessage('Please connect your wallet first')
            return
        }

        if (!isBridgeDeployed) {
            setErrorMessage(`Bridge contract not deployed on ${sourceName}. Please use Paseo Asset Hub as source.`)
            return
        }

        if (isWrongChain) {
            setErrorMessage(`Please switch to ${sourceName} network`)
            return
        }

        if (!amount || parseFloat(amount) <= 0) {
            setErrorMessage('Please enter a valid amount')
            return
        }

        if (!recipient) {
            setErrorMessage('Please enter a recipient address')
            return
        }

        try {
            setStatus('pending')
            setErrorMessage('')
            reset() // Reset previous transaction

            // Use pre-computed asset ID for TEST token
            // keccak256("TEST") = 0x852daa74cc3c31fe64542bb9b8764cfb91cc30f9acf9389071ffb44a9eefde46
            const assetId = TEST_ASSET_ID

            // Convert recipient address to bytes32
            const recipientBytes32 = pad(recipient as `0x${string}`, { size: 32 })

            // Encode destination chain identifier
            const destChainBytes = toHex(destChain)

            writeContract({
                address: bridgeAddress,
                abi: TOKEN_BRIDGE_ABI,
                functionName: 'bridge',
                args: [
                    assetId,
                    parseEther(amount),
                    recipientBytes32,
                    destChainBytes as `0x${string}`,
                    BigInt(3600), // 1 hour timeout
                    parseEther('0.01'), // Relayer fee
                ],
                value: parseEther('0.01'), // Native cost for relaying (reduced)
            })

            // Save bridge details for success display
            setLastBridgeDetails({
                amount,
                token: tokenSymbol,
                from: sourceName,
                to: destName,
                recipient,
            })

            setStatus('confirming')
        } catch (error: any) {
            console.error('Bridge error:', error)
            setErrorMessage(error.message || 'Bridge failed')
            setStatus('error')
        }
    }

    // Update status based on transaction state
    if (isSuccess && status !== 'success') {
        setStatus('success')
        setApprovalPending(false)
        // Refetch allowance after successful transaction
        refetchAllowance()
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    🌉 Token Bridge
                </CardTitle>
                <CardDescription>
                    Bridge ERC20 tokens across chains using Hyperbridge
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Chain Selection */}
                <ChainSelector
                    sourceChain={sourceChain}
                    destChain={destChain}
                    onSourceChange={setSourceChain}
                    onDestChange={setDestChain}
                />

                <Separator />

                {/* Token Selection */}
                <div className="space-y-2">
                    <Label htmlFor="token">Token Symbol</Label>
                    <Input
                        id="token"
                        placeholder="e.g. USDC, DAI"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                    />
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="amount">Amount</Label>
                        {isConnected && (
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-zinc-500">Balance:</span>
                                {hasTokenOnSourceChain ? (
                                    <>
                                        <span className="font-medium text-green-600">
                                            {parseFloat(formattedBalance).toLocaleString()} {tokenSymbol}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-auto py-0.5 px-2 text-xs text-blue-600 hover:text-blue-700"
                                            onClick={() => setAmount(formattedBalance)}
                                        >
                                            MAX
                                        </Button>
                                    </>
                                ) : (
                                    <span className="text-zinc-400 italic">Not available on {sourceName}</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pr-16"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                            {tokenSymbol}
                        </span>
                    </div>
                </div>

                {/* Recipient Input */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="recipient">Recipient Address</Label>
                        {isConnected && address && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto py-1 px-2 text-xs"
                                onClick={() => setRecipient(address)}
                            >
                                Use My Address
                            </Button>
                        )}
                    </div>
                    <Input
                        id="recipient"
                        placeholder="0x..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                    <p className="text-xs text-zinc-500">
                        Address that will receive tokens on {destName}
                    </p>
                </div>

                <Separator />

                {/* Transaction Summary */}
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Route</span>
                        <span>{sourceName} → {destName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Amount</span>
                        <span>{amount || '0'} {tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-500">Estimated Fee</span>
                        <span>~0.01 ETH</span>
                    </div>
                </div>

                {/* Status Messages */}
                {status === 'success' && lastBridgeDetails && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">✅</span>
                            <p className="text-green-700 dark:text-green-400 font-bold">
                                Bridge Transaction Successful!
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-800 rounded-md p-3 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Amount Bridged</span>
                                <span className="font-semibold text-green-600">{lastBridgeDetails.amount} {lastBridgeDetails.token}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">From</span>
                                <span>{lastBridgeDetails.from}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">To</span>
                                <span>{lastBridgeDetails.to}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Recipient</span>
                                <span className="font-mono text-xs">
                                    {lastBridgeDetails.recipient.slice(0, 8)}...{lastBridgeDetails.recipient.slice(-6)}
                                </span>
                            </div>
                        </div>

                        {hash && (
                            <div className="text-xs text-green-600 dark:text-green-500 font-mono bg-green-100 dark:bg-green-900/30 p-2 rounded">
                                Tx: {hash}
                            </div>
                        )}

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2">
                            <p className="text-blue-700 dark:text-blue-400 text-xs">
                                ℹ️ <strong>Demo Note:</strong> Tokens are locked in the bridge contract.
                                In production Hyperbridge, tokens would be minted/released on {lastBridgeDetails.to}.
                            </p>
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-red-700 dark:text-red-400 text-sm">
                            ✕ {errorMessage}
                        </p>
                    </div>
                )}

                {/* Chain Warning */}
                {!isBridgeDeployed && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm font-medium">
                            ⚠️ Bridge contract not deployed on {sourceName}
                        </p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                            Please select <strong>Paseo Asset Hub</strong> as source chain
                        </p>
                    </div>
                )}

                {/* Wrong Chain Warning */}
                {isWrongChain && isBridgeDeployed && (
                    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                        <p className="text-orange-700 dark:text-orange-400 text-sm font-medium">
                            ⚠️ Wrong network connected
                        </p>
                        <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                            You need to switch to {sourceName}
                        </p>
                        <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={handleSwitchChain}
                        >
                            Switch to {sourceName}
                        </Button>
                    </div>
                )}

                {/* Single Action Button - Approve or Bridge based on allowance */}
                {isConnected && isBridgeDeployed && !isWrongChain && (
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={async () => {
                            if (!hasEnoughAllowance) {
                                // Need to approve first
                                setApprovalPending(true)
                                await handleApprove()
                            } else {
                                // Already approved, proceed with bridge
                                await handleBridge()
                            }
                        }}
                        disabled={isPending || isConfirming || !amount || parseFloat(amount) <= 0}
                    >
                        {isPending || approvalPending ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">⟳</span>
                                {!hasEnoughAllowance ? 'Approving...' : 'Bridging...'}
                            </span>
                        ) : isConfirming ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">⟳</span>
                                Waiting for Confirmation...
                            </span>
                        ) : !hasEnoughAllowance ? (
                            `Approve & Bridge ${amount || '0'} ${tokenSymbol}`
                        ) : (
                            `Bridge ${amount || '0'} ${tokenSymbol}`
                        )}
                    </Button>
                )}

                {/* Fallback buttons for disconnected/wrong chain states */}
                {(!isConnected || !isBridgeDeployed || isWrongChain) && (
                    <Button
                        size="lg"
                        className="w-full"
                        disabled={!isConnected || !isBridgeDeployed || isWrongChain}
                    >
                        {!isConnected ? (
                            'Connect Wallet to Bridge'
                        ) : !isBridgeDeployed ? (
                            'Bridge Not Available'
                        ) : (
                            'Switch Network First'
                        )}
                    </Button>
                )}

                {/* Connection Status */}
                {isConnected && (
                    <div className="flex justify-center">
                        <Badge variant="outline" className="gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Connected to {SUPPORTED_CHAINS.find(c => c.id === chainId)?.name || 'Unknown Chain'}
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
