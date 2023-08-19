import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const LocationPhoto = new mongoose.Schema(
  {
    locationId: {
      type: String,
    },
    locationNumber: {
      type: Number,
    },
    photoLink: {
      type: String,
    },
    nftMetadataUri: {
      type: String,
    },
    rarity: {
      type: Number,
    },
    author: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default db.model('LocationPhoto', LocationPhoto)
