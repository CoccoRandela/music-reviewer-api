import { Router } from 'express';
import { UserController } from '../controllers';

const router: Router = Router();
const userController = new UserController();

router.get('/all', userController.getAll);

router.post('/create', userController.create);
router.get('/profile');

router
	.route('/:userId')
	.get(userController.getWithId)
	.put(userController.updateWithId)
	.delete(userController.deleteWithId);

export default router;
