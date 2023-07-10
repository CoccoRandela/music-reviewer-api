interface IAccessToken {
	access_token: string;
	token_type: string;
	expires_in: number;
}

interface IImage {
	url: string;
	height: number;
	width: number;
}

interface ICopyright {
	text: string;
	type: string;
}

interface IRestrictions {
	reason: 'market' | 'product' | 'explicit';
}

type SearchType = 'artist' | 'album';

type IAlbum = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: IImage[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions?: IRestrictions;
	type: string;
	uri: string;
	copyrights?: ICopyright[];
	external_ids?: {
		isrc: string;
		ean: string;
		upc: string;
	};
	genres?: string[];
	label?: string;
	popularity?: number;
	artists: IArtist[];
} & (
	| {
			album_group?: string;
	  }
	| {
			tracks?: {
				href: string;
				limit: number;
				next: string;
				offset: number;
				previous: string;
				total: number;
				items: ITrack[];
			};
	  }
);

interface ITrack {
	artist: IArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: {
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		type: string;
		uri: string;
	};
	restrictions?: IRestrictions;
	name: string;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

type IArtist = {
	externalUrls: {
		spotify: string;
	};
	genres: string[];
	id: string;
	name: string;
	type: string;
	uri: string;
} & (
	| {
			followers: {
				href: string;
				total: number;
			};
			images: IImage[];
			popularity: string;
	  }
	| {
			href: string;
	  }
);

// search types

interface ISearchRequest {
	q: string;
	type: SearchType[];
}

interface ISearchPagination<IItemsType> {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: IItemsType[];
}

interface ISearchAlbumResponse {
	albums: ISearchPagination<IAlbum>;
}

interface ISearchAlbumResponse {
	artists: ISearchPagination<IArtist>;
}
type ISearchResponse =
	| ISearchAlbumResponse
	| ISearchAlbumResponse
	| (ISearchAlbumResponse & ISearchAlbumResponse);

export { IAccessToken, ISearchResponse, ISearchRequest };
