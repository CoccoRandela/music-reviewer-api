import { Schema } from 'mongoose';

interface IReview {
	userId: Schema.Types.ObjectId;
	albumId: string;
	score: number;
	text?: string;
}

const reviewSchema = new Schema<IReview>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	albumId: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
		min: 1,
		max: 10,
	},
	text: {
		type: String,
		minlength: 10,
		maxlength: 1000,
	},
});
