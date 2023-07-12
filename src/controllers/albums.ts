import { Request, Response } from 'express';
import { lookup } from 'geoip-lite';
import { spotifyApiWrapper } from '../utils/spotify/api-wrapper';
import { whereCountry } from 'iso-3166-1';
import { Review } from '../models/review';

export class AlbumController {
	public async getById(req: Request, res: Response) {
		const id = req.params.albumId;
		const album = await spotifyApiWrapper.getAlbumById(id);
		res.json(album);
	}

	public async getReviews(req: Request, res: Response) {
		const albumId = req.params.albumId;
		const reviews = await Review.where('albumId').equals(albumId).exec();
		res.json(reviews);
	}
}
