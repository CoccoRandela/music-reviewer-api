import { Router } from 'express';
import { AuthController } from '../controllers';
const router: Router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

export default router;
