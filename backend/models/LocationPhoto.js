import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const LocationPhoto = new mongoose.Schema({
  locationId: {
    type: String,
  },
  photoLink: {
    type: String,
  },
  rarity: {
    type: String,
  },
  author: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export default db.model('LocationPhoto', LocationPhoto)
