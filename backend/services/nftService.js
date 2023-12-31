import { randomRarityNFT } from '@root/utils/randomRarity'
import { createMintCompressNftProps, createTrxMintCompressedNft } from '@root/utils/mintCompressNft'
import { HTTP_CONSTANTS, NFT_ATTRIBUTE_SEASON } from '@root/utils/constants'
import { COLLECTION_NOT_FOUND, LOCATION_NOT_FOUND, LOCATION_PHOTO_NOT_FOUND } from '@root/utils/responseMsg'
import { BaseError } from '@root/utils/baseError'
import { findCollectionById } from '@root/repositories/collectionRepository'
import { findLocationById } from '@root/repositories/locationRepository'
import { randomLocationPhotoByConditions } from '@root/repositories/locationPhotoRepository'

export const mintNft = async (req) => {
  const { address, locationId } = req.body
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

  const collectionInfo = await findCollectionById(locationInfo.collectionId)
  if (!collectionInfo) {
    throw new BaseError(new Error(COLLECTION_NOT_FOUND), COLLECTION_NOT_FOUND, HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }

  const mintCompressNFTProps = createMintCompressNftProps({
    uriMetadata: locationPhotoInfo.nftMetadataUri,
    userPubkeyString: address,
    treeAddressString: collectionInfo.treeAddress,
    collectionMintString: collectionInfo.collectionMint,
    collectionMetadataAccountString: collectionInfo.collectionMetadataAccount,
    collectionMasterEditionAccountString: collectionInfo.collectionMasterEditionAccount,
  })
  const base64Transaction = await createTrxMintCompressedNft(mintCompressNFTProps)

  return {
    locationNumber: locationPhotoInfo.locationNumber,
    transaction: base64Transaction,
    name: locationInfo.name,
    collectionName: locationInfo.collectionName,
    rarity: locationPhotoInfo.rarity,
    photoLink: locationPhotoInfo.photoLink,
    description: locationInfo.description,
    author: locationPhotoInfo.author,
    session: NFT_ATTRIBUTE_SEASON,
  }
}
