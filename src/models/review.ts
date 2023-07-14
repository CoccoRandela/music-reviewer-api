import { Schema, Types, model } from 'mongoose';

interface IReview {
	userId: Types.ObjectId;
	albumId: string;
	score: number;
	text?: string;
	likes?: Types.ObjectId[];
	dislikes?: Types.ObjectId[];
}

const reviewSchema = new Schema<IReview>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		albumId: {
			type: String,
			required: true,
		},
		score: {
			type: Number,
			required: true,
			min: 10,
			max: 100,
		},
		text: {
			type: String,
			minlength: 10,
			maxlength: 1000,
		},
		likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
);

reviewSchema.index({ userId: 1, albumId: 1 }, { unique: true });

const Review = model('Review', reviewSchema);

export { Review, IReview };
