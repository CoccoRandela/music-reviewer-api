import { Router } from 'express';
import { AuthController, ReviewController } from '../controllers';
const router = Router();
const authController = new AuthController();
const reviewController = new ReviewController();

router
	.route('/:reviewId')
	.all(authController.checkAuthentication)
	.patch(reviewController.update)
	.delete(reviewController.delete);

router.patch(
	'/:reviewId/like',
	authController.checkAuthentication,
	reviewController.like
);

router.patch(
	'/:reviewId/remove-like',
	authController.checkAuthentication,
	reviewController.removeLike
);

router.patch(
	'/:reviewId/dislike',
	authController.checkAuthentication,
	reviewController.dislike
);

router.patch(
	'/:reviewId/remove-dislike',
	authController.checkAuthentication,
	reviewController.removeDislike
);

export default router;
