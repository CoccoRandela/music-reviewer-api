import { Router } from 'express';
import { UserController, ReviewController } from '../controllers';

const router: Router = Router();
const userController = new UserController();
const reviewController = new ReviewController();

router.get('/all', userController.getAll);

router.post('/create', userController.create);

router.get('/profile');

router.get('/search', userController.searchByUsername);

router
	.route('/:userId')
	.get(userController.getWithId)
	.put(userController.updateWithId)
	.delete(userController.deleteWithId);

router.get('/:userId/reviews', reviewController.getForUser);

export default router;
