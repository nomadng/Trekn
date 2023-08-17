import { HTTP_CONSTANTS } from '@root/utils/constants';
// eslint-disable-next-line import/named
import { getListLocationByName } from '@root/services/locationService';

export default async (req, res, next) => {
  try {
    const response = await getListLocationByName(req);
    res.setHeader('Content-Type', 'application/json')
    res.status(HTTP_CONSTANTS.HTTP_STATUS_OK)
    return res.json(response)
  } catch (error) {
    next(error)
  }
}
