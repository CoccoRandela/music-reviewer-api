import { Schema, Types, model } from 'mongoose';

interface IUser {
	username: string;
	email: string;
	password: string;
	profilePictureUrl: string;
	country: string;
	following: Types.ObjectId[];
	followers: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 32,
		},
		profilePictureUrl: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		following: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }],
		followers: [{ type: Schema.Types.ObjectId, ref: 'User', unique: true }],
	},
	{
		timestamps: true,
	}
);

const User = model('User', userSchema);

export { User, IUser };
