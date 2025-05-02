import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { authRegisterSchema, authLoginSchema, authResetMailSchema, resetPasswordSchema } from '../validation/auth.js';
import {
  registerController,
  LoginController,
  refreshController,
  logoutController,
  verifyController,
  resetMailController,
  resetPasswordController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));

authRouter.get('/verify', ctrlWrapper(verifyController));

authRouter.post('/login', validateBody(authLoginSchema), ctrlWrapper(LoginController));

authRouter.post('/send-reset-email', validateBody(authResetMailSchema), ctrlWrapper(resetMailController));

authRouter.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/logout', ctrlWrapper(logoutController));
export default authRouter;
