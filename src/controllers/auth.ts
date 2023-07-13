import { NextFunction, Request, Response } from 'express';
import passport from '../utils/passport';
import { UserController } from './users';
const userController = new UserController();

export class AuthController {
	public async signup(req: Request, res: Response, next: NextFunction) {
		const user = await userController.create(req, res, next);
		if (!user) next(new Error('Error'));
		else {
			req.login(user, () => {
				res.status(200).json(user);
			});
		}
	}

	public login(req: Request, res: Response) {
		passport.authenticate(
			'local',
			(err: any, user: Express.User, info: string) => {
				if (err) {
					res.status(404).json(err);
				}
				if (!user) {
					res.status(401).json(info);
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
			next(new Error('user not authenticated'));
		}
	}
}
