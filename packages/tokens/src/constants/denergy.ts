import { ChainId, WETH9 } from '@pancakeswap/sdk'
import { USDC } from './common'

export const denergyTokens = {
  wwatt: WETH9[ChainId.DENERGY],
  usdc: USDC[ChainId.DENERGY],
}
