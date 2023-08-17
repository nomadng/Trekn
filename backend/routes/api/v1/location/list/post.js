import { HTTP_CONSTANTS } from '@root/utils/constants';

export default async (req, res, next) => {
  try {
    return res.status(HTTP_CONSTANTS.HTTP_STATUS_OK)
  } catch (error) {
    next(error)
  }
}
