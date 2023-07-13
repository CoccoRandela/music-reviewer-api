import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models';

export class UserController {
	public async create(
		req: Request<{}, {}, IUser>,
		next: NextFunction
	): Promise<IUser | void> {
		try {
			const data = req.body;
			const newUser = new User({
				username: data.username,
				email: data.email,
				password: data.password,
				country: data.country,
			});
			newUser.profilePictureUrl = `${newUser._id}.jpg`;
			await newUser.save();
			return newUser;
		} catch (err) {
			next(err);
		}
	}

	public async update(req: Request, res: Response<IUser>, next: NextFunction) {
		const id = req.user;
		const data = req.body;
		try {
			const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
			if (!updatedUser) {
				throw new Error('User not found');
			}
			res.json(updatedUser);
		} catch (err) {
			next(err);
		}
	}

	public async delete(req: Request, res: Response<IUser>, next: NextFunction) {
		const id = req.user;
		const data = req.body;
		try {
			const updatedUser = await User.findByIdAndDelete(id, data);
			if (!updatedUser) {
				throw new Error('User not found');
			}
			res.json(updatedUser);
		} catch (err) {
			next(err);
		}
	}

	public async getWithId(
		req: Request<{ userId: string }>,
		res: Response<IUser>,
		next: NextFunction
	) {
		const id = req.params.userId;
		try {
			const user = await User.findById(id).lean();
			if (!user) {
				throw new Error('User not found');
			}
			res.json(user);
		} catch (err) {
			next(err);
		}
	}

	public async follow(
		req: Request<{ userId: string }>,
		res: Response<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }>,
		next: NextFunction
	) {
		const followedUserId = req.params.userId;
		const followingUserId = req.user?._id;

		try {
			const updatedFollowedUser = await User.findByIdAndUpdate(
				followedUserId,
				{
					$addToSet: { followers: followingUserId },
				},
				{ new: true }
			);
			if (!updatedFollowedUser) {
				throw new Error('No user found');
			}
			const updatedFollowingUser = await User.findByIdAndUpdate(
				followingUserId,
				{
					$addToSet: { following: followedUserId },
				},
				{ new: true }
			);
			if (!updatedFollowingUser) {
				throw new Error('No user found');
			}
			res.json({ updatedFollowedUser, updatedFollowingUser });
		} catch (err) {
			next(err);
		}
	}

	public async unfollow(
		req: Request<{ userId: string }>,
		res: Response<{ updatedFollowedUser: IUser; updatedFollowingUser: IUser }>,
		next: NextFunction
	) {
		const followedUserId = req.params.userId;
		const followingUserId = req.user?._id;
		try {
			const updatedFollowedUser = await User.findByIdAndUpdate(
				followedUserId,
				{
					$pullAll: { followers: followingUserId },
				},
				{ new: true }
			);
			if (!updatedFollowedUser) {
				throw new Error('No user found');
			}
			const updatedFollowingUser = await User.findByIdAndUpdate(
				followingUserId,
				{
					$pullAll: { following: followedUserId },
				},
				{ new: true }
			);
			if (!updatedFollowingUser) {
				throw new Error('No user found');
			}
		} catch (err) {
			next(err);
		}
	}

	public async searchByUsername(
		req: Request<
			{},
			{},
			{},
			{
				username: string;
			}
		>,
		res: Response
	) {
		const query = req.query.username;

		const result = await User.aggregate([
			{
				$search: {
					index: 'searchByUsername',
					autocomplete: {
						query: query,
						path: 'username',
						tokenOrder: 'any',
						fuzzy: {},
					},
				},
			},
		]);
		res.json(result);
	}
}
