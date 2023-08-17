import mongoose from 'mongoose'
import db from '@root/config/mongodb/mongodb'

const Nation = new mongoose.Schema(
  {
    name: {
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

export default db.model('Nation', Nation)
