import { requestParamsValidator } from '@root/utils/requestParamsValidator'
import { PAGINATION_SETTING } from '@root/utils/constants'

export const middleware01 = (req, res, next) => {
  const { page = PAGINATION_SETTING.DEFAULT_PAGE, size = PAGINATION_SETTING.PAGE_SIZE } = req.body
  const params = {
    ...req.body,
    page,
    size,
  }
  const rules = {
    search: 'string',
    longitude: 'required|numeric|min:-180|max:180',
    latitude: 'required|numeric|min:-90|max:90',
    page: 'integer|min:1',
    size: 'integer|min:1',
  }
  requestParamsValidator(params, rules)
  return next()
}
