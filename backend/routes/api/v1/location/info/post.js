import { getLocationInfo } from '@root/services/locationService'
import { HTTP_CONSTANTS } from '@root/utils/constants'

export default async (req, res, next) => {
  try {
    const response = await getLocationInfo(req)
    return res.status(HTTP_CONSTANTS.HTTP_STATUS_OK).json(response)
  } catch (error) {
    next(error)
  }
}
