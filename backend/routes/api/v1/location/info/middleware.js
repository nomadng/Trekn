import { requestParamsValidator } from '@root/utils/requestParamsValidator'
import { INVALID_OBJECT_ID } from '@root/utils/responseMsg'
import { isValidMongoId } from '@root/utils/common'
import { HTTP_CONSTANTS } from '@root/utils/constants'

export const middleware01 = (req, res, next) => {
  const { locationId } = req.body
  if (!isValidMongoId(locationId)) {
    return res.status(HTTP_CONSTANTS.HTTP_STATUS_BAD_REQUEST).send({ message: INVALID_OBJECT_ID })
  }
  return next()
}

export const middleware02 = (req, res, next) => {
  const params = { ...req.body }
  const rules = {
    photoLink: 'required|string',
    locationId: 'required|string',
  }
  requestParamsValidator(params, rules)
  return next()
}
