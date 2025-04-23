import Joi from 'joi';
import { emailRedexp } from '../constants/auth.js';
export const authRegisterSchema = Joi({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRedexp).required(),
  password: Joi.string().required(),
});
