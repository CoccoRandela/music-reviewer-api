import { Schema, model } from 'mongoose';

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
	country: string;
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
});

userSchema.index({ username: 'text' });

const User = model('User', userSchema);

export { User, IUser };
