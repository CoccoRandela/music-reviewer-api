import { Router } from 'express';
import { UserController, AuthController } from '../controllers';

const router: Router = Router();
const userController = new UserController();
const authController = new AuthController();

router
	.route('/me')
	.all(authController.checkAuthentication)
	.post(userController.update)
	.delete(userController.delete);

router.get('/search', userController.searchByUsername);

router.get(':userId', userController.getWithId);

router.get('/:userId/reviews', userController.getReviews);

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
