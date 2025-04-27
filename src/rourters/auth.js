import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema, authLoginSchema, authResetSchema } from '../validation/auth.js';
import {
  registerController,
  LoginController,
  refreshController,
  logoutController,
  verifyController,
  resetController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));

authRouter.get('/verify', ctrlWrapper(verifyController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(LoginController));

authRouter.post('/send-reset-emai', validateBody(authResetSchema), ctrlWrapper(resetController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));
export default authRouter;
