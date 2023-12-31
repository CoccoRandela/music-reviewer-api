import { ErrorRequestHandler } from 'express';
import {
	handleMongoServerError,
	handleHttpError,
	handleZodError,
} from './handlers';

export const errorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next
): void => {
	switch (err.name) {
		case 'MongoServerError':
			handleMongoServerError(err, req, res, next);
			break;
		case 'ZodError':
			handleZodError(err, req, res, next);
			break;
		default:
			handleHttpError(err, req, res, next);
	}
	console.log(err.name);
};
