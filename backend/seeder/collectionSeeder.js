import Collection from '@root/models/Collection'

export const collectionSeeder = async () => {
  const collections = [
    {
      _id: '64df40111779e6cf3dbf3db3',
      name: 'Vietnam Collection',
      treeAddress: 'DZnZc42iLGPLF3sDzpS3Ra7TkxkG4nDX2SVy2fmnhwg3',
      collectionMint: '3xuhvK8ss8Ab2isE65U1JDGfsaijY3eQAyK7TPJbfVK3',
      collectionMetadataAccount: '6PWWTT8hNeGTcWMA4fXABz26HXdYEWxdq4EqFBicanmT',
      collectionMasterEditionAccount: '2rCgPUrGmXhm9yNjzMJqtHARBS6PAfhgtniwNANk7fgk',
      isDeleted: false,
    },
    {
      _id: '64df402512af22cd1d13859a',
      name: 'Japan Collection',
      treeAddress: 'DZnZc42iLGPLF3sDzpS3Ra7TkxkG4nDX2SVy2fmnhwg3',
      collectionMint: '3xuhvK8ss8Ab2isE65U1JDGfsaijY3eQAyK7TPJbfVK3',
      collectionMetadataAccount: '6PWWTT8hNeGTcWMA4fXABz26HXdYEWxdq4EqFBicanmT',
      collectionMasterEditionAccount: '2rCgPUrGmXhm9yNjzMJqtHARBS6PAfhgtniwNANk7fgk',
      isDeleted: false,
    },
    {
      _id: '64df4030d863e1169ccbaf5a',
      name: 'India Collection',
      treeAddress: 'DZnZc42iLGPLF3sDzpS3Ra7TkxkG4nDX2SVy2fmnhwg3',
      collectionMint: '3xuhvK8ss8Ab2isE65U1JDGfsaijY3eQAyK7TPJbfVK3',
      collectionMetadataAccount: '6PWWTT8hNeGTcWMA4fXABz26HXdYEWxdq4EqFBicanmT',
      collectionMasterEditionAccount: '2rCgPUrGmXhm9yNjzMJqtHARBS6PAfhgtniwNANk7fgk',
      isDeleted: false,
    },
    {
      _id: '64df4036417cb6ce673e0c36',
      name: 'Spain Collection',
      treeAddress: 'DZnZc42iLGPLF3sDzpS3Ra7TkxkG4nDX2SVy2fmnhwg3',
      collectionMint: '3xuhvK8ss8Ab2isE65U1JDGfsaijY3eQAyK7TPJbfVK3',
      collectionMetadataAccount: '6PWWTT8hNeGTcWMA4fXABz26HXdYEWxdq4EqFBicanmT',
      collectionMasterEditionAccount: '2rCgPUrGmXhm9yNjzMJqtHARBS6PAfhgtniwNANk7fgk',
      isDeleted: false,
    },
    {
      _id: '64df403cd7874f2edb0637f6',
      name: 'UK Collecion',
      treeAddress: 'DZnZc42iLGPLF3sDzpS3Ra7TkxkG4nDX2SVy2fmnhwg3',
      collectionMint: '3xuhvK8ss8Ab2isE65U1JDGfsaijY3eQAyK7TPJbfVK3',
      collectionMetadataAccount: '6PWWTT8hNeGTcWMA4fXABz26HXdYEWxdq4EqFBicanmT',
      collectionMasterEditionAccount: '2rCgPUrGmXhm9yNjzMJqtHARBS6PAfhgtniwNANk7fgk',
      isDeleted: false,
    },
  ]

  await Collection.insertMany(collections)
}

export const getAllCollections = async () => Collection.find().lean()
