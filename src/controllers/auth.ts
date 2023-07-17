import { NextFunction, Request, Response } from 'express';
import passport from '../utils/passport';
import { UserController } from './users';
import { IUser } from '../models';
import { hash } from 'bcryptjs';
import createHttpError from 'http-errors';
const userController = new UserController();

export class AuthController {
	public async signup(
		req: Request<{}, {}, IUser>,
		res: Response,
		next: NextFunction
	) {
		const data = req.body;
		try {
			const user = await userController.create(data);
			if (!user) {
				throw createHttpError(500, 'Could not create user');
			} else {
				req.login(user, () => {
					res.status(200).json(user);
				});
			}
		} catch (err: any) {
			next(err);
		}
	}

	public login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate(
			'local',
			(err: any, user: Express.User, info: { message: string }) => {
				if (err) {
					next(err);
				}
				if (!user) {
					next(createHttpError(401, info.message));
				}
				if (user) {
					req.login(user, () => {
						res.status(200).json(user);
					});
				}
			}
		)(req, res);
	}

	public logout(req: Request, res: Response, next: NextFunction) {
		req.logout((err) => {
			if (err) {
				return next(err);
			}
			res.json({ message: 'user logged out' });
		});
	}

	public checkAuthentication(req: Request, res: Response, next: NextFunction) {
		if (req.isAuthenticated()) {
			next();
		} else {
			next(createHttpError(401, 'Not Authorized'));
		}
	}
}
