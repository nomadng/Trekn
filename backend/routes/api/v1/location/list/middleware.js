import { requestParamsValidator } from '@root/utils/requestParamsValidator';

export const middleware = (req, res, next) => {
  const params = { ...req.body }
  const rules = {
    name: 'string'
  }
  requestParamsValidator(params, rules)
  return next();
}