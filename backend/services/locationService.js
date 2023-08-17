import { SORT_DIRECTION } from '@root/utils/constants'
import { escapeStringRegexp } from '@root/utils/common'
import { countLocations, getAllLocations } from '@root/repositories/locationRepository'

export const getListLocations = async (req, withPagination) => {
  const { size, page } = req.body
  const params = {
    ...req.body,
    withPagination,
  }
  const { locations, totalItem } = await getLocationsByFilters(params)
  if (withPagination) {
    return {
      pagination: {
        page,
        size,
        totalItem,
        totalPage: Math.ceil(totalItem / size),
      },
      heroes: locations,
    }
  }
  return locations
}

const getLocationsByFilters = async (filters) => {
  const query = buildLocationQuery(filters)
  const aggregateQuery = buildLocationAggregateQuery(query, filters.withPagination)
  const aggregateCount = buildLocationAggregateCount(query)
  if (filters.withPagination) {
    const [locations, totalItem] = await Promise.all([getAllLocations(aggregateQuery), countLocations(aggregateCount)])
    return {
      locations,
      totalItem,
    }
  }
  return {
    locations: await getAllLocations(aggregateQuery),
  }
}

const buildLocationQuery = (filters) => {
  const query = {}
  query.sort = {}
  const conditions = []
  if (filters.search) {
    const searchCondition = {
      $or: [
        { name: new RegExp(escapeStringRegexp(filters.search), 'i') },
        { address: new RegExp(escapeStringRegexp(filters.search), 'i') },
      ],
    }
    conditions.push(searchCondition)
  }
  query.filters = { $and: conditions }

  if (filters.sort) {
    query.sort = {}
    query.sort[filters.sort.fieldName] = filters.sort.direction
  } else {
    query.sort = { nftMintedCount: SORT_DIRECTION.DESC }
  }

  if (filters.withPagination) {
    query.limit = filters.size
    query.skip = filters.size * filters.page - filters.size
  }

  return query
}

const buildLocationAggregateQuery = (query, withPagination) => {
  const aggregateQuery = []
  if (query.filters.length > 0) {
    aggregateQuery.push({
      $match: query.filters,
    })
  }
  aggregateQuery.push(
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
        as: 'photos',
      },
    },
    { $unwind: '$photos' },
    {
      $set: {
        photoLink: '$photos.photoLink',
        photoRarity: '$photos.rarity',
        photoAuthor: '$photos.author',
      },
    },
    { $unset: 'photos' },
    {
      $sort: query.sort,
    }
  )

  if (withPagination) {
    aggregateQuery.push(
      {
        $limit: query.limit,
      },
      {
        $skip: query.skip,
      }
    )
  }
  return aggregateQuery
}

const buildLocationAggregateCount = (query) => {
  const aggregateCount = []
  if (query.filters.length > 0) {
    aggregateCount.push({
      $match: query.filters,
    })
  }
  aggregateCount.push(
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
        as: 'photos',
      },
    },
    { $unwind: '$photos' },
    {
      $set: {
        photoLink: '$photos.photoLink',
        photoRarity: '$photos.rarity',
        photoAuthor: '$photos.author',
      },
    },
    { $unset: 'photos' },
    { $count: 'totalItem' }
  )
  return aggregateCount
}
