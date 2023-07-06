import { Strategy } from 'passport-local';
import { User } from '../../models';

const localStrategy = new Strategy(async (username, password, cb) => {
	try {
		const user = await User.findOne({ username: username });
		if (!user) {
			return cb(null, false, { message: 'No user found' });
		}
		if (user.password !== password) {
			return cb(null, false, { message: 'Wrong password' });
		}
		return cb(null, user);
	} catch (err) {
		return cb(err);
	}
});

export { localStrategy };
