import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'

import { BridgeType } from './types'

const StyledButtonMenuItem = styled(ButtonMenuItem)`
  height: 40px;
  padding: 0px 16px;
  * ${({ theme }) => theme.mediaQueries.md} {
    width: 124px;
    padding: 0px 24px;
  }
`

const BridgeSelectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 16px;
  margin-top: 42px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 16px;
  }
`

export const BridgeSelection = ({
  bridgeType,
  setBridgeType,
  style,
}: {
  bridgeType: BridgeType
  setBridgeType: (bridgeType: BridgeType) => void
  style?: React.CSSProperties
}) => {
  return (
    <BridgeSelectionWrapper style={style}>
      <ButtonMenu
        scale="md"
        activeIndex={bridgeType}
        onItemClick={(index) => setBridgeType(index as BridgeType)}
        variant="subtle"
        noButtonMargin
        fullWidth
      >
        <StyledButtonMenuItem>Deposit</StyledButtonMenuItem>
        <StyledButtonMenuItem>Withdraw</StyledButtonMenuItem>
      </ButtonMenu>
    </BridgeSelectionWrapper>
  )
}
