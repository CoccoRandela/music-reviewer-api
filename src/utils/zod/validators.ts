import { NextFunction, Request, Response } from 'express';
import { reviewPayload, userPayload } from './schemas';
import { IReview } from '../../models/review';

const validateUserPayload = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		userPayload.parse(req.body);
		next();
	} catch (err) {
		next(err);
	}
};

const validateReviewPayload = (
	req: Request<
		{ albumId: string },
		{},
		{
			score: number;
			text?: string;
		}
	>,
	res: Response<{}, { reviewData: IReview }>,
	next: NextFunction
) => {
	const userId = req.user?._id;
	if (!userId) {
		next();
		return;
	}
	const reviewData = {
		albumId: req.params.albumId,
		userId,
		score: req.body.score,
		text: req.body.text,
	};
	try {
		reviewPayload.parse(reviewData);
		res.locals.reviewData = reviewData;
		next();
	} catch (err) {
		next(err);
	}
};

export { validateUserPayload, validateReviewPayload };
