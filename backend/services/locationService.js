import Location from '@root/models/Location'

export const getListLocationByName = async (req) => {
  const { name, size, page } = req.body
  const locations = await Location.find().or([{ name: new RegExp(name, 'i') }, { address: new RegExp(name, 'i') }])
    .limit(size)
    .skip(size * (page - 1))
    .sort({ nftMintedCount: 'desc' })
    .lean()
  return locations;
}
