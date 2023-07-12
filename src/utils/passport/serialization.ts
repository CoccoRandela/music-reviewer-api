import { Types } from 'mongoose';
import { IUser, User } from '../../models';

const serializeUser = (
	user: Express.User,
	cb: (err: any, userId: Types.ObjectId) => void
) => {
	if (!user._id) throw new Error('No user ID!');
	cb(null, user._id);
};

const deserializeUser = async (
	id: Types.ObjectId,
	cb: (err: any, user?: Express.User) => void
) => {
	try {
		const user = await User.findById(id);
		if (!user) throw new Error('No user found');
		cb(null, user);
	} catch (err) {
		cb(err);
	}
};

export { serializeUser, deserializeUser };
