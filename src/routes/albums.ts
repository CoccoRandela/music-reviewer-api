import { Router } from 'express';
import { AlbumController, ReviewController } from '../controllers';

const router = Router();
const artistController = new AlbumController();
const reviewController = new ReviewController();

router.get('/:albumId', artistController.getById);
router
	.route('/:albumId/reviews')
	.get(reviewController.getForAlbum)
	.post(reviewController.create);

export default router;
