import { Types } from 'mongoose';
import { number, object, string, z } from 'zod';

const userPayload = object({
	username: string().min(5).max(25).trim(),
	email: string().email().trim(),
	password: string()
		.regex(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))[A-Za-z\d\S]{12,50}$/,
			'Password must contain at least 12 characters (max 50), including one uppercase letter, one lowercase letter, one number and one symbol, and must not contain a whitespace'
		)
		.trim(),
	country: string().trim(),
});

const reviewPayload = object({
	userId: z.instanceof(Types.ObjectId),
	albumId: string(),
	score: number().gte(10).lte(100),
	text: string().min(10).max(1000).optional(),
});

export { userPayload, reviewPayload };
