import { Strategy } from 'passport-local';
import { User } from '../../models';
import { compare } from 'bcryptjs';

const localStrategy = new Strategy(async (username, password, cb) => {
	try {
		const user = await User.findOne({ username: username });
		if (!user) {
			return cb(null, false, { message: 'No user found' });
		}
		compare(password, user?.password, (error, success) => {
			if (success) return cb(null, user);
			else return cb(null, false, { message: 'Wrong password' });
		});
	} catch (err) {
		return cb(err);
	}
});

export { localStrategy };
