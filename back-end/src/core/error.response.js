'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')

class ErrorReporter extends Error {

    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflicRequest extends ErrorReporter {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorReporter {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorReporter {

    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode)
    }
}


module.exports = {
    ConflicRequest,
    BadRequestError,
    AuthFailureError
}