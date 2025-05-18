import { StatusCodes } from 'http-status-codes';

interface IError {
    message: string;
    statusCode: StatusCodes;
    comingFrom: string;
    status: string;
}

interface IErrorResponse {
    message: string;
    status: string;
    statusCode: StatusCodes;
    comingFrom: string;
    serialize(): IError;
}

export class CustomError extends Error {
    public readonly statusCode: StatusCodes;
    public readonly status: string;
    public readonly comingFrom: string;

    constructor(message: string, statusCode: StatusCodes, status: string, comingFrom: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.comingFrom = comingFrom;
    }

    public serialize(): IError {
        return {
            message: this.message,
            statusCode: this.statusCode,
            status: this.status,
            comingFrom: this.comingFrom,
        }
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST, 'error', 'Bad Request');
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND, 'error', 'Not Found');
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message: string, comingFrom: string) {
        super(message, StatusCodes.UNAUTHORIZED, 'error', comingFrom);
    }
}

export class FileTooLargeError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.REQUEST_TOO_LONG, 'error', 'File Too Large');
    }
}

export class ServerError extends CustomError {
    constructor(message: string) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
    }
}

export interface ErrnoException extends Error {
    errno: number;
    code: string;
    syscall: string;
    path: string;
    stack: string;
    message: string;
    statusCode: StatusCodes;
    status: string;
}