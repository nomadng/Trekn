import Collection from '@root/models/Collection'

export const findCollectionById = async (collectionId) => Collection.findById(collectionId).lean()
