import { Request, Response } from 'express';
import { spotifyApiWrapper } from '../utils/spotify/api-wrapper';

export class ArtistController {
	public async getById(req: Request, res: Response) {
		const id = req.params.artistId;
		const [artist, albums] = await Promise.all([
			spotifyApiWrapper.getArtistbyId(id),
			spotifyApiWrapper.getArtistAlbums(id),
		]);
		const response = {
			artist,
			albums,
		};
		res.json(response);
	}
}
