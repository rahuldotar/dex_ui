import { useState, useCallback, useMemo } from 'react'
import useBridge from 'views/Bridge/useBridge'

// Types
interface NetworkToken {
  from: string
  to: string
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
      { from: 'USDC', to: 'WUSDC' },
      { from: 'EURC', to: 'WEURC' },
    ],
  },
  DENERGY: {
    name: 'D Energy Network',
    tokens: [
      { from: 'WUSDC', to: 'USDC' },
      { from: 'WEURC', to: 'EURC' },
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

interface FormErrors {
  fromAmount?: string
  fromToken?: string
  error?: string
}

interface SubmitData extends TransferFormState {
  timestamp: number
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

  const { bridgeUSDCtoWUSDC } = useBridge()

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle network flip
  const handleFlip = useCallback(() => {
    setFormState((prev) => {
      const newFromNetwork = prev.fromNetwork === 'ETH' ? 'DENERGY' : 'ETH'
      const newToNetwork = prev.toNetwork === 'ETH' ? 'DENERGY' : 'ETH'

      // Find corresponding to/unto token
      const currentNetwork = NETWORKS[newFromNetwork]
      const token = currentNetwork.tokens.find((t) => t.to === prev.toToken || t.from === prev.fromToken)

      return {
        ...prev,
        fromNetwork: newFromNetwork,
        toNetwork: newToNetwork,
        fromToken: token?.from || prev.toToken,
        toToken: token?.to || prev.fromToken,
        fromAmount: '',
        toAmount: '',
      }
    })
    // Clear errors on flip
    setErrors({})
  }, [])

  // Handle token selection change
  const handleTokenChange = useCallback((newToken: string) => {
    setFormState((prev) => {
      const currentNetwork = NETWORKS[prev.fromNetwork]
      const token = currentNetwork.tokens.find((t) => t.from === newToken)

      return {
        ...prev,
        fromToken: newToken,
        toToken: token?.to || prev.toToken,
        fromAmount: '',
        toAmount: '',
      }
    })
    // Clear errors on token change
    setErrors((prev) => ({ ...prev, fromToken: undefined }))
  }, [])

  // Handle amount input
  const handleAmountChange = useCallback((amount: string) => {
    // Only allow numbers and decimal points
    if (!/^\d*\.?\d*$/.test(amount) && amount !== '') return

    setFormState((prev) => ({
      ...prev,
      fromAmount: amount,
      toAmount: amount, // In this case 1:1 ratio, modify if needed
    }))
    // Clear errors on amount change
    setErrors((prev) => ({ ...prev, fromAmount: undefined }))
  }, [])

  // Check if form is valid
  const isValid = useMemo(() => {
    // Check amount is present and greater than 0
    if (!formState.fromAmount || parseFloat(formState.fromAmount) <= 0) {
      return false
    }

    // Check token is selected
    if (!formState.fromToken) {
      return false
    }

    return true
  }, [formState.fromAmount, formState.fromToken])

  // Validate form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    // Validate amount
    if (!formState.fromAmount) {
      newErrors.fromAmount = 'Amount is required'
    } else if (parseFloat(formState.fromAmount) <= 0) {
      newErrors.fromAmount = 'Amount must be greater than 0'
    }

    // Validate token
    if (!formState.fromToken) {
      newErrors.fromToken = 'Token is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formState])

  // Handle submit button click
  const handleSubmit = useCallback(async () => {
    if (!isValid) return null

    setIsSubmitting(true)

    try {
      if (!validateForm()) {
        setIsSubmitting(false)
        return null
      }

      // Return the submission data
      const submitData: SubmitData = {
        ...formState,
        timestamp: Date.now(),
      }

      await bridgeUSDCtoWUSDC(submitData.toAmount).then(() => {})

      return submitData
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Transaction failed',
      }))
      return null
    } finally {
      setIsSubmitting(false)
    }
  }, [formState, validateForm, isValid])

  // Get available tokens for current network
  const getAvailableTokens = useCallback(() => {
    return NETWORKS[formState.fromNetwork].tokens.map((t) => t.from)
  }, [formState.fromNetwork])

  return {
    formState,
    errors,
    isSubmitting,
    isValid,
    handleFlip,
    handleTokenChange,
    handleAmountChange,
    handleSubmit,
    getAvailableTokens,
    networks: {
      from: NETWORKS[formState.fromNetwork].name,
      to: NETWORKS[formState.toNetwork].name,
    },
  }
}

export default useBridgeForm
