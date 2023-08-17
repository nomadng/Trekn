export class BaseError {
  constructor(error, message, httpStatus, context = {}) {
    this.error = error
    this.message = message
    this.httpStatus = httpStatus
    this.context = context
  }
}
