import mongoose from 'mongoose'
import db from '@root/config/mongodb/mongodb'

const LocationPhoto = new mongoose.Schema(
  {
    locationId: {
      type: String,
    },
    photoLink: {
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
