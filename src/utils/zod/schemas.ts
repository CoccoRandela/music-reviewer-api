import { Types } from 'mongoose';
import { z } from 'zod';
const trimString = (u: unknown) => (typeof u === 'string' ? u.trim() : u);

const userPayload = z.object({
	username: z.string().trim().min(5).max(25),
	email: z.string().trim().email(),
	password: z
		.string()
		.trim()
		.regex(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))[A-Za-z\d\S]{12,50}$/,
			'Password must contain at least 12 characters (max 50), including one uppercase letter, one lowercase letter, one number and one symbol, and must not contain a whitespace'
		),
	country: z.string().trim(),
});

const reviewPayload = z.object({
	userId: z.instanceof(Types.ObjectId),
	albumId: z.string(),
	score: z.number().gte(10).lte(100),
	text: z.string().min(10).max(1000).optional(),
});

export { userPayload, reviewPayload };
