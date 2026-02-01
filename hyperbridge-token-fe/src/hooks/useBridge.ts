import { useChainId, useSwitchChain } from 'wagmi'
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { useAppKitAccount } from '@reown/appkit/react'
import { formatUnits, parseUnits, type Address, keccak256, encodePacked, pad } from 'viem'
import { useState, useEffect, useMemo } from 'react'
import { TOKEN_BRIDGE_ABI, ERC20_ABI } from '../config/abi'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAINS, CHAIN_IDENTIFIERS, HYPERBRIDGE_CONTRACTS } from '../config/wagmi'
import { optimismSepolia } from 'wagmi/chains'

interface BridgeFormState {
  tokenAddress: string
  amount: string
  recipient: string
  destinationChainId: number
}

export function useBridge() {
  const { address, isConnected } = useAppKitAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const [formState, setFormState] = useState<BridgeFormState>({
    tokenAddress: CONTRACT_ADDRESSES.FEE_TOKEN_USDH,
    amount: '',
    recipient: '',
    destinationChainId: SUPPORTED_CHAINS.destination.id,
  })

  const [txStatus, setTxStatus] = useState<'idle' | 'approving' | 'bridging' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const isCorrectChain = chainId === optimismSepolia.id
  const typedAddress = address as Address | undefined

  // Only enable contract reads when fully connected and on correct chain
  const canReadContract = useMemo(() => {
    return isConnected && !!typedAddress && isCorrectChain &&
      !!formState.tokenAddress && formState.tokenAddress.length === 42
  }, [isConnected, typedAddress, isCorrectChain, formState.tokenAddress])

  // Get token balance
  const { data: tokenBalance, refetch: refetchBalance } = useReadContract({
    address: formState.tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: typedAddress ? [typedAddress] : undefined,
    query: {
      enabled: canReadContract,
    }
  })

  // Get token symbol
  const { data: tokenSymbol } = useReadContract({
    address: formState.tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: canReadContract,
    }
  })

  // Get token decimals
  const { data: tokenDecimals } = useReadContract({
    address: formState.tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'decimals',
    query: {
      enabled: canReadContract,
    }
  })

  // Check allowance against Wrapper Contract
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: formState.tokenAddress as Address,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: typedAddress ? [typedAddress, CONTRACT_ADDRESSES.TOKEN_BRIDGE] : undefined,
    query: {
      enabled: canReadContract,
    }
  })

  const { writeContract: approveToken, data: approveTxHash, isPending: isApprovePending, error: approveError } = useWriteContract()
  const { writeContract: bridgeTokens, data: bridgeTxHash, isPending: isBridgePending, error: bridgeError } = useWriteContract()

  const { isLoading: isApproveConfirming, isSuccess: approveSuccess } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  })

  const { isLoading: isBridgeConfirming, isSuccess: bridgeSuccess } = useWaitForTransactionReceipt({
    hash: bridgeTxHash,
  })

  // Combined loading states
  const isApproving = isApprovePending || isApproveConfirming
  const isBridging = isBridgePending || isBridgeConfirming

  const updateFormState = (field: keyof BridgeFormState, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }))
    setErrorMessage('')
    if (txStatus === 'error') setTxStatus('idle')
  }

  const setRecipientToSelf = () => {
    if (address) {
      setFormState(prev => ({ ...prev, recipient: address }))
    }
  }

  const switchToSourceChain = async () => {
    try {
      await switchChain({ chainId: optimismSepolia.id })
    } catch (error) {
      console.error('Failed to switch chain:', error)
    }
  }

  const getDecimals = () => tokenDecimals || 18

  const getAmountInWei = () => {
    try {
      const decimals = getDecimals()
      const amount = formState.amount
      if (!amount || parseFloat(amount) <= 0) return BigInt(0)
      return parseUnits(amount, decimals)
    } catch {
      return BigInt(0)
    }
  }

  const getFormattedBalance = () => {
    if (!tokenBalance) return '0'
    return formatUnits(tokenBalance, getDecimals())
  }

  const needsApproval = () => {
    const amountWei = getAmountInWei()
    // Strict Mode: Require approval if allowance is not EXACTLY the amount
    if (!allowance || amountWei === BigInt(0)) return true
    return allowance !== amountWei
  }

  const getDestChainBytes = (): `0x${string}` => {
    return CHAIN_IDENTIFIERS[formState.destinationChainId] || CHAIN_IDENTIFIERS[SUPPORTED_CHAINS.destination.id]
  }

  const handleApprove = async () => {
    if (!isConnected || !isCorrectChain) {
      setErrorMessage('Please connect wallet and switch to Optimism Sepolia')
      return
    }

    if (!formState.tokenAddress || !formState.amount) {
      setErrorMessage('Please fill in token address and amount')
      return
    }

    try {
      setTxStatus('approving')
      setErrorMessage('')

      const amountWei = getAmountInWei()

      // Approve TokenBridge Wrapper with Exact Amount
      approveToken({
        address: formState.tokenAddress as Address,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.TOKEN_BRIDGE, amountWei],
      })
    } catch (error: any) {
      setTxStatus('error')
      setErrorMessage(error.message || 'Approval failed')
    }
  }

  const handleBridge = async () => {
    if (!isConnected || !isCorrectChain) {
      setErrorMessage('Please connect wallet and switch to Optimism Sepolia')
      return
    }

    if (!formState.tokenAddress || !formState.amount || !formState.recipient) {
      setErrorMessage('Please fill in all fields')
      return
    }

    if (!tokenSymbol) {
      setErrorMessage('Could not fetch token symbol')
      return
    }

    try {
      setTxStatus('bridging')
      setErrorMessage('')

      const amountWei = getAmountInWei()
      const destChain = getDestChainBytes()

      // Call Wrapper Contract
      bridgeTokens({
        address: CONTRACT_ADDRESSES.TOKEN_BRIDGE,
        abi: TOKEN_BRIDGE_ABI,
        functionName: 'bridgeTokens',
        args: [
          formState.tokenAddress as Address,
          tokenSymbol as string,
          amountWei,
          formState.recipient as Address,
          destChain,
        ],
        value: BigInt(0),
      })
    } catch (error: any) {
      setTxStatus('error')
      setErrorMessage(error.message || 'Bridge failed')
    }
  }

  useEffect(() => {
    if (approveError) {
      setTxStatus('error')
      setErrorMessage(approveError.message || 'Approval failed')
    }
  }, [approveError])

  useEffect(() => {
    if (bridgeError) {
      setTxStatus('error')
      setErrorMessage(bridgeError.message || 'Bridge failed')
    }
  }, [bridgeError])

  useEffect(() => {
    if (approveSuccess) {
      refetchAllowance()
      setTxStatus('idle')
    }
  }, [approveSuccess, refetchAllowance])

  useEffect(() => {
    if (bridgeSuccess) {
      setTxStatus('success')
      refetchBalance()
      setTimeout(() => {
        setFormState(prev => ({ ...prev, amount: '' }))
        setTxStatus('idle')
      }, 5000)
    }
  }, [bridgeSuccess, refetchBalance])

  return {
    formState,
    txStatus,
    errorMessage,
    isCorrectChain,
    isConnected,
    tokenBalance: getFormattedBalance(),
    tokenSymbol: tokenSymbol || '',
    tokenDecimals: getDecimals(),
    bridgeContractDeployed: true, // Always true for gateway
    updateFormState,
    setRecipientToSelf,
    switchToSourceChain,
    needsApproval,
    handleApprove,
    handleBridge,
    isApproving,
    isBridging,
    approveTxHash,
    bridgeTxHash,
    debugAllowance: allowance ? formatUnits(allowance, getDecimals()) : '0',
    debugAmountWei: getAmountInWei().toString(),
    refetchAllowance,
  }
}
