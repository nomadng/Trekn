import { randomRarityNFT } from '@root/utils/randomRarity'
import { randomLocationPhotoByConditions } from '@root/repositories/locationPhotoRepository'
import { HTTP_CONSTANTS, NFT_ATTRIBUTE_SEASON } from '@root/utils/constants'
import { findLocationById } from '@root/repositories/locationRepository'
import { LOCATION_NOT_FOUND, LOCATION_PHOTO_NOT_FOUND } from '@root/utils/responseMsg'
import { BaseError } from '@root/utils/baseError'

export const mintNft = async (req) => {
  const { address, locationId } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
  const locationPhotoInfo = await randomLocationPhotoByConditions({
    rarity,
    locationId,
  })
  if (!locationPhotoInfo) {
    throw new BaseError(
      new Error(LOCATION_PHOTO_NOT_FOUND),
      LOCATION_PHOTO_NOT_FOUND,
      HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST
    )
  }
  const locationInfo = await findLocationById(locationId)
  if (!locationInfo) {
    throw new BaseError(new Error(LOCATION_NOT_FOUND), LOCATION_NOT_FOUND, HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }

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
