import mongoose from 'mongoose'
import { PAGINATION_SETTING, SORT_DIRECTION } from '@root/utils/constants'
import { configPaginationAggregate, escapeStringRegexp } from '@root/utils/common'
import { findLocationWithAggregateQuery } from '@root/repositories/locationRepository'

export const getListLocations = async (req) => {
  const { size, page } = req.body
  const params = {
    ...req.body,
    page: page || PAGINATION_SETTING.DEFAULT_PAGE,
    size: size || PAGINATION_SETTING.PAGE_SIZE,
  }
  const { locations, totalItem } = await getLocationsByFilters(params)
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

export const getLocationInfo = async (req) => {
  const { locationId } = req.body
  const aggregateQuery = buildLocationDetailAggregateQuery(locationId)
  const results = await findLocationWithAggregateQuery(aggregateQuery)
  return results && results.length > 0 ? results[0] : {}
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
