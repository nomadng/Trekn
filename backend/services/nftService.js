import { randomRarityNFT } from '@root/utils/randomRarity'

export const mintNft = (req) => {
  const { address, locationId } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
}
