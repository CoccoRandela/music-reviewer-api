import { NextFunction, Request, Response } from 'express';
import { spotifyApiWrapper } from '../utils/spotify/api-wrapper';
import { IReview } from '../models/review';
import { ReviewController } from './reviews';
const reviewController = new ReviewController();

export class AlbumController {
	public async getById(req: Request, res: Response) {
		const id = req.params.albumId;
		const album = await spotifyApiWrapper.getAlbumById(id);
		res.json(album);
	}

	public async getReviews(
		req: Request<{ albumId: string }>,
		res: Response<IReview[]>,
		next: NextFunction
	) {
		const albumId = req.params.albumId;
		try {
			const reviews = await reviewController.getMany('albumId', albumId);
			res.json(reviews);
		} catch (err) {
			next(err);
		}
	}

	public async addReview(
		req: Request<
			{ albumId: string },
			{},
			{
				score: number;
				text?: string;
			}
		>,
		res: Response<IReview>,
		next: NextFunction
	) {
		const userId = req.user?._id;
		if (!userId) {
			throw new Error('No User');
		}
		const reviewData = {
			albumId: req.params.albumId,
			userId,
			score: req.body.score,
			text: req.body.text,
		};
		try {
			const newReview = await reviewController.create(reviewData);
			if (!newReview) {
				throw new Error('It was not possible to create the review');
			}
			res.json(newReview);
		} catch (err) {
			next(err);
		}
	}

	public async updateReview(
		req: Request<
			{ albumId: string },
			{},
			{ [key in keyof 'score' | 'text']: string }
		>,
		res: Response<IReview>,
		next: NextFunction
	) {}
}
