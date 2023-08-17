import Location from '@root/models/Location'

export const findLocationById = async (locationId) => Location.findById(locationId).lean()

export const getAllLocations = (aggregateQuery) => Location.aggregate(aggregateQuery)

export const countLocations = async (aggregateCount) => Location.count(aggregateCount)
