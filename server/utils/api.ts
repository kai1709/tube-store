import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  errors?: any
  isOperational: any
  status: number
  isPublic: boolean
  stack?: any
  
  constructor({
    message, errors, status, isPublic, stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    this.stack = stack;
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors = null,
    stack = null,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      errors,
      isPublic,
      message,
      stack,
      status,
    });
  }
}

/**
 * @function Api succes response
 * @param {string} typeOrMessage Can be "FETCH","UPDATE","DELETE" or any custom message
 * @param {any} data Any data type array, object etc.
 */
export const success = (typeOrMessage, data = null) => {
  let message = '';

  switch (typeOrMessage) {
    case 'FETCH':
      message = 'Data fetched successfully';
      break;

    case 'UPDATE':
      message = 'Data updated successfully';
      break;

    case 'DELETE':
      message = 'Data deleted successfully';
      break;

    default:
      message = typeOrMessage;
      break;
  }

  return {
    data,
    message,
  };
}
