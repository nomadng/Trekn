import { randomRarityNFT } from '@root/utils/randomRarity'
import { PublicKey, Keypair } from '@solana/web3.js'
import { createTrxMintCompressedNft } from '../utils/mintcNFT'
import { createMintcNFTProps } from '../utils/createMintcNFTProps'

export const mintNft = async (req) => {
  const { address, locationId, userPubkey } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
  const treeAddressString = new PublicKey('')
  const collectionMintString = new PublicKey('')
  const collectionMetadataAccountString = new PublicKey('')

  const base64Transaction = await createTrxMintCompressedNft(
    createMintcNFTProps({
      userPubkeyString: userPubkey,
      treeAddressString: treeAddressString,
      collectionMintString: collectionMintString,
      collectionMetadataAccountString: collectionMetadataAccountString,
    })
  )

  res.send({ transaction: base64Transaction })
}
