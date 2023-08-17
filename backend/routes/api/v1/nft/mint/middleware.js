import { requestParamsValidator } from '@root/utils/requestParamsValidator'

export const middleware01 = (req, res, next) => {
  const params = { ...req.body }
  const rules = {
    address: 'required|string',
    locationId: 'required|string',
  }
  requestParamsValidator(params, rules)
  return next()
}
