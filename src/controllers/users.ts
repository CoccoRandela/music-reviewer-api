import { Request, Response } from 'express';
import { IUser, User } from '../models';

export class UserController {
	public async getAll(req: Request, res: Response): Promise<void> {
		if (!req.user) res.json('no');
		else res.json('hello');
	}

	public async create(req: Request, res: Response): Promise<void> {
		const data = req.body;
		const newUser = new User({
			username: data.username,
			profilePictureUrl: data.profilePictureUrl,
			name: {
				first: data.name.first,
				last: data.name.last,
			},
			age: data.age,
			email: data.email,
			password: data.password,
			friends: [],
		});
		await newUser.save();
		res.json(newUser);
	}

	public async getWithId(req: Request, res: Response): Promise<void> {
		const id = req.params.userId;
		const user = await User.findById(id);
		res.json(user);
	}

	public async updateWithId(req: Request, res: Response): Promise<void> {
		const id = req.params.userId;
		const data = req.body;
		const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
		res.json(updatedUser);
	}

	public async deleteWithId(req: Request, res: Response): Promise<void> {
		const id = req.params.userId;
		const data = req.body;
		const updatedUser = await User.findByIdAndDelete(id, data);
		res.json(updatedUser);
	}
}
