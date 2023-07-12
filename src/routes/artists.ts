import { Router } from 'express';
import { ArtistController } from '../controllers';
const router = Router();
const artistController = new ArtistController();

router.get('/:artistId', artistController.getById);

export default router;
