import { NextFunction, Request, Response } from 'express';
import { IReview, Review } from '../models/review';
import { HydratedDocument } from 'mongoose';

export class ReviewController {
	public async getForAlbum(req: Request, res: Response) {
		const albumId = req.params.albumId;
		const reviews = await Review.where('albumId').equals(albumId).exec();
		res.json(reviews);
	}

	public async getForUser(req: Request, res: Response, next: NextFunction) {
		const userId = req.params.userId;
		const reviews = await Review.where('userId').equals(userId).exec();
		res.json(reviews);
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const body: IReviewRequestBody = req.body;
			const newReview: HydratedDocument<IReview> = new Review({
				userId: req.user?._id,
				albumId: req.params.albumId,
				score: body.score,
				text: body.text,
			});
			await newReview.save();
			res.json(newReview);
		} catch (err) {
			next(err);
		}
	}
}

interface IReviewRequestBody {
	score: number;
	text?: string;
}
