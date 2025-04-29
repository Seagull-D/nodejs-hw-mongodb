import Joi from 'joi';
import { emailRedexp } from '../constants/auth.js';
export const authRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRedexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRedexp).required(),
  password: Joi.string().min(6).required(),
});

export const authResetMailSchema = Joi.object({
  email: Joi.string().pattern(emailRedexp).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
