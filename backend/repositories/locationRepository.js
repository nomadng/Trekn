import Location from '@root/models/Location'

export const findLocationById = async (locationId) => Location.findById(locationId).lean()

export const findLocationWithAggregateQuery = (aggregateQuery) => Location.aggregate(aggregateQuery)
