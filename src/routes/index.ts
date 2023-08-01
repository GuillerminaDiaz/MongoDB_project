import {Router} from 'express';
import userRouter from './usersRouter';
import moviesRouter from './moviesRouter';
import reviewsRouter from './reviewsRotes';

const router= Router();

router.use('/', userRouter);
router.use('/', moviesRouter);
router.use('/', reviewsRouter);

export default router;