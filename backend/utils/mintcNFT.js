const { Connection, PublicKey, Transaction, clusterApiUrl } = require('@solana/web3.js')
const {
  createMintToCollectionV1Instruction,
  PROGRAM_ID: BUBBLEGUM_PROGRAM_ID,
} = require('@metaplex-foundation/mpl-bubblegum')
const { SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID } = require('@solana/spl-account-compression')
const { PROGRAM_ID: TOKEN_METADATA_PROGRAM_ID } = require('@metaplex-foundation/mpl-token-metadata')

export const createTrxMintCompressedNft = async (
  nftArgs,
  userPubkey,
  serverKeypair,
  treeAddress,
  collectionMint,
  collectionMetadata,
  collectionMasterEditionAccount, 
) => {
  const connection = new Connection(clusterApiUrl('devnet'))
  const [treeAuthority, _bump] = await PublicKey.findProgramAddressSync([treeAddress.toBuffer()], BUBBLEGUM_PROGRAM_ID)
  const [bgumSigner, __] = await PublicKey.findProgramAddressSync(
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
      collectionMint,
      collectionMetadata,
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
  const { blockhash } = await connection.getLatestBlockhash()
  tx.recentBlockhash = blockhash

  tx.partialSign(serverKeypair)

  const serializeConfig = {
    requireAllSignatures: false,
  }

  const base64Transaction = tx.serialize(serializeConfig).toString('base64')

  return base64Transaction
}
