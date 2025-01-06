import { Box, ChevronDownIcon, Flex } from '@pancakeswap/uikit'
import { SwapUIV2 } from '@pancakeswap/widgets-internal'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useAccount } from 'wagmi'
import {
  StyledSwapContainer,
  Wrapper,
  PanelWrapper,
  FormGroup,
  Label,
  InputWrapper,
  Input,
  SelectWrapper,
  Select,
  IconWrapper,
  ToNetworkText,
} from 'views/Bridge/styles'
import Page from 'views/Page'
import FormContainer from 'views/Bridge/FormContainer'
import FlipButton from 'views/Bridge/FlipButton'
import useBridgeForm from 'views/Bridge/useBridgeForm'

const ConnectButtonReplace = ({ children }) => {
  const { address: account } = useAccount()

  if (!account) {
    return <ConnectWalletButton width="100%" withIcon />
  }

  return children
}

export default function Bridge() {
  const {
    formState,
    handleFlip,
    handleTokenChange,
    handleAmountChange,
    getAvailableTokens,
    networks,
    isValid,
    isSubmitting,
    handleSubmit,
  } = useBridgeForm()

  const availableTokens = getAvailableTokens()

  const onBridgeClick = async () => {
    const data = await handleSubmit()

    if (data) {
      console.log('===>', data)
    }
  }

  return (
    <Page removePadding hideFooterOnDesktop={false} showExternalLink={false} showHelpLink={false}>
      <Flex width="100%" height="100%" justifyContent="center" position="relative">
        <Flex flexDirection="column" alignItems="center" height="100%">
          <StyledSwapContainer justifyContent="center" width="100%" style={{ height: '100%' }}>
            <Wrapper height="100%">
              <SwapUIV2.SwapFormWrapper>
                <SwapUIV2.SwapTabAndInputPanelWrapper style={{ marginTop: '42px' }}>
                  <FormContainer>
                    <FormGroup>
                      <Label htmlFor="from">{`From ${networks.from}`}</Label>
                      <InputWrapper>
                        <Input
                          type="text"
                          id="from"
                          placeholder="0.00"
                          value={formState.fromAmount}
                          onChange={(e) => handleAmountChange(e.target.value)}
                        />
                        <SelectWrapper>
                          <Select value={formState.fromToken} onChange={(e) => handleTokenChange(e.target.value)}>
                            {availableTokens.map((token) => (
                              <option key={token} value={token}>
                                {token}
                              </option>
                            ))}
                          </Select>
                          <IconWrapper>
                            <ChevronDownIcon />
                          </IconWrapper>
                        </SelectWrapper>
                      </InputWrapper>
                    </FormGroup>
                    <FlipButton onClick={handleFlip} />
                    <FormGroup>
                      <Label htmlFor="to">{`To ${networks.to}`}</Label>
                      <InputWrapper>
                        <Input type="text" id="to" placeholder="0.00" value={formState.toAmount} disabled readOnly />
                        <ToNetworkText>{formState.toToken}</ToNetworkText>
                      </InputWrapper>
                    </FormGroup>
                  </FormContainer>
                </SwapUIV2.SwapTabAndInputPanelWrapper>
                <PanelWrapper>
                  <ConnectButtonReplace>
                    <Box mt="0.25rem">
                      <CommitButton
                        id="swap-button"
                        width="100%"
                        data-dd-action-name="Swap commit button"
                        variant="primary"
                        disabled={!isValid || isSubmitting}
                        onClick={onBridgeClick}
                      >
                        Bridge
                      </CommitButton>
                    </Box>
                  </ConnectButtonReplace>
                </PanelWrapper>
              </SwapUIV2.SwapFormWrapper>
            </Wrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}
