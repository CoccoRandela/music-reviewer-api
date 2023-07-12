import { Request, Response } from 'express';
import { IUser, User } from '../models';

export class UserController {
	public async getAll(req: Request, res: Response) {
		if (!req.user) res.json('no');
		else res.json('hello');
	}

	public async create(req: Request, res: Response) {
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
			country: data.country,
		});
		await newUser.save();
		res.json(newUser);
	}

	public async update(req: Request, res: Response) {
		const id = req.user;
		const data = req.body;
		const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
		res.json(updatedUser);
	}

	public async delete(req: Request, res: Response) {
		const id = req.user;
		const data = req.body;
		const updatedUser = await User.findByIdAndDelete(id, data);
		res.json(updatedUser);
	}

	public async getWithId(req: Request, res: Response) {
		const id = req.params.userId;
		const user = await User.findById(id);
		res.json(user);
	}

	public async searchByUsername(req: Request, res: Response) {
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
