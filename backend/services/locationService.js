import mongoose from 'mongoose'
import { HTTP_CONSTANTS, PAGINATION_SETTING, SORT_DIRECTION } from '@root/utils/constants'
import { calculateDistance, configPaginationAggregate, escapeStringRegexp } from '@root/utils/common'
import { findLocationWithAggregateQuery } from '@root/repositories/locationRepository'
import { BaseError } from '@root/utils/baseError'
import { LOCATION_NOT_FOUND } from '@root/utils/responseMsg'

export const getListLocations = async (req) => {
  const { size, page, longitude: userLongitude, latitude: userLatitude } = req.body
  const params = {
    ...req.body,
    page: page || PAGINATION_SETTING.DEFAULT_PAGE,
    size: size || PAGINATION_SETTING.PAGE_SIZE,
  }
  const { locations, totalItem } = await getLocationsByFilters(params)
  const locationWithDistance = locations.map((location) => ({
    ...location,
    distance: calculateDistance(userLatitude, userLongitude, location.latitude, location.longitude),
  }))
  return {
    pagination: {
      page: params.page,
      size: params.size,
      totalItem,
      totalPage: Math.ceil(totalItem / params.size),
    },
    locations: locationWithDistance,
  }
}

export const getLocationInfo = async (req) => {
  const { locationId, longitude: userLongitude, latitude: userLatitude } = req.body
  const aggregateQuery = buildLocationDetailAggregateQuery(locationId)
  const results = await findLocationWithAggregateQuery(aggregateQuery)
  if (results.length === 0) {
    throw new BaseError(new Error(LOCATION_NOT_FOUND), LOCATION_NOT_FOUND, HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }
  return {
    ...results[0],
    distance: calculateDistance(userLatitude, userLongitude, results[0].latitude, results[0].longitude),
  }
}

export const getNearbyLocations = async (req) => {
  const { size, page } = req.body
  const params = {
    ...req.body,
    page: page || PAGINATION_SETTING.DEFAULT_PAGE,
    size: size || PAGINATION_SETTING.PAGE_SIZE,
  }
  const { locations, totalItem } = await getNearbyLocationsByFilters(params)
  return {
    pagination: {
      page: params.page,
      size: params.size,
      totalItem,
      totalPage: Math.ceil(totalItem / params.size),
    },
    locations,
  }
}

const getLocationsByFilters = async (filters) => {
  const query = buildLocationQuery(filters)
  const aggregateQuery = buildLocationAggregateQuery(query)
  const results = await findLocationWithAggregateQuery(aggregateQuery)
  const { totalLocations, locations } = results[0]
  return {
    locations,
    totalItem: totalLocations,
  }
}

const buildLocationQuery = (filters) => {
  const query = {}
  query.sort = {}
  query.filters = {}
  if (filters.search) {
    const searchCondition = {
      $or: [
        { name: new RegExp(escapeStringRegexp(filters.search), 'i') },
        { address: new RegExp(escapeStringRegexp(filters.search), 'i') },
        { cityName: new RegExp(escapeStringRegexp(filters.search), 'i') },
      ],
    }
    query.filters = {
      ...searchCondition,
      ...query.filters,
    }
  }

  if (filters.sort) {
    query.sort = {}
    query.sort[filters.sort.fieldName] = filters.sort.direction
  } else {
    query.sort = { nftMintedCount: SORT_DIRECTION.DESC }
  }

  query.limit = filters.size
  query.skip = filters.size * filters.page - filters.size

  return query
}

const buildLocationAggregateQuery = (query) => {
  const aggregateQuery = [
    {
      $match: query.filters,
    },
    {
      $lookup: {
        from: 'locationphotos',
        let: {
          locationId: { $toString: '$_id' },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$locationId', '$$locationId'],
              },
            },
          },
          {
            $project: {
              _id: 0,
              photoLink: 1,
              rarity: 1,
              author: 1,
            },
          },
        ],
        as: 'locationPhotos',
      },
    },
    {
      $sort: query.sort,
    },
    {
      $facet: {
        totalLocations: [
          {
            $count: 'count',
          },
        ],
        locations: [...configPaginationAggregate(query.skip, query.limit)],
      },
    },
    {
      $project: {
        totalLocations: { $arrayElemAt: ['$totalLocations.count', 0] },
        locations: 1,
      },
    },
    {
      $set: {
        totalLocations: {
          $cond: [{ $lte: ['$totalLocations', null] }, 0, '$totalLocations'],
        },
      },
    },
  ]

  return aggregateQuery
}

const buildLocationDetailAggregateQuery = (locationId) => {
  const aggregateQuery = [
    {
      $match: { _id: new mongoose.Types.ObjectId(locationId) },
    },
    {
      $lookup: {
        from: 'locationphotos',
        let: {
          locationId: { $toString: '$_id' },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$locationId', '$$locationId'],
              },
            },
          },
          {
            $project: {
              _id: 0,
              photoLink: 1,
              rarity: 1,
              author: 1,
            },
          },
        ],
        as: 'locationPhotos',
      },
    },
  ]
  return aggregateQuery
}

const getNearbyLocationsByFilters = async (filters) => {
  const query = buildNearbyLocationQuery(filters)
  const aggregateQuery = buildNearbyLocationAggregateQuery(query)
  const results = await findLocationWithAggregateQuery(aggregateQuery)
  const { totalLocations, locations } = results[0]
  return {
    locations,
    totalItem: totalLocations,
  }
}

const buildNearbyLocationQuery = (filters) => {
  const query = {}
  query.nearbyLocation = {
    near: {
      type: 'Point',
      coordinates: [filters.longitude, filters.latitude],
    },
    distanceField: 'distance',
    spherical: true,
  }
  query.filters = {}
  if (filters.search) {
    const searchCondition = {
      $or: [
        { name: new RegExp(escapeStringRegexp(filters.search), 'i') },
        { address: new RegExp(escapeStringRegexp(filters.search), 'i') },
        { cityName: new RegExp(escapeStringRegexp(filters.search), 'i') },
      ],
    }
    query.filters = {
      ...searchCondition,
      ...query.filters,
    }
  }

  query.limit = filters.size
  query.skip = filters.size * filters.page - filters.size

  return query
}

const buildNearbyLocationAggregateQuery = (query) => {
  const aggregateQuery = [
    {
      $geoNear: query.nearbyLocation,
    },
    {
      $match: query.filters,
    },
    {
      $lookup: {
        from: 'locationphotos',
        let: {
          locationId: { $toString: '$_id' },
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$locationId', '$$locationId'],
              },
            },
          },
          {
            $project: {
              _id: 0,
              photoLink: 1,
              rarity: 1,
              author: 1,
            },
          },
        ],
        as: 'locationPhotos',
      },
    },
    {
      $facet: {
        totalLocations: [
          {
            $count: 'count',
          },
        ],
        locations: [...configPaginationAggregate(query.skip, query.limit)],
      },
    },
    {
      $project: {
        totalLocations: { $arrayElemAt: ['$totalLocations.count', 0] },
        locations: 1,
      },
    },
    {
      $set: {
        totalLocations: {
          $cond: [{ $lte: ['$totalLocations', null] }, 0, '$totalLocations'],
        },
      },
    },
  ]

  return aggregateQuery
}
