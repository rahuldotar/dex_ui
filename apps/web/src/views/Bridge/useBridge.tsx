import { useState, useCallback } from 'react'
import { ethers } from 'ethers'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAccount } from 'wagmi'
import { BridgeAbi, ERC20Abi } from 'views/Bridge/constant'

const useBridge = () => {
  const { t } = useTranslation()
  const { chainId } = useActiveChainId()
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bridgeUSDCtoWUSDC = useCallback(
    async (amount: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const usdcAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
        const wusdcAddress = '0x4B6cC49269E7a4249F63942349355844C25f494f'

        const provider = new ethers.providers.Web3Provider(window.ethereum as any)
        const signer = provider.getSigner()

        const usdcContract = new ethers.Contract(usdcAddress, ERC20Abi, signer)
        const wusdcContract = new ethers.Contract(wusdcAddress, BridgeAbi, signer)

        // Approve the WUSDC contract to spend USDC
        const approveTx = await usdcContract.approve(wusdcAddress, ethers.utils.parseUnits(amount, 6))
        await approveTx.wait()

        // Call the bridge function on the WUSDC contract
        const bridgeTx = await wusdcContract.bridgeUSDC(ethers.utils.parseUnits(amount, 6))
        await bridgeTx.wait()

        setIsLoading(false)
      } catch (err) {
        setError(t('Error bridging USDC to WUSDC'))
        setIsLoading(false)
      }
    },
    [chainId, address, t],
  )

  return { bridgeUSDCtoWUSDC, isLoading, error }
}

export default useBridge
