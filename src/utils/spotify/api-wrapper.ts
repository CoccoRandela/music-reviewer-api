import { URLSearchParams } from 'url';
import {
	Album,
	Artist,
	IAccessToken,
	IPagination,
	ISearchRequest,
	SearchResponse,
} from './types';

class SpotifyApiWrapper {
	private _token: IAccessToken;
	public get token() {
		return this._token;
	}

	private _authHeaders: { Authorization: string };

	public constructor(token?: IAccessToken) {
		this._token = token || {
			access_token: '',
			token_type: '',
			expires_in: 0,
		};
		this._authHeaders = { Authorization: '' };
	}

	public async setToken() {
		this._token = await this.requestToken();
		this._authHeaders = {
			Authorization: `Bearer ${this._token.access_token}`,
		};
	}

	public async requestToken(): Promise<IAccessToken> {
		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				// prettier-ignore
				'Authorization': `Basic ${Buffer.from(
                    `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
                ).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: 'grant_type=client_credentials',
		});
		return await response.json();
	}

	public async search(request: ISearchRequest): Promise<SearchResponse> {
		const searchParams = new URLSearchParams({
			q: request.q,
			type: request.type,
		});
		const response = await fetch(
			'https://api.spotify.com/v1/search?' + searchParams,
			{
				method: 'GET',
				headers: this._authHeaders,
			}
		);
		return await response.json();
	}

	public async getArtistbyId(id: string): Promise<Artist> {
		const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
			method: 'GET',
			headers: this._authHeaders,
		});
		return await response.json();
	}

	public async getArtistAlbums(id: string): Promise<IPagination<Album>> {
		const searchParams = new URLSearchParams({
			include_groups: 'album,compilation',
		});
		const response = await fetch(
			`https://api.spotify.com/v1/artists/${id}/albums?` + searchParams,
			{
				method: 'GET',
				headers: this._authHeaders,
			}
		);
		return await response.json();
	}

	public async getAlbumById(id: string): Promise<Album> {
		const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
			method: 'GET',
			headers: this._authHeaders,
		});
		return await response.json();
	}
}

export const spotifyApiWrapper = new SpotifyApiWrapper();
