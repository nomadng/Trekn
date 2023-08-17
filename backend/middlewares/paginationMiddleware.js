import { requestParamsValidator } from '@root/utils/requestParamsValidator'

export const verifyPaginationData = (req, res, next) => {
  const params = { ...req.body }
  const rules = {
    page: 'integer|min:1|required',
    size: 'integer|min:1|required',
  }
  requestParamsValidator(params, rules)
  return next()
}
