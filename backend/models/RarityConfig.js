import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const RarityConfig = new mongoose.Schema({
  rarity: {
    type: String,
  },
  ratio: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export default db.model('RarityConfig', RarityConfig)
