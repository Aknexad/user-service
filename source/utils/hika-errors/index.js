const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UN_AUTHORISED: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

// 500 Internal Error
class Internal extends BaseError {
  constructor(description = "Internal Service Error") {
    super(
      "Internal Service Error",
      STATUS_CODES.INTERNAL_ERROR,
      description
    );
  }
}

// 400 Validation Error
class BadRequest extends BaseError {
  constructor(description = "Bad Request") {
    super("Bad Request", STATUS_CODES.BAD_REQUEST, description);
  }
}

// 403 Authorize error
class UnAuthorize extends BaseError {
  constructor(description = "Access Denied") {
    super("Access Denied", STATUS_CODES.UN_AUTHORISED, description);
  }
}

// 404 Not Found
class NotFound extends BaseError {
  constructor(description = "Not Found") {
    super("Not Found", STATUS_CODES.NOT_FOUND, description);
  }
}

module.exports = {
  Internal,
  BadRequest,
  UnAuthorize,
  NotFound,
};
