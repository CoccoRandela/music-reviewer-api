import { Router } from 'express';
import { AuthController, UserController } from '../controllers';
import passport from '../utils/passport';

const router: Router = Router();
const authController = new AuthController();
const userController = new UserController();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', userController.create);

export default router;
