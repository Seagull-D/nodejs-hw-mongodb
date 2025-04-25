import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';
import { registerController, LoginController } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(LoginController));
export default authRouter;
