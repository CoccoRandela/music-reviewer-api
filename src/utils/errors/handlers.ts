import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';
import { MongoServerError } from 'mongodb';
import { ZodError } from 'zod';

const handleHttpError: ErrorRequestHandler = (
	err: HttpError,
	req,
	res,
	next
) => {
	res.status(err.status).json(err.message);
};

const handleMongoServerError: ErrorRequestHandler = (
	err: MongoServerError,
	req,
	res,
	next
) => {
	res
		.status(422)
		.json(
			`${Object.keys(err.keyValue)} ${Object.values(
				err.keyValue
			)} already in use.`
		);
};

const handleZodError: ErrorRequestHandler = (err: ZodError, req, res, next) => {
	res.status(422).json(err.flatten().fieldErrors);
};

export { handleHttpError, handleMongoServerError, handleZodError };
