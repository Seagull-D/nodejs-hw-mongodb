import Joi from 'joi';
import { emailRedexp } from '../constants/auth.js';
export const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRedexp).required(),
  password: Joi.string().min(6).required(),
});
