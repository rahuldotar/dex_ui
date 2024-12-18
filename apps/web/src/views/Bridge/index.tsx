import { Box, Flex } from '@pancakeswap/uikit'
import { styled } from 'styled-components'
import { SwapUIV2 } from '@pancakeswap/widgets-internal'
import { BridgeSelection } from 'views/Bridge/SwapSelectionTab'
import { useState } from 'react'
import { BridgeType } from 'views/Bridge/types'
import FormMain from 'views/Bridge/FormMain'
import { CommitButton } from 'components/CommitButton'
import Page from '../Page'

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const Wrapper = styled(Box)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 480px;
    max-width: 480px;
  }
`

export const StyledSwapContainer = styled(Flex)`
  flex-shrink: 0;
  height: fit-content;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 16px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${() => 'padding: 0 40px'};
  }
`

export default function Bridge() {
  const [bridgeType, setBridgeType] = useState(BridgeType.DEPOSIT)

  return(
    <Page removePadding hideFooterOnDesktop={false} showExternalLink={false} showHelpLink={false}>
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        position="relative"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          height="100%"
        >
          <StyledSwapContainer
            justifyContent="center"
            width="100%"
            style={{ height: '100%' }}
          >
            <Wrapper height="100%">
              <SwapUIV2.SwapFormWrapper>
                <SwapUIV2.SwapTabAndInputPanelWrapper>
                  <BridgeSelection bridgeType={bridgeType} setBridgeType={setBridgeType} />
                  <FormMain bridgeType={bridgeType} />
                </SwapUIV2.SwapTabAndInputPanelWrapper>
                <PanelWrapper>
                <Box mt="0.25rem">
                  <CommitButton
                    id="swap-button"
                    width="100%"
                    data-dd-action-name="Swap commit button"
                    variant='primary'
                    disabled={false}
                    onClick={() => {}}
                  >
                    Connect Wallet
                  </CommitButton>
                </Box>
                </PanelWrapper>
              </SwapUIV2.SwapFormWrapper>
            </Wrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </Page>
  )
}