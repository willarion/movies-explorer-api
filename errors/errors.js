class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class UnathorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class InvalidRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class DataConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
  UnathorizedError,
  InvalidRequestError,
  DataConflictError,
};
