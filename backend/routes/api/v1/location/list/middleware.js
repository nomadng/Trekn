import { requestParamsValidator } from '@root/utils/requestParamsValidator';
import { verifyPaginationData } from '@root/middlewares/paginationMiddleware';

export const middleware01 = (req, res, next) => {
  verifyPaginationData(req, res, next)
  const params = { ...req.body }
  const rules = {
    name: 'string'
  }
  requestParamsValidator(params, rules)
  return next();
}
