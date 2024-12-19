import { ContextApi } from '@pancakeswap/localization'
import {
  BridgeIcon,
  DropdownMenuItems,
  DropdownMenuItemType,
  MenuItemsType,
  MoreIcon,
  SwapFillIcon,
  SwapIcon,
} from '@pancakeswap/uikit'
import { SUPPORT_CAKE_STAKING, SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & {
  hideSubNav?: boolean
  overrideSubNavItems?: DropdownMenuItems['items']
  matchHrefs?: string[]
}
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & {
  hideSubNav?: boolean
  image?: string
  items?: ConfigMenuDropDownItemsType[]
  overrideSubNavItems?: ConfigMenuDropDownItemsType[]
}

export const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    // {
    //   label: t('Trade'),
    //   icon: SwapIcon,
    //   fillIcon: SwapFillIcon,
    //   href: '/',
    //   hideSubNav: true,
    //   items: [
    //     {
    //       label: t('Swap'),
    //       href: '/',
    //     },
    //     {
    //       label: t('Perps'),
    //       href: getPerpetualUrl({
    //         chainId,
    //         languageCode,
    //         isDark,
    //       }),
    //       confirmModalId: 'perpConfirmModal',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //     {
    //       label: t('Options'),
    //       href: getOptionsUrl(),
    //       confirmModalId: 'optionsConfirmModal',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //     {
    //       label: t('Buy Crypto'),
    //       href: '/buy-crypto',
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    // {
    //   label: t('Earn'),
    //   href: '/liquidity/pools',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   supportChainIds: SUPPORT_FARMS,
    //   overrideSubNavItems: [
    //     {
    //       label: t('Farm / Liquidity'),
    //       href: '/liquidity/pools',
    //       supportChainIds: SUPPORT_FARMS,
    //     },
    //     {
    //       label: t('Position Manager'),
    //       href: '/position-managers',
    //       supportChainIds: POSITION_MANAGERS_SUPPORTED_CHAINS,
    //     },
    //     {
    //       label: t('CAKE Staking'),
    //       href: '/cake-staking',
    //       supportChainIds: SUPPORT_CAKE_STAKING,
    //     },
    //     {
    //       label: t('Syrup Pools'),
    //       href: '/pools',
    //       supportChainIds: POOL_SUPPORTED_CHAINS,
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    //   items: [
    //     {
    //       label: t('Farm / Liquidity'),
    //       href: '/liquidity/pools',
    //       matchHrefs: ['/liquidity/positions', '/farms'],
    //       supportChainIds: SUPPORT_FARMS,
    //     },
    //     {
    //       label: t('Position Manager'),
    //       href: '/position-managers',
    //       supportChainIds: POSITION_MANAGERS_SUPPORTED_CHAINS,
    //     },
    //     {
    //       label: t('Staking'),
    //       items: [
    //         {
    //           label: t('CAKE Staking'),
    //           href: '/cake-staking',
    //         },
    //         {
    //           label: t('Syrup Pools'),
    //           href: '/pools',
    //           supportChainIds: POOL_SUPPORTED_CHAINS,
    //         },
    //       ].map((item) => addMenuItemSupported(item, chainId)),
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Trad'),
      href: '/',
    },
    {
      label: t('Buy'),
      href: '/buy-crypto',
    },
    {
      label: t('Bridge'),
      href: '/bridge',
      icon: BridgeIcon,
      image: '/images/decorations/pe2.png',
    },
    // {
    //   label: t('Play'),
    //   icon: GameIcon,
    //   href: '/prediction',
    //   overrideSubNavItems: [
    //     {
    //       label: t('Prediction'),
    //       href: '/prediction',
    //     },
    //     {
    //       label: t('Lottery'),
    //       href: '/lottery',
    //     },
    //   ],
    //   items: [
    //     {
    //       status: { text: t('New'), color: 'success' },
    //       label: t('Springboard'),
    //       href: 'https://springboard.pancakeswap.finance',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //     {
    //       label: t('Prediction (BETA)'),
    //       href: '/prediction',
    //       image: '/images/decorations/prediction.png',
    //       supportChainIds: PREDICTION_SUPPORTED_CHAINS,
    //     },
    //     {
    //       label: t('Lottery'),
    //       href: '/lottery',
    //       image: '/images/decorations/lottery.png',
    //     },
    //     {
    //       label: t('Quests'),
    //       href: 'https://quest.pancakeswap.finance/quests',
    //       type: DropdownMenuItemType.EXTERNAL_LINK,
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: '',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Wattswaps Info & Analytics'),
          href: '/info/v3',
        },
        // {
        //   label: t('IFO'),
        //   href: '/ifo',
        //   image: '/images/ifos/ifo-bunny.png',
        //   overrideSubNavItems: [
        //     {
        //       label: t('Latest'),
        //       href: '/ifo',
        //     },
        //     {
        //       label: t('Finished'),
        //       href: '/ifo/history',
        //     },
        //   ],
        // },
        // {
        //   label: t('Voting'),
        //   image: '/images/voting/voting-bunny.png',
        //   items: [
        //     {
        //       label: t('Proposals'),
        //       href: '/voting',
        //       supportChainIds: SUPPORT_ONLY_BSC,
        //     },
        //     {
        //       label: t('Gauges'),
        //       href: '/gauges-voting',
        //       supportChainIds: SUPPORT_CAKE_STAKING,
        //     },
        //   ].map((item) => addMenuItemSupported(item, chainId)),
        // },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Go to Blog'),
          href: 'https://blog.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Go to Docs'),
          href: 'https://docs.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
