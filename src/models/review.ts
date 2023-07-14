import { Schema, Types, model } from 'mongoose';

interface IReview {
	userId: Types.ObjectId;
	albumId: string;
	score: number;
	text?: string;
}

const reviewSchema = new Schema<IReview>(
	{
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
			min: 10,
			max: 100,
		},
		text: {
			type: String,
			minlength: 10,
			maxlength: 1000,
		},
	},
	{
		timestamps: true,
	}
);

reviewSchema.index({ userId: 1, albumId: 1 }, { unique: true });

const Review = model('Review', reviewSchema);

export { Review, IReview };
