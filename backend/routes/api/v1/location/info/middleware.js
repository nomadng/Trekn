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
    locationId: 'required|string',
    longitude: 'required|numeric|min:-180|max:180',
    latitude: 'required|numeric|min:-90|max:90',
  }
  requestParamsValidator(params, rules)
  return next()
}
