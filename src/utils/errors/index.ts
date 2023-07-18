import { ErrorRequestHandler } from 'express';
import {
	handleMongoServerError,
	handleUnauthorized,
	handleZodError,
} from './handlers';

export const errorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next
): void => {
	switch (err.name) {
		case 'UnauthorizedError':
			handleUnauthorized(err, req, res, next);
			break;
		case 'MongoServerError':
			handleMongoServerError(err, req, res, next);
			break;
		case 'ZodError':
			handleZodError(err, req, res, next);
			break;
	}
	console.log(err.name);
};
