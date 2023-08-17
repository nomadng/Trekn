import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const Nation = new mongoose.Schema({
  name: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

export default db.model('Nation', Nation)
