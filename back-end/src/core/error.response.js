'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

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

class BadRequsetError extends ErrorReporter {

    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}


module.exports = {
    ConflicRequest,
    BadRequsetError
}