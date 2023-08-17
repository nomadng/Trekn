import { WrappedConnection } from './wrappedConnection'
import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import {
  createMintToCollectionV1Instruction,
  MetadataArgs,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from '@metaplex-foundation/mpl-bubblegum'
import { SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID } from '@solana/spl-account-compression'
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'

export const createTrxMintCompressedNft = async (
  nftArgs: MetadataArgs,
  userPubkey: PublicKey,
  serverKeypair: Keypair,
  treeAddress: PublicKey,
  collectionMint: PublicKey,
  collectionMetadata: PublicKey,
  collectionMasterEditionAccount: PublicKey
) => {
  const connection = new Connection(clusterApiUrl('devnet'))
  const [treeAuthority, _bump] = await PublicKey.findProgramAddress([treeAddress.toBuffer()], BUBBLEGUM_PROGRAM_ID)
  const [bgumSigner, __] = await PublicKey.findProgramAddress(
    [Buffer.from('collection_cpi', 'utf8')],
    BUBBLEGUM_PROGRAM_ID
  )
  const mintIx = createMintToCollectionV1Instruction(
    {
      merkleTree: treeAddress,
      treeAuthority,
      treeDelegate: userPubkey,
      payer: serverKeypair.publicKey,
      leafDelegate: userPubkey,
      leafOwner: userPubkey,
      compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
      logWrapper: SPL_NOOP_PROGRAM_ID,
      collectionAuthority: userPubkey,
      collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
      collectionMint: collectionMint,
      collectionMetadata: collectionMetadata,
      editionAccount: collectionMasterEditionAccount,
      bubblegumSigner: bgumSigner,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
    },
    {
      metadataArgs: Object.assign(nftArgs, {
        collection: { key: collectionMint, verified: false },
      }),
    }
  )
  const tx = new Transaction().add(mintIx)
  tx.feePayer = serverKeypair.publicKey
  const blockhash = (await connection.getLatestBlockhash()).blockhash
  tx.recentBlockhash = blockhash

  tx.partialSign(serverKeypair)

  // serialize's config struct
  type SerializeConfig = {
    requireAllSignatures?: boolean
    verifySignatures?: boolean
  }

  // serialize's config
  const serializeConfig: SerializeConfig = {
    requireAllSignatures: false,
  }

  // serialize transaction
  const base64Transaction = tx.serialize(serializeConfig).toString('base64')

  return base64Transaction
}
