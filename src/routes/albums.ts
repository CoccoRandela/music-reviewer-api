import { Router } from 'express';
import { AlbumController, AuthController } from '../controllers';

const router = Router();
const albumController = new AlbumController();
const authController = new AuthController();

router.get('/:albumId', albumController.getById);
router
	.route('/:albumId/reviews')
	.get(albumController.getReviews)
	.post(authController.checkAuthentication, albumController.addReview);

// router.patch(
// 	'/:albumId/reviews/:reviewId/like',
// 	authController.checkAuthentication,
// 	albumController.performLikeAction
// );

export default router;
