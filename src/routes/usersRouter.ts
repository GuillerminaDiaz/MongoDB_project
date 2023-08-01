import {Router} from 'express';
import { fetchUser,  login,  postUser } from '../handlers/usersHandler';
const userRouter= Router();

userRouter.get('/users/:id', fetchUser);
userRouter.post('/user', postUser);
userRouter.get('/login', login);

export default userRouter;