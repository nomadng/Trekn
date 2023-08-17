import { TokenProgramVersion, TokenStandard } from '@metaplex-foundation/mpl-bubblegum'
import { Keypair, PublicKey } from '@solana/web3.js'
import base58 from 'bs58'

const createMintcNFTProps = ({
  userPubkeyString,
  treeAddressString,
  collectionMintString,
  collectionMetadataAccountString,
}: {
  userPubkeyString: string
  treeAddressString: string
  collectionMintString: string
  collectionMetadataAccountString: string
}) => {
  const userPubkey = new PublicKey(userPubkeyString)
  const treeAddress = new PublicKey(treeAddressString)
  const collectionMint = new PublicKey(collectionMintString)
  const collectionMetadataAccount = new PublicKey('5imZDSjnrpqzDmSe6KdCNXmwxzMa9uj5coqjCTnKM7iV')
  const collectionMasterEditionAccount = new PublicKey(collectionMetadataAccountString)

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

  return {
    nftArgs,
    userPubkey,
    serverKeypair,
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount,
  }
}
