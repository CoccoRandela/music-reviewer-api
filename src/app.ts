import express, { NextFunction, Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import session from 'express-session';
import passport from './utils/passport';
import routes from './routes';
import 'dotenv/config';
import cors from 'cors';
import { spotifyApiWrapper } from './utils/spotify/api-wrapper';
import createHttpError, { HttpError } from 'http-errors';
import { MongoServerError } from 'mongodb';

const app = express();

declare global {
	namespace Express {
		interface User {
			_id?: Types.ObjectId;
			country: string;
		}
	}
}

const main = async () => {
	await mongoose.connect(`${process.env.DB}`);
};
main().catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
if (!process.env.SECRET) throw new Error('No Secret');
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', routes.users);
app.use('/api/auth', routes.auth);
app.use('/api/artists', routes.artists);
app.use('/api/albums', routes.albums);
app.use('/api/reviews', routes.reviews);

app.use((req, res, next) => {
	next(createHttpError(404));
});

app.use(
	(
		err: HttpError | MongoServerError,
		req: Request,
		res: Response,
		next: NextFunction
	): void => {
		if (err.code === 11000) {
			res
				.status(422)
				.json(
					`${Object.keys(err.keyValue)} ${Object.values(
						err.keyValue
					)} already in use.`
				);
			return;
		}
		res.status(err.status || 500).json(err.message);
	}
);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(process.env.PORT, async () => {
	await spotifyApiWrapper.setToken();
	setInterval(spotifyApiWrapper.setToken.bind(spotifyApiWrapper), 3600 * 1000);
});
