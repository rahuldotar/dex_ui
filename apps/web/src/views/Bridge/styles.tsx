import { styled } from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'

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

export const Wrapper = styled(Box)`
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 4px;
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => `0 0 0 2px ${theme.colors.primary}`};
  }
`

export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 20px;
  border: none;
  outline: none;
  background: white;

  &::placeholder {
    color: #94a3b8;
  }
`

export const ToNetworkText = styled.div`
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 18px;
`

export const SelectWrapper = styled.div`
  position: relative;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
`

export const Select = styled.select`
  appearance: none;
  padding: 12px 30px 12px 16px;
  font-size: 18px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: #1e293b;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #64748b;
`
