import { NextFunction, Request, Response } from 'express';
import { spotifyApiWrapper } from '../utils/spotify/api-wrapper';
import { IReview } from '../models/review';
import { ReviewController } from './reviews';
const reviewController = new ReviewController();

export class AlbumController {
	public async getById(req: Request, res: Response, next: NextFunction) {
		const id = req.params.albumId;
		try {
			const album = await spotifyApiWrapper.getAlbumById(id);
			res.json(album);
		} catch (err) {
			next(err);
		}
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
		req: Request,
		res: Response<IReview, { reviewData: IReview }>,
		next: NextFunction
	) {
		try {
			const newReview = await reviewController.create(res.locals.reviewData);
			if (!newReview) {
				throw new Error('It was not possible to create the review');
			}
			res.json(newReview);
		} catch (err) {
			next(err);
		}
	}
}
