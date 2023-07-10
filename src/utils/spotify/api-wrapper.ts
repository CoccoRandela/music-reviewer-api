import { URLSearchParams } from 'url';
import { IAccessToken, ISearchRequest, ISearchResponse } from './types';

class SpotifyApiWrapper {
	private _token: IAccessToken;
	public get token() {
		return this._token;
	}

	public constructor(token?: IAccessToken) {
		this._token = token || {
			access_token: '',
			token_type: '',
			expires_in: 0,
		};
	}

	public async setToken() {
		this._token = await this.requestToken();
		console.log(this._token);
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

	public async search(search: ISearchRequest): Promise<ISearchResponse> {
		const searchParams = new URLSearchParams({
			q: search.q,
			type: search.type,
		});
		const response = await fetch(
			'https://api.spotify.com/v1/search?' + searchParams,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${this._token.access_token}`,
				},
			}
		);
		const data = await response.json();
		return data;
	}
}

export const spotifyApiWrapper = new SpotifyApiWrapper();
