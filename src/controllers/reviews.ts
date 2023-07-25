import { IReview, Review } from '../models/review';
import { AtLeastOnePropertyOf } from '../utils/types/atLeastOne';
import createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';

export class ReviewController {
	public async getMany(idType: string, id: string): Promise<IReview[]> {
		try {
			const reviews = await Review.where(`${idType}`).equals(id).lean().exec();
			return reviews;
		} catch (err) {
			throw err;
		}
	}

	public async create(data: IReview): Promise<IReview | void> {
		try {
			const newReview = new Review({
				userId: data.userId,
				albumId: data.albumId,
				score: data.score,
				text: data.text,
			});
			const savedReview = await newReview.save();
			return savedReview;
		} catch (err) {
			throw err;
		}
	}

	public async update(
		req: Request<
			{
				reviewId: string;
			},
			{},
			AtLeastOnePropertyOf<{ score: number; text: string }>
		>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		const data = req.body;
		try {
			const updatedReview = await Review.findOneAndUpdate(
				{ _id: reviewId, userId },
				data,
				{
					new: true,
				}
			);
			if (!updatedReview) {
				throw createHttpError(500, 'It was not possible to update the review');
			}
			res.json(updatedReview);
		} catch (err) {
			next(err);
		}
	}

	public async delete(
		req: Request<{ reviewId: string }>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		try {
			const updatedReview = await Review.findOneAndDelete({
				_id: reviewId,
				userId,
			});
			if (!updatedReview) {
				throw createHttpError(404, 'No review to update');
			}
			res.json(updatedReview);
		} catch (err) {
			next(err);
		}
	}

	public async like(
		req: Request<{ reviewId: string }>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		try {
			const likedReview = await Review.findByIdAndUpdate(
				reviewId,
				{
					$addToSet: { likes: [userId] },
				},
				{ new: true }
			);
			if (!likedReview) {
				throw createHttpError(404, 'No review to like');
			}
			res.json(likedReview);
		} catch (err) {
			next(err);
		}
	}

	public async removeLike(
		req: Request<{ reviewId: string }>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		try {
			const review = await Review.findByIdAndUpdate(
				reviewId,
				{
					$pull: { likes: userId },
				},
				{ new: true }
			);
			if (!review) {
				throw createHttpError(404, 'No review to like');
			}
			res.json(review);
		} catch (err) {
			next(err);
		}
	}

	public async dislike(
		req: Request<{ reviewId: string }>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		try {
			const dislikedReview = await Review.findByIdAndUpdate(
				reviewId,
				{
					$addToSet: { dislikes: [userId] },
				},
				{ new: true }
			);
			if (!dislikedReview) {
				throw createHttpError(404, 'No review to dislike');
			}
			res.json(dislikedReview);
		} catch (err) {
			next(err);
		}
	}

	public async removeDislike(
		req: Request<{ reviewId: string }>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const reviewId = req.params.reviewId;
		const userId = req.user?._id;
		if (!userId) {
			next(createHttpError(401, 'Not Authorized'));
			return;
		}
		try {
			const dislikedReview = await Review.findByIdAndUpdate(
				reviewId,
				{
					$pullAll: { dislikes: [userId] },
				},
				{ new: true }
			);
			if (!dislikedReview) {
				throw createHttpError(404, 'No review to dislike');
			}
			res.json(dislikedReview);
		} catch (err) {
			next(err);
		}
	}
}
