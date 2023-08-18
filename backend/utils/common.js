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
