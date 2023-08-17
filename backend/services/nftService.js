import { randomRarityNFT } from '@root/utils/randomRarity'
import { randomLocationPhotoByConditions } from '@root/repositories/locationPhotoRepository'
import { NFT_ATTRIBUTE_SEASON } from '@root/utils/constants'
import { findLocationById } from '@root/repositories/locationRepository'

export const mintNft = async (req) => {
  const { address, locationId } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
  const locationPhotoInfo = await randomLocationPhotoByConditions({
    rarity,
    locationId,
  })
  const locationInfo = await findLocationById(locationId)

  return {
    name: locationInfo.name,
    collectionName: locationInfo.collectionName,
    rarity: locationPhotoInfo.rarity,
    photoLink: locationPhotoInfo.photoLink,
    description: locationInfo.description,
    author: locationPhotoInfo.author,
    session: NFT_ATTRIBUTE_SEASON,
  }
}
