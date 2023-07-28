import {Router} from 'express';
import userRouter from './usersRouter';
import moviesRouter from './moviesRouter';

const router= Router();

router.use('/', userRouter);
router.use('/', moviesRouter);

export default router;