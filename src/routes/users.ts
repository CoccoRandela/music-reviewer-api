import { Router } from 'express';
import { UserController } from '../controllers';

const router: Router = Router();
const userController: UserController = new UserController();

router.get('/users/all', userController.getAll);

router.post('/users/create', userController.create);
router.get('/users/profile');

router
	.route('/users/:userId')
	.get(userController.getWithId)
	.put(userController.updateWithId)
	.delete(userController.deleteWithId);

export default router;
