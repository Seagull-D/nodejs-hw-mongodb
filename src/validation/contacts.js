import Joi from 'joi';
import { typeList } from '../constants/contacts.js';
export const addValidateContacts = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});

export const updateValidateContacts = Joi.object({
  name: Joi.string(),
  phoneNumber: Joi.string(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
