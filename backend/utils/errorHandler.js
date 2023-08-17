import { logger } from '@root/config/logger'
import { INTERNAL_SERVER_ERROR_MSG } from '@root/utils/responseMsg'
import { BaseError } from '@root/utils/baseError'

const httpConstants = require('http2').constants

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  if (error instanceof BaseError) {
    logger.error(error.message, error.error)
    if (error.context && Object.keys(error.context).length > 0) {
      logger.info('Context', { context: error.context })
    }
    res.status(error.httpStatus).json({ message: error.message })
    return
  }
  logger.error('Request error', error)
  res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: INTERNAL_SERVER_ERROR_MSG })
}
