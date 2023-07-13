import { Router } from 'express';
import {
	UserController,
	ReviewController,
	AuthController,
} from '../controllers';

const router: Router = Router();
const userController = new UserController();
const reviewController = new ReviewController();
const authController = new AuthController();

router
	.route('/me')
	.all(authController.checkAuthentication)
	.post(userController.update)
	.delete(userController.delete);

router.get('/search', userController.searchByUsername);

router.get(':userId', userController.getWithId);

router.get('/:userId/reviews', reviewController.getForUser);

router.post(
	'/:userId/follow',
	authController.checkAuthentication,
	userController.follow
);
router.post(
	'/:userId/unfollow',
	authController.checkAuthentication,
	userController.unfollow
);

export default router;
