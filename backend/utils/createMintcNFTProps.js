import { TokenProgramVersion, TokenStandard } from '@metaplex-foundation/mpl-bubblegum'
import { Keypair, PublicKey } from '@solana/web3.js'
import base58 from 'bs58'
import serverConfig from '@root/config/server'
import { BaseError } from '@root/utils/baseError'
import { INVALID_SECRET_KEY } from '@root/utils/responseMsg'
import { HTTP_CONSTANTS } from '@root/utils/constants'

export const createMintCompressNFTProps = ({
  uriMetadata,
  userPubkeyString,
  treeAddressString,
  collectionMintString,
  collectionMetadataAccountString,
  collectionMasterEditionAccountString,
}) => {
  const userPubkey = new PublicKey(userPubkeyString)
  const treeAddress = new PublicKey(treeAddressString)
  const collectionMint = new PublicKey(collectionMintString)
  const collectionMetadataAccount = new PublicKey(collectionMetadataAccountString)
  const collectionMasterEditionAccount = new PublicKey(collectionMasterEditionAccountString)

  const secretKey = serverConfig.get('privateKey')
  if (!secretKey) {
    throw new BaseError(new Error(INVALID_SECRET_KEY), INVALID_SECRET_KEY, HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }
  let decodedSecretKey
  try {
    decodedSecretKey = base58.decode(secretKey)
  } catch {
    throw new BaseError(new Error(INVALID_SECRET_KEY), INVALID_SECRET_KEY, HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }
  const serverKeypair = Keypair.fromSecretKey(decodedSecretKey)

  const nftArgs = {
    symbol: 'cNFT',
    name: 'Compressed NFT',
    uri: uriMetadata,
    creators: [
      {
        address: userPubkey,
        share: 100,
      },
    ],
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
