import {Router} from 'express';
import { postReview } from '../handlers/reviewsHandlers';

const reviewsRouter= Router();


reviewsRouter.post('/reviews', postReview )

export default reviewsRouter;