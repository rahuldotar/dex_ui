import dynamic from 'next/dynamic'
import { memo, useCallback, useMemo, useRef } from 'react'

import { AutoColumn, useMatchBreakpoints } from '@pancakeswap/uikit'

import { AutoRow } from 'components/Layout/Row'
import { keyframes, styled } from 'styled-components'

import { useTheme } from '@pancakeswap/hooks'
import { SwapUIV2 } from '@pancakeswap/widgets-internal'
import { LottieRefCurrentProps } from 'lottie-react'

import ArrowDark from '../../../public/images/swap/arrow_dark.json' assert { type: 'json' }
import ArrowLight from '../../../public/images/swap/arrow_light.json' assert { type: 'json' }

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const switchAnimation = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
`

const FlipButtonWrapper = styled.div`
  will-change: transform;
  &.switch-animation {
    animation: ${switchAnimation} 0.25s forwards ease-in-out;
  }
`

export const Line = styled.div`
  position: absolute;
  left: -16px;
  right: -16px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  top: calc(50% + 6px);
`

const FlipButton = memo(function FlipButton({ onClick }: { onClick: () => void }) {
  const flipButtonRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const { isDark } = useTheme()
  const { isDesktop } = useMatchBreakpoints()

  const animationData = useMemo(() => (isDark ? ArrowDark : ArrowLight), [isDark])

  const onFlip = useCallback(() => {
    onClick()
  }, [onClick])

  const handleAnimatedButtonClick = useCallback(() => {
    onFlip()

    if (flipButtonRef.current && !flipButtonRef.current.classList.contains('switch-animation')) {
      flipButtonRef.current.classList.add('switch-animation')
    }
  }, [onFlip])

  const handleAnimationEnd = useCallback(() => {
    flipButtonRef.current?.classList.remove('switch-animation')
  }, [])

  return (
    <AutoColumn justify="space-between" position="relative">
      <Line />
      <AutoRow justify="center" style={{ padding: '0 1rem', marginTop: '1em' }}>
        {isDesktop ? (
          <FlipButtonWrapper ref={flipButtonRef} onAnimationEnd={handleAnimationEnd}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={handleAnimatedButtonClick}
              autoplay={false}
              loop={false}
              onMouseEnter={() => lottieRef.current?.playSegments([7, 19], true)}
              onMouseLeave={() => {
                handleAnimationEnd()
                lottieRef.current?.playSegments([39, 54], true)
              }}
            />
          </FlipButtonWrapper>
        ) : (
          <SwapUIV2.SwitchButtonV2 onClick={() => {}} />
        )}
      </AutoRow>
    </AutoColumn>
  )
})

export default FlipButton
