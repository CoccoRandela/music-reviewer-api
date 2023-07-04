import { Schema, Types, model } from 'mongoose';

interface IUser {
	username: string;
	profilePictureUrl: string;
	name: {
		first: string;
		last: string;
	};
	age: number;
	email: string;
	password: string;
	friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
	username: String,
	profilePictureUrl: String,
	name: {
		first: String,
		last: String,
	},
	age: {
		type: Number,
		min: 18,
	},
	email: String,
	password: String,
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const User = model('User', userSchema);

export { User, IUser };
