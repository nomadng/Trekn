import { randomRarityNFT } from '@root/utils/randomRarity'
import { createTrxMintCompressedNft } from '@root/utils/mintcNFT'
import { createMintcNFTProps } from '@root/utils/createMintcNFTProps'

export const mintNft = async (req) => {
  const { address, locationId, userPubkey } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()

  const treeAddressString = ''
  const collectionMintString = ''
  const collectionMetadataAccountString = ''
  const collectionMasterEditionAccountString = ''

  const base64Transaction = await createTrxMintCompressedNft(
    createMintcNFTProps(
      userPubkey,
      treeAddressString,
      collectionMintString,
      collectionMetadataAccountString,
      collectionMasterEditionAccountString
    )
  )

  // res.send({ transaction: base64Transaction })
}
