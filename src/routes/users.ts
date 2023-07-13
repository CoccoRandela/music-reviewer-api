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

router.get('/all', userController.getAll);

router
	.route('/me')
	.all(authController.checkAuthentication)
	.post(userController.update)
	.delete(userController.delete);

router.get('/search', userController.searchByUsername);

router.get(':userId', userController.getWithId);

router.get('/:userId/reviews', reviewController.getForUser);
router.post('/:userId/follow', userController.follow);

export default router;
