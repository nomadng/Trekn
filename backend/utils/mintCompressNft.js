import { clusterApiUrl, Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'
import {
  createMintToCollectionV1Instruction,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum'
import { SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID } from '@solana/spl-account-compression'
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'
import base58 from 'bs58'
import serverConfig from '@root/config/server'
import { BaseError } from '@root/utils/baseError'
import { INVALID_SECRET_KEY } from '@root/utils/responseMsg'
import { HTTP_CONSTANTS } from '@root/utils/constants'

export const createTrxMintCompressedNft = async ({
  nftArgs,
  userPubkey,
  serverKeypair,
  treeAddress,
  collectionMint,
  collectionMetadataAccount,
  collectionMasterEditionAccount,
}) => {
  const connection = new Connection('https://rpc.ankr.com/solana')
  const [treeAuthority, _bump] = PublicKey.findProgramAddressSync([treeAddress.toBuffer()], BUBBLEGUM_PROGRAM_ID)
  const [bgumSigner, __] = PublicKey.findProgramAddressSync(
    [Buffer.from('collection_cpi', 'utf8')],
    BUBBLEGUM_PROGRAM_ID
  )
  const mintIx = createMintToCollectionV1Instruction(
    {
      merkleTree: treeAddress,
      treeAuthority,
      treeDelegate: serverKeypair.publicKey,
      payer: userPubkey,
      leafDelegate: userPubkey,
      leafOwner: userPubkey,
      compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      logWrapper: SPL_NOOP_PROGRAM_ID,
      collectionAuthority: serverKeypair.publicKey,
      collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
      collectionMint,
      collectionMetadata: collectionMetadataAccount,
      editionAccount: collectionMasterEditionAccount,
      bubblegumSigner: bgumSigner,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
    },
    {
      metadataArgs: Object.assign(nftArgs, {
        collection: {
          key: collectionMint,
          verified: false,
        },
      }),
    }
  )
  const tx = new Transaction().add(mintIx)
  tx.feePayer = userPubkey

  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash

  tx.partialSign(serverKeypair)

  const serializeConfig = {
    requireAllSignatures: false,
  }

  const base64Transaction = tx.serialize(serializeConfig).toString('base64')

  return base64Transaction
}

export const createMintCompressNftProps = ({
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
