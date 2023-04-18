import { Router } from 'express';
import { UserController } from '~/resources/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login);


export { userRouter };