import { HTTP_CONSTANTS } from '@root/utils/constants'
import { mintNft } from '@root/services/nftService'

export default async (req, res, next) => {
  try {
    const response = await mintNft(req)
    return res.status(HTTP_CONSTANTS.HTTP_STATUS_OK).send(response)
  } catch (error) {
    next(error)
  }
}
