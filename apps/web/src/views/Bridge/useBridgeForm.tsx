import { useState, useCallback } from 'react'

// Types
interface NetworkToken {
  symbol: string
  wrapped: string
}

interface NetworkConfig {
  name: string
  tokens: NetworkToken[]
}

// Network configurations
const NETWORKS: Record<string, NetworkConfig> = {
  ETH: {
    name: 'ETH Network',
    tokens: [
      { symbol: 'USDC', wrapped: 'WUSDC' },
      { symbol: 'EURC', wrapped: 'WEURC' },
    ],
  },
  DENERGY: {
    name: 'D Energy Network',
    tokens: [
      { symbol: 'WUSDC', wrapped: 'USDC' },
      { symbol: 'WEURC', wrapped: 'EURC' },
    ],
  },
}

interface TransferFormState {
  fromNetwork: 'ETH' | 'DENERGY'
  toNetwork: 'ETH' | 'DENERGY'
  fromAmount: string
  toAmount: string
  fromToken: string
  toToken: string
}

const useBridgeForm = () => {
  // Initial state
  const [formState, setFormState] = useState<TransferFormState>({
    fromNetwork: 'ETH',
    toNetwork: 'DENERGY',
    fromAmount: '',
    toAmount: '',
    fromToken: 'USDC',
    toToken: 'WUSDC',
  })

  // Handle network flip
  const handleFlip = useCallback(() => {
    setFormState((prev) => {
      const newFromNetwork = prev.fromNetwork === 'ETH' ? 'DENERGY' : 'ETH'
      const newToNetwork = prev.toNetwork === 'ETH' ? 'DENERGY' : 'ETH'

      // Find corresponding wrapped/unwrapped token
      const currentNetwork = NETWORKS[newFromNetwork]
      const token = currentNetwork.tokens.find((t) => t.wrapped === prev.toToken || t.symbol === prev.fromToken)

      return {
        ...prev,
        fromNetwork: newFromNetwork,
        toNetwork: newToNetwork,
        fromToken: token?.symbol || prev.toToken,
        toToken: token?.wrapped || prev.fromToken,
        // Reset amounts on flip
        fromAmount: '',
        toAmount: '',
      }
    })
  }, [])

  // Handle token selection change
  const handleTokenChange = useCallback((newToken: string) => {
    setFormState((prev) => {
      const currentNetwork = NETWORKS[prev.fromNetwork]
      const token = currentNetwork.tokens.find((t) => t.symbol === newToken)

      return {
        ...prev,
        fromToken: newToken,
        toToken: token?.wrapped || prev.toToken,
        // Reset amounts on token change
        fromAmount: '',
        toAmount: '',
      }
    })
  }, [])

  // Handle amount input
  const handleAmountChange = useCallback((amount: string) => {
    setFormState((prev) => ({
      ...prev,
      fromAmount: amount,
      toAmount: amount, // In this case 1:1 ratio, modify if needed
    }))
  }, [])

  // Get available tokens for current network
  const getAvailableTokens = useCallback(() => {
    return NETWORKS[formState.fromNetwork].tokens.map((t) => t.symbol)
  }, [formState.fromNetwork])

  return {
    formState,
    handleFlip,
    handleTokenChange,
    handleAmountChange,
    getAvailableTokens,
    networks: {
      from: NETWORKS[formState.fromNetwork].name,
      to: NETWORKS[formState.toNetwork].name,
    },
  }
}

export default useBridgeForm
