import { HTTP_CONSTANTS } from '@root/utils/constants'
import { getNearbyLocations } from '@root/services/locationService';

export default async (req, res, next) => {
  try {
    const response = await getNearbyLocations(req)
    res.status(HTTP_CONSTANTS.HTTP_STATUS_OK).json(response)
  } catch (error) {
    next(error)
  }
}
