import { Router } from 'express';
const router = Router();

router.route('/users').get((req, res, next) => {});

router
	.route('/users/:userId')
	.get(async (req, res, next) => {
		try {
			res.send(`Param id:${req.params.userId}`);
		} catch (err) {
			next(err);
		}
	})
	.post()
	.put()
	.delete();

export default router;
