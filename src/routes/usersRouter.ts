import {Router} from 'express';
import { getAllUsers,  postUser } from '../handlers/usersHandler';
const userRouter= Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/user', postUser);

export default userRouter;