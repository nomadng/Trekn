import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const Collection = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    treeAddress: {
      type: String,
    },
    collectionMint: {
      type: String,
    },
    collectionMetadataAccount: {
      type: String,
    },
    collectionMasterEditionAccount: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
)

export default db.model('Collection', Collection)
