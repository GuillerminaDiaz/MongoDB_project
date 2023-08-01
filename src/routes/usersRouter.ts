import {Router} from 'express';
import { fetchUser,  postUser } from '../handlers/usersHandler';
const userRouter= Router();

userRouter.get('/users/:id', fetchUser);
userRouter.post('/user', postUser);

export default userRouter;