import { PAGINATION_SETTING, SORT_DIRECTION } from '@root/utils/constants'
import { escapeStringRegexp } from '@root/utils/common'
import { countLocations, getAllLocations } from '@root/repositories/locationRepository'

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

const getLocationsByFilters = async (filters) => {
  const query = buildLocationQuery(filters)
  const aggregateQuery = buildLocationAggregateQuery(query)
  const aggregateCount = buildLocationAggregateCount(query)
  const [locations, totalItem] = await Promise.all([getAllLocations(aggregateQuery), countLocations(aggregateCount)])
  return {
    locations,
    totalItem,
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
    },
    {
      $limit: query.limit,
    },
    {
      $skip: query.skip,
    },
  ]

  return aggregateQuery
}

const buildLocationAggregateCount = (query) => {
  const aggregateCount = [
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
    { $count: 'totalItem' },
  ]

  return aggregateCount
}
