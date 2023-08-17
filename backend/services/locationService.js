import Location from '@root/models/Location'

export const getListByName = (req) => {
  const { name } = req.body
  const locations = Location.find()
    .lean()
}
