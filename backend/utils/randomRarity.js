import LootTable from 'loot-table'
import externalServices from 'validatorjs/src/errors'
import { nftRarity } from '@root/utils/constants'

export const randomRarityNFT = () => {
  const rarityRatio = externalServices.get('rarityRatioConfig')
  const loot = new LootTable()
  loot.add(nftRarity.COMMON, rarityRatio[0])
  loot.add(nftRarity.UNCOMMON, rarityRatio[1])
  loot.add(nftRarity.RARE, rarityRatio[2])
  loot.add(nftRarity.EPIC, rarityRatio[3])
  loot.add(nftRarity.LEGENDARY, rarityRatio[4])
  return loot.choose()
}
