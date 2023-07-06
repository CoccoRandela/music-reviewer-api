import { Router } from 'express';
import { AuthController } from '../controllers';
import passport from '../utils/passport';

const router: Router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;
