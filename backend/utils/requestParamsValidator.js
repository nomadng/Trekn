import Validator from 'validatorjs'
import { HTTP_CONSTANTS } from './constants'
import { BaseError } from './baseError'

export const requestParamsValidator = (params, rules) => {
  const validation = makeValidation(params, rules)
  if (validation.fails()) {
    throw new BaseError(validation.errors, validation.errors.all(), HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST)
  }
}

const makeValidation = (inputs, rules) => new Validator(inputs, rules)
