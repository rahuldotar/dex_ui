import { BridgeType } from 'views/Bridge/types'
import CurrencyInputPanelSimplify from 'components/CurrencyInputPanelSimplify'
import { CommonBasesType } from 'components/SearchModal/types'
import { Text } from '@pancakeswap/uikit'
import { FlipButton } from 'views/SwapSimplify/V4Swap/FlipButton'
import { useIsWrapping } from 'views/Swap/V3Swap/hooks'
import { FormContainer } from './FormContainer'
import { useDefaultsFromURLSearch } from 'state/swap/hooks'

interface Props {
  bridgeType: BridgeType
}

export default function FormMain({ bridgeType }: Props) {
  const isWrapping = useIsWrapping()
  const loadedUrlParams = useDefaultsFromURLSearch()

  const inputLoading = false
  const outputLoading = false

  return <FormContainer>
    <CurrencyInputPanelSimplify
      id="swap-currency-input"
      showUSDPrice
      showMaxButton
      showCommonBases
      inputLoading={!isWrapping && inputLoading}
      currencyLoading={!loadedUrlParams}
      label='From ETH Network'
      value=''
      showQuickInputButton
      onUserInput={() => {}}
      title={
        <Text color="textSubtle" fontSize={12} bold>
          From ETH Network
        </Text>
      }
    />
    <FlipButton />
    <CurrencyInputPanelSimplify
      id="swap-currency-output"
      showUSDPrice
      showCommonBases
      showMaxButton={false}
      inputLoading={!isWrapping && outputLoading}
      currencyLoading={!loadedUrlParams}
      onUserInput={() => {}}
      label='To D Energy Network'
      value=''
      title={
        <Text color="textSubtle" fontSize={12} bold>
          To D Energy Network
        </Text>
      }
    />
  </FormContainer>
}
