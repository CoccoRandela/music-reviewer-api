class SpotifyApiWrapper {
	private _token: string;
	public get token() {
		return this._token;
	}

	public constructor(token?: string) {
		this._token = token || '';
	}

	public async setToken() {
		this._token = await this.requestToken();
		console.log(this._token);
	}

	public async requestToken(): Promise<string> {
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
		const data = await response.json();
		return data.access_token;
	}
}

export const spotifyApiWrapper = new SpotifyApiWrapper();
