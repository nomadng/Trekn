import { randomRarityNFT } from '@root/utils/randomRarity'
import { createTrxMintCompressedNft } from '@root/utils/mintcNFT'
import { createMintcNFTProps } from '@root/utils/createMintcNFTProps'

export const mintNft = async (req) => {
  const { address, locationId, userPubkey } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
}
