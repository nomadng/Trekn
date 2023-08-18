import { constants as httpConstants } from 'http2'

export const HTTP_CONSTANTS = httpConstants

export const nftRarity = {
  COMMON: 1,
  UNCOMMON: 2,
  RARE: 3,
  EPIC: 4,
  LEGENDARY: 5,
}

export const NFT_ATTRIBUTE_SEASON = 1

export const PAGINATION_SETTING = {
  DEFAULT_PAGE: 1,
  PAGE_SIZE: 10,
}

export const SORT_DIRECTION = {
  ASC: 1,
  DESC: -1,
}
