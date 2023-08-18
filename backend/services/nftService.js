import { randomRarityNFT } from '@root/utils/randomRarity'
import { createTrxMintCompressedNft } from '../utils/mintcNFT'
import { HTTP_CONSTANTS, createMintcNFTProps } from '../utils/createMintcNFTProps'
import { LOCATION_NOT_FOUND, LOCATION_PHOTO_NOT_FOUND } from '@root/utils/responseMsg'
import { BaseError } from '@root/utils/baseError'

export const mintNft = async (req) => {
  const { address, locationId, userPubkey } = req.body

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

  const treeAddressString = ''
  const collectionMintString = ''
  const collectionMetadataAccountString = ''
  const collectionMasterEditionAccountString = ''
  const base64Transaction = await createTrxMintCompressedNft(
    createMintcNFTProps({
      userPubkey,
      treeAddressString,
      collectionMintString,
      collectionMetadataAccountString,
      collectionMasterEditionAccountString,
    })
  )

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
