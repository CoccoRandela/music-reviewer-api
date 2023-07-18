import { Router } from 'express';
import { AuthController } from '../controllers';
import { validateUserPayload } from '../utils/zod/validators';
const router: Router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', validateUserPayload, authController.signup);

export default router;
