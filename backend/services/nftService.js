import { randomRarityNFT } from '@root/utils/randomRarity'
import { createTrxMintCompressedNft } from '../utils/mintcNFT'
import { createMintcNFTProps } from '../utils/createMintcNFTProps'

export const mintNft = async (req) => {
  const { address, locationId, userPubkey } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
  const locationPhotoInfo = await randomLocationPhotoByConditions({
    rarity,
    locationId,
  })
  const locationInfo = await findLocationById(locationId)

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
