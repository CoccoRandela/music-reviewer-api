import { NextFunction, Request, Response } from 'express';
import { spotifyApiWrapper } from '../utils/spotify/api-wrapper';

export class ArtistController {
	public async getById(req: Request, res: Response, next: NextFunction) {
		const id = req.params.artistId;
		try {
			const [artist, albums] = await Promise.all([
				spotifyApiWrapper.getArtistbyId(id),
				spotifyApiWrapper.getArtistAlbums(id),
			]);
			const response = {
				artist,
				albums,
			};
			res.json(response);
		} catch (err) {
			next(err);
		}
	}
}
