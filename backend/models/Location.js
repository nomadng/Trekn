import mongoose from 'mongoose'
import db from '@root/config/mongodb'

const Location = new mongoose.Schema(
  {
    collectionId: {
      type: String,
    },
    collectionName: {
      type: String,
    },
    nationId: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    cityName: {
      type: String,
      require: true,
    },
    longitude: {
      type: Number,
      require: true,
    },
    latitude: {
      type: Number,
      require: true,
    },
    radius: {
      type: Number,
      require: true,
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    nftMintedCount: {
      type: Number,
      default: 0,
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
Location.index({ location: '2dsphere' })

export default db.model('Location', Location)
