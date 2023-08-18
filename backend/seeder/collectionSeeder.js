import Collection from '@root/models/Collection'

export const collectionSeeder = async () => {
  const treeAddress = 'FiRK7g7FrwH2wmAuGvyaDzojV3sXaLSAmq4db93D3o99'
  const collectionMint =
    'ApkVavDgocof6PfoWqWGQjHR4YAdkPRFgzmx1nA1RwAG'
  const collectionMetadataAccount =
    '5imZDSjnrpqzDmSe6KdCNXmwxzMa9uj5coqjCTnKM7iV'
  const collectionMasterEditionAccount =
    'Aj9ynJUfhXYDbFish6cZspCQXTKDM9DQL49vZe1LbgGg'
  const collection = new Collection({
    name: 'vietnam collection',
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount
  })
  await collection.save()
}

export const getAllCollections = async () => Collection.find().lean()
