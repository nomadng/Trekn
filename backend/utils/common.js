import { isValidObjectId } from 'mongoose'

export const omitField = (obj, ...props) => {
  const result = { ...obj }
  props.forEach((prop) => {
    delete result[prop]
  })
  return result
}

export const escapeStringRegexp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const configPaginationAggregate = (skip, limit) => [{ $skip: skip }, { $limit: limit }]

export const isValidMongoId = (id) => isValidObjectId(id)

export const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  // Haversine formula used to calculate distances between two points on the Earth's surface,
  // the variables a and c represent intermediate calculations.
  const R = 6371000 // Radius of the Earth in meters
  const differenceLatitude = (latitude2 - latitude1) * (Math.PI / 180)
  const differenceLongitude = (longitude2 - longitude1) * (Math.PI / 180)
  const a =
    Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) +
    Math.cos(latitude1 * (Math.PI / 180)) *
      Math.cos(latitude2 * (Math.PI / 180)) *
      Math.sin(differenceLongitude / 2) *
      Math.sin(differenceLongitude / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

export const sortByDistance = (reqLatitude, reqLongitude, locations) => {
  // Calculate distances for each location
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i]
    const distance = calculateDistance(reqLatitude, reqLongitude, location.latitude, location.longitude)
    location.distance = distance // Store the distance in each location object
  }

  // Sort the locations by distance in ascending order
  locations.sort((a, b) => a.distance - b.distance)

  // Return the sorted locations
  return locations
}
