import { randomRarityNFT } from '@root/utils/randomRarity'
import { PublicKey, Keypair } from '@solana/web3.js'
import { createTrxMintCompressedNft } from '../utils/mintcNFT'

export const mintNft = async (req) => {
  const { address, locationId } = req.body

  // Step 1: Random rarity
  const rarity = randomRarityNFT()
  const keypair = Keypair.fromSecretKey(Buffer.from(process.env.PRIVATE_KEY))
  const treeAddress = new PublicKey('FiRK7g7FrwH2wmAuGvyaDzojV3sXaLSAmq4db93D3o99')
  const collectionMint = new PublicKey('ApkVavDgocof6PfoWqWGQjHR4YAdkPRFgzmx1nA1RwAG')
  const collectionMetadataAccount = new PublicKey('5imZDSjnrpqzDmSe6KdCNXmwxzMa9uj5coqjCTnKM7iV')
  const collectionMasterEditionAccount = new PublicKey('Aj9ynJUfhXYDbFish6cZspCQXTKDM9DQL49vZe1LbgGg')

  const secretKey = process.env['SECRET_KEY']
  if (!secretKey) {
    throw new Error('Wallet secret key must be provided via SECRET_KEY env var')
  }
  let decodedSecretKey
  try {
    decodedSecretKey = base58.decode(secretKey)
  } catch {
    throw new Error('Invalid secret key provided. Must be a base 58 encoded string.')
  }

  const serverKeypair = Keypair.fromSecretKey(decodedSecretKey)

  const nftArgs = {
    name: 'Hoa Lo Prison',
    symbol: 'HLP',
    uri: 'https://arweave.net/IxG5hBebTx7uZV_YQog9b_3n7Nif7bREskQvK_Q93oc',
    creators: [],
    editionNonce: 253,
    tokenProgramVersion: TokenProgramVersion.Original,
    tokenStandard: TokenStandard.NonFungible,
    uses: null,
    collection: null,
    primarySaleHappened: false,
    sellerFeeBasisPoints: 0,
    isMutable: false,
  }

  const base64Transaction = await createTrxMintCompressedNft(
    nftArgs,
    userPubkey,
    serverKeypair,
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount
  )

  res.send({ transaction: base64Transaction })
}
