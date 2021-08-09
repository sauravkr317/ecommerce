import { DEBUG_MODE } from "../../config";
import { ValidationError } from "joi";
import { CustomerrorHandler } from '../../services';

const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: error.message }),
    };

    if (error instanceof ValidationError) {
        statusCode = 522;
        data = {
            ...(error.details[0].message.includes('name') && { message: 'Enter valid name' }),
            ...(error.details[0].message.includes('email') && { message: 'Enter valid email' }),
            ...(error.details[0].message.includes('password') && { message: 'Password must be strong' }),
            ...(error.details[0].message.includes('phone') && { message: 'Enter valid phone no' })
        }
    }

    if (error instanceof CustomerrorHandler) {
        statusCode = error.status;
        data = {
            message: error.message
        }
    }
    req.Data = data;
    req.status = statusCode;
    next();
}

export default errorHandler;